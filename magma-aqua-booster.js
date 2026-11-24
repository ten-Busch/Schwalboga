window.MagmaAquaBooster = (() => {
  const cache = new WeakMap();
  const rarityLabels = { common: ['common', 'Häufig', '●'], uncommon: ['uncommon', 'Nicht häufig', '◆'], rare: ['rare', 'Selten', '★'], super: ['super', 'Super-selten', '★'] };
  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  function offTeamType(pokemon, trainer) {
    const opposing = ['Magma', 'Marc'].includes(trainer) ? ['Water', 'Ice']
      : ['Aqua', 'Adrian'].includes(trainer) ? ['Ground', 'Fire', 'Rock'] : [];
    return opposing.includes(pokemon?.types[0]) ? pokemon.types.find((type) => ['Dark', 'Poison'].includes(type)) : undefined;
  }
  function distribution(rows) {
    const total = rows.reduce((sum, r) => sum + r.weight, 0);
    let cumulative = 0;
    return rows.map((r) => ({ ...r, weight: r.weight / total, cumulative: cumulative += r.weight / total }));
  }
  function sample(rows) {
    const roll = Math.random();
    let lo = 0, hi = rows.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (roll < rows[mid].cumulative) hi = mid; else lo = mid + 1; }
    return rows[lo];
  }
  function model(entries, set) {
    if (cache.has(set)) return cache.get(set);
    const byName = new Map(entries.map((p) => [p.name, p]));
    const types = Object.keys(window.MiloCards.elements);
    const catalog = new Map(), versions = new Map();
    const records = set.records.filter((r) => byName.has(r.pokemonName));
    const key = (card) => window.boosterVersionKey(card, byName.get(card.pokemonName));
    const mega = (p) => /-Mega(?:-|$)/.test(p.name);
    const trainers = (r, p) => {
      if (r.leader) return [{ name: null, weight: .9 }, { name: r.leader, weight: .1 }];
      if (!r.teams.length) return [{ name: null, weight: 1 }];
      const rows = [{ name: null, weight: .9 }];
      for (const team of r.teams) {
        rows.push({ name: team, weight: .1 / r.teams.length * (mega(p) ? .9 : 1) });
        if (mega(p)) rows.push({ name: team === 'Magma' ? 'Marc' : 'Adrian', weight: .01 / r.teams.length });
      }
      return rows;
    };
    const register = (card, weight, rows) => {
      const p = byName.get(card.pokemonName);
      const id = key(card);
      card.num = p.num;
      catalog.set(id, card);
      if (rows) rows.push({ key: id, card, weight });
    };
    for (const r of records.filter((r) => !r.chaseOnly)) {
      const p = byName.get(r.pokemonName), rows = [];
      const canUpgrade = !mega(p) && !r.primal && !['Rayquaza', 'Ditto'].includes(p.name);
      const variants = canUpgrade ? [['normal', .7], ['z', .15], ['tera', .15]] : [[mega(p) ? 'mega' : 'normal', 1]];
      for (const trainer of trainers(r, p)) {
        const claimedType = offTeamType(p, trainer.name);
        const nativeTypes = claimedType ? [claimedType] : p.types;
        const allowed = !trainer.name ? types : ['Magma', 'Marc'].includes(trainer.name) ? set.magmaTypes : set.aquaTypes;
        const canArt = window.MiloCards.fullArtBackground(p) && !['Rayquaza', 'Ditto'].includes(p.name) && !(r.primal && trainer.name === r.leader);
        const arts = canArt ? [[false, .9], [true, .1]] : [[false, 1]];
        for (const [variant, variantWeight] of variants) for (const nativeType of variant === 'tera' ? [nativeTypes[0]] : nativeTypes) {
          for (const type of ['z', 'tera'].includes(variant) ? allowed : [nativeType]) for (const [fullArt, artWeight] of arts) {
            const card = { setId: set.id, stamp: set.stamp, pokemonName: p.name, variant, nativeType, type,
              trainer: trainer.name, fullArt, rarity: r.rarity };
            const weight = trainer.weight * variantWeight * artWeight / (variant === 'tera' ? 1 : nativeTypes.length)
              / (['z', 'tera'].includes(variant) ? allowed.length : 1);
            register(card, weight, rows);
          }
        }
      }
      versions.set(p.name, distribution(rows));
    }
    const ordinary = records.filter((r) => !r.chaseOnly);
    const tiered = (weights) => {
      const rows = [];
      for (const [tier, mass] of Object.entries(weights)) {
        const pool = ordinary.filter((r) => r.rarity === tier);
        // Primals are premium hits, rather than ordinary equally weighted Megas.
        // Apply this to every main-card pool, including God Packs; Energy Foils
        // retain their separate, uniform species distribution.
        const speciesWeight = (r) => r.primal ? .001 : 1;
        const total = pool.reduce((sum, r) => sum + speciesWeight(r), 0);
        for (const r of pool) for (const row of versions.get(r.pokemonName)) rows.push({ ...row, weight: mass * speciesWeight(r) / total * row.weight });
      }
      return distribution(rows);
    };
    const regular = tiered({ common: 1 });
    const mixed = tiered({ common: .5, uncommon: .5 });
    const uncommon = tiered({ uncommon: 1 });
    const hit = tiered({ rare: .7, super: .3 });
    const godMain = tiered({ rare: .65, super: .35 });
    const godFinalRecords = ordinary.filter((r) => mega(byName.get(r.pokemonName)));
    const godFinal = distribution(godFinalRecords.flatMap((r) => {
      const full = versions.get(r.pokemonName).filter((v) => v.card.fullArt);
      const total = full.reduce((sum, v) => sum + v.weight, 0);
      return full.map((v) => ({ ...v, weight: v.weight / total / godFinalRecords.length }));
    }));
    const energyRecords = ordinary.filter((r) => r.pokemonName !== 'Ditto');
    const rareEnergyRecords = ordinary.filter((r) => r.rarity === 'rare');
    const energyRows = [];
    for (const r of energyRecords) {
      const p = byName.get(r.pokemonName);
      for (const type of p.types) {
        const card = { setId: set.id, stamp: set.stamp, pokemonName: p.name, variant: 'normal', type, nativeType: type,
          energyFoil: true, fullArt: false, trainer: null, rarity: r.rarity };
        register(card, 1 / energyRecords.length / p.types.length, energyRows);
      }
    }
    const energy = distribution(energyRows);
    const godEnergy = distribution(energy.filter((row) => rareEnergyRecords.some((r) => r.pokemonName === row.card.pokemonName)));
    const masses = (rows) => new Map(rows.map((r) => [r.key, r.weight]));
    const maps = [regular, hit, godMain, godFinal, energy, godEnergy, mixed, uncommon].map(masses);
    const inclusion = (a, b) => -Math.expm1(4 * Math.log1p(-a) + Math.log1p(-b));
    const ordinaryChance = (id, reservedMass = 0) => .99 * -Math.expm1(
      2 * Math.log1p(-(maps[0].get(id) ?? 0)) + Math.log1p(-(maps[6].get(id) ?? 0))
      + Math.log1p(-(maps[7].get(id) ?? 0)) + Math.log1p(-(1 - reservedMass) * (maps[1].get(id) ?? 0)))
      + .01 * inclusion(maps[2].get(id) ?? 0, (1 - reservedMass) * (maps[3].get(id) ?? 0));
    const ordinaryRates = [...catalog].map(([id, card]) => card.energyFoil
      ? .99 * .15 * (maps[4].get(id) ?? 0) + .01 * (maps[5].get(id) ?? 0) : ordinaryChance(id));
    const floor = ordinaryRates.reduce((min, p) => p > 0 ? Math.min(min, p) : min, Infinity);
    const jackpots = [];
    for (const name of ['Groudon-Primal', 'Kyogre-Primal', 'Rayquaza-Mega']) {
      const p = byName.get(name), ray = name === 'Rayquaza-Mega';
      for (const type of ray ? ['Dragon'] : p.types) {
        const card = { setId: set.id, stamp: set.stamp, pokemonName: name, variant: ray ? 'mega' : 'normal', type, nativeType: type,
          fullArt: true, trainer: ray ? null : name === 'Groudon-Primal' ? 'Marc' : 'Adrian', rarity: 'super', num: p.num };
        const id = key(card), probability = floor * (ray ? .01 : .1);
        catalog.set(id, card); jackpots.push({ key: id, card, probability });
      }
    }
    const reservedMass = jackpots.reduce((sum, row) => sum + row.probability, 0);
    const groupKey = (card) => JSON.stringify([card.pokemonName, Boolean(card.fullArt)]);
    const groupMaps = [regular, hit, godMain, godFinal, energy, godEnergy, mixed, uncommon].map((pool) => {
      const result = new Map();
      for (const row of pool) { const id = groupKey(row.card); result.set(id, (result.get(id) ?? 0) + row.weight); }
      return result;
    });
    const groups = new Map();
    for (const card of catalog.values()) {
      const id = groupKey(card);
      if (groups.has(id)) continue;
      const mass = (slot) => groupMaps[slot].get(id) ?? 0;
      const jackpotMass = jackpots.filter((j) => groupKey(j.card) === id).reduce((sum, j) => sum + j.probability, 0);
      const normalMiss = (1 - mass(0)) ** 2 * (1 - mass(6)) * (1 - mass(7))
        * (1 - ((1 - reservedMass) * mass(1) + jackpotMass)) * (1 - .15 * mass(4));
      const godMiss = (1 - mass(2)) ** 4 * (1 - ((1 - reservedMass) * mass(3) + jackpotMass)) * (1 - mass(5));
      groups.set(id, { key: id, card: { ...card, trainer: null, energyFoil: false }, probability: .99 * (1 - normalMiss) + .01 * (1 - godMiss) });
    }
    const groupedRates = [...groups.values()].sort((a, b) => b.probability - a.probability);
    const rates = [...catalog].map(([id, card]) => {
      const jackpot = jackpots.find((j) => j.key === id);
      return { key: id, card, probability: jackpot?.probability ?? (card.energyFoil
        ? .99 * .15 * (maps[4].get(id) ?? 0) + .01 * (maps[5].get(id) ?? 0) : ordinaryChance(id, reservedMass)) };
    }).sort((a, b) => b.probability - a.probability || a.key.localeCompare(b.key));
    const jackpotDistribution = distribution(jackpots.map((j) => ({ ...j, weight: j.probability })));
    const materialize = (source) => {
      const card = { ...source };
      card.rarity = window.isBoosterChaseRare(card) ? ['super', 'Chase-Rare', '★★'] : rarityLabels[card.rarity];
      if (card.trainer) card.trainerSprite = pick(set.trainerSprites[card.trainer]);
      return card;
    };
    const result = { catalog, rates, groupedRates, jackpots, trainers, materialize, draw() {
      const godPack = Math.random() < .01;
      const jackpot = Math.random() < reservedMass ? sample(jackpotDistribution).card : null;
      const cards = (godPack ? [godMain, godMain, godMain, godMain] : [regular, regular, mixed, uncommon])
        .map((pool) => materialize(sample(pool).card));
      cards.push(materialize(jackpot ?? sample(godPack ? godFinal : hit).card));
      const energyPokemon = godPack || Math.random() < .15 ? materialize(sample(godPack ? godEnergy : energy).card) : null;
      return { setId: set.id, setName: set.name, godPack, cards, energyPokemon,
        energyType: pick(types), packaging: { design: 'magma-aqua', name: set.name, pokemonName: 'Groudon' } };
    } };
    cache.set(set, result);
    return result;
  }
  return { model, offTeamType, create: (entries, set) => model(entries, set).draw, catalog: (entries, set) => model(entries, set).catalog,
    rates: (entries, set) => model(entries, set).rates };
})();
