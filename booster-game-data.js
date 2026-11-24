window.createEndlessBooster = function createEndlessBooster(entries, set = window.NATDEX_PREMIER) {
  if (set?.kind === 'magma-aqua') return window.MagmaAquaBooster.create(entries, set);
  if (set) return window.createSetBooster(entries, set);
  throw new Error('Booster-Set fehlt.');
};

window.boosterSetRarity = function boosterSetRarity(pokemon, record, entries = window.POKEDEX_ENTRIES) {
  if (record.rarity) return [record.rarity, ({ common: 'Häufig', uncommon: 'Nicht häufig', rare: 'Selten', super: 'Super-selten', special: 'Spezial-selten' })[record.rarity], record.rarity === 'common' ? '●' : record.rarity === 'uncommon' ? '◆' : '★'];
  const base = entries.find((p) => p.name === pokemon.baseSpecies);
  const holo = [...(pokemon.tags ?? []), ...(base?.tags ?? [])].some((tag) => /Legendary|Mythical|Ultra Beast|Paradox/.test(tag));
  return /-Mega(?:-|$)/.test(pokemon.name) ? ['super', 'Super-selten', '★']
    : holo || record.cost >= 12 ? ['rare', 'Selten', '★']
      : record.cost >= 6 ? ['uncommon', 'Nicht häufig', '◆'] : ['common', 'Häufig', '●'];
};

window.isBoosterChaseRare = (card) => (card.setId === 'natdex-lp1' && card.pokemonName === 'Nidoqueen'
  && card.variant === 'normal' && card.fullArt === true && card.trainer === 'Robin'
  && !card.energyFoil && ['Poison', 'Ground'].includes(card.type))
  || (card.setId === 'magma-aqua' && card.pokemonName === 'Rayquaza-Mega' && card.variant === 'mega'
    && card.fullArt === true && card.type === 'Dragon' && !card.trainer && !card.energyFoil);

window.boosterCardRarity = (pokemon, record, card, entries = window.POKEDEX_ENTRIES) => window.isBoosterChaseRare(card)
  ? [card.setId === 'magma-aqua' ? 'super' : 'rare', 'Chase-Rare', '★★'] : window.boosterSetRarity(pokemon, record, entries);

window.promoteBoosterChase = function promoteBoosterChase(cards) {
  const index = cards.findIndex(window.isBoosterChaseRare);
  // Reorder the already-rolled cards; never draw a replacement or change odds.
  if (index >= 0 && index !== cards.length - 1) [cards[index], cards[cards.length - 1]] = [cards[cards.length - 1], cards[index]];
  return cards;
};

// Collection versions exclude random attacks, power rolls and footer decorations.
window.boosterVersionKey = function boosterVersionKey(card, pokemon) {
  const nativeType = card.nativeType ?? (card.variant === 'z' ? pokemon.types[0] : card.type);
  return JSON.stringify([card.setId, card.pokemonName, card.variant, card.type,
    Boolean(card.fullArt), card.trainer ?? null, card.variant === 'z' ? nativeType : null,
    ...(card.energyFoil ? ['energyfoil'] : [])]);
};

window.createBoosterVersionCatalog = function createBoosterVersionCatalog(entries, set) {
  if (set.kind === 'magma-aqua') return window.MagmaAquaBooster.catalog(entries, set);
  const byName = new Map(entries.map((p) => [p.name, p]));
  const catalog = new Map();
  for (const r of set.records) {
    const p = byName.get(r.pokemonName);
    if (!p) continue;
    const mega = /-Mega(?:-|$)/.test(p.name);
    const rarity = window.boosterSetRarity(p, r, entries)[0];
    const variants = p.types.map((type) => ({ variant: mega ? 'mega' : 'normal', type, nativeType: type }));
    if (r.z) for (const nativeType of p.types) variants.push({ variant: 'z', type: r.z, nativeType });
    if (r.tera) variants.push({ variant: 'tera', type: r.tera });
    for (const variant of variants) {
      for (const fullArt of window.MiloCards.fullArtBackground(p) ? [false, true] : [false]) {
        for (const trainer of [null, r.trainer]) {
          const card = { ...variant, setId: set.id, pokemonName: p.name, fullArt, trainer, rarity, num: p.num };
          card.rarity = window.boosterCardRarity(p, r, card, entries)[0];
          catalog.set(window.boosterVersionKey(card, p), card);
        }
      }
    }
    for (const type of p.types) {
      const card = { setId: set.id, pokemonName: p.name, variant: 'normal', type, nativeType: type,
        energyFoil: true, fullArt: false, trainer: null, rarity, num: p.num };
      catalog.set(window.boosterVersionKey(card, p), card);
    }
  }
  return catalog;
};

window.createSetBooster = function createSetBooster(entries, set) {
  const byName = new Map(entries.map((p) => [p.name, p]));
  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  const mega = (p) => /-Mega(?:-|$)/.test(p.name);
  const rarity = (r) => window.boosterSetRarity(byName.get(r.pokemonName), r, entries);
  const pool = set.records.filter((r) => byName.has(r.pokemonName));
  const god = window.createGodPackModel(entries, set, window.calculateStandardBoosterPullrates(entries, set));
  const makeCard = (r, variant, version = {}) => {
    const p = byName.get(r.pokemonName);
    const trainer = Object.hasOwn(version, 'trainer') ? version.trainer : Math.random() < .05 ? r.trainer : null;
    const nativeType = version.nativeType ?? (['normal', 'mega'].includes(variant) && p.types.includes(version.type) ? version.type : pick(p.types));
    const observed = trainer ? [r] : pool.filter((row) => row.pokemonName === r.pokemonName && row.brought);
    const card = { pokemonName: p.name, variant, type: variant === 'z' ? r.z : variant === 'tera' ? r.tera : nativeType,
      nativeType, setId: set.id, stamp: set.stamp, draftCost: r.cost,
      movePool: observed.some((row) => row.brought) ? [...new Set(observed.flatMap((row) => row.moves))] : undefined,
      trainer, trainerSprite: trainer ? r.trainerSprite : null,
      fullArt: version.fullArt ?? Boolean(window.MiloCards.fullArtBackground(p) && Math.random() < .1),
      ...(version.energyFoil ? { energyFoil: true } : {}) };
    card.rarity = window.boosterCardRarity(p, r, card, entries);
    return card;
  };
  const energyCard = (r) => makeCard(r, 'normal', { energyFoil: true, fullArt: false, trainer: null });
  return () => {
    const selected = new Set();
    const take = (items) => {
      const r = pick(items.filter((r) => !selected.has(byName.get(r.pokemonName).num)));
      if (!r) throw new Error('Kein vollständiger Booster verfügbar.');
      selected.add(byName.get(r.pokemonName).num);
      return r;
    };
    const hit = take(pool.filter((r) => ['rare', 'super'].includes(rarity(r)[0])));
    const z = take(pool.filter((r) => r.z));
    const tera = take(pool.filter((r) => r.tera));
    const regular = pool.filter((r) => ['common', 'uncommon'].includes(rarity(r)[0]));
    const first = take(regular), second = take(regular);
    const cards = [first, second, z, tera, hit].map((r, i) => makeCard(r,
      i === 2 && Math.random() < .5 ? 'z' : i === 3 && Math.random() < .5 ? 'tera' : mega(byName.get(r.pokemonName)) ? 'mega' : 'normal'));
    window.promoteBoosterChase(cards);
    let energyPokemon = Math.random() < .15 ? energyCard(pick(pool)) : null;
    const godPack = Math.random() < god.chance;
    if (godPack) {
      // Preserve existing chase rolls exactly; God Packs never add extra copies of them.
      const protectedChase = cards.find(window.isBoosterChaseRare);
      const prizeVersion = protectedChase ?? pick(god.specialFinals).card;
      const prizeRecord = pool.find((r) => r.pokemonName === prizeVersion.pokemonName);
      const prize = protectedChase ?? makeCard(prizeRecord, prizeVersion.variant, prizeVersion);
      selected.clear();
      selected.add(byName.get(prize.pokemonName).num);
      const upgraded = Array.from({ length: 4 }, () => {
        const r = take(god.rarePool);
        const p = byName.get(r.pokemonName);
        return makeCard(r, pick([mega(p) ? 'mega' : 'normal', ...(r.z ? ['z'] : []), ...(r.tera ? ['tera'] : [])]));
      });
      cards.splice(0, cards.length, ...upgraded, prize);
      energyPokemon = energyCard(pick(god.energyPool));
    }
    return { setId: set.id, setName: set.name, godPack, energyPokemon, packaging: { name: set.name,
      pokemonName: pick(['Tapu Bulu', 'Politoed', 'Crobat', 'Sceptile-Mega', 'Moltres-Galar', 'Bronzong', 'Arctozolt', 'Skeledirge']) },
      energyType: pick(Object.keys(window.MiloCards.elements)), cards };
  };
};

// Exact per-pack appearance rates: enumerate the dependent hit/captain draws,
// then account for both regular draws without replacement and cosmetic rolls.
window.calculateStandardBoosterPullrates = function calculateStandardBoosterPullrates(entries, set) {
  const byName = new Map(entries.map((p) => [p.name, p]));
  const pool = set.records.filter((r) => byName.has(r.pokemonName));
  const mega = (r) => /-Mega(?:-|$)/.test(r.pokemonName);
  const num = (r) => byName.get(r.pokemonName).num;
  const rarity = (r) => window.boosterSetRarity(byName.get(r.pokemonName), r, entries)[0];
  const hits = pool.filter((r) => ['rare', 'super', 'special'].includes(rarity(r)));
  const appearances = new Map();
  const baseKey = (c) => JSON.stringify([c.pokemonName, c.variant, c.type, c.variant === 'z' ? c.nativeType : null]);
  const add = (r, variant, probability) => {
    const p = byName.get(r.pokemonName);
    for (const nativeType of p.types) {
      const card = { pokemonName: p.name, variant, nativeType, type: variant === 'z' ? r.z : variant === 'tera' ? r.tera : nativeType };
      const key = baseKey(card);
      appearances.set(key, (appearances.get(key) ?? 0) + probability / p.types.length);
    }
  };
  for (const hit of hits) {
    const zs = pool.filter((r) => r.z && num(r) !== num(hit));
    for (const z of zs) {
      const teras = pool.filter((r) => r.tera && num(r) !== num(hit) && num(r) !== num(z));
      for (const tera of teras) {
        const weight = 1 / hits.length / zs.length / teras.length;
        const used = new Set([num(hit), num(z), num(tera)]);
        const regular = pool.filter((r) => ['common', 'uncommon'].includes(rarity(r)) && !used.has(num(r)));
        if (new Set(regular.map(num)).size < 2) throw new Error('Kein vollständiger Booster verfügbar.');
        add(hit, mega(hit) ? 'mega' : 'normal', weight);
        add(z, 'z', weight * .5);
        add(z, mega(z) ? 'mega' : 'normal', weight * .5);
        add(tera, 'tera', weight * .5);
        add(tera, mega(tera) ? 'mega' : 'normal', weight * .5);
        const sizes = new Map();
        for (const r of regular) sizes.set(num(r), (sizes.get(num(r)) ?? 0) + 1);
        for (const r of regular) {
          let chance = 1 / regular.length;
          for (const [otherNum, count] of sizes) if (otherNum !== num(r)) {
            chance += count / regular.length / (regular.length - count);
          }
          add(r, 'normal', weight * chance);
        }
      }
    }
  }
  return [...window.createBoosterVersionCatalog(entries, set)].map(([key, card]) => {
    const p = byName.get(card.pokemonName);
    if (card.energyFoil) return { key, card, probability: .15 / pool.length / p.types.length };
    const fullArtChance = window.MiloCards.fullArtBackground(p) ? card.fullArt ? .1 : .9 : 1;
    const probability = (appearances.get(baseKey(card)) ?? 0) * fullArtChance * (card.trainer ? .05 : .95);
    return { key, card, probability };
  }).filter((row) => row.probability > 0).sort((a, b) => b.probability - a.probability || a.key.localeCompare(b.key));
};

window.createGodPackModel = function createGodPackModel(entries, set, baseRates) {
  const byName = new Map(entries.map((p) => [p.name, p]));
  const rarePool = set.records.filter((r) => byName.has(r.pokemonName)
    && ['rare', 'super', 'special'].includes(window.boosterSetRarity(byName.get(r.pokemonName), r, entries)[0]));
  const energyPool = rarePool.filter((r) => window.boosterSetRarity(byName.get(r.pokemonName), r, entries)[0] === 'rare');
  const chases = baseRates.filter((row) => window.isBoosterChaseRare(row.card));
  const chaseChance = chases.reduce((sum, row) => sum + row.probability, 0);
  const specialFinals = baseRates.filter((row) => ['rare', 'super', 'special'].includes(row.card.rarity)
    && row.probability < .0007 && !window.isBoosterChaseRare(row.card) && !row.card.energyFoil
    && (row.card.fullArt || row.card.trainer || ['mega', 'tera', 'z'].includes(row.card.variant)));
  const chance = rarePool.length >= 5 && specialFinals.length && energyPool.length ? .01 : 0;
  const finals = [...chases.map((row) => ({ ...row, weight: row.probability })),
    ...specialFinals.map((row) => ({ ...row, weight: (1 - chaseChance) / specialFinals.length }))];
  return { chance, rarePool, energyPool, specialFinals, finals };
};

window.calculateBoosterPullrates = function calculateBoosterPullrates(entries, set) {
  if (set.kind === 'magma-aqua') return window.MagmaAquaBooster.rates(entries, set);
  const baseRates = window.calculateStandardBoosterPullrates(entries, set);
  const god = window.createGodPackModel(entries, set, baseRates);
  if (!god.chance) return baseRates;
  const byName = new Map(entries.map((p) => [p.name, p]));
  const rareNames = new Set(god.rarePool.map((r) => r.pokemonName));
  const normalAppearance = new Map();
  for (const r of god.rarePool) {
    const p = byName.get(r.pokemonName);
    let probability = 0;
    for (const final of god.finals) if (byName.get(final.card.pokemonName).num !== p.num) {
      probability += final.weight * 4 / (god.rarePool.length - (rareNames.has(final.card.pokemonName) ? 1 : 0));
    }
    normalAppearance.set(p.name, probability);
  }
  const finalRates = new Map(god.finals.map((row) => [row.key, row.weight]));
  return baseRates.map((row) => {
    const card = row.card, p = byName.get(card.pokemonName);
    const r = god.rarePool.find((r) => r.pokemonName === p.name);
    let godProbability = finalRates.get(row.key) ?? 0;
    if (card.energyFoil) godProbability = god.energyPool.some((r) => r.pokemonName === p.name) ? 1 / god.energyPool.length / p.types.length : 0;
    else if (r) {
      const variants = [/-Mega(?:-|$)/.test(p.name) ? 'mega' : 'normal', ...(r.z ? ['z'] : []), ...(r.tera ? ['tera'] : [])];
      if (variants.includes(card.variant)) {
        const nativeChance = card.variant === 'tera' ? 1 : 1 / p.types.length;
        const artChance = window.MiloCards.fullArtBackground(p) ? card.fullArt ? .1 : .9 : 1;
        godProbability += normalAppearance.get(p.name) / variants.length * nativeChance * artChance * (card.trainer ? .05 : .95);
      }
    }
    return { ...row, probability: (1 - god.chance) * row.probability + god.chance * godProbability };
  }).sort((a, b) => b.probability - a.probability || a.key.localeCompare(b.key));
};

window.createBoosterCollectionStore = function createBoosterCollectionStore(client) {
  return {
    async load(userId) {
      const { data: player, error } = await client.from('booster_players').select('packs_opened').eq('user_id', userId).maybeSingle();
      if (error) throw error;
      const cards = [];
      for (let offset = 0; ; offset += 1000) {
        const { data, error: cardError } = await client.from('booster_cards')
          .select('card_key,pokemon_name,rarity,full_art,variant,card_data,count')
          .eq('user_id', userId).order('card_key').range(offset, offset + 999);
        if (cardError) throw cardError;
        cards.push(...data);
        if (data.length < 1000) break;
      }
      return { packs: Number(player?.packs_opened ?? 0), cards };
    },
    async save(userId, pack) {
      const cards = [...pack.team.cards, ...(pack.team.energyPokemon ? [pack.team.energyPokemon] : [])].map(window.boosterCardPayload);
      const { error } = await client.rpc('booster_collect_pack', { p_user_id: userId, p_pack_id: pack.id, p_cards: cards });
      if (error) {
        const failure = new Error(error.message ?? 'Unbekannter Speicherfehler');
        failure.code = error.code;
        if (pack.team.energyPokemon && /Invalid booster size/i.test(error.message ?? '')) {
          failure.userMessage = 'Der Server verwendet noch die Fünf-Karten-Regel. Bitte booster-energy-foil.sql in Supabase ausführen. Dein vollständiges Pack bleibt vorgemerkt und kann danach erneut gespeichert werden.';
        } else if (error.code === 'PGRST202') {
          failure.userMessage = 'Die Speicherfunktion fehlt in Supabase. Bitte die Booster-SQL-Einrichtung prüfen. Dein Pack bleibt vorgemerkt.';
        } else {
          failure.userMessage = `Speichern fehlgeschlagen${error.code ? ` (${error.code})` : ''}: ${failure.message.slice(0, 240)}. Dein Pack bleibt für einen erneuten Versuch vorgemerkt.`;
        }
        throw failure;
      }
    },
  };
};

window.boosterCardPayload = function boosterCardPayload(card) {
  const pokemon = window.POKEDEX_ENTRIES.find((p) => p.name === card.pokemonName);
  return { card_key: JSON.stringify([card.setId ?? 'milo', card.pokemonName, card.variant, card.type, Boolean(card.fullArt), card.trainer ?? null,
    ...(card.variant === 'z' && card.nativeType ? [card.nativeType] : []), ...(card.energyFoil ? ['energyfoil'] : [])]),
    pokemon_name: card.pokemonName, rarity: (card.rarity ?? window.MiloCards.rarity(pokemon))[0],
    full_art: Boolean(card.fullArt), variant: card.variant, card_data: card };
};
