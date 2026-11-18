const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = { window: {} };
vm.createContext(context);
for (const file of ['data/pokedex-data.js', 'milo-cards.js', 'booster-game-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
}
const { POKEDEX_ENTRIES: entries, MiloCards: cards } = context.window;
const byName = new Map(entries.map((p) => [p.name, p]));
const draw = context.window.createEndlessBooster(entries);
const isMega = (p) => /Mega/.test(p.forme ?? '');
const hasFoil = (p) => [...(p.tags ?? []), ...(byName.get(p.baseSpecies)?.tags ?? [])]
  .some((tag) => /Legendary/.test(tag) || ['Mythical', 'Ultra Beast', 'Paradox'].includes(tag));
for (let i = 0; i < 500; i += 1) {
  const pack = draw();
  assert.equal(pack.cards.length, 5);
  assert.equal(new Set(pack.cards.map((card) => byName.get(card.pokemonName).num)).size, 5);
  assert.ok(Object.hasOwn(cards.elements, pack.energyType));
  pack.cards.forEach((card, index) => {
    const p = byName.get(card.pokemonName);
    assert.ok(!p.hidden && !p.impossible && !p.unreleased);
    assert.ok(Object.hasOwn(cards.elements, card.type));
    if (index < 2) assert.ok(!hasFoil(p) && !isMega(p));
    if (index === 2) assert.equal(card.variant, 'z');
    if (index === 3) assert.equal(card.variant, 'tera');
    if (index === 4) assert.ok(hasFoil(p) || isMega(p));
  });
}
// Gold-star cards must remain available even though the quiz excludes Ubers.
const special = entries.find((p) => cards.rarity(p)[0] === 'special' && !p.hidden && !p.impossible && !p.unreleased);
const normal = entries.filter((p) => !p.forme && !hasFoil(p) && !p.hidden && !p.impossible && !p.unreleased).slice(0, 10);
const restrictedDraw = context.window.createEndlessBooster([...normal, special]);
assert.equal(restrictedDraw().cards.at(-1).pokemonName, special.name);

(async () => {
  let call;
  const client = { rpc: async (name, args) => { call = { name, args }; return { error: null }; } };
  const store = context.window.createBoosterCollectionStore(client);
  const pack = { id: '00000000-0000-4000-8000-000000000001', team: draw() };
  pack.team.cards.forEach((card) => { card.fullArt = false; card.attackIds = ['tackle']; });
  await store.save('owner-one', pack);
  assert.equal(call.name, 'booster_collect_pack');
  assert.equal(call.args.p_user_id, 'owner-one');
  assert.equal(call.args.p_pack_id, pack.id);
  assert.equal(call.args.p_cards.length, 5);
  assert.ok(call.args.p_cards.every((card) => card.variant !== 'energy'));
  assert.ok(call.args.p_cards.every((card) => card.card_data.attackIds[0] === 'tackle'));
  const first = JSON.stringify(call.args);
  await store.save('owner-one', pack);
  assert.equal(JSON.stringify(call.args), first, 'Retries must send the same receipt and cards');
  const failing = context.window.createBoosterCollectionStore({ rpc: async () => ({ error: new Error('offline') }) });
  await assert.rejects(() => failing.save('owner-one', pack), /offline/);
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
  console.log('Passed 500 collection packs, gold-star availability, frozen five-card payloads, owner scoping and retry/error behavior.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
