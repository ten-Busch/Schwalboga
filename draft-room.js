const draftStorageKey = 'schwalboga-draft-room-state-v1';
const draftUndoKey = 'schwalboga-draft-room-undo-v1';
const draftChannelName = 'schwalboga-draft-room';
const draftBudgetByFormat = {
  normal: 90,
  uber: 115,
  'low-power': 75,
};
const draftMaxPokemonCostByFormat = {
  normal: 20,
  uber: Infinity,
  'low-power': 13,
};
const draftNudelsternThresholdByFormat = {
  normal: 85,
  uber: 110,
  'low-power': 70,
};
const draftTypeCosts = {
  Water: { tera: 3, z: 3 },
  Dragon: { tera: 3, z: 3 },
  Steel: { tera: 3, z: 2 },
  Fairy: { tera: 3, z: 2 },
  Flying: { tera: 2, z: 3 },
  Fighting: { tera: 2, z: 3 },
  Rock: { tera: 2, z: 3 },
  Fire: { tera: 2, z: 2 },
  Grass: { tera: 2, z: 2 },
  Ground: { tera: 2, z: 2 },
  Ice: { tera: 2, z: 2 },
  Ghost: { tera: 2, z: 2 },
  Dark: { tera: 2, z: 2 },
  Poison: { tera: 2, z: 1 },
  Normal: { tera: 1, z: 2 },
  Electric: { tera: 2, z: 1 },
  Psychic: { tera: 1, z: 1 },
  Bug: { tera: 1, z: 1 },
  Stellar: { tera: 3, z: null },
};
const draftBattleTypes = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground',
  'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy', 'Stellar',
];
const draftStatLabels = {
  hp: 'KP',
  atk: 'Angriff',
  def: 'Verteidigung',
  spa: 'Spez. Angriff',
  spd: 'Spez. Vert',
  spe: 'Initiative',
};
const draftTypeIcons = {
  Normal: 'Type Icons/Normal_icon_HOME3.png',
  Fire: 'Type Icons/Fire_icon_HOME3.png',
  Water: 'Type Icons/Water_icon_HOME3.png',
  Electric: 'Type Icons/Electric_icon_HOME3.png',
  Grass: 'Type Icons/Grass_icon_HOME3.png',
  Ice: 'Type Icons/Ice_icon_HOME3.png',
  Fighting: 'Type Icons/Fighting_icon_HOME3.png',
  Poison: 'Type Icons/Poison_icon_HOME3.png',
  Ground: 'Type Icons/Ground_icon_HOME3.png',
  Flying: 'Type Icons/Flying_icon_HOME3.png',
  Psychic: 'Type Icons/Psychic_icon_HOME3.png',
  Bug: 'Type Icons/Bug_icon_HOME3.png',
  Rock: 'Type Icons/Rock_icon_HOME3.png',
  Ghost: 'Type Icons/Ghost_icon_HOME3.png',
  Dragon: 'Type Icons/Dragon_icon_HOME3.png',
  Dark: 'Type Icons/Dark_icon_HOME3.png',
  Steel: 'Type Icons/Steel_icon_HOME3.png',
  Fairy: 'Type Icons/Fairy_icon_HOME3.png',
  Stellar: 'Type Icons/Stellar_icon_SV.png',
};
const draftTypeColors = {
  Normal: '#9fa19f',
  Fire: '#e62829',
  Water: '#2980ef',
  Electric: '#fac000',
  Grass: '#3fa129',
  Ice: '#3fd8ff',
  Fighting: '#ff8000',
  Poison: '#9141cb',
  Ground: '#915121',
  Flying: '#81b9ef',
  Psychic: '#ef4179',
  Bug: '#91a119',
  Rock: '#afa981',
  Ghost: '#704170',
  Dragon: '#5060e1',
  Dark: '#624d4e',
  Steel: '#60a1b8',
  Fairy: '#ef70ef',
  Stellar: '#35ace7',
};
const draftTrainerColors = ['#47c9ff', '#ff7d92', '#9be45e', '#ffc85a', '#c993ff', '#55dbc0', '#ff9b5c', '#79a6ff'];
const draftIllegalAbilityNames = new Set(['Sand Veil', 'Snow Cloak', 'Static']);
const draftTypeDefenseChart = {
  Normal: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 2, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 0, Dragon: 1, Dark: 1, Steel: 1, Fairy: 1 },
  Fire: { Normal: 1, Fire: 0.5, Water: 2, Electric: 1, Grass: 0.5, Ice: 0.5, Fighting: 1, Poison: 1, Ground: 2, Flying: 1, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 0.5 },
  Water: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 2, Grass: 2, Ice: 0.5, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 },
  Electric: { Normal: 1, Fire: 1, Water: 1, Electric: 0.5, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 2, Flying: 0.5, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1 },
  Grass: { Normal: 1, Fire: 2, Water: 0.5, Electric: 0.5, Grass: 0.5, Ice: 2, Fighting: 1, Poison: 2, Ground: 0.5, Flying: 2, Psychic: 1, Bug: 2, Rock: 1, Ghost: 1, Dragon: 1, Dark: 1, Steel: 1, Fairy: 1 },
  Ice: { Normal: 1, Fire: 2, Water: 1, Electric: 1, Grass: 1, Ice: 0.5, Fighting: 2, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, Dragon: 1, Dark: 1, Steel: 2, Fairy: 1 },
  Fighting: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 2, Psychic: 2, Bug: 0.5, Rock: 0.5, Ghost: 1, Dragon: 1, Dark: 0.5, Steel: 1, Fairy: 2 },
  Poison: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 0.5, Ice: 1, Fighting: 0.5, Poison: 0.5, Ground: 2, Flying: 1, Psychic: 2, Bug: 0.5, Rock: 1, Ghost: 1, Dragon: 1, Dark: 1, Steel: 1, Fairy: 0.5 },
  Ground: { Normal: 1, Fire: 1, Water: 2, Electric: 0, Grass: 2, Ice: 2, Fighting: 1, Poison: 0.5, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 1, Dragon: 1, Dark: 1, Steel: 1, Fairy: 1 },
  Flying: { Normal: 1, Fire: 1, Water: 1, Electric: 2, Grass: 0.5, Ice: 2, Fighting: 0.5, Poison: 1, Ground: 0, Flying: 1, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, Dragon: 1, Dark: 1, Steel: 1, Fairy: 1 },
  Psychic: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 0.5, Poison: 1, Ground: 1, Flying: 1, Psychic: 0.5, Bug: 2, Rock: 1, Ghost: 2, Dragon: 1, Dark: 2, Steel: 1, Fairy: 1 },
  Bug: { Normal: 1, Fire: 2, Water: 1, Electric: 1, Grass: 0.5, Ice: 1, Fighting: 0.5, Poison: 1, Ground: 0.5, Flying: 2, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, Dragon: 1, Dark: 1, Steel: 1, Fairy: 1 },
  Rock: { Normal: 0.5, Fire: 0.5, Water: 2, Electric: 1, Grass: 2, Ice: 1, Fighting: 2, Poison: 0.5, Ground: 2, Flying: 0.5, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 1, Dark: 1, Steel: 2, Fairy: 1 },
  Ghost: { Normal: 0, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 0, Poison: 0.5, Ground: 1, Flying: 1, Psychic: 1, Bug: 0.5, Rock: 1, Ghost: 2, Dragon: 1, Dark: 2, Steel: 1, Fairy: 1 },
  Dragon: { Normal: 1, Fire: 0.5, Water: 0.5, Electric: 0.5, Grass: 0.5, Ice: 2, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Dark: 1, Steel: 1, Fairy: 2 },
  Dark: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 2, Poison: 1, Ground: 1, Flying: 1, Psychic: 0, Bug: 2, Rock: 1, Ghost: 0.5, Dragon: 1, Dark: 0.5, Steel: 1, Fairy: 2 },
  Steel: { Normal: 0.5, Fire: 2, Water: 1, Electric: 1, Grass: 0.5, Ice: 0.5, Fighting: 2, Poison: 0, Ground: 2, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 0.5, Ghost: 1, Dragon: 0.5, Dark: 1, Steel: 0.5, Fairy: 0.5 },
  Fairy: { Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 0.5, Poison: 2, Ground: 1, Flying: 1, Psychic: 1, Bug: 0.5, Rock: 1, Ghost: 1, Dragon: 0, Dark: 0.5, Steel: 2, Fairy: 1 },
};
const draftCustomCostOverrides = new Map([
  ['Carkol', 2],
  ['Eevee', 4],
  ['Munchlax', 3],
  ['Houndstone', 7],
  ['Magmortar', 7],
  ['Malamar', 7],
  ['Tauros', 8],
  ['Tauros-Paldea-Combat', 8],
  ['Zangoose', 8],
  ['Flamigo', 9],
  ['Medicham', 9],
  ['Mismagius', 9],
  ['Slowbro-Galar', 11],
  ['Tauros-Paldea-Blaze', 9],
  ['Tauros-Paldea-Aqua', 10],
  ['Lucario', 11],
  ['Sinistcha', 11],
  ['Blastoise', 12],
  ['Garganacl', 13],
  ['Heracross', 13],
  ['Staraptor', 13],
  ['Zoroark-Hisui', 13],
  ['Darmanitan', 14],
  ['Amoonguss', 14],
  ['Ferrothorn', 15],
  ['Thundurus', 15],
  ['Gliscor', 18],
]);
const draftLegendarySpecies = new Set([
  'Articuno', 'Zapdos', 'Moltres', 'Raikou', 'Entei', 'Suicune', 'Regirock', 'Regice', 'Registeel',
  'Latias', 'Latios', 'Uxie', 'Mesprit', 'Azelf', 'Heatran', 'Regigigas', 'Cobalion', 'Terrakion',
  'Virizion', 'Tornadus', 'Thundurus', 'Landorus', 'Type: Null', 'Silvally', 'Tapu Koko', 'Tapu Lele',
  'Tapu Bulu', 'Tapu Fini', 'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana',
  'Guzzlord', 'Poipole', 'Naganadel', 'Stakataka', 'Blacephalon', 'Kubfu', 'Urshifu', 'Regieleki',
  'Regidrago', 'Glastrier', 'Spectrier', 'Enamorus', 'Wo-Chien', 'Chien-Pao', 'Ting-Lu', 'Chi-Yu',
  'Okidogi', 'Munkidori', 'Fezandipiti', 'Ogerpon', 'Mewtwo', 'Lugia', 'Ho-Oh', 'Kyogre', 'Groudon',
  'Rayquaza', 'Dialga', 'Palkia', 'Giratina', 'Reshiram', 'Zekrom', 'Kyurem', 'Xerneas', 'Yveltal',
  'Zygarde', 'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Zacian', 'Zamazenta', 'Eternatus',
  'Calyrex', 'Koraidon', 'Miraidon', 'Terapagos',
]);
const draftMythicSpecies = new Set([
  'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus', 'Victini',
  'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Volcanion', 'Magearna', 'Marshadow', 'Zeraora',
  'Meltan', 'Melmetal', 'Zarude', 'Pecharunt',
]);
const draftUltraBeasts = new Set([
  'Nihilego', 'Buzzwole', 'Pheromosa', 'Xurkitree', 'Celesteela', 'Kartana', 'Guzzlord', 'Poipole',
  'Naganadel', 'Stakataka', 'Blacephalon',
]);
const draftWormholeNames = new Set([
  ...draftUltraBeasts,
  'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Necrozma-Ultra',
]);

const currentView = new URLSearchParams(window.location.search).get('view') === 'board' ? 'board' : 'control';
let renderedRevealId = null;
const channel = 'BroadcastChannel' in window ? new BroadcastChannel(draftChannelName) : null;
const nodes = {
  app: document.querySelector('#draft-app'),
  setupPanel: document.querySelector('#draft-setup-panel'),
  controlPanel: document.querySelector('#draft-control-panel'),
  swapPanel: document.querySelector('#draft-swap-panel'),
  board: document.querySelector('#draft-board'),
  trainerGrid: document.querySelector('#draft-trainer-grid'),
  format: document.querySelector('#draft-format'),
  randomizeOrder: document.querySelector('#draft-randomize-order'),
  adminMode: document.querySelector('#draft-admin-mode'),
  adminStars: document.querySelector('#draft-admin-stars'),
  resetButton: document.querySelector('#draft-reset-button'),
  resetControlButton: document.querySelector('#draft-reset-control-button'),
  dismissRevealButton: document.querySelector('#draft-dismiss-reveal-button'),
  randomizeButton: document.querySelector('#draft-randomize-button'),
  randomizerDisplay: document.querySelector('#draft-randomizer-display'),
  startButton: document.querySelector('#draft-start-button'),
  phaseLabel: document.querySelector('#draft-phase-label'),
  currentPlayer: document.querySelector('#draft-current-player'),
  currentSummary: document.querySelector('#draft-current-summary'),
  typePicks: document.querySelector('#draft-type-picks'),
  search: document.querySelector('#draft-pokemon-search'),
  filterType: document.querySelector('#draft-filter-type'),
  filterMaxCost: document.querySelector('#draft-filter-max-cost'),
  filterSpecial: document.querySelector('#draft-filter-special'),
  showIllegal: document.querySelector('#draft-show-illegal'),
  finishPlayer: document.querySelector('#draft-finish-player-button'),
  results: document.querySelector('#draft-pokemon-results'),
  pickLog: document.querySelector('#draft-pick-log'),
  undoHistory: document.querySelector('#draft-undo-history'),
  undoButton: document.querySelector('#draft-undo-button'),
  exportButton: document.querySelector('#draft-export-button'),
  boardOpenButton: document.querySelector('#draft-board-open-button'),
  swapPlayer: document.querySelector('#draft-swap-player'),
  swapOwn: document.querySelector('#draft-swap-own'),
  swapSearch: document.querySelector('#draft-swap-search'),
  swapResults: document.querySelector('#draft-swap-results'),
  swapDecline: document.querySelector('#draft-swap-decline-button'),
  decisionModal: document.querySelector('#draft-decision-modal'),
  decisionTitle: document.querySelector('#draft-decision-title'),
  decisionCopy: document.querySelector('#draft-decision-copy'),
  decisionOptions: document.querySelector('#draft-decision-options'),
};

let allPokemon = [];
let pokemonByName = new Map();
let draftState = loadDraftState();
let randomizerTimer = null;
let draftDefenseProfileTick = 0;

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '');
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function getPlayerId(player) {
  return normalizeText(player?.name ?? '');
}

function getSpielerEntries() {
  return Array.isArray(window.SPIELER) ? window.SPIELER : [];
}

function getPokemonDisplayName(pokemonOrName) {
  const pokemon = typeof pokemonOrName === 'string' ? pokemonByName.get(pokemonOrName) : pokemonOrName;
  return pokemon?.displayName ?? pokemon?.name ?? String(pokemonOrName ?? '');
}

function getRevealDisplayName(pokemon) {
  if (pokemon?.name === 'Mimikyu') return 'Pikachu..?';
  return getPokemonDisplayName(pokemon);
}

function injectDraftPokemonEntries(entries) {
  const list = entries.map((entry) => ({
    ...entry,
    tags: Array.isArray(entry.tags) ? [...entry.tags] : [],
  }));
  const byName = new Map(list.map((entry) => [entry.name, entry]));

  for (const [name, cost] of draftCustomCostOverrides.entries()) {
    const entry = byName.get(name);
    if (!entry) continue;
    entry.cost = cost;
    entry.untiered = false;
  }

  const eevee = byName.get('Eevee');
  if (eevee && !byName.has('Eevee-Z')) {
    list.push({ ...eevee, name: 'Eevee-Z', displayName: 'Eevee', cost: 1, untiered: false });
  }

  const blaziken = byName.get('Blaziken');
  if (blaziken && !byName.has('Blaziken-Speed-Boost')) {
    list.push({ ...blaziken, name: 'Blaziken-Speed-Boost', displayName: 'Blaziken', cost: 19, untiered: false });
  }

  const blastoiseMega = byName.get('Blastoise-Mega');
  if (blastoiseMega && !byName.has('Blastoise-Mega-Shell-Smash')) {
    list.push({ ...blastoiseMega, name: 'Blastoise-Mega-Shell-Smash', displayName: 'Blastoise-Mega', cost: null, untiered: true });
  }

  const minior = byName.get('Minior');
  if (minior) {
    minior.hidden = false;
    minior.linkedTo = null;
  }
  const miniorMeteor = byName.get('Minior-Meteor');
  if (miniorMeteor) {
    miniorMeteor.hidden = true;
    miniorMeteor.linkedTo = 'Minior';
  }

  const annihilape = byName.get('Annihilape');
  if (annihilape && !byName.has('Annihilape-Fist')) {
    list.push({ ...annihilape, name: 'Annihilape-Fist', speciesId: 'annihilapefist', displayName: 'Annihilape', cost: 22, tags: ['ragefist'] });
  }

  return list;
}

function initializePokemonData() {
  const entries = Array.isArray(window.POKEDEX_ENTRIES) ? window.POKEDEX_ENTRIES : [];
  allPokemon = injectDraftPokemonEntries(entries).filter((pokemon) => !pokemon.hidden);
  pokemonByName = new Map(allPokemon.map((pokemon) => [pokemon.name, pokemon]));
}

function createDefaultState() {
  return {
    version: 1,
    phase: 'setup',
    format: 'normal',
    draftDate: new Date().toISOString().slice(0, 10),
    selectedPlayerIds: [],
    setupStars: {},
    startPlayerId: null,
    randomizerActiveId: null,
    randomizeOrder: false,
    order: [],
    participants: [],
    turnIndex: 0,
    swapIndex: 0,
    picks: [],
    customCosts: {},
    pendingDecision: null,
    latestReveal: null,
    boardMode: 'rosters',
    updatedAt: Date.now(),
  };
}

function loadDraftState() {
  try {
    const raw = window.localStorage.getItem(draftStorageKey);
    if (!raw) return createDefaultState();
    return { ...createDefaultState(), ...JSON.parse(raw) };
  } catch {
    return createDefaultState();
  }
}

function saveDraftState({ broadcast = true } = {}) {
  draftState.updatedAt = Date.now();
  window.localStorage.setItem(draftStorageKey, JSON.stringify(draftState));
  if (broadcast) channel?.postMessage({ type: 'state', state: draftState });
  render();
}

function pushUndoState(label = 'Aktion') {
  const history = getUndoHistory();
  history.push({ label, at: new Date().toISOString(), state: cloneJson(draftState) });
  window.localStorage.setItem(draftUndoKey, JSON.stringify(history.slice(-40)));
}

function getUndoHistory() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(draftUndoKey) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function restoreUndoState() {
  const history = getUndoHistory();
  if (!history.length) return showInfoDecision('Undo', 'Es gibt keinen vorherigen Schritt.', [{ label: 'Ok' }]);
  restoreUndoAt(history.length - 1);
}

function restoreUndoAt(index) {
  const history = getUndoHistory();
  const entry = history[index];
  const previous = entry?.state ?? entry;
  if (!previous) return;
  draftState = previous;
  history.splice(index);
  window.localStorage.setItem(draftUndoKey, JSON.stringify(history));
  saveDraftState();
}

function getSelectedSpieler() {
  const playersById = new Map(getSpielerEntries().map((player) => [getPlayerId(player), player]));
  return draftState.selectedPlayerIds
    .map((id) => playersById.get(id))
    .filter(Boolean);
}

function getParticipant(id) {
  return draftState.participants.find((player) => player.id === id) ?? null;
}

function getActiveParticipants() {
  return draftState.participants.filter((player) => !player.finished);
}

function getDraftBudget() {
  return draftBudgetByFormat[draftState.format] ?? draftBudgetByFormat.normal;
}

function getDraftCustomCosts() {
  if (!draftState.customCosts || typeof draftState.customCosts !== 'object') draftState.customCosts = {};
  return draftState.customCosts;
}

function getDraftCustomCost(name) {
  const value = Number(getDraftCustomCosts()[name]);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function setDraftCustomCost(name, cost) {
  getDraftCustomCosts()[name] = cost;
}

function getEffectivePokemonCost(pokemonOrName) {
  const pokemon = typeof pokemonOrName === 'string' ? pokemonByName.get(pokemonOrName) : pokemonOrName;
  if (!pokemon) return null;
  return getDraftCustomCost(pokemon.name) ?? pokemon.cost ?? null;
}

function pokemonNeedsDraftCost(pokemon) {
  return Boolean(pokemon && (pokemon.cost === null || pokemon.cost === undefined) && getDraftCustomCost(pokemon.name) === null);
}

function getNudelsternThreshold() {
  return draftNudelsternThresholdByFormat[draftState.format] ?? draftNudelsternThresholdByFormat.normal;
}

function getMaxPokemonCost() {
  return draftMaxPokemonCostByFormat[draftState.format] ?? Infinity;
}

function isMegaPokemonName(name) {
  return /-Mega(?:-|$)/i.test(name);
}

function isGmaxPokemonName(name) {
  return /-Gmax(?:-|$)/i.test(name);
}

function getPokemonFlags(pokemon) {
  const cost = getEffectivePokemonCost(pokemon);
  const mega = isMegaPokemonName(pokemon.name);
  return {
    mega,
    gmax: isGmaxPokemonName(pokemon.name),
    tera: cost !== null && cost <= 5,
    z: !mega && cost !== null && cost <= 10,
  };
}

function pokemonMatchesSpeciesSet(pokemon, speciesSet) {
  const candidates = [pokemon.name, pokemon.baseSpecies, pokemon.changesFrom, pokemon.displayName].filter(Boolean);
  return candidates.some((name) => speciesSet.has(name) || [...speciesSet].some((species) => String(name).startsWith(`${species}-`)));
}

function getPokemonAbilityNames(pokemon) {
  return (pokemon.abilityDetails ?? []).map((ability) => ability.name).filter(Boolean);
}

function getDraftWeatherBadge(pokemon) {
  const abilityNames = getPokemonAbilityNames(pokemon);
  if (abilityNames.includes('Drought') || pokemon.name === 'Groudon-Primal' || pokemon.name === 'Koraidon') return { emoji: '☀️', className: 'is-sun' };
  if (abilityNames.includes('Drizzle') || pokemon.name === 'Kyogre-Primal') return { emoji: '🌧️', className: 'is-rain' };
  if (abilityNames.includes('Snow Warning') || abilityNames.includes('Hail Warning')) return { emoji: '❄️', className: 'is-snow' };
  if (abilityNames.includes('Sand Stream')) return { emoji: '🌪️', className: 'is-sand' };
  return null;
}

function getDraftSpecialNameVariant(pokemon) {
  const abilityNames = Object.values(pokemon.abilities ?? {});
  if (pokemon.name === 'Miraidon' || abilityNames.includes('Quark Drive')) return 'quark';
  if (pokemon.name === 'Koraidon' || abilityNames.includes('Protosynthesis')) return 'proto';
  return null;
}

function getPreMegaPokemon(pokemon) {
  if (!isMegaPokemonName(pokemon.name)) return null;
  const previousName = pokemon.changesFrom ?? pokemon.name.replace(/-Mega(?:-[A-Z])?$/, '');
  return pokemonByName.get(previousName) ?? null;
}

function getRevealAbilities(pokemon) {
  const abilities = (pokemon.abilityDetails ?? []).map((ability) => ({ ...ability, isPreMegaAbility: false }));
  const preMegaPokemon = getPreMegaPokemon(pokemon);
  if (preMegaPokemon) {
    for (const ability of preMegaPokemon.abilityDetails ?? []) {
      abilities.push({
        ...ability,
        id: `premega-${ability.id}`,
        slot: 'Vor Mega',
        sourceLabel: 'Vor Mega',
        isPreMegaAbility: true,
      });
    }
  }
  return abilities;
}

function getRevealEffectClasses(player, pokemon) {
  const classes = [];
  if (isMegaPokemonName(pokemon.name)) classes.push('is-mega-reveal');
  if (isGmaxPokemonName(pokemon.name)) classes.push('is-gmax-reveal');
  if (pokemonMatchesSpeciesSet(pokemon, draftUltraBeasts)) classes.push('is-ultra-reveal');
  if (pokemonMatchesSpeciesSet(pokemon, draftMythicSpecies)) classes.push('is-cherish-reveal');
  if (pokemon.name === 'Porygon-Z') classes.push('is-porygon-reveal');
  if (pokemon.name === 'Mimikyu') classes.push('is-mimikyu-reveal');
  if (normalizeText(player?.name).startsWith('andr') && (pokemon.name === 'Medicham' || pokemon.name === 'Medicham-Mega')) {
    classes.push('is-andre-medicham-reveal');
  }
  const variant = getDraftSpecialNameVariant(pokemon);
  if (variant === 'quark') classes.push('is-quark-reveal');
  if (variant === 'proto') classes.push('is-proto-reveal');
  return classes;
}

function draftHasWormholeEffect(pokemon) {
  const abilityNames = getPokemonAbilityNames(pokemon);
  return abilityNames.includes('Beast Boost') || pokemonMatchesSpeciesSet(pokemon, draftWormholeNames);
}

function getRevealBallPath(pokemon) {
  const cost = getEffectivePokemonCost(pokemon);
  if (draftHasWormholeEffect(pokemon)) return 'assets/balls/ultraball.png';
  if (pokemonMatchesSpeciesSet(pokemon, draftLegendarySpecies)) return 'assets/balls/masterball.png';
  if (pokemonMatchesSpeciesSet(pokemon, draftMythicSpecies)) return 'assets/balls/cherishball.png';
  if (cost === 1) return 'assets/balls/egg.png';
  if (cost >= 2 && cost <= 5) return 'assets/balls/pokeball.png';
  if (cost >= 6 && cost <= 10) return 'assets/balls/superball.png';
  if (cost >= 11) return 'assets/balls/hyperball.png';
  return 'assets/balls/pokeball.png';
}

function getPlayerPokemonCost(player) {
  return player.pokemon.reduce((sum, pick) => sum + (Number(pick.cost) || 0), 0);
}

function getPlayerTypeCost(player) {
  let sum = 0;
  if (player.teraType && player.teraTypePaidWith !== 'stars') sum += draftTypeCosts[player.teraType]?.tera ?? 0;
  if (player.zType && player.zTypePaidWith !== 'stars') sum += draftTypeCosts[player.zType]?.z ?? 0;
  return sum;
}

function getPlayerSpent(player) {
  return getPlayerPokemonCost(player) + getPlayerTypeCost(player);
}

function getPlayerRemaining(player) {
  return getDraftBudget() - getPlayerSpent(player);
}

function getPlayerSlotCount(player) {
  return player.pokemon.length + (player.teraType ? 1 : 0) + (player.zType ? 1 : 0);
}

function playerEarnsProjectedStar(player) {
  return getPlayerSpent(player) < getNudelsternThreshold();
}

function getCurrentPlayerId() {
  if (draftState.phase !== 'draft' || !draftState.order.length) return null;
  if (!getActiveParticipants().length) return null;

  let turnIndex = draftState.turnIndex;
  let guard = 0;
  while (guard < 10000) {
    const count = draftState.order.length;
    const round = Math.floor(turnIndex / count);
    const index = turnIndex % count;
    const orderedIndex = round % 2 === 0 ? index : count - 1 - index;
    const playerId = draftState.order[orderedIndex];
    const player = getParticipant(playerId);
    if (player && !player.finished && !playerHasNoDraftOptions(player)) return player.id;
    turnIndex += 1;
    guard += 1;
  }

  return null;
}

function getCurrentSnakeOrder() {
  if (!draftState.order.length) return [];
  const round = Math.floor(draftState.turnIndex / draftState.order.length);
  return round % 2 === 0 ? [...draftState.order] : [...draftState.order].reverse();
}

function playerHasNoDraftOptions(player) {
  const hasPokemonSlots = player.pokemon.length < 12 && getPlayerSlotCount(player) < 14;
  const hasTeraTypeSlot = Boolean(player.teraCaptain && !player.teraType && getPlayerSlotCount(player) < 14);
  const hasZTypeSlot = Boolean(player.zCaptain && !player.zType && getPlayerSlotCount(player) < 14);
  return (!hasPokemonSlots && !hasTeraTypeSlot && !hasZTypeSlot) || getPlayerRemaining(player) <= 0;
}

function playerHasPendingCaptainType(player, extra = {}) {
  const teraCaptain = extra.teraCaptain ?? player.teraCaptain;
  const zCaptain = extra.zCaptain ?? player.zCaptain;
  const teraType = extra.teraType ?? player.teraType;
  const zType = extra.zType ?? player.zType;
  return Boolean((teraCaptain && !teraType) || (zCaptain && !zType));
}

function getMinimumCostToReachNine(player) {
  const needed = Math.max(0, 9 - player.pokemon.length);
  if (!needed) return 0;
  return getAvailablePokemonForPlayer(player)
    .map((pokemon) => getEffectivePokemonCost(pokemon))
    .filter((cost) => Number.isFinite(cost))
    .sort((left, right) => left - right)
    .slice(0, needed)
    .reduce((sum, cost) => sum + cost, 0);
}

function playerCannotReachNinePokemon(player) {
  if (player.pokemon.length >= 9) return false;
  const needed = 9 - player.pokemon.length;
  const affordableCount = getAvailablePokemonForPlayer(player)
    .filter((pokemon) => getEffectivePokemonCost(pokemon) <= getPlayerRemaining(player))
    .length;
  return affordableCount < needed || getMinimumCostToReachNine(player) > getPlayerRemaining(player);
}

function normalizeDraftPhaseAfterTurn() {
  if (
    draftState.phase === 'draft' &&
    draftState.participants.length &&
    draftState.participants.every((player) => player.finished || playerHasNoDraftOptions(player))
  ) {
    draftState.phase = 'swap';
    draftState.swapIndex = 0;
  }
  if (draftState.phase === 'swap' && draftState.swapIndex >= draftState.participants.length) {
    draftState.phase = 'complete';
  }
}

function advanceTurn() {
  draftState.turnIndex += 1;
  normalizeDraftPhaseAfterTurn();
}

function rotateOrderToStart(ids, startId) {
  const index = ids.indexOf(startId);
  if (index < 0) return ids;
  return [...ids.slice(index), ...ids.slice(0, index)];
}

function shuffleDraftOrder(ids) {
  const shuffled = [...ids];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function getHistoricTeamPokemon(previousTeam) {
  if (Array.isArray(previousTeam)) return previousTeam;
  if (Array.isArray(previousTeam?.pokemon)) return previousTeam.pokemon;
  if (Array.isArray(previousTeam?.team)) return previousTeam.team;
  return [];
}

function getHistoricTeamYear(previousTeam) {
  const candidates = [previousTeam?.year, previousTeam?.date, previousTeam?.label, previousTeam?.format].filter(Boolean);
  for (const candidate of candidates) {
    const match = String(candidate).match(/(20\d{2})/);
    if (match) return Number(match[1]);
  }
  return null;
}

function teamIncludesPokemonName(team, pokemonName) {
  return getHistoricTeamPokemon(team).some((name) => normalizeText(name) === normalizeText(pokemonName));
}

function violatesJahresklausel(player, pokemonName) {
  const draftYear = Number(String(draftState.draftDate).slice(0, 4));
  const sourcePlayer = getSpielerEntries().find((entry) => getPlayerId(entry) === player.id);
  if (!sourcePlayer || !Number.isFinite(draftYear)) return false;
  const previousTeams = Array.isArray(sourcePlayer.previousTeams) ? sourcePlayer.previousTeams : [];
  return previousTeams.some((team) => getHistoricTeamYear(team) === draftYear && teamIncludesPokemonName(team, pokemonName));
}

function isPokemonGloballyPicked(name, exceptPlayerId = null, exceptPokemonName = null) {
  return draftState.participants.some((player) => {
    if (player.id === exceptPlayerId && exceptPokemonName && normalizeText(exceptPokemonName) === normalizeText(name)) return false;
    return player.pokemon.some((pick) => normalizeText(pick.name) === normalizeText(name));
  });
}

function getPokemonLegality(player, pokemon, options = {}) {
  const reasons = [];
  const decisions = [];
  const cost = getEffectivePokemonCost(pokemon);
  const needsCustomCost = pokemonNeedsDraftCost(pokemon);
  if (!pokemon) reasons.push('Nicht gefunden.');
  if (!needsCustomCost && (cost === null || cost === undefined)) reasons.push('Keine gueltigen Punktekosten.');
  if (pokemon?.unreleased || pokemon?.impossible) reasons.push('Nicht draftbar.');
  if (cost > getMaxPokemonCost()) reasons.push(`In diesem Format nur bis ${getMaxPokemonCost()} Punkte.`);
  if (player.pokemon.length >= 12) reasons.push('Pokemon-Slots voll.');
  if (getPlayerSlotCount(player) >= 14) reasons.push('Alle Slots voll.');

  const flags = pokemon ? getPokemonFlags(pokemon) : {};
  if ((flags.mega || flags.gmax) && player.megaGmaxSlot) {
    reasons.push('Mega/Gmax-Slot bereits belegt.');
  }

  if (cost && getPlayerSpent(player) + cost > getDraftBudget()) {
    reasons.push('Budget wuerde ueberschritten.');
  }

  if (!options.ignoreDuplicate && pokemon && isPokemonGloballyPicked(pokemon.name)) {
    if (player.nudelsterne >= 1) {
      decisions.push({ kind: 'duplicate', cost: 2, affordable: player.nudelsterne >= 2 });
    } else {
      reasons.push('Pokemon wurde bereits gepickt. 2 Nudelsterne noetig.');
    }
  }

  if (!options.ignoreJahresklausel && pokemon && violatesJahresklausel(player, pokemon.name)) {
    if (player.nudelsterne >= 1) {
      decisions.push({ kind: 'jahresklausel', cost: 2, affordable: player.nudelsterne >= 2 });
    } else {
      reasons.push('Jahresklausel: 2 Nudelsterne noetig.');
    }
  }

  return {
    legal: reasons.length === 0,
    reasons,
    decisions,
    needsCustomCost,
  };
}

function getAvailablePokemonForPlayer(player) {
  return allPokemon.filter((pokemon) => {
    const cost = getEffectivePokemonCost(pokemon);
    if (cost === null || cost === undefined) return false;
    if (pokemon.unreleased || pokemon.impossible) return false;
    if (cost > getMaxPokemonCost()) return false;
    if (isPokemonGloballyPicked(pokemon.name)) return false;
    const flags = getPokemonFlags(pokemon);
    if ((flags.mega || flags.gmax) && player?.megaGmaxSlot) return false;
    return true;
  });
}

function getFilteredPokemonEntries(player, query, options = {}) {
  const normalizedQuery = normalizeText(query);
  const type = options.type ?? '';
  const maxCost = Number(options.maxCost);
  const special = options.special ?? '';
  const showIllegal = Boolean(options.showIllegal);

  return allPokemon
    .filter((pokemon) => {
      const cost = getEffectivePokemonCost(pokemon);
      const costLabel = cost ?? (pokemonNeedsDraftCost(pokemon) ? 'untiered kosten festlegen' : '');
      if (normalizedQuery && !normalizeText(`${pokemon.name} ${(pokemon.types ?? []).join(' ')} ${costLabel}`).includes(normalizedQuery)) return false;
      if (type && !(pokemon.types ?? []).includes(type)) return false;
      if (Number.isFinite(maxCost) && maxCost > 0 && (cost ?? Infinity) > maxCost) return false;
      const flags = getPokemonFlags(pokemon);
      if (special === 'tera' && !flags.tera) return false;
      if (special === 'z' && !flags.z) return false;
      if (special === 'mega-gmax' && !flags.mega && !flags.gmax) return false;
      const legality = player ? getPokemonLegality(player, pokemon) : { legal: getEffectivePokemonCost(pokemon) !== null || pokemonNeedsDraftCost(pokemon), reasons: [] };
      if (special === 'affordable' && (!legality.legal || (cost ?? Infinity) > getPlayerRemaining(player))) return false;
      if (!showIllegal && !legality.legal) return false;
      return true;
    })
    .map((pokemon) => ({ pokemon, legality: player ? getPokemonLegality(player, pokemon) : { legal: true, reasons: [] } }));
}

function createParticipant(player) {
  const id = getPlayerId(player);
  return {
    id,
    name: player.name,
    sprite: player.sprite,
    nudelsterne: Math.max(0, Number(draftState.setupStars[id]) || 0),
    pokemon: [],
    teraCaptain: null,
    teraType: null,
    teraTypePaidWith: null,
    zCaptain: null,
    zType: null,
    zTypePaidWith: null,
    megaGmaxSlot: null,
    finished: false,
    finalSwap: null,
  };
}

function createSetupPreviewParticipant(player) {
  const id = getPlayerId(player);
  return {
    id,
    name: player.name,
    sprite: player.sprite,
    nudelsterne: Math.max(0, Number(draftState.setupStars[id]) || 0),
    pokemon: [],
    teraCaptain: null,
    teraType: null,
    teraTypePaidWith: null,
    zCaptain: null,
    zType: null,
    zTypePaidWith: null,
    megaGmaxSlot: null,
    finished: false,
    finalSwap: null,
    setupPreview: true,
  };
}

function getBoardPlayers() {
  if (draftState.participants.length) return draftState.participants;
  return getSelectedSpieler().map(createSetupPreviewParticipant);
}

function getBoardCurrentPlayer() {
  if (draftState.phase === 'setup') {
    const activeId = draftState.randomizerActiveId ?? draftState.startPlayerId;
    return getBoardPlayers().find((player) => player.id === activeId) ?? null;
  }
  return getParticipant(getCurrentPlayerId()) ?? getCurrentSwapPlayer();
}

function createElement(tag, className = '', text = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function clearElement(element) {
  if (element) element.innerHTML = '';
}

function showInfoDecision(title, copy, options = [{ label: 'Ok' }]) {
  return showDecision(title, copy, options.map((option) => ({ ...option, value: option.value ?? null })));
}

function showDecision(title, copy, options) {
  return new Promise((resolve) => {
    draftState.pendingDecision = { title, copy };
    saveDraftState();
    nodes.decisionTitle.textContent = title;
    nodes.decisionCopy.textContent = copy;
    nodes.decisionOptions.innerHTML = '';
    for (const option of options) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = option.primary ? 'draft-primary' : 'draft-secondary';
      button.textContent = option.label;
      button.disabled = Boolean(option.disabled);
      button.addEventListener('click', () => {
        nodes.decisionModal.hidden = true;
        draftState.pendingDecision = null;
        saveDraftState();
        resolve(option.value);
      });
      nodes.decisionOptions.append(button);
    }
    nodes.decisionModal.hidden = false;
  });
}

function showCustomCostDecision(pokemon) {
  return new Promise((resolve) => {
    draftState.pendingDecision = {
      title: 'Punktekosten festlegen',
      copy: `${getPokemonDisplayName(pokemon)} hat noch keine Punktekosten. Lege einen Wert nur fuer diesen Draft fest.`,
    };
    saveDraftState();
    nodes.decisionTitle.textContent = 'Punktekosten festlegen';
    nodes.decisionCopy.textContent = `${getPokemonDisplayName(pokemon)} hat noch keine Punktekosten. Lege einen Wert nur fuer diesen Draft fest.`;
    nodes.decisionOptions.innerHTML = '';

    const label = createElement('label', 'draft-field draft-custom-cost-field');
    label.append(createElement('span', '', 'Punktekosten'));
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = '40';
    input.step = '1';
    input.placeholder = 'z.B. 7';
    label.append(input);

    const feedback = createElement('p', 'draft-custom-cost-feedback');
    feedback.hidden = true;

    const applyButton = document.createElement('button');
    applyButton.type = 'button';
    applyButton.className = 'draft-primary';
    applyButton.textContent = 'Kosten uebernehmen';
    applyButton.addEventListener('click', () => {
      const cost = Math.trunc(Number(input.value));
      if (!Number.isFinite(cost) || cost < 1 || cost > 40) {
        feedback.hidden = false;
        feedback.textContent = 'Bitte gib Kosten zwischen 1 und 40 ein.';
        return;
      }
      nodes.decisionModal.hidden = true;
      draftState.pendingDecision = null;
      setDraftCustomCost(pokemon.name, cost);
      saveDraftState();
      resolve(cost);
    });

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'draft-secondary';
    cancelButton.textContent = 'Abbrechen';
    cancelButton.addEventListener('click', () => {
      nodes.decisionModal.hidden = true;
      draftState.pendingDecision = null;
      saveDraftState();
      resolve(null);
    });

    input.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      applyButton.click();
    });

    nodes.decisionOptions.append(label, feedback, applyButton, cancelButton);
    nodes.decisionModal.hidden = false;
    input.focus();
  });
}

async function askCaptain(player, pokemon, kind) {
  const flags = getPokemonFlags(pokemon);
  if (kind === 'tera' && (!flags.tera || player.teraCaptain)) return false;
  if (kind === 'z' && (!flags.z || player.zCaptain)) return false;
  const label = kind === 'tera' ? 'Tera' : 'Z';
  const answer = await showDecision(
    `${label}-Captain?`,
    `Dieses Pok\u00e9mon kann ${label}-Captain werden. Soll dieser Captain gesetzt werden?`,
    [
      { label: `${label}-Captain setzen`, value: true, primary: true },
      { label: 'Nein', value: false },
    ],
  );
  return Boolean(answer);
}

async function attemptPokemonPick(name) {
  const player = getParticipant(getCurrentPlayerId());
  const pokemon = pokemonByName.get(name);
  if (!player || !pokemon) return;
  if (pokemonNeedsDraftCost(pokemon)) {
    const customCost = await showCustomCostDecision(pokemon);
    if (customCost === null) return;
  }
  const pokemonCost = getEffectivePokemonCost(pokemon);
  const legality = getPokemonLegality(player, pokemon);
  if (!legality.legal) {
    await showInfoDecision('Pick nicht moeglich', legality.reasons.join(' '));
    return;
  }

  const starPayments = [];
  for (const decision of legality.decisions) {
    const pendingCost = starPayments.reduce((sum, payment) => sum + payment.cost, 0);
    const label = decision.kind === 'duplicate' ? 'Duplicate Clause' : 'Jahresklausel';
    if (!decision.affordable || pendingCost + decision.cost > player.nudelsterne) {
      await showDecision(
        label,
        `${getPokemonDisplayName(pokemon)} kostet fuer diese Ausnahme ${decision.cost} Nudelsterne. ${player.name} hat aktuell ${player.nudelsterne}.`,
        [{ label: 'Anderes Pokemon waehlen', value: false }],
      );
      return;
    }
    const answer = await showDecision(
      label,
      `${getPokemonDisplayName(pokemon)} braucht fuer diese Ausnahme ${decision.cost} Nudelsterne. Zahlen?`,
      [
        { label: `${decision.cost} Nudelsterne zahlen`, value: true, primary: true },
        { label: 'Anderes Pokemon waehlen', value: false },
      ],
    );
    if (!answer) return;
    starPayments.push(decision);
  }

  const wantsTera = await askCaptain(player, pokemon, 'tera');
  const wantsZ = await askCaptain(player, pokemon, 'z');
  const projectedRemaining = getPlayerRemaining(player) - (pokemonCost ?? 0);
  if (projectedRemaining === 0 && playerHasPendingCaptainType(player, {
    teraCaptain: wantsTera ? pokemon.name : player.teraCaptain,
    zCaptain: wantsZ ? pokemon.name : player.zCaptain,
  })) {
    const answer = await showDecision('Captain-Typ fehlt', 'Dieser Pick bringt das Budget auf 0, aber mindestens ein Captain hat noch keinen Typ. Trotzdem picken?', [
      { label: 'Trotzdem picken', value: true, primary: true },
      { label: 'Zurueck', value: false },
    ]);
    if (!answer) return;
  }
  pushUndoState(`${player.name} pickt ${getPokemonDisplayName(pokemon)}`);
  for (const payment of starPayments) {
    player.nudelsterne -= payment.cost;
  }
  player.pokemon.push({
    name: pokemon.name,
    cost: pokemonCost,
    duplicateOverride: starPayments.some((payment) => payment.kind === 'duplicate'),
    jahresklauselPaid: starPayments.some((payment) => payment.kind === 'jahresklausel'),
    customCost: pokemon.cost === null || pokemon.cost === undefined ? pokemonCost : undefined,
  });
  const flags = getPokemonFlags(pokemon);
  if (flags.mega) player.megaGmaxSlot = 'mega';
  if (flags.gmax) player.megaGmaxSlot = 'gmax';
  if (wantsTera) player.teraCaptain = pokemon.name;
  if (wantsZ) player.zCaptain = pokemon.name;
  draftState.picks.push({ kind: 'pokemon', playerId: player.id, pokemon: pokemon.name, turnIndex: draftState.turnIndex, at: new Date().toISOString() });
  draftState.latestReveal = {
    id: `${Date.now()}-${player.id}-${pokemon.name}`,
    playerId: player.id,
    pokemon: pokemon.name,
    teraCaptain: wantsTera,
    zCaptain: wantsZ,
    at: new Date().toISOString(),
  };
  advanceTurn();
  saveDraftState();
}

async function attemptTypePick(kind, type) {
  const player = getParticipant(getCurrentPlayerId());
  if (!player) return;
  const cost = draftTypeCosts[type]?.[kind];
  if (cost === null || cost === undefined) return;
  if (kind === 'tera' && (!player.teraCaptain || player.teraType)) return;
  if (kind === 'z' && (!player.zCaptain || player.zType)) return;

  const canPayPoints = getPlayerSpent(player) + cost <= getDraftBudget();
  const canPayStars = player.nudelsterne >= cost;
  if (!canPayPoints && !canPayStars) {
    await showInfoDecision('Typ nicht moeglich', 'Weder Budget noch Nudelsterne reichen fuer diesen Typ.');
    return;
  }

  let payment = 'points';
  if (canPayPoints && canPayStars && cost > 0) {
    payment = await showDecision(
      `${kind === 'tera' ? 'Tera' : 'Z'}-${type}`,
      `${type} kostet ${cost} Punkte. Mit Budget oder Nudelsternen bezahlen?`,
      [
        { label: 'Mit Punkten', value: 'points', primary: true },
        { label: `${cost} Nudelsterne`, value: 'stars' },
        { label: 'Abbrechen', value: null },
      ],
    );
    if (!payment) return;
  } else if (!canPayPoints && canPayStars) {
    payment = 'stars';
  }

  const projectedRemaining = payment === 'points' ? getPlayerRemaining(player) - cost : getPlayerRemaining(player);
  if (projectedRemaining === 0 && playerHasPendingCaptainType(player, {
    teraType: kind === 'tera' ? type : player.teraType,
    zType: kind === 'z' ? type : player.zType,
  })) {
    const answer = await showDecision('Captain-Typ fehlt', 'Diese Typ-Wahl bringt das Budget auf 0, aber ein anderer Captain hat noch keinen Typ. Trotzdem waehlen?', [
      { label: 'Trotzdem waehlen', value: true, primary: true },
      { label: 'Zurueck', value: false },
    ]);
    if (!answer) return;
  }

  pushUndoState(`${player.name} waehlt ${kind === 'tera' ? 'Tera' : 'Z'}-${type}`);
  if (payment === 'stars') player.nudelsterne -= cost;
  if (kind === 'tera') {
    player.teraType = type;
    player.teraTypePaidWith = payment;
  } else {
    player.zType = type;
    player.zTypePaidWith = payment;
  }
  draftState.picks.push({ kind, type, payment, playerId: player.id, turnIndex: draftState.turnIndex, at: new Date().toISOString() });
  advanceTurn();
  saveDraftState();
}

async function finishCurrentPlayer() {
  const player = getParticipant(getCurrentPlayerId());
  if (!player) return;
  if (player.pokemon.length < 9) {
    await showInfoDecision('Noch nicht fertig', 'Ein Spieler braucht mindestens 9 Pokemon.');
    return;
  }
  const answer = await showDecision('Spieler fertig?', `${player.name} aus dem Draft nehmen?`, [
    { label: 'Fertig', value: true, primary: true },
    { label: 'Zurueck', value: false },
  ]);
  if (!answer) return;
  pushUndoState(`${player.name} fertig`);
  player.finished = true;
  draftState.picks.push({ kind: 'finish', playerId: player.id, turnIndex: draftState.turnIndex, at: new Date().toISOString() });
  advanceTurn();
  saveDraftState();
}

function getCurrentSwapPlayer() {
  if (draftState.phase !== 'swap') return null;
  return draftState.participants[draftState.swapIndex] ?? null;
}

function getAvailableSwapPokemon(player, removedPick, query) {
  if (!removedPick) return [];
  const removedPokemon = pokemonByName.get(removedPick.name);
  const removedWasMegaGmax = removedPokemon && (isMegaPokemonName(removedPokemon.name) || isGmaxPokemonName(removedPokemon.name));
  const search = normalizeText(query);
  return allPokemon
    .filter((pokemon) => {
      const cost = getEffectivePokemonCost(pokemon);
      if (cost === null || cost === undefined) return false;
      if (normalizeText(pokemon.name) === normalizeText(removedPick.name)) return false;
      if (cost > (removedPick.cost ?? 0)) return false;
      if (cost > getMaxPokemonCost()) return false;
      if (isPokemonGloballyPicked(pokemon.name, player.id, removedPick.name)) return false;
      const flags = getPokemonFlags(pokemon);
      if ((flags.mega || flags.gmax) && player.megaGmaxSlot && !removedWasMegaGmax) return false;
      if (!search) return true;
      return normalizeText(`${pokemon.name} ${(pokemon.types ?? []).join(' ')} ${cost}`).includes(search);
    })
    .slice(0, 80);
}

function recalculateMegaGmaxSlot(player) {
  const megaGmax = player.pokemon
    .map((pick) => pokemonByName.get(pick.name))
    .find((pokemon) => pokemon && (isMegaPokemonName(pokemon.name) || isGmaxPokemonName(pokemon.name)));
  player.megaGmaxSlot = megaGmax ? (isMegaPokemonName(megaGmax.name) ? 'mega' : 'gmax') : null;
}

async function attemptSwapPick(name) {
  const player = getCurrentSwapPlayer();
  const ownName = nodes.swapOwn.value;
  const removedIndex = player?.pokemon.findIndex((pick) => pick.name === ownName) ?? -1;
  const removedPick = removedIndex >= 0 ? player.pokemon[removedIndex] : null;
  const replacement = pokemonByName.get(name);
  if (!player || !removedPick || !replacement) return;
  if (player.nudelsterne < 2) {
    await showInfoDecision('Swap nicht moeglich', 'Dieser Swap kostet 2 Nudelsterne.');
    return;
  }
  pushUndoState(`${player.name} swappt ${removedPick.name}`);
  player.nudelsterne -= 2;
  player.pokemon.splice(removedIndex, 1, { name: replacement.name, cost: getEffectivePokemonCost(replacement), swappedIn: true });
  recalculateMegaGmaxSlot(player);
  player.finalSwap = { from: removedPick.name, to: replacement.name, cost: 2 };
  draftState.picks.push({ kind: 'swap', playerId: player.id, from: removedPick.name, to: replacement.name, at: new Date().toISOString() });
  draftState.swapIndex += 1;
  normalizeDraftPhaseAfterTurn();
  saveDraftState();
}

function declineSwap() {
  const player = getCurrentSwapPlayer();
  if (!player) return;
  pushUndoState(`${player.name} declined Swap`);
  player.finalSwap = { declined: true };
  draftState.picks.push({ kind: 'swap-decline', playerId: player.id, at: new Date().toISOString() });
  draftState.swapIndex += 1;
  normalizeDraftPhaseAfterTurn();
  saveDraftState();
}

function downloadBlob(filename, content, type) {
  const blob = new Blob([content], { type });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function exportDraft() {
  const exported = {
    kind: 'schwalboga-draft-export',
    version: 1,
    exportedAt: new Date().toISOString(),
    format: draftState.format,
    draftDate: draftState.draftDate,
    customCosts: { ...getDraftCustomCosts() },
    players: draftState.participants.map((player) => ({
      name: player.name,
      sprite: player.sprite,
      pokemon: player.pokemon.map((pick) => pick.name),
      pokemonWithCosts: player.pokemon.map((pick) => ({ name: pick.name, cost: pick.cost, customCost: pick.customCost ?? null })),
      teraCaptain: player.teraCaptain,
      teraType: player.teraType,
      teraTypePaidWith: player.teraTypePaidWith,
      zCaptain: player.zCaptain,
      zType: player.zType,
      zTypePaidWith: player.zTypePaidWith,
      spentPoints: getPlayerSpent(player),
      nudelsterneBeforeImport: player.nudelsterne,
      projectedNudelsternEarned: playerEarnsProjectedStar(player) ? 1 : 0,
      nudelsterneAfterImport: player.nudelsterne + (playerEarnsProjectedStar(player) ? 1 : 0),
      finalSwap: player.finalSwap,
    })),
    picks: draftState.picks,
  };
  downloadBlob(`draft-${draftState.format}-${draftState.draftDate}.json`, JSON.stringify(exported, null, 2), 'application/json;charset=utf-8');
}

function startDraft() {
  const selected = getSelectedSpieler();
  if (selected.length < 2 || !draftState.startPlayerId) return;
  pushUndoState('Draft gestartet');
  draftState.participants = [];
  draftState.phase = 'draft';
  const selectedOrder = selected.map(getPlayerId);
  const draftOrder = draftState.randomizeOrder ? shuffleDraftOrder(selectedOrder) : selectedOrder;
  draftState.order = rotateOrderToStart(draftOrder, draftState.startPlayerId);
  draftState.participants = selected.map(createParticipant).sort((left, right) => draftState.order.indexOf(left.id) - draftState.order.indexOf(right.id));
  draftState.turnIndex = 0;
  draftState.swapIndex = 0;
  draftState.picks = [];
  draftState.pendingDecision = null;
  draftState.randomizerActiveId = null;
  draftState.latestReveal = null;
  saveDraftState();
}

function dismissLatestReveal() {
  if (!draftState.latestReveal) return;
  draftState.latestReveal = null;
  renderedRevealId = null;
  saveDraftState();
}

function resetDraft() {
  if (!window.confirm('Draft wirklich zuruecksetzen?')) return;
  pushUndoState('Draft zurueckgesetzt');
  const nextState = createDefaultState();
  nextState.format = draftState.format;
  nextState.selectedPlayerIds = [...draftState.selectedPlayerIds];
  nextState.setupStars = { ...draftState.setupStars };
  nextState.randomizeOrder = Boolean(draftState.randomizeOrder);
  draftState = nextState;
  window.localStorage.removeItem(draftUndoKey);
  saveDraftState();
}

function toggleTrainer(id) {
  const selected = new Set(draftState.selectedPlayerIds);
  if (selected.has(id)) selected.delete(id);
  else selected.add(id);
  draftState.selectedPlayerIds = [...selected];
  if (!selected.has(draftState.startPlayerId)) draftState.startPlayerId = null;
  if (!selected.has(draftState.randomizerActiveId)) draftState.randomizerActiveId = null;
  saveDraftState();
}

function randomizeStartPlayer() {
  const selected = draftState.selectedPlayerIds;
  if (selected.length < 2 || randomizerTimer) return;
  let ticks = 0;
  nodes.randomizeButton.disabled = true;
  randomizerTimer = window.setInterval(() => {
    const id = selected[ticks % selected.length];
    const tickPlayer = getSpielerEntries().find((entry) => getPlayerId(entry) === id);
    draftState.randomizerActiveId = id;
    nodes.randomizerDisplay.textContent = tickPlayer?.name ?? '...';
    nodes.randomizerDisplay.classList.toggle('is-ticking', ticks % 2 === 0);
    saveDraftState();
    ticks += 1;
    if (ticks < 28) return;
    window.clearInterval(randomizerTimer);
    randomizerTimer = null;
    const winner = selected[Math.floor(Math.random() * selected.length)];
    draftState.startPlayerId = winner;
    draftState.randomizerActiveId = winner;
    const winnerPlayer = getSpielerEntries().find((entry) => getPlayerId(entry) === winner);
    nodes.randomizerDisplay.textContent = `${winnerPlayer?.name ?? winner} startet`;
    nodes.randomizeButton.disabled = false;
    saveDraftState();
  }, 70);
}

function renderSetup() {
  clearElement(nodes.trainerGrid);
  const selected = new Set(draftState.selectedPlayerIds);
  const startId = draftState.startPlayerId;
  nodes.randomizeOrder.checked = Boolean(draftState.randomizeOrder);
  for (const player of getSpielerEntries()) {
    const id = getPlayerId(player);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'draft-trainer-card';
    if (selected.has(id)) button.classList.add('is-selected');
    if (startId === id) button.classList.add('is-start-player');
    const image = document.createElement('img');
    image.src = player.sprite;
    image.alt = `${player.name} Trainer`;
    image.loading = 'lazy';
    const name = createElement('strong', '', player.name);
    const stars = createElement('span', '', `${Math.max(0, Number(draftState.setupStars[id]) || 0)} Nudelsterne`);
    button.append(image, name, stars);
    button.addEventListener('click', () => toggleTrainer(id));
    nodes.trainerGrid.append(button);
  }

  nodes.format.value = draftState.format;
  nodes.startButton.disabled = selected.size < 2 || !draftState.startPlayerId;
  if (!draftState.startPlayerId) nodes.randomizerDisplay.textContent = 'Startspieler auslosen';
  renderAdminStars();
}

function renderAdminStars() {
  nodes.adminStars.hidden = !nodes.adminMode.checked;
  clearElement(nodes.adminStars);
  for (const player of getSelectedSpieler()) {
    const id = getPlayerId(player);
    const label = createElement('label', 'draft-field');
    const span = createElement('span', '', player.name);
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.step = '1';
    input.value = Math.max(0, Number(draftState.setupStars[id]) || 0);
    input.addEventListener('change', () => {
      draftState.setupStars[id] = Math.max(0, Number(input.value) || 0);
      saveDraftState();
    });
    label.append(span, input);
    nodes.adminStars.append(label);
  }
}

function renderCurrentSummary(player) {
  clearElement(nodes.currentSummary);
  if (!player) return;
  const items = [
    ['Budget', `${getPlayerSpent(player)} / ${getDraftBudget()}`],
    ['Rest', String(getPlayerRemaining(player))],
    ['Pokemon', `${player.pokemon.length} / 12`],
    ['Slots', `${getPlayerSlotCount(player)} / 14`],
    ['Nudelsterne', String(player.nudelsterne)],
    ['Tera', player.teraCaptain ? `${getPokemonDisplayName(player.teraCaptain)}${player.teraType ? ` (${player.teraType})` : ''}` : '-'],
    ['Z', player.zCaptain ? `${getPokemonDisplayName(player.zCaptain)}${player.zType ? ` (${player.zType})` : ''}` : '-'],
    ['Mega/Gmax', player.megaGmaxSlot ?? '-'],
  ];
  for (const [label, value] of items) {
    const card = createElement('div', 'draft-summary-card');
    card.append(createElement('span', '', label), createElement('strong', '', value));
    nodes.currentSummary.append(card);
  }
}

function renderTypePicks(player) {
  clearElement(nodes.typePicks);
  if (!player) return;
  const configs = [
    { kind: 'tera', captain: player.teraCaptain, type: player.teraType, label: 'Tera-Typ' },
    { kind: 'z', captain: player.zCaptain, type: player.zType, label: 'Z-Typ' },
  ];
  for (const config of configs) {
    if (!config.captain || config.type) continue;
    const section = createElement('section', 'draft-type-section');
    section.append(createElement('h3', '', `${config.label} fuer ${getPokemonDisplayName(config.captain)}`));
    const grid = createElement('div', 'draft-type-grid');
    for (const type of draftBattleTypes) {
      const cost = draftTypeCosts[type]?.[config.kind];
      if (cost === null || cost === undefined) continue;
      const button = createElement('button', 'draft-type-button', `${type} (${cost})`);
      button.type = 'button';
      button.addEventListener('click', () => attemptTypePick(config.kind, type));
      grid.append(button);
    }
    section.append(grid);
    nodes.typePicks.append(section);
  }
}

function renderPokemonResults(player) {
  clearElement(nodes.results);
  if (!player) return;
  const matches = getFilteredPokemonEntries(player, nodes.search.value, {
    type: nodes.filterType.value,
    maxCost: nodes.filterMaxCost.value,
    special: nodes.filterSpecial.value,
    showIllegal: nodes.showIllegal.checked,
  })
    .slice(0, 120);

  for (const { pokemon, legality } of matches) {
    nodes.results.append(createPokemonResultButton(pokemon, legality, () => attemptPokemonPick(pokemon.name)));
  }
}

function populateDraftFilters() {
  if (!nodes.filterType || nodes.filterType.options.length > 1) return;
  for (const type of draftBattleTypes.filter((entry) => entry !== 'Stellar')) {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    nodes.filterType.append(option);
  }
}

function renderPickLog() {
  if (!nodes.pickLog) return;
  nodes.pickLog.innerHTML = '';
  const entries = [...draftState.picks].reverse().slice(0, 18);
  if (!entries.length) {
    nodes.pickLog.append(createElement('p', 'draft-empty-note', 'Noch keine Picks.'));
    return;
  }
  for (const pick of entries) {
    const player = getParticipant(pick.playerId);
    const row = createElement('div', 'draft-log-row');
    let text = pick.kind;
    if (pick.kind === 'pokemon') text = `${player?.name ?? pick.playerId}: ${getPokemonDisplayName(pick.pokemon)}`;
    else if (pick.kind === 'tera' || pick.kind === 'z') text = `${player?.name ?? pick.playerId}: ${pick.kind.toUpperCase()}-${pick.type}`;
    else if (pick.kind === 'finish') text = `${player?.name ?? pick.playerId}: fertig`;
    else if (pick.kind === 'swap') text = `${player?.name ?? pick.playerId}: ${getPokemonDisplayName(pick.from)} -> ${getPokemonDisplayName(pick.to)}`;
    else if (pick.kind === 'swap-decline') text = `${player?.name ?? pick.playerId}: Swap declined`;
    row.append(createElement('strong', '', text));
    row.append(createElement('span', '', pick.at ? new Date(pick.at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : ''));
    nodes.pickLog.append(row);
  }
}

function renderUndoHistory() {
  if (!nodes.undoHistory) return;
  nodes.undoHistory.innerHTML = '';
  const history = getUndoHistory();
  if (!history.length) {
    nodes.undoHistory.append(createElement('p', 'draft-empty-note', 'Keine Undo-Punkte.'));
    return;
  }
  history.slice(-12).reverse().forEach((entry, offset) => {
    const index = history.length - 1 - offset;
    const row = createElement('button', 'draft-undo-row');
    row.type = 'button';
    row.append(createElement('strong', '', entry.label ?? `Schritt ${index + 1}`));
    row.append(createElement('span', '', entry.at ? new Date(entry.at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : ''));
    row.addEventListener('click', () => restoreUndoAt(index));
    nodes.undoHistory.append(row);
  });
}

function createPokemonResultButton(pokemon, legality, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'draft-pokemon-card';
  if (!legality.legal) button.classList.add('is-illegal');
  const sprite = document.createElement('img');
  sprite.src = pokemon.sprite;
  sprite.alt = `${pokemon.name} Sprite`;
  sprite.loading = 'lazy';
  const meta = createElement('span', 'draft-pokemon-meta');
  const title = createElement('strong', '', getPokemonDisplayName(pokemon));
  const cost = getEffectivePokemonCost(pokemon);
  const costText = cost === null ? 'Kosten festlegen' : `${cost} Punkte`;
  const details = createElement('span', '', `${costText} | ${(pokemon.types ?? []).join(' / ')}`);
  const reason = createElement('span', 'draft-pokemon-reason', legality.legal ? (legality.needsCustomCost ? 'Kosten festlegen' : 'Pick') : legality.reasons[0]);
  meta.append(title, details, reason);
  button.append(sprite, meta);
  button.addEventListener('click', onClick);
  return button;
}

function renderControl() {
  const player = getParticipant(getCurrentPlayerId());
  nodes.controlPanel.hidden = draftState.phase !== 'draft';
  nodes.swapPanel.hidden = draftState.phase !== 'swap';
  nodes.setupPanel.hidden = draftState.phase !== 'setup' || currentView === 'board';
  renderPickLog();
  renderUndoHistory();
  if (draftState.phase !== 'draft') return;
  nodes.phaseLabel.textContent = `Snake Draft | ${draftState.format}`;
  nodes.currentPlayer.textContent = player ? `${player.name} ist dran` : 'Draft';
  renderCurrentSummary(player);
  renderTypePicks(player);
  renderPokemonResults(player);
  nodes.finishPlayer.disabled = !player || player.pokemon.length < 9;
}

function renderSwap() {
  const player = getCurrentSwapPlayer();
  nodes.swapPanel.hidden = draftState.phase !== 'swap' || currentView === 'board';
  if (draftState.phase !== 'swap' || !player) return;
  nodes.swapPlayer.textContent = `${player.name}: Swap oder Decline`;
  nodes.swapDecline.disabled = false;
  nodes.swapOwn.innerHTML = '';
  for (const pick of player.pokemon) {
    const option = document.createElement('option');
    option.value = pick.name;
    option.textContent = `${getPokemonDisplayName(pick.name)} (${pick.cost})`;
    nodes.swapOwn.append(option);
  }
  renderSwapResults();
}

function renderSwapResults() {
  clearElement(nodes.swapResults);
  const player = getCurrentSwapPlayer();
  const removedPick = player?.pokemon.find((pick) => pick.name === nodes.swapOwn.value);
  if (!player || !removedPick) return;
  const available = getAvailableSwapPokemon(player, removedPick, nodes.swapSearch.value);
  for (const pokemon of available) {
    const legality = { legal: player.nudelsterne >= 2, reasons: player.nudelsterne >= 2 ? [] : ['2 Nudelsterne noetig'] };
    nodes.swapResults.append(createPokemonResultButton(pokemon, legality, () => attemptSwapPick(pokemon.name)));
  }
}

function renderBoard() {
  clearElement(nodes.board);
  const boardPlayers = getBoardPlayers();
  if (!boardPlayers.length) {
    const empty = createElement('section', 'draft-board-empty');
    empty.append(createElement('p', 'draft-eyebrow', 'Draft Board'));
    empty.append(createElement('h2', '', 'Warte auf Setup'));
    empty.append(createElement('p', '', 'Oeffne die Control-Ansicht und waehle Mitspieler aus.'));
    nodes.board.append(empty);
    return;
  }

  const currentPlayer = getBoardCurrentPlayer();
  const hero = createElement('section', 'draft-board-hero');
  const heroCopy = createElement('div');
  const heading = draftState.phase === 'setup'
    ? (draftState.startPlayerId ? `${currentPlayer?.name ?? 'Startspieler'} startet` : 'Setup laeuft')
    : (currentPlayer ? `${currentPlayer.name} ist dran` : 'Draft abgeschlossen');
  heroCopy.append(createElement('p', 'draft-eyebrow', draftState.phase === 'swap' ? 'Finale Swap-Runde' : draftState.phase));
  heroCopy.append(createElement('h2', '', heading));
  const setupSubline = draftState.randomizerActiveId
    ? 'Startspieler wird ausgelost...'
    : 'Mitspieler erscheinen hier live, sobald sie im Control Room ausgewaehlt werden.';
  const orderMode = draftState.randomizeOrder ? 'Reihenfolge wird beim Start gemischt' : 'Reihenfolge nach Auswahl';
  const subline = draftState.pendingDecision?.copy ?? (draftState.phase === 'setup'
    ? `${draftState.format} | Budget ${getDraftBudget()} | ${boardPlayers.length} Spieler | ${orderMode} | ${setupSubline}`
    : `${draftState.format} | Budget ${getDraftBudget()} | ${boardPlayers.length} Spieler`);
  heroCopy.append(createElement('p', '', subline));
  hero.append(heroCopy);
  nodes.board.append(hero);

  if (currentView === 'board' && draftState.phase !== 'setup') {
    nodes.board.append(createBoardModeTabs());
  }

  const order = createElement('div', 'draft-order-strip');
  const visibleOrder = draftState.phase === 'setup'
    ? boardPlayers.map((player) => player.id)
    : getCurrentSnakeOrder();
  visibleOrder.forEach((playerId, index) => {
    const player = boardPlayers.find((entry) => entry.id === playerId);
    if (!player) return;
    const chip = createElement('span', 'draft-order-chip', player.name);
    if (currentPlayer?.id === player.id) chip.classList.add('is-current');
    if (draftState.phase !== 'setup' && (player.finished || playerHasNoDraftOptions(player))) chip.classList.add('is-finished');
    if (draftState.phase === 'setup' && draftState.randomizerActiveId === player.id) chip.classList.add('is-randomizing');
    if (draftState.phase === 'setup' && draftState.startPlayerId === player.id) chip.classList.add('is-start-player');
    order.append(chip);
    if (index < visibleOrder.length - 1) order.append(createElement('span', 'draft-order-arrow', '->'));
  });
  nodes.board.append(order);

  if (draftState.boardMode === 'availability' && draftState.phase !== 'setup') {
    renderAvailabilityPool();
    renderLatestReveal();
    return;
  }

  if (draftState.boardMode === 'matrix' && draftState.phase !== 'setup') {
    renderActivePlayerMatrix();
    renderLatestReveal();
    return;
  }

  if (draftState.boardMode === 'speed' && draftState.phase !== 'setup') {
    renderSpeedTiers();
    renderLatestReveal();
    return;
  }

  const grid = createElement('section', 'draft-roster-grid');
  for (const player of boardPlayers) {
    grid.append(createRosterCard(player));
  }
  nodes.board.append(grid);
  renderLatestReveal();
}

function createBoardModeTabs() {
  const tabs = createElement('div', 'draft-board-mode-tabs');
  const modes = [
    ['rosters', 'Teams'],
    ['availability', 'Pool'],
    ['matrix', 'Matrix'],
    ['speed', 'Speed Tiers'],
  ];
  for (const [mode, label] of modes) {
    const button = createElement('button', `draft-board-mode-button${draftState.boardMode === mode ? ' is-active' : ''}`, label);
    button.type = 'button';
    button.addEventListener('click', () => {
      draftState.boardMode = mode;
      saveDraftState();
    });
    tabs.append(button);
  }
  return tabs;
}

function renderAvailabilityPool() {
  const activePlayer = getParticipant(getCurrentPlayerId()) ?? draftState.participants[0] ?? null;
  const pool = getAvailablePokemonForPlayer(activePlayer)
    .sort((left, right) => (getEffectivePokemonCost(right) ?? 0) - (getEffectivePokemonCost(left) ?? 0) || left.name.localeCompare(right.name));
  const wrap = createElement('section', 'draft-availability-pool');
  const groups = new Map();
  for (const pokemon of pool) {
    const key = String(getEffectivePokemonCost(pokemon) ?? '-');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(pokemon);
  }
  for (const [cost, pokemonList] of groups) {
    const group = createElement('article', 'draft-pool-group');
    group.append(createElement('h3', '', `${cost} Punkte`));
    const grid = createElement('div', 'draft-pool-grid');
    pokemonList.slice(0, 48).forEach((pokemon) => {
      const chip = createElement('div', 'draft-pool-chip');
      chip.append(createElement('strong', '', getPokemonDisplayName(pokemon)));
      chip.append(createElement('span', '', (pokemon.types ?? []).join(' / ')));
      grid.append(chip);
    });
    group.append(grid);
    wrap.append(group);
  }
  nodes.board.append(wrap);
}

function getDefenseMultiplier(pokemon, attackType, defendingTypes = pokemon.types) {
  return (defendingTypes ?? []).reduce((value, defendingType) => value * (draftTypeDefenseChart[defendingType]?.[attackType] ?? 1), 1);
}

function getDraftDefenseProfiles(pokemon, attackType, defendingTypes = pokemon.types) {
  const baseValue = getDefenseMultiplier(pokemon, attackType, defendingTypes);
  const abilityNames = new Set((pokemon.abilityDetails ?? []).map((ability) => ability.name));
  const profiles = [{ value: baseValue, label: 'Ohne Fäh.' }];
  const addProfile = (ability, value) => {
    if (!abilityNames.has(ability) || value === baseValue) return;
    profiles.push({ value, label: ability });
  };
  if (attackType === 'Ground') {
    addProfile('Earth Eater', 0);
    addProfile('Levitate', 0);
  }
  if (attackType === 'Water') {
    addProfile('Dry Skin', 0);
    addProfile('Storm Drain', 0);
    addProfile('Water Absorb', 0);
  }
  if (attackType === 'Electric') {
    addProfile('Lightning Rod', 0);
    addProfile('Motor Drive', 0);
    addProfile('Volt Absorb', 0);
  }
  if (attackType === 'Grass') addProfile('Sap Sipper', 0);
  if (attackType === 'Fire') {
    addProfile('Flash Fire', 0);
    addProfile('Well-Baked Body', 0);
    addProfile('Heatproof', baseValue / 2);
    addProfile('Thick Fat', baseValue / 2);
    addProfile('Water Bubble', baseValue / 2);
    addProfile('Dry Skin', baseValue * 1.25);
  }
  if (attackType === 'Ice') addProfile('Thick Fat', baseValue / 2);
  if (attackType === 'Ghost') addProfile('Purifying Salt', baseValue / 2);
  if (baseValue > 1) {
    addProfile('Filter', baseValue * 0.75);
    addProfile('Prism Armor', baseValue * 0.75);
    addProfile('Solid Rock', baseValue * 0.75);
  }
  return profiles;
}

function getDraftDefenseAbilityStates(pokemon, defendingTypes = pokemon.types) {
  const abilities = (pokemon.abilityDetails ?? [])
    .filter((ability) => !ability.isPreMegaAbility)
    .map((ability) => ability.name)
    .filter((ability) => ability && !draftIllegalAbilityNames.has(ability))
    .filter((ability) => !(pokemon.name === 'Blaziken' && ability === 'Speed Boost'));
  return abilities.length ? abilities : ['Ohne Fäh.'];
}

function setDraftDefenseProfileCell(cell, profiles, abilityStates) {
  const activeAbility = abilityStates[draftDefenseProfileTick % abilityStates.length];
  const profile = profiles.find((entry) => entry.label === activeAbility) ?? profiles[0];
  cell.className = `is-defense-${String(profile.value).replace('.', '-')}`;
  cell.textContent = getDefenseLabel(profile.value);
  cell.title = activeAbility;
  if (abilityStates.length > 1 || activeAbility !== 'Ohne Fäh.') {
    cell.classList.add(abilityStates.length > 1 ? 'is-defense-cycling' : 'is-defense-ability-active');
    cell.dataset.defenseProfileLabel = activeAbility;
  }
}

function refreshDraftDefenseProfileCells() {
  if (currentView !== 'board' || draftState.boardMode !== 'matrix' || document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  draftDefenseProfileTick += 1;
  document.querySelectorAll('.draft-matrix-table td.is-defense-cycling').forEach((cell) => {
    setDraftDefenseProfileCell(cell, cell._defenseProfiles, cell._defenseAbilityStates);
    cell.classList.remove('is-defense-flashing');
    void cell.offsetWidth;
    cell.classList.add('is-defense-flashing');
  });
}

function getDefenseLabel(value) {
  if (value === 0) return '0';
  if (value === 0.25) return '1/4';
  if (value === 0.5) return '1/2';
  return `${value}x`;
}

function renderActivePlayerMatrix() {
  const player = getParticipant(getCurrentPlayerId()) ?? draftState.participants[0] ?? null;
  const section = createElement('section', 'draft-matrix-panel');
  section.append(createElement('h2', '', player ? `${player.name}: Defensive Matrix` : 'Defensive Matrix'));
  if (!player || !player.pokemon.length) {
    section.append(createElement('p', 'draft-empty-note', 'Noch keine Pokemon fuer die Matrix.'));
    nodes.board.append(section);
    return;
  }
  const tableWrap = createElement('div', 'draft-matrix-wrap');
  const table = document.createElement('table');
  table.className = 'draft-matrix-table';
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  headRow.append(createElement('th', '', 'Pokemon'));
  for (const type of draftBattleTypes.filter((entry) => entry !== 'Stellar')) headRow.append(createElement('th', '', type));
  thead.append(headRow);
  table.append(thead);
  const tbody = document.createElement('tbody');
  const matrixEntries = player.pokemon.map((pick) => ({ pick, defenseTypes: null, label: getPokemonDisplayName(pick.name) }));
  if (player.teraCaptain && player.teraType) {
    const teraPick = player.pokemon.find((pick) => pick.name === player.teraCaptain);
    if (teraPick) matrixEntries.push({
      pick: teraPick,
      defenseTypes: [player.teraType],
      label: `${getPokemonDisplayName(teraPick.name)} (Tera ${player.teraType})`,
    });
  }
  for (const entry of matrixEntries) {
    const pick = entry.pick;
    const pokemon = pokemonByName.get(pick.name);
    if (!pokemon) continue;
    const row = document.createElement('tr');
    row.append(createElement('th', '', entry.label));
    for (const type of draftBattleTypes.filter((entry) => entry !== 'Stellar')) {
      const profiles = getDraftDefenseProfiles(pokemon, type, entry.defenseTypes ?? pokemon.types);
      const cell = createElement('td');
      cell._defenseProfiles = profiles;
      cell._defenseAbilityStates = getDraftDefenseAbilityStates(pokemon, entry.defenseTypes ?? pokemon.types);
      setDraftDefenseProfileCell(cell, profiles, cell._defenseAbilityStates);
      row.append(cell);
    }
    tbody.append(row);
  }
  table.append(tbody);
  tableWrap.append(table);
  section.append(tableWrap);
  nodes.board.append(section);
}

function getTrainerColor(player) {
  const index = draftState.participants.findIndex((entry) => entry.id === player.id);
  return draftTrainerColors[Math.max(0, index) % draftTrainerColors.length];
}

function renderSpeedTiers() {
  const entries = draftState.participants.flatMap((player) => player.pokemon.map((pick) => {
    const pokemon = pokemonByName.get(pick.name);
    return pokemon ? {
      player,
      pokemon,
      speed: Number(pokemon.baseStats?.spe) || 0,
    } : null;
  }).filter(Boolean)).sort((left, right) => right.speed - left.speed || getPokemonDisplayName(left.pokemon).localeCompare(getPokemonDisplayName(right.pokemon)));

  const section = createElement('section', 'draft-speed-tiers-panel');
  section.append(createElement('h2', '', 'Speed Tiers'));
  if (!entries.length) {
    section.append(createElement('p', 'draft-empty-note', 'Noch keine Pokemon fuer die Speed Tiers.'));
    nodes.board.append(section);
    return;
  }

  const list = createElement('div', 'draft-speed-tiers-list');
  for (const entry of entries) {
    const row = createElement('article', 'draft-speed-tier');
    row.style.setProperty('--trainer-color', getTrainerColor(entry.player));
    row.append(createElement('strong', 'draft-speed-value', String(entry.speed)));
    row.append(createElement('span', 'draft-speed-pokemon', getPokemonDisplayName(entry.pokemon)));
    row.append(createElement('span', 'draft-speed-trainer', entry.player.name));
    list.append(row);
  }
  section.append(list);
  nodes.board.append(section);
}

function renderLatestReveal() {
  if (!draftState.latestReveal || currentView !== 'board') return;
  const pokemon = pokemonByName.get(draftState.latestReveal.pokemon);
  const player = getParticipant(draftState.latestReveal.playerId);
  if (!pokemon || !player) return;

  const isRepeatedRender = renderedRevealId === draftState.latestReveal.id;
  const overlay = createElement('section', `draft-reveal-overlay ${isRepeatedRender ? 'is-reveal-already-shown' : ''} ${getRevealEffectClasses(player, pokemon).join(' ')}`);
  renderedRevealId = draftState.latestReveal.id;
  const ballStage = createElement('div', 'draft-reveal-ball-stage');
  const ball = document.createElement('img');
  ball.className = 'draft-reveal-ball';
  ball.src = getRevealBallPath(pokemon);
  ball.alt = '';
  ballStage.append(ball);
  overlay.append(ballStage, createElement('div', 'draft-reveal-flash'));

  const card = createElement('article', 'draft-reveal-card');
  const header = createElement('div', 'draft-reveal-header');
  header.append(createElement('p', 'draft-eyebrow', `${player.name} pickt`));
  const titleRow = createElement('div', 'draft-reveal-title-row');
  const title = createElement('h2', '', getRevealDisplayName(pokemon));
  const specialVariant = getDraftSpecialNameVariant(pokemon);
  if (specialVariant === 'quark') title.classList.add('is-quark-name');
  if (specialVariant === 'proto') title.classList.add('is-proto-name');
  if (pokemon.name === 'Porygon-Z') title.classList.add('is-porygon-glitching');
  titleRow.append(title);

  const weather = getDraftWeatherBadge(pokemon);
  if (weather) titleRow.append(createElement('span', `draft-reveal-weather ${weather.className}`, weather.emoji));
  const badges = createElement('div', 'draft-reveal-badges');
  if (draftState.latestReveal.teraCaptain) badges.append(createRevealIcon('Type Icons/Tera_Icon.png', 'Tera-Captain'));
  if (draftState.latestReveal.zCaptain) badges.append(createRevealIcon('Type Icons/Z_Icon.png', 'Z-Captain'));
  if (badges.children.length) titleRow.append(badges);
  header.append(titleRow);

  const content = createElement('div', 'draft-reveal-content');
  const spriteWrap = createElement('div', 'draft-reveal-sprite-wrap');
  const sprite = document.createElement('img');
  sprite.className = 'draft-reveal-sprite';
  sprite.src = pokemon.sprite;
  sprite.alt = `${getRevealDisplayName(pokemon)} Sprite`;
  sprite.loading = 'lazy';
  spriteWrap.append(sprite);
  if (pokemon.name === 'Porygon-Z') {
    const blueLayer = sprite.cloneNode();
    blueLayer.className = 'draft-reveal-sprite draft-reveal-sprite-glitch is-blue';
    const pinkLayer = sprite.cloneNode();
    pinkLayer.className = 'draft-reveal-sprite draft-reveal-sprite-glitch is-pink';
    spriteWrap.append(blueLayer, pinkLayer);
  }
  if (normalizeText(player.name).startsWith('andr') && (pokemon.name === 'Medicham' || pokemon.name === 'Medicham-Mega')) {
    const hearts = createElement('div', 'draft-reveal-heart-layer');
    for (let index = 0; index < 18; index += 1) {
      const heart = createElement('span', 'draft-reveal-heart', '♥');
      heart.style.setProperty('--heart-x', `${Math.round(Math.random() * 220 - 110)}px`);
      heart.style.setProperty('--heart-y', `${Math.round(Math.random() * 160 + 90)}px`);
      heart.style.setProperty('--heart-delay', `${(index * 0.11).toFixed(2)}s`);
      heart.style.setProperty('--heart-size', `${(1 + Math.random() * 1.6).toFixed(2)}rem`);
      hearts.append(heart);
    }
    spriteWrap.append(hearts);
  }
  content.append(spriteWrap);

  const info = createElement('div', 'draft-reveal-info');
  const types = createElement('div', 'draft-reveal-types');
  for (const type of pokemon.types ?? []) {
    const pill = createElement('span', 'draft-reveal-type-pill');
    if (draftTypeIcons[type]) {
      const icon = document.createElement('img');
      icon.src = draftTypeIcons[type];
      icon.alt = '';
      pill.append(icon);
    }
    pill.append(document.createTextNode(type));
    types.append(pill);
  }

  const stats = createElement('div', 'draft-reveal-stats');
  for (const [stat, label] of Object.entries(draftStatLabels)) {
    const statCard = createElement('div', 'draft-reveal-stat');
    statCard.append(createElement('span', '', label));
    statCard.append(createElement('strong', '', String(pokemon.baseStats?.[stat] ?? '-')));
    stats.append(statCard);
  }

  const abilities = createElement('div', 'draft-reveal-abilities');
  for (const ability of getRevealAbilities(pokemon)) {
    const abilityCard = createElement('div', `draft-reveal-ability${ability.isPreMegaAbility ? ' is-pre-mega' : ''}`);
    abilityCard.append(createElement('strong', '', ability.name));
    abilityCard.append(createElement('span', '', ability.sourceLabel ?? ability.slot ?? 'Ability'));
    abilities.append(abilityCard);
  }

  info.append(types, stats, abilities);
  content.append(info);
  card.append(header, content);
  overlay.append(card);
  nodes.board.append(overlay);
}

function createRevealIcon(src, label) {
  const icon = document.createElement('img');
  icon.className = 'draft-reveal-icon';
  icon.src = src;
  icon.alt = label;
  icon.title = label;
  return icon;
}

function createRosterCard(player) {
  const card = createElement('article', 'draft-roster-card');
  const currentPlayer = getBoardCurrentPlayer();
  if (player.id === currentPlayer?.id) card.classList.add('is-current');
  if (player.setupPreview) card.classList.add('is-setup-preview');
  if (!player.setupPreview && playerCannotReachNinePokemon(player)) card.classList.add('has-budget-danger');
  if (draftState.phase === 'setup' && draftState.randomizerActiveId === player.id) card.classList.add('is-randomizing');
  if (draftState.phase === 'setup' && draftState.startPlayerId === player.id) card.classList.add('is-start-player');
  const header = createElement('header', 'draft-roster-header');
  const sprite = document.createElement('img');
  sprite.src = player.sprite;
  sprite.alt = `${player.name} Trainer`;
  const title = createElement('div');
  title.append(createElement('h3', '', player.name));
  title.append(createElement('p', '', player.setupPreview ? `${player.nudelsterne} Nudelsterne` : `${getPlayerSpent(player)} / ${getDraftBudget()} Punkte`));
  header.append(sprite, title);
  if (!player.setupPreview && playerEarnsProjectedStar(player)) header.append(createElement('span', 'draft-star', '\u2B50'));
  card.append(header);

  if (player.setupPreview) return card;

  if (playerCannotReachNinePokemon(player)) {
    card.append(createElement('div', 'draft-budget-danger', 'Warnung: 9 Pokemon koennen mit dem Restbudget evtl. nicht mehr erreicht werden.'));
  }

  const badges = createElement('div', 'draft-roster-badges');
  badges.append(createElement('span', '', `${player.nudelsterne} Sterne`));
  badges.append(createElement('span', '', `${player.pokemon.length}/12 Pokemon`));
  badges.append(createElement('span', '', `${getPlayerSlotCount(player)}/14 Slots`));
  card.append(badges);

  const captain = createElement('div', 'draft-captain-row');
  captain.append(createElement('span', '', `Tera: ${player.teraCaptain ? `${getPokemonDisplayName(player.teraCaptain)} ${player.teraType ? `(${player.teraType})` : ''}` : '-'}`));
  captain.append(createElement('span', '', `Z: ${player.zCaptain ? `${getPokemonDisplayName(player.zCaptain)} ${player.zType ? `(${player.zType})` : ''}` : '-'}`));
  card.append(captain);

  const list = createElement('div', 'draft-roster-pokemon');
  for (let index = 0; index < 12; index += 1) {
    const pick = player.pokemon[index] ?? null;
    if (!pick) {
      const empty = createElement('div', 'draft-roster-pick is-empty');
      empty.append(createElement('span', '', `Slot ${index + 1}`));
      list.append(empty);
      continue;
    }
    const pokemon = pokemonByName.get(pick.name);
    const item = createElement('div', 'draft-roster-pick');
    const primaryType = pokemon?.types?.[0] ?? 'Normal';
    const secondaryType = pokemon?.types?.[1] ?? primaryType;
    item.style.setProperty('--pick-type-left', draftTypeColors[primaryType] ?? draftTypeColors.Normal);
    item.style.setProperty('--pick-type-right', draftTypeColors[secondaryType] ?? draftTypeColors[primaryType] ?? draftTypeColors.Normal);
    if (pokemon?.sprite) {
      const image = document.createElement('img');
      image.src = pokemon.sprite;
      image.alt = '';
      image.loading = 'lazy';
      item.append(image);
    }
    item.append(createElement('span', '', `${getPokemonDisplayName(pick.name)} (${pick.cost})`));
    list.append(item);
  }
  card.append(list);
  return card;
}

function render() {
  nodes.app.dataset.view = currentView;
  document.body.classList.toggle('is-board-view', currentView === 'board');
  if (nodes.dismissRevealButton) nodes.dismissRevealButton.hidden = !draftState.latestReveal;
  if (currentView === 'board') {
    nodes.setupPanel.hidden = true;
    nodes.controlPanel.hidden = true;
    nodes.swapPanel.hidden = true;
  } else {
    renderSetup();
    renderControl();
    renderSwap();
  }
  renderBoard();
}

function bindEvents() {
  nodes.format.addEventListener('change', () => {
    draftState.format = nodes.format.value;
    saveDraftState();
  });
  nodes.randomizeOrder.addEventListener('change', () => {
    draftState.randomizeOrder = nodes.randomizeOrder.checked;
    saveDraftState();
  });
  nodes.adminMode.addEventListener('change', renderAdminStars);
  nodes.resetButton.addEventListener('click', resetDraft);
  nodes.resetControlButton.addEventListener('click', resetDraft);
  nodes.randomizeButton.addEventListener('click', randomizeStartPlayer);
  nodes.startButton.addEventListener('click', startDraft);
  nodes.search.addEventListener('input', () => renderPokemonResults(getParticipant(getCurrentPlayerId())));
  nodes.filterType.addEventListener('change', () => renderPokemonResults(getParticipant(getCurrentPlayerId())));
  nodes.filterMaxCost.addEventListener('input', () => renderPokemonResults(getParticipant(getCurrentPlayerId())));
  nodes.filterSpecial.addEventListener('change', () => renderPokemonResults(getParticipant(getCurrentPlayerId())));
  nodes.showIllegal.addEventListener('change', () => renderPokemonResults(getParticipant(getCurrentPlayerId())));
  nodes.finishPlayer.addEventListener('click', finishCurrentPlayer);
  nodes.undoButton.addEventListener('click', restoreUndoState);
  nodes.dismissRevealButton.addEventListener('click', dismissLatestReveal);
  nodes.exportButton.addEventListener('click', exportDraft);
  nodes.boardOpenButton.addEventListener('click', () => window.open('draft-room.html?view=board', '_blank', 'noopener,noreferrer'));
  nodes.swapOwn.addEventListener('change', renderSwapResults);
  nodes.swapSearch.addEventListener('input', renderSwapResults);
  nodes.swapDecline.addEventListener('click', declineSwap);
  channel?.addEventListener('message', (event) => {
    if (event.data?.type !== 'state') return;
    if ((event.data.state?.updatedAt ?? 0) <= (draftState.updatedAt ?? 0)) return;
    draftState = event.data.state;
    render();
  });
  window.addEventListener('storage', (event) => {
    if (event.key !== draftStorageKey || !event.newValue) return;
    const nextState = JSON.parse(event.newValue);
    if ((nextState.updatedAt ?? 0) <= (draftState.updatedAt ?? 0)) return;
    draftState = nextState;
    render();
  });
}

initializePokemonData();
populateDraftFilters();
bindEvents();
render();
window.setInterval(refreshDraftDefenseProfileCells, 2000);

