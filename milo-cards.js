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
  // BEGIN GENERATED ENERGY SYMBOLS
  const energySymbols = {"Fire":[24,34,"M9 0h4v1h-4zM10 1h4v1h-4zM10 2h5v1h-5zM10 3h5v1h-5zM10 4h6v1h-6zM10 5h6v1h-6zM9 6h7v1h-7zM9 7h6v1h-6zM8 8h7v1h-7zM7 9h8v1h-8zM6 10h8v1h-8zM5 11h9v1h-9zM17 11h2v1h-2zM4 12h10v1h-10zM16 12h3v1h-3zM3 13h10v1h-10zM16 13h3v1h-3zM3 14h4v1h-4zM8 14h6v1h-6zM16 14h3v1h-3zM2 15h4v1h-4zM8 15h6v1h-6zM16 15h4v1h-4zM1 16h4v1h-4zM8 16h6v1h-6zM16 16h5v1h-5zM1 17h4v1h-4zM8 17h14v1h-14zM0 18h4v1h-4zM9 18h13v1h-13zM0 19h4v1h-4zM9 19h14v1h-14zM0 20h3v1h-3zM10 20h14v1h-14zM0 21h3v1h-3zM11 21h13v1h-13zM0 22h3v1h-3zM12 22h12v1h-12zM0 23h3v1h-3zM13 23h11v1h-11zM0 24h2v1h-2zM14 24h10v1h-10zM0 25h2v1h-2zM15 25h9v1h-9zM0 26h3v1h-3zM16 26h8v1h-8zM1 27h2v1h-2zM16 27h8v1h-8zM1 28h2v1h-2zM17 28h6v1h-6zM2 29h1v1h-1zM17 29h6v1h-6zM3 30h1v1h-1zM17 30h5v1h-5zM16 31h5v1h-5zM15 32h4v1h-4zM14 33h3v1h-3z"],"Electric":[22,33,"M9 0h4v1h-4zM9 1h5v1h-5zM8 2h8v1h-8zM7 3h11v1h-11zM7 4h12v1h-12zM6 5h15v1h-15zM5 6h17v1h-17zM5 7h16v1h-16zM4 8h16v1h-16zM4 9h15v1h-15zM3 10h15v1h-15zM2 11h15v1h-15zM2 12h14v1h-14zM1 13h14v1h-14zM1 14h14v1h-14zM0 15h14v1h-14zM1 16h14v1h-14zM2 17h14v1h-14zM3 18h14v1h-14zM4 19h14v1h-14zM6 20h13v1h-13zM7 21h13v1h-13zM9 22h11v1h-11zM10 23h9v1h-9zM10 24h8v1h-8zM10 25h5v1h-5zM10 26h5v1h-5zM9 27h5v1h-5zM9 28h4v1h-4zM9 29h3v1h-3zM8 30h3v1h-3zM8 31h2v1h-2zM8 32h1v1h-1z"],"Fighting":[30,32,"M0 0h5v1h-5zM9 0h4v1h-4zM17 0h4v1h-4zM25 0h5v1h-5zM0 1h5v1h-5zM9 1h4v1h-4zM17 1h4v1h-4zM25 1h5v1h-5zM0 2h5v1h-5zM9 2h4v1h-4zM17 2h4v1h-4zM25 2h5v1h-5zM0 3h5v1h-5zM9 3h4v1h-4zM17 3h4v1h-4zM25 3h5v1h-5zM0 4h5v1h-5zM9 4h4v1h-4zM17 4h4v1h-4zM25 4h5v1h-5zM0 5h5v1h-5zM9 5h4v1h-4zM17 5h4v1h-4zM25 5h5v1h-5zM0 6h5v1h-5zM9 6h4v1h-4zM17 6h4v1h-4zM25 6h5v1h-5zM0 7h5v1h-5zM9 7h4v1h-4zM17 7h4v1h-4zM25 7h5v1h-5zM0 8h5v1h-5zM9 8h4v1h-4zM17 8h4v1h-4zM25 8h5v1h-5zM0 9h5v1h-5zM9 9h4v1h-4zM17 9h4v1h-4zM25 9h5v1h-5zM0 10h5v1h-5zM9 10h4v1h-4zM0 11h5v1h-5zM9 11h4v1h-4zM0 12h5v1h-5zM9 12h4v1h-4zM0 13h5v1h-5zM9 13h4v1h-4zM17 13h13v1h-13zM0 14h5v1h-5zM9 14h4v1h-4zM17 14h13v1h-13zM17 15h13v1h-13zM17 16h13v1h-13zM17 17h13v1h-13zM17 18h13v1h-13zM0 20h13v1h-13zM0 21h13v1h-13zM0 22h30v1h-30zM0 23h30v1h-30zM0 24h30v1h-30zM0 25h29v1h-29zM1 26h28v1h-28zM1 27h26v1h-26zM3 28h21v1h-21zM4 29h17v1h-17zM6 30h12v1h-12zM8 31h6v1h-6z"],"Dark":[32,23,"M2 0h2v1h-2zM28 0h2v1h-2zM2 1h4v1h-4zM26 1h4v1h-4zM1 2h7v1h-7zM24 2h7v1h-7zM1 3h8v1h-8zM23 3h8v1h-8zM0 4h9v1h-9zM14 4h4v1h-4zM23 4h9v1h-9zM0 5h9v1h-9zM14 5h4v1h-4zM23 5h9v1h-9zM0 6h8v1h-8zM14 6h4v1h-4zM24 6h8v1h-8zM0 7h8v1h-8zM14 7h4v1h-4zM24 7h8v1h-8zM0 8h8v1h-8zM14 8h4v1h-4zM24 8h8v1h-8zM0 9h8v1h-8zM14 9h4v1h-4zM24 9h8v1h-8zM0 10h9v1h-9zM14 10h4v1h-4zM23 10h9v1h-9zM0 11h9v1h-9zM14 11h4v1h-4zM23 11h9v1h-9zM1 12h8v1h-8zM15 12h2v1h-2zM23 12h8v1h-8zM1 13h9v1h-9zM22 13h9v1h-9zM2 14h8v1h-8zM22 14h8v1h-8zM2 15h9v1h-9zM21 15h9v1h-9zM3 16h8v1h-8zM21 16h8v1h-8zM4 17h8v1h-8zM20 17h8v1h-8zM5 18h9v1h-9zM18 18h9v1h-9zM6 19h20v1h-20zM8 20h16v1h-16zM10 21h12v1h-12zM13 22h6v1h-6z"],"Psychic":[30,34,"M14 0h2v1h-2zM12 1h6v1h-6zM11 2h8v1h-8zM11 3h8v1h-8zM10 4h10v1h-10zM9 5h5v1h-5zM16 5h5v1h-5zM6 6h8v1h-8zM16 6h8v1h-8zM2 7h11v1h-11zM17 7h11v1h-11zM1 8h11v1h-11zM18 8h11v1h-11zM0 9h10v1h-10zM20 9h10v1h-10zM0 10h6v1h-6zM24 10h6v1h-6zM0 11h5v1h-5zM25 11h5v1h-5zM1 12h4v1h-4zM25 12h4v1h-4zM1 13h4v1h-4zM25 13h4v1h-4zM1 14h5v1h-5zM24 14h5v1h-5zM2 15h4v1h-4zM24 15h4v1h-4zM2 16h4v1h-4zM24 16h4v1h-4zM2 17h4v1h-4zM24 17h4v1h-4zM2 18h4v1h-4zM24 18h4v1h-4zM1 19h5v1h-5zM24 19h5v1h-5zM1 20h4v1h-4zM25 20h4v1h-4zM1 21h4v1h-4zM25 21h4v1h-4zM0 22h5v1h-5zM25 22h5v1h-5zM0 23h6v1h-6zM24 23h6v1h-6zM0 24h10v1h-10zM20 24h10v1h-10zM1 25h11v1h-11zM18 25h11v1h-11zM2 26h11v1h-11zM17 26h11v1h-11zM6 27h8v1h-8zM16 27h8v1h-8zM9 28h5v1h-5zM16 28h5v1h-5zM10 29h10v1h-10zM11 30h8v1h-8zM11 31h8v1h-8zM12 32h6v1h-6zM14 33h2v1h-2z"],"Grass":[33,33,"M22 0h1v1h-1zM22 1h1v1h-1zM21 2h2v1h-2zM21 3h2v1h-2zM20 4h3v1h-3zM20 5h3v1h-3zM12 6h1v1h-1zM19 6h4v1h-4zM32 6h1v1h-1zM11 7h2v1h-2zM19 7h4v1h-4zM31 7h2v1h-2zM11 8h2v1h-2zM19 8h4v1h-4zM31 8h1v1h-1zM10 9h3v1h-3zM18 9h5v1h-5zM30 9h2v1h-2zM10 10h3v1h-3zM18 10h5v1h-5zM30 10h2v1h-2zM9 11h4v1h-4zM18 11h5v1h-5zM29 11h3v1h-3zM9 12h4v1h-4zM17 12h5v1h-5zM28 12h4v1h-4zM8 13h4v1h-4zM17 13h5v1h-5zM28 13h4v1h-4zM8 14h4v1h-4zM17 14h5v1h-5zM27 14h5v1h-5zM7 15h5v1h-5zM16 15h6v1h-6zM27 15h4v1h-4zM7 16h5v1h-5zM16 16h6v1h-6zM26 16h5v1h-5zM7 17h5v1h-5zM16 17h6v1h-6zM26 17h5v1h-5zM6 18h6v1h-6zM16 18h5v1h-5zM25 18h6v1h-6zM6 19h6v1h-6zM16 19h5v1h-5zM25 19h6v1h-6zM5 20h7v1h-7zM16 20h4v1h-4zM24 20h7v1h-7zM5 21h7v1h-7zM16 21h4v1h-4zM24 21h6v1h-6zM4 22h8v1h-8zM16 22h3v1h-3zM23 22h7v1h-7zM4 23h7v1h-7zM15 23h4v1h-4zM23 23h7v1h-7zM4 24h7v1h-7zM15 24h3v1h-3zM22 24h8v1h-8zM3 25h8v1h-8zM15 25h3v1h-3zM22 25h8v1h-8zM3 26h8v1h-8zM15 26h2v1h-2zM21 26h9v1h-9zM2 27h9v1h-9zM15 27h1v1h-1zM21 27h8v1h-8zM2 28h9v1h-9zM15 28h1v1h-1zM20 28h9v1h-9zM1 29h10v1h-10zM20 29h9v1h-9zM1 30h10v1h-10zM19 30h10v1h-10zM1 31h9v1h-9zM19 31h9v1h-9zM0 32h10v1h-10zM18 32h10v1h-10z"],"Normal":[34,34,"M5 0h3v1h-3zM26 0h3v1h-3zM3 1h7v1h-7zM11 1h12v1h-12zM24 1h7v1h-7zM2 2h30v1h-30zM2 3h30v1h-30zM1 4h32v1h-32zM1 5h12v1h-12zM21 5h12v1h-12zM1 6h10v1h-10zM23 6h10v1h-10zM1 7h8v1h-8zM25 7h8v1h-8zM2 8h6v1h-6zM26 8h7v1h-7zM2 9h5v1h-5zM27 9h5v1h-5zM2 10h5v1h-5zM27 10h5v1h-5zM1 11h5v1h-5zM28 11h5v1h-5zM1 12h5v1h-5zM28 12h5v1h-5zM1 13h4v1h-4zM29 13h4v1h-4zM0 14h5v1h-5zM29 14h5v1h-5zM0 15h5v1h-5zM29 15h5v1h-5zM0 16h5v1h-5zM29 16h5v1h-5zM0 17h5v1h-5zM29 17h5v1h-5zM0 18h5v1h-5zM29 18h5v1h-5zM0 19h5v1h-5zM29 19h5v1h-5zM1 20h4v1h-4zM29 20h4v1h-4zM1 21h4v1h-4zM29 21h4v1h-4zM1 22h5v1h-5zM28 22h5v1h-5zM2 23h4v1h-4zM28 23h4v1h-4zM2 24h5v1h-5zM27 24h5v1h-5zM3 25h5v1h-5zM26 25h5v1h-5zM3 26h6v1h-6zM25 26h6v1h-6zM4 27h6v1h-6zM24 27h6v1h-6zM5 28h7v1h-7zM22 28h7v1h-7zM6 29h22v1h-22zM7 30h20v1h-20zM9 31h16v1h-16zM11 32h12v1h-12zM14 33h6v1h-6z"],"Dragon":[32,33,"M12 0h1v1h-1zM19 0h1v1h-1zM12 1h1v1h-1zM19 1h1v1h-1zM11 2h2v1h-2zM19 2h2v1h-2zM11 3h2v1h-2zM19 3h2v1h-2zM11 4h3v1h-3zM18 4h3v1h-3zM11 5h3v1h-3zM18 5h3v1h-3zM10 6h4v1h-4zM18 6h4v1h-4zM10 7h12v1h-12zM10 8h12v1h-12zM9 9h14v1h-14zM9 10h14v1h-14zM1 11h1v1h-1zM8 11h16v1h-16zM30 11h1v1h-1zM1 12h1v1h-1zM8 12h16v1h-16zM30 12h1v1h-1zM1 13h1v1h-1zM8 13h16v1h-16zM30 13h1v1h-1zM0 14h3v1h-3zM8 14h1v1h-1zM10 14h12v1h-12zM23 14h1v1h-1zM29 14h3v1h-3zM0 15h3v1h-3zM8 15h1v1h-1zM10 15h12v1h-12zM23 15h1v1h-1zM29 15h3v1h-3zM0 16h4v1h-4zM8 16h1v1h-1zM11 16h10v1h-10zM23 16h1v1h-1zM28 16h4v1h-4zM0 17h5v1h-5zM8 17h1v1h-1zM11 17h10v1h-10zM23 17h1v1h-1zM27 17h5v1h-5zM0 18h5v1h-5zM8 18h1v1h-1zM12 18h8v1h-8zM23 18h1v1h-1zM27 18h5v1h-5zM0 19h6v1h-6zM8 19h1v1h-1zM13 19h6v1h-6zM23 19h1v1h-1zM26 19h6v1h-6zM1 20h5v1h-5zM9 20h1v1h-1zM13 20h6v1h-6zM22 20h1v1h-1zM26 20h5v1h-5zM1 21h5v1h-5zM9 21h2v1h-2zM14 21h4v1h-4zM21 21h2v1h-2zM26 21h5v1h-5zM1 22h6v1h-6zM10 22h12v1h-12zM25 22h6v1h-6zM2 23h4v1h-4zM11 23h10v1h-10zM26 23h4v1h-4zM2 24h3v1h-3zM12 24h8v1h-8zM27 24h3v1h-3zM3 25h2v1h-2zM12 25h8v1h-8zM27 25h2v1h-2zM12 26h8v1h-8zM12 27h8v1h-8zM12 28h8v1h-8zM12 29h8v1h-8zM13 30h6v1h-6zM13 31h6v1h-6zM15 32h2v1h-2z"],"Steel":[32,31,"M6 0h20v1h-20zM5 1h3v1h-3zM10 1h17v1h-17zM5 2h2v1h-2zM11 2h13v1h-13zM5 3h1v1h-1zM11 3h10v1h-10zM4 4h3v1h-3zM11 4h7v1h-7zM4 5h4v1h-4zM10 5h5v1h-5zM4 6h9v1h-9zM26 6h2v1h-2zM3 7h10v1h-10zM22 7h7v1h-7zM3 8h10v1h-10zM20 8h9v1h-9zM3 9h11v1h-11zM18 9h4v1h-4zM26 9h3v1h-3zM2 10h12v1h-12zM18 10h3v1h-3zM27 10h3v1h-3zM2 11h12v1h-12zM19 11h2v1h-2zM27 11h3v1h-3zM2 12h12v1h-12zM19 12h2v1h-2zM27 12h3v1h-3zM1 13h14v1h-14zM19 13h2v1h-2zM26 13h5v1h-5zM1 14h14v1h-14zM19 14h3v1h-3zM25 14h6v1h-6zM1 15h12v1h-12zM20 15h11v1h-11zM0 16h9v1h-9zM20 16h12v1h-12zM0 17h6v1h-6zM20 17h12v1h-12zM0 18h2v1h-2zM15 18h1v1h-1zM20 18h12v1h-12zM11 19h5v1h-5zM21 19h11v1h-11zM8 20h8v1h-8zM21 20h11v1h-11zM4 21h13v1h-13zM21 21h9v1h-9zM3 22h14v1h-14zM22 22h7v1h-7zM5 23h12v1h-12zM22 23h5v1h-5zM6 24h12v1h-12zM22 24h4v1h-4zM7 25h11v1h-11zM23 25h2v1h-2zM9 26h9v1h-9zM10 27h9v1h-9zM12 28h7v1h-7zM13 29h6v1h-6zM14 30h4v1h-4z"],"Water":[20,33,"M9 0h2v1h-2zM9 1h2v1h-2zM9 2h2v1h-2zM8 3h4v1h-4zM8 4h4v1h-4zM8 5h4v1h-4zM8 6h4v1h-4zM7 7h6v1h-6zM7 8h6v1h-6zM6 9h8v1h-8zM6 10h8v1h-8zM5 11h10v1h-10zM5 12h10v1h-10zM4 13h12v1h-12zM3 14h14v1h-14zM3 15h14v1h-14zM2 16h16v1h-16zM2 17h16v1h-16zM1 18h18v1h-18zM1 19h18v1h-18zM1 20h18v1h-18zM0 21h20v1h-20zM0 22h20v1h-20zM0 23h20v1h-20zM0 24h2v1h-2zM4 24h12v1h-12zM18 24h2v1h-2zM1 25h1v1h-1zM10 25h3v1h-3zM18 25h1v1h-1zM1 26h1v1h-1zM18 26h1v1h-1zM1 27h2v1h-2zM17 27h2v1h-2zM2 28h2v1h-2zM16 28h2v1h-2zM3 29h3v1h-3zM14 29h3v1h-3zM4 30h4v1h-4zM12 30h4v1h-4zM5 31h10v1h-10zM9 32h2v1h-2z"]};
  // END GENERATED ENERGY SYMBOLS
  let energyFoilSerial = 0;
  function createEnergyPattern(element) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = (tag, attrs = {}) => {
      const el = document.createElementNS(ns, tag);
      for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, String(value));
      return el;
    };
    const id = `energy-foil-${++energyFoilSerial}`;
    const [width, height, path] = energySymbols[element];
    const scale = 24 / Math.max(width, height);
    const overlay = svg('svg', { class: 'milo-energy-foil-pattern is-ready', width: '100%', height: '100%', 'aria-hidden': 'true', focusable: 'false', 'data-renderer': 'svg' });
    const defs = svg('defs');
    const pattern = svg('pattern', { id: `${id}-grid`, patternUnits: 'userSpaceOnUse', width: 32, height: 32 });
    pattern.append(svg('path', { d: path, fill: 'white', transform: `translate(${(32-width*scale)/2} ${(32-height*scale)/2}) scale(${scale})` }));
    const mask = svg('mask', { id: `${id}-mask`, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: '100%', height: '100%', 'mask-type': 'alpha' });
    mask.append(svg('rect', { width: '100%', height: '100%', fill: `url(#${id}-grid)` }));
    const gradient = svg('linearGradient', { id: `${id}-shine`, gradientUnits: 'userSpaceOnUse', x1: -150, y1: 0, x2: 450, y2: 350, spreadMethod: 'reflect' });
    ['#fff6bd', '#ffc94f', '#ff78d4', '#fafaff', '#61dfff', '#b2ffb7', '#fff6bd'].forEach((color, i) => gradient.append(svg('stop', { offset: `${i*100/6}%`, 'stop-color': color })));
    defs.append(pattern, mask, gradient);
    overlay.append(defs, svg('rect', { width: '100%', height: '100%', fill: `url(#${id}-shine)`, mask: `url(#${id}-mask)` }));
    return { overlay, gradient };
  }
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

  function brand(stamp = 'MILO-NÄR') {
    const label = node('span', 'milo-card-brand');
    label.append(node('span', '', 'SCHWALBOGA'), node('span', '', stamp));
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

  function createEnergy(type = 'Normal', options = {}) {
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
    footer.append(brand(options.stamp));
    card.append(header, node('p', 'milo-energy-caption', 'BASIS-ENERGIE'), emblem,
      node('p', 'milo-energy-note', 'Zusatzkarte · zählt nicht zur Teamwertung'), footer);
    return card;
  }

  function create(pokemon, options = {}) {
    const moves = window.POKEDEX_META.movesById;
    const energyFoil = Boolean(options.energyFoil);
    const variant = energyFoil ? 'normal' : options.variant ?? (mega(pokemon) ? 'mega' : 'normal');
    if (!['normal', 'mega', 'tera', 'z'].includes(variant)) throw new Error('Unbekannte Kartenvariante.');
    const upgradeType = options.type ?? pokemon.types[0];
    if (!elements[upgradeType]) throw new Error('Unbekannter Kartentyp.');
    const nativeType = options.setId && pokemon.types.includes(options.nativeType ?? options.type)
      ? options.nativeType ?? options.type : pokemon.types[0];
    const type = variant === 'tera' ? upgradeType : nativeType;
    const element = elements[type] ?? 'Normal';
    const speciesTitle = pokemon.names?.de ?? pokemon.name;
    const title = options.trainer && !energyFoil ? `${options.trainer}${/[sxzß]$/i.test(options.trainer) ? '’' : 's'} ${speciesTitle}` : speciesTitle;
    const background = fullArtBackground(pokemon);
    const fullArt = Boolean(!energyFoil && background && (options.fullArt === true || (options.fullArt === undefined && Math.random() < .1)));
    const restricted = Array.isArray(options.movePool) && options.movePool.length > 0;
    const fallback = Boolean(options.setId) && !restricted;
    const setZ = variant === 'z' && Boolean(options.setId);
    const candidates = (restricted ? options.movePool : pokemon.moveIds).map((id) => moves[id])
      .filter((move) => move && (restricted || (move.category !== 'Status' && move.basePower > 1)) && !/^(?:g?max)/.test(move.id));
    const pickFallback = (pool) => {
      if (!pool.length) return undefined;
      const weight = (m) => pokemon.learnset?.[m.id]?.some((source) => /L(?:0|100)$/.test(source)) ? 8 : 1;
      let roll = Math.random() * pool.reduce((sum, m) => sum + weight(m), 0);
      return pool.find((m) => (roll -= weight(m)) < 0) ?? pool.at(-1);
    };
    let move;
    if (variant === 'z') {
      move = candidates.find((move) => move.id === options.zBaseMoveId)
        ?? (fallback ? pickFallback(candidates.filter((m) => pokemon.types.includes(m.type))) : undefined)
        ?? candidates.find((move) => move.type === upgradeType && move.category !== 'Status')
        ?? candidates.find((move) => move.type === upgradeType) ?? candidates[0];
      if (setZ && !move) move = { category: pokemon.baseStats.atk > pokemon.baseStats.spa ? 'Physical' : 'Special' };
    } else if (variant === 'tera') {
      move = fallback ? pickFallback(candidates.filter((m) => m.type === upgradeType)) : candidates.find((move) => move.type === upgradeType);
      if (!move && !restricted) {
        move = { ...moves.terablast, id: 'terablast', name: 'Tera Blast', names: { de: 'Tera-Ausbruch' },
          type: upgradeType, basePower: 80, accuracy: 100,
          category: pokemon.baseStats.atk > pokemon.baseStats.spa ? 'Physical' : 'Special' };
      }
    } else {
      const preferred = pokemon.types.length > 1 && Math.random() < .5 ? pokemon.types[1] : pokemon.types[0];
      move = (fallback ? pickFallback(candidates.filter((m) => pokemon.types.includes(m.type))) : undefined)
        ?? candidates.find((move) => move.type === preferred)
        ?? candidates.find((move) => pokemon.types.includes(move.type));
    }
    if (restricted && !move) move = candidates[0];
    const abilitySlot = options.setId ? options.trainer && !energyFoil ? 'H' : type === pokemon.types[1] ? '1' : '0' : '0';
    const ability = pokemon.abilityDetails.find((entry) => entry.slot === abilitySlot)
      ?? pokemon.abilityDetails.find((entry) => entry.slot === '0') ?? pokemon.abilityDetails[0];
    const card = node('article', `milo-card is-${variant}`);
    if (energyFoil) {
      card.classList.add('is-energy-foil');
      card.dataset.energyFoil = 'true';
    }
    if (setZ) {
      card.dataset.zPower = String(Number.isInteger(options.zPower) && options.zPower >= 200 && options.zPower <= 250 && options.zPower % 5 === 0
        ? options.zPower : 200 + Math.floor(Math.random() * 11) * 5);
      card.dataset.zCategory = options.zCategory ?? (move?.category === 'Status'
        ? pokemon.baseStats.atk > pokemon.baseStats.spa ? 'Physical' : 'Special' : move?.category);
      card.dataset.zBaseMove = move?.id ?? '';
    }
    if (fullArt) {
      card.classList.add('is-full-art');
      card.dataset.fullArt = background.file;
      card.style.setProperty('--fullart-image', `url("assets/tcg/${background.file}.png")`);
      card.style.setProperty('--fullart-size', `${512 / background.height * 100}%`);
      card.style.setProperty('--fullart-position', background.position);
    }
    const base = window.POKEDEX_ENTRIES.find((p) => p.name === pokemon.baseSpecies);
    const tags = [...(pokemon.tags ?? []), ...(base?.tags ?? [])];
    const finish = energyFoil ? null : tags.includes('Ultra Beast') ? 'galaxy'
      : tags.includes('Paradox') ? pokemon.name.startsWith('Iron ') ? 'binary' : 'shards'
      : tags.some((tag) => /Legendary|Mythical/.test(tag)) ? 'holo' : null;
    if (finish) card.dataset.finish = finish;
    card.style.setProperty('--card-color', colors[element]);
    card.dataset.element = element;
    card.dataset.variant = variant;
    card.setAttribute('aria-label', `${title} · ${energyFoil ? 'Energy Foil' : variant === 'normal' ? 'Standard' : variant.toUpperCase()} · ${typeNames[element]}`);

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
    let usedBaseSprite = false;
    const spriteError = () => {
      const baseSprite = pokemon.baseSpecies && window.POKEDEX_ENTRIES.find((p) => p.name === pokemon.baseSpecies)?.sprite;
      if (!usedBaseSprite && baseSprite && baseSprite !== pokemon.sprite) {
        usedBaseSprite = true;
        sprite.src = baseSprite;
        return;
      }
      sprite.hidden = true;
      art.append(node('span', 'milo-card-art-fallback', title));
      sprite.removeEventListener('error', spriteError);
    };
    sprite.addEventListener('error', spriteError);
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
    if (options.trainerSprite && !energyFoil) {
      const watermark = node('img', 'milo-card-trainer-watermark');
      watermark.src = options.trainerSprite;
      watermark.alt = '';
      body.append(watermark);
      card.classList.add('is-trainer-card');
    }
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
    const eligible = restricted ? candidates : variant === 'tera'
      ? [...candidates.filter((m) => m.type === upgradeType && m.id !== 'terablast'), teraBlast]
      : candidates.filter((m) => pokemon.types.includes(m.type));
    if (variant !== 'z' && options.attackIds?.[0]) {
      move = eligible.find((m) => m.id === options.attackIds[0]) ?? move;
    }
    const attackRows = move ? [{ move, z: variant === 'z' && (setZ || !restricted || candidates.some((m) => m.id === zMoves[upgradeType])) }] : [];
    const wantsSecond = options.attackIds ? options.attackIds.length > 1 : (options.secondAttack ?? Math.random() < .5);
    if (wantsSecond) {
      const firstName = move?.names?.de ?? move?.name;
      const alternatives = eligible.filter((m) => attackRows[0]?.z
        ? m.id !== zMoves[upgradeType] : m.id !== move?.id && (m.names?.de ?? m.name) !== firstName);
      const second = options.attackIds?.[1] ? alternatives.find((m) => m.id === options.attackIds[1])
        : fallback ? pickFallback(alternatives) : alternatives[Math.floor(Math.random() * alternatives.length)];
      if (second) attackRows.push({ move: second, z: false });
    }
    card.dataset.attackCount = String(attackRows.length);
    const attacks = node('div', 'milo-card-attacks');
    for (const row of attackRows) {
      const m = row.move;
      const attack = node('section', 'milo-card-attack' + (row.z || (variant === 'z' && row === attackRows[0]) ? ' milo-card-z-attack' : ''));
      attack.dataset.move = row.z ? zMoves[upgradeType] : m?.id ?? '';
      attack.dataset.type = row.z ? upgradeType : m?.type ?? '';
      if (row.z && setZ) attack.dataset.category = card.dataset.zCategory;
      const heading = node('div', 'milo-card-attack-heading');
      const costs = node('div', 'milo-card-energy-cost');
      const attackType = row.z ? upgradeType : m?.type ?? type;
      const energyCount = row.z ? 3 : Math.min(3, Math.max(1, Math.ceil((m?.basePower ?? 40) / 50)));
      for (let index = 0; index < energyCount; index += 1) costs.append(energy(attackType));
      const zMove = moves[zMoves[upgradeType]];
      heading.append(costs, node('strong', 'milo-card-move-title', row.z ? zMove?.names?.de ?? zMove?.name ?? 'Z-Attacke' : m?.names?.de ?? m?.name ?? '—'));
      heading.append(node('strong', 'milo-card-damage', row.z ? setZ ? card.dataset.zPower : 'Z' : m?.category === 'Status' ? '—' : m ? String(m.basePower) : '—'));
      attack.append(heading, node('p', '', row.z ? (setZ ? `${card.dataset.zCategory === 'Physical' ? 'Physisch' : 'Speziell'} · ` : '') + 'Entfessle die Kraft des Z-Kristalls. Einmal pro Kampf.'
        : m ? (m.category === 'Status' ? 'Status' : m.category === 'Physical' ? 'Physisch' : 'Speziell') + ' · ' + typeNames[m.type] + ' · '
          + (m.accuracy === null ? 'Trifft immer' : 'Genauigkeit ' + m.accuracy + '%') : 'Keine offensive STAB-Attacke im Datensatz.'));
      attacks.append(attack);
    }
    if (!attackRows.length) attacks.append(node('p', 'milo-card-no-move', 'Keine Attacke in den Replays eingesetzt.'));
    abilityBlock.querySelector('p').title = abilityBlock.querySelector('p').textContent;
    body.append(attacks);
    const footer = node('footer', 'milo-card-footer');
    const [rarityId, rarityLabel, raritySymbol] = options.rarity ?? rarity(pokemon);
    const chaseRare = Boolean(window.isBoosterChaseRare?.({ ...options, pokemonName: pokemon.name }));
    const rarityBadge = node('span', `milo-card-rarity rarity-${rarityId}${chaseRare ? ' rarity-chase' : ''}`);
    const modifier = variant === 'tera' ? 'T' : variant === 'z' ? 'Z' : '';
    rarityBadge.title = `${rarityLabel}${modifier ? ` · ${variant === 'tera' ? 'Tera' : 'Z'}` : ''}`;
    rarityBadge.setAttribute('aria-label', rarityBadge.title);
    rarityBadge.append(node('span', 'milo-card-rarity-symbol', chaseRare ? '★★' : raritySymbol));
    if (modifier) rarityBadge.append(node('span', 'milo-card-rarity-modifier', modifier));
    if (fullArt) {
      const brush = node('span', 'milo-card-fullart-mark', '🖌️');
      brush.setAttribute('aria-label', 'Full Art');
      rarityBadge.append(brush);
      rarityBadge.title += ' · Full Art';
      rarityBadge.setAttribute('aria-label', rarityBadge.title);
    }
    if (energyFoil) {
      rarityBadge.append(node('span', 'milo-card-rarity-modifier', 'E'));
      rarityBadge.title += ' · Energy Foil';
      rarityBadge.setAttribute('aria-label', rarityBadge.title);
    }
    const { strip, stats } = footerStats(pokemon, variant === 'tera' ? [upgradeType] : pokemon.types, options.footerStats);
    card.dataset.weakness = stats.weakness ?? '';
    card.dataset.resistance = stats.resistance ?? '';
    card.dataset.retreat = String(stats.retreat);
    footer.append(brand(options.stamp), strip, rarityBadge);
    const sheen = node('div', 'milo-card-foil');
    sheen.setAttribute('aria-hidden', 'true');
    card.append(header, art, ...(fullArt ? [] : [caption]), body, footer, sheen);
    let energyGradient = null;
    if (energyFoil) {
      const pattern = createEnergyPattern(element);
      energyGradient = pattern.gradient;
      card.append(pattern.overlay);
    }
    if (variant === 'tera' && !fullArt) {
      const backgroundCrystal = window.TeraSpriteEffects.create(null,
        window.TeraSpriteEffects.palettes[upgradeType], { animate: false, width: 160, height: 224 });
      backgroundCrystal.classList.add('milo-card-background-crystal');
      card.prepend(backgroundCrystal);
    }
    if (energyFoil || (['galaxy', 'binary', 'shards'].includes(finish) && variant !== 'z')) {
      const resetLight = () => {
        card.style.setProperty('--foil-x', '50%');
        card.style.setProperty('--foil-y', '50%');
        card.style.setProperty('--foil-dx', '0px');
        card.style.setProperty('--foil-dy', '0px');
        energyGradient?.removeAttribute('gradientTransform');
      };
      card.addEventListener('pointermove', (event) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const bounds = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
        energyGradient?.setAttribute('gradientTransform', `translate(${(x-.5)*180} ${(y-.5)*140}) rotate(${(x-.5)*30} 150 210)`);
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
  function snapshot(card) {
    return { fullArt: card.classList.contains('is-full-art'),
      attackIds: [...card.querySelectorAll('.milo-card-attack')].map((attack) => attack.dataset.move),
      footerStats: { weakness: card.dataset.weakness || null, resistance: card.dataset.resistance || null, retreat: Number(card.dataset.retreat) },
      ...(card.dataset.zPower ? { zPower: Number(card.dataset.zPower), zCategory: card.dataset.zCategory, zBaseMoveId: card.dataset.zBaseMove } : {}) };
  }
  return { create, createEnergy, preview, elements, fullArtBackground, rarity, snapshot };
})();
