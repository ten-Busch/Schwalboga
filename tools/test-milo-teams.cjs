const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.createContext(context);
for (const file of ['data/pokedex-data.js', 'data/captain-costs.js', 'milo-questions.js', 'milo-phone.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const { POKEDEX_ENTRIES: entries, POKEDEX_META: meta, CAPTAIN_TYPE_COSTS: captainCosts } = context.window;
const byName = new Map(entries.map((p) => [p.name, p]));
const hasFoil = (p) => [...(p.tags ?? []), ...(byName.get(p.baseSpecies)?.tags ?? [])]
  .some((tag) => /Legendary/.test(tag) || ['Mythical', 'Ultra Beast', 'Paradox'].includes(tag));
// Simulate a format ban even when the static snapshot still has a price.
const getCost = (p, mode) => p.name === 'Charizard-Mega-X' ? null : p[mode === 'doubles' ? 'cost_dbl' : 'cost'];
const generate = context.window.createMiloQuestionGenerator(entries, meta.movesById, getCost, captainCosts);
for (const mode of ['singles', 'doubles']) {
  const seen = new Set();
  for (let sample = 0; sample < 100; sample += 1) {
    const question = generate(1000000, seen, `team-${mode}`);
    assert.ok(question, `${mode}: generation failed`);
    assert.equal(question.team.mode, mode);
    const cards = question.team.cards;
    const hints = question.team.phoneHints;
    assert.equal(hints.draft.length, 5);
    hints.draft.forEach((row, index) => {
      assert.equal(row.cost, cards[index].cost);
      assert.equal(row.selectable, cards[index].variant !== 'mega');
    });
    assert.equal(hints.z.cost, cards[2].upgradeCost);
    assert.equal(hints.tera.cost, cards[3].upgradeCost);
    if (hints.mega) {
      const mega = byName.get(cards[4].pokemonName);
      const base = byName.get(mega.baseSpecies);
      assert.equal(hints.mega.difference, cards[4].cost - getCost(base, mode));
    }
    hints.comparisons.forEach((row, index) => {
      assert.equal(row.cost, cards[index].cost);
      assert.equal(getCost(byName.get(row.comparisonPokemonName), mode), row.cost);
      assert.notEqual(byName.get(row.comparisonPokemonName).num, byName.get(row.pokemonName).num);
    });
    for (const player of ['Test', 'André']) {
      const phoneContext = { question, prize: 1000000, player };
      const contacts = context.window.selectMiloPhoneContacts(phoneContext);
      assert.deepEqual(Array.from(contacts, (c) => c.name), ['Draft-Experte', 'Gimmick-Fan', 'Vergleichsmeister']);
      assert.equal(context.window.createMiloPhoneContacts(phoneContext).length, 3);
      const choices = contacts[0].dialogue()[1];
      assert.equal(choices.singleChoice, true);
      assert.equal(choices.choices.length, 5);
      choices.choices.forEach((choice, index) => {
        assert.equal(choice.disabled, cards[index].variant === 'mega');
        assert.ok(choice.response.text.includes(`kostet es ${cards[index].cost} Punkt`));
      });
      assert.ok(contacts.every((c) => c.dialogue().every((line) => !/undefined|NaN/.test(line.text))));
    }
    assert.deepEqual(Array.from(cards.slice(0, 4), (p) => p.variant), ['normal', 'normal', 'z', 'tera']);
    const hit = byName.get(cards[4].pokemonName);
    assert.ok(cards[4].variant === 'mega' || hasFoil(hit));
    assert.ok(cards.slice(0, 2).every((card) => !hasFoil(byName.get(card.pokemonName))));
    assert.ok(captainCosts[question.team.energyType]);
    assert.equal(new Set(cards.map((p) => byName.get(p.pokemonName).num)).size, 5);
    assert.ok(cards[0].cost > 10);
    assert.ok(cards[2].cost <= 10);
    assert.ok(cards[3].cost <= 5);
    for (const card of cards) {
      const pokemon = byName.get(card.pokemonName);
      assert.ok(!pokemon.hidden && !pokemon.impossible && !pokemon.unreleased);
      assert.equal(card.cost, getCost(pokemon, mode));
      assert.ok(Number.isInteger(card.cost) && card.cost >= 0 && card.cost < 21);
      assert.equal(card.upgradeCost, ['z', 'tera'].includes(card.variant) ? captainCosts[card.type][card.variant] : 0);
      assert.ok(Object.hasOwn(meta.typeChart, card.type), 'Card type must have a rendered TCG element');
    }
    const total = cards.reduce((sum, p) => sum + p.cost + p.upgradeCost, 0);
    assert.equal(Number(question.options[question.correct]), total);
    assert.equal(new Set(question.options).size, 4);
    question.options.forEach((value, i) => {
      if (i === question.correct) return;
      const gap = Math.abs(Number(value) - total) / total;
      assert.ok(gap >= .15 && gap <= .35);
    });
    const names = cards.map((p) => byName.get(p.pokemonName).names?.de ?? p.pokemonName);
    assert.ok(names.every((name, i) => i === 0 || question.prompt.indexOf(name) > question.prompt.indexOf(names[i - 1])));
  }
}
const withoutMegas = context.window.createMiloQuestionGenerator(entries, meta.movesById,
  (p, mode) => /Mega/.test(p.forme ?? '') ? null : getCost(p, mode), captainCosts);
for (const mode of ['singles', 'doubles']) {
  const question = withoutMegas(1000000, new Set(), `team-${mode}`);
  assert.ok(question);
  assert.equal(question.team.cards.at(-1).variant, 'normal');
  assert.ok(hasFoil(byName.get(question.team.cards.at(-1).pokemonName)));
}
console.log('Passed 200 team questions: order, no Ubers, format legality, unique species, upgrades, energy exclusion, totals, distractors, and legendary fallback.');
