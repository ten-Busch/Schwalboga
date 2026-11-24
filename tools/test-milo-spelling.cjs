const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
let seed = 582024;
const math = Object.create(Math);
math.random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
const context = { window: {}, Math: math };
vm.createContext(context);
for (const file of ['data/pokedex-data.js', 'data/natures.js', 'milo-questions.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const { POKEDEX_ENTRIES: entries, POKEDEX_META: meta } = context.window;
const growlithe = entries.find((p) => p.name === 'Growlithe');
assert.equal(growlithe.names.de, 'Fukano');
assert.equal(entries.find((p) => p.name === 'Growlithe-Hisui').names.de, 'Fukano-Hisui');
assert.equal(require('../data/translations.json').pokemon.growlithe.de, 'Fukano');
assert.ok(!fs.readFileSync(path.join(root, 'data/pokedex-data.js'), 'utf8').includes('fuakno'));
assert.match(fs.readFileSync(path.join(root, 'scripts/build-translations-from-excel.py'), 'utf8'), /"Growlithe": "Fukano"/);
const getCost = (p, mode) => p[mode === 'doubles' ? 'cost_dbl' : 'cost'];
const focused = context.window.createMiloQuestionGenerator([growlithe], meta.movesById, getCost);
const answers = new Set();
for (const prize of [50, 200]) for (let i = 0; i < 50; i++) {
  const q = focused(prize, new Set(), 'spelling');
  assert.ok(q);
  const answer = q.options[q.correct];
  answers.add(answer);
  if (q.prompt === 'Welche Schreibweise ist richtig?') assert.equal(answer, 'Fukano');
  else {
    assert.equal(q.prompt, 'Wie lautet der englische Name von Fukano?');
    assert.equal(answer, 'Growlithe');
  }
  assert.equal(q.options.filter((option) => option === answer).length, 1);
}
assert.deepEqual([...answers].sort(), ['Fukano', 'Growlithe']);
const generate = context.window.createMiloQuestionGenerator(entries, meta.movesById, getCost);
const realNames = new Set(entries.flatMap((p) => [p.name, p.names?.de]).filter(Boolean).map((name) => name.normalize('NFC').toLowerCase()));
for (const prize of [50, 100, 200, 300]) for (let i = 0; i < 500; i++) {
  const q = generate(prize, new Set(), 'spelling');
  assert.ok(q);
  assert.equal(q.options.length, 4);
  assert.equal(new Set(q.options).size, 4);
  const correctOptions = q.options.filter((option) => realNames.has(option.normalize('NFC').toLowerCase()));
  assert.deepEqual(Array.from(correctOptions), [q.options[q.correct]]);
}
console.log('Passed Fukano/Growlithe spelling regression in both languages and 2,000 spelling questions: exactly one database name, three non-name typos.');
