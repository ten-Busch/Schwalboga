const fs = require('fs');
const path = require('path');
const vm = require('vm');

const workspaceRoot = process.cwd();
const sourcePaths = {
  pokedex: path.join(workspaceRoot, 'pokedex.ts'),
  costs: path.join(workspaceRoot, 'punktekosten.ts'),
  moves: path.join(workspaceRoot, 'moves.ts'),
  moveText: path.join(workspaceRoot, 'moves_desc.ts'),
  abilitiesText: path.join(workspaceRoot, 'abilities_text.ts'),
  learnsets: path.join(workspaceRoot, 'learnsets.ts'),
  typechart: path.join(workspaceRoot, 'typechart.ts'),
};
const outputDirectory = path.join(workspaceRoot, 'data');
const outputScriptPath = path.join(outputDirectory, 'pokedex-data.js');

const toId = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[\u2019']/g, '')
    .replace(/[^a-z0-9]+/g, '');

const toSpriteSlug = (name) =>
  name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u2640/g, '-f')
    .replace(/\u2642/g, '-m')
    .replace(/[\u2019']/g, '')
    .replace(/\./g, '')
    .replace(/:/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();

const spriteUrlOverrides = {
  'Mr. Mime': 'https://play.pokemonshowdown.com/sprites/gen5/mrmime.png',
  'Mr. Mime-Galar': 'https://play.pokemonshowdown.com/sprites/gen5/mrmime-galar.png',
  'Tauros-Paldea-Combat': 'https://play.pokemonshowdown.com/sprites/gen5/tauros-paldeacombat.png',
  'Tauros-Paldea-Blaze': 'https://play.pokemonshowdown.com/sprites/gen5/tauros-paldeablaze.png',
  'Tauros-Paldea-Aqua': 'https://play.pokemonshowdown.com/sprites/gen5/tauros-paldeaaqua.png',
  'Mewtwo-Mega-X': 'https://play.pokemonshowdown.com/sprites/gen5/mewtwo-megax.png',
  'Mewtwo-Mega-Y': 'https://play.pokemonshowdown.com/sprites/gen5/mewtwo-megay.png',
  'Ho-Oh': 'https://play.pokemonshowdown.com/sprites/gen5/hooh.png',
  'Porygon-Z': 'https://play.pokemonshowdown.com/sprites/gen5/porygonz.png',
  'Type:Null': 'https://play.pokemonshowdown.com/sprites/gen5/typenull.png',
  'Type: Null': 'https://play.pokemonshowdown.com/sprites/gen5/typenull.png',
  'Hakomo-o': 'https://play.pokemonshowdown.com/sprites/gen5/hakamoo.png',
  'Kommo-o': 'https://play.pokemonshowdown.com/sprites/gen5/kommoo.png',
  'Tapu Koko': 'https://play.pokemonshowdown.com/sprites/gen5/tapukoko.png',
  'Tapu Lele': 'https://play.pokemonshowdown.com/sprites/gen5/tapulele.png',
  'Tapu Bulu': 'https://play.pokemonshowdown.com/sprites/gen5/tapubulu.png',
  'Tapu Fini': 'https://play.pokemonshowdown.com/sprites/gen5/tapufini.png',
  'Necrozma-Dusk-Mane': 'https://play.pokemonshowdown.com/sprites/gen5/necrozma-duskmane.png',
  'Necrozma-Dawn-Wings': 'https://play.pokemonshowdown.com/sprites/gen5/necrozma-dawnwings.png',
  'Mr. Rime': 'https://play.pokemonshowdown.com/sprites/gen5/mrrime.png',
  'Urshifu-Rapid-Strike': 'https://play.pokemonshowdown.com/sprites/gen5/urshifu-rapidstrike.png',
  'Great Tusk': 'https://play.pokemonshowdown.com/sprites/gen5/greattusk.png',
  'Scream Tail': 'https://play.pokemonshowdown.com/sprites/gen5/screamtail.png',
  'Brute Bonnet': 'https://play.pokemonshowdown.com/sprites/gen5/brutebonnet.png',
  'Flutter Mane': 'https://play.pokemonshowdown.com/sprites/gen5/fluttermane.png',
  'Slither Wing': 'https://play.pokemonshowdown.com/sprites/gen5/slitherwing.png',
  'Sandy Shocks': 'https://play.pokemonshowdown.com/sprites/gen5/sandyshocks.png',
  'Iron Treads': 'https://play.pokemonshowdown.com/sprites/gen5/irontreads.png',
  'Iron Bundle': 'https://play.pokemonshowdown.com/sprites/gen5/ironbundle.png',
  'Iron Hands': 'https://play.pokemonshowdown.com/sprites/gen5/ironhands.png',
  'Iron Jugulis': 'https://play.pokemonshowdown.com/sprites/gen5/ironjugulis.png',
  'Iron Moth': 'https://play.pokemonshowdown.com/sprites/gen5/ironmoth.png',
  'Iron Thorns': 'https://play.pokemonshowdown.com/sprites/gen5/ironthorns.png',
  'Wo-Chien': 'https://play.pokemonshowdown.com/sprites/gen5/wochien.png',
  'Chien-Pao': 'https://play.pokemonshowdown.com/sprites/gen5/chienpao.png',
  'Ting-Lu': 'https://play.pokemonshowdown.com/sprites/gen5/tinglu.png',
  'Chi-Yu': 'https://play.pokemonshowdown.com/sprites/gen5/chiyu.png',
  'Roaring Moon': 'https://play.pokemonshowdown.com/sprites/gen5/roaringmoon.png',
  'Iron Valiant': 'https://play.pokemonshowdown.com/sprites/gen5/ironvaliant.png',
  'Walking Wake': 'https://play.pokemonshowdown.com/sprites/gen5/walkingwake.png',
  'Iron Leaves': 'https://play.pokemonshowdown.com/sprites/gen5/ironleaves.png',
  'Gouging Fire': 'https://play.pokemonshowdown.com/sprites/gen5/gougingfire.png',
  'Raging Bolt': 'https://play.pokemonshowdown.com/sprites/gen5/ragingbolt.png',
  'Iron Boulder': 'https://play.pokemonshowdown.com/sprites/gen5/ironboulder.png',
  'Iron Crown': 'https://play.pokemonshowdown.com/sprites/gen5/ironcrown.png',
  'Charizard-Mega-X': 'https://play.pokemonshowdown.com/sprites/gen5/charizard-megax.png',
  'Charizard-Mega-Y': 'https://play.pokemonshowdown.com/sprites/gen5/charizard-megay.png',
  'Meowstic-M-Mega': 'https://play.pokemonshowdown.com/sprites/gen5/meowstic-mmega.png',
  'Meowstic-F-Mega': 'https://play.pokemonshowdown.com/sprites/gen5/meowstic-fmega.png',
  'Annihilape-Fist': 'https://play.pokemonshowdown.com/sprites/gen5/annihilape.png',
};

const toSpriteUrl = (name) => spriteUrlOverrides[name] ?? `https://play.pokemonshowdown.com/sprites/gen5/${toSpriteSlug(name)}.png`;

const loadExportedObject = ({ filePath, exportName, startPattern }) => {
  const sourceText = fs.readFileSync(filePath, 'utf8');
  const executableSource = sourceText
    .replace(startPattern, `const ${exportName} = `)
    .replace(/\s+as const;\s*$/, `;\nmodule.exports = { ${exportName} };`)
    .replace(/\n};\s*$/, `\n};\nmodule.exports = { ${exportName} };`);

  const context = { module: { exports: {} }, exports: {} };
  vm.createContext(context);
  vm.runInContext(executableSource, context, { filename: path.basename(filePath) });
  return context.module.exports[exportName];
};

const parseTopLevelEntries = (text) => {
  const lines = text.split(/\r?\n/);
  const entries = new Map();
  let currentId = null;
  let currentLines = [];
  let braceDepth = 0;

  for (const line of lines) {
    if (!currentId) {
      const match = line.match(/^\t(?:"([^"]+)"|([a-z0-9]+)):\s*\{$/);
      if (!match) continue;
      currentId = match[1] ?? match[2];
      currentLines = [line];
      braceDepth = (line.match(/\{/g) ?? []).length - (line.match(/\}/g) ?? []).length;
      continue;
    }

    currentLines.push(line);
    braceDepth += (line.match(/\{/g) ?? []).length - (line.match(/\}/g) ?? []).length;

    if (braceDepth === 0) {
      entries.set(currentId, currentLines.join('\n'));
      currentId = null;
      currentLines = [];
    }
  }

  return entries;
};

const Pokedex = loadExportedObject({
  filePath: sourcePaths.pokedex,
  exportName: 'Pokedex',
  startPattern: /export const Pokedex(?:\s*:\s*import\([^)]*\)\.SpeciesDataTable)?\s*=\s*/,
});

const punktekosten = loadExportedObject({
  filePath: sourcePaths.costs,
  exportName: 'punktekosten',
  startPattern: /export const punktekosten\s*=\s*/,
});

const TypeChart = loadExportedObject({
  filePath: sourcePaths.typechart,
  exportName: 'TypeChart',
  startPattern: /export const TypeChart(?:\s*:\s*import\([^)]*\)\.TypeDataTable)?\s*=\s*/,
});

const AbilitiesText = loadExportedObject({
  filePath: sourcePaths.abilitiesText,
  exportName: 'AbilitiesText',
  startPattern: /export const AbilitiesText:\s*\{[^=]+\}\s*=\s*/,
});

const MovesText = loadExportedObject({
  filePath: sourcePaths.moveText,
  exportName: 'MovesText',
  startPattern: /export const MovesText:\s*\{[^=]+\}\s*=\s*/,
});

const movesSourceText = fs.readFileSync(sourcePaths.moves, 'utf8');
const moveEntries = parseTopLevelEntries(movesSourceText);
const Moves = Object.fromEntries(
  [...moveEntries.entries()].map(([id, body]) => {
    const name = body.match(/\n\t\tname:\s*"([^"]+)"/)?.[1] ?? id;
    const type = body.match(/\n\t\ttype:\s*"([^"]+)"/)?.[1] ?? null;
    const category = body.match(/\n\t\tcategory:\s*"([^"]+)"/)?.[1] ?? null;
    const basePowerRaw = body.match(/\n\t\tbasePower:\s*([^,\n]+)/)?.[1]?.trim() ?? '0';
    const basePower = /^\d+$/.test(basePowerRaw) ? Number(basePowerRaw) : 0;
    const accuracyRaw = body.match(/\n\t\taccuracy:\s*([^,\n]+)/)?.[1]?.trim() ?? 'true';
    const accuracy = /^\d+$/.test(accuracyRaw) ? Number(accuracyRaw) : null;
    const moveText = MovesText[id] ?? {};
    return [
      id,
      {
        id,
        name,
        type,
        category,
        basePower,
        accuracy,
        shortDesc: moveText.shortDesc ?? null,
        desc: moveText.desc ?? null,
      },
    ];
  }),
);

const learnsetsSourceText = fs.readFileSync(sourcePaths.learnsets, 'utf8');
const learnsetEntries = parseTopLevelEntries(learnsetsSourceText);
const Learnsets = Object.fromEntries(
  [...learnsetEntries.entries()].map(([id, body]) => {
    const learnsetBlock = body.match(/\n\t\tlearnset:\s*\{([\s\S]*?)\n\t\t\},?/);
    const learnset = {};

    if (learnsetBlock) {
      for (const match of learnsetBlock[1].matchAll(/\n\t\t\t"?([a-z0-9]+)"?:\s*\[([^\]]*)\]/g)) {
        const moveId = match[1];
        const methods = [...match[2].matchAll(/"([^"]+)"/g)].map((methodMatch) => methodMatch[1]);
        learnset[moveId] = methods;
      }
    }

    return [id, { learnset }];
  }),
);

const costByName = new Map(punktekosten.map((entry) => [entry.name, entry]));
const attackTypes = Object.keys(TypeChart)
  .map((typeId) => TypeChart[typeId])
  .find(Boolean);
const canonicalTypes = Object.keys(attackTypes.damageTaken).filter((key) => /^[A-Z]/.test(key));
const typeToMultiplier = {
  0: 1,
  1: 2,
  2: 0.5,
  3: 0,
};
const immunityAbilitiesByType = {
  Ground: new Set(['Earth Eater', 'Levitate']),
  Water: new Set(['Dry Skin', 'Storm Drain', 'Water Absorb']),
  Electric: new Set(['Lightning Rod', 'Motor Drive', 'Volt Absorb']),
  Grass: new Set(['Sap Sipper']),
  Fire: new Set(['Flash Fire', 'Well-Baked Body']),
};
const modifierAbilitiesByType = {
  Water: new Map([
    ['Heatproof', 0.5],
    ['Water Bubble', 0.5],
  ]),
  Fire: new Map([
    ['Fluffy', 2],
    ['Dry Skin', 1.25],
  ]),
  Ghost: new Map([['Purifying Salt', 0.5]]),
};

function getTypeId(typeName) {
  return typeName.toLowerCase();
}

function calculateBaseMultiplier(defendingTypes, attackingType) {
  let multiplier = 1;

  for (const defendingType of defendingTypes) {
    const damageTaken = TypeChart[getTypeId(defendingType)].damageTaken[attackingType];
    multiplier *= typeToMultiplier[damageTaken] ?? 1;
  }

  return multiplier;
}

function normalizeDefenseValue(value) {
  if (value === 0) return 0;
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? rounded : rounded;
}

function buildDefenseValue(species, attackingType) {
  const abilities = Object.values(species.abilities ?? {});
  const baseValue = normalizeDefenseValue(calculateBaseMultiplier(species.types ?? [], attackingType));

  if (species.name === 'Shedinja') {
    return baseValue < 2 ? 0 : baseValue;
  }

  const possibleValues = new Set([baseValue]);
  const immunityAbilities = immunityAbilitiesByType[attackingType] ?? new Set();
  const modifierAbilities = modifierAbilitiesByType[attackingType] ?? new Map();

  for (const ability of abilities) {
    if (immunityAbilities.has(ability)) {
      possibleValues.add(0);
      continue;
    }

    if (modifierAbilities.has(ability)) {
      possibleValues.add(normalizeDefenseValue(baseValue * modifierAbilities.get(ability)));
    }
  }

  const values = [...possibleValues].sort((left, right) => left - right);

  if (abilities.length === 1) {
    if ((immunityAbilities.has(abilities[0]) || modifierAbilities.has(abilities[0])) && values.length) {
      return values[values.length - 1] === baseValue && values[0] !== baseValue
        ? values[0]
        : values.length === 1
          ? values[0]
          : values.find((value) => value !== baseValue) ?? values[0];
    }
    return baseValue;
  }

  const hasRelevantAbility = abilities.some(
    (ability) => immunityAbilities.has(ability) || modifierAbilities.has(ability),
  );

  return hasRelevantAbility ? values : baseValue;
}

const defenseByName = new Map(
  Object.values(Pokedex)
    .filter((species) => typeof species.num === 'number' && species.num >= 1 && species.name)
    .map((species) => [
      species.name,
      Object.fromEntries(
        canonicalTypes.map((attackingType) => [
          `${attackingType.toLowerCase()}_defense`,
          buildDefenseValue(species, attackingType),
        ]),
      ),
    ]),
);

const abilityTextByName = new Map(
  Object.entries(AbilitiesText).map(([id, ability]) => [
    ability.name,
    {
      id,
      name: ability.name,
      shortDesc: ability.shortDesc ?? null,
      desc: ability.desc ?? ability.shortDesc ?? null,
    },
  ]),
);

const getLearnsetForSpecies = (speciesId, species) => {
  const candidateIds = [
    speciesId,
    species.baseSpecies ? toId(species.baseSpecies) : null,
    species.changesFrom ? toId(species.changesFrom) : null,
  ].filter(Boolean);

  for (const candidateId of candidateIds) {
    const learnsetEntry = Learnsets[candidateId];
    if (learnsetEntry?.learnset && Object.keys(learnsetEntry.learnset).length) return learnsetEntry.learnset;
  }

  return {};
};

const allAbilityNames = new Set();
for (const species of Object.values(Pokedex)) {
  for (const abilityName of Object.values(species.abilities ?? {})) {
    allAbilityNames.add(abilityName);
  }
}

const allMoveOptions = Object.values(Moves)
  .filter((move) => move.name)
  .map(({ id, name }) => ({ id, name }))
  .sort((left, right) => left.name.localeCompare(right.name));

const pokedexEntries = Object.entries(Pokedex)
  .map(([speciesId, species], sourceIndex) => {
    const learnset = getLearnsetForSpecies(speciesId, species);
    const moveIds = Object.keys(learnset).filter((moveId) => Moves[moveId]?.name);
    const coverageByType = {};

    for (const moveId of moveIds) {
      const move = Moves[moveId];
      if (!move || move.category === 'Status' || typeof move.basePower !== 'number') continue;
      if (!move.type) continue;
      coverageByType[move.type] = Math.max(coverageByType[move.type] ?? 0, move.basePower);
    }

    const abilityDetails = Object.entries(species.abilities ?? {}).map(([slot, abilityName]) => {
      const text = abilityTextByName.get(abilityName) ?? {
        id: toId(abilityName),
        name: abilityName,
        shortDesc: null,
        desc: null,
      };
      return { slot, ...text };
    });

    return {
      speciesId,
      sourceIndex,
      num: species.num,
      name: species.name,
      types: species.types ?? [],
      abilities: species.abilities ?? {},
      abilityDetails,
      baseStats: species.baseStats ?? {},
      baseSpecies: species.baseSpecies ?? null,
      forme: species.forme ?? null,
      changesFrom: species.changesFrom ?? null,
      prevo: species.prevo ?? null,
      evos: species.evos ?? [],
      otherFormes: species.otherFormes ?? [],
      formeOrder: species.formeOrder ?? [],
      tags: species.tags ?? [],
      cost: costByName.has(species.name) ? costByName.get(species.name).cost : null,
      impossible: costByName.has(species.name) ? costByName.get(species.name).impossible : false,
      unreleased: costByName.has(species.name) ? costByName.get(species.name).unreleased : false,
      untiered: costByName.has(species.name) ? costByName.get(species.name).untiered : false,
      hidden: costByName.has(species.name) ? costByName.get(species.name).hidden : false,
      linkedTo: costByName.has(species.name) ? costByName.get(species.name).linkedTo : null,
      moveIds,
      learnset,
      coverageByType,
      ...(defenseByName.get(species.name) ?? {}),
      sprite: toSpriteUrl(species.name),
    };
  })
  .filter((species) => typeof species.num === 'number' && species.num >= 1 && species.name)
  .sort((left, right) => {
    if (left.num !== right.num) return left.num - right.num;
    return left.sourceIndex - right.sourceIndex;
  })
  .map((species) => ({
    ...species,
    displayNumber: `#${String(species.num).padStart(4, '0')}`,
  }));

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(
  outputScriptPath,
  [
    `window.POKEDEX_ENTRIES = ${JSON.stringify(pokedexEntries, null, 2)};`,
    `window.POKEDEX_META = ${JSON.stringify(
      {
        abilities: [...allAbilityNames].sort((left, right) => left.localeCompare(right)),
        moves: allMoveOptions,
        movesById: Moves,
      },
      null,
      2,
    )};`,
    '',
  ].join('\n'),
);

console.log(
  `Generated ${pokedexEntries.length} Pokedex entries at ${outputScriptPath}`,
);
