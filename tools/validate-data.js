const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const errors = [];
const warnings = [];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function readWindowAssignment(relativePath, globalName) {
  const code = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(code, context, { filename: relativePath });
  return context.window[globalName];
}

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

const pokedex = readWindowAssignment('data/pokedex-data.js', 'POKEDEX_ENTRIES');
const translations = readJson('data/translations.json');
const spieler = readWindowAssignment('Spieler.js', 'SPIELER');

if (!Array.isArray(pokedex) || !pokedex.length) fail('Pokedex data is empty or invalid.');
if (!Array.isArray(spieler)) fail('Spieler data is not an array.');

const byName = new Map();
const bySpeciesId = new Map();
for (const pokemon of pokedex) {
  if (!pokemon?.name) fail('Pokedex entry without name.');
  if (!pokemon?.speciesId) fail(`Pokedex entry without speciesId: ${pokemon?.name ?? '(unknown)'}`);
  if (pokemon?.name && byName.has(pokemon.name)) fail(`Duplicate Pokemon name: ${pokemon.name}`);
  if (pokemon?.speciesId && bySpeciesId.has(pokemon.speciesId)) fail(`Duplicate speciesId: ${pokemon.speciesId}`);
  if (pokemon?.name) byName.set(pokemon.name, pokemon);
  if (pokemon?.speciesId) bySpeciesId.set(pokemon.speciesId, pokemon);
  if (!Array.isArray(pokemon?.types) || !pokemon.types.length) fail(`Missing types: ${pokemon?.name ?? '(unknown)'}`);
  if (!pokemon?.sprite) warn(`Missing sprite: ${pokemon?.name ?? '(unknown)'}`);
}

const translatedPokemon = translations?.pokemon ?? {};
for (const [speciesId, names] of Object.entries(translatedPokemon)) {
  if (!bySpeciesId.has(speciesId)) warn(`Translation without matching speciesId: ${speciesId}`);
  if (!names?.de) warn(`Translation without German name: ${speciesId}`);
}

for (const pokemon of pokedex) {
  const translated = translatedPokemon[pokemon.speciesId]?.de;
  if (translated && pokemon.names?.de && translated !== pokemon.names.de) {
    fail(`Translation mismatch for ${pokemon.name}: dex=${pokemon.names.de}, translations=${translated}`);
  }
}

for (const player of spieler ?? []) {
  const label = player?.name ?? '(unknown player)';
  for (const name of player.currentTeam ?? []) {
    if (!byName.has(name)) fail(`Unknown currentTeam Pokemon for ${label}: ${name}`);
  }
  const info = player.currentTeamInfo ?? {};
  for (const [key, name] of Object.entries({ teraCaptain: info.teraCaptain, zCaptain: info.zCaptain })) {
    if (name && !byName.has(name)) fail(`Unknown ${key} for ${label}: ${name}`);
    if (name && Array.isArray(player.currentTeam) && !player.currentTeam.includes(name)) {
      warn(`${key} is not in currentTeam for ${label}: ${name}`);
    }
  }
  for (const previous of player.previousTeams ?? []) {
    for (const name of previous.pokemon ?? []) {
      if (!byName.has(name)) fail(`Unknown previousTeams Pokemon for ${label}: ${name}`);
    }
  }
}

const expectedSectionImages = [
  'battle.gif',
  'calc.webp',
  'core.webp',
  'draft.webp',
  'draftboard.webp',
  'ersatz.webp',
  'evs.webp',
  'games.webp',
  'quiz.webp',
  'regelchecker.webp',
  'regeln.webp',
  'shedinja.webp',
  'speed.webp',
  'spieler.webp',
  'stefanspdf.webp',
  'teams.webp',
];
for (const file of expectedSectionImages) {
  if (!fs.existsSync(path.join(root, 'assets', 'sections', file))) fail(`Missing section image: assets/sections/${file}`);
}

for (const message of warnings) console.warn(`WARN: ${message}`);
for (const message of errors) console.error(`ERROR: ${message}`);

if (errors.length) {
  console.error(`\nValidation failed: ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}

console.log(`Validation passed: ${pokedex.length} Pokemon, ${spieler.length} players, ${warnings.length} warning(s).`);
