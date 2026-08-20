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
  translations: path.join(workspaceRoot, 'data', 'translations.json'),
};
const outputDirectory = path.join(workspaceRoot, 'data');
const outputScriptPath = path.join(outputDirectory, 'pokedex-data.js');

const toId = (value) =>
  String(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2019']/g, '')
    .replace(/[^a-z0-9]+/g, '');

const normalizeSearchText = (values) =>
  values
    .filter((value) => value !== null && value !== undefined && value !== '')
    .map(toId)
    .filter(Boolean)
    .join(' ');

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
  'Pikachu-Rock-Star': 'https://play.pokemonshowdown.com/sprites/gen5/pikachu-rockstar.png',
  'Pikachu-Pop-Star': 'https://play.pokemonshowdown.com/sprites/gen5/pikachu-popstar.png',
  'Pichu-Spiky-eared': 'https://play.pokemonshowdown.com/sprites/gen5/pichu-spikyeared.png',
  'Basculin-Blue-Striped': 'https://play.pokemonshowdown.com/sprites/gen5/basculin-bluestriped.png',
  'Basculin-White-Striped': 'https://play.pokemonshowdown.com/sprites/gen5/basculin-whitestriped.png',
  'Darmanitan-Galar-Zen': 'https://play.pokemonshowdown.com/sprites/gen5/darmanitan-galarzen.png',
  'Oricorio-Pom-Pom': 'https://play.pokemonshowdown.com/sprites/gen5/oricorio-pompom.png',
  'Toxtricity-Low-Key': 'https://play.pokemonshowdown.com/sprites/gen5/toxtricity-lowkey.png',
  'Urshifu-Rapid-Strike': 'https://play.pokemonshowdown.com/sprites/gen5/urshifu-rapidstrike.png',
  'Urshifu-Rapid-Strike-Gmax': 'https://play.pokemonshowdown.com/sprites/gen5/urshifu-rapidstrikegmax.png',
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
  'Dudunsparce-Three-Segment': 'https://play.pokemonshowdown.com/sprites/gen5/dudunsparce-threesegment.png',
  'Ogerpon-Teal-Tera': 'https://play.pokemonshowdown.com/sprites/gen5/ogerpon-tealtera.png',
  'Ogerpon-Wellspring-Tera': 'https://play.pokemonshowdown.com/sprites/gen5/ogerpon-wellspringtera.png',
  'Ogerpon-Hearthflame-Tera': 'https://play.pokemonshowdown.com/sprites/gen5/ogerpon-hearthflametera.png',
  'Ogerpon-Cornerstone-Tera': 'https://play.pokemonshowdown.com/sprites/gen5/ogerpon-cornerstonetera.png',
};

const toSpriteUrl = (name) => spriteUrlOverrides[name] ?? `https://play.pokemonshowdown.com/sprites/gen5/${toSpriteSlug(name)}.png`;

function getSpeciesSpriteData(species) {
  const defaultSprite = typeof species.sprite === 'string' && species.sprite
    ? species.sprite
    : toSpriteUrl(species.name);
  const rawOptions = Array.isArray(species.spriteOptions)
    ? species.spriteOptions
    : Array.isArray(species.sprites)
      ? species.sprites
      : null;
  const spriteOptions = rawOptions
    ? [...new Set(rawOptions.filter((option) => typeof option === 'string' && option.trim()).map((option) => option.trim()))]
    : [defaultSprite];
  const sprite = spriteOptions[0] ?? defaultSprite;
  return {
    sprite,
    ...(spriteOptions.length > 1 ? { spriteOptions } : {}),
  };
}

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

const Translations = fs.existsSync(sourcePaths.translations)
  ? JSON.parse(fs.readFileSync(sourcePaths.translations, 'utf8'))
  : { pokemon: {}, moves: {}, abilities: {} };

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
    const translatedName = Translations.moves?.[id]?.de ?? null;
    const names = translatedName ? { de: translatedName } : undefined;
    return [
      id,
      {
        id,
        name,
        ...(names ? { names } : {}),
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
      ...(Translations.abilities?.[id]?.de ? { names: { de: Translations.abilities[id].de } } : {}),
      shortDesc: ability.shortDesc ?? null,
      desc: ability.desc ?? ability.shortDesc ?? null,
    },
  ]),
);

const pokemonIdByName = new Map(Object.entries(Pokedex).map(([id, species]) => [toId(species.name), id]));

const pokemonFormSuffixTranslations = [
  ['Mega-X', 'Mega-X'],
  ['Mega-Y', 'Mega-Y'],
  ['Rapid-Strike', 'Fließender Stil'],
  ['Dusk-Mane', 'Abendmähne'],
  ['Dawn-Wings', 'Morgenschwingen'],
  ['Hearthflame', 'Ofen'],
  ['Cornerstone', 'Fundament'],
  ['Wellspring', 'Brunnen'],
  ['Bloodmoon', 'Blutmond'],
  ['Therian', 'Tiergeist'],
  ['Unbound', 'Entfesselt'],
  ['Midnight', 'Nacht'],
  ['Defense', 'Verteidigung'],
  ['Attack', 'Angriff'],
  ['Speed', 'Initiative'],
  ['Primal', 'Proto'],
  ['Sandy', 'Sand'],
  ['Trashy', 'Lumpen'],
  ['Trash', 'Lumpen'],
  ['Crowned', 'König'],
  ['Alola', 'Alola'],
  ['Galar', 'Galar'],
  ['Hisui', 'Hisui'],
  ['Mega', 'Mega'],
  ['Gmax', 'GMAX'],
  ['Tera', 'Tera'],
  ['Heat', 'Hitze'],
  ['Wash', 'Wasch'],
  ['Fan', 'Wirbel'],
  ['Cut', 'Schneid'],
  ['Mow', 'Schneid'],
  ['Sky', 'Himmel'],
  ['Black', 'Schwarz'],
  ['White', 'Weiß'],
  ['Dusk', 'Zwielicht'],
  ['Ice', 'Schimmel'],
  ['Shadow', 'Rappe'],
];

function getPokemonBaseGermanNameByEnglishName(name) {
  const baseId = pokemonIdByName.get(toId(name));
  return baseId ? (getPokemonGermanName(baseId, Pokedex[baseId].name) ?? Pokedex[baseId].name) : null;
}

function getPokemonGermanName(speciesId, name) {
  const direct = Translations.pokemon?.[speciesId]?.de;
  if (direct) return direct;

  for (const [englishSuffix, germanSuffix] of pokemonFormSuffixTranslations) {
    const token = `-${englishSuffix}`;
    if (!name.endsWith(token)) continue;
    const baseName = getPokemonBaseGermanNameByEnglishName(name.slice(0, -token.length));
    if (baseName) return `${baseName}-${germanSuffix}`;
  }

  return null;
}

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
const allAbilityOptionsById = new Map();
for (const species of Object.values(Pokedex)) {
  for (const abilityName of Object.values(species.abilities ?? {})) {
    allAbilityNames.add(abilityName);
    const abilityText = abilityTextByName.get(abilityName);
    if (abilityText) {
      allAbilityOptionsById.set(abilityText.id, {
        id: abilityText.id,
        name: abilityText.name,
        ...(abilityText.names ? { names: abilityText.names } : {}),
        searchText: normalizeSearchText([abilityText.name, abilityText.names?.de]),
      });
    }
  }
}

const allMoveOptions = Object.values(Moves)
  .filter((move) => move.name)
  .map(({ id, name, names }) => ({
    id,
    name,
    ...(names ? { names } : {}),
    searchText: normalizeSearchText([name, names?.de]),
  }))
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
    const germanName = getPokemonGermanName(speciesId, species.name);
    const names = germanName ? { de: germanName } : undefined;
    const searchText = normalizeSearchText([
      `#${String(species.num).padStart(4, '0')}`,
      String(species.num),
      species.name,
      names?.de,
      species.displayName,
      ...(species.types ?? []),
    ]);

    const spriteData = getSpeciesSpriteData(species);

    return {
      speciesId,
      sourceIndex,
      num: species.num,
      name: species.name,
      ...(names ? { names } : {}),
      searchText,
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
      cost_dbl: costByName.has(species.name)
        ? (costByName.get(species.name).cost_dbl ?? costByName.get(species.name).cost)
        : null,
      cost_dbl_is_placeholder: costByName.has(species.name)
        ? !Object.prototype.hasOwnProperty.call(costByName.get(species.name), 'cost_dbl')
        : true,
      impossible: costByName.has(species.name) ? costByName.get(species.name).impossible : false,
      unreleased: costByName.has(species.name) ? costByName.get(species.name).unreleased : false,
      untiered: costByName.has(species.name) ? costByName.get(species.name).untiered : false,
      hidden: costByName.has(species.name) ? costByName.get(species.name).hidden : false,
      linkedTo: costByName.has(species.name) ? costByName.get(species.name).linkedTo : null,
      moveIds,
      learnset,
      coverageByType,
      ...(defenseByName.get(species.name) ?? {}),
      ...spriteData,
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
        abilityOptions: [...allAbilityOptionsById.values()].sort((left, right) => left.name.localeCompare(right.name)),
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
