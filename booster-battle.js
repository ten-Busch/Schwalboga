(() => {
  const root = document.querySelector('#battle-app');
  const setup = document.querySelector('#battle-setup');
  const matchArea = document.querySelector('#battle-match');
  const board = document.querySelector('#battle-board');
  const playerCount = document.querySelector('#battle-player-count');
  const nameFields = document.querySelector('#battle-names');
  const setSelect = document.querySelector('#battle-set');
  const openButton = document.querySelector('#battle-open');
  const sets = new Map([window.MAGMA_AQUA, window.NATDEX_PREMIER].map((set) => [set.id, set]));
  const byName = new Map(window.POKEDEX_ENTRIES.map((p) => [p.name, p]));
  const moneyNumber = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
  const money = { format: (amount) => `${moneyNumber.format(amount)} P` };
  const percent = new Intl.NumberFormat('de-DE', { style: 'percent', maximumSignificantDigits: 4 });
  const factor = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2 });
  const rarities = [['special', 'Spezial-selten', '★'], ['super', 'Super-selten', '★'], ['rare', 'Selten', '★'], ['uncommon', 'Nicht häufig', '◆'], ['common', 'Häufig', '●']];
  const colors = ['#80d7ca', '#e9b579', '#a3b8ff', '#ea9dba', '#b8d77b', '#d6a4f0', '#89c9f0', '#f0cb6e', '#9ad4a7', '#e9a793'];
  let match = null;
  let popup = null;
  let panels = [];
  let names = [];
  const node = (tag, className = '', text) => {
    const element = document.createElement(tag);
    element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const button = (text, callback) => {
    const control = node('button', '', text); control.type = 'button'; control.addEventListener('click', callback); return control;
  };
  function summaryFor(card, value = match.value(card)) {
    const tier = rarities.find((r) => r[0] === card.rarity[0]);
    return { value: money.format(value.amount), modifiers: [
      ...(value.dittoBonus ? [] : [`${tier[1]} ×${factor.format(value.rarityMultiplier)}`]),
      ...(card.fullArt ? ['Full Art ×2'] : []), ...(card.trainer ? ['Trainer ×1,5'] : []),
      ...(['Marc', 'Adrian'].includes(card.trainer) ? ['Boss Bonus ×1,1'] : []),
      ...(value.dittoBonus ? [`Ditto-Bonus +${money.format(value.dittoBonus)}`] : []),
      ...(value.offTeamBonus ? [`Woher habt ihr das?? +${money.format(value.offTeamBonus)}`] : []),
      ...(['z', 'tera'].includes(card.variant) ? [`${card.variant === 'z' ? 'Z' : 'Tera'} ×1,15`] : []),
    ], detail: `${percent.format(value.probability)} Pullrate · ${money.format(value.base)} Basiswert` };
  }
  function modifierList(summary) {
    const list = node('aside', 'milo-card-modifiers');
    summary.modifiers.forEach((text) => list.append(node('strong', '', text)));
    return list;
  }
  function valueAside(summary) {
    const value = node('aside', 'milo-card-value');
    value.append(node('small', '', 'KARTENWERT'), node('strong', '', summary.value));
    return value;
  }
  const sizing = new ResizeObserver((changes) => changes.forEach(({ target, contentRect }) => {
    target.style.setProperty('--mini-scale', String(contentRect.width / 320));
    target.style.setProperty('--card-scale', String(contentRect.width / 320));
  }));
  function renderNames() {
    for (const input of nameFields.querySelectorAll('input')) names[Number(input.dataset.index)] = input.value;
    nameFields.replaceChildren();
    for (let i = 0; i < Number(playerCount.value); i++) {
      const label = node('label', '', `Spieler ${i + 1}`);
      const input = node('input'); input.type = 'text'; input.maxLength = 32; input.required = true;
      input.value = names[i] ?? `Spieler ${i + 1}`; input.dataset.index = String(i); input.autocomplete = 'off';
      label.append(input); nameFields.append(label);
    }
  }
  for (const [id, set] of sets) { const option = node('option', '', set.name); option.value = id; setSelect.append(option); }
  function renderSetPreview() {
    const set = sets.get(setSelect.value);
    const preview = set.packaging ? window.BoosterPackaging.create({ design: set.packaging, name: set.name, pokemonName: 'Groudon' }) : node('img');
    if (!set.packaging) { preview.src = 'assets/tcg/Boosterpack.jpg'; preview.alt = 'Boosterpack'; }
    preview.id = 'battle-pack-preview';
    document.querySelector('#battle-pack-preview').replaceWith(preview);
    document.querySelector('#battle-set-title').textContent = set.name;
  }
  setSelect.addEventListener('change', renderSetPreview);
  renderSetPreview();
  playerCount.addEventListener('change', renderNames);
  renderNames();

  function dialog(title, className = '') {
    const box = node('dialog', `milo-joker-dialog ${className}`);
    const heading = node('h3', '', title); box.setAttribute('aria-label', title); box.append(heading); root.append(box);
    return box;
  }
  document.querySelector('#battle-set-info').addEventListener('click', () => {
    if (popup) return;
    const set = sets.get(setSelect.value);
    const rows = window.BoosterBattle.groupedRates(window.POKEDEX_ENTRIES, set).map((row) => {
      const c = row.card, p = byName.get(c.pokemonName);
      const label = [p.names?.de ?? p.name,
        c.fullArt ? 'Full Art' : 'Nicht-Full-Art',
        rarities.find((r) => r[0] === (Array.isArray(c.rarity) ? c.rarity[0] : c.rarity))?.[1] ?? ''].filter(Boolean).join(' · ');
      return { ...row, label, search: `${label} ${p.name}`.toLocaleLowerCase('de') };
    }).sort((a, b) => b.probability - a.probability || a.label.localeCompare(b.label, 'de'));
    const box = dialog(`${set.name} · Karten & Pullrates`, 'battle-rates-dialog');
    popup = box;
    box.append(node('p', 'battle-rates-note', 'Je Pokémon: Full Art und Nicht-Full-Art. Typen, Trainer, Z, Tera und Energy Foil sind zusammengefasst. Pullrate = Chance auf mindestens eine passende Karte pro Pack, inklusive God Packs.'));
    const search = node('input', 'battle-rates-search'); search.type = 'search'; search.placeholder = 'Pokémon oder Version suchen …'; search.setAttribute('aria-label', 'Karten filtern');
    const list = node('ol', 'battle-rates-list');
    const count = node('span'); count.setAttribute('aria-live', 'polite');
    let page = 0, filtered = rows;
    const pageSize = 200;
    const previous = button('Zurück', () => { page--; render(); });
    const next = button('Weiter', () => { page++; render(); });
    function render() {
      const start = page * pageSize;
      list.start = start + 1;
      list.replaceChildren(...filtered.slice(start, start + pageSize).map((row) => {
        const item = node('li'); item.append(node('span', '', row.label), node('strong', '', percent.format(row.probability))); return item;
      }));
      count.textContent = filtered.length ? `${start + 1}–${Math.min(start + pageSize, filtered.length)} von ${filtered.length.toLocaleString('de-DE')} Versionen` : 'Keine Karten gefunden';
      previous.disabled = page === 0; next.disabled = start + pageSize >= filtered.length;
      list.scrollTop = 0;
    }
    search.addEventListener('input', () => { const query = search.value.trim().toLocaleLowerCase('de'); filtered = rows.filter((row) => row.search.includes(query)); page = 0; render(); });
    const navigation = node('div', 'battle-rates-navigation'); navigation.append(previous, count, next);
    box.append(search, navigation, list, button('Schließen', () => box.close()));
    box.addEventListener('close', () => { box.remove(); popup = null; document.querySelector('#battle-set-info').focus(); }, { once: true });
    render(); box.showModal(); search.focus();
  });
  function viewPile(player, rarity) {
    if (popup) return;
    const pulls = player.pulls.filter((p) => p.card.rarity[0] === rarity)
      .sort((a, b) => Number(Boolean(b.card.fullArt)) - Number(Boolean(a.card.fullArt)) || b.amount - a.amount);
    const box = dialog(`${player.name} · ${rarities.find((r) => r[0] === rarity)[1]}`, 'battle-pile-dialog');
    popup = box;
    const gallery = node('div', 'battle-pile-gallery');
    let zoom = null;
    function zoomCard(card, holder, summary) {
      if (zoom) return;
      zoom = dialog('Karte ansehen', 'milo-card-zoom');
      zoom.classList.add('has-card-summary');
      const fit = node('div', 'milo-booster-card-fit milo-card-zoom-fit'); fit.append(card);
      const presentation = node('div', 'milo-card-presentation');
      presentation.append(modifierList(summary), fit, valueAside(summary));
      zoom.append(presentation, node('p', 'battle-pull-details', summary.detail), button('Vergrößerung schließen', () => zoom.close()));
      zoom.addEventListener('close', () => { holder.append(card); sizing.unobserve(fit); zoom.remove(); zoom = null; if (box.open) card.focus(); }, { once: true });
      zoom.showModal(); sizing.observe(fit);
    }
    for (const pull of pulls) {
      const slot = node('div', 'battle-pull');
      const fit = node('div', 'milo-booster-card-fit');
      const card = window.MiloCards.create(byName.get(pull.card.pokemonName), pull.card);
      const summary = summaryFor(pull.card, pull);
      card.tabIndex = 0; card.setAttribute('role', 'button'); card.setAttribute('aria-haspopup', 'dialog');
      card.title = 'Klicken zum Vergrößern';
      card.addEventListener('click', () => zoomCard(card, fit, summary));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); zoomCard(card, fit, summary); } });
      const row = node('div', 'milo-card-value-summary');
      row.append(modifierList(summary), valueAside(summary), node('small', 'milo-card-value-detail', summary.detail));
      fit.append(card); slot.append(fit, row);
      gallery.append(slot); sizing.observe(fit);
    }
    box.append(gallery, button('Schließen', () => box.close()));
    box.addEventListener('close', () => {
      zoom?.close(); gallery.querySelectorAll('.milo-booster-card-fit').forEach((el) => sizing.unobserve(el)); box.remove(); popup = null;
    }, { once: true });
    box.showModal();
  }
  function renderPlayer(player) {
    const panel = panels[player.id];
    panel.score.textContent = money.format(player.score);
    panel.packs.replaceChildren();
    const remaining = match.packs - player.opened;
    for (let i = 0; i < Math.min(remaining, 9); i++) {
      if (match.set.packaging) panel.packs.append(window.BoosterPackaging.create({ design: match.set.packaging, name: match.set.name, pokemonName: 'Groudon' }));
      else { const image = node('img'); image.src = 'assets/tcg/Boosterpack.jpg'; image.alt = ''; panel.packs.append(image); }
    }
    if (!remaining) panel.packs.append(node('span', '', 'Alle Packs geöffnet'));
    if (remaining > 9) panel.packs.append(node('span', '', `+${remaining - 9}`));
    panel.remaining.textContent = `${remaining} / ${match.packs} Booster übrig`;
    panel.piles.querySelectorAll('.battle-pile-visual').forEach((el) => sizing.unobserve(el));
    panel.piles.replaceChildren();
    for (const [id, name, symbol] of rarities) {
      const pulls = player.pulls.filter((p) => p.card.rarity[0] === id).sort((a, b) => b.amount - a.amount);
      const pile = button('', () => viewPile(player, id)); pile.className = 'battle-pile'; pile.disabled = !pulls.length;
      pile.setAttribute('aria-label', `${player.name}: ${pulls.length} Karten · ${name}`);
      const visual = node('div', 'battle-pile-visual');
      if (!pulls.length) visual.append(node('span', 'battle-pile-empty', symbol));
      else {
        pulls.slice(0, 3).reverse().forEach((pull, i, array) => {
          const fit = node('div', 'battle-mini-fit');
          const depth = array.length - i - 1;
          fit.style.transform = `translate(${depth * 3}px, ${-depth * 3}px) rotate(${depth * 3}deg)`;
          fit.append(window.MiloCards.create(byName.get(pull.card.pokemonName), pull.card)); visual.append(fit);
        });
      }
      pile.append(node('span', 'battle-pile-label', `${symbol} ${name}`), visual,
        node('span', 'battle-pile-count', `${pulls.length} Karten`),
        node('span', 'battle-pile-value', money.format(pulls.reduce((sum, p) => sum + p.amount, 0))));
      panel.piles.append(pile); sizing.observe(visual);
    }
  }
  function renderTurn() {
    root.classList.toggle('is-finished', match.finished);
    const ranking = match.ranking();
    for (const player of match.players) {
      const panel = panels[player.id];
      panel.root.classList.toggle('is-active', !match.finished && match.current === player.id);
      panel.root.classList.toggle('is-winner', match.finished && ranking.find((p) => p.id === player.id).rank === 1);
      panel.rank.textContent = `Platz ${ranking.find((p) => p.id === player.id).rank}`;
      panel.open.disabled = match.finished || match.current !== player.id || Boolean(popup);
    }
    const done = match.players.reduce((sum, p) => sum + p.opened, 0);
    document.querySelector('#battle-progress').textContent = `${match.set.name} · ${done} / ${match.players.length * match.packs} Booster · ${match.order === 'alternate' ? 'Abwechselnd' : 'Spieler nacheinander'}`;
    openButton.hidden = match.finished;
    openButton.disabled = Boolean(popup);
    if (!match.finished) {
      const player = match.players[match.current];
      document.querySelector('#battle-turn').textContent = `${player.name} ist am Zug`;
      openButton.textContent = `${match.pending ? 'Booster fortsetzen' : 'Booster öffnen'} · ${player.name}`;
    } else {
      document.querySelector('#battle-turn').textContent = 'Battle beendet';
      const result = document.querySelector('#battle-results'); result.hidden = false;
      const winners = ranking.filter((p) => p.rank === 1);
      const title = winners.length === 1 ? `${winners[0].name} gewinnt!` : `Gemeinsamer Sieg: ${winners.map((p) => p.name).join(' & ')}`;
      const list = node('ol', 'battle-leaderboard');
      ranking.forEach((p) => { const item = node('li'); item.append(`${p.rank}. ${p.name} · `, node('strong', '', money.format(p.score))); list.append(item); });
      result.replaceChildren(node('h2', '', title), list);
    }
  }
  function openPack() {
    if (!match || match.finished || popup) return;
    const pack = match.open();
    const player = match.players[pack.player];
    const box = dialog(`${player.name} · Booster ${player.opened + 1} / ${match.packs}`);
    popup = box;
    window.createMiloBooster(box, pack.team, () => box.close(), {
      ...match.revealOptions(), subtitle: `${player.name} · ${match.set.name} · Booster ${player.opened + 1} / ${match.packs}`,
      overviewSubtitle: pack.team.godPack ? 'GOD PACK · Deine Ausbeute' : `${player.name} · Deine Ausbeute`, completeLabel: 'Zug beenden',
      introduction: 'Was steckt in deinem Pack?',
      cardSubtitle: (card) => `${money.format(match.value(card).amount)} · ${percent.format(match.value(card).probability)}`,
      cardSummary: (card) => summaryFor(card),
      onShowAll: () => {
        const total = match.credit(); renderPlayer(player); renderTurn();
        return `Packwert: ${money.format(total)} · Gesamt: ${money.format(player.score)}`;
      },
    });
    box.addEventListener('close', () => {
      box.remove(); popup = null;
      const continueOpening = pack.credited && match.order === 'sequential' && player.opened < match.packs;
      if (pack.credited) match.advance();
      renderTurn(); openButton.focus({ preventScroll: true });
      if (continueOpening && !match.finished) openPack();
    }, { once: true });
    box.showModal(); renderTurn();
  }
  document.querySelector('#battle-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const error = document.querySelector('#battle-error'); error.hidden = true;
    try {
      names = [...nameFields.querySelectorAll('input')].map((input) => input.value);
      match = window.BoosterBattle.create({ names, packs: Number(document.querySelector('#battle-packs').value), order: document.querySelector('#battle-order').value, set: sets.get(setSelect.value) });
      sizing.disconnect(); board.replaceChildren(); panels = [];
      const columns = names.length <= 3 ? names.length : Math.ceil(names.length / 2);
      root.classList.add('is-playing');
      board.classList.toggle('is-multi-row', names.length > 3);
      board.style.setProperty('--battle-columns', String(columns));
      board.style.setProperty('--battle-tablet-columns', String(Math.min(columns, 3)));
      for (const player of match.players) {
        const panel = node('section', 'battle-player'); panel.style.setProperty('--player-color', colors[player.id]); panel.setAttribute('aria-label', player.name);
        const header = node('div', 'battle-player-header');
        const rank = node('span', 'battle-player-rank'); header.append(node('h3', '', player.name), rank);
        const score = node('div', 'battle-player-score');
        const control = button('', openPack); control.className = 'battle-pack-button'; control.setAttribute('aria-label', `Booster öffnen: ${player.name}`);
        const packs = node('div', 'battle-pack-strip'); const remaining = node('span', 'battle-pack-remaining'); control.append(packs, remaining);
        const piles = node('div', 'battle-piles'); panel.append(header, score, control, piles); board.append(panel);
        panels.push({ root: panel, score, rank, open: control, packs, remaining, piles }); renderPlayer(player);
      }
      document.querySelector('#battle-results').hidden = true;
      setup.hidden = true; matchArea.hidden = false; renderTurn(); openButton.focus();
    } catch (e) { error.textContent = e.message; error.hidden = false; }
  });
  openButton.addEventListener('click', openPack);
  document.querySelector('#battle-reset').addEventListener('click', () => {
    if (popup) return;
    if (match && !match.finished && match.players.some((p) => p.opened) && !window.confirm('Die laufende Battle beenden und eine neue starten?')) return;
    popup?.close(); popup = null; match = null; sizing.disconnect(); board.replaceChildren(); panels = [];
    matchArea.hidden = true; setup.hidden = false; document.querySelector('#battle-player-count').focus();
    root.classList.remove('is-playing', 'is-finished');
  });
  const fullscreen = document.querySelector('#battle-fullscreen'); fullscreen.hidden = !document.fullscreenEnabled;
  fullscreen.addEventListener('click', async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { /* Browser may disallow fullscreen in an embedded preview. */ }
  });
  document.addEventListener('fullscreenchange', () => { fullscreen.textContent = document.fullscreenElement ? 'Vollbild beenden' : 'Vollbild'; });
})();
