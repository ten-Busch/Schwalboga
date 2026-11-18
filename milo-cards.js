window.MiloCards = (() => {
  const elements = {
    Fire: 'Fire', Electric: 'Electric', Rock: 'Fighting', Ground: 'Fighting', Fighting: 'Fighting',
    Poison: 'Dark', Dark: 'Dark', Psychic: 'Psychic', Ghost: 'Psychic', Fairy: 'Psychic',
    Bug: 'Grass', Grass: 'Grass', Flying: 'Normal', Normal: 'Normal', Dragon: 'Dragon',
    Steel: 'Steel', Water: 'Water', Ice: 'Water',
  };
  const typeNames = { Fire: 'Feuer', Electric: 'Elektro', Rock: 'Gestein', Ground: 'Boden', Fighting: 'Kampf',
    Poison: 'Gift', Dark: 'Unlicht', Psychic: 'Psycho', Ghost: 'Geist', Fairy: 'Fee', Bug: 'Käfer',
    Grass: 'Pflanze', Flying: 'Flug', Normal: 'Normal', Dragon: 'Drache', Steel: 'Stahl', Water: 'Wasser', Ice: 'Eis' };
  const zMoves = {
    Normal: 'breakneckblitz', Fire: 'infernooverdrive', Water: 'hydrovortex', Electric: 'gigavolthavoc',
    Grass: 'bloomdoom', Ice: 'subzeroslammer', Fighting: 'alloutpummeling', Poison: 'aciddownpour',
    Ground: 'tectonicrage', Flying: 'supersonicskystrike', Psychic: 'shatteredpsyche', Bug: 'savagespinout',
    Rock: 'continentalcrush', Ghost: 'neverendingnightmare', Dragon: 'devastatingdrake', Dark: 'blackholeeclipse',
    Steel: 'corkscrewcrash', Fairy: 'twinkletackle',
  };
  const colors = { Fire: '#d96530', Electric: '#dfbc2c', Fighting: '#af7652', Dark: '#294d53',
    Psychic: '#61407f', Grass: '#79a34f', Normal: '#b8b19e', Dragon: '#928137', Steel: '#829da4', Water: '#639fc0' };
  const mega = (p) => /^Mega(?:-|$)/i.test(p.forme ?? '') || /-Mega(?:-|$)/i.test(p.name);
  const fullArtFiles = {
    Regirock: 'regi', Registeel: 'regi', Regice: 'regi', Regieleki: 'regi', Regidrago: 'regi', Regigigas: 'regi',
    Articuno: 'articuno', Moltres: 'moltres', Zapdos: 'zapdos',
    Lunala: 'moon', 'Necrozma-Dawn-Wings': 'moon', Solgaleo: 'sun', 'Necrozma-Dusk-Mane': 'sun',
    Groudon: 'ruby', 'Groudon-Primal': 'ruby', 'Camerupt-Mega': 'ruby',
    Kyogre: 'sapphire', 'Kyogre-Primal': 'sapphire', 'Sharpedo-Mega': 'sapphire',
    Xerneas: 'x', Yveltal: 'Y', Palkia: 'pearl', 'Palkia-Origin': 'pearl', Dialga: 'diamond', 'Dialga-Origin': 'diamond',
    ...Object.fromEntries(['Tauros', 'Kangaskhan', 'Kangaskhan-Mega', 'Chansey', 'Marowak', 'Scyther', 'Pinsir',
      'Nidoking', 'Nidoqueen', 'Dragonair', 'Dragonite', 'Dratini', 'Exeggutor'].map((name) => [name, 'safari zone'])),
  };
  function fullArtBackground(pokemon) {
    const base = window.POKEDEX_ENTRIES.find((p) => p.name === pokemon.baseSpecies);
    const tags = [...(pokemon.tags ?? []), ...(base?.tags ?? [])];
    const file = fullArtFiles[pokemon.name] ?? (mega(pokemon) ? 'mega'
      : tags.includes('Ultra Beast') ? 'ultra beast' : tags.some((tag) => /Legendary/.test(tag)) ? 'might' : null);
    if (!file) return null;
    // The source images are 512px high; these three have solid black strips below the artwork.
    const height = ({ regi: 365, moon: 434, sun: 491 })[file] ?? 512;
    return { file, height, position: file === 'ultra beast' ? '100%' : '50%' };
  }
  const pseudoLegendaries = new Set(['Dragonite', 'Tyranitar', 'Salamence', 'Metagross', 'Garchomp',
    'Hydreigon', 'Goodra', 'Kommo-o', 'Dragapult', 'Baxcalibur']);
  function rarity(pokemon) {
    const base = window.POKEDEX_ENTRIES.find((p) => p.name === pokemon.baseSpecies);
    const tags = [...(pokemon.tags ?? []), ...(base?.tags ?? [])];
    const legendary = tags.some((tag) => /Legendary/.test(tag));
    if (mega(pokemon) && legendary) return ['special', 'Spezial-selten', '★'];
    if (mega(pokemon) || tags.includes('Mythical')) return ['super', 'Super-selten', '★'];
    if (legendary || tags.includes('Ultra Beast') || tags.includes('Paradox')
      || pseudoLegendaries.has(pokemon.baseSpecies ?? pokemon.name)) return ['rare', 'Selten', '★'];
    if ((pokemon.evos?.length ?? 0) || (base?.evos?.length ?? 0)) return ['common', 'Häufig', '●'];
    return ['uncommon', 'Nicht häufig', '◆'];
  }
  const node = (tag, className, text) => {
    const result = document.createElement(tag);
    result.className = className;
    if (text !== undefined) result.textContent = text;
    return result;
  };
  function energy(type) {
    const mapped = elements[type] ?? 'Normal';
    const badge = node('span', 'milo-card-energy');
    badge.title = typeNames[mapped] ?? mapped;
    const image = node('img', '');
    image.src = `Type Icons/${mapped}_icon_HOME3.png`;
    image.alt = typeNames[mapped] ?? mapped;
    badge.append(image);
    return badge;
  }

  function brand() {
    const label = node('span', 'milo-card-brand');
    label.append(node('span', '', 'SCHWALBOGA'), node('span', '', 'MILO-NÄR'));
    return label;
  }

  function footerStats(pokemon, defendingTypes, saved) {
    const chart = window.POKEDEX_META.typeChart;
    const multiplier = (type) => defendingTypes.reduce((value, defense) => value * (chart[defense]?.[type] ?? 1), 1);
    const weak = Object.keys(elements).filter((type) => multiplier(type) > 1);
    const resist = Object.keys(elements).filter((type) => multiplier(type) > 0 && multiplier(type) < 1);
    const pick = (types) => types[Math.floor(Math.random() * types.length)] ?? null;
    const speed = pokemon.baseStats.spe;
    const stats = saved ?? { weakness: pick(weak), resistance: Math.random() < .5 ? null : pick(resist),
      retreat: speed >= 110 ? 0 : speed >= 80 ? 1 : speed >= 50 ? 2 : 3 };
    const strip = node('span', 'milo-card-footer-stats');
    const paths = {
      weakness: 'M2 2l5 4 5-4M2 7l5 4 5-4',
      resistance: 'M7 1L2 3v4c0 3 5 6 5 6s5-3 5-6V3Z',
      retreat: 'M2 8h8M7 4l4 4-4 4M2 3v5',
    };
    function group(kind, label) {
      const item = node('span', `milo-card-footer-stat stat-${kind}`);
      item.title = label;
      item.setAttribute('aria-label', label);
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('viewBox', '0 0 14 14');
      icon.setAttribute('aria-hidden', 'true');
      const path = document.createElementNS(icon.namespaceURI, 'path');
      path.setAttribute('d', paths[kind]);
      icon.append(path);
      item.append(icon);
      strip.append(item);
      return item;
    }
    if (stats.weakness) group('weakness', `Schwäche: ${typeNames[stats.weakness]}`).append(energy(stats.weakness));
    if (stats.resistance) group('resistance', `Resistenz: ${typeNames[stats.resistance]}`).append(energy(stats.resistance));
    const retreat = group('retreat', `Rückzugskosten: ${stats.retreat}`);
    for (let index = 0; index < stats.retreat; index += 1) retreat.append(energy('Normal'));
    return { strip, stats };
  }

  function createEnergy(type = 'Normal') {
    const element = elements[type] ?? 'Normal';
    const card = node('article', 'milo-card milo-energy-card');
    card.dataset.variant = 'energy';
    card.dataset.element = element;
    card.style.setProperty('--card-color', colors[element]);
    card.setAttribute('aria-label', `${typeNames[element]}-Energie`);
    const header = node('header', 'milo-card-header');
    header.append(node('h3', 'milo-card-title', `${typeNames[element]}-Energie`));
    const emblem = node('div', 'milo-energy-emblem');
    emblem.append(energy(type));
    const footer = node('footer', 'milo-card-footer');
    footer.append(brand());
    card.append(header, node('p', 'milo-energy-caption', 'BASIS-ENERGIE'), emblem,
      node('p', 'milo-energy-note', 'Zusatzkarte · zählt nicht zur Teamwertung'), footer);
    return card;
  }

  function create(pokemon, options = {}) {
    const moves = window.POKEDEX_META.movesById;
    const variant = options.variant ?? (mega(pokemon) ? 'mega' : 'normal');
    if (!['normal', 'mega', 'tera', 'z'].includes(variant)) throw new Error('Unbekannte Kartenvariante.');
    const upgradeType = options.type ?? pokemon.types[0];
    if (!elements[upgradeType]) throw new Error('Unbekannter Kartentyp.');
    const type = variant === 'tera' ? upgradeType : pokemon.types[0];
    const element = elements[type] ?? 'Normal';
    const title = pokemon.names?.de ?? pokemon.name;
    const background = fullArtBackground(pokemon);
    const fullArt = Boolean(background && (options.fullArt === true || (options.fullArt === undefined && Math.random() < .1)));
    const candidates = pokemon.moveIds.map((id) => moves[id])
      .filter((move) => move && move.category !== 'Status' && move.basePower > 1 && !/^(?:g?max)/.test(move.id));
    let move;
    if (variant === 'z') {
      move = candidates.find((move) => move.type === upgradeType) ?? candidates[0];
    } else if (variant === 'tera') {
      move = candidates.find((move) => move.type === upgradeType);
      if (!move) {
        move = { ...moves.terablast, id: 'terablast', name: 'Tera Blast', names: { de: 'Tera-Ausbruch' },
          type: upgradeType, basePower: 80, accuracy: 100,
          category: pokemon.baseStats.atk > pokemon.baseStats.spa ? 'Physical' : 'Special' };
      }
    } else {
      const preferred = pokemon.types.length > 1 && Math.random() < .5 ? pokemon.types[1] : pokemon.types[0];
      move = candidates.find((move) => move.type === preferred)
        ?? candidates.find((move) => pokemon.types.includes(move.type));
    }
    const ability = pokemon.abilityDetails.find((entry) => entry.slot === '0') ?? pokemon.abilityDetails[0];
    const card = node('article', `milo-card is-${variant}`);
    if (fullArt) {
      card.classList.add('is-full-art');
      card.dataset.fullArt = background.file;
      card.style.setProperty('--fullart-image', `url("assets/tcg/${background.file}.png")`);
      card.style.setProperty('--fullart-size', `${512 / background.height * 100}%`);
      card.style.setProperty('--fullart-position', background.position);
    }
    const base = window.POKEDEX_ENTRIES.find((p) => p.name === pokemon.baseSpecies);
    const tags = [...(pokemon.tags ?? []), ...(base?.tags ?? [])];
    const finish = tags.includes('Ultra Beast') ? 'galaxy'
      : tags.includes('Paradox') ? pokemon.name.startsWith('Iron ') ? 'binary' : 'shards'
      : tags.some((tag) => /Legendary|Mythical/.test(tag)) ? 'holo' : null;
    if (finish) card.dataset.finish = finish;
    card.style.setProperty('--card-color', colors[element]);
    card.dataset.element = element;
    card.dataset.variant = variant;
    card.setAttribute('aria-label', `${title} · ${variant === 'normal' ? 'Standard' : variant.toUpperCase()} · ${typeNames[element]}`);

    const header = node('header', 'milo-card-header');
    const stage = variant === 'mega' ? 'MEGA' : pokemon.prevo ? 'ENTWICKLUNG' : 'BASIS';
    header.append(node('span', 'milo-card-stage', stage), node('h3', 'milo-card-title', title));
    const hp = node('span', 'milo-card-hp');
    hp.append(node('small', '', 'KP'), node('strong', '', String(pokemon.baseStats.hp)));
    header.append(hp, energy(type));
    const art = node('div', 'milo-card-art');
    const sprite = node('img', 'milo-card-sprite');
    sprite.src = pokemon.sprite;
    sprite.alt = title;
    sprite.addEventListener('error', () => {
      sprite.hidden = true;
      art.append(node('span', 'milo-card-art-fallback', title));
    }, { once: true });
    art.append(sprite);
    if (variant === 'tera') {
      const crystal = window.TeraSpriteEffects.create(pokemon.sprite, window.TeraSpriteEffects.palettes[upgradeType], { animate: false });
      crystal.classList.add('milo-card-crystal');
      art.append(crystal);
    }
    if (finish && variant !== 'z') {
      const foil = node('div', `milo-species-foil foil-${finish}`);
      foil.setAttribute('aria-hidden', 'true');
      if (finish === 'binary') {
        for (let i = 0; i < 55; i += 1) {
          const digit = node('span', '', Math.random() < .5 ? '0' : '1');
          digit.style.cssText = `left:${Math.random() * 94}%;top:${Math.random() * 94}%;animation-delay:-${Math.random() * 6}s`;
          foil.append(digit);
        }
      }
      if (finish === 'galaxy') {
        for (let i = 0; i < 26; i += 1) {
          const star = node('i', i % 3 ? 'foil-dot' : 'foil-star');
          star.style.cssText = `left:${Math.random() * 96}%;top:${Math.random() * 96}%;animation-delay:-${Math.random() * 6}s`;
          foil.append(star);
        }
      }
      if (finish === 'shards') {
        for (let i = 0; i < 22; i += 1) {
          const shard = node('i', '');
          shard.style.cssText = `left:${Math.random() * 85}%;top:${Math.random() * 85}%;transform:rotate(${Math.random() * 360}deg);animation-delay:-${Math.random() * 7}s`;
          foil.append(shard);
        }
      }
      (finish === 'holo' ? art : card).append(foil);
    }
    if (variant !== 'normal') {
      art.append(node('span', 'milo-card-seal', variant === 'tera' ? `TERA · ${typeNames[upgradeType]}`
        : variant === 'z' ? `Z · ${typeNames[upgradeType]}` : 'MEGA-ENTWICKLUNG'));
    }
    const caption = node('div', 'milo-card-caption', `Nr. ${String(pokemon.num).padStart(4, '0')} · ${typeNames[type]} · Schwalboga`);
    const body = node('div', 'milo-card-body');
    const abilityBlock = node('section', 'milo-card-ability');
    const abilityHeading = node('div', 'milo-card-ability-heading');
    abilityHeading.append(node('span', 'milo-card-ability-label', 'Fähigkeit'),
      node('strong', '', ability?.names?.de ?? ability?.name ?? 'Keine Fähigkeit'));
    abilityBlock.append(abilityHeading, node('p', '', window.ABILITY_DESCRIPTIONS_DE?.[ability?.id]
      ?? ability?.shortDesc ?? 'Keine Beschreibung verfügbar.'));
    body.append(abilityBlock);

    const teraBlast = { ...moves.terablast, id: 'terablast', name: 'Tera Blast', names: { de: 'Tera-Ausbruch' },
      type: upgradeType, basePower: 80, accuracy: 100,
      category: pokemon.baseStats.atk > pokemon.baseStats.spa ? 'Physical' : 'Special' };
    const eligible = variant === 'tera'
      ? [...candidates.filter((m) => m.type === upgradeType && m.id !== 'terablast'), teraBlast]
      : candidates.filter((m) => pokemon.types.includes(m.type));
    if (variant !== 'z' && options.attackIds?.[0]) {
      move = eligible.find((m) => m.id === options.attackIds[0]) ?? move;
    }
    const attackRows = [{ move, z: variant === 'z' }];
    const wantsSecond = options.attackIds ? options.attackIds.length > 1 : (options.secondAttack ?? Math.random() < .5);
    if (wantsSecond) {
      const firstName = move?.names?.de ?? move?.name;
      const alternatives = eligible.filter((m) => variant === 'z' || (m.id !== move?.id && (m.names?.de ?? m.name) !== firstName));
      const second = options.attackIds?.[1] ? alternatives.find((m) => m.id === options.attackIds[1])
        : alternatives[Math.floor(Math.random() * alternatives.length)];
      if (second) attackRows.push({ move: second, z: false });
    }
    card.dataset.attackCount = String(attackRows.length);
    const attacks = node('div', 'milo-card-attacks');
    for (const row of attackRows) {
      const m = row.move;
      const attack = node('section', 'milo-card-attack' + (row.z ? ' milo-card-z-attack' : ''));
      attack.dataset.move = row.z ? zMoves[upgradeType] : m?.id ?? '';
      attack.dataset.type = row.z ? upgradeType : m?.type ?? '';
      const heading = node('div', 'milo-card-attack-heading');
      const costs = node('div', 'milo-card-energy-cost');
      const attackType = row.z ? upgradeType : m?.type ?? type;
      const energyCount = row.z ? 3 : Math.min(3, Math.max(1, Math.ceil((m?.basePower ?? 40) / 50)));
      for (let index = 0; index < energyCount; index += 1) costs.append(energy(attackType));
      const zMove = moves[zMoves[upgradeType]];
      heading.append(costs, node('strong', 'milo-card-move-title', row.z ? zMove?.names?.de ?? zMove?.name ?? 'Z-Attacke' : m?.names?.de ?? m?.name ?? '—'));
      heading.append(node('strong', 'milo-card-damage', row.z ? 'Z' : m ? String(m.basePower) : '—'));
      attack.append(heading, node('p', '', row.z ? 'Entfessle die Kraft des Z-Kristalls. Einmal pro Kampf.'
        : m ? (m.category === 'Physical' ? 'Physisch' : 'Speziell') + ' · ' + typeNames[m.type] + ' · '
          + (m.accuracy === null ? 'Trifft immer' : 'Genauigkeit ' + m.accuracy + '%') : 'Keine offensive STAB-Attacke im Datensatz.'));
      attacks.append(attack);
    }
    abilityBlock.querySelector('p').title = abilityBlock.querySelector('p').textContent;
    body.append(attacks);
    const footer = node('footer', 'milo-card-footer');
    const [rarityId, rarityLabel, raritySymbol] = rarity(pokemon);
    const rarityBadge = node('span', `milo-card-rarity rarity-${rarityId}`);
    const modifier = variant === 'tera' ? 'T' : variant === 'z' ? 'Z' : '';
    rarityBadge.title = `${rarityLabel}${modifier ? ` · ${variant === 'tera' ? 'Tera' : 'Z'}` : ''}`;
    rarityBadge.setAttribute('aria-label', rarityBadge.title);
    rarityBadge.append(node('span', 'milo-card-rarity-symbol', raritySymbol));
    if (modifier) rarityBadge.append(node('span', 'milo-card-rarity-modifier', modifier));
    if (fullArt) {
      const brush = node('span', 'milo-card-fullart-mark', '🖌️');
      brush.setAttribute('aria-label', 'Full Art');
      rarityBadge.append(brush);
      rarityBadge.title += ' · Full Art';
      rarityBadge.setAttribute('aria-label', rarityBadge.title);
    }
    const { strip, stats } = footerStats(pokemon, variant === 'tera' ? [upgradeType] : pokemon.types, options.footerStats);
    card.dataset.weakness = stats.weakness ?? '';
    card.dataset.resistance = stats.resistance ?? '';
    card.dataset.retreat = String(stats.retreat);
    footer.append(brand(), strip, rarityBadge);
    const sheen = node('div', 'milo-card-foil');
    sheen.setAttribute('aria-hidden', 'true');
    card.append(header, art, ...(fullArt ? [] : [caption]), body, footer, sheen);
    if (variant === 'tera' && !fullArt) {
      const backgroundCrystal = window.TeraSpriteEffects.create(null,
        window.TeraSpriteEffects.palettes[upgradeType], { animate: false, width: 160, height: 224 });
      backgroundCrystal.classList.add('milo-card-background-crystal');
      card.prepend(backgroundCrystal);
    }
    if (['galaxy', 'binary', 'shards'].includes(finish) && variant !== 'z') {
      const resetLight = () => {
        card.style.setProperty('--foil-x', '50%');
        card.style.setProperty('--foil-y', '50%');
        card.style.setProperty('--foil-dx', '0px');
        card.style.setProperty('--foil-dy', '0px');
      };
      card.addEventListener('pointermove', (event) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const bounds = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
        card.style.setProperty('--foil-x', `${x * 100}%`);
        card.style.setProperty('--foil-y', `${y * 100}%`);
        card.style.setProperty('--foil-dx', `${(x - .5) * 14}px`);
        card.style.setProperty('--foil-dy', `${(y - .5) * 14}px`);
      });
      card.addEventListener('pointerleave', resetLight);
      card.addEventListener('pointercancel', resetLight);
      resetLight();
    }
    return card;
  }

  function preview() {
    const pokemon = window.POKEDEX_ENTRIES.filter((p) => !p.hidden && !p.impossible && !p.unreleased);
    const box = node('dialog', 'milo-card-preview');
    box.setAttribute('aria-labelledby', 'milo-card-preview-title');
    const header = node('header', 'milo-card-preview-header');
    header.append(node('h2', '', 'Kartenwerkstatt'));
    header.querySelector('h2').id = 'milo-card-preview-title';
    const close = node('button', '', 'Schließen');
    close.type = 'button';
    close.addEventListener('click', () => box.close());
    header.append(close);
    const intro = node('p', 'milo-card-preview-note', 'Showdown-Sprites · KP und Attackenstärke aus dem Spieldatensatz · Energiekosten für die Kartenansicht abgeleitet');
    const controls = node('div', 'milo-card-preview-controls');
    function selectField(label, values) {
      const field = node('label', '', label);
      const select = node('select', '');
      select.setAttribute('aria-label', label);
      values.forEach(([value, text]) => {
        const option = node('option', '', text);
        option.value = value;
        select.append(option);
      });
      field.append(select);
      controls.append(field);
      return select;
    }
    const chosen = selectField('Pokémon', pokemon.map((p) => [p.speciesId, p.names?.de ?? p.name]));
    const variant = selectField('Kartenvariante', [['normal', 'Standard / Mega automatisch'], ['tera', 'Tera'], ['z', 'Z-Kristall'], ['energy', 'Energiekarte']]);
    const type = selectField('Tera-/Z-Typ', Object.keys(elements).map((key) => [key, typeNames[key]]));
    const artMode = selectField('Full Art', [['random', 'Zufällig · 10 %'], ['always', 'Erzwingen, falls verfügbar'], ['never', 'Aus']]);
    const show = node('button', '', 'Vorschau ersetzen');
    show.type = 'button';
    controls.append(show);
    const gallery = node('div', 'milo-card-gallery');
    const defaults = [
      ['Charizard', { variant: 'normal' }],
      ['Milotic', { variant: 'tera', type: 'Electric' }],
      ['Garchomp', { variant: 'z', type: 'Dragon' }],
      ['Charizard-Mega-X', { variant: 'mega' }],
    ];
    function slot(p, options) {
      const wrapper = node('div', 'milo-card-preview-slot');
      wrapper.append(create(p, { fullArt: artMode.value === 'always' ? true : artMode.value === 'never' ? false : undefined, ...options }));
      return wrapper;
    }
    for (const [name, options] of defaults) {
      const p = pokemon.find((entry) => entry.name === name);
      if (p) gallery.append(slot(p, options));
    }
    const first = pokemon.find((p) => p.name === 'Charizard');
    if (first) chosen.value = first.speciesId;
    function updateType() {
      type.disabled = variant.value === 'normal';
    }
    variant.addEventListener('change', updateType);
    show.addEventListener('click', () => {
      const p = pokemon.find((entry) => entry.speciesId === chosen.value);
      if (variant.value === 'energy') {
        const wrapper = node('div', 'milo-card-preview-slot');
        wrapper.append(createEnergy(type.value));
        gallery.replaceChildren(wrapper);
      } else gallery.replaceChildren(slot(p, { variant: variant.value === 'normal' ? mega(p) ? 'mega' : 'normal' : variant.value, type: type.value }));
    });
    const reset = node('button', '', 'Vier Varianten vergleichen');
    reset.type = 'button';
    reset.addEventListener('click', () => {
      gallery.replaceChildren();
      for (const [name, options] of defaults) {
        const p = pokemon.find((entry) => entry.name === name);
        if (p) gallery.append(slot(p, options));
      }
    });
    controls.append(reset);
    const finishes = node('button', '', 'Spezialfolierungen vergleichen');
    finishes.type = 'button';
    finishes.addEventListener('click', () => {
      gallery.replaceChildren();
      for (const name of ['Lugia', 'Nihilego', 'Iron Valiant', 'Roaring Moon']) {
        const p = pokemon.find((entry) => entry.name === name);
        if (p) gallery.append(slot(p, {}));
      }
    });
    controls.append(finishes);
    const fullArts = node('button', '', 'Full Arts vergleichen');
    fullArts.type = 'button';
    fullArts.addEventListener('click', () => {
      gallery.replaceChildren();
      for (const name of ['Regirock', 'Lunala', 'Camerupt-Mega', 'Nihilego']) {
        const p = pokemon.find((entry) => entry.name === name);
        if (p) gallery.append(slot(p, { fullArt: true }));
      }
    });
    controls.append(fullArts);
    updateType();
    box.append(header, intro, controls, gallery);
    box.addEventListener('close', () => box.remove(), { once: true });
    return box;
  }
  return { create, createEnergy, preview, elements, fullArtBackground, rarity };
})();
