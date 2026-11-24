const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = { window: {} };
vm.createContext(context);
for (const file of ['data/pokedex-data.js', 'data/natdex-premier.js', 'milo-cards.js', 'booster-game-data.js', 'booster-battle-model.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context);
}
const w = context.window;
const game = w.BoosterBattle;
const defaults = { names: ['Anna', 'Ben'], packs: 2, order: 'alternate', set: w.NATDEX_PREMIER };
const plain = { fullArt: false, trainer: null, variant: 'normal' };
assert.ok(game.quote(plain, .001).amount > game.quote(plain, .01).amount);
assert.ok(game.quote({ ...plain, fullArt: true }, .01).amount > game.quote({ ...plain, trainer: 'A' }, .01).amount);
assert.ok(game.quote({ ...plain, trainer: 'A' }, .01).amount > game.quote({ ...plain, variant: 'z' }, .01).amount);
assert.equal(game.quote({ ...plain, variant: 'z' }, .01).amount, game.quote({ ...plain, variant: 'tera' }, .01).amount);
assert.ok(Math.abs(game.multiplier({ fullArt: true, trainer: 'A', variant: 'z' }) - 3.45) < 1e-12);
const tiers = ['common', 'uncommon', 'rare', 'super', 'special'].map((tier) => game.quote({ ...plain, rarity: [tier] }, .01).amount);
assert.deepEqual(tiers, [100, 315, 770, 2530, 180000]);
assert.equal(game.quote({ ...plain, rarity: ['super'], fullArt: true, trainer: 'A' }, .01).amount, 7590);
for (const trainer of ['Marc', 'Adrian']) {
  const card = { ...plain, rarity: ['super'], fullArt: true, trainer };
  assert.ok(Math.abs(game.multiplier(card) - game.multiplier({ ...card, trainer: 'Magma' }) * 1.1) < 1e-12);
  assert.equal(game.quote(card, .01).amount, 8349);
}
for (const treatment of [{}, { trainer: 'A' }, { variant: 'z' }, { variant: 'tera' }, { fullArt: true }, { fullArt: true, trainer: 'A', variant: 'z' }]) {
  const names = ['common', 'uncommon', 'rare', 'super', 'special'];
  for (let i = 0; i < names.length - 1; i++) {
    assert.ok(game.quote({ ...plain, ...treatment, rarity: names[i] }, 1e-15).amount
      < game.quote({ ...plain, ...treatment, rarity: names[i + 1] }, 1).amount, 'Rarity bands preserve treatment-equivalent tier order');
  }
}
assert.throws(() => game.create({ ...defaults, names: ['Only one'] }));
assert.throws(() => game.create({ ...defaults, names: Array(11).fill('A') }));
assert.throws(() => game.create({ ...defaults, packs: 0 }));
assert.throws(() => game.create({ ...defaults, packs: 1.5 }));
for (const [order, expected] of [['alternate', [0, 1, 0, 1]], ['sequential', [0, 0, 1, 1]]]) {
  const match = game.create({ ...defaults, order });
  const turns = [];
  while (!match.finished) {
    turns.push(match.current);
    const pack = match.open();
    assert.equal(match.open(), pack, 'Closing/reopening an incomplete pack cannot reroll it');
    assert.equal(match.advance(), false);
    assert.equal(pack.team.packaging, undefined, 'Use temporary Milo packaging in Battle');
    const total = match.credit();
    const before = match.players[pack.player].pulls.length;
    assert.equal(match.credit(), total);
    assert.equal(match.players[pack.player].pulls.length, before, 'Credit only once');
    assert.ok([5, 6].includes(before / match.players[pack.player].opened) || match.players[pack.player].opened > 1);
    match.advance();
  }
  assert.deepEqual(turns, expected);
  assert.equal(match.open(), null);
  for (const player of match.players) {
    assert.equal(player.opened, 2);
    assert.equal(player.score, player.pulls.reduce((sum, pull) => sum + pull.amount, 0));
  }
  assert.ok(match.ranking()[0].score >= match.ranking()[1].score);
  match.players.forEach((p) => { p.score = 123; });
  assert.ok(match.ranking().every((p) => p.rank === 1), 'Ties share the winning rank');
}
const ten = game.create({ ...defaults, names: Array.from({ length: 10 }, (_, i) => `Player ${i + 1}`), packs: 1 });
for (let i = 0; i < 10; i++) { assert.equal(ten.current, i); ten.open(); ten.credit(); ten.advance(); }
assert.equal(ten.finished, true);
assert.equal(ten.players.length, 10);
console.log('Passed: 2–10 players, both turn orders, exact score sums, rarity/multiplier scoring, ties, interrupted-pack reuse, idempotent credit and Milo packaging.');
