const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = { window: {} };
vm.createContext(context);
for (const file of ['data/pokedex-data.js', 'data/natdex-premier.js', 'milo-cards.js', 'booster-game-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
}
const { POKEDEX_ENTRIES: entries, MiloCards: cards } = context.window;
const byName = new Map(entries.map((p) => [p.name, p]));
const draw = context.window.createEndlessBooster(entries);
const isMega = (p) => /Mega/.test(p.forme ?? '');
const hasFoil = (p) => [...(p.tags ?? []), ...(byName.get(p.baseSpecies)?.tags ?? [])]
  .some((tag) => /Legendary/.test(tag) || ['Mythical', 'Ultra Beast', 'Paradox'].includes(tag));
const observedVariants = new Set();
const observedTypes = new Set();
let bonusCount = 0;
for (let i = 0; i < 500; i += 1) {
  const pack = draw();
  assert.equal(pack.cards.length, 5);
  assert.equal(new Set(pack.cards.map((card) => byName.get(card.pokemonName).num)).size, 5);
  assert.ok(Object.hasOwn(cards.elements, pack.energyType));
  pack.cards.forEach((card, index) => {
    const p = byName.get(card.pokemonName);
    assert.ok(!p.hidden && !p.impossible && !p.unreleased);
    assert.ok(Object.hasOwn(cards.elements, card.type));
    const r = context.window.NATDEX_PREMIER.records.find((r) => r.pokemonName === p.name);
    assert.ok(r, 'Only historical draft Pokémon');
    assert.equal(card.setId, 'natdex-lp1');
    assert.equal(card.stamp, 'NATDEX-LP1');
    assert.equal(card.draftCost, r.cost);
    assert.equal(card.rarity[0], context.window.isBoosterChaseRare(card) ? 'rare' : isMega(p) ? 'super' : r.cost >= 12 || hasFoil(p) ? 'rare' : r.cost >= 6 ? 'uncommon' : 'common');
    assert.ok(p.types.includes(card.nativeType));
    if (index === 2 && !pack.godPack) { assert.ok(['normal', 'z'].includes(card.variant)); observedVariants.add(`z:${card.variant}`); }
    if (index === 3 && !pack.godPack) { assert.ok(['normal', 'tera'].includes(card.variant)); observedVariants.add(`tera:${card.variant}`); }
    assert.equal(card.type, card.variant === 'z' ? r.z : card.variant === 'tera' ? r.tera : card.nativeType);
    if (p.types.length === 2) observedTypes.add(p.types.indexOf(card.nativeType));
    if (index < 2 && !pack.godPack && !context.window.isBoosterChaseRare(pack.cards.at(-1))) assert.ok(!hasFoil(p) && !isMega(p));
    if (index === 4) assert.ok(r.cost >= 12 || isMega(p) || hasFoil(p) || context.window.isBoosterChaseRare(card));
    if (card.trainer) { assert.equal(card.trainer, r.trainer); assert.equal(card.trainerSprite, r.trainerSprite); }
    if (r.brought) assert.deepEqual([...card.movePool], [...r.moves]);
  });
  if (pack.godPack) {
    assert.ok(pack.energyPokemon);
    assert.ok([...pack.cards, pack.energyPokemon].every((c) => ['rare', 'super', 'special'].includes(c.rarity[0])));
    const final = pack.cards.at(-1);
    assert.ok(final.fullArt || final.trainer || ['mega', 'tera', 'z'].includes(final.variant));
  }
  if (pack.energyPokemon) {
    bonusCount++;
    const e = pack.energyPokemon;
    assert.ok(byName.has(e.pokemonName));
    assert.equal(e.energyFoil, true);
    assert.equal(e.variant, 'normal');
    assert.equal(e.fullArt, false);
    assert.equal(e.trainer, null);
  }
  assert.equal(pack.packaging.name, 'NatDex Premier');
  assert.ok(byName.has(pack.packaging.pokemonName));
}
assert.equal(observedVariants.size, 4, 'Both captains can appear upgraded and normal');
assert.equal(observedTypes.size, 2, 'Both native types can be drawn');
assert.ok(bonusCount > 30 && bonusCount < 120, '15% bonus roll is active, not missing or guaranteed');

// Two native types, two Z appearances and one Tera appearance, each with
// standard/full-art and unowned/trainer versions. Random moves/power aren't versions.
const sample = { ...context.window.NATDEX_PREMIER.records.find((r) => r.pokemonName === 'Tapu Bulu'), z: 'Grass', tera: 'Fire', brought: true };
const catalog = context.window.createBoosterVersionCatalog(entries, { id: 'test', records: [sample] });
assert.equal(catalog.size, 22);
assert.equal([...catalog.values()].filter((c) => c.fullArt).length, 10);
assert.equal([...catalog.values()].filter((c) => c.trainer).length, 10);
for (const card of catalog.values()) {
  const p = byName.get(card.pokemonName);
  const key = context.window.boosterVersionKey(card, p);
  assert.equal(context.window.boosterVersionKey({ ...card, attackIds: ['tackle'], zPower: 230 }, p), key);
  if (card.variant === 'tera') assert.equal(context.window.boosterVersionKey({ ...card, nativeType: p.types[1] }, p), key);
}
const realCatalog = context.window.createBoosterVersionCatalog(entries, context.window.NATDEX_PREMIER);
const rates = context.window.calculateBoosterPullrates(entries, context.window.NATDEX_PREMIER);
assert.equal(rates.length, realCatalog.size, 'Every possible version has a pullrate');
assert.ok(Math.abs(rates.reduce((sum, row) => sum + row.probability, 0) - 5.1585) < 1e-10, 'Expected cards include the God Pack Energy Foil bonus');
assert.ok(rates.every((row, i) => row.probability > 0 && (!i || rates[i - 1].probability >= row.probability)));
const rarest = rates.filter((r) => Math.abs(r.probability - rates.at(-1).probability) < 1e-12);
assert.equal(rarest.length, 2);
assert.deepEqual([...new Set(rarest.map((r) => r.card.pokemonName))].sort(), ['Nidoqueen']);
assert.ok(rarest.every((r) => r.card.fullArt && r.card.trainer && r.card.rarity === 'rare' && Math.abs(r.probability - .00007790064102564051) < 1e-14));
for (const row of rarest) {
  const original = [row.card, { pokemonName: 'Pikachu' }, { pokemonName: 'Eevee' }];
  const before = original.map((c) => JSON.stringify(c)).sort();
  context.window.promoteBoosterChase(original);
  assert.equal(original.at(-1), row.card);
  assert.deepEqual(original.map((c) => JSON.stringify(c)).sort(), before, 'Promotion reorders only; no changed pulls');
}
const baselineRates = context.window.calculateStandardBoosterPullrates(entries, context.window.NATDEX_PREMIER);
const energyRates = baselineRates.filter((r) => r.card.energyFoil);
assert.ok(Math.abs(energyRates.reduce((sum, r) => sum + r.probability, 0) - .15) < 1e-12);
for (const record of context.window.NATDEX_PREMIER.records) {
  const chance = energyRates.filter((r) => r.card.pokemonName === record.pokemonName).reduce((sum, r) => sum + r.probability, 0);
  assert.ok(Math.abs(chance - .15 / context.window.NATDEX_PREMIER.records.length) < 1e-12, 'Equal Energy Foil odds per Pokémon');
}
const godModel = context.window.createGodPackModel(entries, context.window.NATDEX_PREMIER, baselineRates);
assert.equal(godModel.chance, .01);
assert.ok(Math.abs(godModel.finals.reduce((sum,r)=>sum+r.weight,0)-1)<1e-12);
assert.ok(godModel.specialFinals.every(r=>r.probability<.0007&&!r.card.energyFoil&&!context.window.isBoosterChaseRare(r.card)));
let godCount = 0;
for (let i=0;i<10000;i++) {
  const pack=draw();
  if (!pack.godPack) continue;
  godCount++;
  assert.equal(new Set(pack.cards.map(c=>byName.get(c.pokemonName).num)).size,5);
  assert.ok([...pack.cards,pack.energyPokemon].every(c=>['rare','super','special'].includes(c.rarity[0])));
  assert.ok(pack.energyPokemon.energyFoil&&!pack.energyPokemon.fullArt&&!pack.energyPokemon.trainer);
  assert.equal(pack.energyPokemon.rarity[0], 'rare');
  const final=pack.cards.at(-1);
  assert.ok(context.window.isBoosterChaseRare(final)||godModel.specialFinals.some(r=>r.key===context.window.boosterVersionKey(final,byName.get(final.pokemonName))));
}
assert.ok(godCount>50&&godCount<150, 'God Pack incidence is about one percent');
const rapidashVersions = [...realCatalog.values()].filter((c) => c.pokemonName === 'Rapidash');
assert.equal(rapidashVersions.length, 3, 'Normal, trainer and Energy Foil versions');
assert.ok(rapidashVersions.some((c) => c.trainer === 'Stefan'));
for (let i = 0; i < 100; i++) for (const card of draw().cards) {
  const p = byName.get(card.pokemonName);
  assert.ok(realCatalog.has(context.window.boosterVersionKey({ ...card, fullArt: false }, p)));
  if (cards.fullArtBackground(p)) assert.ok(realCatalog.has(context.window.boosterVersionKey({ ...card, fullArt: true }, p)));
}

(async () => {
  let call;
  const client = { rpc: async (name, args) => { call = { name, args }; return { error: null }; } };
  const store = context.window.createBoosterCollectionStore(client);
  const pack = { id: '00000000-0000-4000-8000-000000000001', team: draw() };
  const bonus = energyRates[0].card;
  pack.team.energyPokemon = { ...bonus, rarity: [bonus.rarity, 'Test', '★'] };
  [...pack.team.cards, ...(pack.team.energyPokemon ? [pack.team.energyPokemon] : [])].forEach((card) => { card.fullArt = false; card.attackIds = ['tackle']; });
  await store.save('owner-one', pack);
  assert.equal(call.name, 'booster_collect_pack');
  assert.equal(call.args.p_user_id, 'owner-one');
  assert.equal(call.args.p_pack_id, pack.id);
  assert.equal(call.args.p_cards.length, pack.team.energyPokemon ? 6 : 5);
  assert.ok(call.args.p_cards.every((card) => card.variant !== 'energy'));
  assert.ok(call.args.p_cards.every((card) => card.card_data.attackIds[0] === 'tackle'));
  const first = JSON.stringify(call.args);
  await store.save('owner-one', pack);
  assert.equal(JSON.stringify(call.args), first, 'Retries must send the same receipt and cards');
  const plainPack = { id: '00000000-0000-4000-8000-000000000002', team: { ...pack.team, energyPokemon: null } };
  await store.save('owner-one', plainPack);
  assert.equal(call.args.p_cards.length, 5, 'Ordinary energy is not saved as a sixth collectible');
  const failing = context.window.createBoosterCollectionStore({ rpc: async () => ({ error: new Error('offline') }) });
  await assert.rejects(() => failing.save('owner-one', pack), /offline/);
  const oldServer = context.window.createBoosterCollectionStore({ rpc: async () => ({ error: { code: 'P0001', message: 'Invalid booster size' } }) });
  await assert.rejects(() => oldServer.save('owner-one', pack), (error) => error.code === 'P0001' && error.userMessage.includes('Fünf-Karten-Regel'));
  const rows = Array.from({ length: 2501 }, (_, i) => ({ card_key: String(i), count: 1 }));
  const requests = [];
  const paginated = context.window.createBoosterCollectionStore({ from(table) {
    return { select() { return this; }, eq(key, value) { assert.equal(key, 'user_id'); assert.equal(value, 'owner-one'); return this; },
      order() { return this; }, async maybeSingle() { return { data: { packs_opened: 501 }, error: null }; },
      async range(start, end) { assert.equal(table, 'booster_cards'); requests.push(start); return { data: rows.slice(start, end + 1), error: null }; } };
  } });
  const loaded = await paginated.load('owner-one');
  assert.equal(loaded.cards.length, 2501);
  assert.equal(loaded.packs, 501);
  assert.deepEqual(requests, [0, 1000, 2000]);
  console.log('Passed 500 NatDex Premier packs: historical pool/costs, upgrades, moves, trainer ownership, frozen payloads and account-scoped persistence.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
