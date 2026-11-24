const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.createContext(context);
for (const file of ['data/pokedex-data.js', 'data/captain-costs.js', 'data/natures.js', 'milo-questions.js', 'milo-phone.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const { POKEMON_NATURES: natures, POKEDEX_ENTRIES: entries, POKEDEX_META: meta } = context.window;
const source = fs.readFileSync(path.join(root, 'damage-calc-master/calc/src/data/natures.ts'), 'utf8');
const pairs = new Map([...source.matchAll(/^\s+(\w+): \['(\w+)', '(\w+)'\],$/gm)].map(([, en, plus, minus]) => [en, plus === minus ? [null, null] : [plus, minus]]));
assert.equal(natures.length, 25);
assert.equal(new Set(natures.map((n) => n.de)).size, 25);
assert.equal(natures.filter((n) => n.plus).length, 20);
for (const n of natures) assert.deepEqual([n.plus, n.minus], pairs.get(n.en));
const generate = context.window.createMiloQuestionGenerator(entries, meta.movesById, (p, mode) => p[mode === 'doubles' ? 'cost_dbl' : 'cost']);
const labels = { atk: 'Angriff', def: 'Verteidigung', spa: 'Spezial-Angriff', spd: 'Spezial-Verteidigung', spe: 'Initiative' };
const easy = new Set(['adamant', 'modest', 'jolly', 'timid']);
const defensive = new Set(['lax', 'gentle']);
const directions = new Set(), pokemon = new Set();
let bias = 0, effects = 0;
for (const prize of [500, 1000, 2000, 4000, 8000]) for (const category of ['nature-effect', 'nature-choice']) {
  const seen = new Set();
  for (let i = 0; i < 100; i++) {
    const q = generate(prize, seen, category);
    assert.ok(q);
    assert.equal(q.category, category);
    assert.equal(q.prize, prize);
    assert.equal(new Set(q.options).size, 4);
    const { nature: n, stat, direction, answerNatures } = q.natureQuestion;
    assert.ok(n.plus && n.minus && n.plus !== n.minus);
    assert.equal(stat, direction === 1 ? n.plus : n.minus);
    assert.ok(prize <= 1000 ? easy.has(n.id) : prize === 8000 ? defensive.has(n.id) : !easy.has(n.id) && !defensive.has(n.id));
    assert.equal(q.referencePokemon[0].name, q.natureQuestion.pokemon);
    directions.add(direction); pokemon.add(q.natureQuestion.pokemon);
    const contacts = context.window.createMiloPhoneContacts({ question: q, prize, player: 'Test' });
    if (category === 'nature-effect') {
      assert.equal(q.options[q.correct], labels[stat]);
      assert.ok(q.options.includes(labels[direction === 1 ? n.minus : n.plus]));
      assert.ok(q.options.every((s) => Object.values(labels).includes(s)));
      assert.ok(q.prompt.includes(n.de.toLocaleLowerCase('de-DE')));
      bias += direction * (q.natureQuestion.pokemonStat - q.natureQuestion.statAverage);
      effects++;
      assert.ok(!contacts.some((c) => c.id === 'pokemart-homeless'));
      const contact = contacts.find((c) => c.id === 'nature-outdoorsman');
      if (contact) {
        assert.equal(contact.usefulness, 'semi');
        const text = contact.dialogue()[0].text;
        const first = entries.find((p) => text.includes(`ein ${p.names?.de ?? p.name}, das`));
        const second = entries.find((p) => text.includes(`Mein ${p.names?.de ?? p.name} eher`));
        assert.ok(first && second);
        for (const [p, up, down] of [[first, n.plus, n.minus], [second, n.minus, n.plus]]) {
          const sorted = Object.entries(p.baseStats).sort((a,b)=>b[1]-a[1]);
          assert.equal(sorted[0][0], up);
          assert.equal(sorted.at(-1)[0], down);
          assert.ok(sorted[0][1]-sorted[1][1]>15);
          assert.ok(sorted.at(-2)[1]-sorted.at(-1)[1]>15);
        }
      }
    } else {
      assert.equal(q.options[q.correct], n.de);
      const matches = answerNatures.filter((other) => (direction === 1 ? other.plus : other.minus) === stat);
      assert.equal(matches.length, 1);
      assert.ok(answerNatures.some((other) => other.plus === n.minus && other.minus === n.plus));
      const distractors = answerNatures.filter((other) => other.id !== n.id && !(other.plus === n.minus && other.minus === n.plus));
      assert.equal(distractors.length, 2);
      for (const other of distractors) {
        assert.ok(![other.plus, other.minus].includes(stat));
        assert.equal([other.plus, other.minus].filter((s) => [n.plus, n.minus].includes(s)).length, 1);
      }
      assert.ok(!contacts.some((c) => c.id === 'nature-outdoorsman'));
      const contact = contacts.find((c) => c.id === 'pokemart-homeless');
      assert.ok(contact);
      assert.equal(contact.usefulness, 'semi');
      const text = contact.dialogue()[0].text;
      const suggestions = text.split('mit ')[1].replace(/ versucht\?$/, '').split(/, | oder /);
      assert.equal(new Set(suggestions).size, 3);
      for (const suggestion of suggestions) {
        assert.ok(!q.options.includes(suggestion));
        const other = natures.find((n) => n.de === suggestion);
        assert.equal(direction === 1 ? other.plus : other.minus, stat);
      }
    }
  }
}
assert.equal(directions.size, 2);
assert.ok(pokemon.size > 100);
assert.ok(bias / effects > 5, 'Pokémon selection should favor stats aligned with the nature');
for (const prize of [50, 100, 200, 300, 16000, 32000, 64000, 125000, 250000, 500000, 1000000]) {
  assert.equal(generate(prize, new Set(), 'nature-effect'), null);
  assert.equal(generate(prize, new Set(), 'nature-choice'), null);
}
console.log('Passed 1,000 nature questions: all translations/stat pairs, tiers, non-neutral natures, unique solutions, opposite/partial distractors, reference weighting and allowed prizes.');
