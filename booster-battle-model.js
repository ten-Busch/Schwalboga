window.BoosterBattle = (() => {
  const pokemonByName = new Map((window.POKEDEX_ENTRIES ?? []).map((p) => [p.name, p]));
  const rarityFactors = { common: 1, uncommon: 1.05, rare: 1.10, super: 1.15, special: 1.20 };
  const bands = { common: [100, 199], uncommon: [300, 499], rare: [700, 1499], super: [2200, 99999], special: [150000, 250000] };
  const groupKey = (card) => JSON.stringify([card.pokemonName, Boolean(card.fullArt)]);
  function groupedRates(entries, set) {
    if (set.kind === 'magma-aqua') return window.MagmaAquaBooster.model(entries, set).groupedRates;
    const rates = window.calculateBoosterPullrates(entries, set);
    const standard = window.calculateStandardBoosterPullrates(entries, set);
    const god = window.createGodPackModel(entries, set, standard);
    const groups = new Map();
    for (const row of rates) {
      const id = groupKey(row.card);
      if (!groups.has(id)) groups.set(id, { key: id, card: { ...row.card, trainer: null, energyFoil: false }, main: 0, energy: 0, standardMain: 0, standardEnergy: 0 });
      groups.get(id)[row.card.energyFoil ? 'energy' : 'main'] += row.probability;
    }
    for (const row of standard) groups.get(groupKey(row.card))[row.card.energyFoil ? 'standardEnergy' : 'standardMain'] += row.probability;
    return [...groups.values()].map((g) => {
      const chance = god.chance || 0;
      const godMain = chance ? (g.main - (1 - chance) * g.standardMain) / chance : 0;
      const godEnergy = chance ? (g.energy - (1 - chance) * g.standardEnergy) / chance : 0;
      const union = (a, b) => a + b - a * b;
      return { key: g.key, card: g.card, probability: Math.min(1, (1 - chance) * union(g.standardMain, g.standardEnergy) + chance * union(godMain, godEnergy)) };
    }).sort((a, b) => b.probability - a.probability);
  }
  const rarityMultiplier = (card) => rarityFactors[Array.isArray(card.rarity) ? card.rarity[0] : card.rarity] ?? 1;
  const multiplier = (card) => rarityMultiplier(card) * (card.fullArt ? 2 : 1) * (card.trainer ? 1.5 : 1)
    * (['z', 'tera'].includes(card.variant) ? 1.15 : 1)
    * (['Marc', 'Adrian'].includes(card.trainer) ? 1.1 : 1);
  function quote(card, probability) {
    if (!(probability > 0 && probability <= 1)) throw new Error('Ungültige Pullrate.');
    const tier = Array.isArray(card.rarity) ? card.rarity[0] : card.rarity;
    const [floor, ceiling] = bands[tier] ?? [1, Infinity];
    const premiumFloor = card.setId === 'magma-aqua' && ['Groudon-Primal', 'Kyogre-Primal'].includes(card.pokemonName) ? 5000 : floor;
    const base = Math.min(ceiling, Math.max(premiumFloor, Math.round(10 / Math.sqrt(probability))));
    const bonus = multiplier(card);
    const dittoBonus = card.setId === 'magma-aqua' && card.pokemonName === 'Ditto' ? 2500 : 0;
    const offTeamBonus = card.setId === 'magma-aqua' && window.MagmaAquaBooster?.offTeamType(pokemonByName.get(card.pokemonName), card.trainer) ? 50 : 0;
    return { probability, base: dittoBonus ? 0 : base, rarityMultiplier: rarityMultiplier(card), multiplier: bonus, dittoBonus, offTeamBonus, amount: dittoBonus || Math.round(base * bonus) + offTeamBonus };
  }
  function create({ names, packs, order, set, entries = window.POKEDEX_ENTRIES }) {
    if (!Array.isArray(names) || names.length < 2 || names.length > 10) throw new Error('2–10 Spieler erforderlich.');
    if (!Number.isInteger(packs) || packs < 1 || packs > 100) throw new Error('1–100 Packs pro Spieler erforderlich.');
    if (!['alternate', 'sequential'].includes(order)) throw new Error('Ungültige Reihenfolge.');
    const byName = new Map(entries.map((p) => [p.name, p]));
    const rates = window.calculateBoosterPullrates(entries, set);
    const baseRates = groupedRates(entries, set);
    const rateMap = new Map(baseRates.map((r) => [r.key, r.probability]));
    const draw = window.createEndlessBooster(entries, set);
    const players = names.map((name, i) => ({ id: i, name: String(name).trim().slice(0, 32) || `Spieler ${i + 1}`, opened: 0, score: 0, pulls: [] }));
    const key = (card) => window.boosterVersionKey(card, byName.get(card.pokemonName));
    const value = (card) => quote(card, rateMap.get(groupKey(card)));
    const match = { players, packs, order, set, rates, current: 0, finished: false, pending: null,
      value,
      open() {
        if (match.finished) return null;
        if (match.pending) return match.pending;
        const team = draw();
        // Battle packaging is independent of the collection's set packaging.
        if (!set.packaging) delete team.packaging;
        match.pending = { player: match.current, team, credited: false, total: 0 };
        return match.pending;
      },
      credit() {
        const pack = match.pending;
        if (!pack) throw new Error('Kein offenes Pack.');
        if (pack.credited) return pack.total;
        const pulls = [...pack.team.cards, ...(pack.team.energyPokemon ? [pack.team.energyPokemon] : [])]
          .map((card) => ({ card, ...value(card) }));
        const player = players[pack.player];
        pack.total = pulls.reduce((sum, pull) => sum + pull.amount, 0);
        player.pulls.push(...pulls);
        player.score += pack.total;
        player.opened++;
        pack.credited = true;
        return pack.total;
      },
      advance() {
        if (!match.pending?.credited) return false;
        const previous = match.pending.player;
        match.pending = null;
        match.finished = players.every((p) => p.opened === packs);
        if (match.finished) { match.current = -1; return true; }
        if (order === 'sequential' && players[previous].opened < packs) match.current = previous;
        else {
          match.current = (previous + 1) % players.length;
          while (players[match.current].opened >= packs) match.current = (match.current + 1) % players.length;
        }
        return true;
      },
      revealOptions() {
        const player = players[match.current];
        const owned = new Map(player.pulls.map((p) => [key(p.card), p.card]));
        const common = rates.filter((r) => r.card.rarity === 'rare' && r.card.variant === 'normal'
          && !r.card.fullArt && !r.card.trainer && !r.card.energyFoil);
        const alreadyOwned = common.filter((r) => owned.has(r.key));
        const decoys = (alreadyOwned.length ? alreadyOwned : common).slice(0, 8).map((row) => {
          if (owned.has(row.key)) return owned.get(row.key);
          const p = byName.get(row.card.pokemonName);
          const record = set.records.find((r) => r.pokemonName === p.name);
          return { ...row.card, stamp: set.stamp, rarity: window.boosterCardRarity(p, record, row.card, entries), movePool: record.brought ? record.moves : undefined };
        });
        return { ownedVersionKeys: new Set(owned.keys()), fakeoutDecoys: decoys,
          fakeoutEligible: (actual, decoy) => rarityMultiplier(actual) > rarityMultiplier(decoy) && value(actual).amount > value(decoy).amount,
          fakeoutKeys: new Set(rates.filter((r) => rateMap.get(groupKey(r.card)) < .0007).map((r) => r.key)),
          chaseKeys: new Set(rates.filter((r) => Math.abs(r.probability - rates.at(-1).probability) < 1e-12).map((r) => r.key)) };
      },
      ranking() {
        return [...players].sort((a, b) => b.score - a.score || a.id - b.id)
          .map((p) => ({ ...p, rank: 1 + players.filter((other) => other.score > p.score).length }));
      },
    };
    return match;
  }
  return { create, quote, multiplier, rarityMultiplier, groupedRates, groupKey, bands };
})();
