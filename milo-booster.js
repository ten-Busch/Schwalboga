window.createMiloBooster = function createMiloBooster(box, team, onComplete, options = {}) {
  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const button = (text, action, className = '') => {
    const control = node('button', className, text);
    control.type = 'button';
    control.addEventListener('click', action);
    return control;
  };
  const labels = ['Dein erster Zug', 'Die Verstärkung', team.cards[2].variant === 'z' ? 'Z-Kraft' : 'Die Verstärkung', team.cards[3].variant === 'tera' ? 'Terakristallisierung' : 'Die Verstärkung', team.energyPokemon ? 'Energy Foil · Bonus-Pokémon' : 'Energie', 'Der große Hit'];
  const seenVersions = options.ownedVersionKeys ? new Set(options.ownedVersionKeys) : null;
  const cardSubtitles = new Map();
  const cardSummaries = new Map();
  const descriptors = new Map();
  const modifiersPanel = (summary) => {
    const panel = node('aside', 'milo-card-modifiers');
    summary.modifiers.forEach((text) => panel.append(node('strong', '', text)));
    return panel;
  };
  const valuePanel = (summary) => {
    const panel = node('aside', 'milo-card-value');
    panel.append(node('small', '', 'KARTENWERT'), node('strong', '', summary.value));
    return panel;
  };
  const renderCard = (item) => {
    const pokemon = window.POKEDEX_ENTRIES.find((p) => p.name === item.pokemonName);
    if (!pokemon) throw new Error(`Booster-Pokémon fehlt: ${item.pokemonName}`);
    const card = window.MiloCards.create(pokemon, item);
    descriptors.set(card, item);
    Object.assign(item, window.MiloCards.snapshot(card));
    if (options.cardSubtitle) cardSubtitles.set(card, options.cardSubtitle(item));
    if (options.cardSummary) cardSummaries.set(card, options.cardSummary(item));
    if (seenVersions) {
      const key = window.boosterVersionKey(item, pokemon);
      if (!seenVersions.has(key)) {
        const badge = node('span', 'milo-card-new-badge', 'Neu!');
        badge.setAttribute('aria-label', 'Neue Karten-Version');
        card.append(badge);
        card.dataset.isNew = 'true';
      }
      seenVersions.add(key);
    }
    if (options.chaseKeys?.has(window.boosterVersionKey(item, pokemon))) card.dataset.chase = 'true';
    if (options.fakeoutKeys?.has(window.boosterVersionKey(item, pokemon))) card.dataset.fakeout = 'true';
    return card;
  };
  const cards = team.cards.map(renderCard);
  cards.splice(cards.length - 1, 0, team.energyPokemon ? renderCard(team.energyPokemon)
    : window.MiloCards.createEnergy(team.energyType, { stamp: team.cards[0]?.stamp }));
  const hasChase = cards.some((card) => card.dataset.chase);
  box.classList.add('milo-booster-dialog');
  const subtitle = node('p', 'milo-booster-subtitle', options.subtitle ?? `1.000.000 € · ${team.mode === 'doubles' ? 'Doubles' : 'Singles'} · Fünf Pokémon + eine Energiekarte.`);
  const scene = node('div', 'milo-booster-scene');
  const status = node('p', 'milo-booster-status', options.introduction ?? 'Dein Booster für die Millionenfrage.');
  status.setAttribute('role', 'status');
  const actions = node('div', 'milo-booster-actions');
  box.append(subtitle, scene, status, actions);
  let timer;
  let completed = false;
  let closed = false;
  let zoom = null;
  const sizing = new ResizeObserver((entries) => entries.forEach(({ target, contentRect }) => {
    target.style.setProperty('--card-scale', String(contentRect.width / 320));
  }));
  box.addEventListener('close', () => { closed = true; clearTimeout(timer); zoom?.close(); sizing.disconnect(); }, { once: true });
  const focusAction = () => actions.querySelector('button')?.focus({ preventScroll: true });
  function zoomCard(card) {
    if (zoom || closed) return;
    const parent = card.parentElement;
    const next = card.nextSibling;
    zoom = node('dialog', 'milo-card-zoom');
    zoom.setAttribute('aria-label', `Vergrößerte Karte: ${card.getAttribute('aria-label')}`);
    const fit = node('div', 'milo-booster-card-fit milo-card-zoom-fit');
    fit.append(card);
    if (cardSummaries.has(card)) {
      const summary = cardSummaries.get(card);
      zoom.classList.add('has-card-summary');
      const presentation = node('div', 'milo-card-presentation');
      presentation.append(modifiersPanel(summary), fit, valuePanel(summary));
      zoom.append(presentation, node('p', 'milo-booster-card-subtitle', summary.detail));
    } else {
      zoom.append(fit);
      if (cardSubtitles.has(card)) fit.after(node('p', 'milo-booster-card-subtitle', cardSubtitles.get(card)));
    }
    zoom.append(button('Vergrößerung schließen', () => zoom.close()));
    zoom.addEventListener('close', () => {
      parent.insertBefore(card, next);
      sizing.unobserve(fit);
      zoom.remove();
      zoom = null;
      if (!closed) card.focus({ preventScroll: true });
    }, { once: true });
    box.append(zoom);
    zoom.showModal();
    sizing.observe(fit);
  }
  cards.forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');
    card.title = 'Klicken zum Vergrößern';
    card.addEventListener('click', () => zoomCard(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); zoomCard(card); }
    });
  });

  function showAll() {
    clearTimeout(timer);
    if (team.godPack) box.classList.add('is-god-pack');
    subtitle.textContent = options.overviewSubtitle ?? `1.000.000 € · ${team.mode === 'doubles' ? 'Doubles' : 'Singles'} · Fünf Pokémon.`;
    scene.className = 'milo-booster-scene is-gallery';
    const gallery = node('div', 'milo-card-gallery milo-booster-gallery');
    gallery.style.setProperty('--booster-card-count', team.energyPokemon ? '6' : '5');
    cards.forEach((card, index) => {
      if (card.dataset.variant === 'energy') return;
      const slot = node('div', 'milo-card-preview-slot');
      const fit = node('div', 'milo-booster-card-fit');
      fit.append(card);
      slot.append(node('p', 'milo-booster-card-label', `${gallery.children.length + 1} · ${card.dataset.chase ? 'CHASE RARE' : card.dataset.energyFoil ? 'Energy Foil' : index === 5 ? 'Hit' : card.dataset.variant === 'z' ? 'Z' : card.dataset.variant === 'tera' ? 'Tera' : 'Pokémon'}`), fit);
      if (cardSummaries.has(card)) {
        const summary = cardSummaries.get(card);
        const row = node('div', 'milo-card-value-summary');
        row.append(modifiersPanel(summary), valuePanel(summary), node('small', 'milo-card-value-detail', summary.detail));
        slot.append(row);
      } else if (cardSubtitles.has(card)) slot.append(node('p', 'milo-booster-card-subtitle', cardSubtitles.get(card)));
      gallery.append(slot);
      sizing.observe(fit);
    });
    scene.replaceChildren(gallery);
    if (team.godPack) scene.prepend(node('p', 'milo-god-announcement', 'GOD PACK!'));
    if (hasChase) scene.prepend(node('p', 'milo-chase-announcement', 'CHASE RARE! Ein außergewöhnlich seltener Fund.'));
    status.textContent = 'Karte anklicken zum Vergrößern.';
    const overviewMessage = options.onShowAll?.();
    if (typeof overviewMessage === 'string') status.textContent = overviewMessage;
    const complete = button(options.completeLabel ?? 'Zur Millionenfrage', () => {
      if (completed || closed) return;
      completed = true;
      onComplete();
    }, 'milo-primary');
    actions.replaceChildren(complete);
    if (options.onExit) actions.append(button('Zur Sammlung', options.onExit));
    if (options.onOverview) {
      const save = async () => {
        complete.disabled = true;
        status.textContent = 'Karten werden in deiner Sammlung gespeichert …';
        try {
          await options.onOverview();
          if (closed) return;
          complete.disabled = false;
          status.textContent = 'Gespeichert · Karte anklicken zum Vergrößern.';
          focusAction();
        } catch (error) {
          if (closed) return;
          status.textContent = error.userMessage ?? 'Speichern fehlgeschlagen. Deine Karten bleiben für einen erneuten Versuch vorgemerkt.';
          const retry = button('Speichern erneut versuchen', () => { retry.remove(); void save(); });
          actions.append(retry);
          retry.focus({ preventScroll: true });
        }
      };
      void save();
    }
    focusAction();
  }

  function fakeout(index, decoys) {
    const descriptor = { ...decoys[Math.floor(Math.random() * decoys.length)] };
    const pokemon = window.POKEDEX_ENTRIES.find((p) => p.name === descriptor.pokemonName);
    const topCard = window.MiloCards.create(pokemon, descriptor);
    const bottomCard = topCard.cloneNode(true);
    bottomCard.querySelector('.milo-card-sprite')?.addEventListener('error', (event) => {
      event.currentTarget.hidden = true;
      bottomCard.querySelector('.milo-card-art').append(node('span', 'milo-card-art-fallback', pokemon.names?.de ?? pokemon.name));
    }, { once: true });
    scene.className = 'milo-booster-scene is-fakeout';
    const current = node('div', 'milo-booster-current');
    const stage = node('div', 'milo-booster-card-fit milo-fakeout-stage');
    stage.setAttribute('aria-hidden', 'true');
    stage.append(cards[index]);
    [topCard, bottomCard].forEach((card, i) => {
      const half = node('div', `milo-fakeout-half ${i ? 'is-bottom' : 'is-top'}`);
      const fit = node('div', 'milo-booster-card-fit');
      fit.append(card);
      half.append(fit);
      stage.append(half);
    });
    current.append(stage);
    scene.replaceChildren(current);
    sizing.observe(stage);
    status.textContent = `${index + 1} / ${cards.length} · ${pokemon.names?.de ?? pokemon.name}`;
    const startRip = () => {
      if (closed || stage.classList.contains('is-ripping')) return;
      clearTimeout(timer);
      stage.classList.add('is-ripping');
      status.textContent = 'Moment mal … da steckt noch etwas dahinter!';
      actions.firstElementChild.disabled = true;
      timer = setTimeout(() => { sizing.unobserve(stage); reveal(index, true); }, 1200);
    };
    actions.replaceChildren(button('Aufdecken', startRip, 'milo-primary'), button('Direkt alle Karten zeigen', showAll));
    timer = setTimeout(startRip, 1100);
    focusAction();
  }

  function dittoFakeout(index, decoys) {
    const descriptor = decoys[Math.floor(Math.random() * decoys.length)];
    const pokemon = window.POKEDEX_ENTRIES.find((p) => p.name === descriptor.pokemonName);
    const disguise = window.MiloCards.create(pokemon, { ...descriptor });
    scene.className = 'milo-booster-scene is-ditto-disguise';
    const fit = node('div', 'milo-booster-card-fit milo-ditto-disguise');
    fit.append(disguise);
    scene.replaceChildren(fit);
    sizing.observe(fit);
    status.textContent = `${index + 1} / ${cards.length} · ${pokemon.names?.de ?? pokemon.name}`;
    actions.replaceChildren(button('Direkt alle Karten zeigen', showAll));
    timer = setTimeout(() => {
      if (closed) return;
      fit.classList.add('is-transforming');
      status.textContent = 'Moment … mit dieser Karte stimmt etwas nicht!';
      timer = setTimeout(() => { sizing.unobserve(fit); reveal(index, true, true); }, 3400);
    }, 1100);
    focusAction();
  }

  function reveal(index, afterSuspense = false, dittoRevealed = false) {
    if (closed) return;
    clearTimeout(timer);
    const chase = Boolean(cards[index].dataset.chase);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rank = (item) => ['common', 'uncommon', 'rare', 'super', 'special'].indexOf(Array.isArray(item?.rarity) ? item.rarity[0] : item?.rarity);
    const actual = descriptors.get(cards[index]);
    const decoys = (options.fakeoutDecoys ?? []).filter((decoy) => rank(actual) > rank(decoy)
      && (!options.fakeoutEligible || options.fakeoutEligible(actual, decoy)));
    if (actual?.setId === 'magma-aqua' && actual.pokemonName === 'Ditto' && decoys.length && !afterSuspense && !reduced) {
      dittoFakeout(index, decoys);
      return;
    }
    if (cards[index].dataset.fakeout && decoys.length && !afterSuspense && !reduced) {
      fakeout(index, decoys);
      return;
    }
    if (chase && !afterSuspense && !reduced) {
      scene.className = 'milo-booster-scene is-chase-suspense';
      scene.replaceChildren(node('div', 'milo-chase-seal', '✦'));
      status.textContent = 'Moment mal … dieses Leuchten ist außergewöhnlich!';
      actions.replaceChildren(button('Jetzt aufdecken', () => reveal(index, true), 'milo-primary'));
      timer = setTimeout(() => reveal(index, true), 2200);
      focusAction();
      return;
    }
    scene.className = `milo-booster-scene is-reveal${index === cards.length - 1 ? ' is-big-hit' : ''}${chase ? ' is-chase-reveal' : ''}`;
    const aura = node('div', 'milo-booster-aura');
    aura.setAttribute('aria-hidden', 'true');
    const current = node('div', 'milo-booster-current');
    if (dittoRevealed) current.classList.add('is-ditto-revealed');
    const fit = node('div', 'milo-booster-card-fit');
    fit.append(cards[index]);
    current.append(fit);
    if (cardSummaries.has(cards[index])) {
      const summary = cardSummaries.get(cards[index]);
      current.classList.add('has-card-summary');
      current.prepend(modifiersPanel(summary));
      current.append(valuePanel(summary));
    }
    scene.replaceChildren(aura, current);
    if (chase) {
      const sparks = node('div', 'milo-chase-sparks');
      sparks.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < 32; i++) {
        const spark = node('i', '');
        spark.style.setProperty('--spark-angle', `${i * 360 / 32}deg`);
        spark.style.setProperty('--spark-delay', `${i % 5 * .06}s`);
        sparks.append(spark);
      }
      scene.prepend(sparks);
      current.prepend(node('p', 'milo-chase-announcement', 'CHASE RARE!'));
    }
    sizing.observe(fit);
    status.textContent = `${index + 1} / ${cards.length} · ${chase ? 'CHASE RARE · ' : ''}${labels[index]} · ${cards[index].querySelector('.milo-card-title').textContent}`;
    if (cardSubtitles.has(cards[index])) status.textContent += ` · ${cardSubtitles.get(cards[index])}`;
    actions.replaceChildren(button(index < cards.length - 1 ? 'Nächste Karte' : 'Alle Karten ansehen', () => {
      if (index < cards.length - 1) reveal(index + 1);
      else showAll();
    }, 'milo-primary'), button('Direkt alle Karten zeigen', showAll));
    focusAction();
  }

  const pack = team.packaging && window.BoosterPackaging ? window.BoosterPackaging.create(team.packaging) : node('div', 'milo-booster-pack');
  pack.setAttribute('role', 'img');
  if (!team.packaging) {
    pack.setAttribute('aria-label', 'Ein versiegeltes Pokémon-Boosterpack mit Milotic');
    pack.append(node('div', 'milo-booster-wrapper'), node('div', 'milo-booster-tear'));
  }
  if (team.godPack) {
    pack.classList.add('is-god-pack');
    const light = node('div', 'milo-god-seal-light');
    light.setAttribute('aria-hidden', 'true');
    pack.append(light);
  }
  scene.append(pack);
  actions.append(button('Booster öffnen', () => {
    pack.classList.add('is-opening');
    pack.setAttribute('aria-label', 'Das Boosterpack wird geöffnet');
    if (team.godPack) box.classList.add('is-god-pack');
    status.textContent = team.godPack ? 'Goldenes Licht … ein GOD PACK!' : 'Das Siegel bricht …';
    actions.firstElementChild.disabled = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer = setTimeout(() => reveal(0), reduced ? 0 : team.godPack ? 1750 : 1100);
  }, 'milo-primary'), button('Direkt alle Karten zeigen', showAll));
  return { showAll };
};
