const fs = require('fs');
const path = require('path');

module.exports = function buildMoveLearnsetCounts(entries, moves, outputDirectory) {
  const categories = ['Physical', 'Special', 'Status'];
  const eligible = entries.filter((entry) => !entry.hidden && !entry.impossible && !entry.unreleased);
  const types = [...new Set(eligible.flatMap((entry) => entry.types))].sort();
  const moveRows = Object.fromEntries(Object.entries(moves)
    .filter(([, move]) => types.includes(move.type) && categories.includes(move.category))
    .sort(([left], [right]) => left.localeCompare(right, 'en'))
    .map(([id, { name, names, type, category }]) => [
      id, { name, ...(names ? { names } : {}), type, category },
    ]));

  function count(pokemon) {
    const offTypePokemonByType = Object.fromEntries(types.map((type) => [
      type, pokemon.filter((entry) => !entry.types.includes(type)).length,
    ]));
    const counts = Object.fromEntries(Object.keys(moveRows).map((id) => [id, {
      learners: 0,
      offTypeLearners: 0,
      onlyOfType: 0,
      offTypeOnlyOfType: 0,
      onlyOfTypeAndCategory: 0,
      offTypeOnlyOfTypeAndCategory: 0,
    }]));

    for (const { types: pokemonTypes, moveIds } of pokemon) {
      const learnedIds = [...new Set(moveIds)].filter((id) => Object.hasOwn(moveRows, id));
      const byType = new Map();
      const byTypeAndCategory = new Map();
      for (const id of learnedIds) {
        const { type, category } = moveRows[id];
        const group = `${type}:${category}`;
        byType.set(type, (byType.get(type) ?? 0) + 1);
        byTypeAndCategory.set(group, (byTypeAndCategory.get(group) ?? 0) + 1);
      }

      for (const id of learnedIds) {
        const { type, category } = moveRows[id];
        const offType = !pokemonTypes.includes(type);
        const row = counts[id];
        row.learners += 1;
        if (offType) row.offTypeLearners += 1;
        if (byType.get(type) === 1) {
          row.onlyOfType += 1;
          if (offType) row.offTypeOnlyOfType += 1;
        }
        if (byTypeAndCategory.get(`${type}:${category}`) === 1) {
          row.onlyOfTypeAndCategory += 1;
          if (offType) row.offTypeOnlyOfTypeAndCategory += 1;
        }
      }
    }

    return { pokemonCount: pokemon.length, offTypePokemonByType, counts };
  }

  const data = {
    types,
    categories,
    moves: moveRows,
    standardForms: count(eligible.filter((entry) => !entry.forme)),
    includingForms: count(eligible),
  };
  fs.writeFileSync(path.join(outputDirectory, 'move-learnset-counts.json'), JSON.stringify(data, null, 2) + '\n');

  const pokemonCoverage = Object.fromEntries(eligible.map((entry) => {
    const offTypeMoves = {};
    for (const id of new Set(entry.moveIds)) {
      const move = moveRows[id];
      if (!move || entry.types.includes(move.type)) continue;
      const group = offTypeMoves[move.type] ??= { Physical: [], Special: [], Status: [] };
      group[move.category].push(id);
    }

    const uniqueCoverage = {};
    for (const [type, { Physical, Special }] of Object.entries(offTypeMoves)) {
      const offensive = [...Physical, ...Special];
      const unique = {};
      if (offensive.length === 1) unique.offensive = offensive[0];
      if (Physical.length === 1) unique.physical = Physical[0];
      if (Special.length === 1) unique.special = Special[0];
      if (Object.keys(unique).length) uniqueCoverage[type] = unique;
    }

    return [entry.speciesId, {
      name: entry.name,
      ...(entry.names ? { names: entry.names } : {}),
      types: entry.types,
      forme: entry.forme,
      attack: entry.baseStats.atk,
      specialAttack: entry.baseStats.spa,
      offTypeMoves,
      uniqueCoverage,
    }];
  }));
  fs.writeFileSync(path.join(outputDirectory, 'pokemon-move-coverage.json'), JSON.stringify(pokemonCoverage) + '\n');
};
