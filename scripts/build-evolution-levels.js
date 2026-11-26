const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function buildEvolutionLevels(pokedex, directory) {
  const levels = {};
  for (const p of Object.values(pokedex)) {
    if (!p.prevo || !Number.isInteger(p.evoLevel) || p.evoType || p.evoCondition || p.forme) continue;
    levels[p.prevo] = Math.min(levels[p.prevo] ?? Infinity, p.evoLevel);
  }
  fs.writeFileSync(path.join(directory, 'evolution-levels.js'), 'window.POKEMON_EVOLUTION_LEVELS = ' + JSON.stringify(levels, null, 2) + ';\n');
}
module.exports = buildEvolutionLevels;
if (require.main === module) {
  const context = {}; vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../pokedex.ts'), 'utf8').replace('export const Pokedex =', 'this.Pokedex ='), context);
  buildEvolutionLevels(context.Pokedex, path.join(__dirname, '../data'));
}
