(() => {
  const root = document.querySelector('.booster-game');
  const account = document.querySelector('#booster-account');
  const open = document.querySelector('#booster-open');
  const refresh = document.querySelector('#booster-refresh');
  const progress = document.querySelector('#booster-progress');
  const search = document.querySelector('#booster-search');
  const ownedOnly = document.querySelector('#booster-owned-only');
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
  const byName = new Map(entries.map((p) => [p.name, p]));
  const dexGroups = new Map();
  for (const p of entries.filter((p) => !p.hidden && !p.impossible && !p.unreleased)) {
    const old = dexGroups.get(p.num);
    if (!old || !p.forme) dexGroups.set(p.num, p);
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
    return keys.length ? JSON.parse(localStorage.getItem(keys.sort()[0])) : null;
  }
  const label = (p) => p.names?.de ?? p.name;
  const format = new Intl.NumberFormat('de-DE');
  const authorized = (id, token) => user?.id === id && version === token;
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
    return data.cards.filter((row) => byName.get(row.pokemon_name)?.num === num);
  }
  function showSpecies(pokemon) {
    const box = dialog(label(pokemon));
    box.classList.add('booster-collection-dialog');
    const gallery = node('div', 'booster-collection-cards');
    const sizing = new ResizeObserver((changes) => changes.forEach(({ target, contentRect }) => {
      target.style.setProperty('--collection-scale', String(contentRect.width / 320));
    }));
    box.addEventListener('close', () => sizing.disconnect(), { once: true });
    for (const row of collectionFor(pokemon.num)) {
      const p = byName.get(row.pokemon_name);
      const item = row.card_data;
      const slot = node('div', '');
      const holder = node('div', 'booster-card-holder');
      holder.append(window.MiloCards.create(p, { variant: item.variant, type: item.type,
        fullArt: item.fullArt, attackIds: item.attackIds, footerStats: item.footerStats }));
      slot.append(node('p', 'milo-muted', `${format.format(Number(row.count))}× gesammelt`), holder);
      gallery.append(slot);
      sizing.observe(holder);
    }
    const close = node('button', '', 'Schließen');
    close.type = 'button';
    close.addEventListener('click', () => box.close());
    box.append(gallery, close);
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
      slot.setAttribute('aria-label', `#${num} ${label(p)}${cards.length ? ' · Karten ansehen' : ' · nicht gesammelt'}`);
      dex.append(slot);
    }
    if (!dex.children.length) dex.append(node('p', 'milo-muted', 'Keine passenden Pokémon.'));
  }
  function render() {
    const counters = document.querySelector('#booster-counters');
    const total = data.cards.reduce((sum, row) => sum + Number(row.count), 0);
    const counts = Object.fromEntries(['common', 'uncommon', 'rare', 'super', 'special'].map((rarity) => [rarity,
      data.cards.filter((row) => row.rarity === rarity).reduce((sum, row) => sum + Number(row.count), 0)]));
    const fullArts = data.cards.filter((row) => row.full_art).reduce((sum, row) => sum + Number(row.count), 0);
    counters.replaceChildren();
    for (const [title, value] of [['Booster', data.packs], ['Karten', total], ['Häufig ●', counts.common],
      ['Nicht häufig ◆', counts.uncommon], ['Selten ★', counts.rare], ['Super-selten · Silber ★', counts.super],
      ['Spezial-selten · Gold ★', counts.special], ['Full Arts 🖌️', fullArts]]) {
      const counter = node('div', 'booster-counter');
      counter.append(node('strong', '', format.format(value)), node('span', '', title));
      counters.append(counter);
    }
    const filled = new Set(data.cards.map((row) => byName.get(row.pokemon_name)?.num).filter((num) => dexGroups.has(num))).size;
    document.querySelector('#booster-dex-count').textContent = `${filled} / ${dexGroups.size} Dex-Plätze gefüllt · Formen und Kartenvarianten im jeweiligen Eintrag`;
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
    refresh.hidden = true;
    account.textContent = 'Deine Sammlung wird geladen …';
    try {
      const result = await store.load(owner);
      if (!authorized(owner, token) || request !== loadVersion) return;
      data = result;
      ready = true;
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
      box = dialog('Dein Booster');
      window.createMiloBooster(box, pack.team, () => {
        box.close();
        setTimeout(() => { if (authorized(owner, token)) openPack(); }, 0);
      }, {
        subtitle: 'Fünf Pokémon + eine Energiekarte.', overviewSubtitle: 'Deine fünf Pokémon',
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
            data = result;
            account.textContent = 'Deine Karten wurden im Account gespeichert.';
            render();
          } catch (error) {
            if (authorized(owner, token)) account.textContent = 'Die Karten sind noch nicht gespeichert. Öffne das vorgemerkte Pack erneut, um es noch einmal zu versuchen.';
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
    progress.hidden = true;
    dex.replaceChildren();
    document.querySelector('#booster-counters').replaceChildren();
    open.disabled = true;
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
        if (user?.id === result.user.id && ready) return;
        resetAccount();
        user = result.user;
        await loadCollection();
      } catch { if (request === authRequest) resetAccount(); }
    }, 0);
  });
  open.addEventListener('click', openPack);
  refresh.addEventListener('click', () => void loadCollection());
  search.addEventListener('input', renderDex);
  ownedOnly.addEventListener('change', renderDex);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && user && !popup && !busy) void loadCollection();
  });
})();
