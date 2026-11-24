// A packaging renderer shared by future sets, riddles and minigames.
window.BoosterPackaging = (() => {
  const colors = { Normal: '#c5c0a7', Fire: '#e25324', Water: '#2679c5', Electric: '#f2cd2a',
    Grass: '#4f9d49', Ice: '#79d9dc', Fighting: '#a84832', Poison: '#9354b0', Ground: '#bd9147',
    Flying: '#7d9ed7', Psychic: '#ce5487', Bug: '#849b32', Rock: '#9e884d', Ghost: '#534678',
    Dragon: '#5e4abd', Dark: '#34394e', Steel: '#8baab3', Fairy: '#df9fce' };
  function create({ name, pokemonName, design, series = 'NATIONAL DEX · DRAFT COLLECTION', edition = 'JUNI 2026 · PREMIER EDITION', contents = '5 POKÉMON + 1 ENERGIE' }) {
    const p = window.POKEDEX_ENTRIES.find((p) => p.name === pokemonName);
    if (!p) throw new Error(`Unbekanntes Verpackungsmotiv: ${pokemonName}`);
    const node = (tag, className, text) => {
      const el = document.createElement(tag);
      el.className = className;
      if (text) el.textContent = text;
      return el;
    };
    const pack = node('div', 'milo-booster-pack generated-booster');
    pack.setAttribute('role', 'img');
    pack.setAttribute('aria-label', `${name} · ${p.names?.de ?? p.name}`);
    pack.style.setProperty('--pack-primary', colors[p.types[0]]);
    pack.style.setProperty('--pack-secondary', colors[p.types[1] ?? p.types[0]]);
    const wrapper = node('div', 'milo-booster-wrapper generated-booster-wrapper');
    wrapper.append(node('span', 'generated-booster-brand', 'SCHWALBOGA'), node('span', 'generated-booster-series', series));
    const sprite = node('img', 'generated-booster-sprite');
    sprite.src = p.sprite;
    sprite.alt = '';
    wrapper.append(sprite, node('strong', 'generated-booster-name', name), node('span', 'generated-booster-edition', edition), node('span', 'generated-booster-count', contents));
    pack.append(wrapper, node('div', 'milo-booster-tear generated-booster-tear'));
    if (design === 'magma-aqua') {
      pack.classList.add('magma-aqua-pack');
      pack.style.setProperty('--pack-primary', '#c63720');
      pack.style.setProperty('--pack-secondary', '#1362af');
      sprite.remove();
      for (const [name, team] of [['Groudon', 'magma'], ['Kyogre', 'aqua']]) {
        const image = node('img', `generated-booster-sprite faction-${team}`);
        image.src = window.POKEDEX_ENTRIES.find((p) => p.name === name).sprite;
        image.alt = '';
        wrapper.append(image);
      }
      wrapper.querySelector('.generated-booster-series').textContent = 'LAND GEGEN MEER';
      wrapper.querySelector('.generated-booster-edition').textContent = 'BATTLE EDITION';
    }
    return pack;
  }
  return { create };
})();
