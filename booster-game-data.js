window.createEndlessBooster = function createEndlessBooster(entries) {
  const pool = entries.filter((p) => !p.hidden && !p.impossible && !p.unreleased
    && p.types.every((type) => Object.hasOwn(window.MiloCards.elements, type)));
  const byName = new Map(entries.map((p) => [p.name, p]));
  const mega = (p) => /^Mega(?:-|$)/i.test(p.forme ?? '') || /-Mega(?:-|$)/i.test(p.name);
  const foil = (p) => [...(p.tags ?? []), ...(byName.get(p.baseSpecies)?.tags ?? [])]
    .some((tag) => /Legendary/.test(tag) || ['Mythical', 'Ultra Beast', 'Paradox'].includes(tag));
  const normal = pool.filter((p) => !mega(p) && !foil(p));
  const upgraded = pool.filter((p) => !mega(p));
  const hits = pool.filter((p) => mega(p) || foil(p));
  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  return () => {
    const selected = new Set();
    const take = (items) => {
      const pokemon = pick(items.filter((p) => !selected.has(p.num)));
      if (!pokemon) throw new Error('Kein vollständiger Booster verfügbar.');
      selected.add(pokemon.num);
      return pokemon;
    };
    const hit = take(hits);
    const first = take(normal);
    const second = take(normal);
    const z = take(upgraded);
    const tera = take(upgraded);
    const types = Object.keys(window.MiloCards.elements);
    return { energyType: pick(types), cards: [first, second, z, tera, hit].map((p, i) => ({
      pokemonName: p.name, variant: i === 2 ? 'z' : i === 3 ? 'tera' : mega(p) ? 'mega' : 'normal',
      type: i === 2 || i === 3 ? pick(types) : p.types[0],
    })) };
  };
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
      const byName = new Map(window.POKEDEX_ENTRIES.map((p) => [p.name, p]));
      const cards = pack.team.cards.map((card) => ({
        card_key: JSON.stringify([card.pokemonName, card.variant, card.type, Boolean(card.fullArt)]),
        pokemon_name: card.pokemonName, rarity: window.MiloCards.rarity(byName.get(card.pokemonName))[0],
        full_art: Boolean(card.fullArt), variant: card.variant, card_data: card,
      }));
      const { error } = await client.rpc('booster_collect_pack', { p_user_id: userId, p_pack_id: pack.id, p_cards: cards });
      if (error) throw error;
    },
  };
};
