// Build the set from the historical draft, not today's changing point list.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const draft = require('../drafts/draft-low-power-2026-06-26.json');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'data/pokedex-data.js'), 'utf8'), context);
const entries = context.window.POKEDEX_ENTRIES;
const id = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const battleName = (s) => id(s.replace(/-Mega(?:-[XY])?$/, '').replace(/^Gourgeist-(?:Small|Large|Super|\*)$/, 'Gourgeist'));
const byId = new Map(entries.map((p) => [id(p.name), p]));
const records = draft.players.flatMap((player) => player.pokemonWithCosts.map((item) => ({
  pokemonName: item.name, cost: item.customCost ?? item.cost,
  trainer: player.name, trainerSprite: player.sprite,
  tera: player.teraCaptain === item.name ? player.teraType : null,
  z: player.zCaptain === item.name ? player.zType : null,
  brought: false, moves: [],
})));
const sources = [];
for (const file of fs.readdirSync(path.join(root, 'replays')).filter((f) => /^Gen9NationalDexAG-2026-08-.*\.html$/.test(f))) {
  const html = fs.readFileSync(path.join(root, 'replays', file), 'utf8');
  const log = html.match(/<script[^>]*class="battle-log-data"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  if (!log) throw new Error(`Missing battle log: ${file}`);
  const lines = log.split(/\r?\n/).map((line) => line.split('|'));
  const owners = {};
  for (const side of ['p1', 'p2']) {
    const preview = lines.filter((l) => l[1] === 'poke' && l[2] === side).map((l) => l[3].split(',')[0]);
    // Match the historical roster (including pre-Mega battle forms), not usernames.
    const scored = draft.players.map((p) => ({ name: p.name, score: preview.filter((name) =>
      p.pokemon.some((n) => id(n) === id(name) || id(n.replace(/-Mega(?:-[XY])?$/, '')) === id(name)
        || id(n).startsWith(id(name.replace('-*', ''))))).length })).sort((a, b) => b.score - a.score);
    if (!scored[0].score || scored[0].score === scored[1].score) throw new Error(`Ambiguous roster: ${file} ${side}`);
    owners[side] = scored[0].name;
    for (const name of preview) {
      const record = records.find((r) => r.trainer === owners[side] && battleName(r.pokemonName) === battleName(name));
      if (record) record.brought = true;
    }
  }
  const active = new Map();
  for (const l of lines) {
    const actor = l[2];
    if (['switch', 'drag', 'detailschange', '-formechange'].includes(l[1])) {
      const name = l[3]?.split(',')[0];
    const record = records.find((r) => r.trainer === owners[actor?.slice(0, 2)] && battleName(r.pokemonName) === battleName(name));
      if (record) { record.brought = true; active.set(actor, record); }
      else active.delete(actor);
    }
    if (l[1] === 'move' && active.has(actor) && !l.some((s) => s.startsWith('[from]'))) {
      const record = active.get(actor);
      const moveId = id(l[3]);
      if (context.window.POKEDEX_META.movesById[moveId] && !record.moves.includes(moveId)) record.moves.push(moveId);
    }
  }
  sources.push(file);
}
for (const r of records) {
  if (!byId.has(id(r.pokemonName))) throw new Error(`Unknown Pokémon ${r.pokemonName}`);
  r.moves.sort();
}
const set = { id: 'natdex-lp1', name: 'NatDex Premier', stamp: 'NATDEX-LP1',
  draft: 'draft-low-power-2026-06-26.json', sources, records };
fs.writeFileSync(path.join(root, 'data/natdex-premier.js'), `window.NATDEX_PREMIER = ${JSON.stringify(set, null, 2)};\n`);
console.log(`${records.length} set entries; ${records.filter((r) => r.brought).length} brought; ${sources.length} replay sources.`);
