const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'data/pokedex-data.js'), 'utf8'), context);
const entries = context.window.POKEDEX_ENTRIES;
const byName = new Map(entries.map((p) => [p.name, p]));
const megaNames = ['Sharpedo', 'Camerupt', 'Blastoise', 'Aerodactyl', 'Slowbro', 'Swampert', 'Garchomp', 'Glalie', 'Excadrill', 'Starmie', 'Barbaracle', 'Malamar', 'Scrafty', 'Sableye', 'Pyroar', 'Froslass', 'Glimmora', 'Baxcalibur', 'Golurk', 'Greninja'].map((n) => `${n}-Mega`);
megaNames.push('Charizard-Mega-Y');
const exceptions = new Set(['Groudon', 'Kyogre', 'Castform', 'Latias', 'Latios', 'Rayquaza']);
const allowedMegas = new Set([...megaNames, 'Latias-Mega', 'Latios-Mega', 'Rayquaza-Mega']);
const mega = (p) => /-Mega(?:-|$)/.test(p.name);
const base = (p) => byName.get(p.baseSpecies) ?? p;
const legendary = (p) => [...p.tags, ...base(p).tags].some((t) => /Legendary|Mythical/.test(t));
function family(p) {
  if (mega(p)) return family(base(p));
  if (p.prevo && byName.has(p.prevo)) return family(byName.get(p.prevo));
  return p.name;
}
const has = (p, types) => p.types.some((t) => types.includes(t));
const eligible = entries.filter((p) => !p.impossible && (mega(p) ? allowedMegas.has(p.name)
  : exceptions.has(base(p).name) || (!p.hidden && !p.unreleased && !/Gmax|Totem|Cap|Starter|Bond|Ash/.test(p.forme ?? ''))));
const groups = new Map();
for (const p of eligible.filter((p) => !legendary(p) && !exceptions.has(base(p).name))) {
  const id = family(p);
  if (!groups.has(id)) groups.set(id, []);
  groups.get(id).push(p);
}
const magma = [], aqua = [], shared = [];
for (const [id, members] of groups) {
  const m = members.some((p) => has(p, ['Ground', 'Fire', 'Rock']));
  const a = members.some((p) => has(p, ['Water', 'Ice']));
  const d = members.some((p) => has(p, ['Dark', 'Poison']));
  if (d) shared.push(id);
  if (m && !a) magma.push(id);
  if (a && !m) aqua.push(id);
  if (m && a) (magma.length <= aqua.length ? magma : aqua).push(id);
}
const required = new Set(megaNames.map((n) => family(byName.get(n))));
const prioritize = (list) => list.sort((a, b) => Number(required.has(b)) - Number(required.has(a)) || a.localeCompare(b));
prioritize(magma); prioritize(aqua);
const count = Math.min(magma.length, aqua.length);
const selectedGroups = new Set([...magma.slice(0, count), ...aqua.slice(0, count), ...shared, ...required]);
const selected = new Map();
function include(p, ancestor = false) {
  if (!p || p.impossible || (!ancestor && !eligible.includes(p)) || selected.has(p.name)) return;
  selected.set(p.name, p);
  if (p.prevo) include(byName.get(p.prevo), true);
  if (mega(p)) include(base(p));
}
for (const id of selectedGroups) for (const p of groups.get(id) ?? []) {
  if (has(p, ['Ground', 'Fire', 'Rock', 'Water', 'Ice', 'Dark', 'Poison']) || required.has(id)) include(p);
}
for (const p of eligible) if (exceptions.has(base(p).name)) include(p);
include(byName.get('Ditto'));
for (const name of megaNames) { if (!selected.has(name)) throw new Error(`Missing mandatory Mega: ${name}`); }
const records = [...selected.values()].sort((a, b) => a.num - b.num || a.name.localeCompare(b.name)).map((p) => {
  const tags = [...p.tags, ...base(p).tags];
  const isLegendary = legendary(p);
  const total = Object.values(p.baseStats).reduce((a, b) => a + b, 0);
  const rarity = mega(p) || /-Primal$/.test(p.name) || ['Rayquaza', 'Ditto'].includes(p.name) ? 'super'
    : isLegendary || tags.some((t) => ['Ultra Beast', 'Paradox'].includes(t)) || (!p.evos.length && total >= 500) ? 'rare' : p.evos.length ? 'common' : 'uncommon';
  const teams = isLegendary ? [] : has(p, ['Dark', 'Poison']) ? ['Magma', 'Aqua']
    : [...(has(p, ['Ground', 'Fire', 'Rock']) ? ['Magma'] : []), ...(has(p, ['Water', 'Ice']) ? ['Aqua'] : [])];
  return { pokemonName: p.name, rarity, teams, family: family(p), legendary: isLegendary,
    leader: base(p).name === 'Groudon' ? 'Marc' : base(p).name === 'Kyogre' ? 'Adrian' : null,
    chaseOnly: p.name === 'Rayquaza-Mega', primal: /-Primal$/.test(p.name) };
});
const trainerFiles = fs.readdirSync(path.join(root, 'assets/Trainer'));
const set = { id: 'magma-aqua', kind: 'magma-aqua', name: 'Magma VS Aqua', stamp: 'MAGMA VS AQUA', packaging: 'magma-aqua',
  balance: { magmaLines: count, aquaLines: count, darkPoisonLines: shared.length },
  magmaTypes: ['Ground', 'Fire', 'Rock', 'Steel'], aquaTypes: ['Water', 'Ice', 'Electric', 'Flying'],
  trainerSprites: { Magma: trainerFiles.filter((f) => /magma/i.test(f)).map((f) => `assets/Trainer/${f}`), Aqua: trainerFiles.filter((f) => /aqua/i.test(f)).map((f) => `assets/Trainer/${f}`), Marc: ['assets/Trainer/maxie-gen6.png'], Adrian: ['assets/Trainer/archie-gen6.png'] },
  records };
fs.writeFileSync(path.join(root, 'data/magma-aqua.js'), `window.MAGMA_AQUA = ${JSON.stringify(set, null, 2)};\n`);
console.log(`${records.length} Pokémon/forms; ${count} Magma + ${count} Aqua line groups; ${shared.length} Dark/Poison groups; ${records.filter((r) => mega(byName.get(r.pokemonName))).length} Megas.`);
