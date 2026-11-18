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
  const labels = ['Dein erster Zug', 'Die Verstärkung', 'Z-Kraft', 'Terakristallisierung', 'Energie', 'Der große Hit'];
  const cards = team.cards.map((item) => {
    const pokemon = window.POKEDEX_ENTRIES.find((p) => p.name === item.pokemonName);
    if (!pokemon) throw new Error(`Booster-Pokémon fehlt: ${item.pokemonName}`);
    const card = window.MiloCards.create(pokemon, { variant: item.variant, type: item.type, fullArt: item.fullArt, attackIds: item.attackIds, footerStats: item.footerStats });
    item.fullArt = card.classList.contains('is-full-art');
    item.attackIds = [...card.querySelectorAll('.milo-card-attack')].map((attack) => attack.dataset.move);
    item.footerStats = { weakness: card.dataset.weakness || null, resistance: card.dataset.resistance || null, retreat: Number(card.dataset.retreat) };
    return card;
  });
  cards.splice(cards.length - 1, 0, window.MiloCards.createEnergy(team.energyType));
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
    zoom.append(fit, button('Vergrößerung schließen', () => zoom.close()));
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
    subtitle.textContent = options.overviewSubtitle ?? `1.000.000 € · ${team.mode === 'doubles' ? 'Doubles' : 'Singles'} · Fünf Pokémon.`;
    scene.className = 'milo-booster-scene is-gallery';
    const gallery = node('div', 'milo-card-gallery milo-booster-gallery');
    cards.forEach((card, index) => {
      if (card.dataset.variant === 'energy') return;
      const slot = node('div', 'milo-card-preview-slot');
      const fit = node('div', 'milo-booster-card-fit');
      fit.append(card);
      slot.append(node('p', 'milo-booster-card-label', `${index === 5 ? 5 : index + 1} · ${['Pokémon', 'Pokémon', 'Z', 'Tera', 'Energie', 'Hit'][index]}`), fit);
      gallery.append(slot);
      sizing.observe(fit);
    });
    scene.replaceChildren(gallery);
    status.textContent = 'Karte anklicken zum Vergrößern.';
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
        } catch {
          if (closed) return;
          status.textContent = 'Speichern fehlgeschlagen. Deine Karten bleiben für einen erneuten Versuch vorgemerkt.';
          const retry = button('Speichern erneut versuchen', () => { retry.remove(); void save(); });
          actions.append(retry);
          retry.focus({ preventScroll: true });
        }
      };
      void save();
    }
    focusAction();
  }

  function reveal(index) {
    if (closed) return;
    scene.className = `milo-booster-scene is-reveal${index === cards.length - 1 ? ' is-big-hit' : ''}`;
    const aura = node('div', 'milo-booster-aura');
    aura.setAttribute('aria-hidden', 'true');
    const current = node('div', 'milo-booster-current');
    const fit = node('div', 'milo-booster-card-fit');
    fit.append(cards[index]);
    current.append(fit);
    scene.replaceChildren(aura, current);
    sizing.observe(fit);
    status.textContent = `${index + 1} / ${cards.length} · ${labels[index]} · ${cards[index].querySelector('.milo-card-title').textContent}`;
    actions.replaceChildren(button(index < cards.length - 1 ? 'Nächste Karte' : 'Alle Karten ansehen', () => {
      if (index < cards.length - 1) reveal(index + 1);
      else showAll();
    }, 'milo-primary'), button('Direkt alle Karten zeigen', showAll));
    focusAction();
  }

  const pack = node('div', 'milo-booster-pack');
  pack.setAttribute('role', 'img');
  pack.setAttribute('aria-label', 'Ein versiegeltes Pokémon-Boosterpack mit Milotic');
  pack.append(node('div', 'milo-booster-wrapper'), node('div', 'milo-booster-tear'));
  scene.append(pack);
  actions.append(button('Booster öffnen', () => {
    pack.classList.add('is-opening');
    pack.setAttribute('aria-label', 'Das Boosterpack wird geöffnet');
    status.textContent = 'Das Siegel bricht …';
    actions.firstElementChild.disabled = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer = setTimeout(() => reveal(0), reduced ? 0 : 1100);
  }, 'milo-primary'), button('Direkt alle Karten zeigen', showAll));
  return { showAll };
};
