const typeIcons = {
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

const typeColorVars = {
  Normal: 'var(--normal)',
  Fire: 'var(--fire)',
  Water: 'var(--water)',
  Electric: 'var(--electric)',
  Grass: 'var(--grass)',
  Ice: 'var(--ice)',
  Fighting: 'var(--fighting)',
  Poison: 'var(--poison)',
  Ground: 'var(--ground)',
  Flying: 'var(--flying)',
  Psychic: 'var(--psychic)',
  Bug: 'var(--bug)',
  Rock: 'var(--rock)',
  Ghost: 'var(--ghost)',
  Dragon: 'var(--dragon)',
  Dark: 'var(--dark)',
  Steel: 'var(--steel)',
  Fairy: 'var(--fairy)',
  Stellar: 'var(--accent)',
};

const battleTypes = [
  'Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground',
  'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy',
];

const typeLabelsDe = {
  Normal: 'Normal',
  Fire: 'Feuer',
  Water: 'Wasser',
  Electric: 'Elektro',
  Grass: 'Pflanze',
  Ice: 'Eis',
  Fighting: 'Kampf',
  Poison: 'Gift',
  Ground: 'Boden',
  Flying: 'Flug',
  Psychic: 'Psycho',
  Bug: 'Käfer',
  Rock: 'Gestein',
  Ghost: 'Geist',
  Dragon: 'Drache',
  Dark: 'Unlicht',
  Steel: 'Stahl',
  Fairy: 'Fee',
  Stellar: 'Stellar',
};

const budgetTotalsByFormat = {
  normal: 90,
  'low-power': 75,
  uber: 115,
};

const captainTypeCosts = {
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

const megaIconPath = 'Type Icons/Mega-Entwicklung_Icon.png';
const gmaxIconPath = 'Type Icons/Gigantamax_Icon.png';
const teraIconPath = 'Type Icons/Tera_Icon.png';
const zIconPath = 'Type Icons/Z_Icon.png';
const boosterIconPath = 'Type Icons/booster_icon.png';
const shellIconPath = 'Type Icons/shell.png';
const shedTailIconPath = 'Type Icons/Tail.png';
const lastRespectsIconPath = 'Type Icons/PokeGhost.webp';
const rageFistIconPath = 'Type Icons/Punch.png';
const revivalBlessingIconPath = 'Type Icons/maxrevive.png';
const legendaryIconPath = 'Type Icons/Masterball.png';
const mythicIconPath = 'Type Icons/Cherish Ball.png';

const pokedexGrid = document.querySelector('#pokedex-grid');
const searchInput = document.querySelector('#pokemon-search');
const sortField = document.querySelector('#sort-field');
const sortDirection = document.querySelector('#sort-direction');
const sortFieldSecondary = document.querySelector('#sort-field-secondary');
const sortDirectionSecondary = document.querySelector('#sort-direction-secondary');
const resultsCount = document.querySelector('#results-count');
const searchSummary = document.querySelector('#search-summary');
const template = document.querySelector('#pokemon-card-template');
const formatFilter = document.querySelector('#format-filter');
const searchExpandButton = document.querySelector('#search-expand-button');
const searchAdvancedTools = document.querySelector('#search-advanced-tools');
const triFilterButtons = [...document.querySelectorAll('.tri-filter')];
const hideUnreleased = document.querySelector('#hide-unreleased');
const hideImpossible = document.querySelector('#hide-impossible');
const hideUntiered = document.querySelector('#hide-untiered');
const hideDividers = document.querySelector('#hide-dividers');
const simpleViewToggle = document.querySelector('#simple-view-toggle');
const detailsButton = document.querySelector('#details-search-button');
const expertSearchButton = document.querySelector('#expert-search-button');
const replacementFinderButton = document.querySelector('#replacement-finder-button');
const coreFinderButton = document.querySelector('#core-finder-button');
const budgetPlannerButton = document.querySelector('#budget-planner-button');
const ruleCheckerButton = document.querySelector('#rule-checker-button');
const stefansPdfButton = document.querySelector('#stefans-pdf-button');
const changelogButton = document.querySelector('#changelog-button');
const themeToggle = document.querySelector('#theme-toggle');
const themeToggleMascot = document.querySelector('#theme-toggle-mascot');
const legendButton = document.querySelector('#legend-button');
const scrollTopButton = document.querySelector('#scroll-top-button');
const detailsModal = document.querySelector('#details-modal');
const detailsClose = document.querySelector('#details-close');
const detailsCancel = document.querySelector('#details-cancel');
const detailsReset = document.querySelector('#details-reset');
const detailsSubmit = document.querySelector('#details-submit');
const expertSearchModal = document.querySelector('#expert-search-modal');
const expertSearchClose = document.querySelector('#expert-search-close');
const expertSearchInput = document.querySelector('#expert-search-input');
const expertSearchSubmit = document.querySelector('#expert-search-submit');
const expertSearchClear = document.querySelector('#expert-search-clear');
const expertSearchSyntaxToggle = document.querySelector('#expert-search-syntax-toggle');
const expertSearchSyntax = document.querySelector('#expert-search-syntax');
const expertSearchFeedback = document.querySelector('#expert-search-feedback');
const detailsName = document.querySelector('#details-name');
const coverageList = document.querySelector('#coverage-list');
const statRangeGrid = document.querySelector('#stat-range-grid');
const statSearchMode = document.querySelector('#stat-search-mode');
const defensiveCoverageGrid = document.querySelector('#defensive-coverage-grid');
const speedControlEnabled = document.querySelector('#speed-control-enabled');
const speedControlMode = document.querySelector('#speed-control-mode');
const hazardsEnabled = document.querySelector('#hazards-enabled');
const hazardsMode = document.querySelector('#hazards-mode');
const pivotEnabled = document.querySelector('#pivot-enabled');
const pivotMode = document.querySelector('#pivot-mode');

const abilityInput = document.querySelector('#ability-input');
const abilityMode = document.querySelector('#ability-mode');
const abilityTokenList = document.querySelector('#ability-token-list');
const abilitySuggestions = document.querySelector('#ability-suggestions');
const moveInput = document.querySelector('#move-input');
const moveMode = document.querySelector('#move-mode');
const moveTokenList = document.querySelector('#move-token-list');
const moveSuggestions = document.querySelector('#move-suggestions');
const pokemonDetailModal = document.querySelector('#pokemon-detail-modal');
const pokemonDetailDialog = pokemonDetailModal?.querySelector('.detail-dialog');
const pokemonDetailBody = pokemonDetailModal?.querySelector('.detail-body');
const pokemonDetailClose = document.querySelector('#pokemon-detail-close');
const detailReplacementButton = document.querySelector('#detail-replacement-button');
const detailPrev = document.querySelector('#detail-prev');
const detailPrevSprite = document.querySelector('#detail-prev-sprite');
const detailNext = document.querySelector('#detail-next');
const detailNextSprite = document.querySelector('#detail-next-sprite');
const detailTitle = document.querySelector('#pokemon-detail-title');
const detailTopPanel = document.querySelector('#detail-top-panel');
const detailAbilities = document.querySelector('#detail-abilities');
const detailTierList = document.querySelector('#detail-tier-list');
const detailRibbons = document.querySelector('#detail-ribbons');
const detailFamilyTitle = document.querySelector('#detail-family-title');
const detailFamily = document.querySelector('#detail-family');
const detailDistantRelativesSection = document.querySelector('#detail-distant-relatives-section');
const detailDistantRelatives = document.querySelector('#detail-distant-relatives');
const detailVariations = document.querySelector('#detail-variations');
const detailWeaknessGrid = document.querySelector('#detail-weakness-grid');
const detailMoveSearch = document.querySelector('#detail-move-search');
const detailMoveCategory = document.querySelector('#detail-move-category');
const detailMoveTableBody = document.querySelector('#detail-move-table-body');
const detailSimilarPokemonSection = document.querySelector('#detail-similar-pokemon-section');
const detailSimilarLoadButton = document.querySelector('#detail-similar-load-button');
const detailSimilarPokemon = document.querySelector('#detail-similar-pokemon');
const replacementPickerModal = document.querySelector('#replacement-picker-modal');
const replacementPickerClose = document.querySelector('#replacement-picker-close');
const replacementPickerCancel = document.querySelector('#replacement-picker-cancel');
const replacementPickerSubmit = document.querySelector('#replacement-picker-submit');
const replacementPickerInput = document.querySelector('#replacement-picker-input');
const replacementPickerSuggestions = document.querySelector('#replacement-picker-suggestions');
const replacementFinderModal = document.querySelector('#replacement-finder-modal');
const replacementFinderClose = document.querySelector('#replacement-finder-close');
const replacementTargetPanel = document.querySelector('#replacement-target-panel');
const replacementStatGrid = document.querySelector('#replacement-stat-grid');
const replacementTypes = document.querySelector('#replacement-types');
const replacementAbilities = document.querySelector('#replacement-abilities');
const replacementCost = document.querySelector('#replacement-cost');
const replacementWeatherSection = document.querySelector('#replacement-weather-section');
const replacementWeather = document.querySelector('#replacement-weather');
const replacementDefenses = document.querySelector('#replacement-defenses');
const replacementMoves = document.querySelector('#replacement-moves');
const replacementRunSearch = document.querySelector('#replacement-run-search');
const replacementResultsSection = document.querySelector('#replacement-results-section');
const replacementResults = document.querySelector('#replacement-results');
const stefansPdfModal = document.querySelector('#stefans-pdf-modal');
const stefansPdfClose = document.querySelector('#stefans-pdf-close');
const changelogModal = document.querySelector('#changelog-modal');
const changelogClose = document.querySelector('#changelog-close');
const changelogTabs = [...document.querySelectorAll('.changelog-tab')];
const changelogPanels = [...document.querySelectorAll('.changelog-panel')];
const legendModal = document.querySelector('#legend-modal');
const legendClose = document.querySelector('#legend-close');
const toolHelpToggles = [...document.querySelectorAll('.tool-help-toggle')];
const coreFinderModal = document.querySelector('#core-finder-modal');
const coreFinderClose = document.querySelector('#core-finder-close');
const coreFinderMode = document.querySelector('#core-finder-mode');
const coreFinderPivotChain = document.querySelector('#core-finder-pivot-chain');
const coreFinderSlots = document.querySelector('#core-finder-slots');
const coreFinderResultsSection = document.querySelector('#core-finder-results-section');
const coreFinderResults = document.querySelector('#core-finder-results');
const coreFinderExceptionModal = document.querySelector('#core-finder-exception-modal');
const coreFinderExceptionClose = document.querySelector('#core-finder-exception-close');
const coreFinderExceptionCancel = document.querySelector('#core-finder-exception-cancel');
const coreFinderExceptionSubmit = document.querySelector('#core-finder-exception-submit');
const coreFinderExceptionMessage = document.querySelector('#core-finder-exception-message');
const budgetPlannerModal = document.querySelector('#budget-planner-modal');
const budgetPlannerClose = document.querySelector('#budget-planner-close');
const budgetPlannerFormat = document.querySelector('#budget-planner-format');
const budgetPlannerBudget = document.querySelector('#budget-planner-budget');
const budgetPlannerBudgetRemaining = document.querySelector('#budget-planner-budget-remaining');
const budgetPlannerBudgetTotal = document.querySelector('#budget-planner-budget-total');
const budgetPlannerBudgetMascot = document.querySelector('#budget-planner-budget-mascot');
const budgetPlannerFeedback = document.querySelector('#budget-planner-feedback');
const budgetPlannerSlots = document.querySelector('#budget-planner-slots');
const budgetPlannerStars = document.querySelector('#budget-planner-stars');
const budgetPlannerTypeMatrixWrap = document.querySelector('#budget-planner-type-matrix-wrap');
const budgetPlannerStatMatrixWrap = document.querySelector('#budget-planner-stat-matrix-wrap');
const budgetPlannerFeatureGrid = document.querySelector('#budget-planner-feature-grid');
const budgetPlannerZoomButton = document.querySelector('#budget-planner-zoom-button');
const budgetPlannerCostsButton = document.querySelector('#budget-planner-costs-button');
const budgetPlannerCaptainCostsButton = document.querySelector('#budget-planner-captain-costs-button');
const budgetPlannerZoomModal = document.querySelector('#budget-planner-zoom-modal');
const budgetPlannerZoomClose = document.querySelector('#budget-planner-zoom-close');
const budgetPlannerZoomCancel = document.querySelector('#budget-planner-zoom-cancel');
const budgetPlannerZoomGrid = document.querySelector('#budget-planner-zoom-grid');
const budgetPlannerDownloadPng = document.querySelector('#budget-planner-download-png');
const budgetPlannerCostsModal = document.querySelector('#budget-planner-costs-modal');
const budgetPlannerCostsClose = document.querySelector('#budget-planner-costs-close');
const budgetPlannerCostsCancel = document.querySelector('#budget-planner-costs-cancel');
const budgetPlannerCostsTableWrap = document.querySelector('#budget-planner-costs-table-wrap');
const budgetPlannerDownloadText = document.querySelector('#budget-planner-download-text');
const budgetPlannerCaptainCostsModal = document.querySelector('#budget-planner-captain-costs-modal');
const budgetPlannerCaptainCostsClose = document.querySelector('#budget-planner-captain-costs-close');
const budgetPlannerCaptainCostsCancel = document.querySelector('#budget-planner-captain-costs-cancel');
const budgetPlannerCaptainCostsText = document.querySelector('#budget-planner-captain-costs-text');
const ruleCheckerModal = document.querySelector('#rule-checker-modal');
const ruleCheckerClose = document.querySelector('#rule-checker-close');
const ruleCheckerFormat = document.querySelector('#rule-checker-format');
const ruleCheckerImportBudget = document.querySelector('#rule-checker-import-budget');
const ruleCheckerPickerInput = document.querySelector('#rule-checker-picker-input');
const ruleCheckerPickerSuggestions = document.querySelector('#rule-checker-picker-suggestions');
const ruleCheckerRoster = document.querySelector('#rule-checker-roster');
const ruleCheckerTeamGrid = document.querySelector('#rule-checker-team-grid');
const ruleCheckerValidate = document.querySelector('#rule-checker-validate');
const ruleCheckerResultsSection = document.querySelector('#rule-checker-results-section');
const ruleCheckerResults = document.querySelector('#rule-checker-results');
const speedTiersButton = document.querySelector('#speed-tiers-button');
const speedTiersModal = document.querySelector('#speed-tiers-modal');
const speedTiersClose = document.querySelector('#speed-tiers-close');
const speedTiersPickerInput = document.querySelector('#speed-tiers-picker-input');
const speedTiersPickerSuggestions = document.querySelector('#speed-tiers-picker-suggestions');
const speedTiersScarf = document.querySelector('#speed-tiers-scarf');
const speedTiersTailwind = document.querySelector('#speed-tiers-tailwind');
const speedTiersTrickRoom = document.querySelector('#speed-tiers-trick-room');
const speedTiersWeather = document.querySelector('#speed-tiers-weather');
const speedTiersOwnTeam = document.querySelector('#speed-tiers-own-team');
const speedTiersEnemyTeam = document.querySelector('#speed-tiers-enemy-team');
const speedTiersRanks = document.querySelector('#speed-tiers-ranks');
const speedTiersGapModal = document.querySelector('#speed-tiers-gap-modal');
const speedTiersGapClose = document.querySelector('#speed-tiers-gap-close');
const speedTiersGapPokemon = document.querySelector('#speed-tiers-gap-pokemon');
const speedTiersGapResults = document.querySelector('#speed-tiers-gap-results');

const triStateOrder = ['any', 'include', 'exclude'];
const detailSubtitleByName = new Map([
  ['Nihilego', 'UB-01 Symbiont'],
  ['Buzzwole', 'UB-02 Absorption'],
  ['Pheromosa', 'UB-02 Beauty'],
  ['Xurkitree', 'UB-03 Lightning'],
  ['Celesteela', 'UB-04 Blaster'],
  ['Kartana', 'UB-04 Blade'],
  ['Guzzlord', 'UB-05 Glutton'],
  ['Poipole', 'UB Adhesive'],
  ['Naganadel', 'UB Stinger'],
  ['Stakataka', 'UB Assembly'],
  ['Blacephalon', 'UB Burst'],
  ['Koraidon', 'Winged King'],
  ['Miraidon', 'Iron Serpent'],
]);
const legendaryTagSpecies = new Set([
  'Articuno',
  'Zapdos',
  'Moltres',
  'Raikou',
  'Entei',
  'Suicune',
  'Regirock',
  'Regice',
  'Registeel',
  'Latias',
  'Latios',
  'Uxie',
  'Mesprit',
  'Azelf',
  'Heatran',
  'Regigigas',
  'Cresselia',
  'Cobalion',
  'Terrakion',
  'Virizion',
  'Tornadus',
  'Thundurus',
  'Landorus',
  'Type: Null',
  'Silvally',
  'Tapu Koko',
  'Tapu Lele',
  'Tapu Bulu',
  'Tapu Fini',
  'Nihilego',
  'Buzzwole',
  'Pheromosa',
  'Xurkitree',
  'Celesteela',
  'Kartana',
  'Guzzlord',
  'Poipole',
  'Naganadel',
  'Stakataka',
  'Blacephalon',
  'Kubfu',
  'Urshifu',
  'Regieleki',
  'Regidrago',
  'Glastrier',
  'Spectrier',
  'Enamorus',
  'Wo-Chien',
  'Chien-Pao',
  'Ting-Lu',
  'Chi-Yu',
  'Okidogi',
  'Munkidori',
  'Fezandipiti',
  'Ogerpon',
  'Mewtwo',
  'Lugia',
  'Ho-Oh',
  'Kyogre',
  'Groudon',
  'Rayquaza',
  'Dialga',
  'Palkia',
  'Giratina',
  'Reshiram',
  'Zekrom',
  'Kyurem',
  'Xerneas',
  'Yveltal',
  'Zygarde',
  'Cosmog',
  'Cosmoem',
  'Solgaleo',
  'Lunala',
  'Necrozma',
  'Zacian',
  'Zamazenta',
  'Eternatus',
  'Calyrex',
  'Koraidon',
  'Miraidon',
  'Terapagos',
]);
const mythicTagSpecies = new Set([
  'Mew',
  'Celebi',
  'Jirachi',
  'Deoxys',
  'Phione',
  'Manaphy',
  'Darkrai',
  'Shaymin',
  'Arceus',
  'Victini',
  'Keldeo',
  'Meloetta',
  'Genesect',
  'Diancie',
  'Hoopa',
  'Volcanion',
  'Magearna',
  'Marshadow',
  'Zeraora',
  'Meltan',
  'Melmetal',
  'Zarude',
  'Pecharunt',
]);
const customCostOverrides = new Map([
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
const customRibbonEntriesByName = new Map([
  ['Wormadam', [{ symbol: 'i', text: 'Das Draften dieses Pokémon umfasst alle Formen.' }]],
  ['Eevee-Z', [{ icon: zIconPath, text: 'Darf nicht Extreme-Evoboost als Z-Attacke nutzen!', warning: true }]],
]);
const toolHelpContentById = {
  'replacement-finder-help': [
    'Suche Ersatz für [selected Pokémon]. Clicke auf Basiswerte, Typen (unten), Fähigkeit, Kosten, Wetter, Element Defensive und/oder Attacken um diese als niedrige Priorität auszuwählen. Klicke eins davon nochmal um die Priorität auf mittel oder hoch zu erhöhen und ein viertes Mal um sie abzuwählen. Drücke dann auf den leuchtenden "Suchen" button in der Anleitung, und das Tool versucht dir ein Ähnliches Pokémon zu suchen.',
    'Was genau die Priorität aussagt, findest du in den einzelnen Abschnitten. Für weitere Hinweise siehe den Abschnitt "Anleitung". Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'core-finder-help': [
    'Dieses Tool sucht dir anhand einer unvollständigen Gruppe an Pokémon eines oder zwei raus, damit du für möglichst viele offensive Typen einen Switch-In hast.',
    'Du kannst entweder einen Dreier-Core mit einem, oder einen Vierer-Core mit bis zu zwei Pokémon vervollständigen lassen. Wenn du "Pivot-Chain" aktivierst, versucht das Tool zu erzwingen, dass alle Pokemon Voltswitch, U-Turn, Parting Shot, etc haben.',
    'Falls deine vor-eingestellten Pokémon keinen perfekten Core zulassen, wird dich das Tool warnen, du kannst aber mit den gewählten Pokémon trotzdem nach dem bestmöglichen Core suchen.',
    'Bedenke: Das Tool zieht auch Fähigkeiten in Betracht! Bronzong wird als 0x Boden angezeigt, in der Annahme dass es dabei Levitate als Fähigkeit nutzt. Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'budget-planner-help': [
    'Wähle aus, welches Format du spielst und wähle dann in "Team" aus, welche Pokémon du haben möchtest und ob es ein Z/Tera-Captain sein soll und welcher Typ. Unter "Planung" siehst du, wie viele Punkte du noch zur Verfügung hast, sowie deine Defensive Coverage und die Werte. Unter "Team Checks" sind ein paar Checks gelistet wie Hazard Removal oder Speed Control, die man evtl im Team haben möchte - diese sind nur als Hilfe gegeben, du musst hier nichts erfüllen.',
    'Wenn du fertig bist kannst du über die Kosten-Tabelle eine Text-Datei des geplanted Drafts ansehen und runterladen, oder unter Zoom eine hübschere Ansicht des Teams sehen (wenn du diese Runterlädst werden die Sprites allerdings nicht angezeigt). Unter Captain Cost kannst du jederzeit die Kosten für Tera und Z-Steine ansehen. Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'rule-checker-help': [
    'Gib unter "Pokémon Pool" dein gewünschtes Format ein und importiere entweder das Team, dass du zuletzt im Budget Planer offen hattest (Seite schließen löscht das Team hier), oder gib deinen Draft in der Zeile "Pokémon hinzufügen" ein. Danach kannst du bei "Set Vorschau" Pokémon aus deinem Draft per Drop-Down auswählen und ihre Sets eingeben. Wenn du dann auf Leglität Prüfen klickst, zeigt dir der Checker eventuelle Regelverstöße an.',
    'Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'speed-tiers-help': [
    'Füge die Pokémon unter "Pokémon hinzufügen" hinzu, die du vergleichen willst. Diese werden standardmäßig unter Own Team gelistet, über den Pfeil nach rechts kannst du sie auf das andere Team verschieben (das ändert nur die Farbe in der Liste unten für bessere Übersicht, es hat keinen Einfluss auf die Berechnung).',
    'Das Ranking zeigt dir dann für alle gewählten Pokémon ein Set mit minimalem Speed, neutralem Wesen und maximalem Speed an. Pro Pokémon kannst du die Speed-Werte um -6 bis +6 ändern. Im "Vergleich" kannst du auch Scarf, Tailwind, Trickroom und Wetter anstellen. Dieses fügt Sets mit diesen Faktoren für alle Pokémon dem Ranking hinzu.',
    'Wenn du auf eines der + klickst, zeigt dir das Tool alle Sets des gewählten Pokémon, mit dem es hier outspeeden kann (wenn du Trick Room aktiviert hast auch wie es "out-slowen" kann). Das Tool schaut rein auf Werte, es kann dir also auch Extremfälle wie Scarf Trick Room anzeigen!',
    'Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'stefans-pdf-help': [
    'Hier kannst du Stefans originale Pdf ansehen, indem die Regeln des Punkte-Systems und die Punkte-Tiers angezeigt werden. Du kannst die Pdf auch herunterladen.',
  ],
};
customRibbonEntriesByName.set('Wormadam', [{ symbol: 'i', text: 'Das Draften dieses Pok\u00e9mon umfasst alle Formen.' }]);
Object.assign(toolHelpContentById, {
  'replacement-finder-help': [
    'Suche Ersatz f\u00fcr [selected Pok\u00e9mon]. Clicke auf Basiswerte, Typen (unten), F\u00e4higkeit, Kosten, Wetter, Element Defensive und/oder Attacken um diese als niedrige Priorit\u00e4t auszuw\u00e4hlen. Klicke eins davon nochmal um die Priorit\u00e4t auf mittel oder hoch zu erh\u00f6hen und ein viertes Mal um sie abzuw\u00e4hlen. Dr\u00fccke dann auf den leuchtenden "Suchen" button in der Anleitung, und das Tool versucht dir ein \u00c4hnliches Pok\u00e9mon zu suchen.',
    'Was genau die Priorit\u00e4t aussagt, findest du in den einzelnen Abschnitten. F\u00fcr weitere Hinweise siehe den Abschnitt "Anleitung". Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'core-finder-help': [
    'Dieses Tool sucht dir anhand einer unvollst\u00e4ndigen Gruppe an Pok\u00e9mon eines oder zwei raus, damit du f\u00fcr m\u00f6glichst viele offensive Typen einen Switch-In hast.',
    'Du kannst entweder einen Dreier-Core mit einem, oder einen Vierer-Core mit bis zu zwei Pok\u00e9mon vervollst\u00e4ndigen lassen. Wenn du "Pivot-Chain" aktivierst, versucht das Tool zu erzwingen, dass alle Pokemon Voltswitch, U-Turn, Parting Shot, etc haben.',
    'Falls deine vor-eingestellten Pok\u00e9mon keinen perfekten Core zulassen, wird dich das Tool warnen, du kannst aber mit den gew\u00e4hlten Pok\u00e9mon trotzdem nach dem bestm\u00f6glichen Core suchen.',
    'Bedenke: Das Tool zieht auch F\u00e4higkeiten in Betracht! Bronzong wird als 0x Boden angezeigt, in der Annahme dass es dabei Levitate als F\u00e4higkeit nutzt. Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'budget-planner-help': [
    'W\u00e4hle aus, welches Format du spielst und w\u00e4hle dann in "Team" aus, welche Pok\u00e9mon du haben m\u00f6chtest und ob es ein Z/Tera-Captain sein soll und welcher Typ. Unter "Planung" siehst du, wie viele Punkte du noch zur Verf\u00fcgung hast, sowie deine Defensive Coverage und die Werte. Unter "Team Checks" sind ein paar Checks gelistet wie Hazard Removal oder Speed Control, die man evtl im Team haben m\u00f6chte - diese sind nur als Hilfe gegeben, du musst hier nichts erf\u00fcllen.',
    'Wenn du fertig bist kannst du \u00fcber die Kosten-Tabelle eine Text-Datei des geplanted Drafts ansehen und runterladen, oder unter Zoom eine h\u00fcbschere Ansicht des Teams sehen (wenn du diese Runterl\u00e4dst werden die Sprites allerdings nicht angezeigt). Unter Captain Cost kannst du jederzeit die Kosten f\u00fcr Tera und Z-Steine ansehen. Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'rule-checker-help': [
    'Gib unter "Pok\u00e9mon Pool" dein gew\u00fcnschtes Format ein und importiere entweder das Team, dass du zuletzt im Budget Planer offen hattest (Seite schlie\u00dfen l\u00f6scht das Team hier), oder gib deinen Draft in der Zeile "Pok\u00e9mon hinzuf\u00fcgen" ein. Danach kannst du bei "Set Vorschau" Pok\u00e9mon aus deinem Draft per Drop-Down ausw\u00e4hlen und ihre Sets eingeben. Wenn du dann auf Leglit\u00e4t Pr\u00fcfen klickst, zeigt dir der Checker eventuelle Regelverst\u00f6\u00dfe an.',
    'Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'speed-tiers-help': [
    'F\u00fcge die Pok\u00e9mon unter "Pok\u00e9mon hinzuf\u00fcgen" hinzu, die du vergleichen willst. Diese werden standardm\u00e4\u00dfig unter Own Team gelistet, \u00fcber den Pfeil nach rechts kannst du sie auf das andere Team verschieben (das \u00e4ndert nur die Farbe in der Liste unten f\u00fcr bessere \u00dcbersicht, es hat keinen Einfluss auf die Berechnung).',
    'Das Ranking zeigt dir dann f\u00fcr alle gew\u00e4hlten Pok\u00e9mon ein Set mit minimalem Speed, neutralem Wesen und maximalem Speed an. Pro Pok\u00e9mon kannst du die Speed-Werte um -6 bis +6 \u00e4ndern. Im "Vergleich" kannst du auch Scarf, Tailwind, Trickroom und Wetter anstellen. Dieses f\u00fcgt Sets mit diesen Faktoren f\u00fcr alle Pok\u00e9mon dem Ranking hinzu.',
    'Wenn du auf eines der + klickst, zeigt dir das Tool alle Sets des gew\u00e4hlten Pok\u00e9mon, mit dem es hier outspeeden kann (wenn du Trick Room aktiviert hast auch wie es "out-slowen" kann). Das Tool schaut rein auf Werte, es kann dir also auch Extremf\u00e4lle wie Scarf Trick Room anzeigen!',
    'Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
});
const tierChangelogEntries = [
  ['Carkol', '1', '2', 'Punktekosten angepasst'],
  ['Eevee', '1', '4', 'Bestehende Version angepasst'],
  ['Eevee', 'Neu', '1', 'Neue Version mit Z-Hinweis'],
  ['Munchlax', '4', '3', 'Punktekosten angepasst'],
  ['Houndstone', '6', '7', 'Punktekosten angepasst'],
  ['Magmortar', '6', '7', 'Punktekosten angepasst'],
  ['Malamar', '6', '7', 'Punktekosten angepasst'],
  ['Tauros', '7', '8', 'Punktekosten angepasst'],
  ['Tauros-Paldea-Combat', '7', '8', 'Punktekosten angepasst'],
  ['Zangoose', '7', '8', 'Punktekosten angepasst'],
  ['Flamigo', '8', '9', 'Punktekosten angepasst'],
  ['Medicham', '8', '9', 'Punktekosten angepasst'],
  ['Mismagius', '7', '9', 'Punktekosten angepasst'],
  ['Slowbro-Galar', '9', '11', 'Punktekosten angepasst'],
  ['Tauros-Paldea-Blaze', '8', '9', 'Punktekosten angepasst'],
  ['Tauros-Paldea-Aqua', '9', '10', 'Punktekosten angepasst'],
  ['Lucario', '10', '11', 'Punktekosten angepasst'],
  ['Sinistcha', '10', '11', 'Punktekosten angepasst'],
  ['Blastoise', '13', '12', 'Punktekosten angepasst'],
  ['Garganacl', '12', '13', 'Punktekosten angepasst'],
  ['Heracross', '12', '13', 'Punktekosten angepasst'],
  ['Staraptor', '12', '13', 'Punktekosten angepasst'],
  ['Zoroark-Hisui', '12', '13', 'Punktekosten angepasst'],
  ['Darmanitan', '13', '14', 'Punktekosten angepasst'],
  ['Amoonguss', '—', '14', 'Neu bepreist'],
  ['Blastoise-Mega', 'Neu', '—', 'Neue untiered Version mit Shell Smash'],
  ['Ferrothorn', '—', '15', 'Neu bepreist'],
  ['Thundurus-Incarnate', '—', '15', 'Neu bepreist'],
  ['Gliscor', '19', '18', 'Punktekosten angepasst'],
  ['Blaziken', 'Neu', '19', 'Neue Version mit erlaubtem Speed Boost'],
];
const meta = window.POKEDEX_META ?? { abilities: [], moves: [], movesById: {} };
const abilityOptions = (meta.abilities ?? []).map((name) => ({ id: normalizeText(name), name }));
const moveOptions = meta.moves ?? [];
const moveDetailsById = meta.movesById ?? {};
const statLabels = {
  hp: 'KP',
  atk: 'Angriff',
  def: 'Verteidigung',
  spa: 'Spez. Angriff',
  spd: 'Spez. Vert',
  spe: 'Initiative',
};
const defaultRealStatOptions = {
  level: 100,
  iv: 31,
  ev: 0,
  nature: 1,
};
const pokedexGenerationDividers = [
  {
    id: 'gen1',
    name: 'Generation 1',
    icon: 'assets/icons8-game-boy-48.png',
    start: 'Bulbasaur',
    end: 'Mew',
    startNum: 1,
    endNum: 151,
    themeClass: 'divider-gen1',
  },
  {
    id: 'gen2',
    name: 'Generation 2',
    icon: 'assets/icons8-game-boy-48.png',
    start: 'Chikorita',
    end: 'Celebi',
    startNum: 152,
    endNum: 251,
    themeClass: 'divider-gen2',
  },
  {
    id: 'gen3',
    name: 'Generation 3',
    icon: 'assets/icons8-gameboy-advance-konsole-48.png',
    start: 'Treecko',
    end: 'Deoxys-Speed',
    startNum: 252,
    endNum: 386,
    themeClass: 'divider-gen3',
  },
  {
    id: 'gen4',
    name: 'Generation 4',
    icon: 'assets/icons8-ds-konsole-48.png',
    start: 'Turtwig',
    end: 'Arceus',
    startNum: 387,
    endNum: 493,
    themeClass: 'divider-gen4',
  },
  {
    id: 'gen5',
    name: 'Generation 5',
    icon: 'assets/icons8-ds-konsole-48.png',
    start: 'Victini',
    end: 'Genesect',
    startNum: 494,
    endNum: 649,
    themeClass: 'divider-gen5',
  },
  {
    id: 'gen6',
    name: 'Generation 6',
    icon: 'assets/icons8-3ds-48.png',
    start: 'Chespin',
    end: 'Volcanion',
    startNum: 650,
    endNum: 721,
    themeClass: 'divider-gen6',
  },
  {
    id: 'gen7',
    name: 'Generation 7',
    icon: 'assets/icons8-3ds-48.png',
    start: 'Rowlet',
    end: 'Zeraora',
    startNum: 722,
    endNum: 807,
    themeClass: 'divider-gen7',
  },
  {
    id: 'gen8',
    name: 'Generation 8',
    icon: 'assets/icons8-nintendo-switch-handheld-48.png',
    start: 'Meltan',
    end: 'Enamorus-Therian',
    startNum: 808,
    endNum: 905,
    themeClass: 'divider-gen8',
  },
  {
    id: 'gen9',
    name: 'Generation 9',
    icon: 'assets/icons8-nintendo-switch-handheld-48.png',
    start: 'Sprigatito',
    end: 'Pecharunt',
    startNum: 906,
    endNum: 1025,
    themeClass: 'divider-gen9',
  },
];

function normalizeRealStatOptions(options = {}) {
  return {
    level: Number.isFinite(options.level) ? options.level : defaultRealStatOptions.level,
    iv: Number.isFinite(options.iv) ? options.iv : defaultRealStatOptions.iv,
    ev: Number.isFinite(options.ev) ? options.ev : defaultRealStatOptions.ev,
    nature: Number.isFinite(options.nature) ? options.nature : defaultRealStatOptions.nature,
  };
}

function calculateRealHp(baseStat, options = {}) {
  const { level, iv, ev } = normalizeRealStatOptions(options);
  return Math.floor((((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + level + 10);
}

function calculateRealOtherStat(baseStat, options = {}) {
  const { level, iv, ev, nature } = normalizeRealStatOptions(options);
  return Math.floor(((((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5) * nature);
}

function calculateRealStats(baseStats = {}, optionsByStat = {}) {
  return {
    hp: calculateRealHp(baseStats.hp ?? 0, optionsByStat.hp ?? optionsByStat.default ?? {}),
    atk: calculateRealOtherStat(baseStats.atk ?? 0, optionsByStat.atk ?? optionsByStat.default ?? {}),
    def: calculateRealOtherStat(baseStats.def ?? 0, optionsByStat.def ?? optionsByStat.default ?? {}),
    spa: calculateRealOtherStat(baseStats.spa ?? 0, optionsByStat.spa ?? optionsByStat.default ?? {}),
    spd: calculateRealOtherStat(baseStats.spd ?? 0, optionsByStat.spd ?? optionsByStat.default ?? {}),
    spe: calculateRealOtherStat(baseStats.spe ?? 0, optionsByStat.spe ?? optionsByStat.default ?? {}),
  };
}

function getRealStatRange(baseStat, stat) {
  if (stat === 'hp') {
    return {
      min: calculateRealHp(baseStat, { level: 100, iv: 0, ev: 0 }),
      max: calculateRealHp(baseStat, { level: 100, iv: 31, ev: 252 }),
    };
  }
  return {
    min: calculateRealOtherStat(baseStat, { level: 100, iv: 0, ev: 0, nature: 0.9 }),
    max: calculateRealOtherStat(baseStat, { level: 100, iv: 31, ev: 252, nature: 1.1 }),
  };
}

function getPokemonRealStatRanges(pokemon) {
  return Object.fromEntries(
    Object.keys(statLabels).map((stat) => {
      const baseStat = pokemon.baseStats?.[stat] ?? 0;
      return [stat, getRealStatRange(baseStat, stat)];
    }),
  );
}

function formatRealStatRange(range) {
  return `(${range.min}-${range.max})`;
}

const speedTierStageMultipliers = {
  '-6': 3 / 9,
  '-5': 3 / 8,
  '-4': 3 / 7,
  '-3': 3 / 6,
  '-2': 3 / 5,
  '-1': 3 / 4,
  0: 1,
  1: 4 / 3,
  2: 5 / 3,
  3: 6 / 3,
  4: 7 / 3,
  5: 8 / 3,
  6: 9 / 3,
};

const speedTierWeatherConfigs = {
  sun: { ability: 'Chlorophyll', emoji: '☀️' },
  rain: { ability: 'Swift Swim', emoji: '🌧️' },
  hail: { ability: 'Slush Rush', emoji: '❄️' },
  snow: { ability: 'Slush Rush', emoji: '❄️' },
  sand: { ability: 'Sand Rush', emoji: '🌪️' },
};

const moveMethodIcons = [
  { key: 'L', emoji: '🍬', title: 'Level-Up' },
  { key: 'E', emoji: '🥚', title: 'Zucht' },
  { key: 'S', emoji: '🎉', title: 'Event' },
  { key: 'M', emoji: '💿', title: 'TM/VM' },
  { key: 'T', emoji: '📎', title: 'Tutor' },
  { key: 'V', emoji: '👾', title: 'Virtual Console' },
];
const abilityRuleMap = {
  'Sand Veil': { severity: 'illegal', text: 'Fluchtwerts-Clause: Evasion erhöhen ist nicht erlaubt.' },
  'Snow Cloak': { severity: 'illegal', text: 'Fluchtwerts-Clause: Evasion erhöhen ist nicht erlaubt.' },
  Static: { severity: 'illegal', text: 'Paralyse-Clause, absichtliche Para ist nicht erlaubt.' },
};
const moveRuleMap = {
  doubleteam: { severity: 'illegal', text: 'Fluchtwerts-Clause: Evasion erhöhen ist nicht erlaubt.' },
  minimize: { severity: 'illegal', text: 'Fluchtwerts-Clause: Evasion erhöhen ist nicht erlaubt.' },
  flash: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  kinesis: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  leaftornado: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  mirrorshot: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  mudbomb: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  mudslap: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  muddywater: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  nightdaze: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  octazooka: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  sandattack: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  secretpower: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  smokescreen: { severity: 'illegal', text: 'Genauigkeits-Clause: Accuracy senken ist nicht erlaubt.' },
  guillotine: { severity: 'illegal', text: 'OHKO Clause, One-Hit KO Attacken sind nicht erlaubt.' },
  horndrill: { severity: 'illegal', text: 'OHKO Clause, One-Hit KO Attacken sind nicht erlaubt.' },
  fissure: { severity: 'illegal', text: 'OHKO Clause, One-Hit KO Attacken sind nicht erlaubt.' },
  sheercold: { severity: 'illegal', text: 'OHKO Clause, One-Hit KO Attacken sind nicht erlaubt.' },
  thunderwave: { severity: 'illegal', text: 'Paralyse-Clause, absichtliche Para ist nicht erlaubt.' },
  glare: { severity: 'illegal', text: 'Paralyse-Clause, absichtliche Para ist nicht erlaubt.' },
  stunspore: { severity: 'illegal', text: 'Paralyse-Clause, absichtliche Para ist nicht erlaubt.' },
  discharge: { severity: 'warning', text: 'Vorsicht: Zweites Gegnermon mit diesen Attacken paralysieren ist ein Regelverstoß (Para-Clause)' },
  zapcannon: { severity: 'warning', text: 'Vorsicht: Zweites Gegnermon mit diesen Attacken paralysieren ist ein Regelverstoß (Para-Clause)' },
  confuseray: { severity: 'illegal', text: 'Verwirrungs-Clause: Absichtliche Verwirrung ist nicht erlaubt.' },
  flatter: { severity: 'illegal', text: 'Verwirrungs-Clause: Absichtliche Verwirrung ist nicht erlaubt.' },
  supersonic: { severity: 'illegal', text: 'Verwirrungs-Clause: Absichtliche Verwirrung ist nicht erlaubt.' },
  swagger: { severity: 'illegal', text: 'Verwirrungs-Clause: Absichtliche Verwirrung ist nicht erlaubt.' },
  sweetkiss: { severity: 'illegal', text: 'Verwirrungs-Clause: Absichtliche Verwirrung ist nicht erlaubt.' },
  teeterdance: { severity: 'illegal', text: 'Verwirrungs-Clause: Absichtliche Verwirrung ist nicht erlaubt.' },
  direclaw: { severity: 'illegal', text: 'Dire Claw ist nicht erlaubt.' },
  lastrespects: { severity: 'illegal', text: 'Last Respects ist nicht erlaubt.' },
};

const shellSmashAllowedPokemon = new Set([
  'Clamperl',
  'Magcargo',
  'Crustle',
  'Carracosta',
  'Gorebyss',
  'Huntail',
  'Turtonator',
  'Omastar',
  'Barbaracle',
  'Drednaw',
  'Cloyster',
  'Polteageist',
  'Torterra',
  'Torkoal',
  'Blastoise',
  'Blastoise-Mega-Shell-Smash',
  'Shuckle',
]);

function pokemonHasTag(pokemon, tag) {
  return Array.isArray(pokemon?.tags) && pokemon.tags.includes(tag);
}

function pokemonMatchesTaggedSpecies(pokemon, speciesSet) {
  if (!pokemon || !speciesSet) return false;
  return speciesSet.has(pokemon.name) ||
    speciesSet.has(pokemon.baseSpecies ?? '') ||
    speciesSet.has(pokemon.changesFrom ?? '');
}

const themeStorageKey = 'friendly-pokemon-theme';
const themeMascotByMode = {
  light: {
    src: 'https://play.pokemonshowdown.com/sprites/gen5/solrock.png',
    alt: 'Solrock icon',
  },
  dark: {
    src: 'https://play.pokemonshowdown.com/sprites/gen5/lunatone.png',
    alt: 'Lunatone icon',
  },
};
const distantRelativeGroups = [
  ['Iron Crown', 'Cobalion'],
  ['Iron Boulder', 'Terrakion'],
  ['Raging Bolt', 'Raikou'],
  ['Gouging Fire', 'Entei'],
  ['Sinistcha', 'Sinistea', 'Polteageist'],
  ['Iron Leaves', 'Virizion'],
  ['Walking Wake', 'Suicune'],
  ['Koraidon', 'Cyclizar'],
  ['Miraidon', 'Cyclizar'],
  ['Iron Valiant', 'Gallade', 'Gardevoir'],
  ['Roaring Moon', 'Salamence'],
  ['Iron Thorns', 'Tyranitar'],
  ['Iron Moth', 'Volcarona', 'Slither Wing'],
  ['Iron Jugulis', 'Hydreigon'],
  ['Iron Hands', 'Hariyama'],
  ['Iron Bundle', 'Delibird'],
  ['Iron Treads', 'Donphan', 'Great Tusk'],
  ['Sandy Shocks', 'Magneton'],
  ['Slither Wing', 'Volcarona'],
  ['Flutter Mane', 'Misdreavus'],
  ['Brute Bonnet', 'Amoonguss'],
  ['Scream Tail', 'Jigglypuff'],
  ['Great Tusk', 'Donphan'],
  ['Clodsire', 'Quagsire'],
  ['Wugtrio', 'Dugtrio', 'Dugtrio-Alola'],
  ['Toedscruel', 'Tentacruel'],
  ['Toedscool', 'Tentacool'],
  ['Overqwil', 'Qwilfish'],
  ['Enamorus', 'Landorus', 'Tornadus', 'Thundurus'],
  ['Enamorus-Therian', 'Landorus-Therian', 'Tornadus-Therian', 'Thundurus-Therian'],
  ['Calyrex-Ice', 'Glastrier'],
  ['Calyrex-Shadow', 'Spectrier'],
  ['Regidrago', 'Regice', 'Regirock', 'Registeel', 'Regieleki'],
  ['Zacian', 'Zamazenta'],
  ['Zacian-Crowned', 'Zamazenta-Crowned'],
  ['Arctozolt', 'Dracozolt', 'Arctovish'],
  ['Dracozolt', 'Dracovish', 'Arctozolt'],
  ['Dracovish', 'Arctovish', 'Dracozolt'],
  ['Arctovish', 'Dracovish', 'Arctozolt'],
  ['Mr. Rime', 'Mr. Mime'],
  ['Sirfetch\'d', 'Farfetch\'d'],
  ['Cursola', 'Corsola'],
  ['Perrserker', 'Meowth', 'Meowth-Alola', 'Persian', 'Persian-Alola', 'Meowth-Galar'],
  ['Runerigus', 'Cofagrigus', 'Yamask', 'Yamask-Galar'],
  ['Obstagoon', 'Zigzagoon', 'Linoone'],
  ['Cramorant', 'Arrokuda', 'Pikachu'],
  ['Tapu Koko', 'Tapu Lele', 'Tapu Bulu', 'Tapu Fini'],
  ['Kyurem-Black', 'Zekrom'],
  ['Kyurem-White', 'Reshiram'],
  ['Cobalion', 'Terrakion', 'Virizion', 'Keldeo'],
  ['Sawk', 'Throh'],
  ['Simisage', 'Simisear', 'Simipour'],
  ['Darkrai', 'Cresselia'],
  ['Dialga', 'Palkia'],
  ['Dialga-Origin', 'Palkia-Origin'],
  ['Uxie', 'Mesprit', 'Azelf'],
  ['Raikou', 'Suicune', 'Entei'],
  ['Articuno', 'Moltres', 'Zapdos'],
  ['Articuno-Galar', 'Moltres-Galar', 'Zapdos-Galar'],
  ['Miltank', 'Tauros', 'Tauros-Paldea-Combat', 'Tauros-Paldea-Blaze', 'Tauros-Paldea-Aqua'],
  ['Gengar', 'Clefairy'],
  ['Slowbro', 'Shellder'],
];
const sereneGraceFlinchMoves = new Set([
  'airslash', 'astonish', 'bite', 'darkpulse', 'doubleironbash', 'dragonrush', 'fierywrath',
  'floatyfall', 'headbutt', 'heartstamp', 'iciclecrash', 'ironhead', 'lowkick', 'mountaingale',
  'needlearm', 'rockslide', 'rollingkick', 'secretpower', 'skyattack', 'snore', 'steamroller',
  'stomp', 'triplearrows', 'twister', 'waterfall', 'zenheadbutt', 'zingzap',
]);
const ruleCheckerDelegatorHealingAbilities = new Set([
  'regenerator', 'cheekpouch', 'poisonheal', 'raindish', 'voltabsorb', 'waterabsorb', 'icebody',
]);
const ruleCheckerDelegatorHealingMoves = new Set([
  'aquaring', 'floralhealing', 'grassyterrain', 'ingrain', 'leechseed', 'lifedew', 'painsplit', 'wish',
  'healorder', 'milkdrink', 'moonlight', 'morningsun', 'recover', 'rest', 'roost', 'shoreup',
  'slackoff', 'softboiled', 'strengthsap', 'synthesis', 'absorb', 'bitterblade', 'bouncybubble',
  'darkvoid', 'drainpunch', 'drainingkiss', 'dreameater', 'gigadrain', 'hornleech', 'leechlife',
  'matchagotcha', 'megadrain', 'oblivionwing', 'paraboliccharge',
]);
const ruleCheckerDelegatorSetupMoves = new Set([
  'acupressure', 'bellydrum', 'bulkup', 'clangoroussoul', 'coil', 'dragondance', 'fellstinger', 'filletaway',
  'growth', 'honeclaws', 'howl', 'meditate', 'metalclaw', 'meteormash', 'noretreat', 'orderup',
  'poweruppunch', 'rage', 'sharpen', 'shellsmash', 'shiftgear', 'silverwind', 'swordsdance',
  'tidyup', 'victorydance', 'workup', 'acidarmor', 'barrier', 'cosmicpower', 'cottonguard',
  'defendorder', 'defensecurl', 'diamondstorm', 'flowershield', 'harden', 'irondefense', 'psyshieldbash',
  'shelter', 'skullbash', 'steelwing', 'stockpile', 'stuffcheeks', 'withdraw', 'amnesia', 'calmmind',
  'chargebeam', 'electroshot', 'fierydance', 'geomancy', 'meteorbeam', 'mysticalpower', 'nastyplot',
  'quiverdance', 'tailglow', 'takeheart', 'torchsong', 'aromaticmist', 'charge', 'agility', 'aurawheel',
  'aquastep', 'autotomize', 'esperwing', 'flamecharge', 'rapidspin', 'rockpolish', 'scaleshot', 'trailblaze',
]);
const ruleCheckerDelegatorSetupAbilities = new Set([
  'angerpoint', 'angershell', 'asone', 'battlebond', 'beastboost', 'berserk', 'chillingneigh', 'commander',
  'competitive', 'contrary', 'dauntlessshield', 'defiant', 'download', 'embodyaspect', 'grimneigh',
  'guarddog', 'intrepidsword', 'justified', 'lightningrod', 'moody', 'motordrive', 'moxie', 'opportunist',
  'rattled', 'sapsipper', 'soulheart', 'speedboost', 'stamina', 'steadfast', 'steamengine', 'stormdrain',
  'superluck', 'thermalexchange', 'watercompaction', 'weakarmor', 'wellbakedbody', 'windrider',
]);
const ruleCheckerKingsRockParalysisMoves = new Set([
  'bodyslam', 'boltstrike', 'bounce', 'buzzybuzz', 'combattorque', 'direclaw', 'discharge', 'dragonbreath',
  'forcepalm', 'freezeshock', 'lick', 'nuzzle', 'secretpower', 'spark', 'splishysplash', 'thunder',
  'thunderfang', 'thunderpunch', 'thundershock', 'thunderbolt', 'triattack', 'volttackle', 'wildboltstorm',
  'zapcannon',
]);
const ruleCheckerKingsRockMultiHitMoves = new Set([
  'bonemerang', 'doublehit', 'doubleironbash', 'doublekick', 'dragondarts', 'dualchop', 'dualwingbeat',
  'geargrind', 'surgingstrikes', 'tachyoncutter', 'tripledive', 'twinbeam', 'twineedle', 'watershuriken',
  'armthrust', 'barrage', 'bonerush', 'bulletseed', 'cometpunch', 'doubleslap', 'furyattack', 'furyswipes',
  'iciclespear', 'pinmissile', 'rockblast', 'scaleshot', 'spikecannon', 'tailslap', 'tripleaxel', 'triplekick',
  'populationbomb',
]);

let allPokemon = [];
let pokemonByName = new Map();
let pokemonByNormalizedName = new Map();
let hiddenPokemonByLink = new Map();
let currentRenderedPokemon = [];
let activeDetailPokemonName = null;
let expandedAbilityIds = new Set();
let expandedTopGroups = new Set();
let detailEffectTimeouts = [];
let expandedMoveRuleIds = new Set();
let draftAbilityTokens = [];
let draftMoveTokens = [];
let refreshAbilityTokens = () => {};
let refreshMoveTokens = () => {};
let meowthCoinState = {
  count: 0,
  started: false,
};
let detailSpecialEffectCleanups = [];
let currentTheme = 'light';
let collapsedDividerIds = new Set();
let replacementFinderTargetName = null;
let replacementFinderPriorities = new Map();
let replacementPickerSelectedName = null;
let loadedSimilarPokemonName = null;
let coreFinderState = {
  size: 3,
  pivotChain: false,
  thirdSlotMode: 'search',
  selectedNames: [null, null, null, null],
  inputValues: ['', '', '', ''],
};
let coreDefenseProfileCache = new Map();
let coreFinderPendingException = null;
let budgetPlannerState = {
  format: 'normal',
  activeSlots: 10,
  slots: Array.from({ length: 12 }, () => ({
    name: null,
    input: '',
    captainKind: null,
    captainType: '',
  })),
};
let ruleCheckerState = {
  format: 'normal',
  pickerInput: '',
  rosterNames: [],
  battleSlots: Array.from({ length: 6 }, () => ({
    name: '',
    teraActive: false,
    teraType: '',
    zActive: false,
    zType: '',
    item: '',
    ability: '',
    moves: ['', '', '', ''],
  })),
};
let ruleCheckerValidation = {
  violations: [],
  cardHighlights: new Set(),
  itemHighlights: new Set(),
  teraHighlights: new Set(),
  zHighlights: new Set(),
  abilityHighlights: new Map(),
  moveHighlights: new Map(),
};
let ruleCheckerItemsPromise = null;
let ruleCheckerItemOptions = window.RULE_CHECKER_ITEMS?.itemOptions ?? [];
let ruleCheckerMegaStoneByForm = new Map(Object.entries(window.RULE_CHECKER_ITEMS?.megaStoneByForm ?? {}));
let speedTiersState = {
  pickerInput: '',
  entries: [],
  draggedName: null,
  options: {
    scarf: false,
    tailwind: false,
    trickRoom: false,
    weather: 'neutral',
  },
  gapContext: null,
};
let activeExpertSearch = {
  raw: '',
  matcher: null,
};
let isSearchAdvancedExpanded = false;
let appliedAdvancedSearch = {
  name: '',
  abilities: [],
  abilityMode: 'all',
  moves: [],
  moveMode: 'all',
  coverage: [],
  statMode: 'base',
  statRanges: {},
  speedControl: { enabled: false, mode: 'tailwind' },
  hazards: { enabled: false, mode: 'rocks' },
  pivot: { enabled: false, mode: 'offense' },
  defensiveCoverage: [],
};

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2019']/g, '')
    .replace(/[^a-z0-9]+/g, '');
}

function updateResultsCount(visibleCount) {
  resultsCount.textContent = `${visibleCount} Pokemon shown`;
}

function setSearchAdvancedExpanded(expanded) {
  isSearchAdvancedExpanded = expanded;
  if (searchAdvancedTools) searchAdvancedTools.hidden = !expanded;
  if (searchExpandButton) {
    searchExpandButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    searchExpandButton.classList.toggle('is-expanded', expanded);
  }
}

function isMegaPokemon(name) {
  return name.includes('Mega') && name !== 'Meganium' && name !== 'Yanmega';
}

function getAnimatedBorderVariant(name) {
  if (name === 'Groudon-Primal') return 'primal-groudon';
  if (name === 'Kyogre-Primal') return 'primal-kyogre';
  if (isMegaPokemon(name)) return 'mega';
  return null;
}

function isGmaxPokemon(name) {
  return name.endsWith('-Gmax');
}

function hasBoosterCondition(pokemon) {
  if (pokemon.cost === null || pokemon.cost > 15) return false;
  const abilityNames = Object.values(pokemon.abilities ?? {});
  return abilityNames.includes('Quark Drive') || abilityNames.includes('Protosynthesis');
}

function hasBeastBoost(pokemon) {
  const abilityNames = Object.values(pokemon.abilities ?? {});
  return abilityNames.includes('Beast Boost');
}

function hasWormholeEffect(pokemon) {
  if (hasBeastBoost(pokemon)) return true;
  const cosmicNames = new Set([
    'Cosmog',
    'Cosmoem',
    'Solgaleo',
    'Lunala',
    'Necrozma',
    'Necrozma-Dusk-Mane',
    'Necrozma-Dawn-Wings',
    'Necrozma-Ultra',
  ]);
  return cosmicNames.has(pokemon.name);
}

function hasGholdengoDetailTheme(pokemon) {
  return pokemon.name === 'Gholdengo';
}

function hasDialgaRetroTheme(pokemon) {
  return pokemon.name === 'Dialga' || pokemon.name === 'Dialga-Origin';
}

function hasSideSandwichDecoration(pokemon) {
  return pokemon.name === 'Koraidon' || pokemon.name === 'Miraidon';
}

function isRotomFamily(pokemon) {
  return pokemon.name === 'Rotom' || pokemon.name.startsWith('Rotom-');
}

function isRotomApplianceForm(pokemon) {
  return ['Rotom-Heat', 'Rotom-Wash', 'Rotom-Frost', 'Rotom-Fan', 'Rotom-Mow'].includes(pokemon.name);
}

function getPreEvolutionChain(pokemon) {
  const chain = [];
  const seen = new Set();
  let currentName = pokemon.prevo ?? null;

  while (currentName && !seen.has(currentName)) {
    seen.add(currentName);
    const current = pokemonByName.get(currentName);
    if (!current) break;
    chain.push(current);
    currentName = current.prevo ?? null;
  }

  return chain.reverse();
}

function getSmeargleUniversalMoveIds() {
  return Object.entries(moveDetailsById)
    .filter(([, move]) => move && move.isNonstandard == null)
    .map(([moveId]) => moveId);
}

function getEffectiveLearnset(pokemon) {
  const mergedLearnset = {};
  const inheritedSources = [...getPreEvolutionChain(pokemon)];

  if (isRotomApplianceForm(pokemon)) {
    const baseRotom = pokemonByName.get('Rotom');
    if (baseRotom) inheritedSources.push(baseRotom);
  }

  for (const source of inheritedSources) {
    for (const [moveId, methods] of Object.entries(source.learnset ?? {})) {
      const existingMethods = mergedLearnset[moveId] ?? [];
      mergedLearnset[moveId] = [...new Set([...existingMethods, ...(methods ?? [])])];
    }
  }

  for (const [moveId, methods] of Object.entries(pokemon.learnset ?? {})) {
    const existingMethods = mergedLearnset[moveId] ?? [];
    mergedLearnset[moveId] = [...new Set([...existingMethods, ...(methods ?? [])])];
  }

  if (pokemon.name === 'Smeargle') {
    for (const moveId of getSmeargleUniversalMoveIds()) {
      const existingMethods = mergedLearnset[moveId] ?? [];
      mergedLearnset[moveId] = [...new Set([...existingMethods, '9S'])];
    }
  }

  return mergedLearnset;
}

function getEffectiveMoveIds(pokemon) {
  const inheritedMoveIds = getPreEvolutionChain(pokemon).flatMap((entry) => entry.moveIds ?? []);
  if (isRotomApplianceForm(pokemon)) {
    const baseRotom = pokemonByName.get('Rotom');
    if (baseRotom) inheritedMoveIds.push(...(baseRotom.moveIds ?? []));
  }
  const effectiveMoveIds = [...new Set([...inheritedMoveIds, ...(pokemon.moveIds ?? [])])];
  if (pokemon.name === 'Smeargle') {
    return [...new Set([...effectiveMoveIds, ...getSmeargleUniversalMoveIds()])];
  }
  return effectiveMoveIds;
}

function getLegalEffectiveMoveIds(pokemon) {
  return getEffectiveMoveIds(pokemon).filter((moveId) => getMoveRuleInfo(moveId, pokemon)?.severity !== 'illegal');
}

function getPreMegaPokemon(pokemon) {
  if (!isMegaPokemon(pokemon.name)) return null;
  const previousName = pokemon.changesFrom ?? pokemon.name.replace(/-Mega(?:-[A-Z])?$/, '');
  return pokemonByName.get(previousName) ?? null;
}

function getTypeBorderColors(pokemon) {
  const [primaryType = 'Normal', secondaryType = primaryType] = pokemon.types ?? [];
  return {
    primary: typeColorVars[primaryType] ?? 'var(--normal)',
    secondary: typeColorVars[secondaryType] ?? typeColorVars[primaryType] ?? 'var(--normal)',
  };
}

function getSpecialNameVariant(pokemon) {
  const abilityNames = Object.values(pokemon.abilities ?? {});
  if (pokemon.name === 'Miraidon' || abilityNames.includes('Quark Drive')) return 'quark';
  if (pokemon.name === 'Koraidon' || abilityNames.includes('Protosynthesis')) return 'proto';
  return null;
}

function getDetailSubtitle(pokemon) {
  if (pokemon.name.startsWith('Necrozma')) return 'UB Black';
  return detailSubtitleByName.get(pokemon.name) ?? null;
}

function getPokemonDisplayName(pokemon) {
  return pokemon.displayName ?? pokemon.name;
}

function getReplacementHelpNameElement() {
  return document.querySelector('#replacement-help-name');
}

function createDetailSubtitleElement(pokemon) {
  const subtitle = getDetailSubtitle(pokemon);
  if (!subtitle) return null;
  const element = document.createElement('p');
  element.className = 'detail-subtitle';
  element.textContent = subtitle;
  return element;
}

function createDetailTagIconsElement(pokemon) {
  const tagConfigs = [
    { tag: 'Legendary', src: legendaryIconPath, alt: 'Legendary icon', label: 'Legendary' },
    { tag: 'Mythic', src: mythicIconPath, alt: 'Mythical icon', label: 'Mythical' },
  ].filter((config) => pokemonHasTag(pokemon, config.tag));
  if (!tagConfigs.length) return null;

  const wrap = document.createElement('div');
  wrap.className = 'detail-tag-icons';
  for (const config of tagConfigs) {
    const icon = document.createElement('img');
    icon.className = 'detail-tag-icon';
    icon.src = config.src;
    icon.alt = config.alt;
    icon.title = config.label;
    icon.loading = 'lazy';
    wrap.append(icon);
  }
  return wrap;
}

function initializeToolHelpToggles() {
  for (const button of toolHelpToggles) {
    const targetId = button.dataset.helpTarget;
    if (!targetId) continue;
    const panel = document.getElementById(targetId);
    if (!panel) continue;
    button.addEventListener('click', () => {
      const willExpand = panel.hidden;
      panel.hidden = !willExpand;
      button.setAttribute('aria-expanded', String(willExpand));
    });
  }
}

function initializeStaticToolContent() {
  for (const [id, paragraphs] of Object.entries(toolHelpContentById)) {
    const panel = document.getElementById(id);
    if (!panel) continue;
    const nodes = paragraphs.map((text, index) => {
      const paragraph = document.createElement('p');
      paragraph.className = 'tool-help-text';
      if (id === 'replacement-finder-help' && index === 0) {
        const [before, after] = text.split('[selected Pok\u00e9mon]');
        paragraph.append(document.createTextNode(before));
        const name = document.createElement('span');
        name.id = 'replacement-help-name';
        name.textContent = '[selected Pok\u00e9mon]';
        paragraph.append(name);
        paragraph.append(document.createTextNode(after ?? ''));
      } else {
        paragraph.textContent = text;
      }
      return paragraph;
    });
    panel.replaceChildren(...nodes);
  }

  const pdfOpenLink = stefansPdfModal?.querySelector('.details-secondary');
  if (pdfOpenLink) pdfOpenLink.textContent = 'Im neuen Tab \u00f6ffnen';
  if (stefansPdfClose) stefansPdfClose.innerHTML = '&times;';
  if (changelogClose) changelogClose.innerHTML = '&times;';

  const tierTab = document.querySelector('#changelog-tab-tier');
  if (tierTab) tierTab.textContent = 'Tier-\u00c4nderungen';

  const tierPanel = document.querySelector('#changelog-panel-tier');
  if (tierPanel) {
    const entry = document.createElement('article');
    entry.className = 'changelog-entry';
    const title = document.createElement('h3');
    title.textContent = '2026-04-19';
    const wrap = document.createElement('div');
    wrap.className = 'changelog-table-wrap';
    const table = document.createElement('table');
    table.className = 'changelog-table';
    const formatCost = (value) => (value === '—' ? '\u2014' : value);
    table.innerHTML = `
      <thead>
        <tr>
          <th>Pok\u00e9mon</th>
          <th>Alte Kosten</th>
          <th>Neue Kosten</th>
          <th>Begr\u00fcndung</th>
        </tr>
      </thead>
      <tbody>
        ${tierChangelogEntries.map(([name, oldCost, newCost, reason]) => `
          <tr>
            <td>${name}</td>
            <td>${formatCost(oldCost)}</td>
            <td>${formatCost(newCost)}</td>
            <td>${reason}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    wrap.append(table);
    entry.append(title, wrap);
    tierPanel.replaceChildren(entry);
  }

  const sitePanel = document.querySelector('#changelog-panel-site');
  if (sitePanel) {
    const entry = document.createElement('article');
    entry.className = 'changelog-entry';
    const title = document.createElement('h3');
    title.textContent = 'Seiten Updates';
    const date = document.createElement('p');
    date.className = 'changelog-date';
    date.textContent = '2026-04-19';
    const list = document.createElement('ul');
    list.className = 'changelog-list';
    ['Dark Mode Ausnahmen gefixed', 'Changelogs hinzugef\u00fcgt', 'Hilfe-Buttons hinzugef\u00fcgt', 'Stefans PDF verlinkt']
      .forEach((text) => {
        const item = document.createElement('li');
        item.textContent = text;
        list.append(item);
      });
    entry.append(title, date, list);
    sitePanel.replaceChildren(entry);
  }
}
function getStoredTheme() {
  const storedTheme = window.localStorage.getItem(themeStorageKey);
  return storedTheme === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme) {
  currentTheme = theme === 'dark' ? 'dark' : 'light';
  document.body.classList.toggle('dark-mode', currentTheme === 'dark');
  themeToggle?.setAttribute('aria-pressed', String(currentTheme === 'dark'));
  if (themeToggle) {
    const label = themeToggle.querySelector('.theme-toggle-label');
    if (label) label.textContent = currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
  }
  if (themeToggleMascot) {
    const mascot = themeMascotByMode[currentTheme];
    themeToggleMascot.src = mascot.src;
    themeToggleMascot.alt = mascot.alt;
  }
}

function initializeStaticUiLabels() {
  const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };
  const setHtml = (selector, html) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = html;
  };
  const setAttr = (selector, attribute, value) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
  };

  setText('.pokedex-panel .section-heading h2', 'Pokédex');
  setText('label[for="sort-field-secondary"] > span', 'Sekundär');
  setAttr('#details-name', 'placeholder', 'Pokémonname eingeben');
  setText('label[for="ability-input"] > span', 'Fähigkeiten');
  setAttr('#ability-input', 'placeholder', 'Fähigkeit suchen');
  setText('#details-reset', 'Zurücksetzen');
  setText('#expert-search-clear', 'Zurücksetzen');
  setAttr('#detail-prev', 'aria-label', 'Vorheriges Pokémon');
  setAttr('#detail-next', 'aria-label', 'Nächstes Pokémon');
  setText('#pokemon-detail-modal .detail-section:nth-of-type(2) .detail-section-heading h3', 'Fähigkeiten');
  setText('#detail-similar-pokemon-section .detail-section-heading h3', 'Ähnliche Pokémon');
  setText('#detail-similar-load-button', 'Ähnliche Pokémon laden');
  setText('#replacement-picker-title', 'Pokémon auswählen');
  setText('label[for="replacement-picker-input"] > span', 'Pokémon');
  setAttr('#replacement-picker-input', 'placeholder', 'Pokémonname eingeben');
  setText('#stefans-pdf-modal .details-secondary', 'Im neuen Tab öffnen');
  setHtml('#details-close', '&times;');
  setHtml('#expert-search-close', '&times;');
  setHtml('#pokemon-detail-close', '&times;');
  setHtml('#replacement-picker-close', '&times;');
  setHtml('#replacement-finder-close', '&times;');
  setHtml('#legend-close', '&times;');
  setHtml('#core-finder-close', '&times;');
  setHtml('#core-finder-exception-close', '&times;');
  setHtml('#budget-planner-close', '&times;');
  setHtml('#budget-planner-zoom-close', '&times;');
  setHtml('#budget-planner-costs-close', '&times;');
  setHtml('#budget-planner-captain-costs-close', '&times;');

  const legendTexts = [...document.querySelectorAll('#legend-modal .legend-item p')];
  if (legendTexts.length >= 10) {
    legendTexts[0].textContent = 'Dieses Pokémon ist eine Mega-Entwicklung.';
    legendTexts[1].textContent = 'Dieses Pokémon ist eine Gigantamax-Form und darf diese einsetzen.';
    legendTexts[2].textContent = 'Dieses Pokémon darf ein Tera-Captain sein.';
    legendTexts[3].textContent = 'Dieses Pokémon darf ein Z-Captain sein.';
    legendTexts[4].textContent = 'Dieses Pokémon darf mit Einschränkungen ein Z-Captain sein.';
    legendTexts[5].textContent = 'Dieses Pokémon darf Revival Blessing einsetzen.';
    legendTexts[6].textContent = 'Dieses Pokémon darf Rage Fist einsetzen.';
    legendTexts[7].textContent = 'Dieses Pokémon darf Last Respects einsetzen.';
    legendTexts[8].textContent = 'Dieses Pokémon darf Shell Smash einsetzen.';
    legendTexts[9].textContent = 'Dieses Pokémon darf Shed Tail einsetzen.';
  }
}

function toggleTheme() {
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  window.localStorage.setItem(themeStorageKey, nextTheme);
}

function updateScrollTopButtonVisibility() {
  if (!scrollTopButton) return;
  const threshold = Math.max(window.innerHeight, 700);
  scrollTopButton.hidden = window.scrollY <= threshold;
}

function scrollToTopOfList() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function getPokemonFlags(pokemon) {
  const mega = isMegaPokemon(pokemon.name);
  return {
    mega,
    gmax: isGmaxPokemon(pokemon.name),
    tera: pokemon.cost !== null && pokemon.cost <= 5,
    z: !mega && pokemon.cost !== null && pokemon.cost <= 10,
    booster: hasBoosterCondition(pokemon),
  };
}

function addMoveToPokemon(pokemon, moveId, methods = ['9M']) {
  const nextMoveIds = new Set(pokemon.moveIds ?? []);
  nextMoveIds.add(moveId);
  pokemon.moveIds = [...nextMoveIds];
  const learnset = { ...(pokemon.learnset ?? {}) };
  const existingMethods = learnset[moveId] ?? [];
  learnset[moveId] = [...new Set([...existingMethods, ...methods])];
  pokemon.learnset = learnset;
}

function pokemonLearnsMove(pokemon, moveId) {
  return Object.prototype.hasOwnProperty.call(getEffectiveLearnset(pokemon), moveId);
}

function getSpecialMoveBadges(pokemon) {
  if (pokemon.name === 'Smeargle') return [];
  const moveBadges = [
    {
      moveId: 'lastrespects',
      src: lastRespectsIconPath,
      alt: 'Last Respects',
    },
    {
      moveId: 'ragefist',
      src: rageFistIconPath,
      alt: 'Rage Fist',
    },
    {
      moveId: 'revivalblessing',
      src: revivalBlessingIconPath,
      alt: 'Revival Blessing',
    },
    {
      moveId: 'shellsmash',
      src: shellIconPath,
      alt: 'Shell Smash',
    },
    {
      moveId: 'shedtail',
      src: shedTailIconPath,
      alt: 'Shed Tail',
    },
  ];

  return moveBadges.flatMap((badge) => {
    if (badge.skip?.(pokemon)) return [];
    if (!pokemonLearnsMove(pokemon, badge.moveId)) return [];
    const ruleInfo = getMoveRuleInfo(badge.moveId, pokemon);
    return [{
      src: badge.src,
      alt: badge.alt,
      illegal: ruleInfo?.severity === 'illegal',
    }];
  });
}

function createFormBadgeNode(badge) {
  const badgeWrap = document.createElement('span');
  badgeWrap.className = 'form-badge-wrapper';
  if (badge.warning) badgeWrap.classList.add('is-warning');
  if (badge.illegal) badgeWrap.classList.add('is-illegal');
  const badgeElement = document.createElement('img');
  badgeElement.className = 'form-badge';
  badgeElement.src = badge.src;
  badgeElement.alt = badge.alt;
  badgeElement.loading = 'lazy';
  badgeWrap.append(badgeElement);
  return badgeWrap;
}

function isSpeedTopTwoStat(pokemon) {
  const stats = Object.entries(pokemon.baseStats ?? {})
    .filter(([, value]) => Number.isFinite(value))
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  const speedRank = stats.findIndex(([stat]) => stat === 'spe');
  return speedRank >= 0 && speedRank < 2;
}

function hasSpeedTierBoostSweepToggle(pokemon) {
  const abilities = new Set(Object.values(pokemon.abilities ?? {}).map(normalizeText));
  return isSpeedTopTwoStat(pokemon) && (
    abilities.has(normalizeText('Speed Boost')) ||
    abilities.has(normalizeText('Beast Boost'))
  );
}

function getSpeedTierWeatherBonus(pokemon, weather) {
  if (weather === 'neutral') return null;
  const config = speedTierWeatherConfigs[weather];
  if (!config) return null;
  const abilities = new Set(Object.values(pokemon.abilities ?? {}).map(normalizeText));
  return abilities.has(normalizeText(config.ability)) ? config : null;
}

function calculateSpeedTierValue(baseSpeed, options = {}) {
  const raw = calculateRealOtherStat(baseSpeed, {
    level: 100,
    iv: options.iv ?? 31,
    ev: options.ev ?? 0,
    nature: options.nature ?? 1,
  });
  const stageMultiplier = speedTierStageMultipliers[String(options.stage ?? 0)] ?? 1;
  return Math.floor(raw * (options.multiplier ?? 1) * stageMultiplier);
}

function buildFormBadges(pokemon) {
  const badges = [];
  const flags = getPokemonFlags(pokemon);
  if (flags.mega) badges.push({ src: megaIconPath, alt: 'Mega Evolution' });
  if (flags.gmax) badges.push({ src: gmaxIconPath, alt: 'Gigantamax' });
  if (flags.tera) badges.push({ src: teraIconPath, alt: 'Tera' });
  if (flags.z) badges.push({ src: zIconPath, alt: 'Z-Move' });
  if (flags.booster) badges.push({ src: boosterIconPath, alt: 'Booster Energy' });
  badges.push(...getSpecialMoveBadges(pokemon));
  if (pokemonHasTag(pokemon, 'z-warning') && flags.z) {
    const zBadge = badges.find((badge) => badge.alt === 'Z-Move');
    if (zBadge) zBadge.warning = true;
  }
  return badges;
}

function getFormatThreshold(format) {
  if (format === 'normal') return 21;
  if (format === 'low-power') return 15;
  return Infinity;
}

function matchesTriStateFilter(filterState, hasFlag) {
  if (filterState === 'include') return hasFlag;
  if (filterState === 'exclude') return !hasFlag;
  return true;
}

function getActiveTriStates() {
  return Object.fromEntries(
    triFilterButtons.map((button) => [button.dataset.filter, button.dataset.state || 'any']),
  );
}

function pokemonHasAnyMoveId(pokemon, moveIds) {
  const effectiveMoveIds = getLegalEffectiveMoveIds(pokemon);
  return moveIds.some((moveId) => effectiveMoveIds.includes(moveId));
}

function pokemonHasSpeedControl(pokemon, mode) {
  const speedMoves = mode === 'tailwind'
    ? ['tailwind']
    : mode === 'webs'
      ? ['stickyweb']
      : ['tailwind', 'stickyweb'];
  return pokemonHasAnyMoveId(pokemon, speedMoves);
}

function pokemonHasHazards(pokemon, mode) {
  return mode === 'rocks'
    ? pokemonHasAnyMoveId(pokemon, ['stealthrock'])
    : mode === 'webs'
      ? pokemonHasAnyMoveId(pokemon, ['stickyweb'])
      : mode === 'spikes'
        ? pokemonHasAnyMoveId(pokemon, ['spikes'])
        : mode === 'tspikes'
          ? pokemonHasAnyMoveId(pokemon, ['toxicspikes']) || Object.values(pokemon.abilities ?? {}).includes('Toxic Debris')
          : pokemonHasAnyMoveId(pokemon, ['spikes', 'stealthrock']) || pokemon.name === 'Copperajah-Gmax';
}

function pokemonHasPivotMode(pokemon, mode) {
  return mode === 'offense'
    ? pokemonHasAnyMoveId(pokemon, ['uturn', 'voltswitch'])
    : mode === 'defense'
      ? pokemonHasAnyMoveId(pokemon, ['partingshot', 'shedtail', 'chillyreception', 'teleport'])
      : pokemonHasAnyMoveId(pokemon, ['uturn', 'voltswitch', 'partingshot', 'shedtail', 'chillyreception', 'teleport']) ||
        Object.values(pokemon.abilities ?? {}).includes('Wimp Out') ||
        Object.values(pokemon.abilities ?? {}).includes('Emergency Exit');
}

function isStatTopTwoWithSpeedCheck(pokemon, stat) {
  const stats = pokemon.baseStats ?? {};
  const statValue = stats[stat];
  const speedValue = stats.spe;
  if (!Number.isFinite(statValue) || !Number.isFinite(speedValue)) return false;
  if (speedValue > statValue * 1.1) return false;
  const rankedStats = Object.entries(stats)
    .filter(([, value]) => Number.isFinite(value))
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  const statRank = rankedStats.findIndex(([key]) => key === stat);
  return statRank >= 0 && statRank < 2;
}

function getAbilitySearchSet(pokemon) {
  const abilitySet = new Set(Object.values(pokemon.abilities ?? {}).map(normalizeText));
  const hasBeastBoost = abilitySet.has(normalizeText('Beast Boost'));
  const hasMoxie = abilitySet.has(normalizeText('Moxie'));
  const hasSoulHeart = abilitySet.has(normalizeText('Soul-Heart'));

  const attackBoostEquivalent = isStatTopTwoWithSpeedCheck(pokemon, 'atk');
  const specialAttackBoostEquivalent = isStatTopTwoWithSpeedCheck(pokemon, 'spa');

  if ((hasBeastBoost && attackBoostEquivalent) || (hasMoxie && attackBoostEquivalent)) {
    abilitySet.add(normalizeText('Beast Boost'));
    abilitySet.add(normalizeText('Moxie'));
  }
  if ((hasBeastBoost && specialAttackBoostEquivalent) || (hasSoulHeart && specialAttackBoostEquivalent)) {
    abilitySet.add(normalizeText('Beast Boost'));
    abilitySet.add(normalizeText('Soul-Heart'));
  }

  return abilitySet;
}

function matchesAdvancedSearch(pokemon) {
  if (appliedAdvancedSearch.name) {
    if (!normalizeText(pokemon.name).includes(normalizeText(appliedAdvancedSearch.name))) return false;
  }

  if (appliedAdvancedSearch.abilities.length) {
    const pokemonAbilitySet = getAbilitySearchSet(pokemon);
    const tests = appliedAdvancedSearch.abilities.map((ability) => pokemonAbilitySet.has(ability.id));
    if (appliedAdvancedSearch.abilityMode === 'all' ? tests.includes(false) : !tests.includes(true)) return false;
  }

  if (appliedAdvancedSearch.moves.length) {
    const effectiveMoveIds = getLegalEffectiveMoveIds(pokemon);
    const tests = appliedAdvancedSearch.moves.map((move) => effectiveMoveIds.includes(move.id));
    if (appliedAdvancedSearch.moveMode === 'all' ? tests.includes(false) : !tests.includes(true)) return false;
  }

  if (appliedAdvancedSearch.coverage.length) {
    const coverageByType = Object.fromEntries(
      getLegalPokemonMoveRows(pokemon)
        .filter((move) => move.category !== 'Status' && typeof move.basePower === 'number' && move.type)
        .map((move) => [move.type, move.basePower])
        .reduce((entries, [type, basePower]) => {
          entries.set(type, Math.max(entries.get(type) ?? 0, basePower));
          return entries;
        }, new Map()),
    );
    const coverageOk = appliedAdvancedSearch.coverage.every(
      (criterion) => (coverageByType[criterion.type] ?? 0) >= criterion.minPower,
    );
    if (!coverageOk) return false;
  }

  if (Object.keys(appliedAdvancedSearch.statRanges).length) {
    const realStatRanges = appliedAdvancedSearch.statMode === 'real' ? getPokemonRealStatRanges(pokemon) : null;
    const statsOk = Object.entries(appliedAdvancedSearch.statRanges).every(([stat, range]) => {
      if (appliedAdvancedSearch.statMode === 'real') {
        const valueRange = realStatRanges?.[stat];
        if (!valueRange) return false;
        if (range.min !== null && valueRange.max < range.min) return false;
        if (range.max !== null && valueRange.min > range.max) return false;
        return true;
      }
      const value = pokemon.baseStats?.[stat];
      if (value === undefined || value === null) return false;
      if (range.min !== null && value < range.min) return false;
      if (range.max !== null && value > range.max) return false;
      return true;
    });
    if (!statsOk) return false;
  }

  if (appliedAdvancedSearch.defensiveCoverage.length) {
    const defensiveOk = appliedAdvancedSearch.defensiveCoverage.every((criterion) => {
      const defenseValue = pokemon[`${criterion.type.toLowerCase()}_defense`];
      const defenseValues = Array.isArray(defenseValue) ? defenseValue : [defenseValue];
      const minimum = Math.min(...defenseValues);

      if (criterion.mode === 'resistant') return defenseValues.some((value) => value <= 0.5);
      if (criterion.mode === 'neutral') return minimum <= 1.1;
      return defenseValues.some((value) => value === 0);
    });
    if (!defensiveOk) return false;
  }

  if (appliedAdvancedSearch.speedControl.enabled) {
    if (!pokemonHasSpeedControl(pokemon, appliedAdvancedSearch.speedControl.mode)) return false;
  }

  if (appliedAdvancedSearch.hazards.enabled) {
    if (!pokemonHasHazards(pokemon, appliedAdvancedSearch.hazards.mode)) return false;
  }

  if (appliedAdvancedSearch.pivot.enabled) {
    if (!pokemonHasPivotMode(pokemon, appliedAdvancedSearch.pivot.mode)) return false;
  }

  return true;
}

function hasActiveSearchCriteria(query, triStates) {
  return Boolean(
    query ||
    activeExpertSearch.matcher ||
    appliedAdvancedSearch.name ||
    appliedAdvancedSearch.abilities.length ||
    appliedAdvancedSearch.moves.length ||
    appliedAdvancedSearch.coverage.length ||
    Object.keys(appliedAdvancedSearch.statRanges).length ||
    appliedAdvancedSearch.defensiveCoverage.length ||
    appliedAdvancedSearch.speedControl.enabled ||
    appliedAdvancedSearch.hazards.enabled ||
    appliedAdvancedSearch.pivot.enabled ||
    Object.values(triStates).some((value) => value !== 'any'),
  );
}

function splitExpertSearchTerms(input) {
  const terms = [];
  let current = '';
  let inQuotes = false;
  let parenDepth = 0;
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (character === '"') {
      inQuotes = !inQuotes;
      current += character;
      continue;
    }
    if (!inQuotes) {
      if (character === '(') parenDepth += 1;
      if (character === ')') parenDepth = Math.max(0, parenDepth - 1);
      if (/\s/.test(character) && parenDepth === 0) {
        if (current.trim()) terms.push(current.trim());
        current = '';
        continue;
      }
    }
    current += character;
  }
  if (current.trim()) terms.push(current.trim());
  return terms;
}

function stripExpertQuotes(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseExpertListExpression(value) {
  const trimmed = value.trim();
  if (!trimmed.startsWith('(') || !trimmed.endsWith(')')) {
    return { mode: 'single', value: stripExpertQuotes(trimmed) };
  }
  const inner = trimmed.slice(1, -1).trim();
  if (!inner) return { mode: 'single', value: '' };
  if (inner.includes('+') && !inner.includes(',')) {
    return {
      mode: 'all',
      values: inner.split('+').map((entry) => stripExpertQuotes(entry)).filter(Boolean),
    };
  }
  const entries = inner.split(',').map((entry) => stripExpertQuotes(entry)).filter(Boolean);
  const required = entries.filter((entry) => entry.endsWith('!')).map((entry) => entry.slice(0, -1).trim()).filter(Boolean);
  const optional = entries.filter((entry) => !entry.endsWith('!'));
  return {
    mode: 'required-any',
    required,
    optional,
  };
}

function createExpertValueMatcher(mode, rawNeedle) {
  const needle = normalizeText(stripExpertQuotes(rawNeedle));
  if (!needle) return () => true;
  return (candidate) => {
    const normalizedCandidate = normalizeText(candidate);
    return mode === '=' ? normalizedCandidate === needle : normalizedCandidate.includes(needle);
  };
}

function evaluateExpertListExpression(items, operator, expression) {
  const values = items.map((item) => String(item));
  if (expression.mode === 'single') {
    const matcher = createExpertValueMatcher(operator, expression.value);
    return values.some((item) => matcher(item));
  }
  if (expression.mode === 'all') {
    return expression.values.every((value) => {
      const matcher = createExpertValueMatcher(operator, value);
      return values.some((item) => matcher(item));
    });
  }
  const requiredOk = expression.required.every((value) => {
    const matcher = createExpertValueMatcher(operator, value);
    return values.some((item) => matcher(item));
  });
  if (!requiredOk) return false;
  if (!expression.optional.length) return true;
  return expression.optional.some((value) => {
    const matcher = createExpertValueMatcher(operator, value);
    return values.some((item) => matcher(item));
  });
}

function parseExpertBoolean(value) {
  const normalized = normalizeText(stripExpertQuotes(value));
  if (normalized === 'true' || normalized === 'yes') return true;
  if (normalized === 'false' || normalized === 'no') return false;
  throw new Error(`Ungültiger Wahrheitswert: ${value}`);
}

function parseExpertNumeric(value, operator) {
  const parsed = Number(stripExpertQuotes(value));
  if (!Number.isFinite(parsed)) throw new Error(`Ungültiger Zahlenwert: ${value}`);
  const actualOperator = operator === ':' ? '=' : operator;
  return (candidate) => {
    if (!Number.isFinite(candidate)) return false;
    if (actualOperator === '=') return candidate === parsed;
    if (actualOperator === '>') return candidate > parsed;
    if (actualOperator === '<') return candidate < parsed;
    if (actualOperator === '>=') return candidate >= parsed;
    if (actualOperator === '<=') return candidate <= parsed;
    return false;
  };
}

function compileExpertSearchTerm(term) {
  const match = term.match(/^([a-z]+)(:|=|>=|<=|>|<)(.+)$/i);
  if (!match) throw new Error(`Ungültiger Ausdruck: ${term}`);
  const [, rawField, operator, rawValue] = match;
  const field = normalizeText(rawField);
  const value = rawValue.trim();

  if (field === 'mega' || field === 'gmax') {
    const expected = parseExpertBoolean(value);
    return (pokemon) => getPokemonFlags(pokemon)[field] === expected;
  }

  if (['ability', 'move', 'type', 'captain', 'resist', 'immune'].includes(field)) {
    const expression = parseExpertListExpression(value);
    return (pokemon) => {
      if (field === 'ability') return evaluateExpertListExpression(Object.values(pokemon.abilities ?? {}), operator, expression);
      if (field === 'move') return evaluateExpertListExpression(getLegalPokemonMoveRows(pokemon).map((move) => move.name), operator, expression);
      if (field === 'type') return evaluateExpertListExpression(pokemon.types ?? [], operator, expression);
      if (field === 'captain') {
        const flags = getPokemonFlags(pokemon);
        const captains = [flags.z ? 'z' : null, flags.tera ? 'tera' : null].filter(Boolean);
        return evaluateExpertListExpression(captains, operator, expression);
      }
      const types = expression.mode === 'single'
        ? [expression.value]
        : expression.mode === 'all'
          ? expression.values
          : [...expression.required, ...expression.optional];
      const checks = types.filter(Boolean).map((entry) => stripExpertQuotes(entry));
      const evaluateType = (typeName) => {
        const canonicalType = battleTypes.find((candidate) => normalizeText(candidate) === normalizeText(typeName));
        if (!canonicalType) return false;
        const bestValue = getReplacementBestDefenseValue(pokemon, canonicalType);
        return field === 'immune' ? bestValue === 0 : bestValue <= 1;
      };
      if (expression.mode === 'single') return evaluateType(expression.value);
      if (expression.mode === 'all') return checks.every(evaluateType);
      const requiredOk = expression.required.every(evaluateType);
      if (!requiredOk) return false;
      if (!expression.optional.length) return true;
      return expression.optional.some(evaluateType);
    };
  }

  if (['hp', 'atk', 'def', 'spa', 'spd', 'spe', 'cost', 'dex'].includes(field)) {
    const test = parseExpertNumeric(value, operator);
    return (pokemon) => {
      const candidateValue = field === 'cost'
        ? pokemon.cost
        : field === 'dex'
          ? pokemon.num
          : pokemon.baseStats?.[field];
      return test(candidateValue);
    };
  }

  if (field === 'legal') {
    const normalizedValue = normalizeText(stripExpertQuotes(value));
    return (pokemon) => {
      if (pokemon.unreleased || pokemon.impossible) return false;
      if (normalizedValue === 'uber') return true;
      if (normalizedValue === 'normal') return pokemon.cost !== null && pokemon.cost < getFormatThreshold('normal');
      if (normalizedValue === 'low power' || normalizedValue === 'low-power') return pokemon.cost !== null && pokemon.cost < getFormatThreshold('low-power');
      return false;
    };
  }

  if (field === 'name') {
    const matcher = createExpertValueMatcher(operator, value);
    return (pokemon) => matcher(pokemon.name);
  }

  if (field === 'nfe') {
    const expected = parseExpertBoolean(value);
    return (pokemon) => (Array.isArray(pokemon.evos) && pokemon.evos.length > 0) === expected;
  }

  if (field === 'lc') {
    const expected = parseExpertBoolean(value);
    return (pokemon) => {
      const isLc = (!pokemon.prevo || pokemon.prevo === '') && Array.isArray(pokemon.evos) && pokemon.evos.length > 0;
      return isLc === expected;
    };
  }

  if (field === 'speedcontrol') {
    const mode = normalizeText(stripExpertQuotes(value));
    return (pokemon) => pokemonHasSpeedControl(pokemon, mode === 'all' ? 'any' : mode);
  }

  if (field === 'hazards') {
    const mode = normalizeText(stripExpertQuotes(value));
    return (pokemon) => pokemonHasHazards(pokemon, mode);
  }

  if (field === 'pivots' || field === 'pivot') {
    const mode = normalizeText(stripExpertQuotes(value));
    return (pokemon) => pokemonHasPivotMode(pokemon, mode === 'all' ? 'any' : mode);
  }

  throw new Error(`Unbekanntes Suchfeld: ${rawField}`);
}

function compileExpertSearch(rawQuery) {
  const terms = splitExpertSearchTerms(rawQuery.trim());
  const predicates = terms.map(compileExpertSearchTerm);
  return (pokemon) => predicates.every((predicate) => predicate(pokemon));
}

function matchesPokemonFilters(pokemon, query, triStates, options = {}) {
  const { ignoreUntiered = false } = options;
  const searchable = [
    pokemon.displayNumber,
    pokemon.name,
    getPokemonDisplayName(pokemon),
    pokemon.types.join(' '),
    String(pokemon.num),
  ].join(' ').toLowerCase();
  if (query && !searchable.includes(query)) return false;
  if (hideUnreleased.checked && pokemon.unreleased) return false;
  if (hideImpossible.checked && pokemon.impossible) return false;
  if (!ignoreUntiered && hideUntiered.checked && pokemon.untiered) return false;
  if (activeExpertSearch.matcher && !activeExpertSearch.matcher(pokemon)) return false;
  if (!matchesAdvancedSearch(pokemon)) return false;

  const flags = getPokemonFlags(pokemon);
  if (!matchesTriStateFilter(triStates.z, flags.z)) return false;
  if (!matchesTriStateFilter(triStates.tera, flags.tera)) return false;
  if (!matchesTriStateFilter(triStates.mega, flags.mega)) return false;
  if (!matchesTriStateFilter(triStates.gmax, flags.gmax)) return false;
  return true;
}

function getSortValue(pokemon, field) {
  if (field === 'name') return getPokemonDisplayName(pokemon);
  if (field === 'cost') return pokemon.cost;
  if (field === 'special-bulk') {
    const hp = pokemon.baseStats?.hp;
    const spd = pokemon.baseStats?.spd;
    return hp === undefined || spd === undefined ? null : hp * spd;
  }
  if (field === 'physical-bulk') {
    const hp = pokemon.baseStats?.hp;
    const def = pokemon.baseStats?.def;
    return hp === undefined || def === undefined ? null : hp * def;
  }
  if (['hp', 'atk', 'def', 'spa', 'spd', 'spe'].includes(field)) return pokemon.baseStats?.[field] ?? null;
  return pokemon.num;
}

function getSortDisplayValue(pokemon, field) {
  if (field === 'name') return null;
  if (field === 'dex') return `Dex: ${pokemon.num}`;
  if (field === 'cost') return pokemon.cost === null ? 'Kosten: —' : `Kosten: ${pokemon.cost}`;
  if (field === 'hp') return `KP: ${pokemon.baseStats?.hp ?? '—'}`;
  if (field === 'atk') return `Angriff: ${pokemon.baseStats?.atk ?? '—'}`;
  if (field === 'def') return `Verteidigung: ${pokemon.baseStats?.def ?? '—'}`;
  if (field === 'spa') return `Spez. Angriff: ${pokemon.baseStats?.spa ?? '—'}`;
  if (field === 'spd') return `Spez. Vert: ${pokemon.baseStats?.spd ?? '—'}`;
  if (field === 'spe') return `Initiative: ${pokemon.baseStats?.spe ?? '—'}`;
  if (field === 'special-bulk') {
    const value = getSortValue(pokemon, field);
    return `Spez. Bulk: ${value ?? '—'}`;
  }
  if (field === 'physical-bulk') {
    const value = getSortValue(pokemon, field);
    return `Phys. Bulk: ${value ?? '—'}`;
  }
  return null;
}

function comparePokemon(left, right, field, direction, options = {}) {
  const { useFallback = true } = options;
  const multiplier = direction === 'desc' ? -1 : 1;
  const leftValue = getSortValue(left, field);
  const rightValue = getSortValue(right, field);
  const leftMissing = leftValue === null || leftValue === undefined;
  const rightMissing = rightValue === null || rightValue === undefined;

  if (leftMissing && rightMissing) {
    if (!useFallback) return 0;
    if (left.num !== right.num) return left.num - right.num;
    return left.sourceIndex - right.sourceIndex;
  }
  if (leftMissing) return 1;
  if (rightMissing) return -1;

  let comparison = 0;
  if (field === 'name') {
    comparison = String(leftValue).localeCompare(String(rightValue));
  } else {
    comparison = Number(leftValue) - Number(rightValue);
  }

  if (comparison !== 0) return comparison * multiplier;
  if (!useFallback) return 0;
  if (left.num !== right.num) return left.num - right.num;
  return left.sourceIndex - right.sourceIndex;
}

function comparePokemonWithSecondary(left, right) {
  const primaryComparison = comparePokemon(left, right, sortField.value, sortDirection.value, { useFallback: false });
  if (primaryComparison !== 0) return primaryComparison;

  const secondaryField = sortFieldSecondary?.value ?? '';
  if (secondaryField) {
    const secondaryComparison = comparePokemon(
      left,
      right,
      secondaryField,
      sortDirectionSecondary?.value ?? 'asc',
      { useFallback: false },
    );
    if (secondaryComparison !== 0) return secondaryComparison;
  }

  if (left.num !== right.num) return left.num - right.num;
  return left.sourceIndex - right.sourceIndex;
}

function applyAllFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const format = formatFilter.value;
  const triStates = getActiveTriStates();
  const allowHiddenLinkMatches = hasActiveSearchCriteria(query, triStates);

  const filtered = allPokemon
    .filter((pokemon) => !pokemon.hidden)
    .filter((pokemon) => {
      if (matchesPokemonFilters(pokemon, query, triStates)) return true;
      if (!allowHiddenLinkMatches) return false;

      const linkedHiddenPokemon = hiddenPokemonByLink.get(pokemon.name) ?? [];
      if (!linkedHiddenPokemon.length) return false;
      if (hideUnreleased.checked && pokemon.unreleased) return false;
      if (hideImpossible.checked && pokemon.impossible) return false;

      return linkedHiddenPokemon.some((hiddenPokemon) =>
        matchesPokemonFilters(hiddenPokemon, query, triStates, { ignoreUntiered: true }),
      );
    });
  filtered.sort(comparePokemonWithSecondary);

  renderPokemonList(filtered, format);
  renderSearchSummary();
}

function applyCostStyling(costElement, cost, card) {
  costElement.className = 'pokemon-cost';
  if (card.classList.contains('is-impossible')) {
    costElement.textContent = '\u26D4';
    card.classList.add('is-uncosted');
    return;
  }

  if (card.classList.contains('is-unreleased')) {
    costElement.textContent = '\u23F3';
    card.classList.add('is-uncosted');
    return;
  }

  if (cost === null) {
    costElement.textContent = '\u274C';
    card.classList.add('is-uncosted');
    return;
  }

  costElement.textContent = String(cost);
  if ([22, 24, 26, 30, 32].includes(cost)) {
    costElement.classList.add('is-premium', `cost-${cost}`);
  }
}

function shouldRenderGenerationDividers() {
  return sortField.value === 'dex' && sortDirection.value === 'asc' && !hideDividers.checked;
}

function getGenerationDividerMap() {
  return shouldRenderGenerationDividers() ? [...pokedexGenerationDividers] : [];
}

function createGenerationDividerCard(divider) {
  const card = document.createElement('article');
  card.className = `pokemon-card pokemon-divider-card ${divider.themeClass}`;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-expanded', String(!collapsedDividerIds.has(divider.id)));
  card.setAttribute('aria-label', `${divider.name} toggle`);

  const icon = document.createElement('img');
  icon.className = 'pokemon-divider-icon';
  icon.src = divider.icon;
  icon.alt = `${divider.name} console icon`;
  icon.loading = 'lazy';

  const title = document.createElement('h3');
  title.className = 'pokemon-divider-name';
  title.textContent = divider.name;

  const hint = document.createElement('p');
  hint.className = 'pokemon-divider-hint';
  hint.textContent = collapsedDividerIds.has(divider.id) ? 'Click to expand this generation' : 'Click to collapse this generation';

  card.append(icon, title, hint);
  const toggleDivider = () => {
    if (collapsedDividerIds.has(divider.id)) {
      collapsedDividerIds.delete(divider.id);
    } else {
      collapsedDividerIds.add(divider.id);
    }
    applyAllFilters();
  };
  card.addEventListener('click', toggleDivider);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDivider();
    }
  });
  return card;
}

function getSimpleCostLabel(cost) {
  return cost === null || cost === undefined ? '?' : String(cost);
}

function isPokemonIllegalInList(pokemon, format) {
  const cost = pokemon.cost ?? null;
  return pokemon.impossible || pokemon.unreleased || (cost !== null && cost > getFormatThreshold(format));
}

function addSimpleCellOpenHandlers(cell, pokemon) {
  cell.addEventListener('click', () => openPokemonDetail(pokemon.name));
  cell.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPokemonDetail(pokemon.name);
    }
  });
}

function createSimplePokemonCell(pokemon, format) {
  const cell = document.createElement('article');
  const flags = getPokemonFlags(pokemon);
  const isIllegal = isPokemonIllegalInList(pokemon, format);
  cell.className = 'pokemon-simple-cell';
  if (isIllegal) cell.classList.add('is-illegal');
  if (flags.mega && !isIllegal) cell.classList.add('is-mega');
  cell.tabIndex = 0;
  cell.setAttribute('role', 'button');
  cell.setAttribute('aria-label', `${getPokemonDisplayName(pokemon)} details`);

  const cost = document.createElement('span');
  cost.className = 'pokemon-simple-cost';
  cost.textContent = getSimpleCostLabel(pokemon.cost);

  const name = document.createElement('span');
  name.className = 'pokemon-simple-name';
  name.textContent = getPokemonDisplayName(pokemon);

  const badges = document.createElement('span');
  badges.className = 'pokemon-simple-badges';
  for (const badgeData of buildFormBadges(pokemon)) {
    const icon = document.createElement('img');
    icon.src = badgeData.src;
    icon.alt = badgeData.alt;
    icon.loading = 'lazy';
    const badge = document.createElement('span');
    badge.className = 'pokemon-simple-badge';
    if (badgeData.warning) badge.classList.add('is-warning');
    if (badgeData.illegal) badge.classList.add('is-illegal');
    badge.append(icon);
    badges.append(badge);
  }

  cell.append(cost, name, badges);
  addSimpleCellOpenHandlers(cell, pokemon);
  return cell;
}

function createSimpleGenerationDividerCell(divider) {
  const cell = document.createElement('button');
  cell.className = `pokemon-simple-divider simple-generation-divider ${divider.themeClass}`;
  cell.type = 'button';
  cell.setAttribute('aria-expanded', String(!collapsedDividerIds.has(divider.id)));

  const icon = document.createElement('img');
  icon.src = divider.icon;
  icon.alt = '';
  icon.loading = 'lazy';

  const label = document.createElement('span');
  label.textContent = divider.name;
  cell.append(icon, label);
  cell.addEventListener('click', () => {
    if (collapsedDividerIds.has(divider.id)) {
      collapsedDividerIds.delete(divider.id);
    } else {
      collapsedDividerIds.add(divider.id);
    }
    applyAllFilters();
  });
  return cell;
}

function createSimpleCostDividerCell(cost) {
  const cell = document.createElement('div');
  cell.className = 'pokemon-simple-divider simple-cost-divider';
  cell.textContent = `Punktekosten: ${getSimpleCostLabel(cost)}`;
  return cell;
}

function renderSimplePokemonList(pokemonList, format) {
  const fragment = document.createDocumentFragment();
  const visiblePokemon = [];
  const dividers = getGenerationDividerMap();
  let activeCollapsedDivider = null;
  let dividerIndex = 0;
  let lastCostKey = Symbol('initial-cost');
  const showCostDividers = sortField.value === 'cost' && !hideDividers.checked;

  const appendGenerationDividerIfNeeded = (pokemonNum) => {
    while (dividerIndex < dividers.length && pokemonNum >= dividers[dividerIndex].startNum) {
      const divider = dividers[dividerIndex];
      fragment.append(createSimpleGenerationDividerCell(divider));
      activeCollapsedDivider = collapsedDividerIds.has(divider.id) ? divider : activeCollapsedDivider;
      dividerIndex += 1;
    }
  };

  for (const pokemon of pokemonList) {
    appendGenerationDividerIfNeeded(pokemon.num);
    if (activeCollapsedDivider) {
      if (pokemon.num > activeCollapsedDivider.endNum) {
        activeCollapsedDivider = null;
      } else if (pokemon.num >= activeCollapsedDivider.startNum) {
        if (pokemon.name === activeCollapsedDivider.end) activeCollapsedDivider = null;
        continue;
      }
    }

    const costKey = getSimpleCostLabel(pokemon.cost);
    if (showCostDividers && costKey !== lastCostKey) {
      fragment.append(createSimpleCostDividerCell(pokemon.cost));
      lastCostKey = costKey;
    }

    visiblePokemon.push(pokemon);
    fragment.append(createSimplePokemonCell(pokemon, format));
  }

  while (dividerIndex < dividers.length) {
    fragment.append(createSimpleGenerationDividerCell(dividers[dividerIndex]));
    dividerIndex += 1;
  }

  currentRenderedPokemon = visiblePokemon;
  pokedexGrid.append(fragment);
  updateResultsCount(visiblePokemon.length);
}

function createPokemonCard(pokemon, format) {
  const formatThreshold = getFormatThreshold(format);
  const cardFragment = template.content.cloneNode(true);
  const card = cardFragment.querySelector('.pokemon-card');
  const surfaceEffect = cardFragment.querySelector('.card-surface-effect');
  const borderEffect = cardFragment.querySelector('.card-border-effect');
  const number = cardFragment.querySelector('.pokemon-number');
  const cost = cardFragment.querySelector('.pokemon-cost');
  const badgeStack = cardFragment.querySelector('.form-badge-stack');
  const sprite = cardFragment.querySelector('.pokemon-sprite');
  const name = cardFragment.querySelector('.pokemon-name');
  const sortValue = cardFragment.querySelector('.pokemon-sort-value');
  const typeList = cardFragment.querySelector('.type-list');
  const specialNameVariant = getSpecialNameVariant(pokemon);

  if (pokemon.impossible) card.classList.add('is-impossible');
  if (pokemon.unreleased) card.classList.add('is-unreleased');
  const animatedBorderVariant = getAnimatedBorderVariant(pokemon.name);
  if (animatedBorderVariant === 'mega') card.classList.add('has-mega-border');
  if (animatedBorderVariant === 'primal-groudon') card.classList.add('has-primal-groudon-border');
  if (animatedBorderVariant === 'primal-kyogre') card.classList.add('has-primal-kyogre-border');
  if (hasWormholeEffect(pokemon)) card.classList.add('has-wormhole-effect');
  const borderColors = getTypeBorderColors(pokemon);
  card.style.setProperty('--card-type-primary', borderColors.primary);
  card.style.setProperty('--card-type-secondary', borderColors.secondary);
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${getPokemonDisplayName(pokemon)} details`);
  number.textContent = pokemon.displayNumber;
  applyCostStyling(cost, pokemon.cost ?? null, card);
  if (pokemon.cost !== null && pokemon.cost > formatThreshold) card.classList.add('is-over-format');
  if (borderEffect) {
    borderEffect.style.setProperty('--card-type-primary', borderColors.primary);
    borderEffect.style.setProperty('--card-type-secondary', borderColors.secondary);
  }
  if (surfaceEffect) {
    surfaceEffect.style.setProperty('--card-type-primary', borderColors.primary);
    surfaceEffect.style.setProperty('--card-type-secondary', borderColors.secondary);
  }

  for (const badge of buildFormBadges(pokemon)) {
    badgeStack.append(createFormBadgeNode(badge));
  }
  if (!badgeStack.children.length) badgeStack.remove();

  sprite.src = pokemon.sprite;
  sprite.alt = `${getPokemonDisplayName(pokemon)} sprite`;
  sprite.addEventListener('error', () => {
    sprite.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><rect width="72" height="72" rx="18" fill="#f0e3d1"/><text x="36" y="42" text-anchor="middle" font-size="16" font-family="Arial, sans-serif" fill="#8f2d23">?</text></svg>');
  }, { once: true });

  name.textContent = getPokemonDisplayName(pokemon);
  if (specialNameVariant === 'quark') name.classList.add('is-quark-name');
  if (specialNameVariant === 'proto') name.classList.add('is-proto-name');
  const sortDisplayValue = getSortDisplayValue(pokemon, sortField.value);
  if (sortDisplayValue) {
    sortValue.hidden = false;
    sortValue.textContent = sortDisplayValue;
  }
  card.addEventListener('click', () => openPokemonDetail(pokemon.name));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPokemonDetail(pokemon.name);
    }
  });
  for (const type of pokemon.types) {
    const icon = document.createElement('img');
    icon.className = 'type-icon';
    icon.src = typeIcons[type] ?? '';
    icon.alt = type;
    icon.loading = 'lazy';
    typeList.append(icon);
  }

  return cardFragment;
}

function renderPokemonList(pokemonList, format = formatFilter.value) {
  pokedexGrid.innerHTML = '';
  pokedexGrid.classList.toggle('is-simple-view', simpleViewToggle.checked);
  const dividers = getGenerationDividerMap();

  if (!pokemonList.length) {
    const emptyState = document.createElement('p');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No Pokemon match that search yet.';
    pokedexGrid.append(emptyState);
    updateResultsCount(0);
    return;
  }

  if (simpleViewToggle.checked) {
    renderSimplePokemonList(pokemonList, format);
    return;
  }

  const fragment = document.createDocumentFragment();
  const visiblePokemon = [];
  let activeCollapsedDivider = null;
  let dividerIndex = 0;

  const appendDividerIfNeeded = (pokemonNum) => {
    while (dividerIndex < dividers.length && pokemonNum >= dividers[dividerIndex].startNum) {
      const divider = dividers[dividerIndex];
      fragment.append(createGenerationDividerCard(divider));
      activeCollapsedDivider = collapsedDividerIds.has(divider.id) ? divider : activeCollapsedDivider;
      dividerIndex += 1;
    }
  };

  for (const pokemon of pokemonList) {
    appendDividerIfNeeded(pokemon.num);
    if (activeCollapsedDivider) {
      if (pokemon.num > activeCollapsedDivider.endNum) {
        activeCollapsedDivider = null;
      } else if (pokemon.num >= activeCollapsedDivider.startNum) {
        if (pokemon.name === activeCollapsedDivider.end) activeCollapsedDivider = null;
        continue;
      }
    }
    visiblePokemon.push(pokemon);
    fragment.append(createPokemonCard(pokemon, format));
  }

  while (dividerIndex < dividers.length) {
    fragment.append(createGenerationDividerCard(dividers[dividerIndex]));
    dividerIndex += 1;
  }

  currentRenderedPokemon = visiblePokemon;
  pokedexGrid.append(fragment);
  updateResultsCount(visiblePokemon.length);
}

function buildCoverageRows() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 4; index += 1) {
    const row = document.createElement('div');
    row.className = 'coverage-row';
    row.innerHTML = `
      <label><input type="checkbox" data-role="enabled" /></label>
      <select data-role="type">${battleTypes.map((type) => `<option value="${type}">${type}</option>`).join('')}</select>
      <input type="range" min="10" max="250" step="5" value="60" data-role="power" />
      <input class="coverage-value" type="number" min="10" max="250" step="5" value="60" data-role="value" />
    `;
    const slider = row.querySelector('[data-role="power"]');
    const output = row.querySelector('[data-role="value"]');
    slider.addEventListener('input', () => {
      output.value = slider.value;
    });
    output.addEventListener('input', () => {
      const numericValue = Number(output.value);
      if (Number.isNaN(numericValue)) return;
      const clamped = Math.min(250, Math.max(10, numericValue));
      const stepped = Math.round(clamped / 5) * 5;
      slider.value = String(stepped);
    });
    output.addEventListener('blur', () => {
      const numericValue = Number(output.value);
      const clamped = Number.isNaN(numericValue) ? 60 : Math.min(250, Math.max(10, numericValue));
      const stepped = Math.round(clamped / 5) * 5;
      output.value = String(stepped);
      slider.value = String(stepped);
    });
    fragment.append(row);
  }
  coverageList.append(fragment);
}

function buildDefensiveCoverageRows() {
  const fragment = document.createDocumentFragment();
  for (const type of battleTypes) {
    const row = document.createElement('div');
    row.className = 'defensive-row';
    row.innerHTML = `
      <input type="checkbox" />
      <span>${type}</span>
      <select>
        <option value="resistant">Resistent</option>
        <option value="neutral">Nicht Schwach</option>
        <option value="immune">Immun</option>
      </select>
    `;
    fragment.append(row);
  }
  defensiveCoverageGrid.append(fragment);
}

function setupInfoButtons() {
  const infoConfigs = [
    {
      id: 'speed-control-info',
      label: 'Speed Control',
      text: 'Tailwind sucht nach Tailwind, Webs nach Sticky Web, Irgendeine akzeptiert beides.',
    },
    {
      id: 'hazards-info',
      label: 'Hazards',
      text: 'Rocks sucht Stealth Rock, Webs Sticky Web, Spikes Spikes, T-Spikes Toxic Spikes oder Toxic Debris, Schaden Spikes oder Stealth Rock oder Copperajah-Gmax.',
    },
    {
      id: 'pivot-info',
      label: 'Pivot',
      text: 'Offensiv sucht U-turn oder Volt Switch. Defensiv sucht Parting Shot, Shed Tail, Chilly Reception oder Teleport. Irgendeine akzeptiert diese Moves oder Wimp Out oder Emergency Exit.',
    },
  ];

  for (const config of infoConfigs) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'info-button';
    button.textContent = '?';
    button.title = config.text;
    button.setAttribute('aria-label', `${config.label} Info`);
    const label = document.querySelector(`[data-info-anchor="${config.id}"]`);
    if (label) label.append(button);
  }
}

function resetAdvancedSearchModal() {
  detailsName.value = '';
  abilityMode.value = 'all';
  moveMode.value = 'all';
  draftAbilityTokens = [];
  draftMoveTokens = [];
  refreshAbilityTokens();
  refreshMoveTokens();
  speedControlEnabled.checked = false;
  speedControlMode.value = 'tailwind';
  hazardsEnabled.checked = false;
  hazardsMode.value = 'rocks';
  pivotEnabled.checked = false;
  pivotMode.value = 'offense';
  statSearchMode.value = 'base';

  for (const row of coverageList.querySelectorAll('.coverage-row')) {
    row.querySelector('[data-role="enabled"]').checked = false;
    row.querySelector('[data-role="type"]').value = 'Normal';
    row.querySelector('[data-role="power"]').value = '60';
    row.querySelector('[data-role="value"]').value = '60';
  }

  for (const row of statRangeGrid.querySelectorAll('.stat-range-row')) {
    row.querySelector('[data-role="min"]').value = '';
    row.querySelector('[data-role="max"]').value = '';
  }

  for (const row of defensiveCoverageGrid.querySelectorAll('.defensive-row')) {
    row.querySelector('input[type="checkbox"]').checked = false;
    row.querySelector('select').value = 'resistant';
  }
}

function parseOptionalStatValue(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const numericValue = Number(trimmed);
  if (Number.isNaN(numericValue)) return null;
  return Math.min(999, Math.max(1, numericValue));
}

function readStatRangeCriteria() {
  return Object.fromEntries(
    [...statRangeGrid.querySelectorAll('.stat-range-row')]
      .map((row) => {
        const stat = row.dataset.stat;
        const min = parseOptionalStatValue(row.querySelector('[data-role="min"]').value);
        const max = parseOptionalStatValue(row.querySelector('[data-role="max"]').value);
        if (min === null && max === null) return null;
        return [stat, { min, max }];
      })
      .filter(Boolean),
  );
}

function readDefensiveCoverageCriteria() {
  return [...defensiveCoverageGrid.querySelectorAll('.defensive-row')]
    .filter((row) => row.querySelector('input[type="checkbox"]').checked)
    .map((row) => ({
      type: row.querySelector('span').textContent,
      mode: row.querySelector('select').value,
    }));
}

function renderSearchSummary() {
  const chips = [];
  const triStates = getActiveTriStates();

  chips.push(`Format: ${formatFilter.options[formatFilter.selectedIndex].text}`);
  chips.push(`Sortierung: ${sortField.options[sortField.selectedIndex].text} (${sortDirection.value === 'desc' ? 'Absteigend' : 'Aufsteigend'})`);
  if (sortFieldSecondary?.value) {
    chips.push(`Sekundär: ${sortFieldSecondary.options[sortFieldSecondary.selectedIndex].text} (${sortDirectionSecondary?.value === 'desc' ? 'Absteigend' : 'Aufsteigend'})`);
  }
  if (searchInput.value.trim()) chips.push(`Suche: ${searchInput.value.trim()}`);
  if (appliedAdvancedSearch.name) chips.push(`Name: ${appliedAdvancedSearch.name}`);
  if (appliedAdvancedSearch.abilities.length) {
    chips.push(`Fähigkeiten (${appliedAdvancedSearch.abilityMode === 'all' ? 'Alle' : 'Eine aus'}): ${appliedAdvancedSearch.abilities.map((item) => item.name).join(', ')}`);
  }
  if (appliedAdvancedSearch.moves.length) {
    chips.push(`Attacken (${appliedAdvancedSearch.moveMode === 'all' ? 'Alle' : 'Eine aus'}): ${appliedAdvancedSearch.moves.map((item) => item.name).join(', ')}`);
  }
  for (const criterion of appliedAdvancedSearch.coverage) {
    chips.push(`Coverage: ${criterion.type} >= ${criterion.minPower}`);
  }
  for (const [stat, range] of Object.entries(appliedAdvancedSearch.statRanges)) {
    const parts = [];
    if (range.min !== null) parts.push(`>= ${range.min}`);
    if (range.max !== null) parts.push(`<= ${range.max}`);
    chips.push(`${statLabels[stat] ?? stat} (${appliedAdvancedSearch.statMode === 'real' ? 'Echte Werte' : 'Basiswerte'}): ${parts.join(' / ')}`);
  }
  if (appliedAdvancedSearch.speedControl.enabled) chips.push(`Speed Control: ${speedControlMode.options[speedControlMode.selectedIndex].text}`);
  if (appliedAdvancedSearch.hazards.enabled) chips.push(`Hazards: ${hazardsMode.options[hazardsMode.selectedIndex].text}`);
  if (appliedAdvancedSearch.pivot.enabled) chips.push(`Pivot: ${pivotMode.options[pivotMode.selectedIndex].text}`);
  for (const criterion of appliedAdvancedSearch.defensiveCoverage) {
    const modeLabel = criterion.mode === 'resistant' ? 'Resistent' : criterion.mode === 'neutral' ? 'Nicht Schwach' : 'Immun';
    chips.push(`Defensiv: ${criterion.type} ${modeLabel}`);
  }
  if (triStates.z !== 'any') chips.push(`Z-Captain: ${triStates.z === 'include' ? 'Ja' : 'Nein'}`);
  if (triStates.tera !== 'any') chips.push(`Tera-Captain: ${triStates.tera === 'include' ? 'Ja' : 'Nein'}`);
  if (triStates.mega !== 'any') chips.push(`Mega: ${triStates.mega === 'include' ? 'Ja' : 'Nein'}`);
  if (triStates.gmax !== 'any') chips.push(`GMAX: ${triStates.gmax === 'include' ? 'Ja' : 'Nein'}`);
  if (activeExpertSearch.raw) chips.push(`Expertensuche: ${activeExpertSearch.raw}`);
  if (hideUnreleased.checked) chips.push('Hide Unreleased');
  if (hideImpossible.checked) chips.push('Hide Impossible');
  if (hideUntiered.checked) chips.push('Hide Untiered');
  if (hideDividers.checked) chips.push('Hide Dividers');
  if (simpleViewToggle.checked) chips.push('Einfache Ansicht');

  searchSummary.innerHTML = '';
  searchSummary.hidden = chips.length === 1 && chips[0].startsWith('Format:') && formatFilter.value === 'normal';
  if (searchSummary.hidden) return;

  for (const chipText of chips) {
    const chip = document.createElement('span');
    chip.className = 'summary-chip';
    chip.textContent = chipText;
    searchSummary.append(chip);
  }

  if (activeExpertSearch.matcher) {
    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'summary-reset-button';
    resetButton.textContent = 'Zur normalen Suche';
    resetButton.addEventListener('click', clearExpertSearch);
    searchSummary.append(resetButton);
  }
}

function setSpriteWithFallback(image, spriteUrl, label) {
  image.src = spriteUrl;
  image.alt = label;
  image.onerror = () => {
    image.onerror = null;
    image.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><rect width="72" height="72" rx="18" fill="#f0e3d1"/><text x="36" y="42" text-anchor="middle" font-size="16" font-family="Arial, sans-serif" fill="#8f2d23">?</text></svg>');
  };
}

function clearDetailEffectTimeouts() {
  for (const timeoutId of detailEffectTimeouts) {
    clearTimeout(timeoutId);
    clearInterval(timeoutId);
  }
  detailEffectTimeouts = [];
}

function queueDetailEffect(callback, delay) {
  const timeoutId = setTimeout(() => {
    detailEffectTimeouts = detailEffectTimeouts.filter((entry) => entry !== timeoutId);
    callback();
  }, delay);
  detailEffectTimeouts.push(timeoutId);
}

function randomizePorygonCase(text) {
  return text
    .split('')
    .map((character) => {
      if (!/[a-z]/i.test(character)) return character;
      return Math.random() < 0.5 ? character.toLowerCase() : character.toUpperCase();
    })
    .join('');
}

function scramblePorygonText(text) {
  const letters = text.split('');
  const mutableIndexes = letters
    .map((character, index) => (/[a-z]/i.test(character) ? index : -1))
    .filter((index) => index >= 0);
  const shuffledIndexes = [...mutableIndexes];
  for (let index = shuffledIndexes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffledIndexes[index], shuffledIndexes[swapIndex]] = [shuffledIndexes[swapIndex], shuffledIndexes[index]];
  }
  const remapped = [...letters];
  mutableIndexes.forEach((sourceIndex, index) => {
    remapped[sourceIndex] = letters[shuffledIndexes[index]];
  });
  return randomizePorygonCase(remapped.join(''));
}

function applyPorygonZDetailEffect(pokemon, titleElements, spriteWrap, spriteLayers) {
  if (pokemon.name !== 'Porygon-Z') return;
  const originalTitleEntries = titleElements.map((element) => ({
    element,
    text: element.textContent ?? '',
  }));
  const effectDuration = 3200;
  const textInterval = setInterval(() => {
    for (const { element, text } of originalTitleEntries) {
      element.textContent = scramblePorygonText(text);
      element.classList.add('is-porygon-glitching');
    }
  }, 90);
  detailEffectTimeouts.push(textInterval);
  queueDetailEffect(() => {
    clearInterval(textInterval);
    for (const { element, text } of originalTitleEntries) {
      element.textContent = text;
      element.classList.remove('is-porygon-glitching');
    }
  }, effectDuration);

  spriteWrap.classList.add('is-porygon-glitching');
  const spriteInterval = setInterval(() => {
    spriteWrap.style.setProperty('--porygon-glitch-rotation', `${(Math.random() * 10 - 5).toFixed(2)}deg`);
    spriteWrap.style.setProperty('--porygon-glitch-scale-x', Math.random() < 0.28 ? '-1' : '1');
    spriteWrap.style.setProperty('--porygon-glitch-scale-y', Math.random() < 0.18 ? '-1' : '1');
    spriteWrap.style.setProperty('--porygon-glitch-pink-x', `${Math.round(Math.random() * 8 - 4)}px`);
    spriteWrap.style.setProperty('--porygon-glitch-pink-y', `${Math.round(Math.random() * 8 - 4)}px`);
    spriteWrap.style.setProperty('--porygon-glitch-blue-x', `${Math.round(Math.random() * 8 - 4)}px`);
    spriteWrap.style.setProperty('--porygon-glitch-blue-y', `${Math.round(Math.random() * 8 - 4)}px`);
    for (const layer of spriteLayers) {
      layer.classList.add('is-porygon-glitching');
    }
  }, 110);
  detailEffectTimeouts.push(spriteInterval);
  queueDetailEffect(() => {
    clearInterval(spriteInterval);
    spriteWrap.classList.remove('is-porygon-glitching');
    spriteWrap.style.removeProperty('--porygon-glitch-rotation');
    spriteWrap.style.removeProperty('--porygon-glitch-scale-x');
    spriteWrap.style.removeProperty('--porygon-glitch-scale-y');
    spriteWrap.style.removeProperty('--porygon-glitch-pink-x');
    spriteWrap.style.removeProperty('--porygon-glitch-pink-y');
    spriteWrap.style.removeProperty('--porygon-glitch-blue-x');
    spriteWrap.style.removeProperty('--porygon-glitch-blue-y');
    for (const layer of spriteLayers) {
      layer.classList.remove('is-porygon-glitching');
    }
  }, effectDuration);
}

function getRandomOtherPokemon(excludedNames = []) {
  const excluded = new Set(excludedNames);
  const options = allPokemon.filter((pokemon) => !excluded.has(pokemon.name));
  if (!options.length) return null;
  return options[Math.floor(Math.random() * options.length)];
}

function applyIllusionSpriteEffect(image, targetPokemon) {
  const disguise = getRandomOtherPokemon([targetPokemon.name]);
  if (!disguise) {
    setSpriteWithFallback(image, targetPokemon.sprite, `${targetPokemon.name} sprite`);
    return;
  }
  setSpriteWithFallback(image, disguise.sprite, `${disguise.name} sprite`);
  queueDetailEffect(() => {
    setSpriteWithFallback(image, targetPokemon.sprite, `${targetPokemon.name} sprite`);
    image.classList.remove('is-illusioning');
    void image.offsetWidth;
    image.classList.add('is-illusioning');
    queueDetailEffect(() => {
      image.classList.remove('is-illusioning');
    }, 1000);
  }, 1280);
}

function applyDittoSpriteEffect(image, targetPokemon) {
  setSpriteWithFallback(image, targetPokemon.sprite, `${targetPokemon.name} sprite`);
  queueDetailEffect(() => {
    if (activeDetailPokemonName !== 'Ditto') return;
    const disguise = getRandomOtherPokemon(['Ditto']);
    if (!disguise) return;
    setSpriteWithFallback(image, disguise.sprite, `${disguise.name} sprite`);
    image.classList.remove('is-ditto-warp');
    image.classList.remove('is-illusioning');
    void image.offsetWidth;
    image.classList.add('is-ditto-warp');
  }, 5000);
}

function renderEmptyDetailState(container, message) {
  container.innerHTML = '';
  const emptyState = document.createElement('div');
  emptyState.className = 'detail-empty-state';
  emptyState.textContent = message;
  container.append(emptyState);
}

function getCurrentDetailNavigation(pokemon) {
  const currentIndex = currentRenderedPokemon.findIndex((entry) => entry.name === pokemon.name);
  if (currentIndex >= 0) {
    return {
      previous: currentRenderedPokemon[currentIndex - 1] ?? null,
      next: currentRenderedPokemon[currentIndex + 1] ?? null,
    };
  }

  const fallbackIndex = currentRenderedPokemon.findIndex((entry) => entry.name === pokemon.linkedTo);
  if (fallbackIndex >= 0) {
    return {
      previous: currentRenderedPokemon[fallbackIndex - 1] ?? null,
      next: currentRenderedPokemon[fallbackIndex + 1] ?? null,
    };
  }

  return { previous: null, next: null };
}

function getAbilitySlotLabel(slot) {
  if (slot === 'Spezial') return 'Spezial';
  if (slot === 'H') return 'Hidden Ability';
  if (slot === 'S') return 'Special';
  return `Slot ${slot}`;
}

function getFamilyMembers(pokemon) {
  const family = [];
  const wormadamNames = ['Wormadam', 'Wormadam-Sandy', 'Wormadam-Trash'];
  const initialNames = [
    pokemon.name,
    pokemon.baseSpecies ?? null,
    pokemon.changesFrom ?? null,
    pokemon.linkedTo ?? null,
  ].filter(Boolean);
  if (wormadamNames.includes(pokemon.name)) initialNames.push(...wormadamNames);
  const queue = initialNames
    .map((name) => pokemonByName.get(name))
    .filter(Boolean);
  const seen = new Set();
  while (queue.length) {
    const current = queue.shift();
    if (!current || seen.has(current.name)) continue;
    seen.add(current.name);
    family.push(current);
    if (current.prevo && pokemonByName.has(current.prevo)) {
      queue.push(pokemonByName.get(current.prevo));
    }
    for (const evoName of current.evos ?? []) {
      const evo = pokemonByName.get(evoName);
      if (evo) queue.push(evo);
    }
  }

  return family.sort((left, right) => {
    if (left.num !== right.num) return left.num - right.num;
    return left.sourceIndex - right.sourceIndex;
  });
}

function getPokemonByNameLoose(name) {
  return pokemonByName.get(name) ?? pokemonByNormalizedName.get(normalizeText(name)) ?? null;
}

function getCoreFinderVisiblePokemon() {
  return allPokemon.filter((pokemon) => !pokemon.hidden && !pokemon.unreleased && !pokemon.impossible);
}

function pokemonIsPivot(pokemon) {
  return pokemonHasAnyMoveId(pokemon, ['uturn', 'voltswitch', 'partingshot', 'shedtail', 'chillyreception', 'teleport']) ||
    Object.values(pokemon.abilities ?? {}).includes('Wimp Out') ||
    Object.values(pokemon.abilities ?? {}).includes('Emergency Exit');
}

function getCoreFinderSlotConfigs() {
  if (coreFinderState.size === 3) {
    return [
      { index: 0, kind: 'set', label: 'Pokémon 1' },
      { index: 1, kind: 'set', label: 'Pokémon 2' },
      { index: 2, kind: 'search', label: 'Pokémon 3' },
    ];
  }

  return [
    { index: 0, kind: 'set', label: 'Pokémon 1' },
    { index: 1, kind: 'set', label: 'Pokémon 2' },
    { index: 2, kind: coreFinderState.thirdSlotMode, label: 'Pokémon 3', canToggle: true },
    { index: 3, kind: 'search', label: 'Pokémon 4' },
  ];
}

function getCoreFinderSelectedPokemon(index) {
  const selectedName = coreFinderState.selectedNames[index];
  if (!selectedName) return null;
  return pokemonByName.get(selectedName) ?? null;
}

function getCoreFinderMatches(query, excludedNames = new Set()) {
  const visiblePokemon = getCoreFinderVisiblePokemon().filter((pokemon) => !excludedNames.has(pokemon.name));
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return visiblePokemon.slice(0, 12);
  return visiblePokemon
    .filter((pokemon) => normalizeText(pokemon.name).includes(normalizedQuery))
    .slice(0, 12);
}

function createCoreFinderPreviewCard(pokemon) {
  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector('.pokemon-card');
  const number = fragment.querySelector('.pokemon-number');
  const cost = fragment.querySelector('.pokemon-cost');
  const badgeStack = fragment.querySelector('.form-badge-stack');
  const sprite = fragment.querySelector('.pokemon-sprite');
  const typeList = fragment.querySelector('.type-list');
  const name = fragment.querySelector('.pokemon-name');
  const sortValue = fragment.querySelector('.pokemon-sort-value');
  const borderEffect = fragment.querySelector('.card-border-effect');

  card.classList.add('core-slot-preview-card');
  const flags = getPokemonFlags(pokemon);
  const animatedBorderVariant = getAnimatedBorderVariant(pokemon.name);
  if (flags.mega) card.classList.add('has-mega-border');
  if (animatedBorderVariant === 'primal-groudon') card.classList.add('has-primal-groudon-border');
  if (animatedBorderVariant === 'primal-kyogre') card.classList.add('has-primal-kyogre-border');
  if (hasWormholeEffect(pokemon)) card.classList.add('has-wormhole-effect');
  const borderColors = getTypeBorderColors(pokemon);
  card.style.setProperty('--card-type-primary', borderColors.primary);
  card.style.setProperty('--card-type-secondary', borderColors.secondary);
  if (borderEffect) {
    borderEffect.style.setProperty('--card-type-primary', borderColors.primary);
    borderEffect.style.setProperty('--card-type-secondary', borderColors.secondary);
  }

  number.textContent = pokemon.displayNumber;
  applyCostStyling(cost, pokemon.cost ?? null, card);
  badgeStack.replaceChildren(...buildFormBadges(pokemon).map(createFormBadgeNode));
  setSpriteWithFallback(sprite, pokemon.sprite, `${pokemon.name} sprite`);
  for (const type of pokemon.types ?? []) {
    const icon = document.createElement('img');
    icon.src = typeIcons[type] ?? '';
    icon.alt = type;
    typeList.append(icon);
  }
  name.textContent = pokemon.name;
  const specialNameVariant = getSpecialNameVariant(pokemon);
  if (specialNameVariant === 'quark') name.classList.add('is-quark-name');
  if (specialNameVariant === 'proto') name.classList.add('is-proto-name');
  sortValue.hidden = true;
  return card;
}

function getCoreDefenseProfile(pokemon) {
  if (coreDefenseProfileCache.has(pokemon.name)) return coreDefenseProfileCache.get(pokemon.name);
  const values = Object.fromEntries(
    battleTypes.map((type) => [type, getReplacementBestDefenseValue(pokemon, type)]),
  );
  const profile = {
    pokemon,
    values,
    weakTypes: battleTypes.filter((type) => values[type] >= 2),
  };
  coreDefenseProfileCache.set(pokemon.name, profile);
  return profile;
}

function getCoreWeaknessSummary(team, allowedExceptionType = null) {
  const profiles = team.map(getCoreDefenseProfile);
  const duplicatedWeakTypes = new Set();
  const uncoveredWeakTypes = new Set();
  for (const [profileIndex, profile] of profiles.entries()) {
    for (const type of profile.weakTypes) {
      if (allowedExceptionType && type === allowedExceptionType) continue;
      const others = profiles.filter((_, index) => index !== profileIndex);
      if (!others.every((other) => other.values[type] < 2)) duplicatedWeakTypes.add(type);
      if (!others.some((other) => other.values[type] <= 0.5)) uncoveredWeakTypes.add(type);
    }
  }
  return {
    duplicatedWeakTypes: [...duplicatedWeakTypes],
    uncoveredWeakTypes: [...uncoveredWeakTypes],
  };
}

function isDefensivelyCoveredCore(team, allowedExceptionType = null) {
  const summary = getCoreWeaknessSummary(team, allowedExceptionType);
  return !summary.duplicatedWeakTypes.length && !summary.uncoveredWeakTypes.length;
}

function getSuggestedCoreException(teams) {
  let best = null;
  for (const team of teams) {
    const summary = getCoreWeaknessSummary(team);
    const duplicateCount = summary.duplicatedWeakTypes.length;
    const uncoveredCount = summary.uncoveredWeakTypes.length;
    if (!duplicateCount && !uncoveredCount) continue;
    const cause = summary.duplicatedWeakTypes.length ? 'duplicate' : 'uncovered';
    const suggestedType = cause === 'duplicate'
      ? summary.duplicatedWeakTypes[0] ?? null
      : summary.uncoveredWeakTypes[0] ?? null;
    if (!suggestedType) continue;
    const candidate = { team, summary, suggestedType, cause, duplicateCount, uncoveredCount };
    if (!best) {
      best = candidate;
      continue;
    }
    if (candidate.duplicateCount !== best.duplicateCount) {
      if (candidate.duplicateCount < best.duplicateCount) best = candidate;
      continue;
    }
    if (candidate.uncoveredCount !== best.uncoveredCount) {
      if (candidate.uncoveredCount < best.uncoveredCount) best = candidate;
      continue;
    }
    const candidateCost = team.reduce((total, pokemon) => total + (pokemon.cost ?? 99), 0);
    const bestCost = best.team.reduce((total, pokemon) => total + (pokemon.cost ?? 99), 0);
    if (candidateCost < bestCost) best = candidate;
  }
  return best
    ? {
        type: best.suggestedType,
        cause: best.cause,
      }
    : null;
}

function isFullyEvolvedPokemon(pokemon) {
  return !Array.isArray(pokemon.evos) || pokemon.evos.length === 0;
}

function buildCoreFinderResult(team) {
  const profiles = team.map(getCoreDefenseProfile);
  const resistedOrImmuneTypes = new Set();
  const immuneTypes = new Set();
  for (const type of battleTypes) {
    if (profiles.some((profile) => profile.values[type] <= 0.5)) resistedOrImmuneTypes.add(type);
    if (profiles.some((profile) => profile.values[type] === 0)) immuneTypes.add(type);
  }
  return {
    team,
    totalCost: team.reduce((total, pokemon) => total + (pokemon.cost ?? 99), 0),
    totalWeaknesses: profiles.reduce((total, profile) => total + profile.weakTypes.length, 0),
    resistanceCoverage: resistedOrImmuneTypes.size,
    immunityCoverage: immuneTypes.size,
    fullyEvolvedCount: team.filter(isFullyEvolvedPokemon).length,
    megaCount: team.filter((pokemon) => isMegaPokemon(pokemon.name)).length,
  };
}

function getCoreFinderSearchContext() {
  const configs = getCoreFinderSlotConfigs();
  const fixedIndexes = configs.filter((config) => config.kind === 'set').map((config) => config.index);
  const searchIndexes = configs.filter((config) => config.kind === 'search').map((config) => config.index);
  const fixedPokemon = [];

  for (const index of fixedIndexes) {
    const pokemon = getCoreFinderSelectedPokemon(index);
    if (!pokemon) {
      return { error: `Bitte wähle ${configs.find((config) => config.index === index)?.label ?? `Pokémon ${index + 1}`} aus.` };
    }
    fixedPokemon.push(pokemon);
  }

  const uniqueNames = new Set(fixedPokemon.map((pokemon) => pokemon.name));
  if (uniqueNames.size !== fixedPokemon.length) {
    return { error: 'Bitte wähle keine doppelten Pokémon für den Core aus.' };
  }

  if (coreFinderState.pivotChain && fixedPokemon.some((pokemon) => !pokemonIsPivot(pokemon))) {
    return { error: 'Pivot Chain ist aktiv, aber mindestens eines der gesetzten Pokémon ist kein Pivot.' };
  }

  return {
    fixedPokemon,
    searchIndexes,
    excludedNames: uniqueNames,
  };
}

function findCoreFinderResults(options = {}) {
  const { allowedExceptionType = null } = options;
  const context = getCoreFinderSearchContext();
  if (context.error) return context;
  const candidatePool = getCoreFinderVisiblePokemon().filter((pokemon) =>
    !context.excludedNames.has(pokemon.name) &&
    (!coreFinderState.pivotChain || pokemonIsPivot(pokemon)),
  );
  const results = [];
  const attemptedTeams = [];

  if (context.searchIndexes.length === 1) {
    for (const candidate of candidatePool) {
      const team = [...context.fixedPokemon, candidate];
      attemptedTeams.push(team);
      if (!isDefensivelyCoveredCore(team, allowedExceptionType)) continue;
      results.push(buildCoreFinderResult(team));
    }
  } else {
    for (let index = 0; index < candidatePool.length; index += 1) {
      const first = candidatePool[index];
      for (let inner = index + 1; inner < candidatePool.length; inner += 1) {
        const second = candidatePool[inner];
        const team = [...context.fixedPokemon, first, second];
        if (team.filter((pokemon) => isMegaPokemon(pokemon.name)).length > 1) continue;
        attemptedTeams.push(team);
        if (!isDefensivelyCoveredCore(team, allowedExceptionType)) continue;
        results.push(buildCoreFinderResult(team));
      }
    }
  }

  results.sort((left, right) => {
    if (left.resistanceCoverage !== right.resistanceCoverage) return right.resistanceCoverage - left.resistanceCoverage;
    if (left.immunityCoverage !== right.immunityCoverage) return right.immunityCoverage - left.immunityCoverage;
    if (left.fullyEvolvedCount !== right.fullyEvolvedCount) return right.fullyEvolvedCount - left.fullyEvolvedCount;
    if (left.totalWeaknesses !== right.totalWeaknesses) return left.totalWeaknesses - right.totalWeaknesses;
    if (left.totalCost !== right.totalCost) return left.totalCost - right.totalCost;
    return left.team.map((pokemon) => pokemon.name).join('|').localeCompare(right.team.map((pokemon) => pokemon.name).join('|'));
  });

  return {
    results,
    limited: results.slice(0, 120),
    total: results.length,
    suggestedException: allowedExceptionType ? null : getSuggestedCoreException(attemptedTeams),
  };
}

function createCoreFinderLineupItem(pokemon) {
  const item = document.createElement('div');
  item.className = 'core-finder-lineup-item';
  const sprite = document.createElement('img');
  setSpriteWithFallback(sprite, pokemon.sprite, `${pokemon.name} sprite`);
  const label = document.createElement('span');
  label.textContent = pokemon.name;
  item.append(sprite, label);
  return item;
}

function createCoreFinderDefenseMatrix(pokemon) {
  const profile = getCoreDefenseProfile(pokemon);
  const card = document.createElement('div');
  card.className = 'core-finder-matrix-card';
  const title = document.createElement('h4');
  title.textContent = getPokemonDisplayName(pokemon);
  const grid = document.createElement('div');
  grid.className = 'core-finder-defense-grid';
  for (const type of battleTypes) {
    const item = document.createElement('div');
    const classification = classifyDefenseValue(profile.values[type]);
    item.className = `core-finder-defense-item ${classification.className}`;
    if (typeIcons[type]) {
      const icon = document.createElement('img');
      icon.src = typeIcons[type];
      icon.alt = type;
      item.append(icon);
    }
    const label = document.createElement('span');
    label.textContent = `${type} ${profile.values[type]}x`;
    item.append(label);
    grid.append(item);
  }
  card.append(title, grid);
  return card;
}

function renderCoreFinderResults(searchResult) {
  coreFinderResultsSection.hidden = false;
  coreFinderResults.innerHTML = '';

  if (searchResult.error) {
    renderEmptyDetailState(coreFinderResults, searchResult.error);
    return;
  }

  const results = searchResult.limited ?? [];
  if (!results.length) {
    renderEmptyDetailState(coreFinderResults, 'Keine passenden Core-Ergänzungen gefunden.');
    return;
  }

  const summary = document.createElement('p');
  summary.className = 'core-finder-results-summary';
  summary.textContent = searchResult.total > results.length
    ? `${searchResult.total} Ergebnisse gefunden. Die ersten ${results.length} werden angezeigt.`
    : `${searchResult.total} Ergebnisse gefunden.`;
  coreFinderResults.append(summary);

  for (const result of results) {
    const card = document.createElement('div');
    card.className = 'core-finder-result-card';
    const lineup = document.createElement('div');
    lineup.className = 'core-finder-lineup';
    for (const pokemon of result.team) {
      lineup.append(createCoreFinderLineupItem(pokemon));
    }
    const matrices = document.createElement('div');
    matrices.className = 'core-finder-matrices';
    for (const pokemon of result.team) {
      matrices.append(createCoreFinderDefenseMatrix(pokemon));
    }
    card.append(lineup, matrices);
    coreFinderResults.append(card);
  }
}

function openCoreFinderExceptionModal(exception) {
  coreFinderPendingException = exception;
  if (exception?.cause === 'duplicate') {
    coreFinderExceptionMessage.textContent = `Es wurde zuerst im Hintergrund nach einem perfekten Core gesucht, aber keiner gefunden. Das Hauptproblem ist eine doppelte Schwäche gegen ${exception.type}. Du kannst trotzdem nach dem nächstbesten Ergebnis suchen und ${exception.type} als Ausnahme zulassen, oder den Vorgang abbrechen.`;
    return;
  }
  coreFinderExceptionMessage.textContent = `Es wurde zuerst im Hintergrund nach einem perfekten Core gesucht, aber keiner gefunden. Die Schwäche gegen ${exception?.type} konnte in den geprüften Kombinationen nicht sauber durch eine Resistenz oder Immunität abgefangen werden. Du kannst trotzdem nach dem nächstbesten Ergebnis suchen und ${exception?.type} als Ausnahme zulassen, oder den Vorgang abbrechen.`;
  coreFinderExceptionModal.hidden = false;
}

function closeCoreFinderExceptionModal() {
  coreFinderExceptionModal.hidden = true;
  coreFinderPendingException = null;
}

function runCoreFinderSearch(options = {}) {
  const { allowedExceptionType = null } = options;
  const searchResult = findCoreFinderResults({ allowedExceptionType });
  if (!allowedExceptionType && !searchResult.error && searchResult.total === 0 && searchResult.suggestedException) {
    openCoreFinderExceptionModal(searchResult.suggestedException);
    return;
  }
  closeCoreFinderExceptionModal();
  renderCoreFinderResults(searchResult);
  coreFinderResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createCoreFinderToggle(index) {
  const toggle = document.createElement('div');
  toggle.className = 'core-finder-slot-toggle';
  for (const mode of ['set', 'search']) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = mode === 'set' ? 'Set' : 'Suche';
    if (coreFinderState.thirdSlotMode === mode) button.classList.add('is-active');
    button.addEventListener('click', () => {
      coreFinderState.thirdSlotMode = mode;
      coreFinderState.selectedNames[index] = null;
      coreFinderState.inputValues[index] = '';
      coreFinderResultsSection.hidden = true;
      renderCoreFinderSlots();
    });
    toggle.append(button);
  }
  return toggle;
}

function renderCoreFinderSetSlot(container, config) {
  const header = document.createElement('div');
  header.className = 'core-finder-slot-header';
  const title = document.createElement('strong');
  title.className = 'core-finder-slot-title';
  title.textContent = config.label;
  header.append(title);
  if (config.canToggle) header.append(createCoreFinderToggle(config.index));

  const field = document.createElement('label');
  field.className = 'details-field';
  const label = document.createElement('span');
  label.textContent = 'Pokémon';
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Pokémonname eingeben';
  input.autocomplete = 'off';
  input.value = coreFinderState.inputValues[config.index] ?? '';
  field.append(label, input);

  const suggestions = document.createElement('div');
  suggestions.className = 'suggestion-list core-finder-suggestions';
  const renderSuggestions = () => {
    suggestions.innerHTML = '';
    const excludedNames = new Set(
      coreFinderState.selectedNames
        .filter(Boolean)
        .filter((name, index) => index !== config.index),
    );
    const matches = getCoreFinderMatches(input.value, excludedNames);
    for (const pokemon of matches) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'suggestion-item';
      button.textContent = pokemon.name;
      if (coreFinderState.selectedNames[config.index] === pokemon.name) button.classList.add('is-active');
      button.addEventListener('click', () => {
        coreFinderState.selectedNames[config.index] = pokemon.name;
        coreFinderState.inputValues[config.index] = pokemon.name;
        coreFinderResultsSection.hidden = true;
        renderCoreFinderSlots();
      });
      suggestions.append(button);
    }
    return matches;
  };
  let matches = renderSuggestions();

  input.addEventListener('input', () => {
    coreFinderState.inputValues[config.index] = input.value;
    if (coreFinderState.selectedNames[config.index] && normalizeText(coreFinderState.selectedNames[config.index]) !== normalizeText(input.value.trim())) {
      coreFinderState.selectedNames[config.index] = null;
    }
    coreFinderResultsSection.hidden = true;
    matches = renderSuggestions();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const fallback = getPokemonByNameLoose(input.value.trim()) ?? matches[0] ?? null;
    if (!fallback) return;
    coreFinderState.selectedNames[config.index] = fallback.name;
    coreFinderState.inputValues[config.index] = fallback.name;
    coreFinderResultsSection.hidden = true;
    renderCoreFinderSlots();
  });

  const preview = document.createElement('div');
  preview.className = 'core-finder-preview';
  const selectedPokemon = getCoreFinderSelectedPokemon(config.index);
  if (selectedPokemon) {
    const previewCard = createCoreFinderPreviewCard(selectedPokemon);
    if (coreFinderState.pivotChain && !pokemonIsPivot(selectedPokemon)) {
      previewCard.classList.add('has-pivot-warning');
      const warning = document.createElement('span');
      warning.className = 'core-finder-warning-badge';
      warning.textContent = '!';
      warning.title = 'Dieses Pokémon ist kein Pivot.';
      previewCard.append(warning);
    }
    preview.append(previewCard);
  }

  container.append(header, field, suggestions, preview);
}

function renderCoreFinderSearchSlot(container, config) {
  const header = document.createElement('div');
  header.className = 'core-finder-slot-header';
  const title = document.createElement('strong');
  title.className = 'core-finder-slot-title';
  title.textContent = config.label;
  header.append(title);
  if (config.canToggle) header.append(createCoreFinderToggle(config.index));

  const copy = document.createElement('p');
  copy.className = 'core-finder-search-copy';
  copy.textContent = 'Suche nach passenden Ergänzungen für diesen Slot.';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'details-primary replacement-search-button';
  button.textContent = 'Suche';
  button.addEventListener('click', runCoreFinderSearch);
  container.append(header, copy, button);
}

function renderCoreFinderSlots() {
  coreFinderSlots.innerHTML = '';
  const configs = getCoreFinderSlotConfigs();
  for (const config of configs) {
    const card = document.createElement('div');
    card.className = `core-finder-slot-card ${config.kind === 'search' ? 'is-search' : 'is-set'}`;
    if (config.kind === 'set') renderCoreFinderSetSlot(card, config);
    else renderCoreFinderSearchSlot(card, config);
    coreFinderSlots.append(card);
  }
}

function openCoreFinder() {
  coreFinderState = {
    size: 3,
    pivotChain: false,
    thirdSlotMode: 'search',
    selectedNames: [null, null, null, null],
    inputValues: ['', '', '', ''],
  };
  coreFinderMode.value = '3';
  coreFinderPivotChain.checked = false;
  coreFinderResultsSection.hidden = true;
  coreFinderResults.innerHTML = '';
  renderCoreFinderSlots();
  coreFinderModal.hidden = false;
}

function closeCoreFinder() {
  coreFinderModal.hidden = true;
  closeCoreFinderExceptionModal();
}

function getDistantRelativeMembers(pokemon) {
  const matchedNames = new Set();
  const lookupKeys = new Set([
    normalizeText(pokemon.name),
    normalizeText(pokemon.linkedTo ?? pokemon.name),
    normalizeText(pokemon.baseSpecies ?? pokemon.name),
  ]);

  for (const group of distantRelativeGroups) {
    const normalizedGroup = group.map((name) => normalizeText(name));
    if (!normalizedGroup.some((name) => lookupKeys.has(name))) continue;
    for (const member of group) {
      const relative = getPokemonByNameLoose(member);
      if (relative) matchedNames.add(relative.name);
    }
  }

  const familyNames = new Set(getFamilyMembers(pokemon).map((member) => member.name));
  return [...matchedNames]
    .filter((name) => name !== pokemon.name)
    .filter((name) => !familyNames.has(name))
    .map((name) => pokemonByName.get(name))
    .filter(Boolean)
    .sort((left, right) => {
      if (left.num !== right.num) return left.num - right.num;
      return left.sourceIndex - right.sourceIndex;
    });
}

function getVariationMembers(pokemon) {
  const canonical = pokemon.linkedTo ?? pokemon.name;
  return allPokemon.filter((entry) => {
    if (entry.name === pokemon.name) return false;
    return (
      entry.num === pokemon.num ||
      entry.name === pokemon.linkedTo ||
      entry.linkedTo === pokemon.name ||
      entry.linkedTo === canonical ||
      (pokemon.linkedTo && entry.name === pokemon.linkedTo)
    );
  });
}

function getLinkedTopForms(pokemon) {
  const canonical = pokemon.linkedTo ?? pokemon.name;
  const forms = allPokemon
    .filter((entry) => entry.name === canonical || entry.linkedTo === canonical)
    .sort((left, right) => left.sourceIndex - right.sourceIndex);
  return forms.length ? forms : [pokemon];
}

function shouldCollapseTopForms(canonicalName) {
  return canonicalName === 'Arceus' || canonicalName === 'Silvally';
}

function linkedFormsHaveDifferentTypes(forms) {
  const signatures = new Set(forms.map((form) => form.types.join('|')));
  return signatures.size > 1;
}

function createSpriteLinkButton(pokemon) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'detail-sprite-link';
  const image = document.createElement('img');
  setSpriteWithFallback(image, pokemon.sprite, `${pokemon.name} sprite`);
  const label = document.createElement('span');
  label.textContent = pokemon.name;
  button.append(image, label);
  button.addEventListener('click', () => openPokemonDetail(pokemon.name));
  return button;
}

function renderSpriteLinkSection(container, pokemonList, emptyMessage) {
  container.innerHTML = '';
  if (!pokemonList.length) {
    renderEmptyDetailState(container, emptyMessage);
    return;
  }
  for (const pokemon of pokemonList) {
    container.append(createSpriteLinkButton(pokemon));
  }
}

function getTopComparableStats(pokemon) {
  return Object.entries(pokemon.baseStats ?? {})
    .filter(([, value]) => Number.isFinite(value))
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 4)
    .map(([stat, value]) => ({ stat, value }));
}

function formatStatDifference(diff) {
  if (diff === 0) return '+0';
  return diff > 0 ? `+${diff}` : String(diff);
}

function getSharedTypes(target, candidate) {
  const candidateTypes = new Set(candidate.types ?? []);
  return (target.types ?? []).filter((type) => candidateTypes.has(type));
}

function getSharedAbilities(target, candidate) {
  const candidateAbilities = new Set(Object.values(candidate.abilities ?? {}));
  return [...new Set(Object.values(target.abilities ?? {}).filter((ability) => candidateAbilities.has(ability)))];
}

function getSharedMovepoolPercentage(target, candidate) {
  const targetMoveIds = new Set(getLegalEffectiveMoveIds(target));
  if (!targetMoveIds.size) return 0;
  const candidateMoveIds = new Set(getLegalEffectiveMoveIds(candidate));
  let sharedCount = 0;
  for (const moveId of targetMoveIds) {
    if (candidateMoveIds.has(moveId)) sharedCount += 1;
  }
  return Math.round((sharedCount / targetMoveIds.size) * 100);
}

function getSimilarPokemonEntries(pokemon) {
  const topStats = getTopComparableStats(pokemon);
  if (topStats.length < 4) return [];
  const comparedStats = new Set(topStats.map(({ stat }) => stat));

  return allPokemon
    .filter((candidate) => candidate.name !== pokemon.name)
    .map((candidate) => {
      const comparisons = topStats.map(({ stat, value }) => {
        const candidateValue = candidate.baseStats?.[stat];
        if (!Number.isFinite(candidateValue)) return null;
        const threshold = Math.max(1, value * 0.1);
        const difference = candidateValue - value;
        if (Math.abs(difference) > threshold) return null;
        return {
          stat,
          targetValue: value,
          candidateValue,
          difference,
        };
      });
      if (comparisons.includes(null)) return null;
      const totalDifference = comparisons.reduce((sum, comparison) => sum + Math.abs(comparison.difference), 0);
      const sharedTypes = getSharedTypes(pokemon, candidate);
      const sharedAbilities = getSharedAbilities(pokemon, candidate);
      const movepoolOverlapPercent = getSharedMovepoolPercentage(pokemon, candidate);
      return {
        pokemon: candidate,
        comparisons,
        comparedStats,
        totalDifference,
        sharedTypes,
        sharedAbilities,
        movepoolOverlapPercent,
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      if (left.totalDifference !== right.totalDifference) return left.totalDifference - right.totalDifference;
      if (left.sharedTypes.length !== right.sharedTypes.length) return right.sharedTypes.length - left.sharedTypes.length;
      if (left.sharedAbilities.length !== right.sharedAbilities.length) return right.sharedAbilities.length - left.sharedAbilities.length;
      if (left.movepoolOverlapPercent !== right.movepoolOverlapPercent) return right.movepoolOverlapPercent - left.movepoolOverlapPercent;
      if (left.pokemon.num !== right.pokemon.num) return left.pokemon.num - right.pokemon.num;
      return left.pokemon.sourceIndex - right.pokemon.sourceIndex;
    });
}

function renderSimilarPokemonSection(pokemon) {
  detailSimilarPokemonSection.hidden = false;
  detailSimilarPokemon.innerHTML = '';
  if (detailSimilarLoadButton) detailSimilarLoadButton.hidden = false;
  if (loadedSimilarPokemonName !== pokemon.name) return;

  const similarEntries = getSimilarPokemonEntries(pokemon);
  if (detailSimilarLoadButton) detailSimilarLoadButton.hidden = true;
  if (!similarEntries.length) {
    renderEmptyDetailState(detailSimilarPokemon, 'Keine ähnlichen Pokémon gefunden.');
    return;
  }

  for (const entry of similarEntries) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'detail-similar-card';
    card.addEventListener('click', () => openPokemonDetail(entry.pokemon.name));

    const sprite = document.createElement('img');
    sprite.className = 'detail-similar-card-sprite';
    setSpriteWithFallback(sprite, entry.pokemon.sprite, `${entry.pokemon.name} sprite`);

    const content = document.createElement('div');
    content.className = 'detail-similar-card-content';

    const titleRow = document.createElement('div');
    titleRow.className = 'detail-similar-card-title-row';
    const title = document.createElement('strong');
    title.textContent = entry.pokemon.name;
    const cost = document.createElement('span');
    cost.className = 'detail-similar-card-cost';
      cost.textContent = `${entry.pokemon.cost ?? '—'} Punkte`;
    titleRow.append(title, cost);

    const typeRow = document.createElement('div');
    typeRow.className = 'detail-similar-card-types';
    const meta = document.createElement('div');
    const costLine = document.createElement('span');
    costLine.textContent = `Kosten: ${entry.pokemon.cost ?? '—'}`;
    const typeLine = document.createElement('span');
    typeLine.textContent = entry.sharedTypes.length
      ? `Gemeinsame Typen: ${entry.sharedTypes.join(', ')}`
      : 'Gemeinsame Typen: keine';
    const abilityLine = document.createElement('span');
    abilityLine.textContent = entry.sharedAbilities.length
      ? `Gemeinsame Fähigkeiten: ${entry.sharedAbilities.join(', ')}`
      : 'Gemeinsame Fähigkeiten: keine';
    const moveLine = document.createElement('span');
    moveLine.textContent = `Gleicher Movepool: ${entry.movepoolOverlapPercent}%`;
    meta.append(costLine, typeLine, abilityLine, moveLine);

    const displayTypeRow = document.createElement('div');
    displayTypeRow.className = 'detail-similar-card-types';
    const sharedTypeSet = new Set(entry.sharedTypes);
    for (const type of entry.pokemon.types ?? []) {
      const typePill = document.createElement('span');
      typePill.className = 'detail-similar-card-type-pill';
      if (sharedTypeSet.has(type)) typePill.classList.add('is-shared');
      typePill.textContent = type;
      displayTypeRow.append(typePill);
    }

    const displayAbilityLine = document.createElement('p');
    displayAbilityLine.className = 'detail-similar-card-note';
    if (entry.sharedAbilities.length) displayAbilityLine.classList.add('is-shared');
    displayAbilityLine.textContent = entry.sharedAbilities.length
      ? `Gemeinsame Fähigkeiten: ${entry.sharedAbilities.join(', ')}`
      : 'Gemeinsame Fähigkeiten: keine';

    const displayMoveLine = document.createElement('p');
    displayMoveLine.className = 'detail-similar-card-note';
    if (entry.movepoolOverlapPercent > 75) displayMoveLine.classList.add('is-strong-match');
    displayMoveLine.textContent = `Gleicher Movepool: ${entry.movepoolOverlapPercent}%`;

    const statList = document.createElement('div');
    statList.className = 'detail-similar-card-stats';
    const valuesRow = document.createElement('div');
    valuesRow.className = 'detail-similar-card-values';
    const diffsRow = document.createElement('div');
    diffsRow.className = 'detail-similar-card-diffs';
    const comparisonsByStat = new Map(entry.comparisons.map((comparison) => [comparison.stat, comparison]));
    for (const stat of Object.keys(statLabels)) {
      const comparison = comparisonsByStat.get(stat);
      const candidateValue = entry.pokemon.baseStats?.[stat] ?? '—';
      const valueCell = document.createElement('span');
      valueCell.className = 'detail-similar-stat-cell';
      const statName = document.createElement('span');
      statName.className = 'detail-similar-stat-name';
      if (entry.comparedStats.has(stat)) statName.classList.add('is-compared');
      statName.textContent = statLabels[stat];
      const difference = document.createElement('span');
      difference.className = 'detail-similar-diff';
      const rawDifference = Number.isFinite(candidateValue) ? candidateValue - (pokemon.baseStats?.[stat] ?? candidateValue) : 0;
      if (rawDifference > 0) difference.classList.add('is-positive');
      else if (rawDifference < 0) difference.classList.add('is-negative');
      else difference.classList.add('is-neutral');
      difference.textContent = `(${formatStatDifference(rawDifference)})`;
      valueCell.append(statName, document.createTextNode(` ${candidateValue}`));
      valuesRow.append(valueCell);
      diffsRow.append(difference);
    }
    statList.append(valuesRow, diffsRow);

    content.append(titleRow, displayTypeRow, displayAbilityLine, displayMoveLine, statList);
    card.append(sprite, content);
    detailSimilarPokemon.append(card);
  }
}

const replacementPriorityMeta = {
  0: { label: 'Aus', className: 'is-off' },
  1: { label: 'Wenig Priorität', className: 'is-low' },
  2: { label: 'Mittlere Priorität', className: 'is-medium' },
  3: { label: 'Hohe Priorität', className: 'is-high' },
};
const replacementWeatherTagRules = [
  {
    label: 'Sonne',
    abilities: ['Drought'],
    moves: ['sunnyday'],
  },
  {
    label: 'Regen',
    abilities: ['Drizzle'],
    moves: ['raindance'],
  },
  {
    label: 'Schnee',
    abilities: ['Snow Warning'],
    moves: ['snowscape', 'chillyreception'],
  },
  {
    label: 'Hagel',
    abilities: ['Hail Warning'],
    moves: ['hail'],
  },
];
const replacementSpeedAbilities = new Set(['Swift Swim', 'Chlorophyll', 'Sand Rush', 'Slush Rush']);
const replacementDoubleAttackAbilities = new Set(['Huge Power', 'Pure Power']);

function getReplacementTargetPokemon() {
  return replacementFinderTargetName ? pokemonByName.get(replacementFinderTargetName) ?? null : null;
}

function getReplacementPriority(key) {
  return replacementFinderPriorities.get(key) ?? 0;
}

function cycleReplacementPriority(key) {
  const nextPriority = (getReplacementPriority(key) + 1) % 4;
  if (nextPriority === 0) replacementFinderPriorities.delete(key);
  else replacementFinderPriorities.set(key, nextPriority);
}

function createReplacementPriorityButton({ key, label, meta = '', onClickExtra = null }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'replacement-priority-chip';
  const title = document.createElement('span');
  title.className = 'replacement-priority-label';
  title.textContent = label;
  const sub = document.createElement('span');
  sub.className = 'replacement-priority-meta';
  sub.textContent = meta;
  button.append(title, sub);

  const applyState = () => {
    button.classList.remove('is-off', 'is-low', 'is-medium', 'is-high');
    const state = replacementPriorityMeta[getReplacementPriority(key)];
    button.classList.add(state.className);
    button.dataset.priority = String(getReplacementPriority(key));
    button.title = state.label;
  };

  button.addEventListener('click', () => {
    cycleReplacementPriority(key);
    applyState();
    replacementResultsSection.hidden = true;
    replacementResults.innerHTML = '';
    if (onClickExtra) onClickExtra();
  });

  applyState();
  return button;
}

function getReplacementBestDefenseValue(pokemon, type) {
  const entries = getDefenseEntriesForType(pokemon, type);
  if (!entries.length) return 1;
  return Math.min(...entries.map((entry) => entry.value));
}

function getDefenseGrade(value) {
  if (value === 0) return 0;
  if (value <= 0.9) return 1;
  if (value <= 1.1) return 2;
  if (value < 2.1) return 3;
  return 4;
}

function formatDefenseValue(value) {
  return `${value}x`;
}

function getReplacementWeatherTags(pokemon) {
  const abilityNames = new Set(Object.values(pokemon.abilities ?? {}));
  const moveIds = new Set(getEffectiveMoveIds(pokemon));
  return replacementWeatherTagRules
    .filter((rule) => rule.abilities.some((ability) => abilityNames.has(ability)) || rule.moves.some((moveId) => moveIds.has(moveId)))
    .map((rule) => rule.label);
}

function hasReplacementAbility(pokemon, abilityName) {
  return Object.values(pokemon.abilities ?? {}).includes(abilityName);
}

function getReplacementEffectiveStatValue(pokemon, stat, selectedAspects) {
  const baseValue = pokemon.baseStats?.[stat] ?? null;
  if (!Number.isFinite(baseValue)) return baseValue;
  if (stat === 'atk' && [...replacementDoubleAttackAbilities].some((ability) => hasReplacementAbility(pokemon, ability))) {
    return baseValue * 2;
  }
  if (stat === 'spe') {
    const speedPriority = selectedAspects.get('stat:spe') ?? 0;
    const hasSpeedAbilityPriority = [...selectedAspects.entries()].some(([key, priority]) => (
      key.startsWith('ability:') &&
      priority >= 2 &&
      replacementSpeedAbilities.has(key.slice('ability:'.length))
    ));
    const hasSpeedAbility = [...replacementSpeedAbilities].some((ability) => hasReplacementAbility(pokemon, ability));
    if (speedPriority >= 2 && hasSpeedAbilityPriority && hasSpeedAbility) {
      return baseValue * 2;
    }
  }
  return baseValue;
}

function getReplacementPickerMatches() {
  const query = normalizeText(replacementPickerInput.value);
  const visiblePokemon = allPokemon.filter((pokemon) => !pokemon.hidden);
  if (!query) return visiblePokemon.slice(0, 12);
  return visiblePokemon
    .filter((pokemon) => normalizeText(pokemon.name).includes(query))
    .slice(0, 12);
}

function renderReplacementPickerSuggestions() {
  const matches = getReplacementPickerMatches();
  replacementPickerSuggestions.innerHTML = '';
  for (const pokemon of matches) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'suggestion-item';
    button.textContent = pokemon.name;
    if (pokemon.name === replacementPickerSelectedName) button.classList.add('is-active');
    button.addEventListener('click', () => {
      replacementPickerSelectedName = pokemon.name;
      replacementPickerInput.value = pokemon.name;
      renderReplacementPickerSuggestions();
    });
    replacementPickerSuggestions.append(button);
  }
}

function openReplacementPicker(initialName = '') {
  replacementPickerSelectedName = initialName || null;
  replacementPickerInput.value = initialName;
  renderReplacementPickerSuggestions();
  replacementPickerModal.hidden = false;
  replacementPickerInput.focus();
  replacementPickerInput.select();
}

function closeReplacementPicker() {
  replacementPickerModal.hidden = true;
}

function getReplacementPickerPokemon() {
  const name = replacementPickerSelectedName ?? replacementPickerInput.value.trim();
  if (!name) return null;
  return getPokemonByNameLoose(name);
}

function openReplacementFinder(name) {
  const pokemon = pokemonByName.get(name);
  if (!pokemon) return;
  replacementFinderTargetName = pokemon.name;
  const replacementHelpName = getReplacementHelpNameElement();
  if (replacementHelpName) replacementHelpName.textContent = getPokemonDisplayName(pokemon);
  replacementFinderPriorities = new Map();
  renderReplacementFinder(pokemon);
  replacementFinderModal.hidden = false;
}

function closeReplacementFinder() {
  replacementFinderModal.hidden = true;
}

function openStefansPdf() {
  stefansPdfModal.hidden = false;
}

function closeStefansPdf() {
  stefansPdfModal.hidden = true;
}

function openLegend() {
  if (legendModal) legendModal.hidden = false;
}

function closeLegend() {
  if (legendModal) legendModal.hidden = true;
}

function setActiveChangelogTab(tabKey) {
  for (const tab of changelogTabs) {
    const isActive = tab.dataset.tab === tabKey;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  }

  for (const panel of changelogPanels) {
    const isActive = panel.dataset.tabPanel === tabKey;
    panel.hidden = !isActive;
    panel.style.display = isActive ? '' : 'none';
  }
}

function openChangelog(initialTab = 'site') {
  setActiveChangelogTab(initialTab);
  changelogModal.hidden = false;
}

function closeChangelog() {
  changelogModal.hidden = true;
}

function submitReplacementPicker() {
  const pokemon = getReplacementPickerPokemon() ?? getReplacementPickerMatches()[0] ?? null;
  if (!pokemon) return;
  closeReplacementPicker();
  openReplacementFinder(pokemon.name);
}

function renderReplacementTargetPanel(pokemon) {
  replacementTargetPanel.innerHTML = '';
  const topCard = document.createElement('div');
  topCard.className = 'detail-top-card';
  const spriteWrap = document.createElement('div');
  spriteWrap.className = 'detail-sprite-wrap replacement-sprite-wrap';
  const image = document.createElement('img');
  image.className = 'detail-main-sprite';
  setSpriteWithFallback(image, pokemon.sprite, `${pokemon.name} sprite`);
  spriteWrap.append(image);

  const metaWrap = document.createElement('div');
  metaWrap.className = 'detail-top-meta';
  const title = document.createElement('h3');
  title.className = 'detail-top-title';
  title.textContent = pokemon.name;
  const typeList = document.createElement('div');
  typeList.className = 'detail-type-list';
  for (const type of pokemon.types ?? []) {
    const pill = document.createElement('div');
    pill.className = 'detail-type-pill';
    if (typeIcons[type]) {
      const icon = document.createElement('img');
      icon.src = typeIcons[type];
      icon.alt = type;
      pill.append(icon);
    }
    const label = document.createElement('span');
    label.textContent = type;
    pill.append(label);
    typeList.append(pill);
  }
  const costLine = document.createElement('p');
  costLine.className = 'replacement-target-copy';
  costLine.textContent = pokemon.cost === null ? 'Kosten: unbekannt' : `Kosten: ${pokemon.cost}`;
  metaWrap.append(title, typeList, costLine);
  topCard.append(spriteWrap, metaWrap);
  replacementTargetPanel.append(topCard);
}

function renderReplacementStatGrid(pokemon) {
  replacementStatGrid.innerHTML = '';
  for (const [stat, label] of Object.entries(statLabels)) {
    const value = pokemon.baseStats?.[stat] ?? '—';
    replacementStatGrid.append(createReplacementPriorityButton({
      key: `stat:${stat}`,
      label,
      meta: String(value),
    }));
  }
}

function renderReplacementTypeGrid(pokemon) {
  replacementTypes.innerHTML = '';
  for (const type of pokemon.types ?? []) {
    replacementTypes.append(createReplacementPriorityButton({
      key: `type:${type}`,
      label: type,
      meta: 'Typ',
    }));
  }
}

function renderReplacementAbilityGrid(pokemon) {
  replacementAbilities.innerHTML = '';
  const seen = new Set();
  for (const ability of pokemon.abilityDetails ?? []) {
    if (seen.has(ability.name)) continue;
    seen.add(ability.name);
    replacementAbilities.append(createReplacementPriorityButton({
      key: `ability:${ability.name}`,
      label: ability.name,
      meta: ability.sourceLabel ?? getAbilitySlotLabel(ability.slot),
    }));
  }
}

function renderReplacementCostGrid(pokemon) {
  replacementCost.innerHTML = '';
  replacementCost.append(createReplacementPriorityButton({
    key: 'cost',
    label: 'Kosten',
    meta: pokemon.cost === null ? 'Unbekannt' : String(pokemon.cost),
  }));
}

function renderReplacementWeatherGrid(pokemon) {
  const weatherTags = getReplacementWeatherTags(pokemon);
  replacementWeatherSection.hidden = !weatherTags.length;
  replacementWeather.innerHTML = '';
  if (!weatherTags.length) return;
  for (const tag of weatherTags) {
    replacementWeather.append(createReplacementPriorityButton({
      key: `weather:${tag}`,
      label: tag,
      meta: 'Wetter',
    }));
  }
}

function renderReplacementDefenseGrid(pokemon) {
  replacementDefenses.innerHTML = '';
  for (const type of battleTypes) {
    replacementDefenses.append(createReplacementPriorityButton({
      key: `defense:${type}`,
      label: type,
      meta: formatDefenseValue(getReplacementBestDefenseValue(pokemon, type)),
    }));
  }
}

function renderReplacementMoveGrid(pokemon) {
  replacementMoves.innerHTML = '';
  for (const move of getLegalPokemonMoveRows(pokemon)) {
    const moveMeta = [move.type ?? '—', move.category ?? '—', move.basePower ?? '—'].join(' · ');
    replacementMoves.append(createReplacementPriorityButton({
      key: `move:${move.id}`,
      label: move.name,
      meta: moveMeta,
    }));
  }
}

function renderReplacementFinder(pokemon) {
  renderReplacementTargetPanel(pokemon);
  renderReplacementStatGrid(pokemon);
  renderReplacementTypeGrid(pokemon);
  renderReplacementAbilityGrid(pokemon);
  renderReplacementCostGrid(pokemon);
  renderReplacementWeatherGrid(pokemon);
  renderReplacementDefenseGrid(pokemon);
  renderReplacementMoveGrid(pokemon);
  replacementResultsSection.hidden = true;
  replacementResults.innerHTML = '';
}

function findReplacementMoveMatch(targetMove, candidate, priority) {
  const candidateMoves = getLegalPokemonMoveRows(candidate);
  if (priority === 3 && targetMove.category === 'Status') {
    return candidateMoves.find((move) => move.id === targetMove.id) ?? null;
  }
  const compatibleMoves = candidateMoves.filter((move) => move.type === targetMove.type && move.category === targetMove.category);
  if (!compatibleMoves.length) return null;
  if (targetMove.category === 'Status') return compatibleMoves[0];
  if (priority === 3) {
    return compatibleMoves
      .filter((move) => (move.basePower ?? 0) >= (targetMove.basePower ?? 0))
      .sort((left, right) => (left.basePower ?? 0) - (right.basePower ?? 0))[0] ?? null;
  }
  return compatibleMoves
    .filter((move) => Math.abs((move.basePower ?? 0) - (targetMove.basePower ?? 0)) <= 20)
    .sort((left, right) => Math.abs((left.basePower ?? 0) - (targetMove.basePower ?? 0)) - Math.abs((right.basePower ?? 0) - (targetMove.basePower ?? 0)))[0] ?? null;
}

function evaluateReplacementAspect(target, candidate, aspectKey, priority) {
  const [kind, rawValue] = aspectKey.split(':');
  const selectedAspects = replacementFinderPriorities;
  if (kind === 'stat') {
    const targetValue = getReplacementEffectiveStatValue(target, rawValue, selectedAspects);
    const candidateValue = getReplacementEffectiveStatValue(candidate, rawValue, selectedAspects);
    const threshold = Math.max(1, (targetValue ?? 0) * 0.1);
    const matches = priority === 3
      ? candidateValue >= targetValue
      : Math.abs(candidateValue - targetValue) <= threshold;
    return {
      matches,
      summary: `${statLabels[rawValue]}: ${candidateValue} (${formatStatDifference(candidateValue - targetValue)})`,
      score: matches ? Math.max(0, 20 - Math.abs(candidateValue - targetValue)) : 0,
    };
  }
  if (kind === 'type') {
    const matches = candidate.types?.includes(rawValue);
    return {
      matches,
      summary: `Typ ${rawValue}: ${matches ? 'vorhanden' : 'fehlt'}`,
      score: matches ? 10 : 0,
    };
  }
  if (kind === 'ability') {
    const matches = getAbilitySearchSet(candidate).has(normalizeText(rawValue));
    return {
      matches,
      summary: `Fähigkeit ${rawValue}: ${matches ? 'vorhanden' : 'fehlt'}`,
      score: matches ? 12 : 0,
    };
  }
  if (kind === 'cost') {
    const targetCost = target.cost;
    const candidateCost = candidate.cost;
    if (targetCost === null || candidateCost === null) {
      return { matches: false, summary: 'Kosten: unbekannt', score: 0 };
    }
    const matches = priority === 3
      ? candidateCost <= targetCost
      : priority === 2
        ? (targetCost < 5 ? candidateCost < 5 : targetCost < 10 ? candidateCost < 10 : targetCost < 15 ? candidateCost < 15 : true)
        : candidateCost <= targetCost + 4;
    return {
      matches,
      summary: `Kosten: ${candidateCost} (${formatStatDifference(candidateCost - targetCost)})`,
      score: matches ? Math.max(0, 12 - Math.abs(candidateCost - targetCost)) : 0,
    };
  }
  if (kind === 'weather') {
    const candidateTags = new Set(getReplacementWeatherTags(candidate));
    const crossSnowHailAllowed = priority <= 2 && (rawValue === 'Schnee' || rawValue === 'Hagel');
    const matches = candidateTags.has(rawValue) || (
      crossSnowHailAllowed &&
      ((rawValue === 'Schnee' && candidateTags.has('Hagel')) || (rawValue === 'Hagel' && candidateTags.has('Schnee')))
    );
    return {
      matches,
      summary: `Wetter ${rawValue}: ${matches ? 'vorhanden' : 'fehlt'}`,
      score: matches ? 14 : 0,
    };
  }
  if (kind === 'defense') {
    const targetValue = getReplacementBestDefenseValue(target, rawValue);
    const candidateValue = getReplacementBestDefenseValue(candidate, rawValue);
    const targetGrade = getDefenseGrade(targetValue);
    const candidateGrade = getDefenseGrade(candidateValue);
    const matches = priority === 3 ? candidateGrade <= targetGrade : candidateGrade <= targetGrade + 1;
    return {
      matches,
      summary: `${rawValue}: ${formatDefenseValue(candidateValue)} (${formatStatDifference(candidateValue - targetValue)})`,
      score: matches ? Math.max(0, 12 - Math.abs(candidateGrade - targetGrade) * 3) : 0,
    };
  }
  if (kind === 'move') {
    const targetMove = moveDetailsById[rawValue];
    if (!targetMove) return { matches: false, summary: 'Attacke nicht gefunden', score: 0 };
    const match = findReplacementMoveMatch(targetMove, candidate, priority);
    return {
      matches: Boolean(match),
      summary: match ? `${targetMove.name} → ${match.name}` : `${targetMove.name}: kein Treffer`,
      score: match ? 14 : 0,
    };
  }
  return { matches: false, summary: rawValue, score: 0 };
}

function getReplacementSelectedAspects() {
  return [...replacementFinderPriorities.entries()]
    .filter(([, priority]) => priority > 0)
    .map(([key, priority]) => ({ key, priority }));
}

function renderReplacementResults(target, results) {
  replacementResults.innerHTML = '';
  replacementResultsSection.hidden = !results.length;
  if (!results.length) {
    renderEmptyDetailState(replacementResults, 'Keine Pokémon erfüllen diese Kriterien.');
    replacementResultsSection.hidden = false;
    return;
  }

  for (const result of results) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'replacement-result-card';
    card.addEventListener('click', () => {
      closeReplacementFinder();
      openPokemonDetail(result.pokemon.name);
    });

    const sprite = document.createElement('img');
    sprite.className = 'replacement-result-sprite';
    setSpriteWithFallback(sprite, result.pokemon.sprite, `${result.pokemon.name} sprite`);

    const body = document.createElement('div');
    body.className = 'replacement-result-content';
    const title = document.createElement('strong');
  title.textContent = getPokemonDisplayName(result.pokemon);
    const typeLine = document.createElement('p');
    typeLine.className = 'replacement-result-types';
    typeLine.textContent = (result.pokemon.types ?? []).join(' / ');
    const list = document.createElement('div');
    list.className = 'replacement-result-matches';
    for (const match of result.matches) {
      const line = document.createElement('div');
      line.className = 'replacement-result-match';
      if (!match.matches && match.priority === 1) line.classList.add('is-optional-miss');
      const badge = document.createElement('span');
      badge.className = `replacement-priority-badge ${replacementPriorityMeta[match.priority].className}`;
      badge.textContent = match.priority === 1 ? 'Niedrig' : match.priority === 2 ? 'Mittel' : 'Hoch';
      const text = document.createElement('span');
      text.textContent = match.summary;
      line.append(badge, text);
      list.append(line);
    }
    body.append(title, typeLine, list);
    card.append(sprite, body);
    replacementResults.append(card);
  }
}

function runReplacementFinderSearch() {
  const target = getReplacementTargetPokemon();
  if (!target) return;
  const selectedAspects = getReplacementSelectedAspects();
  if (!selectedAspects.length) {
    renderEmptyDetailState(replacementResults, 'Wähle zuerst mindestens einen Aspekt aus.');
    replacementResultsSection.hidden = false;
    return;
  }

  const candidates = allPokemon
    .filter((candidate) => candidate.name !== target.name && !candidate.hidden)
    .map((candidate) => {
      const matches = selectedAspects.map((aspect) => {
        const evaluation = evaluateReplacementAspect(target, candidate, aspect.key, aspect.priority);
        return { ...evaluation, key: aspect.key, priority: aspect.priority };
      });
      const hardFailures = matches.filter((match) => match.priority >= 2 && !match.matches);
      if (hardFailures.length) return null;
      const score = matches.reduce((sum, match) => sum + (match.matches ? (match.priority === 3 ? 90 : match.priority === 2 ? 40 : 10) + match.score : 0), 0);
      return { pokemon: candidate, matches, score };
    })
    .filter(Boolean)
    .sort((left, right) => {
      if (left.score !== right.score) return right.score - left.score;
      if (left.pokemon.cost !== right.pokemon.cost) return (left.pokemon.cost ?? 999) - (right.pokemon.cost ?? 999);
      if (left.pokemon.num !== right.pokemon.num) return left.pokemon.num - right.pokemon.num;
      return left.pokemon.sourceIndex - right.pokemon.sourceIndex;
    });

  renderReplacementResults(target, candidates);
  replacementResultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getRibbonEntries(pokemon) {
  const flags = getPokemonFlags(pokemon);
  const abilityNames = pokemon.abilityDetails.map((ability) => ability.name);
  const ribbons = [];
  const customRibbons = customRibbonEntriesByName.get(pokemon.name) ?? [];
  ribbons.push(...customRibbons);

  if (flags.mega) {
    ribbons.push({
      icon: megaIconPath,
      text: 'Dieses Pokémon muss seinen Mega-Stein halten. Es darf sich mega-entwickeln, muss dies aber nicht.',
    });
  }

  if (pokemon.cost !== null && pokemon.cost <= 10 && flags.mega) {
    ribbons.push({
      icon: zIconPath,
      text: 'Dieses Pokémon kann kein Z-Stein Captain sein, da es seinen Mega-Stein halten muss.',
      warning: true,
    });
  } else if (flags.z) {
    ribbons.push({
      icon: zIconPath,
      text: 'Dieses Pokémon darf ein Z-Stein Captain sein. Es muss als solcher angesagt werden und der Z-Stein zusätzlich gedraftet.',
    });
  }

  if (flags.tera) {
    ribbons.push({
      icon: teraIconPath,
      text: 'Dieses Pokémon darf ein Tera-Captain sein. Es muss als solcher angesagt werden und der Tera-Typ zusätzlich gedraftet.',
    });
  }

  if (flags.booster) {
    ribbons.push({
      icon: boosterIconPath,
      text: 'Dieses Pokémon darf das Item Energiekapsel/Booster Energy halten.',
    });
  }

  if (abilityNames.includes('Quark Drive')) {
    ribbons.push({
      symbol:'🗲',
      text: 'Dieses Pokémon darf von Elektrofeld profitieren, sofern dieses nicht durch die Fähigkeit Elektro-Erzeuger/Electric Surge deines Teams hervorgerufen wurde.',
    });
  }

  if (abilityNames.includes('Protosynthesis')) {
    ribbons.push({
      symbol: '🔆',
      text: 'Dieses Pokémon darf von Sonne profitieren, sofern dieses nicht durch die Fähigkeit Dürre/Drought deines Teams hervorgerufen wurde.',
    });
  }

  if (pokemon.name === 'Mewtwo') {
    ribbons.push({
      symbol: 'R',
      symbolClass: 'is-rocket',
      text: 'Dieses Pokémon ist Eigentum von Team Rocket. Unberechtigte Nutzung wird dem Boss gemeldet.',
      warning: true,
    });
  }

  if (pokemon.name === 'Meowth') {
    ribbons.push({
      symbol: 'R',
      symbolClass: 'is-rocket',
      text: 'Miauz, genau!',
      warning: true,
    });
  }

  return ribbons;
}

function classifyDefenseValue(value) {
  if (value === 0) return { label: 'Immun', className: 'immune' };
  if (value <= 0.9) return { label: 'Resistent', className: 'resistant' };
  if (value >= 2.1) return { label: 'Sehr schwach', className: 'very-weak' };
  if (value >= 2) return { label: 'Schwach', className: 'weak' };
  return { label: 'Neutral', className: 'neutral' };
}

function getDefenseAbilityReasons(pokemon, type) {
  const reasons = [];
  const abilityNames = pokemon.abilityDetails.map((ability) => ability.name);

  const pushReason = (ability, text) => {
    if (abilityNames.includes(ability)) reasons.push({ ability, text });
  };

  if (type === 'Ground') {
    pushReason('Earth Eater', 'Mit Earth Eater');
    pushReason('Levitate', 'Mit Levitate');
  }
  if (type === 'Water') {
    pushReason('Dry Skin', 'Mit Dry Skin');
    pushReason('Storm Drain', 'Mit Storm Drain');
    pushReason('Water Absorb', 'Mit Water Absorb');
    pushReason('Heatproof', 'Mit Heatproof');
    pushReason('Water Bubble', 'Mit Water Bubble');
  }
  if (type === 'Electric') {
    pushReason('Lightning Rod', 'Mit Lightning Rod');
    pushReason('Motor Drive', 'Mit Motor Drive');
    pushReason('Volt Absorb', 'Mit Volt Absorb');
  }
  if (type === 'Grass') pushReason('Sap Sipper', 'Mit Sap Sipper');
  if (type === 'Fire') {
    pushReason('Flash Fire', 'Mit Flash Fire');
    pushReason('Well-Baked Body', 'Mit Well-Baked Body');
    pushReason('Fluffy', 'Mit Fluffy');
    pushReason('Dry Skin', 'Mit Dry Skin');
  }
  if (type === 'Ghost') pushReason('Purifying Salt', 'Mit Purifying Salt');
  return reasons;
}

function getDefenseEntriesForType(pokemon, type) {
  const defenseValue = pokemon[`${type.toLowerCase()}_defense`];
  const rawValues = Array.isArray(defenseValue) ? defenseValue : [defenseValue];
  const values = [...new Set(rawValues.filter((value) => value !== undefined && value !== null))];
  const reasons = [...getDefenseAbilityReasons(pokemon, type)];

  return values.map((value, index) => {
    const reason = index < reasons.length ? reasons[index].text : 'Standard';
    return { value, reason };
  });
}

function getMoveMethodBadges(methods) {
  return moveMethodIcons.filter((config) => methods.some((method) => method.includes(config.key)));
}

function getSereneGraceSeverity(pokemon) {
  const abilityNames = pokemon.abilityDetails.map((ability) => ability.name);
  if (!abilityNames.includes('Serene Grace')) return null;
  return abilityNames.length === 1 ? 'illegal' : 'warning';
}

function getAbilityRuleInfo(abilityName, pokemon) {
  if (abilityName === 'Speed Boost' && pokemon.name === 'Blaziken') {
    return {
      severity: 'illegal',
      text: 'Speed Boost ist auf dieser Blaziken-Version nicht erlaubt.',
    };
  }
  if (abilityName === 'Serene Grace') {
    const severity = getSereneGraceSeverity(pokemon);
    if (!severity) return null;
    return {
      severity,
      text: 'Edelmut Clause: Siehe unten bei den Attacken für verbotene Kombinationen.',
    };
  }
  return abilityRuleMap[abilityName] ?? null;
}

function getMoveRuleInfo(moveId, pokemon) {
  const baseRule = moveRuleMap[moveId] ? { ...moveRuleMap[moveId] } : null;
  const mergeRule = (currentRule, nextRule) => {
    if (!currentRule) return nextRule;
    if (currentRule.text.includes(nextRule.text)) return currentRule;
    return {
      severity: currentRule.severity === 'illegal' || nextRule.severity === 'illegal' ? 'illegal' : 'warning',
      text: `${currentRule.text}\n${nextRule.text}`,
    };
  };

  let resolvedRule = baseRule;

  if (moveId === 'shedtail' && pokemon.name === 'Cyclizar') {
    resolvedRule = mergeRule(resolvedRule, {
      severity: 'illegal',
      text: 'Shed Tail ist auf Cyclizar nicht erlaubt.',
    });
  }

  if (moveId === 'revivalblessing' && pokemon.name === 'Pawmot') {
    resolvedRule = mergeRule(resolvedRule, {
      severity: 'illegal',
      text: 'Revival Blessing ist auf Pawmot nicht erlaubt.',
    });
  }

  if (moveId === 'shellsmash' && !shellSmashAllowedPokemon.has(pokemon.name)) {
    resolvedRule = mergeRule(resolvedRule, {
      severity: 'illegal',
      text: 'Shell Smash ist nur auf ausgewählten Pokémon erlaubt.',
    });
  }

  if (moveId === 'hiddenpower' && pokemon.cost !== null && pokemon.cost >= 6) {
    resolvedRule = mergeRule(resolvedRule, {
      severity: 'illegal',
      text: 'Kraftreserve ist nur auf Pokémon mit 5 oder weniger Punkten erlaubt.',
    });
  }

  if (moveId === 'ragefist' && !pokemonHasTag(pokemon, 'ragefist')) {
    resolvedRule = mergeRule(resolvedRule, {
      severity: 'illegal',
      text: 'Nur die Uber Version von Annihilape darf Rage Fist haben.',
    });
  }

  const flags = getPokemonFlags(pokemon);
  const hasHiddenPower = Object.prototype.hasOwnProperty.call(getEffectiveLearnset(pokemon), 'hiddenpower');
  if (flags.tera && hasHiddenPower && (moveId === 'hiddenpower' || moveId === 'terablast')) {
    resolvedRule = mergeRule(resolvedRule, {
      severity: 'warning',
      text: 'Beachten: Auf dem Tera-Captain ist Kraftreserve oder Tera-Ausbruch erlaubt, nicht beides gleichzeitig!.',
    });
  }

  if (sereneGraceFlinchMoves.has(moveId)) {
    const sereneGraceSeverity = getSereneGraceSeverity(pokemon);
    if (sereneGraceSeverity) {
      const sereneGraceRule = {
        severity: sereneGraceSeverity,
        text: 'Edelmut Clause: Combination aus 20%+ Flinch Chance und Serene Grace sind nicht erlaubt.',
      };
      resolvedRule = mergeRule(resolvedRule, sereneGraceRule);
    }
  }
  return resolvedRule;
}

function getPokemonMoveRows(pokemon) {
  const typeOverride = {
    judgment: pokemon.types[0] ?? null,
    multiattack: pokemon.types[0] ?? null,
    revelationdance: pokemon.types[0] ?? null,
  };
  return Object.entries(getEffectiveLearnset(pokemon))
    .map(([moveId, methods]) => {
      const move = moveDetailsById[moveId];
      if (!move) return null;
      return {
        ...move,
        type: typeOverride[moveId] ?? move.type,
        ruleInfo: getMoveRuleInfo(moveId, pokemon),
        methods,
      };
    })
    .filter(Boolean)
    .sort((left, right) => left.name.localeCompare(right.name));
}

function getLegalPokemonMoveRows(pokemon) {
  return getPokemonMoveRows(pokemon).filter((move) => move.ruleInfo?.severity !== 'illegal');
}

function renderPokemonDetailMoves(pokemon) {
  const query = normalizeText(detailMoveSearch.value);
  const category = detailMoveCategory.value;
  const moveRows = getPokemonMoveRows(pokemon).filter((move) => {
    const matchesQuery = !query || normalizeText(`${move.name} ${move.type ?? ''}`).includes(query);
    const matchesCategory = category === 'all' || move.category === category;
    return matchesQuery && matchesCategory;
  });

  detailMoveTableBody.innerHTML = '';
  if (!moveRows.length) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 6;
    cell.textContent = 'Keine Attacken passen zu diesem Filter.';
    row.append(cell);
    detailMoveTableBody.append(row);
    return;
  }

  for (const move of moveRows) {
    const row = document.createElement('tr');
    if (move.ruleInfo) {
      row.classList.add(move.ruleInfo.severity === 'illegal' ? 'is-illegal' : 'is-warning');
    }
    const nameCell = document.createElement('td');
    const isStabMove = move.category !== 'Status' && pokemon.types.includes(move.type);
    if (isStabMove) {
      const strong = document.createElement('strong');
      strong.textContent = move.name;
      nameCell.append(strong);
    } else {
      nameCell.textContent = move.name;
    }

    const typeCell = document.createElement('td');
    const typeWrap = document.createElement('span');
    typeWrap.className = 'detail-move-type';
    if (move.type && typeIcons[move.type]) {
      const typeIcon = document.createElement('img');
      typeIcon.src = typeIcons[move.type];
      typeIcon.alt = move.type;
      typeWrap.append(typeIcon);
    }
    const typeText = document.createElement('span');
    typeText.textContent = move.type ?? '—';
    typeWrap.append(typeText);
    typeCell.append(typeWrap);

    const categoryCell = document.createElement('td');
    categoryCell.textContent = move.category ?? '—';

    const powerCell = document.createElement('td');
    powerCell.textContent = move.basePower > 0 ? String(move.basePower) : '—';

    const accuracyCell = document.createElement('td');
    accuracyCell.textContent = typeof move.accuracy === 'number' ? `${move.accuracy}%` : '—';

    const descCell = document.createElement('td');
    descCell.textContent = move.shortDesc ?? move.desc ?? '—';
    const methodBadges = getMoveMethodBadges(move.methods);
    if (methodBadges.length) {
      const badgeWrap = document.createElement('span');
      badgeWrap.className = 'detail-method-icons';
      for (const badge of methodBadges) {
        const badgeElement = document.createElement('span');
        badgeElement.textContent = badge.emoji;
        badgeElement.title = badge.title;
        badgeWrap.append(badgeElement);
      }
      descCell.append(badgeWrap);
    }
    if (move.ruleInfo) {
      const infoButton = document.createElement('button');
      infoButton.type = 'button';
      infoButton.className = 'detail-rule-toggle';
      infoButton.textContent = 'ℹ️';
      infoButton.title = 'Klicken für Details';
      infoButton.setAttribute('aria-label', 'Klicken für Details');
      infoButton.addEventListener('click', () => {
        if (expandedMoveRuleIds.has(move.id)) expandedMoveRuleIds.delete(move.id);
        else expandedMoveRuleIds.add(move.id);
        renderPokemonDetailMoves(pokemon);
      });
      descCell.append(document.createTextNode(' '));
      descCell.append(infoButton);

      if (expandedMoveRuleIds.has(move.id)) {
        const detail = document.createElement('div');
        detail.className = `detail-rule-note ${move.ruleInfo.severity === 'illegal' ? 'is-illegal' : 'is-warning'}`;
        detail.textContent = move.ruleInfo.text;
        descCell.append(detail);
      }
    }

    row.append(nameCell, typeCell, categoryCell, powerCell, accuracyCell, descCell);
    detailMoveTableBody.append(row);
  }
}

function clearMeowthCoinHunt() {
  meowthCoinState = {
    count: 0,
    started: false,
  };
  pokemonDetailDialog?.querySelectorAll('.meowth-coin-button').forEach((node) => node.remove());
  pokemonDetailModal?.querySelector('.meowth-coin-counter')?.remove();
}

function clearDetailSpecialEffects() {
  for (const cleanup of detailSpecialEffectCleanups) cleanup();
  detailSpecialEffectCleanups = [];
  pokemonDetailDialog?.querySelectorAll('.detail-sprite-wrap').forEach((node) => {
    node.classList.remove('is-wimpod-startled', 'is-wimpod-scuttled');
    node.style.removeProperty('--kecleon-opacity');
  });
}

function updateMeowthCoinCounter() {
  if (!pokemonDetailModal) return;
  let counter = pokemonDetailModal.querySelector('.meowth-coin-counter');
  if (!counter) {
    counter = document.createElement('div');
    counter.className = 'meowth-coin-counter';
    pokemonDetailModal.append(counter);
  }
  counter.textContent = `🪙 ${meowthCoinState.count}`;
}

function getMeowthCoinBounds() {
  if (!pokemonDetailDialog) return null;
  const width = pokemonDetailDialog.clientWidth;
  const height = pokemonDetailDialog.clientHeight;
  if (!width || !height) return null;
  return {
    minLeft: 28,
    maxLeft: Math.max(28, width - 68),
    minTop: 88,
    maxTop: Math.max(110, height - 88),
  };
}

function spawnMeowthCoin(options = {}) {
  if (!pokemonDetailDialog) return;
  const bounds = getMeowthCoinBounds();
  if (!bounds) return;
  const coin = document.createElement('button');
  coin.type = 'button';
  coin.className = 'meowth-coin-button';
  if (options.isStarter) coin.classList.add('is-starter');
  if (options.isSilver) coin.classList.add('is-silver');
  coin.textContent = '🪙';

  const left = options.left ?? Math.round(bounds.minLeft + Math.random() * (bounds.maxLeft - bounds.minLeft));
  const top = options.top ?? Math.round(bounds.minTop + Math.random() * (bounds.maxTop - bounds.minTop));
  coin.style.left = `${left}px`;
  coin.style.top = `${top}px`;

  coin.addEventListener('click', () => {
    coin.remove();
    meowthCoinState.count += options.value ?? 1;
    meowthCoinState.started = true;
    updateMeowthCoinCounter();
    if (meowthCoinState.count >= 1000) {
      clearMeowthCoinHunt();
      openPokemonDetail('Gholdengo');
      return;
    }
    const activeCoins = pokemonDetailDialog.querySelectorAll('.meowth-coin-button').length;
    const coinsToSpawn = Math.max(0, Math.min(2, 24 - activeCoins));
    for (let index = 0; index < coinsToSpawn; index += 1) {
      spawnMeowthCoin();
    }
    if (!options.isSilver && meowthCoinState.count > 0 && meowthCoinState.count % 10 === 0 && activeCoins < 24) {
      spawnMeowthCoin({ isSilver: true, value: 100 });
    }
  });

  pokemonDetailDialog.append(coin);
}

function initializeMeowthCoinHunt(pokemon) {
  clearMeowthCoinHunt();
  if (pokemon.name !== 'Meowth' || !pokemonDetailDialog) return;
  spawnMeowthCoin({
    isStarter: true,
    left: 22,
    top: Math.max(96, pokemonDetailDialog.clientHeight - 86),
  });
}

function setupWimpodDetailEffect(spriteWrap, pokemon) {
  if (pokemon.name !== 'Wimpod' || !pokemonDetailBody) return;
  let hasScuttled = false;
  const runIfVisible = () => {
    if (!spriteWrap.isConnected) return;
    const wrapRect = spriteWrap.getBoundingClientRect();
    const bodyRect = pokemonDetailBody.getBoundingClientRect();
    const isVisible = wrapRect.bottom > bodyRect.top + 20 && wrapRect.top < bodyRect.bottom - 20;
    if (!isVisible) {
      hasScuttled = false;
      spriteWrap.classList.remove('is-wimpod-startled', 'is-wimpod-scuttled');
      return;
    }
    if (hasScuttled) return;
    hasScuttled = true;
    spriteWrap.classList.add('is-wimpod-startled');
    const timeout = window.setTimeout(() => {
      if (!spriteWrap.isConnected) return;
      spriteWrap.classList.add('is-wimpod-scuttled');
      spriteWrap.classList.remove('is-wimpod-startled');
    }, 240);
    detailSpecialEffectCleanups.push(() => window.clearTimeout(timeout));
  };
  const onScroll = () => runIfVisible();
  pokemonDetailBody.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  detailSpecialEffectCleanups.push(() => {
    pokemonDetailBody.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  });
  requestAnimationFrame(runIfVisible);
}

function setupKecleonDetailEffect(spriteWrap, pokemon) {
  if (pokemon.name !== 'Kecleon' || !pokemonDetailBody) return;
  const onMove = (event) => {
    const rect = spriteWrap.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
    const normalized = Math.max(0, Math.min(1, distance / 240));
    const opacity = 0.08 + normalized * 0.92;
    spriteWrap.style.setProperty('--kecleon-opacity', opacity.toFixed(3));
  };
  const onLeave = () => {
    spriteWrap.style.removeProperty('--kecleon-opacity');
  };
  pokemonDetailBody.addEventListener('mousemove', onMove);
  pokemonDetailBody.addEventListener('mouseleave', onLeave);
  detailSpecialEffectCleanups.push(() => {
    pokemonDetailBody.removeEventListener('mousemove', onMove);
    pokemonDetailBody.removeEventListener('mouseleave', onLeave);
    spriteWrap.style.removeProperty('--kecleon-opacity');
  });
}

function renderPokemonDetail(pokemon) {
  clearMeowthCoinHunt();
  clearDetailSpecialEffects();
  clearDetailEffectTimeouts();
  activeDetailPokemonName = pokemon.name;
  pokemonDetailModal.classList.remove(
    'is-gholdengo-theme',
    'is-gholdengo-sparkle',
    'is-dialga-retro',
    'is-mega-detail',
    'is-primal-groudon-detail',
    'is-primal-kyogre-detail',
    'is-rotom-static',
  );
  if (hasGholdengoDetailTheme(pokemon)) {
    pokemonDetailModal.classList.add('is-gholdengo-theme', 'is-gholdengo-sparkle');
    queueDetailEffect(() => {
      pokemonDetailModal.classList.remove('is-gholdengo-sparkle');
    }, 1200);
  }
  if (hasDialgaRetroTheme(pokemon)) pokemonDetailModal.classList.add('is-dialga-retro');
  const animatedBorderVariant = getAnimatedBorderVariant(pokemon.name);
  if (animatedBorderVariant === 'mega') pokemonDetailModal.classList.add('is-mega-detail');
  if (animatedBorderVariant === 'primal-groudon') pokemonDetailModal.classList.add('is-primal-groudon-detail');
  if (animatedBorderVariant === 'primal-kyogre') pokemonDetailModal.classList.add('is-primal-kyogre-detail');
  if (isRotomFamily(pokemon) && Math.random() < 0.01) {
    pokemonDetailModal.classList.add('is-rotom-static');
    queueDetailEffect(() => {
      pokemonDetailModal.classList.remove('is-rotom-static');
    }, 720);
  }
  detailTitle.textContent = getPokemonDisplayName(pokemon);
  detailTitle.classList.remove('is-quark-name', 'is-proto-name', 'is-porygon-glitching');
  const detailNameVariant = getSpecialNameVariant(pokemon);
  if (detailNameVariant === 'quark') detailTitle.classList.add('is-quark-name');
  if (detailNameVariant === 'proto') detailTitle.classList.add('is-proto-name');

  const navigation = getCurrentDetailNavigation(pokemon);
  detailPrev.hidden = !navigation.previous;
  detailNext.hidden = !navigation.next;
  if (navigation.previous) setSpriteWithFallback(detailPrevSprite, navigation.previous.sprite, `${navigation.previous.name} sprite`);
  if (navigation.next) setSpriteWithFallback(detailNextSprite, navigation.next.sprite, `${navigation.next.name} sprite`);

  const canonicalTopName = pokemon.linkedTo ?? pokemon.name;
  const allLinkedTopForms = getLinkedTopForms(pokemon);
  const collapseTopForms = shouldCollapseTopForms(canonicalTopName);
  const topFormsExpanded = expandedTopGroups.has(canonicalTopName);
  const linkedTopForms = collapseTopForms && !topFormsExpanded
    ? allLinkedTopForms.filter((form) => form.name === pokemon.name)
    : allLinkedTopForms;
  const showTopDefenses = linkedFormsHaveDifferentTypes(allLinkedTopForms);
  let activeTopTitle = null;
  let activeSpriteWrap = null;
  let activeSpriteLayers = [];
  detailTopPanel.innerHTML = '';
  if (collapseTopForms && allLinkedTopForms.length > 1) {
    const header = document.createElement('div');
    header.className = 'detail-top-panel-header';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'detail-top-toggle';
    toggle.textContent = topFormsExpanded ? '▾ Weitere Formen ausblenden' : '▸ Weitere Formen anzeigen';
    toggle.addEventListener('click', () => {
      if (expandedTopGroups.has(canonicalTopName)) expandedTopGroups.delete(canonicalTopName);
      else expandedTopGroups.add(canonicalTopName);
      renderPokemonDetail(pokemon);
    });
    header.append(toggle);
    detailTopPanel.append(header);
  }
  for (const form of linkedTopForms) {
    const topCard = document.createElement('div');
    topCard.className = 'detail-top-card';
    const spriteWrap = document.createElement('div');
    spriteWrap.className = 'detail-sprite-wrap';
    const image = document.createElement('img');
    image.className = 'detail-main-sprite';
    if (hasWormholeEffect(form)) spriteWrap.classList.add('has-wormhole-effect');
    if (['Zorua', 'Zorua-Hisui', 'Zoroark', 'Zoroark-Hisui'].includes(pokemon.name) && form.name === pokemon.name) {
      applyIllusionSpriteEffect(image, form);
    } else if (pokemon.name === 'Ditto' && form.name === 'Ditto') {
      applyDittoSpriteEffect(image, form);
    } else {
      setSpriteWithFallback(image, form.sprite, `${form.name} sprite`);
    }
    if (pokemon.name === 'Porygon-Z' && form.name === pokemon.name) {
      const blueLayer = document.createElement('img');
      blueLayer.className = 'detail-main-sprite detail-main-sprite-glitch detail-main-sprite-glitch-blue';
      setSpriteWithFallback(blueLayer, form.sprite, `${form.name} sprite`);
      const pinkLayer = document.createElement('img');
      pinkLayer.className = 'detail-main-sprite detail-main-sprite-glitch detail-main-sprite-glitch-pink';
      setSpriteWithFallback(pinkLayer, form.sprite, `${form.name} sprite`);
      spriteWrap.append(blueLayer, pinkLayer);
      activeSpriteLayers = [image, blueLayer, pinkLayer];
      activeSpriteWrap = spriteWrap;
    }
    spriteWrap.append(image);

    const metaWrap = document.createElement('div');
    metaWrap.className = 'detail-top-meta';
    const headingWrap = document.createElement('div');
    headingWrap.className = 'detail-top-heading';
    const titleTextWrap = document.createElement('div');
    titleTextWrap.className = 'detail-top-heading-text';
    const title = document.createElement('h3');
    title.className = 'detail-top-title';
    title.textContent = getPokemonDisplayName(form);
    const formNameVariant = getSpecialNameVariant(form);
    if (formNameVariant === 'quark') title.classList.add('is-quark-name');
    if (formNameVariant === 'proto') title.classList.add('is-proto-name');
    if (form.name === pokemon.name) activeTopTitle = title;
    const subtitle = createDetailSubtitleElement(form);
    const tagIcons = createDetailTagIconsElement(form);
    if (tagIcons) headingWrap.append(tagIcons);
    titleTextWrap.append(title);
    if (subtitle) titleTextWrap.append(subtitle);
    headingWrap.append(titleTextWrap);

    const typeList = document.createElement('div');
    typeList.className = 'detail-type-list';
    for (const type of form.types) {
      const pill = document.createElement('div');
      pill.className = 'detail-type-pill';
      if (typeIcons[type]) {
        const icon = document.createElement('img');
        icon.src = typeIcons[type];
        icon.alt = type;
        pill.append(icon);
      }
      const label = document.createElement('span');
      label.textContent = type;
      pill.append(label);
      typeList.append(pill);
    }

    const statGrid = document.createElement('div');
    statGrid.className = 'detail-stat-grid';
    const realStatRanges = getPokemonRealStatRanges(form);
    for (const [stat, label] of Object.entries(statLabels)) {
      const card = document.createElement('div');
      card.className = 'detail-stat-card';
      const statTitle = document.createElement('strong');
      statTitle.textContent = label;
      const value = document.createElement('span');
      value.textContent = String(form.baseStats?.[stat] ?? '—');
      card.append(statTitle, value);
      statGrid.append(card);
    }

    [...statGrid.children].forEach((card, index) => {
      const stat = Object.keys(statLabels)[index];
      const baseStat = form.baseStats?.[stat];
      if (baseStat === undefined || baseStat === null) return;
      const value = card.querySelector('span');
      if (!value) return;
      const range = document.createElement('small');
      range.className = 'detail-stat-range';
      range.textContent = ` ${formatRealStatRange(realStatRanges[stat])}`;
      value.append(range);
    });

    metaWrap.append(headingWrap, typeList, statGrid);

    if (showTopDefenses) {
      const defenseGrid = document.createElement('div');
      defenseGrid.className = 'detail-top-defense-grid';
      for (const type of battleTypes) {
        const entries = getDefenseEntriesForType(form, type);
        const item = document.createElement('div');
        item.className = 'detail-top-defense-item';
        if (typeIcons[type]) {
          const icon = document.createElement('img');
          icon.src = typeIcons[type];
          icon.alt = type;
          item.append(icon);
        }
        const label = document.createElement('span');
        label.textContent = entries.map((entry) => `${entry.value}x`).join(' / ');
        item.title = entries.map((entry) => entry.reason).join(' / ');
        item.append(label);
        defenseGrid.append(item);
      }
      metaWrap.append(defenseGrid);
    }

    topCard.append(spriteWrap, metaWrap);
    detailTopPanel.append(topCard);
    if (form.name === pokemon.name) {
      setupWimpodDetailEffect(spriteWrap, pokemon);
      setupKecleonDetailEffect(spriteWrap, pokemon);
    }
  }
  if (pokemon.name === 'Porygon-Z' && activeTopTitle && activeSpriteWrap && activeSpriteLayers.length) {
    applyPorygonZDetailEffect(pokemon, [detailTitle, activeTopTitle], activeSpriteWrap, activeSpriteLayers);
  }

  detailAbilities.innerHTML = '';
  const displayedAbilities = [...pokemon.abilityDetails];
  const preMegaPokemon = getPreMegaPokemon(pokemon);
  if (preMegaPokemon) {
    for (const ability of preMegaPokemon.abilityDetails ?? []) {
      displayedAbilities.push({
        ...ability,
        id: `premega-${ability.id}`,
        slot: 'Vor Mega',
        sourceLabel: 'Vor Mega',
        isPreMegaAbility: true,
      });
    }
  }
  if (pokemon.name === 'Pecharunt') {
    displayedAbilities.push({
      id: 'pressure',
      name: 'Pressure',
      slot: 'Spezial',
      shortDesc: 'If this Pokemon is the target of a foe\'s move, that move loses one additional PP.',
      desc: 'If this Pokemon is the target of a foe\'s move, that move loses one additional PP.',
    });
  }
  for (const ability of displayedAbilities) {
    const card = document.createElement('div');
    card.className = 'detail-ability-card';
    if (ability.isPreMegaAbility) card.classList.add('is-pre-mega');
    if (pokemon.name === 'Pecharunt' && ability.name === 'Poison Puppeteer') {
      card.classList.add('is-banned');
    }
    const abilityRuleInfo = getAbilityRuleInfo(ability.name, pokemon);
    if (abilityRuleInfo) {
      card.classList.add(abilityRuleInfo.severity === 'illegal' ? 'is-banned' : 'is-warning');
    }
    const header = document.createElement('div');
    header.className = 'detail-ability-header';
    const titleWrap = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = ability.name;
    const slot = document.createElement('div');
    slot.className = 'detail-ability-slot';
    slot.textContent = ability.sourceLabel ?? getAbilitySlotLabel(ability.slot);
    titleWrap.append(title, slot);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'detail-ability-expand';
    const isExpanded = expandedAbilityIds.has(ability.id);
    button.textContent = isExpanded ? 'Weniger' : 'Mehr';
    button.addEventListener('click', () => {
      if (expandedAbilityIds.has(ability.id)) expandedAbilityIds.delete(ability.id);
      else expandedAbilityIds.add(ability.id);
      renderPokemonDetail(pokemon);
    });
    header.append(titleWrap, button);
    const text = document.createElement('p');
    text.textContent = isExpanded ? (ability.desc ?? ability.shortDesc ?? '—') : (ability.shortDesc ?? ability.desc ?? '—');
    card.append(header, text);
    if (pokemon.name === 'Pecharunt' && ability.name === 'Poison Puppeteer') {
      const note = document.createElement('div');
      note.className = 'detail-ability-note';
      note.textContent = 'Diese Fähigkeit ist bei uns nicht erlaubt, stattdessen wird Infamomo mit Pressure gespielt';
      card.append(note);
    }
    if (abilityRuleInfo) {
      const note = document.createElement('div');
      note.className = `detail-ability-note ${abilityRuleInfo.severity === 'illegal' ? 'is-illegal' : 'is-warning'}`;
      note.textContent = abilityRuleInfo.text;
      card.append(note);
    }
    detailAbilities.append(card);
  }

  detailTierList.innerHTML = '';
  if (pokemon.cost === null) {
    renderEmptyDetailState(detailTierList, 'Für dieses Pokémon sind derzeit keine Punktekosten festgelegt.');
  } else {
    const costRibbon = document.createElement('div');
    costRibbon.className = 'detail-ribbon is-tier';
    const costBadge = document.createElement('span');
    costBadge.className = 'detail-tier-badge';
    if (pokemon.cost >= 21) {
      costBadge.classList.add('is-premium', `cost-${pokemon.cost}`);
    }
    costBadge.textContent = String(pokemon.cost);
    const costText = document.createElement('p');
    costText.textContent = `Dieses Pokémon kostet ${pokemon.cost} Punkte`;
    costRibbon.append(costBadge, costText);
    detailTierList.append(costRibbon);

    if (pokemon.cost >= 16) {
      const lowPowerRibbon = document.createElement('div');
      lowPowerRibbon.className = 'detail-ribbon is-caution';
      const icon = document.createElement('span');
      icon.textContent = '⚠';
      const text = document.createElement('p');
      text.textContent = 'Dieses Pokémon ist in Low-Power Drafts nicht erlaubt';
      lowPowerRibbon.append(icon, text);
      detailTierList.append(lowPowerRibbon);
    }

    if (pokemon.cost >= 21) {
      const uberRibbon = document.createElement('div');
      uberRibbon.className = 'detail-ribbon is-warning';
      const icon = document.createElement('span');
      icon.textContent = '⚠';
      const text = document.createElement('p');
      text.textContent = 'Dieses Pokémon ist nur in Uber Drafts erlaubt.';
      uberRibbon.append(icon, text);
      detailTierList.append(uberRibbon);
    }
  }

  detailRibbons.innerHTML = '';
  const ribbons = getRibbonEntries(pokemon);
  if (!ribbons.length) {
    renderEmptyDetailState(detailRibbons, 'Keine zusätzlichen Hinweise für dieses Pokémon.');
  } else {
    for (const ribbon of ribbons) {
      const card = document.createElement('div');
      card.className = 'detail-ribbon';
      if (ribbon.warning) card.classList.add('is-warning');
      let icon;
      if (ribbon.symbol) {
        icon = document.createElement('span');
        icon.className = 'detail-ribbon-symbol';
        if (ribbon.symbolClass) icon.classList.add(ribbon.symbolClass);
        icon.textContent = ribbon.symbol;
      } else {
        icon = document.createElement('img');
        icon.src = ribbon.icon;
        icon.alt = '';
      }
      const text = document.createElement('p');
      text.textContent = ribbon.text;
      card.append(icon, text);
      detailRibbons.append(card);
    }
  }

  if (hasSideSandwichDecoration(pokemon)) {
    detailFamilyTitle.textContent = 'Sandwich';
    detailFamily.innerHTML = '';
    const sandwichCard = document.createElement('div');
    sandwichCard.className = 'detail-sandwich-card';
    const sandwichImage = document.createElement('img');
    sandwichImage.src = 'assets/koraidon-miraidon-sandwich.png';
    sandwichImage.alt = 'Sandwich';
    sandwichImage.loading = 'lazy';
    sandwichCard.append(sandwichImage);
    detailFamily.append(sandwichCard);
  } else {
    detailFamilyTitle.textContent = 'Familie';
    renderSpriteLinkSection(detailFamily, getFamilyMembers(pokemon), 'Keine Familienmitglieder gefunden.');
  }
  const distantRelatives = getDistantRelativeMembers(pokemon);
  detailDistantRelativesSection.hidden = !distantRelatives.length;
  if (distantRelatives.length) {
    renderSpriteLinkSection(detailDistantRelatives, distantRelatives, 'Keine fernen Verwandten gefunden.');
  } else {
    detailDistantRelatives.innerHTML = '';
  }
  renderSpriteLinkSection(detailVariations, getVariationMembers(pokemon), 'Keine weiteren Variationen gefunden.');

  detailWeaknessGrid.innerHTML = '';
  for (const type of battleTypes) {
    const card = document.createElement('div');
    card.className = 'detail-weakness-card';
    const header = document.createElement('div');
    header.className = 'detail-weakness-header';
    if (typeIcons[type]) {
      const icon = document.createElement('img');
      icon.src = typeIcons[type];
      icon.alt = type;
      header.append(icon);
    }
    const label = document.createElement('strong');
    label.textContent = type;
    header.append(label);
    const valuesWrap = document.createElement('div');
    valuesWrap.className = 'detail-weakness-values';
    for (const entry of getDefenseEntriesForType(pokemon, type)) {
      const chip = document.createElement('span');
      const classification = classifyDefenseValue(entry.value);
      chip.className = `detail-defense-chip ${classification.className}`;
      chip.textContent = `${entry.value}x ${classification.label}`;
      chip.title = entry.reason;
      valuesWrap.append(chip);
    }
    card.append(header, valuesWrap);
    detailWeaknessGrid.append(card);
  }

  renderPokemonDetailMoves(pokemon);
  renderSimilarPokemonSection(pokemon);
  initializeMeowthCoinHunt(pokemon);
}

function openPokemonDetail(name) {
  const pokemon = pokemonByName.get(name);
  if (!pokemon) return;
  expandedAbilityIds = new Set();
  loadedSimilarPokemonName = null;
  detailMoveSearch.value = '';
  detailMoveCategory.value = 'all';
  renderPokemonDetail(pokemon);
  if (pokemonDetailBody) pokemonDetailBody.scrollTop = 0;
  pokemonDetailModal.hidden = false;
  if (pokemonDetailBody) pokemonDetailBody.scrollTop = 0;
}

function closePokemonDetail() {
  clearMeowthCoinHunt();
  clearDetailSpecialEffects();
  clearDetailEffectTimeouts();
  pokemonDetailModal.hidden = true;
}

function refreshActivePokemonDetail() {
  if (!activeDetailPokemonName) return;
  const pokemon = pokemonByName.get(activeDetailPokemonName);
  if (!pokemon) return;
  renderPokemonDetail(pokemon);
}

function renderTokenChips(container, items, onRemove) {
  container.innerHTML = '';
  for (const item of items) {
    const chip = document.createElement('span');
    chip.className = 'token-chip';
    chip.append(document.createTextNode(item.name));
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'x';
    removeButton.addEventListener('click', () => onRemove(item.id));
    chip.append(removeButton);
    container.append(chip);
  }
}

function setupTokenAutocomplete({ input, suggestionContainer, tokenContainer, getItems, setItems, options }) {
  const refreshSuggestions = () => {
    const query = normalizeText(input.value);
    suggestionContainer.innerHTML = '';
    if (!query) return;

    const matches = options
      .filter((option) => normalizeText(option.name).includes(query))
      .filter((option) => !getItems().some((item) => item.id === option.id))
      .slice(0, 8);

    for (const match of matches) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'suggestion-item';
      button.textContent = match.name;
      button.addEventListener('click', () => {
        setItems([...getItems(), match]);
        input.value = '';
        refresh();
      });
      suggestionContainer.append(button);
    }
  };

  const refresh = () => {
    renderTokenChips(tokenContainer, getItems(), (id) => {
      setItems(getItems().filter((item) => item.id !== id));
      refresh();
    });
    refreshSuggestions();
  };

  input.addEventListener('input', refreshSuggestions);
  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const query = normalizeText(input.value);
    const exact = options.find((option) => normalizeText(option.name) === query);
    const first = exact ?? options.find((option) => normalizeText(option.name).includes(query));
    if (!first || getItems().some((item) => item.id === first.id)) return;
    setItems([...getItems(), first]);
    input.value = '';
    refresh();
  });
  input.addEventListener('blur', () => {
    setTimeout(() => {
      suggestionContainer.innerHTML = '';
    }, 120);
  });

  refresh();
  return refresh;
}

function openDetailsModal() {
  detailsName.value = appliedAdvancedSearch.name;
  abilityMode.value = appliedAdvancedSearch.abilityMode;
  moveMode.value = appliedAdvancedSearch.moveMode;
  draftAbilityTokens = [...appliedAdvancedSearch.abilities];
  draftMoveTokens = [...appliedAdvancedSearch.moves];
  refreshAbilityTokens();
  refreshMoveTokens();
  speedControlEnabled.checked = appliedAdvancedSearch.speedControl.enabled;
  speedControlMode.value = appliedAdvancedSearch.speedControl.mode;
  hazardsEnabled.checked = appliedAdvancedSearch.hazards.enabled;
  hazardsMode.value = appliedAdvancedSearch.hazards.mode;
  pivotEnabled.checked = appliedAdvancedSearch.pivot.enabled;
  pivotMode.value = appliedAdvancedSearch.pivot.mode;

  const rows = [...coverageList.querySelectorAll('.coverage-row')];
  rows.forEach((row, index) => {
    const criterion = appliedAdvancedSearch.coverage[index];
    row.querySelector('[data-role="enabled"]').checked = Boolean(criterion);
    row.querySelector('[data-role="type"]').value = criterion?.type ?? 'Normal';
    row.querySelector('[data-role="power"]').value = String(criterion?.minPower ?? 60);
    row.querySelector('[data-role="value"]').textContent = String(criterion?.minPower ?? 60);
  });

  const statRows = [...statRangeGrid.querySelectorAll('.stat-range-row')];
  statSearchMode.value = appliedAdvancedSearch.statMode ?? 'base';
  statRows.forEach((row) => {
    const stat = row.dataset.stat;
    const range = appliedAdvancedSearch.statRanges[stat];
    row.querySelector('[data-role="min"]').value = range?.min ?? '';
    row.querySelector('[data-role="max"]').value = range?.max ?? '';
  });

  const defensiveCriteriaByType = new Map(
    appliedAdvancedSearch.defensiveCoverage.map((criterion) => [criterion.type, criterion]),
  );
  const defensiveRows = [...defensiveCoverageGrid.querySelectorAll('.defensive-row')];
  defensiveRows.forEach((row) => {
    const rowType = row.querySelector('span').textContent;
    const criterion = defensiveCriteriaByType.get(rowType);
    row.querySelector('input[type="checkbox"]').checked = Boolean(criterion);
    row.querySelector('select').value = criterion?.mode ?? 'resistant';
  });

  detailsModal.hidden = false;
}

function closeDetailsModal() {
  detailsModal.hidden = true;
}

function openExpertSearchModal() {
  expertSearchInput.value = activeExpertSearch.raw;
  expertSearchSyntax.hidden = true;
  expertSearchSyntaxToggle.textContent = 'Syntax';
  expertSearchFeedback.hidden = true;
  expertSearchFeedback.textContent = '';
  expertSearchModal.hidden = false;
  expertSearchInput.focus();
  expertSearchInput.select();
}

function closeExpertSearchModal() {
  expertSearchModal.hidden = true;
}

function submitExpertSearch() {
  const rawQuery = expertSearchInput.value.trim();
  if (!rawQuery) {
    activeExpertSearch = { raw: '', matcher: null };
    expertSearchFeedback.hidden = true;
    applyAllFilters();
    closeExpertSearchModal();
    return;
  }

  try {
    const matcher = compileExpertSearch(rawQuery);
    activeExpertSearch = {
      raw: rawQuery,
      matcher,
    };
    expertSearchFeedback.hidden = true;
    applyAllFilters();
    closeExpertSearchModal();
  } catch (error) {
    expertSearchFeedback.hidden = false;
    expertSearchFeedback.textContent = error instanceof Error ? error.message : 'Ungültige Suchsyntax.';
  }
}

function clearExpertSearch() {
  activeExpertSearch = { raw: '', matcher: null };
  expertSearchInput.value = '';
  expertSearchFeedback.hidden = true;
  expertSearchFeedback.textContent = '';
  applyAllFilters();
  closeExpertSearchModal();
}

function getBudgetPlannerTotalBudget(format = budgetPlannerState.format) {
  return budgetTotalsByFormat[format] ?? budgetTotalsByFormat.normal;
}

function getBudgetPlannerCaptainTypes(kind) {
  return [...battleTypes, 'Stellar'].filter((type) => (kind === 'z' ? captainTypeCosts[type]?.z !== null : captainTypeCosts[type]?.tera !== null));
}

function getBudgetPlannerCaptainCost(kind, type) {
  if (!kind || !type) return 0;
  return captainTypeCosts[type]?.[kind] ?? 0;
}

function getBudgetPlannerSlotPokemon(index) {
  const name = budgetPlannerState.slots[index]?.name;
  return name ? pokemonByName.get(name) ?? null : null;
}

function getBudgetPlannerSlotTotalCost(slot) {
  if (!slot?.name) return 0;
  const pokemon = pokemonByName.get(slot.name);
  if (!pokemon || pokemon.cost === null) return 0;
  return pokemon.cost + getBudgetPlannerCaptainCost(slot.captainKind, slot.captainType);
}

function getBudgetPlannerSpentBudget(exceptSlotIndex = null) {
  return budgetPlannerState.slots.reduce((sum, slot, index) => {
    if (index === exceptSlotIndex) return sum;
    return sum + getBudgetPlannerSlotTotalCost(slot);
  }, 0);
}

function getBudgetPlannerRemainingBudget(exceptSlotIndex = null) {
  return getBudgetPlannerTotalBudget() - getBudgetPlannerSpentBudget(exceptSlotIndex);
}

function getBudgetPlannerSelectedEntries() {
  return budgetPlannerState.slots
    .map((slot, index) => {
      if (!slot.name) return null;
      const pokemon = pokemonByName.get(slot.name);
      if (!pokemon) return null;
      return { slotIndex: index, slot, pokemon };
    })
    .filter(Boolean);
}

function formatBudgetPlannerCostBreakdown(slot) {
  if (!slot?.name) return '0 Punkte';
  const pokemon = pokemonByName.get(slot.name);
  const baseCost = pokemon?.cost ?? 0;
  const extraCost = getBudgetPlannerCaptainCost(slot.captainKind, slot.captainType);
  const totalCost = baseCost + extraCost;
  if (extraCost > 0) return `${totalCost} Punkte (${baseCost}+${extraCost})`;
  return `${totalCost} Punkte`;
}

function getBudgetPlannerMascotEntry(remaining, total) {
  const ratio = total > 0 ? remaining / total : 0;
  const spriteFor = (name) => pokemonByName.get(name)?.sprite ?? '';
  if (ratio >= 1) {
    return { className: 'is-gold is-sparkle', sprite: spriteFor('Gholdengo'), alt: 'Gholdengo sprite' };
  }
  if (ratio >= 0.76) {
    return { className: 'is-gold', sprite: spriteFor('Gimmighoul'), alt: 'Gimmighoul sprite' };
  }
  if (ratio >= 0.5) {
    return { className: 'is-silver', sprite: spriteFor('Gimmighoul-Roaming') || spriteFor('Gimmighoul'), alt: 'Gimmighoul-Roaming sprite' };
  }
  return { className: 'is-bronze', sprite: spriteFor('Rattata-Alola') || spriteFor('Rattata'), alt: 'Alolan Rattata sprite' };
}

function setBudgetPlannerFeedback(message = '') {
  if (!budgetPlannerFeedback) return;
  budgetPlannerFeedback.hidden = !message;
  budgetPlannerFeedback.textContent = message;
}

function getBudgetPlannerSelectedCaptainUsage(exceptSlotIndex = null) {
  return {
    z: budgetPlannerState.slots.some((slot, index) => index !== exceptSlotIndex && slot.captainKind === 'z'),
    tera: budgetPlannerState.slots.some((slot, index) => index !== exceptSlotIndex && slot.captainKind === 'tera'),
  };
}

function getBudgetPlannerSelectedMegaSlot(exceptSlotIndex = null) {
  return getBudgetPlannerSelectedEntries().find((entry) => entry.slotIndex !== exceptSlotIndex && getPokemonFlags(entry.pokemon).mega) ?? null;
}

function isBudgetPlannerPokemonUnavailable(pokemon, slotIndex = null) {
  if (!pokemon || pokemon.hidden || pokemon.unreleased || pokemon.impossible || pokemon.cost === null) {
    return { unavailable: true, reason: 'Unavailable' };
  }
  if (budgetPlannerState.format === 'low-power' && pokemon.cost > 15) {
    return { unavailable: true, reason: 'Too expensive for Low Power' };
  }
  if (budgetPlannerState.format === 'normal' && pokemon.cost > 20) {
    return { unavailable: true, reason: 'Too expensive for Normal' };
  }
  const megaEntry = getBudgetPlannerSelectedMegaSlot(slotIndex);
  if (megaEntry && getPokemonFlags(pokemon).mega) {
    return { unavailable: true, reason: 'Another Mega is already selected' };
  }
  const projectedSpent = getBudgetPlannerSpentBudget(slotIndex) + pokemon.cost;
  if (projectedSpent > getBudgetPlannerTotalBudget()) {
    return { unavailable: true, reason: 'Would exceed budget' };
  }
  return { unavailable: false, reason: '' };
}

function clearBudgetPlannerSlot(index) {
  budgetPlannerState.slots[index] = {
    name: null,
    input: '',
    captainKind: null,
    captainType: '',
  };
}

function sanitizeBudgetPlannerState(message = '') {
  let changed = false;
  for (let index = 0; index < budgetPlannerState.slots.length; index += 1) {
    const slot = budgetPlannerState.slots[index];
    const pokemon = getBudgetPlannerSlotPokemon(index);
    if (!slot.name || !pokemon) continue;
    if (isBudgetPlannerPokemonUnavailable(pokemon, index).unavailable) {
      clearBudgetPlannerSlot(index);
      changed = true;
      continue;
    }
    const flags = getPokemonFlags(pokemon);
    if ((slot.captainKind === 'z' && !flags.z) || (slot.captainKind === 'tera' && !flags.tera)) {
      slot.captainKind = null;
      slot.captainType = '';
      changed = true;
      continue;
    }
    if (slot.captainKind && slot.captainType && getBudgetPlannerCaptainCost(slot.captainKind, slot.captainType) === 0) {
      slot.captainType = '';
      changed = true;
    }
  }
  const usedKinds = { z: null, tera: null };
  for (let index = 0; index < budgetPlannerState.slots.length; index += 1) {
    const slot = budgetPlannerState.slots[index];
    if (!slot.captainKind) continue;
    if (usedKinds[slot.captainKind] !== null) {
      slot.captainKind = null;
      slot.captainType = '';
      changed = true;
      continue;
    }
    usedKinds[slot.captainKind] = index;
  }
  while (getBudgetPlannerRemainingBudget() < 0) {
    const removable = [...getBudgetPlannerSelectedEntries()].sort((left, right) => right.slotIndex - left.slotIndex)[0];
    if (!removable) break;
    clearBudgetPlannerSlot(removable.slotIndex);
    changed = true;
  }
  if (message && changed) setBudgetPlannerFeedback(message);
  return changed;
}

function buildBudgetPlannerCostText() {
  const lines = [
    'Captain Costs',
    '',
    'Format Budgets:',
    `Normal: ${budgetTotalsByFormat.normal}`,
    `Low Power: ${budgetTotalsByFormat['low-power']}`,
    `Uber: ${budgetTotalsByFormat.uber}`,
    '',
    'Captain Costs:',
    'Type | Tera | Z',
  ];
  for (const type of [...battleTypes, 'Stellar']) {
    const costs = captainTypeCosts[type];
    if (!costs) continue;
    lines.push(`${typeLabelsDe[type] ?? type} | ${costs.tera} | ${costs.z === null ? 'N/A' : costs.z}`);
  }
  return lines.join('\n');
}

function buildBudgetPlannerSpendText() {
  const total = getBudgetPlannerTotalBudget();
  const remaining = getBudgetPlannerRemainingBudget();
  const lines = [
    'Budget Planer - Spent Costs',
    '',
    `Format: ${budgetPlannerFormat?.selectedOptions?.[0]?.textContent ?? budgetPlannerState.format}`,
    `Budget: ${remaining} / ${total}`,
    '',
    'Pokemon | Base | Captain | Total',
  ];
  for (const entry of getBudgetPlannerSelectedEntries()) {
    const baseCost = entry.pokemon.cost ?? 0;
    const extraCost = getBudgetPlannerCaptainCost(entry.slot.captainKind, entry.slot.captainType);
    const captainLabel = entry.slot.captainKind && entry.slot.captainType
      ? `${entry.slot.captainKind === 'z' ? 'Z' : 'Tera'} ${typeLabelsDe[entry.slot.captainType] ?? entry.slot.captainType} (+${extraCost})`
      : '—';
    lines.push(`${entry.pokemon.name} | ${baseCost} | ${captainLabel} | ${baseCost + extraCost}`);
  }
  return lines.join('\n');
}

function downloadBlob(filename, blob, mimeType = 'application/octet-stream') {
  const url = URL.createObjectURL(blob instanceof Blob ? blob : new Blob([blob], { type: mimeType }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function renderBudgetPlannerBudget() {
  const remaining = getBudgetPlannerRemainingBudget();
  const total = getBudgetPlannerTotalBudget();
  if (budgetPlannerBudgetRemaining) budgetPlannerBudgetRemaining.textContent = String(remaining);
  if (budgetPlannerBudgetTotal) budgetPlannerBudgetTotal.textContent = String(total);
  if (budgetPlannerBudget) {
    budgetPlannerBudget.classList.remove('is-gold', 'is-silver', 'is-bronze', 'is-sparkle');
    const mascot = getBudgetPlannerMascotEntry(remaining, total);
    for (const className of mascot.className.split(' ')) {
      if (className) budgetPlannerBudget.classList.add(className);
    }
    if (budgetPlannerBudgetMascot && mascot.sprite) {
      budgetPlannerBudgetMascot.hidden = false;
      budgetPlannerBudgetMascot.src = mascot.sprite;
      budgetPlannerBudgetMascot.alt = mascot.alt;
    } else if (budgetPlannerBudgetMascot) {
      budgetPlannerBudgetMascot.hidden = true;
      budgetPlannerBudgetMascot.removeAttribute('src');
    }
  }
}

function renderBudgetPlannerStars() {
  if (!budgetPlannerStars) return;
  budgetPlannerStars.innerHTML = '';
  const selected = getBudgetPlannerSelectedEntries();
  const oneCostEntry = selected.find((entry) => entry.pokemon.cost === 1);
  const messages = [];
  if (oneCostEntry) {
    messages.push(`⭐ Dieses Team kann durch ${oneCostEntry.pokemon.name} einen Stern verdienen!`);
  }
  if (getBudgetPlannerRemainingBudget() >= 5) {
    messages.push('⭐ Dieses Team kann wegen des Rest-Budgets einen Stern verdienen!');
  }
  if (!messages.length) {
    renderEmptyDetailState(budgetPlannerStars, 'Aktuell gibt es keine Stern-Boni.');
    return;
  }
  for (const message of messages) {
    const item = document.createElement('div');
    item.className = 'budget-planner-star-note';
    item.textContent = message;
    budgetPlannerStars.append(item);
  }
}

function getBudgetPlannerDefenseCode(value) {
  if (value === 0) return { text: 'I', className: 'immune' };
  if (value <= 0.25) return { text: 'DR', className: 'double-resist' };
  if (value <= 0.5) return { text: 'R', className: 'resist' };
  if (value >= 4) return { text: 'DS', className: 'double-weak' };
  if (value >= 2) return { text: 'S', className: 'weak' };
  return { text: 'N', className: 'neutral' };
}

function renderBudgetPlannerTypeMatrix() {
  if (!budgetPlannerTypeMatrixWrap) return;
  budgetPlannerTypeMatrixWrap.innerHTML = '';
  const selected = getBudgetPlannerSelectedEntries();
  if (!selected.length) {
    renderEmptyDetailState(budgetPlannerTypeMatrixWrap, 'Wähle mindestens ein Pokémon aus, um die Matrix zu sehen.');
    return;
  }
  const table = document.createElement('table');
  table.className = 'budget-planner-type-matrix';
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const corner = document.createElement('th');
  corner.textContent = 'Pokémon';
  headerRow.append(corner);
  for (const type of battleTypes) {
    const header = document.createElement('th');
    if (typeIcons[type]) {
      const icon = document.createElement('img');
      icon.src = typeIcons[type];
      icon.alt = type;
      header.append(icon);
    } else {
      header.textContent = type;
    }
    header.title = type;
    headerRow.append(header);
  }
  thead.append(headerRow);
  const tbody = document.createElement('tbody');
  const matrixEntries = [];
  for (const entry of selected) {
    matrixEntries.push({
      key: entry.pokemon.name,
      name: entry.pokemon.name,
      sprite: entry.pokemon.sprite,
      pokemon: entry.pokemon,
      tintType: null,
    });
    if (entry.slot.captainKind === 'tera' && entry.slot.captainType) {
      matrixEntries.push({
        key: `${entry.pokemon.name}-tera-${entry.slot.captainType}`,
        name: `${entry.pokemon.name} (Tera ${typeLabelsDe[entry.slot.captainType] ?? entry.slot.captainType})`,
        sprite: entry.pokemon.sprite,
        pokemon: {
          ...entry.pokemon,
          types: [entry.slot.captainType],
        },
        tintType: entry.slot.captainType,
      });
    }
  }
  for (const entry of matrixEntries) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('th');
    nameCell.className = 'budget-planner-matrix-pokemon';
    const sprite = document.createElement('img');
    sprite.src = entry.sprite;
    sprite.alt = `${entry.name} sprite`;
    sprite.loading = 'lazy';
    if (entry.tintType) {
      const tint = typeColorVars[entry.tintType] ?? 'var(--accent)';
      sprite.style.setProperty('--budget-matrix-tint', tint);
      sprite.classList.add('is-tera-preview');
    }
    const label = document.createElement('span');
    label.textContent = entry.name;
    nameCell.append(sprite, label);
    row.append(nameCell);
    for (const type of battleTypes) {
      const cell = document.createElement('td');
      const code = getBudgetPlannerDefenseCode(getReplacementBestDefenseValue(entry.pokemon, type));
      cell.className = `budget-planner-defense-cell ${code.className}`;
      const text = document.createElement('span');
      text.className = 'budget-planner-defense-text';
      text.textContent = code.text;
      cell.append(text);
      cell.title = `${entry.pokemon.name} vs ${type}`;
      row.append(cell);
    }
    tbody.append(row);
  }
  table.append(thead, tbody);
  budgetPlannerTypeMatrixWrap.append(table);
}

function renderBudgetPlannerStatMatrix() {
  if (!budgetPlannerStatMatrixWrap) return;
  budgetPlannerStatMatrixWrap.innerHTML = '';
  const selected = getBudgetPlannerSelectedEntries();
  if (!selected.length) {
    renderEmptyDetailState(budgetPlannerStatMatrixWrap, 'Select at least one Pokémon to see the stat matrix.');
    return;
  }
  const table = document.createElement('table');
  table.className = 'budget-planner-stat-matrix';
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Pokémon</th>
      <th>HP</th>
      <th>Atk</th>
      <th>Def</th>
      <th>SpA</th>
      <th>SpD</th>
      <th>Spe</th>
    </tr>
  `;
  const tbody = document.createElement('tbody');
  for (const entry of selected) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('th');
    nameCell.className = 'budget-planner-matrix-pokemon';
    const sprite = document.createElement('img');
    sprite.src = entry.pokemon.sprite;
    sprite.alt = `${entry.pokemon.name} sprite`;
    sprite.loading = 'lazy';
    const label = document.createElement('span');
    label.textContent = entry.pokemon.name;
    nameCell.append(sprite, label);
    row.append(nameCell);
    for (const stat of ['hp', 'atk', 'def', 'spa', 'spd', 'spe']) {
      const cell = document.createElement('td');
      const text = document.createElement('span');
      text.className = 'budget-planner-defense-text';
      text.textContent = String(entry.pokemon.baseStats?.[stat] ?? '—');
      cell.append(text);
      row.append(cell);
    }
    tbody.append(row);
  }
  table.append(thead, tbody);
  budgetPlannerStatMatrixWrap.append(table);
}

function getBudgetPlannerRoleFeatures() {
  const selected = getBudgetPlannerSelectedEntries();
  const hasSlowPartner = selected.some((entry) => (entry.pokemon.baseStats?.spe ?? 999) <= 50);
  const hasAnyMove = (pokemon, moves) => pokemonHasAnyMoveId(pokemon, moves);
  return [
    { label: 'Mega', neutral: true, entries: selected.filter((entry) => getPokemonFlags(entry.pokemon).mega) },
    { label: 'Z-Captain', neutral: true, entries: selected.filter((entry) => entry.slot.captainKind === 'z') },
    { label: 'Tera-Captain', neutral: true, entries: selected.filter((entry) => entry.slot.captainKind === 'tera') },
    { label: 'Pivot', entries: selected.filter((entry) => pokemonHasPivotMode(entry.pokemon, 'all')) },
    { label: 'Offensiver Pivot', entries: selected.filter((entry) => pokemonHasPivotMode(entry.pokemon, 'offense')) },
    { label: 'Defensiver Pivot', entries: selected.filter((entry) => pokemonHasPivotMode(entry.pokemon, 'defense')) },
    { label: 'Hazard', entries: selected.filter((entry) => ['rocks', 'webs', 'spikes', 'tspikes', 'damage'].some((mode) => pokemonHasHazards(entry.pokemon, mode))) },
    { label: 'Hazard Removal', entries: selected.filter((entry) => hasAnyMove(entry.pokemon, ['defog', 'tidyup', 'courtchange', 'rapidspin'])) },
    { label: 'Speed Control', entries: selected.filter((entry) => pokemonHasSpeedControl(entry.pokemon, 'all')) },
    { label: 'Trick Room', entries: selected.filter((entry) => hasAnyMove(entry.pokemon, ['trickroom']) && hasSlowPartner) },
    { label: 'Speed Tier 100', entries: selected.filter((entry) => (entry.pokemon.baseStats?.spe ?? 0) >= 100) },
    { label: 'Speed Tier 120', entries: selected.filter((entry) => (entry.pokemon.baseStats?.spe ?? 0) >= 120) },
    { label: 'Speed Tier 140', entries: selected.filter((entry) => (entry.pokemon.baseStats?.spe ?? 0) >= 140) },
    { label: 'Wish-Pass', entries: selected.filter((entry) => pokemonHasPivotMode(entry.pokemon, 'all') && hasAnyMove(entry.pokemon, ['wish'])) },
    {
      label: 'Anti-Lead',
      entries: selected.filter((entry) => {
        const abilities = Object.values(entry.pokemon.abilities ?? {});
        const hasDisruption = hasAnyMove(entry.pokemon, ['taunt', 'encore']);
        return (
          (abilities.includes('Prankster') && hasDisruption) ||
          ((entry.pokemon.baseStats?.spe ?? 0) >= 100 && hasDisruption) ||
          abilities.includes('Magic Bounce')
        );
      }),
    },
  ];
}

function renderBudgetPlannerFeatureGrid() {
  if (!budgetPlannerFeatureGrid) return;
  budgetPlannerFeatureGrid.innerHTML = '';
  const features = getBudgetPlannerRoleFeatures();
  for (const feature of features) {
    const item = document.createElement('div');
    item.className = `budget-planner-feature ${feature.neutral ? 'is-neutral' : 'is-positive'} ${feature.entries.length ? 'is-checked' : ''}`;
    const label = document.createElement('span');
    label.className = 'budget-planner-feature-label';
    label.textContent = feature.label;
    const check = document.createElement('span');
    check.className = 'budget-planner-feature-check';
    check.textContent = feature.entries.length ? '✓' : '□';
    const spriteList = document.createElement('div');
    spriteList.className = 'budget-planner-feature-sprites';
    for (const entry of feature.entries) {
      const sprite = document.createElement('img');
      sprite.src = entry.pokemon.sprite;
      sprite.alt = entry.pokemon.name;
      sprite.title = entry.pokemon.name;
      sprite.loading = 'lazy';
      spriteList.append(sprite);
    }
    item.append(check, label, spriteList);
    budgetPlannerFeatureGrid.append(item);
  }
}

function renderBudgetPlannerZoomGrid() {
  if (!budgetPlannerZoomGrid) return;
  budgetPlannerZoomGrid.innerHTML = '';
  const selected = getBudgetPlannerSelectedEntries();
  if (!selected.length) {
    renderEmptyDetailState(budgetPlannerZoomGrid, 'Wähle mindestens ein Pokémon aus.');
    return;
  }
  for (const entry of selected) {
    const card = document.createElement('div');
    card.className = 'budget-planner-zoom-card';
    const animatedBorderVariant = getAnimatedBorderVariant(entry.pokemon.name);
    if (animatedBorderVariant === 'mega') card.classList.add('has-mega-border');
    if (entry.slot.captainKind === 'tera' && entry.slot.captainType) {
      card.classList.add('has-tera-captain');
      if (entry.slot.captainType === 'Stellar') card.classList.add('has-stellar-tera');
      card.style.setProperty('--budget-tera-color', typeColorVars[entry.slot.captainType] ?? 'var(--accent)');
    }
    if (entry.slot.captainKind === 'z' && entry.slot.captainType) {
      card.classList.add('has-z-captain');
      card.style.setProperty('--budget-z-color', typeColorVars[entry.slot.captainType] ?? 'var(--accent)');
    }
    const sprite = document.createElement('img');
    sprite.src = entry.pokemon.sprite;
    sprite.alt = entry.pokemon.name;
    sprite.loading = 'lazy';
    const spriteWrap = document.createElement('div');
    spriteWrap.className = 'budget-planner-zoom-sprite-wrap';
    spriteWrap.append(sprite);
    if (entry.slot.captainKind === 'z' && entry.slot.captainType) {
      const zBadge = document.createElement('span');
      zBadge.className = 'budget-planner-z-badge';
      zBadge.textContent = '◆';
      zBadge.style.setProperty('--budget-z-color', typeColorVars[entry.slot.captainType] ?? 'var(--accent)');
      spriteWrap.append(zBadge);
    }
    const name = document.createElement('strong');
    name.textContent = entry.pokemon.name;
    const cost = document.createElement('span');
    cost.textContent = formatBudgetPlannerCostBreakdown(entry.slot);
    const captain = document.createElement('span');
    captain.className = 'budget-planner-zoom-captain';
    captain.textContent = entry.slot.captainKind && entry.slot.captainType
      ? `${entry.slot.captainKind === 'z' ? 'Z' : 'Tera'}: ${typeLabelsDe[entry.slot.captainType] ?? entry.slot.captainType}`
      : 'Kein Captain';
    card.append(spriteWrap, name, cost, captain);
    budgetPlannerZoomGrid.append(card);
  }
}

async function loadImageForCanvas(src) {
  try {
    const response = await fetch(src, { mode: 'cors' });
    if (!response.ok) throw new Error(`Image fetch failed: ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    return await new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve({
        image,
        revoke: () => URL.revokeObjectURL(objectUrl),
      });
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(null);
      };
      image.src = objectUrl;
    });
  } catch {
    return null;
  }
}

async function downloadBudgetPlannerPng() {
  const selected = getBudgetPlannerSelectedEntries();
  if (!selected.length) {
    setBudgetPlannerFeedback('Select at least one Pokémon before downloading a PNG.');
    return;
  }
  const columns = Math.min(4, Math.max(2, selected.length));
  const rows = Math.ceil(selected.length / columns);
  const width = 260 * columns + 40;
  const height = 150 * rows + 120;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = currentTheme === 'dark' ? '#101826' : '#fffaf3';
  context.fillRect(0, 0, width, height);
  context.fillStyle = currentTheme === 'dark' ? '#e8eefc' : '#1f2233';
  context.font = '700 28px Chakra Petch, sans-serif';
  context.fillText(`Budget Planer - ${budgetPlannerFormat?.selectedOptions?.[0]?.textContent ?? 'Format'}`, 20, 40);
  context.font = '600 18px Chakra Petch, sans-serif';
  context.fillText(`Budget: ${getBudgetPlannerRemainingBudget()} / ${getBudgetPlannerTotalBudget()}`, 20, 72);
  const images = await Promise.all(selected.map((entry) => loadImageForCanvas(entry.pokemon.sprite)));
  selected.forEach((entry, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const x = 20 + column * 260;
    const y = 95 + row * 150;
    context.fillStyle = currentTheme === 'dark' ? '#18263d' : '#ffffff';
    context.strokeStyle = currentTheme === 'dark' ? '#30405f' : '#d7dce7';
    context.lineWidth = 2;
    context.beginPath();
    context.roundRect(x, y, 236, 126, 18);
    context.fill();
    context.stroke();
    const imageEntry = images[index];
    if (imageEntry?.image) context.drawImage(imageEntry.image, x + 12, y + 18, 72, 72);
    context.fillStyle = currentTheme === 'dark' ? '#f4f7ff' : '#1f2233';
    context.font = '700 18px Chakra Petch, sans-serif';
    context.fillText(entry.pokemon.name, x + 96, y + 34);
    context.font = '600 16px Chakra Petch, sans-serif';
    context.fillText(formatBudgetPlannerCostBreakdown(entry.slot), x + 96, y + 58);
    const captainText = entry.slot.captainKind && entry.slot.captainType
      ? `${entry.slot.captainKind === 'z' ? 'Z' : 'Tera'}: ${typeLabelsDe[entry.slot.captainType] ?? entry.slot.captainType}`
      : 'No captain';
    context.fillText(captainText, x + 96, y + 82);
  });
  canvas.toBlob((blob) => {
    images.forEach((entry) => entry?.revoke?.());
    if (!blob) return;
    downloadBlob('budget-planer.png', blob);
  }, 'image/png');
}

function openBudgetPlannerZoomModal() {
  renderBudgetPlannerZoomGrid();
  budgetPlannerZoomModal.hidden = false;
}

function closeBudgetPlannerZoomModal() {
  budgetPlannerZoomModal.hidden = true;
}

function openBudgetPlannerCostsModal() {
  renderBudgetPlannerCostsTable();
  budgetPlannerCostsModal.hidden = false;
}

function closeBudgetPlannerCostsModal() {
  budgetPlannerCostsModal.hidden = true;
}

function openBudgetPlannerCaptainCostsModal() {
  if (budgetPlannerCaptainCostsText) budgetPlannerCaptainCostsText.textContent = buildBudgetPlannerCostText();
  budgetPlannerCaptainCostsModal.hidden = false;
}

function closeBudgetPlannerCaptainCostsModal() {
  budgetPlannerCaptainCostsModal.hidden = true;
}

function renderBudgetPlannerSuggestions(container, slotIndex, query) {
  container.innerHTML = '';
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return;
  const slot = budgetPlannerState.slots[slotIndex];
  if (slot?.name && normalizeText(slot.input) === normalizeText(slot.name)) return;
  const suggestions = allPokemon
    .filter((pokemon) => pokemon.name.toLowerCase().includes(trimmed))
    .sort((left, right) => left.num - right.num || left.sourceIndex - right.sourceIndex)
    .slice(0, 16);
  for (const pokemon of suggestions) {
    const state = isBudgetPlannerPokemonUnavailable(pokemon, slotIndex);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `suggestion-item budget-planner-suggestion ${state.unavailable ? 'is-invalid' : ''}`;
    button.disabled = state.unavailable;
    const costText = pokemon.cost === null ? '—' : String(pokemon.cost);
    button.textContent = `${pokemon.name} (${costText})${state.reason ? ` - ${state.reason}` : ''}`;
    button.addEventListener('click', () => {
      budgetPlannerState.slots[slotIndex].name = pokemon.name;
      budgetPlannerState.slots[slotIndex].input = pokemon.name;
      budgetPlannerState.slots[slotIndex].captainKind = null;
      budgetPlannerState.slots[slotIndex].captainType = '';
      container.innerHTML = '';
      setBudgetPlannerFeedback('');
      renderBudgetPlanner();
    });
    container.append(button);
  }
}

function renderBudgetPlannerCostsTable() {
  if (!budgetPlannerCostsTableWrap) return;
  budgetPlannerCostsTableWrap.innerHTML = '';
  const selected = getBudgetPlannerSelectedEntries();
  if (!selected.length) {
    renderEmptyDetailState(budgetPlannerCostsTableWrap, 'Select at least one Pokémon to see spent costs.');
    return;
  }
  const table = document.createElement('table');
  table.className = 'budget-planner-spend-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th>Pokémon</th>
        <th>Base</th>
        <th>Captain</th>
        <th>Total</th>
      </tr>
    </thead>
  `;
  const body = document.createElement('tbody');
  for (const entry of selected) {
    const row = document.createElement('tr');
    const baseCost = entry.pokemon.cost ?? 0;
    const extraCost = getBudgetPlannerCaptainCost(entry.slot.captainKind, entry.slot.captainType);
    const captainLabel = entry.slot.captainKind && entry.slot.captainType
      ? `${entry.slot.captainKind === 'z' ? 'Z' : 'Tera'} ${typeLabelsDe[entry.slot.captainType] ?? entry.slot.captainType} (+${extraCost})`
      : '—';
    row.innerHTML = `
      <td>${entry.pokemon.name}</td>
      <td>${baseCost}</td>
      <td>${captainLabel}</td>
      <td>${baseCost + extraCost}</td>
    `;
    body.append(row);
  }
  const footer = document.createElement('tfoot');
  footer.innerHTML = `
    <tr>
      <th colspan="3">Remaining</th>
      <th>${getBudgetPlannerRemainingBudget()} / ${getBudgetPlannerTotalBudget()}</th>
    </tr>
  `;
  table.append(body, footer);
  budgetPlannerCostsTableWrap.append(table);
}

function updateBudgetPlannerCaptainSelection(slotIndex, kind, checked) {
  const slot = budgetPlannerState.slots[slotIndex];
  if (!checked) {
    slot.captainKind = null;
    slot.captainType = '';
    setBudgetPlannerFeedback('');
    renderBudgetPlanner();
    return;
  }
  const usedKinds = getBudgetPlannerSelectedCaptainUsage(slotIndex);
  if (usedKinds[kind]) {
    setBudgetPlannerFeedback(`Only one ${kind === 'z' ? 'Z-Captain' : 'Tera-Captain'} can be assigned.`);
    return;
  }
  slot.captainKind = kind;
  slot.captainType = '';
  setBudgetPlannerFeedback('');
  renderBudgetPlanner();
}

function updateBudgetPlannerCaptainType(slotIndex, type) {
  const slot = budgetPlannerState.slots[slotIndex];
  const pokemon = getBudgetPlannerSlotPokemon(slotIndex);
  if (!slot || !pokemon) return;
  const nextExtra = getBudgetPlannerCaptainCost(slot.captainKind, type);
  const projected = getBudgetPlannerSpentBudget(slotIndex) + (pokemon.cost ?? 0) + nextExtra;
  if (projected > getBudgetPlannerTotalBudget()) {
    setBudgetPlannerFeedback('That captain type would exceed the budget.');
    return;
  }
  slot.captainType = type;
  setBudgetPlannerFeedback('');
  renderBudgetPlanner();
}

function renderBudgetPlannerSlotCard(slotIndex) {
  const slot = budgetPlannerState.slots[slotIndex];
  const pokemon = getBudgetPlannerSlotPokemon(slotIndex);
  const card = document.createElement('div');
  card.className = 'budget-planner-slot-card';
  const header = document.createElement('div');
  header.className = 'budget-planner-slot-header';
  const title = document.createElement('strong');
  title.textContent = `Pokémon ${slotIndex + 1}`;
  header.append(title);
  if (pokemon || slotIndex >= 10) {
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'budget-planner-slot-remove';
    remove.textContent = '×';
    remove.addEventListener('click', () => {
      if (slotIndex >= 10) {
        for (let index = slotIndex; index < budgetPlannerState.slots.length; index += 1) {
          clearBudgetPlannerSlot(index);
        }
        budgetPlannerState.activeSlots = Math.max(10, slotIndex);
      } else {
        clearBudgetPlannerSlot(slotIndex);
      }
      setBudgetPlannerFeedback('');
      renderBudgetPlanner();
    });
    header.append(remove);
  }
  const input = document.createElement('input');
  input.type = 'search';
  input.className = 'budget-planner-slot-input';
  input.placeholder = 'Search Pokémon';
  input.autocomplete = 'off';
  input.value = slot.input;
  const suggestions = document.createElement('div');
  suggestions.className = 'suggestion-list budget-planner-suggestions';
  input.addEventListener('input', () => {
    budgetPlannerState.slots[slotIndex].input = input.value;
    renderBudgetPlannerSuggestions(suggestions, slotIndex, input.value);
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') suggestions.innerHTML = '';
  });
  card.append(header, input, suggestions);
  if (pokemon) {
    const preview = document.createElement('div');
    preview.className = 'budget-planner-slot-preview';
    const sprite = document.createElement('img');
    sprite.src = pokemon.sprite;
    sprite.alt = `${pokemon.name} sprite`;
    sprite.loading = 'lazy';
    const body = document.createElement('div');
    body.className = 'budget-planner-slot-preview-body';
    const name = document.createElement('strong');
    name.textContent = pokemon.name;
    const cost = document.createElement('span');
    cost.textContent = `${getBudgetPlannerSlotTotalCost(slot)} Punkte`;
    body.append(name, cost);
    preview.append(sprite, body);
    card.append(preview);
    const flags = getPokemonFlags(pokemon);
    if (flags.z || flags.tera) {
      const captainWrap = document.createElement('div');
      captainWrap.className = 'budget-planner-captain-wrap';
      for (const config of [
        { kind: 'z', label: 'Z-Captain', enabled: flags.z },
        { kind: 'tera', label: 'Tera-Captain', enabled: flags.tera },
      ]) {
        if (!config.enabled) continue;
        const row = document.createElement('div');
        row.className = 'budget-planner-captain-row';
        const labelWrap = document.createElement('label');
        labelWrap.className = 'hide-filter';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = slot.captainKind === config.kind;
        checkbox.disabled = (slot.captainKind && slot.captainKind !== config.kind) || getBudgetPlannerSelectedCaptainUsage(slotIndex)[config.kind];
        checkbox.addEventListener('change', () => updateBudgetPlannerCaptainSelection(slotIndex, config.kind, checkbox.checked));
        labelWrap.append(checkbox, document.createTextNode(`${config.label}:`));
        row.append(labelWrap);
        if (slot.captainKind === config.kind) {
          const select = document.createElement('select');
          select.className = 'budget-planner-captain-select';
          const empty = document.createElement('option');
          empty.value = '';
          empty.textContent = 'Type';
          select.append(empty);
          for (const type of getBudgetPlannerCaptainTypes(config.kind)) {
            const option = document.createElement('option');
            option.value = type;
            const extraCost = getBudgetPlannerCaptainCost(config.kind, type);
            option.textContent = `${typeLabelsDe[type] ?? type} (+${extraCost})`;
            if (slot.captainType === type) option.selected = true;
            select.append(option);
          }
          select.addEventListener('change', () => updateBudgetPlannerCaptainType(slotIndex, select.value));
          row.append(select);
        }
        captainWrap.append(row);
      }
      card.append(captainWrap);
    }
  }
  renderBudgetPlannerSuggestions(suggestions, slotIndex, slot.input);
  return card;
}

function renderBudgetPlannerAddCard(slotIndex) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'budget-planner-add-card';
  card.innerHTML = '<span>+</span>';
  card.title = `Add Pokémon ${slotIndex + 1}`;
  card.addEventListener('click', () => {
    budgetPlannerState.activeSlots = slotIndex + 1;
    renderBudgetPlanner();
  });
  return card;
}

function renderBudgetPlannerSlots() {
  if (!budgetPlannerSlots) return;
  budgetPlannerSlots.innerHTML = '';
  for (let index = 0; index < budgetPlannerState.activeSlots; index += 1) {
    budgetPlannerSlots.append(renderBudgetPlannerSlotCard(index));
  }
  for (let index = budgetPlannerState.activeSlots; index < 12; index += 1) {
    budgetPlannerSlots.append(renderBudgetPlannerAddCard(index));
  }
}

function renderBudgetPlanner() {
  renderBudgetPlannerBudget();
  renderBudgetPlannerSlots();
  renderBudgetPlannerStars();
  renderBudgetPlannerTypeMatrix();
  renderBudgetPlannerStatMatrix();
  renderBudgetPlannerFeatureGrid();
  renderBudgetPlannerZoomGrid();
  renderBudgetPlannerCostsTable();
  if (budgetPlannerCaptainCostsText) budgetPlannerCaptainCostsText.textContent = buildBudgetPlannerCostText();
}

function openBudgetPlanner() {
  budgetPlannerFormat.value = budgetPlannerState.format;
  setBudgetPlannerFeedback('');
  renderBudgetPlanner();
  budgetPlannerModal.hidden = false;
}

function closeBudgetPlanner() {
  budgetPlannerModal.hidden = true;
}

function updateBudgetPlannerFormat(nextFormat) {
  budgetPlannerState.format = nextFormat;
  sanitizeBudgetPlannerState('Some selections were cleared because they do not fit the new format or budget.');
  renderBudgetPlanner();
}

function parseRuleCheckerItemsTs(text) {
  const tableMatch = text.match(/ItemDataTable\s*=\s*\{/);
  const start = tableMatch ? text.indexOf('{', tableMatch.index) : text.indexOf('{');
  if (start === -1) return { itemOptions: [], megaStoneByForm: new Map() };
  const itemOptions = [];
  const megaStoneByForm = new Map();
  let index = start + 1;
  while (index < text.length) {
    while (index < text.length && /[\s,]/.test(text[index])) index += 1;
    if (index >= text.length || text[index] === '}') break;
    const keyMatch = text.slice(index).match(/^(['"]?[^'":\n]+['"]?)\s*:\s*\{/);
    if (!keyMatch) break;
    const blockStart = index + keyMatch[0].length - 1;
    let depth = 0;
    let cursor = blockStart;
    for (; cursor < text.length; cursor += 1) {
      if (text[cursor] === '{') depth += 1;
      else if (text[cursor] === '}') {
        depth -= 1;
        if (depth === 0) {
          cursor += 1;
          break;
        }
      }
    }
    const block = text.slice(blockStart, cursor);
    const nameMatch = block.match(/\bname:\s*"([^"]+)"/);
    if (nameMatch?.[1]) itemOptions.push(nameMatch[1]);
    const megaMatch = block.match(/megaStone:\s*\{\s*"([^"]+)":\s*"([^"]+)"\s*\}/s);
    if (nameMatch?.[1] && megaMatch?.[2]) megaStoneByForm.set(megaMatch[2], nameMatch[1]);
    index = cursor;
  }
  return {
    itemOptions: [...new Set(itemOptions)].sort((left, right) => left.localeCompare(right)),
    megaStoneByForm,
  };
}

async function ensureRuleCheckerItemsLoaded() {
  if (ruleCheckerItemOptions.length) return;
  if (window.RULE_CHECKER_ITEMS?.itemOptions?.length) {
    ruleCheckerItemOptions = window.RULE_CHECKER_ITEMS.itemOptions;
    ruleCheckerMegaStoneByForm = new Map(Object.entries(window.RULE_CHECKER_ITEMS.megaStoneByForm ?? {}));
    return;
  }
  if (!ruleCheckerItemsPromise) {
    ruleCheckerItemsPromise = fetch('items.ts')
      .then((response) => {
        if (!response.ok) throw new Error('items.ts could not be loaded');
        return response.text();
      })
      .then((text) => {
        const parsed = parseRuleCheckerItemsTs(text);
        ruleCheckerItemOptions = parsed.itemOptions;
        ruleCheckerMegaStoneByForm = parsed.megaStoneByForm;
      })
      .catch(() => {
        ruleCheckerItemOptions = [];
        ruleCheckerMegaStoneByForm = new Map();
      });
  }
  await ruleCheckerItemsPromise;
}

function getRuleCheckerRosterPokemon() {
  return ruleCheckerState.rosterNames
    .map((name) => pokemonByName.get(name))
    .filter(Boolean);
}

function getRuleCheckerBattleSlotPokemon(slotIndex) {
  const name = ruleCheckerState.battleSlots[slotIndex]?.name;
  return name ? pokemonByName.get(name) ?? null : null;
}

function getRuleCheckerMegaStoneItem(pokemon) {
  if (!pokemon) return '';
  return ruleCheckerMegaStoneByForm.get(pokemon.name) ?? '';
}

function normalizeRuleCheckerBattleSlot(slotIndex) {
  const slot = ruleCheckerState.battleSlots[slotIndex];
  const pokemon = getRuleCheckerBattleSlotPokemon(slotIndex);
  if (!pokemon) {
    ruleCheckerState.battleSlots[slotIndex] = {
      name: '',
      teraActive: false,
      teraType: '',
      zActive: false,
      zType: '',
      item: '',
      ability: '',
      moves: ['', '', '', ''],
    };
    return;
  }
  const abilityNames = (pokemon.abilityDetails ?? []).map((ability) => ability.name).filter(Boolean);
  if (!abilityNames.includes(slot.ability)) slot.ability = abilityNames[0] ?? '';
  const moveNames = getPokemonMoveRows(pokemon).map((move) => move.name);
  slot.moves = (slot.moves ?? ['', '', '', '']).slice(0, 4).map((moveName) => (moveNames.includes(moveName) ? moveName : ''));
  while (slot.moves.length < 4) slot.moves.push('');
  const megaStone = getRuleCheckerMegaStoneItem(pokemon);
  if (megaStone) {
    slot.item = megaStone;
  } else if (slot.item && !ruleCheckerItemOptions.includes(slot.item)) {
    slot.item = '';
  }
  if (!slot.teraActive) slot.teraType = '';
  if (!slot.zActive) slot.zType = '';
}

function syncRuleCheckerBattleSlots() {
  const rosterNames = new Set(ruleCheckerState.rosterNames);
  for (let index = 0; index < ruleCheckerState.battleSlots.length; index += 1) {
    const slot = ruleCheckerState.battleSlots[index];
    if (slot.name && !rosterNames.has(slot.name)) slot.name = '';
    if (!slot.name) slot.name = ruleCheckerState.rosterNames[index] ?? '';
    normalizeRuleCheckerBattleSlot(index);
  }
}

function addRuleCheckerRosterPokemon(name) {
  if (!name || ruleCheckerState.rosterNames.includes(name) || ruleCheckerState.rosterNames.length >= 12) return;
  ruleCheckerState.rosterNames.push(name);
  syncRuleCheckerBattleSlots();
  resetRuleCheckerValidation();
  renderRuleChecker();
}

function removeRuleCheckerRosterPokemon(name) {
  ruleCheckerState.rosterNames = ruleCheckerState.rosterNames.filter((entry) => entry !== name);
  syncRuleCheckerBattleSlots();
  resetRuleCheckerValidation();
  renderRuleChecker();
}

function importRuleCheckerFromBudgetPlanner() {
  const names = getBudgetPlannerSelectedEntries().map((entry) => entry.pokemon.name).slice(0, 12);
  if (!names.length) return;
  ruleCheckerState.rosterNames = [...new Set(names)];
  ruleCheckerState.pickerInput = '';
  syncRuleCheckerBattleSlots();
  resetRuleCheckerValidation();
  renderRuleChecker();
}

function renderRuleCheckerPickerSuggestions() {
  if (!ruleCheckerPickerSuggestions) return;
  ruleCheckerPickerSuggestions.innerHTML = '';
  const trimmed = ruleCheckerState.pickerInput.trim().toLowerCase();
  if (!trimmed || ruleCheckerState.rosterNames.length >= 12) return;
  const suggestions = allPokemon
    .filter((pokemon) => pokemon.name.toLowerCase().includes(trimmed) && !ruleCheckerState.rosterNames.includes(pokemon.name))
    .sort((left, right) => left.num - right.num || left.sourceIndex - right.sourceIndex)
    .slice(0, 16);
  for (const pokemon of suggestions) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'suggestion-item';
    button.textContent = pokemon.name;
    button.addEventListener('click', () => {
      ruleCheckerState.pickerInput = '';
      if (ruleCheckerPickerInput) ruleCheckerPickerInput.value = '';
      ruleCheckerPickerSuggestions.innerHTML = '';
      addRuleCheckerRosterPokemon(pokemon.name);
    });
    ruleCheckerPickerSuggestions.append(button);
  }
}

function renderRuleCheckerRoster() {
  if (!ruleCheckerRoster) return;
  ruleCheckerRoster.innerHTML = '';
  const rosterPokemon = getRuleCheckerRosterPokemon();
  if (!rosterPokemon.length) return;
  for (const pokemon of rosterPokemon) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'rule-checker-roster-sprite';
    button.title = pokemon.name;
    const image = document.createElement('img');
    image.src = pokemon.sprite;
    image.alt = `${pokemon.name} sprite`;
    image.loading = 'lazy';
    const remove = document.createElement('span');
    remove.className = 'rule-checker-roster-remove';
    remove.textContent = '×';
    button.append(image, remove);
    button.addEventListener('click', () => removeRuleCheckerRosterPokemon(pokemon.name));
    ruleCheckerRoster.append(button);
  }
}

function resetRuleCheckerValidation() {
  ruleCheckerValidation = {
    violations: [],
    cardHighlights: new Set(),
    itemHighlights: new Set(),
    teraHighlights: new Set(),
    zHighlights: new Set(),
    abilityHighlights: new Map(),
    moveHighlights: new Map(),
  };
}

function addRuleCheckerAbilityHighlight(slotIndex, abilityName) {
  const existing = ruleCheckerValidation.abilityHighlights.get(slotIndex) ?? new Set();
  existing.add(abilityName);
  ruleCheckerValidation.abilityHighlights.set(slotIndex, existing);
}

function addRuleCheckerMoveHighlight(slotIndex, moveIndex) {
  const existing = ruleCheckerValidation.moveHighlights.get(slotIndex) ?? new Set();
  existing.add(moveIndex);
  ruleCheckerValidation.moveHighlights.set(slotIndex, existing);
}

function addRuleCheckerViolation(message, options = {}) {
  ruleCheckerValidation.violations.push({ message });
  for (const slotIndex of options.cardSlots ?? []) ruleCheckerValidation.cardHighlights.add(slotIndex);
  for (const slotIndex of options.itemSlots ?? []) ruleCheckerValidation.itemHighlights.add(slotIndex);
  for (const slotIndex of options.teraSlots ?? []) ruleCheckerValidation.teraHighlights.add(slotIndex);
  for (const slotIndex of options.zSlots ?? []) ruleCheckerValidation.zHighlights.add(slotIndex);
  for (const [slotIndex, abilityName] of options.abilitySlots ?? []) addRuleCheckerAbilityHighlight(slotIndex, abilityName);
  for (const [slotIndex, moveIndex] of options.moveSlots ?? []) addRuleCheckerMoveHighlight(slotIndex, moveIndex);
}

function detectRuleCheckerClause(message) {
  if (message.includes('Low-Power Drafts')) return 'Low-Power Format';
  if (message.includes('Uber Tier')) return 'Normal Format';
  if (message.includes('Tera-Captain')) return 'Tera-Clause';
  if (message.includes('Z-Captain') || message.includes('kein Z-Captain')) return 'Z-Clause';
  if (message.includes('Kraftreserve') || message.includes('Tera-Ausbruch')) return 'Kraftreserve-Clause';
  if (message.includes('Mega-Pokémon')) return 'Mega-Clause';
  if (message.includes('Vergangenheits-Paradox') || message.includes('Zukunfts-Paradox') || message.includes('Energiekapseln')) return 'Paradox-Clause';
  if (message.includes('Genauigkeits-senkende')) return 'Genauigkeits-Clause';
  if (message.includes('Fluchtwert-erhöhende')) return 'Fluchtwert-Clause';
  if (message.includes('Edelmut')) return 'Edelmut-Clause';
  if (message.includes('Absichtliche Paralyse')) return 'Paralyse-Clause';
  if (message.includes('Delegator')) return 'Delegator-Clause';
  if (message.includes('King-Stein')) return 'King-Stein Clause';
  if (message.includes('One-Hit KO')) return 'OHKO-Clause';
  if (message.includes('garantierte Verwirrung')) return 'Verwirrungs-Clause';
  if (message.includes('Spezies Klausel')) return 'Spezies-Clause';
  if (message.includes('dasselbe Item')) return 'Item Clause';
  if (message.includes('Rage Fist') || message.includes('Shell Smash') || message.includes('Dire Claw') || message.includes('Last Respects')) return 'Move-Clausel';
  return 'Regelverstoß';
}

function getRuleCheckerActiveEntries() {
  return ruleCheckerState.battleSlots
    .map((slot, slotIndex) => {
      if (!slot.name) return null;
      const pokemon = getRuleCheckerBattleSlotPokemon(slotIndex);
      if (!pokemon) return null;
      return {
        slotIndex,
        slot,
        pokemon,
        selectedMoves: slot.moves
          .map((moveName, moveIndex) => {
            if (!moveName) return null;
            const move = getPokemonMoveRows(pokemon).find((entry) => entry.name === moveName);
            return move ? { ...move, moveIndex } : null;
          })
          .filter(Boolean),
      };
    })
    .filter(Boolean);
}

function getRuleCheckerUberTierLabel(cost) {
  if (cost >= 32) return 'Platin';
  if (cost >= 30) return 'Smaragd';
  if (cost >= 26) return 'Gold';
  if (cost >= 24) return 'Silber';
  if (cost >= 22) return 'Bronze';
  return 'Uber';
}

function isRuleCheckerZItem(itemName, megaStoneName) {
  if (!itemName) return false;
  if (megaStoneName && itemName === megaStoneName) return false;
  return /\sZ$/.test(itemName);
}

function runRuleCheckerValidation() {
  resetRuleCheckerValidation();
  const entries = getRuleCheckerActiveEntries();
  const teraEntries = entries.filter((entry) => entry.slot.teraActive);
  const zEntries = entries.filter((entry) => entry.slot.zActive);
  const megaEntries = entries.filter((entry) => getPokemonFlags(entry.pokemon).mega);

  if (ruleCheckerState.format === 'low-power') {
    for (const entry of entries) {
      if ((entry.pokemon.cost ?? 0) > 15) {
        addRuleCheckerViolation(`${entry.pokemon.name} ist zu teuer für Low-Power Drafts!`, {
          cardSlots: [entry.slotIndex],
        });
      }
    }
  }

  if (ruleCheckerState.format === 'normal') {
    for (const entry of entries) {
      if ((entry.pokemon.cost ?? 0) > 20) {
        addRuleCheckerViolation(`${entry.pokemon.name} ist im ${getRuleCheckerUberTierLabel(entry.pokemon.cost ?? 0)} Uber Tier!`, {
          cardSlots: [entry.slotIndex],
        });
      }
    }
  }

  for (const entry of teraEntries) {
    if ((entry.pokemon.cost ?? 0) > 5) {
      addRuleCheckerViolation(`${entry.pokemon.name} kostet ${entry.pokemon.cost} Punkte und darf kein Tera-Captain sein!`, {
        cardSlots: [entry.slotIndex],
        teraSlots: [entry.slotIndex],
      });
    }
  }
  if (teraEntries.length > 1) {
    addRuleCheckerViolation(`Jedes Team darf nur einen Tera-Captain haben! Du hast ${teraEntries[0].pokemon.name} und ${teraEntries[1].pokemon.name}.`, {
      cardSlots: teraEntries.map((entry) => entry.slotIndex),
      teraSlots: teraEntries.map((entry) => entry.slotIndex),
    });
  }

  for (const entry of zEntries) {
    if ((entry.pokemon.cost ?? 0) > 10) {
      addRuleCheckerViolation(`${entry.pokemon.name} kostet ${entry.pokemon.cost} Punkte und darf kein Z-Captain sein!`, {
        cardSlots: [entry.slotIndex],
        zSlots: [entry.slotIndex],
      });
    }
  }
  for (const entry of entries) {
    const megaStone = getRuleCheckerMegaStoneItem(entry.pokemon);
    if (!entry.slot.zActive && isRuleCheckerZItem(entry.slot.item, megaStone)) {
      addRuleCheckerViolation(`${entry.pokemon.name} ist kein Z-Captain und darf ${entry.slot.item} nicht halten!`, {
        cardSlots: [entry.slotIndex],
        itemSlots: [entry.slotIndex],
      });
    }
  }
  if (zEntries.length > 1) {
    addRuleCheckerViolation(`Jedes Team darf nur einen Z-Captain haben! Du hast ${zEntries[0].pokemon.name} und ${zEntries[1].pokemon.name}.`, {
      cardSlots: zEntries.map((entry) => entry.slotIndex),
      zSlots: zEntries.map((entry) => entry.slotIndex),
    });
  }

  for (const entry of entries) {
    const hiddenPowerMove = entry.selectedMoves.find((move) => move.id === 'hiddenpower');
    const teraBlastMove = entry.selectedMoves.find((move) => move.id === 'terablast');
    const rageFistMove = entry.selectedMoves.find((move) => move.id === 'ragefist');
    if (hiddenPowerMove && (entry.pokemon.cost ?? 0) > 5) {
      addRuleCheckerViolation(`Nur Pokémon bis 5 Punkten dürfen Kraftreserve nutzen. ${entry.pokemon.name} kostet ${entry.pokemon.cost} Punkte.`, {
        cardSlots: [entry.slotIndex],
        moveSlots: [[entry.slotIndex, hiddenPowerMove.moveIndex]],
      });
    }
    if (entry.slot.teraActive && hiddenPowerMove && teraBlastMove) {
      addRuleCheckerViolation(`Tera-Captains dürfen Kraftreserve oder Tera-Ausbruch haben, ${entry.pokemon.name} hat beides!`, {
        cardSlots: [entry.slotIndex],
        teraSlots: [entry.slotIndex],
        moveSlots: [[entry.slotIndex, hiddenPowerMove.moveIndex], [entry.slotIndex, teraBlastMove.moveIndex]],
      });
    }
    if (rageFistMove && !pokemonHasTag(entry.pokemon, 'ragefist')) {
      addRuleCheckerViolation('Nur die Uber Version von Annihilape darf Rage Fist haben.', {
        cardSlots: [entry.slotIndex],
        moveSlots: [[entry.slotIndex, rageFistMove.moveIndex]],
      });
    }
  }

  if (megaEntries.length > 1) {
    addRuleCheckerViolation(`Jedes Team darf nur ein Mega-Pokémon haben. Du hast ${megaEntries[0].pokemon.name} und ${megaEntries[1].pokemon.name}.`, {
      cardSlots: megaEntries.map((entry) => entry.slotIndex),
      itemSlots: megaEntries.map((entry) => entry.slotIndex),
    });
  }

  const droughtEntries = entries.filter((entry) => entry.slot.ability === 'Drought');
  const protoEntries = entries.filter((entry) => entry.slot.ability === 'Protosynthesis');
  if (droughtEntries.length && protoEntries.length) {
    for (const protoEntry of protoEntries) {
      for (const droughtEntry of droughtEntries) {
        addRuleCheckerViolation(`Vergangenheits-Paradox darf nicht mit Dürre kombiniert werden! ${protoEntry.pokemon.name} hat Paläosynthese und ${droughtEntry.pokemon.name} hat Dürre. Sonnentag wäre okay.`, {
          cardSlots: [protoEntry.slotIndex, droughtEntry.slotIndex],
          abilitySlots: [[protoEntry.slotIndex, 'Protosynthesis'], [droughtEntry.slotIndex, 'Drought']],
        });
      }
    }
  }
  const surgeEntries = entries.filter((entry) => entry.slot.ability === 'Electric Surge');
  const quarkEntries = entries.filter((entry) => entry.slot.ability === 'Quark Drive');
  if (surgeEntries.length && quarkEntries.length) {
    for (const quarkEntry of quarkEntries) {
      for (const surgeEntry of surgeEntries) {
        addRuleCheckerViolation(`Zukunfts-Paradox darf nicht mit Elektro-Erzeuger kombiniert werden! ${quarkEntry.pokemon.name} hat Quantenantrieb und ${surgeEntry.pokemon.name} Elektro-Erzeuger. Elektro-Feld als Attacke wäre okay.`, {
          cardSlots: [quarkEntry.slotIndex, surgeEntry.slotIndex],
          abilitySlots: [[quarkEntry.slotIndex, 'Quark Drive'], [surgeEntry.slotIndex, 'Electric Surge']],
        });
      }
    }
  }
  for (const entry of entries) {
    if (entry.slot.item === 'Booster Energy' && !getPokemonFlags(entry.pokemon).booster) {
      addRuleCheckerViolation('Nur Paradox-Pokémon mit 15 oder weniger Kosten dürfen Energiekapseln tragen!', {
        cardSlots: [entry.slotIndex],
        itemSlots: [entry.slotIndex],
      });
    }
  }

  for (const entry of entries) {
    if (entry.slot.item === 'Bright Powder') {
      addRuleCheckerViolation(`Genauigkeits-senkende Attacken sind nicht erlaubt! ${entry.pokemon.name} hat Bright Powder.`, {
        cardSlots: [entry.slotIndex],
        itemSlots: [entry.slotIndex],
      });
    }
    const abilityRuleInfo = getAbilityRuleInfo(entry.slot.ability, entry.pokemon);
    if (abilityRuleInfo?.text.includes('Genauigkeits-Clause')) {
      addRuleCheckerViolation(`Genauigkeits-senkende Attacken sind nicht erlaubt! ${entry.pokemon.name} hat ${entry.slot.ability}.`, {
        cardSlots: [entry.slotIndex],
        abilitySlots: [[entry.slotIndex, entry.slot.ability]],
      });
    }
    if (abilityRuleInfo?.text.includes('Fluchtwerts-Clause')) {
      addRuleCheckerViolation(`Fluchtwert-erhöhende Attacken/Fähigkeiten sind nicht erlaubt! ${entry.pokemon.name} hat ${entry.slot.ability}.`, {
        cardSlots: [entry.slotIndex],
        abilitySlots: [[entry.slotIndex, entry.slot.ability]],
      });
    }
    if (abilityRuleInfo?.text.includes('Paralyse-Clause')) {
      addRuleCheckerViolation(`Absichtliche Paralyse ist nicht erlaubt. Wähle eine andere Fähigkeit als Statik auf ${entry.pokemon.name}.`, {
        cardSlots: [entry.slotIndex],
        abilitySlots: [[entry.slotIndex, entry.slot.ability]],
      });
    }
    if (entry.pokemon.name === 'Blaziken' && entry.slot.ability === 'Speed Boost') {
      addRuleCheckerViolation('Speed Boost ist nur auf der 19-Punkte-Version von Blaziken erlaubt.', {
        cardSlots: [entry.slotIndex],
        abilitySlots: [[entry.slotIndex, entry.slot.ability]],
      });
    }
    for (const move of entry.selectedMoves) {
      const ruleInfo = getMoveRuleInfo(move.id, entry.pokemon);
      if (ruleInfo?.text.includes('Genauigkeits-Clause')) {
        addRuleCheckerViolation(`Genauigkeits-senkende Attacken sind nicht erlaubt! ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      }
      if (ruleInfo?.text.includes('Fluchtwerts-Clause')) {
        addRuleCheckerViolation(`Fluchtwert-erhöhende Attacken/Fähigkeiten sind nicht erlaubt! ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      }
      if (move.id === 'guillotine') {
        addRuleCheckerViolation(`One-Hit KO Attacken sind nicht erlaubt. ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      } else if (['horndrill', 'fissure', 'sheercold'].includes(move.id)) {
        addRuleCheckerViolation(`One-Hit KO Attacken sind nicht erlaubt. ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      }
      if (ruleInfo?.text.includes('Paralyse-Clause')) {
        addRuleCheckerViolation(`Absichtliche Paralyse ist nicht erlaubt. ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      }
      if (ruleInfo?.text.includes('Verwirrungs-Clause')) {
        addRuleCheckerViolation(`Ein Pokémon darf keine Attacke haben, die garantierte Verwirrung verursacht. ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      }
      if (move.id === 'shellsmash' && !shellSmashAllowedPokemon.has(entry.pokemon.name)) {
        addRuleCheckerViolation(`Shell Smash ist nur auf ausgewählten Pokémon erlaubt. ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      }
      if (move.id === 'direclaw') {
        addRuleCheckerViolation(`Dire Claw ist nicht erlaubt. ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      }
      if (move.id === 'lastrespects') {
        addRuleCheckerViolation(`Last Respects ist nicht erlaubt. ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      }
    }
  }

  for (const entry of entries) {
    if (entry.slot.ability === 'Serene Grace') {
      for (const move of entry.selectedMoves) {
        if (sereneGraceFlinchMoves.has(move.id)) {
          addRuleCheckerViolation(`Edelmut ist in Kombination mit zurückschreckenden oder verwirrenden Attacken mit 20%+ Chance nicht erlaubt. ${entry.pokemon.name} hat Edelmut und ${move.name}.`, {
            cardSlots: [entry.slotIndex],
            abilitySlots: [[entry.slotIndex, 'Serene Grace']],
            moveSlots: [[entry.slotIndex, move.moveIndex]],
          });
        }
      }
    }
  }

  for (const entry of entries) {
    const substituteMove = entry.selectedMoves.find((move) => move.id === 'substitute');
    if (!substituteMove) continue;
    const moveIds = new Set(entry.selectedMoves.map((move) => move.id));
    const abilityId = normalizeText(entry.slot.ability);
    const healingMove = entry.selectedMoves.find((move) => ruleCheckerDelegatorHealingMoves.has(move.id));
    if (ruleCheckerDelegatorHealingAbilities.has(abilityId)) {
      addRuleCheckerViolation(`Delegator darf nicht mit garantierter Heilung kombiniert werden. ${entry.pokemon.name} hat Delegator und ${entry.slot.ability}.`, {
        cardSlots: [entry.slotIndex],
        abilitySlots: [[entry.slotIndex, entry.slot.ability]],
        moveSlots: [[entry.slotIndex, substituteMove.moveIndex]],
      });
    }
    if (healingMove) {
      addRuleCheckerViolation(`Delegator darf nicht mit garantierter Heilung kombiniert werden. ${entry.pokemon.name} hat Delegator und ${healingMove.name}.`, {
        cardSlots: [entry.slotIndex],
        moveSlots: [[entry.slotIndex, substituteMove.moveIndex], [entry.slotIndex, healingMove.moveIndex]],
      });
    }
    if (entry.slot.ability === 'Prankster') {
      addRuleCheckerViolation(`Delegator darf nicht mit Strolch gespielt werden! ${entry.pokemon.name} hat Delegator und Strolch.`, {
        cardSlots: [entry.slotIndex],
        abilitySlots: [[entry.slotIndex, 'Prankster']],
        moveSlots: [[entry.slotIndex, substituteMove.moveIndex]],
      });
    }
    for (const move of entry.selectedMoves) {
      if (move.id === 'curse') {
        const hasGhostType = (entry.pokemon.types ?? []).includes('Ghost') || (entry.slot.teraActive && entry.slot.teraType === 'Ghost');
        if (!hasGhostType) {
          addRuleCheckerViolation(`Delegator darf nicht mit Set-Up kombiniert werden ${entry.pokemon.name} hat ${move.name}.`, {
            cardSlots: [entry.slotIndex],
            moveSlots: [[entry.slotIndex, substituteMove.moveIndex], [entry.slotIndex, move.moveIndex]],
          });
        }
      } else if (ruleCheckerDelegatorSetupMoves.has(move.id)) {
        addRuleCheckerViolation(`Delegator darf nicht mit Set-Up kombiniert werden ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, substituteMove.moveIndex], [entry.slotIndex, move.moveIndex]],
        });
      }
    }
    if (ruleCheckerDelegatorSetupAbilities.has(abilityId)) {
      addRuleCheckerViolation(`Delegator darf nicht mit Set-Up kombiniert werden ${entry.pokemon.name} hat ${entry.slot.ability}.`, {
        cardSlots: [entry.slotIndex],
        abilitySlots: [[entry.slotIndex, entry.slot.ability]],
        moveSlots: [[entry.slotIndex, substituteMove.moveIndex]],
      });
    }
  }

  for (const entry of entries) {
    if (entry.slot.item !== 'King\'s Rock') continue;
    if (entry.slot.ability === 'Serene Grace') {
      addRuleCheckerViolation(`King-Stein ist mit Edelmut nicht erlaubt. ${entry.pokemon.name} hat beides.`, {
        cardSlots: [entry.slotIndex],
        itemSlots: [entry.slotIndex],
        abilitySlots: [[entry.slotIndex, 'Serene Grace']],
      });
    }
    for (const move of entry.selectedMoves) {
      if (ruleCheckerKingsRockParalysisMoves.has(move.id)) {
        addRuleCheckerViolation(`King-Stein ist nicht mit Attacken erlaubt, die Paralyse verursachen können. ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          itemSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      }
      if (ruleCheckerKingsRockMultiHitMoves.has(move.id)) {
        addRuleCheckerViolation(`King-Stein ist nicht mit Multi-Hit Attacken erlaubt. ${entry.pokemon.name} hat ${move.name}.`, {
          cardSlots: [entry.slotIndex],
          itemSlots: [entry.slotIndex],
          moveSlots: [[entry.slotIndex, move.moveIndex]],
        });
      }
    }
  }

  for (let index = 0; index < entries.length; index += 1) {
    for (let otherIndex = index + 1; otherIndex < entries.length; otherIndex += 1) {
      const left = entries[index];
      const right = entries[otherIndex];
      if (!left.slot.item || !right.slot.item) continue;
      if (left.slot.item !== right.slot.item) continue;
      addRuleCheckerViolation(`Jedes Item darf nur einmal vergeben werden. ${left.pokemon.name} und ${right.pokemon.name} haben dasselbe Item!`, {
        cardSlots: [left.slotIndex, right.slotIndex],
        itemSlots: [left.slotIndex, right.slotIndex],
      });
    }
  }

  for (let index = 0; index < entries.length; index += 1) {
    for (let otherIndex = index + 1; otherIndex < entries.length; otherIndex += 1) {
      const left = entries[index];
      const right = entries[otherIndex];
      if (left.pokemon.num !== right.pokemon.num) continue;
      const sameStats = JSON.stringify(left.pokemon.baseStats ?? {}) === JSON.stringify(right.pokemon.baseStats ?? {});
      const sameTypes = JSON.stringify(left.pokemon.types ?? []) === JSON.stringify(right.pokemon.types ?? []);
      if (sameStats && sameTypes) {
        addRuleCheckerViolation(`Spezies Klausel! ${left.pokemon.name} und ${right.pokemon.name} zählen als dasselbe Pokémon, da sie dieselben Werte und Typen, sowie Dex Nr. haben.`, {
          cardSlots: [left.slotIndex, right.slotIndex],
        });
      }
    }
  }
}

function renderRuleCheckerResults() {
  if (!ruleCheckerResults || !ruleCheckerResultsSection) return;
  ruleCheckerResults.innerHTML = '';
  ruleCheckerResultsSection.hidden = !ruleCheckerValidation.violations.length;
  if (!ruleCheckerValidation.violations.length) return;
  const grouped = new Map();
  for (const violation of ruleCheckerValidation.violations) {
    const clause = detectRuleCheckerClause(violation.message);
    if (!grouped.has(clause)) grouped.set(clause, []);
    grouped.get(clause).push(violation.message);
  }
  for (const [clause, messages] of grouped.entries()) {
    const group = document.createElement('section');
    group.className = 'rule-checker-result-group';
    const heading = document.createElement('h4');
    heading.className = 'rule-checker-result-heading';
    heading.textContent = clause;
    group.append(heading);
    for (const message of messages) {
      const item = document.createElement('div');
      item.className = 'rule-checker-result-item';
      if (message.includes('guillotine')) {
        item.innerHTML = `${message} <span class="rule-checker-french-flag" aria-hidden="true"></span>`;
      } else {
        item.textContent = message;
      }
      group.append(item);
    }
    ruleCheckerResults.append(group);
  }
}

function renderRuleCheckerAbilityRow(slotIndex, pokemon) {
  const wrap = document.createElement('div');
  wrap.className = 'rule-checker-ability-row';
  const highlightedAbilities = ruleCheckerValidation.abilityHighlights.get(slotIndex) ?? new Set();
  for (const ability of pokemon.abilityDetails ?? []) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `rule-checker-ability-chip${ruleCheckerState.battleSlots[slotIndex].ability === ability.name ? ' is-selected' : ''}`;
    if (highlightedAbilities.has(ability.name)) button.classList.add('is-illegal');
    button.textContent = ability.name;
    button.addEventListener('click', () => {
      ruleCheckerState.battleSlots[slotIndex].ability = ability.name;
      resetRuleCheckerValidation();
      renderRuleChecker();
    });
    wrap.append(button);
  }
  return wrap;
}

function renderRuleCheckerCard(slotIndex) {
  const slot = ruleCheckerState.battleSlots[slotIndex];
  const pokemon = getRuleCheckerBattleSlotPokemon(slotIndex);
  const card = document.createElement('article');
  card.className = 'rule-checker-card pokemon-card';
  if (ruleCheckerValidation.cardHighlights.has(slotIndex)) card.classList.add('is-illegal');
  const surface = document.createElement('div');
  surface.className = 'card-surface-effect';
  const border = document.createElement('div');
  border.className = 'card-border-effect';
  card.append(surface, border);

  const pickerRow = document.createElement('div');
  pickerRow.className = 'rule-checker-card-picker';
  const title = document.createElement('strong');
  title.textContent = `Slot ${slotIndex + 1}`;
  const select = document.createElement('select');
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = 'Choose Pokémon';
  select.append(emptyOption);
  for (const rosterPokemon of getRuleCheckerRosterPokemon()) {
    const option = document.createElement('option');
    option.value = rosterPokemon.name;
    option.textContent = rosterPokemon.name;
    if (slot.name === rosterPokemon.name) option.selected = true;
    select.append(option);
  }
  select.addEventListener('change', () => {
    ruleCheckerState.battleSlots[slotIndex].name = select.value;
    normalizeRuleCheckerBattleSlot(slotIndex);
    resetRuleCheckerValidation();
    renderRuleChecker();
  });
  pickerRow.append(title, select);
  card.append(pickerRow);

  if (!pokemon) {
    const empty = document.createElement('div');
    empty.className = 'rule-checker-card-empty';
    empty.textContent = 'Select a Pokémon from the pool above.';
    card.append(empty);
    return card;
  }

  const header = document.createElement('div');
  header.className = 'rule-checker-card-header';
  const sprite = document.createElement('img');
  sprite.className = 'rule-checker-card-sprite';
  sprite.src = pokemon.sprite;
  sprite.alt = `${pokemon.name} sprite`;
  sprite.loading = 'lazy';
  const meta = document.createElement('div');
  meta.className = 'rule-checker-card-meta';
  const name = document.createElement('h4');
  name.textContent = pokemon.name;
  const typeList = document.createElement('div');
  typeList.className = 'type-list';
  for (const type of pokemon.types ?? []) {
    const pill = document.createElement('span');
    pill.className = `type-pill type-${normalizeText(type)}`;
    pill.textContent = type;
    typeList.append(pill);
  }
  const iconRow = document.createElement('div');
  iconRow.className = 'rule-checker-icon-row';
  for (const config of [
    { key: 'teraActive', typeKey: 'teraType', icon: teraIconPath, alt: 'Tera toggle' },
    { key: 'zActive', typeKey: 'zType', icon: zIconPath, alt: 'Z toggle' },
  ]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `rule-checker-icon-toggle${slot[config.key] ? ' is-active' : ''}`;
    if ((config.key === 'teraActive' ? ruleCheckerValidation.teraHighlights : ruleCheckerValidation.zHighlights).has(slotIndex)) {
      button.classList.add('is-illegal');
    }
    const icon = document.createElement('img');
    icon.src = config.icon;
    icon.alt = config.alt;
    button.append(icon);
    button.addEventListener('click', () => {
      slot[config.key] = !slot[config.key];
      if (!slot[config.key]) slot[config.typeKey] = '';
      resetRuleCheckerValidation();
      renderRuleChecker();
    });
    iconRow.append(button);
  }
  meta.append(name, typeList, iconRow);
  header.append(sprite, meta);
  card.append(header);

  if (slot.teraActive || slot.zActive) {
    const typeToggleRow = document.createElement('div');
    typeToggleRow.className = 'rule-checker-type-toggle-row';
    if (slot.teraActive) {
      const teraSelect = document.createElement('select');
      const empty = document.createElement('option');
      empty.value = '';
      empty.textContent = 'Tera Type';
      teraSelect.append(empty);
      for (const type of [...battleTypes, 'Stellar']) {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = typeLabelsDe[type] ?? type;
        if (slot.teraType === type) option.selected = true;
        teraSelect.append(option);
      }
      teraSelect.addEventListener('change', () => {
        slot.teraType = teraSelect.value;
        resetRuleCheckerValidation();
        renderRuleChecker();
      });
      typeToggleRow.append(teraSelect);
    }
    if (slot.zActive) {
      const zSelect = document.createElement('select');
      const empty = document.createElement('option');
      empty.value = '';
      empty.textContent = 'Z Type';
      zSelect.append(empty);
      for (const type of battleTypes) {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = typeLabelsDe[type] ?? type;
        if (slot.zType === type) option.selected = true;
        zSelect.append(option);
      }
      zSelect.addEventListener('change', () => {
        slot.zType = zSelect.value;
        resetRuleCheckerValidation();
        renderRuleChecker();
      });
      typeToggleRow.append(zSelect);
    }
    card.append(typeToggleRow);
  }

  const itemField = document.createElement('label');
  itemField.className = 'details-field rule-checker-field';
  if (ruleCheckerValidation.itemHighlights.has(slotIndex)) itemField.classList.add('is-illegal');
  const itemLabel = document.createElement('span');
  itemLabel.textContent = 'Item';
  const itemSelect = document.createElement('select');
  const emptyItem = document.createElement('option');
  emptyItem.value = '';
  emptyItem.textContent = 'No item';
  itemSelect.append(emptyItem);
  for (const itemName of ruleCheckerItemOptions) {
    const option = document.createElement('option');
    option.value = itemName;
    option.textContent = itemName;
    if (slot.item === itemName) option.selected = true;
    itemSelect.append(option);
  }
  const megaStone = getRuleCheckerMegaStoneItem(pokemon);
  if (megaStone) {
    itemSelect.value = megaStone;
    itemSelect.disabled = true;
  } else {
    itemSelect.addEventListener('change', () => {
      slot.item = itemSelect.value;
      resetRuleCheckerValidation();
      renderRuleChecker();
    });
  }
  itemField.append(itemLabel, itemSelect);
  card.append(itemField);

  const abilityField = document.createElement('div');
  abilityField.className = 'rule-checker-field';
  const abilityLabel = document.createElement('span');
  abilityLabel.className = 'rule-checker-field-label';
  abilityLabel.textContent = 'Ability';
  abilityField.append(abilityLabel, renderRuleCheckerAbilityRow(slotIndex, pokemon));
  card.append(abilityField);

  const moveField = document.createElement('div');
  moveField.className = 'rule-checker-field';
  const moveLabel = document.createElement('span');
  moveLabel.className = 'rule-checker-field-label';
  moveLabel.textContent = 'Moves';
  const moveGrid = document.createElement('div');
  moveGrid.className = 'rule-checker-move-grid';
  const moveRows = getPokemonMoveRows(pokemon);
  for (let moveIndex = 0; moveIndex < 4; moveIndex += 1) {
    const moveInput = document.createElement('input');
    moveInput.type = 'search';
    moveInput.className = 'rule-checker-move-input';
    moveInput.placeholder = `Move ${moveIndex + 1}`;
    moveInput.value = slot.moves[moveIndex] ?? '';
    if ((ruleCheckerValidation.moveHighlights.get(slotIndex) ?? new Set()).has(moveIndex)) moveInput.classList.add('is-illegal');
    const listId = `rule-checker-moves-${slotIndex}-${moveIndex}`;
    moveInput.setAttribute('list', listId);
    const moveList = document.createElement('datalist');
    moveList.id = listId;
    for (const move of moveRows) {
      const option = document.createElement('option');
      option.value = move.name;
      moveList.append(option);
    }
    moveInput.addEventListener('change', () => {
      const exactMatch = moveRows.find((move) => move.name === moveInput.value);
      slot.moves[moveIndex] = exactMatch ? exactMatch.name : moveInput.value;
      resetRuleCheckerValidation();
      renderRuleChecker();
    });
    moveGrid.append(moveInput, moveList);
  }
  moveField.append(moveLabel, moveGrid);
  card.append(moveField);
  return card;
}

function renderRuleCheckerTeamGrid() {
  if (!ruleCheckerTeamGrid) return;
  ruleCheckerTeamGrid.innerHTML = '';
  for (let index = 0; index < 6; index += 1) {
    ruleCheckerTeamGrid.append(renderRuleCheckerCard(index));
  }
}

function renderRuleChecker() {
  if (ruleCheckerPickerInput) ruleCheckerPickerInput.value = ruleCheckerState.pickerInput;
  renderRuleCheckerPickerSuggestions();
  renderRuleCheckerRoster();
  renderRuleCheckerTeamGrid();
  renderRuleCheckerResults();
}

async function openRuleChecker() {
  await ensureRuleCheckerItemsLoaded();
  if (ruleCheckerFormat) ruleCheckerFormat.value = ruleCheckerState.format;
  syncRuleCheckerBattleSlots();
  renderRuleChecker();
  if (ruleCheckerModal) ruleCheckerModal.hidden = false;
}

function closeRuleChecker() {
  if (ruleCheckerModal) ruleCheckerModal.hidden = true;
}

function formatSpeedTierStage(stage) {
  if (!stage) return '+/-0';
  return stage > 0 ? `+${stage}` : String(stage);
}

function cycleSpeedTierStage(stage, direction) {
  if (direction === 'up') return stage >= 6 ? -6 : stage + 1;
  return stage <= -6 ? 6 : stage - 1;
}

function getSpeedTierEntries() {
  return speedTiersState.entries
    .map((entry) => {
      const pokemon = pokemonByName.get(entry.name);
      if (!pokemon) return null;
      entry.pokemon = pokemon;
      return entry;
    })
    .filter(Boolean);
}

function getSpeedTierVariantsForPokemon(pokemon, entryOptions = {}) {
  const baseSpeed = pokemon.baseStats?.spe ?? 0;
  const weatherBonus = getSpeedTierWeatherBonus(pokemon, speedTiersState.options.weather);
  const stages = entryOptions.showAllStages ? [0, 1, 2, 3, 4, 5, 6] : [entryOptions.stage ?? 0];
  const variants = [
    { label: `${pokemon.name} -Speed 0IV 0EV`, iv: 0, ev: 0, nature: 0.9, multiplier: 1, supportsWeather: false },
    { label: `${pokemon.name} neutral 31IV 0EV`, iv: 31, ev: 0, nature: 1, multiplier: 1, supportsWeather: true },
    { label: `${pokemon.name} +Speed 31IV 252EV`, iv: 31, ev: 252, nature: 1.1, multiplier: 1, supportsWeather: true },
  ];
  if (speedTiersState.options.scarf) {
    variants.push(
      { label: `${pokemon.name} neutral 31IV 0EV Scarf`, iv: 31, ev: 0, nature: 1, multiplier: 1.5, supportsWeather: true },
      { label: `${pokemon.name} +Speed 31IV 252EV Scarf`, iv: 31, ev: 252, nature: 1.1, multiplier: 1.5, supportsWeather: true },
    );
  }
  if (speedTiersState.options.tailwind) {
    variants.push(
      { label: `${pokemon.name} neutral 31IV 0EV Tailw`, iv: 31, ev: 0, nature: 1, multiplier: 2, supportsWeather: true },
      { label: `${pokemon.name} +Speed 31IV 252EV Tailw`, iv: 31, ev: 252, nature: 1.1, multiplier: 2, supportsWeather: true },
    );
  }
  if (speedTiersState.options.scarf && speedTiersState.options.tailwind) {
    variants.push(
      { label: `${pokemon.name} neutral 31IV 0EV Tailw+Scarf`, iv: 31, ev: 0, nature: 1, multiplier: 2.5, supportsWeather: true },
      { label: `${pokemon.name} positive 31IV 252EV Tailw+Scarf`, iv: 31, ev: 252, nature: 1.1, multiplier: 2.5, supportsWeather: true },
    );
  }

  const rows = [];
  for (const stage of stages) {
    for (const variant of variants) {
      const suffix = stage ? ` ${stage > 0 ? `+${stage}` : stage}` : '';
      rows.push({
        pokemonName: pokemon.name,
        label: `${variant.label}${suffix}`,
        value: calculateSpeedTierValue(baseSpeed, { ...variant, stage }),
        team: entryOptions.team ?? 'own',
      });
      if (weatherBonus && variant.supportsWeather) {
        rows.push({
          pokemonName: pokemon.name,
          label: `${variant.label}${suffix} ${weatherBonus.emoji}`,
          value: calculateSpeedTierValue(baseSpeed, { ...variant, stage, multiplier: variant.multiplier * 2 }),
          team: entryOptions.team ?? 'own',
        });
      }
    }
  }
  return rows;
}

function renderSpeedTiersPickerSuggestions() {
  if (!speedTiersPickerSuggestions) return;
  speedTiersPickerSuggestions.innerHTML = '';
  const query = speedTiersState.pickerInput.trim();
  if (!query) return;
  const taken = new Set(speedTiersState.entries.map((entry) => entry.name));
  const suggestions = allPokemon
    .filter((pokemon) => !pokemon.hidden && normalizeText(pokemon.name).includes(normalizeText(query)) && !taken.has(pokemon.name))
    .sort((left, right) => left.num - right.num || left.sourceIndex - right.sourceIndex)
    .slice(0, 16);
  for (const pokemon of suggestions) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'suggestion-item';
    button.textContent = pokemon.name;
    button.addEventListener('click', () => {
      speedTiersState.entries.push({
        name: pokemon.name,
        team: 'own',
        stage: 0,
        showAllStages: false,
      });
      speedTiersState.pickerInput = '';
      if (speedTiersPickerInput) speedTiersPickerInput.value = '';
      renderSpeedTiers();
    });
    speedTiersPickerSuggestions.append(button);
  }
}

function updateSpeedTiersTeam(name, team) {
  const entry = speedTiersState.entries.find((candidate) => candidate.name === name);
  if (!entry) return;
  entry.team = team;
  renderSpeedTiers();
}

function removeSpeedTiersEntry(name) {
  speedTiersState.entries = speedTiersState.entries.filter((entry) => entry.name !== name);
  if (speedTiersState.gapContext?.pokemonName === name) closeSpeedTiersGapModal();
  renderSpeedTiers();
}

function renderSpeedTiersTeamColumn(container, team) {
  if (!container) return;
  container.innerHTML = '';
  const entries = getSpeedTierEntries().filter((entry) => entry.team === team);
  if (!entries.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = team === 'own' ? 'Drop your own team here.' : 'Drop enemy Pokemon here.';
    container.append(empty);
  }
  for (const entry of entries) {
    const chip = document.createElement('div');
    chip.className = `speed-tiers-chip is-${team}`;
    chip.dataset.name = entry.name;

    const sprite = document.createElement('img');
    sprite.src = entry.pokemon.sprite;
    sprite.alt = `${entry.name} sprite`;
    sprite.loading = 'lazy';

    const body = document.createElement('div');
    body.className = 'speed-tiers-chip-body';
    const title = document.createElement('strong');
    title.textContent = entry.name;

    const controls = document.createElement('div');
    controls.className = 'speed-tiers-chip-controls';

    const moveLeft = document.createElement('button');
    moveLeft.type = 'button';
    moveLeft.className = 'speed-tiers-team-button';
    moveLeft.textContent = '←';
    moveLeft.title = 'Move to own team.';
    moveLeft.disabled = entry.team === 'own';
    moveLeft.addEventListener('click', () => updateSpeedTiersTeam(entry.name, 'own'));
    controls.append(moveLeft);

    const moveRight = document.createElement('button');
    moveRight.type = 'button';
    moveRight.className = 'speed-tiers-team-button';
    moveRight.textContent = '→';
    moveRight.title = 'Move to enemy team.';
    moveRight.disabled = entry.team === 'enemy';
    moveRight.addEventListener('click', () => updateSpeedTiersTeam(entry.name, 'enemy'));
    controls.append(moveRight);

    const stageDown = document.createElement('button');
    stageDown.type = 'button';
    stageDown.draggable = false;
    stageDown.className = 'speed-tiers-stage-button';
    stageDown.textContent = '−';
    stageDown.title = 'Lower the stage by 1.';
    stageDown.addEventListener('click', () => {
      entry.stage = cycleSpeedTierStage(entry.stage, 'down');
      renderSpeedTiers();
    });
    controls.append(stageDown);

    const stageButton = document.createElement('button');
    stageButton.type = 'button';
    stageButton.draggable = false;
    stageButton.className = 'speed-tiers-stage-button';
    stageButton.textContent = formatSpeedTierStage(entry.stage);
    stageButton.title = 'Current stage modifier.';
    controls.append(stageButton);

    const stageUp = document.createElement('button');
    stageUp.type = 'button';
    stageUp.draggable = false;
    stageUp.className = 'speed-tiers-stage-button';
    stageUp.textContent = '+';
    stageUp.title = 'Raise the stage by 1.';
    stageUp.addEventListener('click', () => {
      entry.stage = cycleSpeedTierStage(entry.stage, 'up');
      renderSpeedTiers();
    });
    controls.append(stageUp);

    if (hasSpeedTierBoostSweepToggle(entry.pokemon)) {
      const toggle = document.createElement('label');
      toggle.className = 'hide-filter speed-tiers-stage-toggle';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.draggable = false;
      checkbox.checked = entry.showAllStages;
      checkbox.addEventListener('change', () => {
        entry.showAllStages = checkbox.checked;
        renderSpeedTiers();
      });
      toggle.append(checkbox, document.createTextNode('0-6'));
      controls.append(toggle);
    }

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.draggable = false;
    remove.className = 'speed-tiers-remove';
    remove.textContent = '×';
    remove.addEventListener('click', () => removeSpeedTiersEntry(entry.name));
    controls.append(remove);

    body.append(title, controls);
    chip.append(sprite, body);
    container.append(chip);
  }
}

function getSortedSpeedTierRows() {
  const rows = getSpeedTierEntries().flatMap((entry) =>
    getSpeedTierVariantsForPokemon(entry.pokemon, {
      team: entry.team,
      stage: entry.stage,
      showAllStages: entry.showAllStages,
    }),
  );
  rows.sort((left, right) => {
    if (speedTiersState.options.trickRoom) return left.value - right.value || left.label.localeCompare(right.label);
    return right.value - left.value || left.label.localeCompare(right.label);
  });
  return rows;
}

function openSpeedTiersGapModal(index) {
  const rows = getSortedSpeedTierRows();
  if (index < 0 || index >= rows.length - 1) return;
  speedTiersState.gapContext = {
    index,
    threshold: rows[index + 1].value,
  };
  if (speedTiersGapPokemon) {
    speedTiersGapPokemon.innerHTML = '';
    for (const entry of getSpeedTierEntries()) {
      const option = document.createElement('option');
      option.value = entry.name;
      option.textContent = entry.name;
      speedTiersGapPokemon.append(option);
    }
  }
  renderSpeedTiersGapResults();
  if (speedTiersGapModal) speedTiersGapModal.hidden = false;
}

function closeSpeedTiersGapModal() {
  speedTiersState.gapContext = null;
  if (speedTiersGapModal) speedTiersGapModal.hidden = true;
}

function renderSpeedTiersGapResults() {
  if (!speedTiersGapResults || !speedTiersGapPokemon) return;
  speedTiersGapResults.innerHTML = '';
  const pokemon = pokemonByName.get(speedTiersGapPokemon.value);
  const context = speedTiersState.gapContext;
  if (!pokemon || !context) return;
  const weatherBonus = getSpeedTierWeatherBonus(pokemon, speedTiersState.options.weather);
  const targetSummary = document.createElement('p');
  targetSummary.className = 'speed-tiers-gap-target';
  targetSummary.textContent = `${speedTiersState.options.trickRoom ? 'Trying to underspeed' : 'Trying to outspeed'} value ${context.threshold}.`;
  speedTiersGapResults.append(targetSummary);
  const results = [];
  for (const nature of [
    { label: '-Speed', value: 0.9 },
    { label: 'neutral', value: 1 },
    { label: '+Speed', value: 1.1 },
  ]) {
    for (let iv = 0; iv <= 31; iv += 1) {
      for (let ev = 0; ev <= 252; ev += 4) {
        for (const scarf of [false, true]) {
          for (const tailwind of [false, true]) {
            for (const weatherBoost of [false, true]) {
              if (weatherBoost && !weatherBonus) continue;
              for (const trickRoom of [false, true]) {
                const multiplier = (scarf ? 1.5 : 1) * (tailwind ? 2 : 1) * (weatherBoost ? 2 : 1);
                const value = calculateSpeedTierValue(pokemon.baseStats?.spe ?? 0, { iv, ev, nature: nature.value, multiplier });
                const qualifies = trickRoom ? value < context.threshold : value > context.threshold;
                const tags = [];
                if (scarf) tags.push('Scarf');
                if (tailwind) tags.push('Tailwind');
                if (weatherBoost) tags.push(weatherBonus.emoji);
                if (trickRoom) tags.push('Trick Room');
                const difference = value - context.threshold;
                const distance = Math.abs(difference);
                const comparisonQualifies = trickRoom ? value < context.threshold : value > context.threshold;
                results.push({
                  key: `${nature.label}-${iv}-${ev}-${tags.join('|')}-${value}-${trickRoom ? 'tr' : 'no-tr'}`,
                  heading: `${pokemon.name} reaches ${value}`,
                  detail: `${pokemon.name} ${nature.label} ${iv}IV ${ev}EV${tags.length ? ` ${tags.join(' ')}` : ''}`,
                  comparison: `${speedTiersState.options.trickRoom ? 'Target' : 'Threshold'} ${context.threshold}, difference ${difference > 0 ? `+${difference}` : difference}`,
                  qualifies: comparisonQualifies,
                  distance,
                  value,
                });
              }
            }
          }
        }
      }
    }
  }
  const unique = [];
  const seen = new Set();
  const sortedResults = results.sort((left, right) => {
    if (left.qualifies !== right.qualifies) return left.qualifies ? -1 : 1;
    if (left.distance !== right.distance) return left.distance - right.distance;
    if (speedTiersState.options.trickRoom) return left.value - right.value;
    return right.value - left.value;
  });
  for (const result of sortedResults) {
    if (seen.has(result.key)) continue;
    seen.add(result.key);
    unique.push(result);
    if (unique.length >= 120) break;
  }
  if (!unique.length) {
    const empty = document.createElement('div');
    renderEmptyDetailState(empty, 'No configuration crosses this gap.');
    speedTiersGapResults.append(empty);
    return;
  }
  for (const result of unique) {
    const item = document.createElement('div');
    item.className = `speed-tiers-gap-item ${result.qualifies ? 'is-success' : 'is-miss'}`;
    const heading = document.createElement('strong');
    heading.textContent = result.heading;
    const detail = document.createElement('div');
    detail.textContent = result.detail;
    const comparison = document.createElement('div');
    comparison.className = 'speed-tiers-gap-comparison';
    comparison.textContent = result.comparison;
    item.append(heading, detail, comparison);
    speedTiersGapResults.append(item);
  }
}

function renderSpeedTiersRanks() {
  if (!speedTiersRanks) return;
  speedTiersRanks.innerHTML = '';
  const rows = getSortedSpeedTierRows();
  if (!rows.length) {
    renderEmptyDetailState(speedTiersRanks, 'Add Pokemon above to generate speed tiers.');
    return;
  }
  rows.forEach((row, index) => {
    const item = document.createElement('div');
    item.className = `speed-tiers-rank-row is-${row.team}`;
    const label = document.createElement('span');
    label.className = 'speed-tiers-rank-label';
    label.textContent = row.label;
    const value = document.createElement('strong');
    value.className = 'speed-tiers-rank-value';
    value.textContent = String(row.value);
    item.append(label, value);
    speedTiersRanks.append(item);
    if (index < rows.length - 1) {
      const gapButton = document.createElement('button');
      gapButton.type = 'button';
      gapButton.className = 'speed-tiers-gap-button';
      gapButton.textContent = '+';
      gapButton.addEventListener('click', () => openSpeedTiersGapModal(index));
      speedTiersRanks.append(gapButton);
    }
  });
}

function renderSpeedTiers() {
  if (speedTiersPickerInput) speedTiersPickerInput.value = speedTiersState.pickerInput;
  if (speedTiersScarf) speedTiersScarf.checked = speedTiersState.options.scarf;
  if (speedTiersTailwind) speedTiersTailwind.checked = speedTiersState.options.tailwind;
  if (speedTiersTrickRoom) speedTiersTrickRoom.checked = speedTiersState.options.trickRoom;
  if (speedTiersWeather) speedTiersWeather.value = speedTiersState.options.weather;
  renderSpeedTiersPickerSuggestions();
  renderSpeedTiersTeamColumn(speedTiersOwnTeam, 'own');
  renderSpeedTiersTeamColumn(speedTiersEnemyTeam, 'enemy');
  renderSpeedTiersRanks();
  if (!speedTiersGapModal?.hidden) renderSpeedTiersGapResults();
}

function openSpeedTiers() {
  renderSpeedTiers();
  if (speedTiersModal) speedTiersModal.hidden = false;
}

function closeSpeedTiers() {
  if (speedTiersModal) speedTiersModal.hidden = true;
}

function injectCustomPokemonEntries(entries) {
  const list = entries.map((entry) => ({
    ...entry,
    tags: Array.isArray(entry.tags) ? [...entry.tags] : [],
  }));
  const byName = new Map(list.map((entry) => [entry.name, entry]));
  for (const [name, cost] of customCostOverrides.entries()) {
    const entry = byName.get(name);
    if (entry) {
      entry.cost = cost;
      if (cost !== null && cost !== undefined) entry.untiered = false;
    }
  }

  const eevee = byName.get('Eevee');
  if (eevee && !byName.has('Eevee-Z')) {
    list.push({
      ...eevee,
      sourceIndex: (eevee.sourceIndex ?? list.length) + 0.25,
      name: 'Eevee-Z',
      displayName: 'Eevee',
      cost: 1,
      untiered: false,
      tags: [...new Set([...(eevee.tags ?? []), 'z-warning'])],
    });
  }

  const blaziken = byName.get('Blaziken');
  if (blaziken && !byName.has('Blaziken-Speed-Boost')) {
    list.push({
      ...blaziken,
      sourceIndex: (blaziken.sourceIndex ?? list.length) + 0.25,
      name: 'Blaziken-Speed-Boost',
      displayName: 'Blaziken',
      cost: 19,
      untiered: false,
    });
  }

  const blastoiseMega = byName.get('Blastoise-Mega');
  if (blastoiseMega) {
    blastoiseMega.moveIds = (blastoiseMega.moveIds ?? []).filter((moveId) => moveId !== 'shellsmash');
    if (blastoiseMega.learnset?.shellsmash) {
      const nextLearnset = { ...blastoiseMega.learnset };
      delete nextLearnset.shellsmash;
      blastoiseMega.learnset = nextLearnset;
    }
    if (!byName.has('Blastoise-Mega-Shell-Smash')) {
      const variant = {
        ...blastoiseMega,
        sourceIndex: (blastoiseMega.sourceIndex ?? list.length) + 0.25,
        name: 'Blastoise-Mega-Shell-Smash',
        displayName: 'Blastoise-Mega',
        cost: null,
        untiered: true,
        tags: [...new Set([...(blastoiseMega.tags ?? [])])],
      };
      addMoveToPokemon(variant, 'shellsmash', ['9M']);
      list.push(variant);
    }
  }

  const drednaw = byName.get('Drednaw');
  if (drednaw) addMoveToPokemon(drednaw, 'shellsmash', ['9M']);
  const gorebyss = byName.get('Gorebyss');
  if (gorebyss) addMoveToPokemon(gorebyss, 'shellsmash', ['9M']);
  const torterra = byName.get('Torterra');
  if (torterra) addMoveToPokemon(torterra, 'shellsmash', ['9M']);

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
    list.push({
      ...annihilape,
      sourceIndex: (annihilape.sourceIndex ?? list.length) + 0.5,
      name: 'Annihilape-Fist',
      speciesId: 'annihilapefist',
      baseSpecies: 'Annihilape',
      forme: 'Fist',
      changesFrom: 'Annihilape',
      cost: 22,
      tags: ['ragefist'],
      sprite: annihilape.sprite,
    });
  }
  for (const entry of list) {
    const nextTags = new Set(Array.isArray(entry.tags) ? entry.tags : []);
    if (pokemonMatchesTaggedSpecies(entry, legendaryTagSpecies)) nextTags.add('Legendary');
    if (pokemonMatchesTaggedSpecies(entry, mythicTagSpecies)) nextTags.add('Mythic');
    entry.tags = [...nextTags];
  }
  return list;
}

function readCoverageCriteria() {
  return [...coverageList.querySelectorAll('.coverage-row')]
    .filter((row) => row.querySelector('[data-role="enabled"]').checked)
    .map((row) => ({
      type: row.querySelector('[data-role="type"]').value,
      minPower: Number(row.querySelector('[data-role="power"]').value),
    }));
}

function applyAdvancedSearchFromModal() {
  appliedAdvancedSearch = {
    name: detailsName.value.trim(),
    abilities: [...draftAbilityTokens],
    abilityMode: abilityMode.value,
    moves: [...draftMoveTokens],
    moveMode: moveMode.value,
    coverage: readCoverageCriteria(),
    statMode: statSearchMode.value,
    statRanges: readStatRangeCriteria(),
    speedControl: { enabled: speedControlEnabled.checked, mode: speedControlMode.value },
    hazards: { enabled: hazardsEnabled.checked, mode: hazardsMode.value },
    pivot: { enabled: pivotEnabled.checked, mode: pivotMode.value },
    defensiveCoverage: readDefensiveCoverageCriteria(),
  };
  applyAllFilters();
  closeDetailsModal();
}

function initializeAdvancedSearch() {
  buildCoverageRows();
  buildDefensiveCoverageRows();
  setupInfoButtons();

  refreshAbilityTokens = setupTokenAutocomplete({
    input: abilityInput,
    suggestionContainer: abilitySuggestions,
    tokenContainer: abilityTokenList,
    getItems: () => draftAbilityTokens,
    setItems: (items) => {
      draftAbilityTokens = items;
    },
    options: abilityOptions,
  });

  refreshMoveTokens = setupTokenAutocomplete({
    input: moveInput,
    suggestionContainer: moveSuggestions,
    tokenContainer: moveTokenList,
    getItems: () => draftMoveTokens,
    setItems: (items) => {
      draftMoveTokens = items;
    },
    options: moveOptions,
  });

initializeToolHelpToggles();
initializeStaticToolContent();
initializeStaticUiLabels();
detailsButton.addEventListener('click', openDetailsModal);
expertSearchButton?.addEventListener('click', openExpertSearchModal);
searchExpandButton?.addEventListener('click', () => setSearchAdvancedExpanded(!isSearchAdvancedExpanded));
replacementFinderButton?.addEventListener('click', () => openReplacementPicker());
coreFinderButton?.addEventListener('click', openCoreFinder);
budgetPlannerButton?.addEventListener('click', openBudgetPlanner);
ruleCheckerButton?.addEventListener('click', () => {
  void openRuleChecker();
});
stefansPdfButton?.addEventListener('click', openStefansPdf);
changelogButton?.addEventListener('click', () => openChangelog('site'));
legendButton?.addEventListener('click', openLegend);
themeToggle?.addEventListener('click', toggleTheme);
  detailsClose.addEventListener('click', closeDetailsModal);
  detailsCancel.addEventListener('click', closeDetailsModal);
  detailsReset.addEventListener('click', resetAdvancedSearchModal);
  detailsSubmit.addEventListener('click', applyAdvancedSearchFromModal);
  detailsModal.addEventListener('click', (event) => {
    if (event.target.dataset.closeModal === 'true') closeDetailsModal();
  });
  expertSearchClose?.addEventListener('click', closeExpertSearchModal);
  expertSearchModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeExpertSearch === 'true') closeExpertSearchModal();
  });
  expertSearchSubmit?.addEventListener('click', submitExpertSearch);
  expertSearchClear?.addEventListener('click', clearExpertSearch);
  expertSearchSyntaxToggle?.addEventListener('click', () => {
    expertSearchSyntax.hidden = !expertSearchSyntax.hidden;
    expertSearchSyntaxToggle.textContent = expertSearchSyntax.hidden ? 'Syntax' : 'Syntax schließen';
  });
  expertSearchInput?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    submitExpertSearch();
  });

  pokemonDetailClose.addEventListener('click', closePokemonDetail);
  detailReplacementButton?.addEventListener('click', () => {
    const pokemon = pokemonByName.get(activeDetailPokemonName);
    if (!pokemon) return;
    openReplacementFinder(pokemon.name);
  });
  pokemonDetailModal.addEventListener('click', (event) => {
    if (event.target.dataset.closeDetail === 'true') closePokemonDetail();
  });
  replacementPickerClose?.addEventListener('click', closeReplacementPicker);
  replacementPickerCancel?.addEventListener('click', closeReplacementPicker);
  replacementPickerSubmit?.addEventListener('click', submitReplacementPicker);
  replacementPickerModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeReplacementPicker === 'true') closeReplacementPicker();
  });
  replacementPickerInput?.addEventListener('input', () => {
    replacementPickerSelectedName = null;
    renderReplacementPickerSuggestions();
  });
  replacementPickerInput?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    submitReplacementPicker();
  });
  replacementFinderClose?.addEventListener('click', closeReplacementFinder);
  replacementFinderModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeReplacementFinder === 'true') closeReplacementFinder();
  });
  replacementRunSearch?.addEventListener('click', runReplacementFinderSearch);
  stefansPdfClose?.addEventListener('click', closeStefansPdf);
  stefansPdfModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeStefansPdf === 'true') closeStefansPdf();
  });
  legendClose?.addEventListener('click', closeLegend);
  legendModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeLegend === 'true') closeLegend();
  });
  changelogClose?.addEventListener('click', closeChangelog);
  changelogModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeChangelog === 'true') closeChangelog();
  });
  changelogTabs.forEach((tab) => {
    tab.addEventListener('click', () => setActiveChangelogTab(tab.dataset.tab ?? 'site'));
  });
  coreFinderClose?.addEventListener('click', closeCoreFinder);
  coreFinderModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeCoreFinder === 'true') closeCoreFinder();
  });
  coreFinderMode?.addEventListener('change', () => {
    coreFinderState.size = Number(coreFinderMode.value);
    if (coreFinderState.size === 3) {
      coreFinderState.thirdSlotMode = 'search';
      coreFinderState.selectedNames[2] = null;
      coreFinderState.inputValues[2] = '';
      coreFinderState.selectedNames[3] = null;
      coreFinderState.inputValues[3] = '';
    }
    coreFinderResultsSection.hidden = true;
    renderCoreFinderSlots();
  });
  coreFinderPivotChain?.addEventListener('change', () => {
    coreFinderState.pivotChain = coreFinderPivotChain.checked;
    coreFinderResultsSection.hidden = true;
    renderCoreFinderSlots();
  });
  coreFinderExceptionClose?.addEventListener('click', closeCoreFinderExceptionModal);
  coreFinderExceptionCancel?.addEventListener('click', closeCoreFinderExceptionModal);
  coreFinderExceptionSubmit?.addEventListener('click', () => {
    if (!coreFinderPendingException?.type) return;
    runCoreFinderSearch({ allowedExceptionType: coreFinderPendingException.type });
  });
  coreFinderExceptionModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeCoreFinderException === 'true') closeCoreFinderExceptionModal();
  });
  budgetPlannerClose?.addEventListener('click', closeBudgetPlanner);
  budgetPlannerModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeBudgetPlanner === 'true') closeBudgetPlanner();
  });
  budgetPlannerFormat?.addEventListener('change', () => updateBudgetPlannerFormat(budgetPlannerFormat.value));
  budgetPlannerZoomButton?.addEventListener('click', openBudgetPlannerZoomModal);
  budgetPlannerCostsButton?.addEventListener('click', openBudgetPlannerCostsModal);
  budgetPlannerCaptainCostsButton?.addEventListener('click', openBudgetPlannerCaptainCostsModal);
  budgetPlannerZoomClose?.addEventListener('click', closeBudgetPlannerZoomModal);
  budgetPlannerZoomCancel?.addEventListener('click', closeBudgetPlannerZoomModal);
  budgetPlannerZoomModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeBudgetPlannerZoom === 'true') closeBudgetPlannerZoomModal();
  });
  budgetPlannerCostsClose?.addEventListener('click', closeBudgetPlannerCostsModal);
  budgetPlannerCostsCancel?.addEventListener('click', closeBudgetPlannerCostsModal);
  budgetPlannerCostsModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeBudgetPlannerCosts === 'true') closeBudgetPlannerCostsModal();
  });
  budgetPlannerCaptainCostsClose?.addEventListener('click', closeBudgetPlannerCaptainCostsModal);
  budgetPlannerCaptainCostsCancel?.addEventListener('click', closeBudgetPlannerCaptainCostsModal);
budgetPlannerCaptainCostsModal?.addEventListener('click', (event) => {
  if (event.target.dataset.closeBudgetPlannerCaptainCosts === 'true') closeBudgetPlannerCaptainCostsModal();
});
budgetPlannerDownloadText?.addEventListener('click', () => {
  downloadBlob('budget-planer-costs.txt', buildBudgetPlannerSpendText(), 'text/plain;charset=utf-8');
});
budgetPlannerDownloadPng?.addEventListener('click', downloadBudgetPlannerPng);
ruleCheckerClose?.addEventListener('click', closeRuleChecker);
speedTiersButton?.addEventListener('click', openSpeedTiers);
speedTiersClose?.addEventListener('click', closeSpeedTiers);
speedTiersModal?.addEventListener('click', (event) => {
  if (event.target.dataset.closeSpeedTiers === 'true') closeSpeedTiers();
});
speedTiersGapClose?.addEventListener('click', closeSpeedTiersGapModal);
speedTiersGapModal?.addEventListener('click', (event) => {
  if (event.target.dataset.closeSpeedTiersGap === 'true') closeSpeedTiersGapModal();
});
speedTiersPickerInput?.addEventListener('input', () => {
  speedTiersState.pickerInput = speedTiersPickerInput.value;
  renderSpeedTiersPickerSuggestions();
});
speedTiersPickerInput?.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  const exact = allPokemon.find((pokemon) => normalizeText(pokemon.name) === normalizeText(speedTiersState.pickerInput));
  if (!exact) return;
  const alreadyAdded = speedTiersState.entries.some((entry) => entry.name === exact.name);
  if (alreadyAdded) return;
  speedTiersState.entries.push({ name: exact.name, team: 'own', stage: 0, showAllStages: false });
  speedTiersState.pickerInput = '';
  speedTiersPickerInput.value = '';
  renderSpeedTiers();
});
speedTiersScarf?.addEventListener('change', () => {
  speedTiersState.options.scarf = speedTiersScarf.checked;
  renderSpeedTiers();
});
speedTiersTailwind?.addEventListener('change', () => {
  speedTiersState.options.tailwind = speedTiersTailwind.checked;
  renderSpeedTiers();
});
speedTiersTrickRoom?.addEventListener('change', () => {
  speedTiersState.options.trickRoom = speedTiersTrickRoom.checked;
  renderSpeedTiers();
});
speedTiersWeather?.addEventListener('change', () => {
  speedTiersState.options.weather = speedTiersWeather.value;
  renderSpeedTiers();
});
speedTiersGapPokemon?.addEventListener('change', renderSpeedTiersGapResults);
ruleCheckerModal?.addEventListener('click', (event) => {
  if (event.target.dataset.closeRuleChecker === 'true') closeRuleChecker();
});
ruleCheckerImportBudget?.addEventListener('click', importRuleCheckerFromBudgetPlanner);
ruleCheckerFormat?.addEventListener('change', () => {
  ruleCheckerState.format = ruleCheckerFormat.value;
  resetRuleCheckerValidation();
  renderRuleChecker();
});
ruleCheckerValidate?.addEventListener('click', () => {
  runRuleCheckerValidation();
  renderRuleChecker();
});
ruleCheckerPickerInput?.addEventListener('input', () => {
  ruleCheckerState.pickerInput = ruleCheckerPickerInput.value;
  renderRuleCheckerPickerSuggestions();
});
ruleCheckerPickerInput?.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  event.preventDefault();
  const exact = allPokemon.find((pokemon) => normalizeText(pokemon.name) === normalizeText(ruleCheckerState.pickerInput));
  if (exact) {
    ruleCheckerState.pickerInput = '';
    ruleCheckerPickerInput.value = '';
    addRuleCheckerRosterPokemon(exact.name);
  }
});
detailSimilarLoadButton?.addEventListener('click', () => {
    const pokemon = pokemonByName.get(activeDetailPokemonName);
    if (!pokemon) return;
    loadedSimilarPokemonName = pokemon.name;
    renderSimilarPokemonSection(pokemon);
  });
  detailPrev.addEventListener('click', () => {
    const pokemon = pokemonByName.get(activeDetailPokemonName);
    if (!pokemon) return;
    const previous = getCurrentDetailNavigation(pokemon).previous;
    if (previous) openPokemonDetail(previous.name);
  });
  detailNext.addEventListener('click', () => {
    const pokemon = pokemonByName.get(activeDetailPokemonName);
    if (!pokemon) return;
    const next = getCurrentDetailNavigation(pokemon).next;
    if (next) openPokemonDetail(next.name);
  });
  detailMoveSearch.addEventListener('input', refreshActivePokemonDetail);
  detailMoveCategory.addEventListener('change', refreshActivePokemonDetail);
}

async function loadPokedex() {
  try {
    const loadedEntries = window.POKEDEX_ENTRIES;
    if (!Array.isArray(loadedEntries)) throw new Error('Pokedex entries were not found on the page.');
    allPokemon = injectCustomPokemonEntries(loadedEntries);
    coreDefenseProfileCache = new Map();
    pokemonByName = new Map(allPokemon.map((pokemon) => [pokemon.name, pokemon]));
    pokemonByNormalizedName = new Map(allPokemon.map((pokemon) => [normalizeText(pokemon.name), pokemon]));
    hiddenPokemonByLink = allPokemon.reduce((map, pokemon) => {
      if (!pokemon.hidden || !pokemon.linkedTo) return map;
      const linkedPokemon = map.get(pokemon.linkedTo) ?? [];
      linkedPokemon.push(pokemon);
      map.set(pokemon.linkedTo, linkedPokemon);
      return map;
    }, new Map());
    applyAllFilters();
  } catch (error) {
    pokedexGrid.innerHTML = '';
    const emptyState = document.createElement('p');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'The Pokedex data could not be loaded.';
    pokedexGrid.append(emptyState);
    resultsCount.textContent = 'Loading failed';
    console.error(error);
  }
}

applyTheme(getStoredTheme());
initializeAdvancedSearch();
searchInput.addEventListener('input', applyAllFilters);
sortField.addEventListener('change', applyAllFilters);
sortDirection.addEventListener('change', applyAllFilters);
sortFieldSecondary?.addEventListener('change', applyAllFilters);
sortDirectionSecondary?.addEventListener('change', applyAllFilters);
formatFilter.addEventListener('change', applyAllFilters);
hideUnreleased.addEventListener('change', applyAllFilters);
hideImpossible.addEventListener('change', applyAllFilters);
hideUntiered.addEventListener('change', applyAllFilters);
hideDividers.addEventListener('change', applyAllFilters);
simpleViewToggle.addEventListener('change', applyAllFilters);
for (const button of triFilterButtons) {
  button.addEventListener('click', () => {
    const currentIndex = triStateOrder.indexOf(button.dataset.state || 'any');
    button.dataset.state = triStateOrder[(currentIndex + 1) % triStateOrder.length];
    applyAllFilters();
  });
}
scrollTopButton?.addEventListener('click', scrollToTopOfList);
window.addEventListener('scroll', updateScrollTopButtonVisibility, { passive: true });
window.addEventListener('resize', updateScrollTopButtonVisibility);
setSearchAdvancedExpanded(false);
updateScrollTopButtonVisibility();
loadPokedex();



