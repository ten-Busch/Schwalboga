const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = { window: {} };
vm.createContext(context);
for (const file of ['data/pokedex-data.js', 'data/natdex-premier.js', 'data/magma-aqua.js', 'milo-cards.js', 'booster-game-data.js', 'magma-aqua-booster.js', 'booster-battle-model.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
const w = context.window, set = w.MAGMA_AQUA, entries = w.POKEDEX_ENTRIES;
const byName = new Map(entries.map(p => [p.name, p]));
const records = new Map(set.records.map(r => [r.pokemonName, r]));
const model = w.MagmaAquaBooster.model(entries, set);
const allowed = new Set(['Sharpedo', 'Camerupt', 'Blastoise', 'Aerodactyl', 'Slowbro', 'Swampert', 'Garchomp', 'Glalie', 'Excadrill', 'Starmie', 'Barbaracle', 'Malamar', 'Scrafty', 'Sableye', 'Pyroar', 'Froslass', 'Glimmora', 'Baxcalibur', 'Golurk', 'Greninja', 'Latias', 'Latios', 'Rayquaza'].map(n => n + '-Mega').concat('Charizard-Mega-Y'));
assert.equal(set.balance.magmaLines, set.balance.aquaLines);
for (const name of allowed) assert.ok(records.has(name), name);
for (const r of set.records) {
  const p = byName.get(r.pokemonName);
  if (/-Mega/.test(p.name)) assert.ok(allowed.has(p.name));
  if (p.prevo) assert.ok(records.has(p.prevo), `${p.name}: missing pre-evolution`);
  if (r.legendary) assert.ok(['Groudon', 'Kyogre', 'Latias', 'Latios', 'Rayquaza'].includes(p.baseSpecies || p.name));
  const trainerRows = model.trainers(r, p);
  assert.ok(Math.abs(trainerRows.reduce((s, t) => s + t.weight, 0) - 1) < 1e-12);
  if (r.teams.length || r.leader) assert.ok(Math.abs(trainerRows.filter(t => t.name).reduce((s, t) => s + t.weight, 0) - .1) < 1e-12);
}
for (const sprites of Object.values(set.trainerSprites)) for (const sprite of sprites) assert.ok(fs.existsSync(sprite), sprite);
for (const row of model.rates) {
  assert.ok(row.probability > 0 && row.probability <= 1);
  const c = row.card;
  if (c.trainer && ['z', 'tera'].includes(c.variant)) assert.ok((['Magma', 'Marc'].includes(c.trainer) ? set.magmaTypes : set.aquaTypes).includes(c.type));
  if (c.energyFoil) assert.ok(!c.fullArt && !c.trainer && c.variant === 'normal');
  if (c.pokemonName === 'Rayquaza') assert.equal(c.rarity, 'super');
}
const ray = model.rates.filter(r => r.card.pokemonName === 'Rayquaza-Mega');
const ditto = model.rates.filter(r => r.card.pokemonName === 'Ditto');
assert.equal(ditto.length, 1);
assert.equal(ditto[0].card.variant, 'normal');
assert.equal(ditto[0].card.rarity, 'super');
assert.ok(!ditto[0].card.trainer && !ditto[0].card.fullArt && !ditto[0].card.energyFoil);
assert.equal(ray.length, 1);
assert.equal(ray[0], model.rates.at(-1));
assert.ok(ray[0].card.fullArt && ray[0].card.type === 'Dragon' && !ray[0].card.trainer && ray[0].card.variant === 'mega');
assert.ok(model.rates.slice(-4, -1).every(r => r.card.fullArt && ['Groudon-Primal', 'Kyogre-Primal'].includes(r.card.pokemonName) && ['Marc', 'Adrian'].includes(r.card.trainer)));
let gods = 0;
const draw = w.createEndlessBooster(entries, set);
for (let i = 0; i < 10000; i++) {
  const pack = draw();
  assert.equal(pack.cards.length, 5);
  assert.equal(pack.packaging.design, 'magma-aqua');
  if (pack.godPack) {
    gods++;
    assert.ok(pack.cards.every(c => ['rare', 'super', 'special'].includes(c.rarity[0])));
    assert.ok(pack.energyPokemon?.energyFoil && pack.energyPokemon.rarity[0] === 'rare');
    assert.ok(pack.cards.at(-1).fullArt);
  } else {
    assert.equal(pack.cards[0].rarity[0], 'common');
    assert.equal(pack.cards[1].rarity[0], 'common');
    assert.ok(['common', 'uncommon'].includes(pack.cards[2].rarity[0]));
    assert.equal(pack.cards[3].rarity[0], 'uncommon');
    assert.ok(['rare', 'super', 'special'].includes(pack.cards[4].rarity[0]));
  }
  for (const c of [...pack.cards, ...(pack.energyPokemon ? [pack.energyPokemon] : [])]) {
    assert.ok(model.catalog.has(w.boosterVersionKey(c, byName.get(c.pokemonName))));
    if (c.trainer) assert.ok(set.trainerSprites[c.trainer].includes(c.trainerSprite));
  }
}
assert.ok(gods > 50 && gods < 160, `God pack frequency ${gods}/10000`);
const match = w.BoosterBattle.create({ names: ['A', 'B'], packs: 1, order: 'alternate', set });
assert.equal(match.open().team.packaging.design, 'magma-aqua');
assert.ok(match.credit() > 0);
const eligible = match.revealOptions().fakeoutEligible;
const rareDecoy = model.rates.find(r => r.card.rarity === 'rare' && !r.card.trainer && !r.card.fullArt && r.card.variant === 'normal').card;
assert.equal(eligible(rareDecoy, rareDecoy), false);
assert.equal(eligible(ray[0].card, rareDecoy), true);
assert.ok(match.value(ray[0].card).amount > match.value(model.rates.at(-2).card).amount);
assert.equal(match.value(ditto[0].card).dittoBonus, 2500);
assert.equal(match.value(ditto[0].card).amount, 2500);
assert.equal(match.value(ditto[0].card).base, 0);
assert.ok(match.value(ditto[0].card).amount < match.value(ray[0].card).amount);
assert.equal(eligible(ditto[0].card, rareDecoy), true);
const primals = new Set(['Groudon-Primal', 'Kyogre-Primal']);
const valueOf = row => match.value(row.card).amount;
const grouped = w.BoosterBattle.groupedRates(entries, set);
assert.ok(grouped.length < 2 * set.records.length);
const groupBases = new Map(), groupSums = new Map(), groupMax = new Map();
for (const row of model.rates) {
  const key = w.BoosterBattle.groupKey(row.card), value = match.value(row.card);
  if (groupBases.has(key)) {
    assert.equal(value.base, groupBases.get(key).base);
    assert.equal(value.probability, groupBases.get(key).probability);
  } else groupBases.set(key, value);
  groupSums.set(key, (groupSums.get(key) ?? 0) + row.probability);
  groupMax.set(key, Math.max(groupMax.get(key) ?? 0, row.probability));
}
for (const row of grouped) {
  assert.ok(row.probability >= groupMax.get(row.key) - 1e-12);
  assert.ok(row.probability <= groupSums.get(row.key) + 1e-12);
}
for (const row of model.rates) {
  const c = row.card, claimedType = w.MagmaAquaBooster.offTeamType(byName.get(c.pokemonName), c.trainer);
  assert.equal(match.value(c).offTeamBonus, claimedType ? 50 : 0);
  if (claimedType) {
    assert.equal(c.nativeType, claimedType);
    if (!['z', 'tera'].includes(c.variant)) assert.equal(c.type, claimedType);
  }
}
for (const [name, trainer, type] of [['Tentacruel', 'Magma', 'Poison'], ['Sharpedo', 'Magma', 'Dark'], ['Incineroar', 'Aqua', 'Dark'], ['Glimmora', 'Aqua', 'Poison']]) {
  const rows = model.rates.filter(r => r.card.pokemonName === name && r.card.trainer === trainer);
  assert.ok(rows.length > 0);
  assert.ok(rows.every(r => r.card.nativeType === type));
  const quote = match.value(rows[0].card);
  assert.equal(quote.amount, Math.round(quote.base * quote.multiplier) + 50);
}
assert.equal(w.MagmaAquaBooster.offTeamType(byName.get('Tentacruel'), 'Aqua'), undefined);
assert.equal(w.MagmaAquaBooster.offTeamType(byName.get('Swampert'), 'Magma'), undefined);
const plainMegas = model.rates.filter(r => r.card.variant === 'mega' && !r.card.fullArt && !r.card.trainer && !r.card.energyFoil);
const otherTrainers = model.rates.filter(r => r.card.trainer && !r.card.fullArt && !primals.has(r.card.pokemonName));
for (const row of model.rates.filter(r => primals.has(r.card.pokemonName) && !r.card.fullArt && !r.card.energyFoil)) {
  const peers = row.card.trainer ? otherTrainers : plainMegas;
  assert.ok(peers.every(peer => valueOf(row) > valueOf(peer)), `${row.card.pokemonName} must lead its value group`);
  assert.ok(peers.every(peer => row.probability < peer.probability), `${row.card.pokemonName} must be rarer than its peers`);
}
console.log(`Magma VS Aqua: ${records.size} Pokémon/forms, ${model.catalog.size} versions; rules, rankings, Battle scoring and 10000 packs passed (${gods} God Packs).`);
