(() => {
  const root = document.querySelector('.booster-game');
  const account = document.querySelector('#booster-account');
  const open = document.querySelector('#booster-open');
  const refresh = document.querySelector('#booster-refresh');
  const progress = document.querySelector('#booster-progress');
  const search = document.querySelector('#booster-search');
  const ownedOnly = document.querySelector('#booster-owned-only');
  const setSelect = document.querySelector('#booster-set');
  const adminButton = document.querySelector('#booster-admin');
  const dex = document.querySelector('#booster-dex');
  const entries = window.POKEDEX_ENTRIES;
  const config = window.SUPABASE_CONFIG;
  if (!config || !window.supabase || !window.MiloCards || !entries) {
    account.textContent = 'Das Spiel konnte nicht geladen werden. Bitte lade die Seite neu.';
    return;
  }
  const client = window.supabase.createClient(config.url, config.publishableKey,
    { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  const store = window.createBoosterCollectionStore(client);
  const draw = window.createEndlessBooster(entries);
  document.querySelector("#booster-pack-preview").replaceWith(window.BoosterPackaging.create(draw().packaging));
  const sets = new Map([window.NATDEX_PREMIER].map((set) => [set.id, set]));
  const byName = new Map(entries.map((p) => [p.name, p]));
  const catalogs = new Map([...sets].map(([id, set]) => [id, window.createBoosterVersionCatalog(entries, set)]));
  const pullrateCache = new Map();
  let versionProgress = null;
  let versionsByNumber = new Map();
  let dexGroups = new Map();
  let visibleCards = [];
  let cardsByNumber = new Map();
  const cardSet = (row) => row.card_data?.setId ?? 'milo';
  function normalizeCollection(result) {
    return { ...result, cards: result.cards.map((row) => {
      const set = sets.get(cardSet(row));
      const record = set?.records.find((r) => r.pokemonName === row.pokemon_name);
      const p = byName.get(row.pokemon_name);
      if (!record || !p) return row;
      const rarity = window.boosterCardRarity(p, record, row.card_data, entries);
      return { ...row, rarity: rarity[0], card_data: { ...row.card_data, rarity } };
    }) };
  }
  let user = null;
  let version = 0;
  let authRequest = 0;
  let loadVersion = 0;
  let ready = false;
  let busy = false;
  let popup = null;
  let data = { packs: 0, cards: [] };
  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const pendingPrefix = (id) => `schwalboga-booster-pending:${id}:`;
  const pendingKey = (id, packId) => `${pendingPrefix(id)}${packId}`;
  function pendingPack(id) {
    const keys = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key.startsWith(pendingPrefix(id))) keys.push(key);
    }
    return keys.sort().map((key) => JSON.parse(localStorage.getItem(key)))
      .find((pack) => pack.team?.setId === window.NATDEX_PREMIER.id) ?? null;
  }
  const label = (p) => p.names?.de ?? p.name;
  const format = new Intl.NumberFormat('de-DE');
  const authorized = (id, token) => user?.id === id && version === token;
  const isAdmin = () => user?.app_metadata?.site_access?.permissions?.play_milo === true;
  function closePopup() {
    if (popup?.open) popup.close();
    popup?.remove();
    popup = null;
  }
  function dialog(title) {
    closePopup();
    const box = node('dialog', 'milo-joker-dialog');
    const heading = node('h3', '', title);
    heading.id = 'booster-dialog-title';
    box.setAttribute('aria-labelledby', heading.id);
    box.append(heading);
    root.append(box);
    popup = box;
    box.addEventListener('close', () => {
      box.remove();
      if (popup === box) popup = null;
    }, { once: true });
    return box;
  }
  function collectionFor(num) {
    return cardsByNumber.get(num) ?? [];
  }
  const typeLabels = { Normal: 'Normal', Fire: 'Feuer', Water: 'Wasser', Electric: 'Elektro', Grass: 'Pflanze', Ice: 'Eis', Fighting: 'Kampf', Poison: 'Gift', Ground: 'Boden', Flying: 'Flug', Psychic: 'Psycho', Bug: 'Käfer', Rock: 'Gestein', Ghost: 'Geist', Dragon: 'Drache', Dark: 'Unlicht', Steel: 'Stahl', Fairy: 'Fee' };
  const rateFormat = new Intl.NumberFormat('de-DE', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 6 });
  function oddsSet() { return sets.get(setSelect.value === 'all' ? window.NATDEX_PREMIER.id : setSelect.value); }
  function pullrates(set) {
    if (!pullrateCache.has(set.id)) pullrateCache.set(set.id, window.calculateBoosterPullrates(entries, set));
    return pullrateCache.get(set.id);
  }
  function versionLabel(card) {
    const parts = [label(byName.get(card.pokemonName))];
    if (card.variant === 'tera') parts.push(`Tera: ${typeLabels[card.type]}`);
    else {
      parts.push(typeLabels[card.nativeType ?? card.type]);
      if (card.variant === 'z') parts.push(`Z: ${typeLabels[card.type]}`);
    }
    if (card.fullArt) parts.push('Full Art');
    if (card.energyFoil) parts.push('Energy Foil');
    if (card.trainer) parts.push(`Trainer: ${card.trainer}`);
    return parts.join(' · ');
  }
  function showCollectionAdmin() {
    if (!isAdmin() || busy) return;
    const scope = setSelect.value;
    const set = sets.get(scope === 'all' ? window.NATDEX_PREMIER.id : scope);
    const box = dialog('Admin · Sammlung bearbeiten');
    box.classList.add('booster-admin-dialog');
    box.append(node('p', 'milo-muted', `Eigene Sammlung · ${setSelect.selectedOptions[0].textContent}`));
    const controls = node('fieldset', 'booster-admin-controls');
    const message = node('p', 'milo-muted');
    message.setAttribute('role', 'status');
    const searchLabel = node('label', '', 'Gesammelte Karten filtern');
    const filter = node('input', '');
    filter.type = 'search';
    searchLabel.append(filter);
    const list = node('div', 'booster-admin-list');
    const makeButton = (text, action) => {
      const button = node('button', '', text);
      button.type = 'button';
      button.addEventListener('click', action);
      return button;
    };
    const numberInput = (value, min = 0) => {
      const input = node('input', '');
      input.type = 'number'; input.required = true; input.min = String(min); input.max = '1000000'; input.step = '1'; input.value = String(value);
      return input;
    };
    async function mutate(action, args = {}) {
      if (!isAdmin() || busy) return;
      const owner = user.id;
      const token = version;
      busy = true;
      open.disabled = true;
      controls.disabled = true;
      message.textContent = 'Änderung wird gespeichert …';
      try {
        const { error } = await client.rpc('booster_admin_collection', { p_user_id: owner, p_action: action, ...args });
        if (error) throw error;
        const result = await store.load(owner);
        if (!authorized(owner, token)) return;
        data = normalizeCollection(result);
        if (action === 'clear_all' || action === 'clear_set') {
          for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (!key.startsWith(pendingPrefix(owner))) continue;
            try {
              const pack = JSON.parse(localStorage.getItem(key));
              if (action === 'clear_all' || pack.team?.setId === scope) localStorage.removeItem(key);
            } catch { /* Leave unrelated malformed retry data untouched. */ }
          }
        }
        render();
        if (box.open) { renderRows(); message.textContent = 'Gespeichert.'; }
      } catch (error) {
        if (authorized(owner, token) && box.open) message.textContent = error.code === 'PGRST202'
          ? 'Die Admin-SQL-Migration fehlt noch in Supabase.' : 'Änderung fehlgeschlagen. Bitte versuche es erneut.';
      } finally {
        if (authorized(owner, token)) { busy = false; open.disabled = !ready; }
        if (box.isConnected) controls.disabled = false;
      }
    }
    function renderRows() {
      list.replaceChildren();
      const query = filter.value.trim().toLocaleLowerCase('de');
      for (const row of data.cards.filter((r) => scope === 'all' || cardSet(r) === scope)) {
        const text = versionLabel(row.card_data);
        if (query && !text.toLocaleLowerCase('de').includes(query)) continue;
        const line = node('div', 'booster-admin-row');
        const count = numberInput(row.count);
        count.setAttribute('aria-label', `Anzahl: ${text}`);
        line.append(node('span', '', text), count,
          makeButton('Speichern', () => { if (count.reportValidity()) void mutate('set_count', { p_card_key: row.card_key, p_count: Number(count.value) }); }),
          makeButton('Entfernen', () => void mutate('set_count', { p_card_key: row.card_key, p_count: 0 })));
        list.append(line);
      }
      if (!list.children.length) list.append(node('p', 'milo-muted', 'Keine passenden gesammelten Karten.'));
    }
    filter.addEventListener('input', renderRows);
    controls.append(searchLabel, list);
    if (set) {
      controls.append(node('h4', '', `Version hinzufügen · ${set.name}`));
      const versionFilterLabel = node('label', '', 'Version suchen');
      const versionFilter = node('input', '');
      versionFilter.type = 'search';
      versionFilterLabel.append(versionFilter);
      const versionLabelNode = node('label', '', 'Karten-Version');
      const choices = node('select', '');
      choices.setAttribute('aria-label', 'Karten-Version');
      versionLabelNode.append(choices);
      const amountLabel = node('label', '', 'Exemplare hinzufügen');
      const amount = numberInput(1, 1);
      amountLabel.append(amount);
      const catalog = catalogs.get(set.id);
      const updateChoices = () => {
        const previous = choices.value;
        choices.replaceChildren();
        const query = versionFilter.value.trim().toLocaleLowerCase('de');
        for (const [key, card] of catalog) {
          const text = versionLabel(card);
          if (query && !text.toLocaleLowerCase('de').includes(query)) continue;
          const option = node('option', '', text);
          option.value = key;
          choices.append(option);
        }
        if ([...choices.options].some((o) => o.value === previous)) choices.value = previous;
      };
      versionFilter.addEventListener('input', updateChoices);
      updateChoices();
      const add = makeButton('Version hinzufügen', () => {
        if (!amount.reportValidity() || !choices.value) return;
        const versionCard = catalog.get(choices.value);
        const p = byName.get(versionCard.pokemonName);
        const record = set.records.find((r) => r.pokemonName === p.name && (!versionCard.trainer || r.trainer === versionCard.trainer));
        const descriptor = { ...versionCard, stamp: set.stamp,
          rarity: window.boosterCardRarity(p, record, versionCard, entries),
          trainerSprite: versionCard.trainer ? record.trainerSprite : null, movePool: record.brought ? record.moves : undefined };
        Object.assign(descriptor, window.MiloCards.snapshot(window.MiloCards.create(p, descriptor)));
        void mutate('add_card', { p_count: Number(amount.value), p_card: window.boosterCardPayload(descriptor) });
      });
      controls.append(versionFilterLabel, versionLabelNode, amountLabel, add);
    }
    const packsLabel = node('label', '', 'Geöffnete Booster insgesamt');
    const packs = numberInput(data.packs);
    packsLabel.append(packs);
    controls.append(packsLabel, makeButton('Booster-Zähler speichern', () => {
      if (packs.reportValidity()) void mutate('set_packs', { p_count: Number(packs.value) });
    }));
    const clear = makeButton('Karten dieser Sammlung löschen', () => {
      if (window.confirm(`Alle Karten in „${setSelect.selectedOptions[0].textContent}“ löschen? Geöffnete Booster bleiben gezählt.`)) {
        void mutate(scope === 'all' ? 'clear_all' : 'clear_set', scope === 'all' ? {} : { p_set_id: scope });
      }
    });
    clear.classList.add('booster-admin-delete');
    controls.append(clear);
    box.append(controls, message, makeButton('Schließen', () => box.close()));
    renderRows();
    box.showModal();
  }
  function showPullrates(chase) {
    const set = oddsSet();
    if (!set) return;
    const rates = pullrates(set);
    const box = dialog(`${chase ? 'Chase-Rares' : 'Pullrate'} · ${set.name}`);
    box.classList.add('booster-collection-dialog');
    box.append(node('p', 'milo-muted', 'Chance pro Booster für genau diese Version. Zufällige Attacken und Stärke zählen nicht als eigene Versionen.'));
    if (chase) {
      const minimum = rates.at(-1)?.probability;
      const rarest = rates.filter((row) => Math.abs(row.probability - minimum) < 1e-12);
      const gallery = node('div', 'booster-collection-cards booster-chase-cards');
      const owned = new Map(data.cards.filter((row) => cardSet(row) === set.id && Number(row.count) > 0)
        .map((row) => [window.boosterVersionKey(row.card_data, byName.get(row.pokemon_name)), row.card_data]));
      const sizing = new ResizeObserver((changes) => changes.forEach(({ target, contentRect }) => target.style.setProperty('--collection-scale', String(contentRect.width / 320))));
      box.addEventListener('close', () => sizing.disconnect(), { once: true });
      for (const row of rarest) {
        const p = byName.get(row.card.pokemonName);
        const record = set.records.find((r) => r.pokemonName === p.name && (!row.card.trainer || r.trainer === row.card.trainer));
        const rarityLabels = { common: 'Häufig', uncommon: 'Nicht häufig', rare: 'Selten', super: 'Super-selten', special: 'Spezial-selten' };
        const descriptor = owned.get(row.key) ?? { ...row.card, stamp: set.stamp, trainerSprite: row.card.trainer ? record.trainerSprite : null,
          movePool: record.brought ? record.moves : undefined, rarity: window.boosterCardRarity(p, record, row.card, entries) };
        const slot = node('div', '');
        const holder = node('div', 'booster-card-holder');
        const card = window.MiloCards.create(p, descriptor);
        if (!owned.has(row.key)) card.classList.add('is-chase-unowned');
        holder.append(card);
        slot.append(node('p', 'booster-chase-label', versionLabel(row.card)), holder,
          node('strong', 'booster-chase-rate', rateFormat.format(row.probability)),
          node('small', 'milo-muted', owned.has(row.key) ? 'Gesammelt' : 'Noch nicht gesammelt'));
        gallery.append(slot);
        sizing.observe(holder);
      }
      box.append(gallery);
    } else {
      const list = node('ol', 'booster-pullrate-list');
      for (const row of rates) {
        const item = node('li', '');
        item.append(node('span', '', versionLabel(row.card)), node('strong', '', rateFormat.format(row.probability)));
        list.append(item);
      }
      box.append(list);
    }
    const close = node('button', '', 'Schließen');
    close.type = 'button';
    close.addEventListener('click', () => box.close());
    box.append(close);
    box.showModal();
  }
  function showSpecies(pokemon) {
    const box = dialog(label(pokemon));
    box.classList.add('booster-collection-dialog');
    const gallery = node('div', 'booster-collection-cards');
    let zoom = null;
    const sizing = new ResizeObserver((changes) => changes.forEach(({ target, contentRect }) => {
      target.style.setProperty('--collection-scale', String(contentRect.width / 320));
      target.style.setProperty('--card-scale', String(contentRect.width / 320));
    }));
    box.addEventListener('close', () => { zoom?.close(); sizing.disconnect(); }, { once: true });
    function zoomVersion(card, holder, description) {
      if (zoom) return;
      zoom = node('dialog', 'milo-card-zoom booster-collection-zoom');
      zoom.setAttribute('aria-label', `Vergrößerte Karte: ${description}`);
      const fit = node('div', 'milo-booster-card-fit milo-card-zoom-fit');
      fit.append(card);
      const details = node('p', 'booster-zoom-details', description);
      const closeZoom = node('button', '', 'Vergrößerung schließen');
      closeZoom.type = 'button';
      closeZoom.addEventListener('click', () => zoom.close());
      zoom.append(fit, details, closeZoom);
      zoom.addEventListener('close', () => {
        holder.append(card);
        sizing.unobserve(fit);
        zoom.remove();
        zoom = null;
        if (box.open) card.focus({ preventScroll: true });
      }, { once: true });
      box.append(zoom);
      zoom.showModal();
      sizing.observe(fit);
    }
    const versions = [...collectionFor(pokemon.num)].sort((a, b) => Number(Boolean(b.full_art)) - Number(Boolean(a.full_art)));
    for (const row of versions) {
      const p = byName.get(row.pokemon_name);
      const item = row.card_data;
      const slot = node('div', '');
      const holder = node('div', 'booster-card-holder');
      const card = window.MiloCards.create(p, item);
      holder.append(card);
      const setName = sets.get(cardSet(row))?.name ?? (cardSet(row) === 'milo' ? 'Ursprüngliches Set' : row.card_data?.stamp ?? cardSet(row));
      const description = `${setName} · ${versionLabel(item)} · ${format.format(Number(row.count))}× gesammelt`;
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-haspopup', 'dialog');
      card.setAttribute('aria-label', description);
      card.title = 'Klicken zum Vergrößern';
      card.addEventListener('click', () => zoomVersion(card, holder, description));
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); zoomVersion(card, holder, description); }
      });
      slot.append(holder);
      gallery.append(slot);
      sizing.observe(holder);
    }
    const close = node('button', '', 'Schließen');
    close.type = 'button';
    close.addEventListener('click', () => box.close());
    const footer = node('div', 'booster-collection-footer');
    const summary = node('small', 'booster-missing-summary');
    const selectedCatalogs = setSelect.value === 'all' ? [...catalogs.values()] : [catalogs.get(setSelect.value)].filter(Boolean);
    if (selectedCatalogs.length) {
      const owned = new Set(collectionFor(pokemon.num).filter((row) => Number(row.count) > 0)
        .map((row) => window.boosterVersionKey(row.card_data, byName.get(row.pokemon_name))));
      const possible = selectedCatalogs.flatMap((catalog) => [...catalog]).filter(([, card]) => card.num === pokemon.num);
      const missing = possible.filter(([key]) => !owned.has(key)).map(([, card]) => card);
      const rarityLabels = { common: 'häufig', uncommon: 'nicht häufig', rare: 'selten', super: 'super-selten', special: 'spezial-selten' };
      const breakdown = Object.entries(rarityLabels).map(([id, label]) => {
        const count = missing.filter((card) => card.rarity === id).length;
        return count ? `${count} ${label}` : null;
      }).filter(Boolean);
      const fullArts = missing.filter((card) => card.fullArt).length;
      const trainers = missing.filter((card) => card.trainer).length;
      const energyFoils = missing.filter((card) => card.energyFoil).length;
      const extras = [fullArts ? `${fullArts} Full Art${fullArts === 1 ? '' : 's'}` : null,
        trainers ? `${trainers} Trainer-Version${trainers === 1 ? '' : 'en'}` : null,
        energyFoils ? `${energyFoils} Energy Foil${energyFoils === 1 ? '' : 's'}` : null].filter(Boolean);
      const scope = setSelect.value === 'all' ? 'Katalogisierte Sets: ' : '';
      summary.textContent = !possible.length ? 'Für dieses Pokémon liegt kein Variantenkatalog vor.'
        : !missing.length ? `${scope}Alle ${possible.length} Versionen gesammelt.`
          : `${scope}Noch ${missing.length} Version${missing.length === 1 ? ' fehlt' : 'en fehlen'} (${breakdown.join(', ')}).${extras.length ? ` Darunter ${extras.join(' und ')}.` : ''}`;
    } else summary.textContent = 'Für dieses archivierte Set liegt kein Variantenkatalog vor.';
    footer.append(close, summary);
    box.append(gallery, footer);
    box.showModal();
  }
  function renderDex() {
    dex.replaceChildren();
    const query = search.value.trim().normalize('NFC').toLocaleLowerCase('de');
    for (const [num, p] of [...dexGroups].sort((a, b) => a[0] - b[0])) {
      if (query && !`${num} ${String(num).padStart(4, '0')} ${p.name} ${label(p)}`.toLocaleLowerCase('de').includes(query)) continue;
      const cards = collectionFor(num);
      if (ownedOnly.checked && !cards.length) continue;
      const slot = node('button', `booster-dex-slot${cards.length ? ' is-owned' : ''}`);
      const versions = versionsByNumber.get(num);
      const collected = versions?.filter((key) => versionProgress.owned.has(key)).length ?? 0;
      const complete = Boolean(versions?.length && collected === versions.length);
      if (complete) slot.classList.add('is-complete');
      slot.type = 'button';
      slot.disabled = !cards.length;
      slot.append(node('span', '', `#${String(num).padStart(4, '0')}`));
      if (cards.length) {
        const sprite = node('img', '');
        sprite.src = byName.get(cards[0].pokemon_name).sprite;
        sprite.alt = '';
        sprite.loading = 'lazy';
        sprite.addEventListener('error', () => sprite.remove(), { once: true });
        slot.append(sprite, node('strong', '', label(p)),
          node('small', '', `${format.format(cards.reduce((sum, row) => sum + Number(row.count), 0))} Karten`));
        slot.addEventListener('click', () => showSpecies(p));
      } else slot.append(node('span', 'booster-dex-empty', '?'), node('strong', '', 'Noch nicht gesammelt'));
      if (versions) slot.append(node('small', 'booster-version-progress', `${collected} / ${versions.length} Versionen${complete ? ' · vollständig' : ''}`));
      slot.setAttribute('aria-label', `#${num} ${label(p)}${cards.length ? ' · Karten ansehen' : ' · nicht gesammelt'}${complete ? ' · vollständig gesammelt' : ''}`);
      dex.append(slot);
    }
    if (!dex.children.length) dex.append(node('p', 'milo-muted', 'Keine passenden Pokémon.'));
  }
  function render() {
    const selected = setSelect.value;
    const availableSets = new Map([...sets].map(([id, set]) => [id, set.name]));
    for (const row of data.cards) {
      const id = cardSet(row);
      if (!availableSets.has(id)) availableSets.set(id, id === 'milo' ? 'Ursprüngliches Set' : row.card_data?.stamp ?? id);
    }
    setSelect.replaceChildren(node('option', '', 'Alle Sets · Gesamtdex'));
    setSelect.firstElementChild.value = 'all';
    for (const [id, name] of availableSets) {
      const option = node('option', '', name);
      option.value = id;
      setSelect.append(option);
    }
    setSelect.value = selected === 'all' || availableSets.has(selected) ? selected : 'all';
    const activeSet = setSelect.value;
    document.querySelector('#booster-chase').disabled = !oddsSet();
    document.querySelector('#booster-pullrates').disabled = !oddsSet();
    visibleCards = data.cards.filter((row) => activeSet === 'all' || cardSet(row) === activeSet);
    const catalog = catalogs.get(activeSet);
    versionProgress = catalog ? { catalog, owned: new Set() } : null;
    versionsByNumber = new Map();
    if (catalog) {
      for (const [key, card] of catalog) {
        if (!versionsByNumber.has(card.num)) versionsByNumber.set(card.num, []);
        versionsByNumber.get(card.num).push(key);
      }
      for (const row of visibleCards) {
        const p = byName.get(row.pokemon_name);
        if (!p || Number(row.count) <= 0) continue;
        const key = window.boosterVersionKey(row.card_data, p);
        if (catalog.has(key)) versionProgress.owned.add(key);
      }
    }
    const names = activeSet === 'all' || activeSet === 'milo' ? null
      : new Set(sets.get(activeSet)?.records.map((r) => r.pokemonName) ?? visibleCards.map((r) => r.pokemon_name));
    dexGroups = new Map();
    for (const p of entries.filter((p) => names ? names.has(p.name) : !p.hidden && !p.impossible && !p.unreleased)) {
      const old = dexGroups.get(p.num);
      if (!old || !p.forme) dexGroups.set(p.num, p);
    }
    cardsByNumber = new Map();
    for (const row of visibleCards) {
      const num = byName.get(row.pokemon_name)?.num;
      if (!cardsByNumber.has(num)) cardsByNumber.set(num, []);
      cardsByNumber.get(num).push(row);
    }
    const counters = document.querySelector('#booster-counters');
    const total = visibleCards.reduce((sum, row) => sum + Number(row.count), 0);
    const counts = Object.fromEntries(['common', 'uncommon', 'rare', 'super', 'special'].map((rarity) => [rarity,
      visibleCards.filter((row) => row.rarity === rarity).reduce((sum, row) => sum + Number(row.count), 0)]));
    const fullArts = visibleCards.filter((row) => row.full_art).reduce((sum, row) => sum + Number(row.count), 0);
    const trainers = visibleCards.filter((row) => row.card_data?.trainer).reduce((sum, row) => sum + Number(row.count), 0);
    const energyFoils = visibleCards.filter((row) => row.card_data?.energyFoil).reduce((sum, row) => sum + Number(row.count), 0);
    counters.replaceChildren();
    for (const [title, value] of [['Booster insgesamt', data.packs], ['Karten', total], ['Häufig ●', counts.common],
      ['Nicht häufig ◆', counts.uncommon], ['Selten ★', counts.rare], ['Super-selten · Silber ★', counts.super],
      ['Spezial-selten · Gold ★', counts.special], ['Full Arts 🖌️', fullArts], ['Trainer-Version', trainers], ['Energy Foil', energyFoils]]) {
      const counter = node('div', 'booster-counter');
      let display = format.format(value);
      if (versionProgress && title !== 'Booster insgesamt') {
        const rarity = { 'Häufig ●': 'common', 'Nicht häufig ◆': 'uncommon', 'Selten ★': 'rare', 'Super-selten · Silber ★': 'super', 'Spezial-selten · Gold ★': 'special' }[title];
        const matches = (card) => title === 'Karten' || (title === 'Full Arts 🖌️' ? card.fullArt
          : title === 'Trainer-Version' ? Boolean(card.trainer) : title === 'Energy Foil' ? Boolean(card.energyFoil) : card.rarity === rarity);
        const possible = [...versionProgress.catalog].filter(([, card]) => matches(card));
        const owned = possible.filter(([key]) => versionProgress.owned.has(key)).length;
        display = `${format.format(owned)} / ${format.format(possible.length)}`;
        counter.append(node('small', 'booster-copy-count', `${format.format(value)} Exemplare`));
      }
      counter.prepend(node('strong', '', display), node('span', '', title));
      counters.append(counter);
    }
    const filled = [...cardsByNumber.keys()].filter((num) => dexGroups.has(num)).length;
    document.querySelector('#booster-dex-count').textContent = `${setSelect.selectedOptions[0].textContent} · ${filled} / ${dexGroups.size} Dex-Plätze gefüllt · Formen und Kartenvarianten im jeweiligen Eintrag`;
    progress.hidden = false;
    renderDex();
  }
  async function loadCollection() {
    if (!user || busy) return;
    const owner = user.id;
    const token = version;
    const request = ++loadVersion;
    ready = false;
    open.disabled = true;
    adminButton.disabled = true;
    refresh.hidden = true;
    account.textContent = 'Deine Sammlung wird geladen …';
    try {
      const result = await store.load(owner);
      if (!authorized(owner, token) || request !== loadVersion) return;
      data = normalizeCollection(result);
      ready = true;
      adminButton.hidden = !isAdmin();
      adminButton.disabled = false;
      account.textContent = `Sammlung von ${user.user_metadata?.display_name ?? user.email ?? 'deinem Account'}`;
      open.disabled = false;
      render();
    } catch {
      if (!authorized(owner, token) || request !== loadVersion) return;
      account.textContent = 'Deine Sammlung ist gerade nicht erreichbar. Bitte versuche es erneut oder wende dich an die Administration.';
      refresh.hidden = false;
    }
  }
  function openPack() {
    if (!user || !ready || busy || popup) return;
    const owner = user.id;
    const token = version;
    let pack;
    let box;
    try {
      const pending = pendingPack(owner);
      pack = pending ?? { id: crypto.randomUUID(), userId: owner, team: draw() };
      if (pack.userId !== owner || !Array.isArray(pack.team?.cards) || pack.team.cards.length !== 5) throw new Error('Invalid pending pack');
      for (const card of [...pack.team.cards, ...(pack.team.energyPokemon ? [pack.team.energyPokemon] : [])]) {
        const record = window.NATDEX_PREMIER.records.find((r) => r.pokemonName === card.pokemonName);
        if (record) card.rarity = window.boosterCardRarity(byName.get(card.pokemonName), record, card, entries);
      }
      window.promoteBoosterChase(pack.team.cards);
      box = dialog(pack.team.setName ?? 'NatDex Premier');
      const rates = pullrates(window.NATDEX_PREMIER);
      const minimum = rates.at(-1).probability;
      const ownedVersions = new Map(data.cards.filter((row) => Number(row.count) > 0 && byName.has(row.pokemon_name))
        .map((row) => [window.boosterVersionKey(row.card_data, byName.get(row.pokemon_name)), row.card_data]));
      const commonRares = rates.filter((row) => row.card.rarity === 'rare' && row.card.variant === 'normal'
        && !row.card.fullArt && !row.card.trainer && !row.card.energyFoil);
      const ownedRares = commonRares.filter((row) => ownedVersions.has(row.key));
      const fakeoutDecoys = (ownedRares.length ? ownedRares : commonRares).slice(0, 8).map((row) => {
        if (ownedVersions.has(row.key)) return ownedVersions.get(row.key);
        const p = byName.get(row.card.pokemonName);
        const record = window.NATDEX_PREMIER.records.find((r) => r.pokemonName === p.name);
        return { ...row.card, stamp: window.NATDEX_PREMIER.stamp,
          rarity: window.boosterCardRarity(p, record, row.card, entries), movePool: record.brought ? record.moves : undefined };
      });
      window.createMiloBooster(box, pack.team, () => {
        box.close();
        setTimeout(() => { if (authorized(owner, token)) openPack(); }, 0);
      }, {
        subtitle: 'NatDex Premier · Fünf Pokémon + Energie-Slot (15 % Energy Foil).', overviewSubtitle: pack.team.godPack ? 'God Pack · Sechs Karten, nur Selten oder höher' : pack.team.energyPokemon ? 'Deine sechs Pokémon · Energy-Foil-Bonus' : 'Deine fünf Pokémon',
        chaseKeys: new Set(rates.filter((row) => Math.abs(row.probability - minimum) < 1e-12).map((row) => row.key)),
        fakeoutKeys: new Set(rates.filter((row) => row.probability < .0007).map((row) => row.key)),
        fakeoutDecoys,
        ownedVersionKeys: new Set(ownedVersions.keys()),
        introduction: 'Ein neues Pack für deine Sammlung.', completeLabel: 'Nächsten Booster öffnen',
        onExit: () => box.close(),
        onOverview: async () => {
          if (!authorized(owner, token)) throw new Error('Account changed');
          busy = true;
          open.disabled = true;
          try {
            await store.save(owner, pack);
            const result = await store.load(owner);
            if (!authorized(owner, token)) return;
            localStorage.removeItem(pendingKey(owner, pack.id));
            data = normalizeCollection(result);
            account.textContent = 'Deine Karten wurden im Account gespeichert.';
            render();
          } catch (error) {
            if (authorized(owner, token)) account.textContent = error.userMessage ?? 'Die Karten sind noch nicht gespeichert. Öffne das vorgemerkte Pack erneut, um es noch einmal zu versuchen.';
            throw error;
          } finally {
            if (authorized(owner, token)) { busy = false; open.disabled = !ready; }
          }
        },
      });
      // The renderer freezes full art, attacks and footer choices before saving the pending pack.
      localStorage.setItem(pendingKey(owner, pack.id), JSON.stringify(pack));
      box.showModal();
    } catch {
      box?.remove();
      if (popup === box) popup = null;
      account.textContent = 'Das Pack konnte nicht vorbereitet werden. Bitte prüfe, ob dein Browser lokale Daten speichern darf, und versuche es erneut.';
    }
  }
  function resetAccount() {
    closePopup();
    user = null;
    ready = false;
    busy = false;
    data = { packs: 0, cards: [] };
    visibleCards = [];
    cardsByNumber.clear();
    versionProgress = null;
    versionsByNumber.clear();
    setSelect.replaceChildren(node('option', '', 'Alle Sets · Gesamtdex'));
    setSelect.firstElementChild.value = 'all';
    progress.hidden = true;
    dex.replaceChildren();
    document.querySelector('#booster-counters').replaceChildren();
    open.disabled = true;
    adminButton.hidden = true;
    adminButton.disabled = false;
    refresh.hidden = true;
    account.textContent = 'Melde dich auf der Hauptseite an, um Booster zu öffnen und deine Sammlung zu speichern.';
  }
  client.auth.onAuthStateChange((event, session) => {
    const request = ++authRequest;
    if (!session?.user || event === 'PASSWORD_RECOVERY') { version += 1; resetAccount(); return; }
    if (user?.id !== session.user.id) { version += 1; resetAccount(); }
    setTimeout(async () => {
      try {
        const { data: result, error } = await client.auth.getUser();
        if (request !== authRequest) return;
        if (error || result.user?.id !== session.user.id) { resetAccount(); return; }
        if (user?.id === result.user.id) user = result.user;
        adminButton.hidden = result.user.app_metadata?.site_access?.permissions?.play_milo !== true;
        if (!isAdmin() && popup?.classList.contains('booster-admin-dialog')) closePopup();
        if (user?.id === result.user.id && ready) return;
        resetAccount();
        user = result.user;
        adminButton.hidden = !isAdmin();
        await loadCollection();
      } catch { if (request === authRequest) resetAccount(); }
    }, 0);
  });
  open.addEventListener('click', openPack);
  refresh.addEventListener('click', () => void loadCollection());
  search.addEventListener('input', renderDex);
  ownedOnly.addEventListener('change', renderDex);
  setSelect.addEventListener('change', () => { closePopup(); render(); });
  document.querySelector('#booster-chase').addEventListener('click', () => showPullrates(true));
  document.querySelector('#booster-pullrates').addEventListener('click', () => showPullrates(false));
  adminButton.addEventListener('click', showCollectionAdmin);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && user && !popup && !busy) void loadCollection();
  });
})();
