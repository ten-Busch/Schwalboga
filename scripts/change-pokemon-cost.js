const fs = require('fs');
const path = require('path');
const readline = require('readline/promises');
const { spawnSync } = require('child_process');
const vm = require('vm');

const workspaceRoot = path.resolve(__dirname, '..');
const costsPath = path.join(workspaceRoot, 'punktekosten.ts');
const pokedexPath = path.join(workspaceRoot, 'data', 'pokedex-data.js');
const historyPath = path.join(workspaceRoot, 'data', 'point-cost-history.js');
const changelogPath = path.join(workspaceRoot, 'data', 'changelog-data.js');

const normalize = (value) => String(value ?? '')
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '');

const asAsciiJson = (value) => JSON.stringify(value, null, 2)
  .replace(/[^\x00-\x7F]/g, (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`);

function loadWindowData(filePath, variableName, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(filePath, 'utf8'), context, { filename: path.basename(filePath) });
  return context.window[variableName] ?? fallback;
}

function loadCostEntries() {
  const source = fs.readFileSync(costsPath, 'utf8');
  const entries = [];
  const matcher = /\{ name: "([^"]+)", num: (\d+), cost: (null|\d+), impossible: (true|false), unreleased: (true|false), untiered: (true|false), hidden: (true|false), linkedTo: (null|"[^"]+") \}/g;
  for (const match of source.matchAll(matcher)) {
    entries.push({
      name: match[1],
      num: Number(match[2]),
      cost: match[3] === 'null' ? null : Number(match[3]),
      impossible: match[4] === 'true',
      unreleased: match[5] === 'true',
      untiered: match[6] === 'true',
      hidden: match[7] === 'true',
    });
  }
  if (!entries.length) throw new Error('Keine Punktekosten in punktekosten.ts gefunden.');
  return entries;
}

function loadPokedex() {
  return loadWindowData(pokedexPath, 'POKEDEX_ENTRIES', []);
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceCost(name, nextCost) {
  const source = fs.readFileSync(costsPath, 'utf8');
  const pattern = new RegExp(`(\\{ name: "${escapeRegExp(name)}", num: \\d+, cost: )(null|\\d+)`);
  if (!pattern.test(source)) throw new Error(`${name} wurde in punktekosten.ts nicht gefunden.`);
  const updated = source.replace(pattern, `$1${nextCost}`);
  fs.writeFileSync(costsPath, updated, 'utf8');
}

function writeHistory(history) {
  fs.writeFileSync(historyPath, `window.POINT_COST_HISTORY = ${asAsciiJson(history)};\n`, 'utf8');
}

function writeChangelog(changelog) {
  fs.writeFileSync(changelogPath, `window.CHANGELOG_DATA = ${asAsciiJson(changelog)};\n`, 'utf8');
}

function printPokemonPreview(costEntry, pokemon) {
  const stats = pokemon?.baseStats ?? {};
  const types = pokemon?.types?.join(' / ') ?? '-';
  const abilities = pokemon?.abilityDetails?.map((ability) => ability.name).join(' / ') ?? '-';
  console.log(`\n${costEntry.name} (#${costEntry.num})`);
  console.log(`Typen: ${types}`);
  console.log(`Punktekosten: ${costEntry.cost ?? 'nicht festgelegt'}`);
  console.log(`Werte: KP ${stats.hp ?? '-'} | Ang ${stats.atk ?? '-'} | Vert ${stats.def ?? '-'} | SpA ${stats.spa ?? '-'} | SpV ${stats.spd ?? '-'} | Init ${stats.spe ?? '-'}`);
  console.log(`F\u00e4higkeiten: ${abilities}`);
}

async function selectPokemon(readlineInterface, entries) {
  while (true) {
    const query = await readlineInterface.question('\nPokemon suchen (Name oder Dex-Nummer, leer = abbrechen): ');
    if (!query.trim()) return null;
    const normalizedQuery = normalize(query);
    const matches = entries.filter((entry) => (
      normalize(entry.name).includes(normalizedQuery) || String(entry.num) === query.trim()
    )).slice(0, 12);
    if (!matches.length) {
      console.log('Keine passenden Pokemon gefunden.');
      continue;
    }
    matches.forEach((entry, index) => console.log(`${index + 1}. ${entry.name} (#${entry.num}) - ${entry.cost ?? '-'}`));
    const answer = await readlineInterface.question('Nummer waehlen oder erneut suchen: ');
    const selected = matches[Number(answer) - 1];
    if (selected) return selected;
    console.log('Ungueltige Auswahl.');
  }
}

async function main() {
  const readlineInterface = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const entries = loadCostEntries();
    const selected = await selectPokemon(readlineInterface, entries);
    if (!selected) return;
    const pokemon = loadPokedex().find((entry) => entry.name === selected.name);
    printPokemonPreview(selected, pokemon);

    const nextCostText = await readlineInterface.question('Neue Punktekosten: ');
    const nextCost = Number(nextCostText);
    if (!Number.isInteger(nextCost) || nextCost < 0) throw new Error('Bitte eine nicht-negative ganze Zahl eingeben.');
    if (nextCost === selected.cost) throw new Error('Die neue Punktzahl entspricht bereits der aktuellen Punktzahl.');
    const reason = (await readlineInterface.question('Begruendung: ')).trim();
    if (!reason) throw new Error('Eine Begruendung ist erforderlich.');
    const confirmation = await readlineInterface.question(`\n${selected.name}: ${selected.cost ?? '-'} -> ${nextCost}. Mit "JA" bestaetigen: `);
    if (confirmation.trim().toUpperCase() !== 'JA') {
      console.log('Abgebrochen.');
      return;
    }

    const date = getToday();
    const history = loadWindowData(historyPath, 'POINT_COST_HISTORY', []);
    history.push({ date, name: selected.name, from: selected.cost, to: nextCost, reason });

    const changelog = loadWindowData(changelogPath, 'CHANGELOG_DATA', { tier: [], site: [] });
    changelog.tier ??= [];
    let todayGroup = changelog.tier.find((group) => group.title === date);
    if (!todayGroup) {
      todayGroup = { title: date, entries: [] };
      changelog.tier.unshift(todayGroup);
    }
    todayGroup.entries ??= [];
    todayGroup.entries.push([selected.name, String(selected.cost ?? '-'), String(nextCost), reason]);

    replaceCost(selected.name, nextCost);
    writeHistory(history);
    writeChangelog(changelog);

    const build = spawnSync(process.execPath, [path.join(__dirname, 'build-pokedex-data.js')], {
      cwd: workspaceRoot,
      stdio: 'inherit',
    });
    if (build.status !== 0) throw new Error('Die Daten wurden nicht erfolgreich neu gebaut.');
    console.log(`\nFertig: ${selected.name} wurde von ${selected.cost ?? '-'} auf ${nextCost} Punkte geaendert.`);
  } finally {
    readlineInterface.close();
  }
}

main().catch((error) => {
  console.error(`\nFehler: ${error.message}`);
  process.exitCode = 1;
});
