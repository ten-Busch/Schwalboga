const fs = require('fs');
const path = require('path');
const vm = require('vm');

const workspaceRoot = process.cwd();
const draftsDirectory = path.join(workspaceRoot, 'drafts');
const spielerPath = path.join(workspaceRoot, 'Spieler.js');

function toId(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\u2019']/g, '')
    .replace(/[^a-z0-9]+/g, '');
}

function quote(value) {
  return JSON.stringify(value);
}

function formatStringArray(values, indent = 4) {
  if (!Array.isArray(values) || values.length === 0) return '[]';
  const pad = ' '.repeat(indent);
  const innerPad = ' '.repeat(indent + 2);
  return `[\n${values.map((value) => `${innerPad}${quote(value)},`).join('\n')}\n${pad}]`;
}

function formatObjectArray(values, indent = 4) {
  if (!Array.isArray(values) || values.length === 0) return '[]';
  const pad = ' '.repeat(indent);
  const innerPad = ' '.repeat(indent + 2);
  return `[\n${values.map((value) => `${innerPad}${JSON.stringify(value)},`).join('\n')}\n${pad}]`;
}

function formatPlainObject(value, indent = 4) {
  const source = JSON.stringify(value, null, 2).split('\n');
  return source
    .map((line, index) => (index === 0 ? line : `${' '.repeat(indent)}${line}`))
    .join('\n');
}

function loadSpieler() {
  const source = fs.readFileSync(spielerPath, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: spielerPath });
  if (!Array.isArray(sandbox.window.SPIELER)) {
    throw new Error('Spieler.js did not define window.SPIELER as an array.');
  }
  return sandbox.window.SPIELER;
}

function getDraftPath() {
  const requestedPath = process.argv[2];
  if (requestedPath) {
    return path.resolve(workspaceRoot, requestedPath);
  }

  const jsonFiles = fs
    .readdirSync(draftsDirectory)
    .filter((name) => name.toLowerCase().endsWith('.json'))
    .map((name) => path.join(draftsDirectory, name))
    .sort((left, right) => fs.statSync(right).mtimeMs - fs.statSync(left).mtimeMs);

  if (!jsonFiles.length) {
    throw new Error(`No draft JSON files found in ${draftsDirectory}.`);
  }
  return jsonFiles[0];
}

function createCurrentTeamInfo(draft, draftPlayer) {
  return {
    label: draft.format ? `${draft.format} ${draft.draftDate ?? ''}`.trim() : (draft.draftDate ?? 'Draft'),
    format: draft.format ?? null,
    date: draft.draftDate ?? null,
    spentPoints: draftPlayer.spentPoints ?? null,
    teraCaptain: draftPlayer.teraCaptain ?? null,
    teraType: draftPlayer.teraType ?? null,
    zCaptain: draftPlayer.zCaptain ?? null,
    zType: draftPlayer.zType ?? null,
  };
}

function importDraftIntoSpieler(spieler, draft) {
  const draftPlayersById = new Map((draft.players ?? []).map((player) => [toId(player.name), player]));

  return spieler.map((player) => {
    const draftPlayer = draftPlayersById.get(toId(player.name));
    if (!draftPlayer) return player;

    const nextPlayer = {
      ...player,
      sprite: draftPlayer.sprite || player.sprite,
      currentTeam: Array.isArray(draftPlayer.pokemon) ? draftPlayer.pokemon : [],
      currentTeamInfo: createCurrentTeamInfo(draft, draftPlayer),
      nudelsterne: Math.max(0, Number(draftPlayer.nudelsterneAfterImport) || 0),
    };

    if (!Array.isArray(nextPlayer.previousTeams)) nextPlayer.previousTeams = [];
    if (!Array.isArray(nextPlayer.matchSiege)) nextPlayer.matchSiege = [];
    if (!Array.isArray(nextPlayer.abendSiege)) nextPlayer.abendSiege = [];

    return nextPlayer;
  });
}

function renderSpieler(spieler) {
  const lines = ['window.SPIELER = ['];

  for (const player of spieler) {
    lines.push('  {');
    lines.push(`    name: ${quote(player.name)},`);
    lines.push(`    sprite: ${quote(player.sprite)},`);
    lines.push(`    currentTeam: ${formatStringArray(player.currentTeam, 4)},`);
    if (player.currentTeamInfo) {
      lines.push(`    currentTeamInfo: ${formatPlainObject(player.currentTeamInfo, 4)},`);
    }
    lines.push(`    previousTeams: ${formatObjectArray(player.previousTeams, 4)},`);
    lines.push(`    matchSiege: ${formatObjectArray(player.matchSiege, 4)},`);
    lines.push(`    abendSiege: ${formatObjectArray(player.abendSiege, 4)},`);
    lines.push(`    nudelsterne: ${Math.max(0, Number(player.nudelsterne) || 0)},`);
    lines.push('  },');
  }

  lines.push('];');
  lines.push('');
  lines.push('/*');
  lines.push('  Team examples:');
  lines.push("  currentTeam: ['Charizard', 'Blastoise', 'Venusaur', 'Pikachu', 'Snorlax', 'Gengar', 'Dragonite', 'Lapras', 'Arcanine'],");
  lines.push('  currentTeamInfo: { label: \'Low Power 2026-06-26\', format: \'low-power\', date: \'2026-06-26\' },');
  lines.push('  previousTeams: [');
  lines.push('    {');
  lines.push("      label: 'Season 1',");
  lines.push("      format: 'Normal',");
  lines.push("      pokemon: ['Mew', 'Ditto', 'Rotom', 'Scizor', 'Milotic', 'Tyranitar', 'Flygon', 'Skarmory', 'Umbreon'],");
  lines.push('    },');
  lines.push('  ],');
  lines.push('');
  lines.push('  Win examples:');
  lines.push('  matchSiege: [');
  lines.push("    { date: '2026-06-23', format: 'Normal', title: 'Finale gegen NAME' },");
  lines.push('  ],');
  lines.push('  abendSiege: [');
  lines.push("    { date: '2026-06-23', format: 'Low Power', title: 'Draft Abend #1' },");
  lines.push('  ],');
  lines.push('*/');
  lines.push('');
  return lines.join('\n');
}

const draftPath = getDraftPath();
const draft = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
if (draft.kind !== 'schwalboga-draft-export' || !Array.isArray(draft.players)) {
  throw new Error(`${draftPath} is not a valid Schwalboga draft export.`);
}

const nextSpieler = importDraftIntoSpieler(loadSpieler(), draft);
fs.writeFileSync(spielerPath, renderSpieler(nextSpieler), 'utf8');
console.log(`Imported ${draft.players.length} draft players from ${path.relative(workspaceRoot, draftPath)} into Spieler.js.`);
