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

const typeDefenseChart = {
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
const costSuggestionsEndpoint = 'https://script.google.com/macros/s/AKfycbwl7_jdkgBdixfeeqrqJdzI4Dwp3gwI6gKF4YEQxXZLrdgPwvMOeCOgnvbR16QpD2jX/exec';

const hubViews = [...document.querySelectorAll('[data-hub-view]')];
const hubActionButtons = [...document.querySelectorAll('[data-hub-action]')];
const draftPageTabs = document.querySelector('#draft-page-tabs');
const draftPageContent = document.querySelector('#draft-page-content');
const landingTierUpdate = document.querySelector('#landing-tier-update');
const landingTierUpdateText = document.querySelector('#landing-tier-update-text');
const landingTierUpdateSprite = document.querySelector('#landing-tier-update-sprite');
const landingBanner = document.querySelector('.landing-banner');
const hubSearchInput = document.querySelector('#hub-search-input');
const hubSearchResults = document.querySelector('#hub-search-results');
const matchdayContent = document.querySelector('#matchday-content');
const matchdayPdfDate = document.querySelector('#matchday-pdf-date');
const matchdayPdfButton = document.querySelector('#matchday-pdf-button');
const tierEditorTile = document.querySelector('#tier-editor-tile');
const tierEditorSearch = document.querySelector('#tier-editor-search');
const tierEditorChangedOnly = document.querySelector('#tier-editor-changed-only');
const tierEditorRows = document.querySelector('#tier-editor-rows');
const tierEditorSave = document.querySelector('#tier-editor-save');
const tierEditorDiscard = document.querySelector('#tier-editor-discard');
const tierEditorStatus = document.querySelector('#tier-editor-status');
let activeHubView = 'home';
let draftOverviewContext = 'modal';
let landingTierSpriteInterval = null;
let expandedMatchdayMatchId = null;
let spielerAchievementPlayerName = null;
let spielerAchievementDetailId = 0;

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
const mobilePanelTriggers = [...document.querySelectorAll('[data-mobile-panel-trigger]')];
const mobilePanels = [...document.querySelectorAll('[data-mobile-panel]')];
const mobilePanelBackdrop = document.querySelector('#mobile-panel-backdrop');
const mobilePanelCloseButtons = [...document.querySelectorAll('[data-mobile-panel-close]')];
const triFilterButtons = [...document.querySelectorAll('.tri-filter')];
const showAllPokemon = document.querySelector('#show-all-pokemon');
const hideUnreleased = document.querySelector('#hide-unreleased');
const hideImpossible = document.querySelector('#hide-impossible');
const hideUntiered = document.querySelector('#hide-untiered');
const hideDividers = document.querySelector('#hide-dividers');
const hideFilterCheckboxes = [hideUnreleased, hideImpossible, hideUntiered, hideDividers].filter(Boolean);
const simpleViewToggle = document.querySelector('#simple-view-toggle');
const detailsButton = document.querySelector('#details-search-button');
const expertSearchButton = document.querySelector('#expert-search-button');
const replacementFinderButton = document.querySelector('#replacement-finder-button');
const coreFinderButton = document.querySelector('#core-finder-button');
const budgetPlannerButton = document.querySelector('#budget-planner-button');
const ruleCheckerButton = document.querySelector('#rule-checker-button');
const stefansPdfButton = document.querySelector('#stefans-pdf-button');
const draftOverviewButton = document.querySelector('#draft-overview-button');
const changelogButton = document.querySelector('#changelog-button');
const spielerButton = document.querySelector('#spieler-button');
const informationGraphButton = document.querySelector('#information-graph-button');
const themeToggle = document.querySelector('#theme-toggle');
const themeToggleMascot = document.querySelector('#theme-toggle-mascot');
const eastereggToggle = document.querySelector('#easteregg-toggle');
const eastereggToggleMascot = document.querySelector('#easteregg-toggle-mascot');
const languageToggle = document.querySelector('#language-toggle');
const battleModeToggle = document.querySelector('#battle-mode-toggle');
const authToggle = document.querySelector('#auth-toggle');
const authModal = document.querySelector('#auth-modal');
const authClose = document.querySelector('#auth-close');
const authTitle = document.querySelector('#auth-title');
const authConfigNotice = document.querySelector('#auth-config-notice');
const authLoginForm = document.querySelector('#auth-login-form');
const authEmail = document.querySelector('#auth-email');
const authPassword = document.querySelector('#auth-password');
const authLoginSubmit = document.querySelector('#auth-login-submit');
const authForgotPassword = document.querySelector('#auth-forgot-password');
const authAccount = document.querySelector('#auth-account');
const authAccountEmail = document.querySelector('#auth-account-email');
const authShowPasswordChange = document.querySelector('#auth-show-password-change');
const authSignOut = document.querySelector('#auth-sign-out');
const authPasswordForm = document.querySelector('#auth-password-form');
const authNewPassword = document.querySelector('#auth-new-password');
const authNewPasswordConfirm = document.querySelector('#auth-new-password-confirm');
const authPasswordCancel = document.querySelector('#auth-password-cancel');
const authFeedback = document.querySelector('#auth-feedback');
const legendButton = document.querySelector('#legend-button');
const railToggle = document.querySelector('#rail-toggle');
const themeToggleWrap = document.querySelector('.theme-toggle-wrap');
const themeToggleWrapHome = {
  parent: themeToggleWrap?.parentNode ?? null,
  nextSibling: themeToggleWrap?.nextSibling ?? null,
};
const scrollTopButton = document.querySelector('#scroll-top-button');
const jumpRail = document.querySelector('#jump-rail');
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
const detailCareer = document.querySelector('#detail-career');
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
const draftOverviewModal = document.querySelector('#draft-overview-modal');
const draftOverviewClose = document.querySelector('#draft-overview-close');
const draftOverviewTabs = document.querySelector('#draft-overview-tabs');
const draftOverviewContent = document.querySelector('#draft-overview-content');
const stefansPdfModal = document.querySelector('#stefans-pdf-modal');
const stefansPdfClose = document.querySelector('#stefans-pdf-close');
const changelogModal = document.querySelector('#changelog-modal');
const changelogClose = document.querySelector('#changelog-close');
const changelogTabs = [...document.querySelectorAll('.changelog-tab')];
const changelogPanels = [...document.querySelectorAll('.changelog-panel')];
const spielerModal = document.querySelector('#spieler-modal');
const spielerClose = document.querySelector('#spieler-close');
const spielerGrid = document.querySelector('#spieler-grid');
const spielerTitle = document.querySelector('#spieler-title');
const informationGraphModal = document.querySelector('#information-graph-modal');
const informationGraphClose = document.querySelector('#information-graph-close');
const informationGraphX = document.querySelector('#information-graph-x');
const informationGraphY = document.querySelector('#information-graph-y');
const informationGraphGenerate = document.querySelector('#information-graph-generate');
const informationGraphCanvas = document.querySelector('#information-graph-canvas');
const informationGraphTooltip = document.querySelector('#information-graph-tooltip');
const costSuggestionsButton = document.querySelector('#cost-suggestions-button');
const costSuggestionsModal = document.querySelector('#cost-suggestions-modal');
const costSuggestionsClose = document.querySelector('#cost-suggestions-close');
const costSuggestionsAuth = document.querySelector('#cost-suggestions-auth');
const costSuggestionsPassword = document.querySelector('#cost-suggestions-password');
const costSuggestionsStatus = document.querySelector('#cost-suggestions-status');
const costSuggestionsTableWrap = document.querySelector('#cost-suggestions-table-wrap');
const costSuggestionForm = document.querySelector('#cost-suggestion-form');
const costSuggestionValue = document.querySelector('#cost-suggestion-value');
const costSuggestionName = document.querySelector('#cost-suggestion-name');
const costSuggestionReason = document.querySelector('#cost-suggestion-reason');
const costSuggestionSubmit = document.querySelector('#cost-suggestion-submit');
const costSuggestionFeedback = document.querySelector('#cost-suggestion-feedback');
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
const budgetPlannerCount = document.querySelector('#budget-planner-count');
const budgetPlannerCountCurrent = document.querySelector('#budget-planner-count-current');
const budgetPlannerCountTotal = document.querySelector('#budget-planner-count-total');
const budgetPlannerCountMascot = document.querySelector('#budget-planner-count-mascot');
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
const ruleCheckerImportCurrentTeam = document.querySelector('#rule-checker-import-current-team');
const ruleCheckerCurrentTeamOverlay = document.querySelector('#rule-checker-current-team-overlay');
const ruleCheckerCurrentTeamSelect = document.querySelector('#rule-checker-current-team-select');
const ruleCheckerCurrentTeamEmpty = document.querySelector('#rule-checker-current-team-empty');
const ruleCheckerCurrentTeamClose = document.querySelector('#rule-checker-current-team-close');
const ruleCheckerCurrentTeamCancel = document.querySelector('#rule-checker-current-team-cancel');
const ruleCheckerCurrentTeamConfirm = document.querySelector('#rule-checker-current-team-confirm');
const ruleCheckerPickerInput = document.querySelector('#rule-checker-picker-input');
const ruleCheckerPickerSuggestions = document.querySelector('#rule-checker-picker-suggestions');
const ruleCheckerRoster = document.querySelector('#rule-checker-roster');
const ruleCheckerTeamGrid = document.querySelector('#rule-checker-team-grid');
const ruleCheckerValidate = document.querySelector('#rule-checker-validate');
const ruleCheckerImportShowdown = document.querySelector('#rule-checker-import-showdown');
const ruleCheckerExportShowdown = document.querySelector('#rule-checker-export-showdown');
const ruleCheckerShowdownOverlay = document.querySelector('#rule-checker-showdown-overlay');
const ruleCheckerShowdownTitle = document.querySelector('#rule-checker-showdown-title');
const ruleCheckerShowdownHelp = document.querySelector('#rule-checker-showdown-help');
const ruleCheckerShowdownText = document.querySelector('#rule-checker-showdown-text');
const ruleCheckerShowdownClose = document.querySelector('#rule-checker-showdown-close');
const ruleCheckerShowdownCancel = document.querySelector('#rule-checker-showdown-cancel');
const ruleCheckerShowdownConfirm = document.querySelector('#rule-checker-showdown-confirm');
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
    'Gib unter "Pokémon Pool" dein gewünschtes Format ein und importiere entweder das Team, das du zuletzt im Budget Planer offen hattest, oder ein aktuelles Spieler-Team. Alternativ kannst du deinen Draft in der Zeile "Pokémon hinzufügen" eingeben. Danach kannst du bei "Set Vorschau" Pokémon aus deinem Draft per Drop-Down auswählen und ihre Sets eingeben. Wenn du dann auf Leglität Prüfen klickst, zeigt dir der Checker eventuelle Regelverstöße an.',
    'Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'speed-tiers-help': [
    'Füge die Pokémon unter "Pokémon hinzufügen" hinzu, die du vergleichen willst. Diese werden standardmäßig unter Own Team gelistet, über den Pfeil nach rechts kannst du sie auf das andere Team verschieben (das ändert nur die Farbe in der Liste unten für bessere Übersicht, es hat keinen Einfluss auf die Berechnung).',
    'Das Ranking zeigt dir dann für alle gewählten Pokémon ein Set mit minimalem Speed, neutralem Wesen und maximalem Speed an. Pro Pokémon kannst du die Speed-Werte um -6 bis +6 ändern. Im "Vergleich" kannst du auch Scarf, Tailwind, Trickroom und Wetter anstellen. Dieses fügt Sets mit diesen Faktoren für alle Pokémon dem Ranking hinzu.',
    'Wenn du auf eines der + klickst, zeigt dir das Tool alle Sets des gewählten Pokémon, mit dem es hier outspeeden kann (wenn du Trick Room aktiviert hast auch wie es "out-slowen" kann). Das Tool schaut rein auf Werte, es kann dir also auch Extremfälle wie Scarf Trick Room anzeigen!',
    'Bei Bugs und weiteren Fragen melde dich bei Tobi.',
  ],
  'stefans-pdf-help': [
    'Hier findest du den Regeltext aus Stefans originaler PDF als lesbare Textfassung. Du kannst die PDF weiterhin herunterladen oder im neuen Tab öffnen.',
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
    'Gib unter "Pok\u00e9mon Pool" dein gew\u00fcnschtes Format ein und importiere entweder das Team, das du zuletzt im Budget Planer offen hattest, oder ein aktuelles Spieler-Team. Alternativ kannst du deinen Draft in der Zeile "Pok\u00e9mon hinzuf\u00fcgen" eingeben. Danach kannst du bei "Set Vorschau" Pok\u00e9mon aus deinem Draft per Drop-Down ausw\u00e4hlen und ihre Sets eingeben. Wenn du dann auf Leglit\u00e4t Pr\u00fcfen klickst, zeigt dir der Checker eventuelle Regelverst\u00f6\u00dfe an.',
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
const changelogData = window.CHANGELOG_DATA ?? { tier: [], site: [] };
const pointCostHistory = Array.isArray(window.POINT_COST_HISTORY) ? window.POINT_COST_HISTORY : [];
const meta = window.POKEDEX_META ?? { abilities: [], moves: [], movesById: {} };
const languageStorageKey = 'pokedex-name-language';
let activeNameLanguage = localStorage.getItem(languageStorageKey) === 'de' ? 'de' : 'en';
const battleModeStorageKey = 'schwalboga-battle-mode';
let preferredBattleMode = localStorage.getItem(battleModeStorageKey) === 'doubles' ? 'doubles' : 'singles';
let activeBattleMode = 'singles';
let supabaseClient = null;
let authSession = null;
let authRecoveryMode = false;
const authLinkTypeAtLoad = new URLSearchParams(window.location.hash.slice(1)).get('type');
let sharedCostRows = new Map();
let sharedCostsReady = false;
let sharedCostsError = '';
let tierEditorDraft = new Map();

function getPokemonCost(pokemon, mode = activeBattleMode) {
  if (!pokemon) return null;
  return mode === 'doubles' ? (pokemon.cost_dbl ?? pokemon.cost ?? null) : (pokemon.cost ?? null);
}

function isPlaceholderDoublesCost(pokemon) {
  return Boolean(pokemon?.cost_dbl_is_placeholder);
}

function markPlaceholderCost(element, pokemon, mode = activeBattleMode) {
  const isPlaceholder = mode === 'doubles'
    && getPokemonCost(pokemon, 'doubles') !== null
    && isPlaceholderDoublesCost(pokemon);
  element?.classList.toggle('is-placeholder-cost', isPlaceholder);
  if (element && isPlaceholder) {
    element.title = 'Vorläufiger Doubles-Wert: verwendet aktuell die Singles-Kosten';
  }
}

function syncBattleModeToggle() {
  if (!battleModeToggle) return;
  const isDoubles = activeBattleMode === 'doubles';
  battleModeToggle.setAttribute('aria-pressed', String(isDoubles));
  const signedIn = Boolean(authSession?.user);
  battleModeToggle.setAttribute(
    'aria-label',
    signedIn ? (isDoubles ? 'Doubles-Kosten aktiv' : 'Singles-Kosten aktiv') : 'Anmelden, um Doubles-Kosten zu verwenden',
  );
  const label = battleModeToggle.querySelector('.theme-toggle-label');
  if (label) label.textContent = isDoubles ? 'Doubles' : 'Singles';
  const icon = battleModeToggle.querySelector('.battle-mode-icon');
  if (icon) icon.textContent = isDoubles ? '2v2' : '1v1';
}

function toggleBattleMode() {
  if (!authSession?.user) {
    openAuthModal();
    setAuthFeedback('Melde dich an, um die Doubles-Kosten zu verwenden.', 'error');
    return;
  }
  activeBattleMode = activeBattleMode === 'singles' ? 'doubles' : 'singles';
  preferredBattleMode = activeBattleMode;
  localStorage.setItem(battleModeStorageKey, preferredBattleMode);
  syncBattleModeToggle();
  refreshCostDependentViews();
}

function refreshCostDependentViews() {
  applyAllFilters();

  if (pokemonDetailModal?.hidden === false && activeDetailPokemonName) {
    refreshActivePokemonDetail();
  }

  if (replacementFinderModal?.hidden === false) {
    const target = getReplacementTargetPokemon();
    const hadResults = replacementResultsSection?.hidden === false;
    if (target) {
      renderReplacementFinder(target);
      if (hadResults && getReplacementSelectedAspects().length) runReplacementFinderSearch();
    }
  }

  if (coreFinderModal?.hidden === false) {
    const hadResults = coreFinderResultsSection?.hidden === false;
    renderCoreFinderSlots();
    if (hadResults) renderCoreFinderResults(findCoreFinderResults());
  }

  if (budgetPlannerModal?.hidden === false) renderBudgetPlanner();
  if (ruleCheckerModal?.hidden === false) renderRuleChecker();
  if (draftOverviewModal?.hidden === false || activeHubView === 'draft') renderDraftOverview();
  if (activeHubView === 'matchday') renderMatchday();
  if (informationGraphModal?.hidden === false) {
    drawInformationGraph({ withData: informationGraphPoints.length > 0 });
  }
  if (activeHubView === 'tier-editor') renderTierEditor();
}

function isSupabaseConfigured() {
  const config = window.SUPABASE_CONFIG;
  return Boolean(
    config?.url
    && config?.publishableKey
    && /^https:\/\//.test(config.url)
    && config.publishableKey.startsWith('sb_publishable_'),
  );
}

function setAuthFeedback(message = '', state = '') {
  if (!authFeedback) return;
  authFeedback.textContent = message;
  if (state) authFeedback.dataset.state = state;
  else delete authFeedback.dataset.state;
}

function syncAuthUi() {
  const user = authSession?.user ?? null;
  const configured = isSupabaseConfigured();
  if (authConfigNotice) authConfigNotice.hidden = configured;
  if (authLoginForm) authLoginForm.hidden = !configured || Boolean(user) || authRecoveryMode;
  if (authAccount) authAccount.hidden = !user || authRecoveryMode;
  if (authPasswordForm) authPasswordForm.hidden = !authRecoveryMode;
  if (authAccountEmail) authAccountEmail.textContent = user?.email ?? '';
  if (authTitle) authTitle.textContent = authRecoveryMode ? 'Passwort festlegen' : user ? 'Konto' : 'Anmelden';

  if (authToggle) {
    const label = authToggle.querySelector('.theme-toggle-label');
    const icon = authToggle.querySelector('.auth-toggle-icon');
    if (label) label.textContent = user ? 'Konto' : 'Anmelden';
    if (icon) icon.textContent = user ? '🔓' : '🔒';
    authToggle.setAttribute('aria-label', user ? `Konto: ${user.email ?? 'angemeldet'}` : 'Anmelden');
  }
  if (tierEditorTile) tierEditorTile.hidden = !user;
  syncBattleModeToggle();
}

function applyAuthSession(session, { refresh = true } = {}) {
  const wasMode = activeBattleMode;
  authSession = session ?? null;
  activeBattleMode = authSession?.user ? preferredBattleMode : 'singles';
  syncAuthUi();
  if (!authSession?.user && activeHubView === 'tier-editor') {
    window.location.hash = '#home';
    renderHubView('home');
  }
  void syncSharedCostsForSession();
  if (refresh && wasMode !== activeBattleMode && pokemonByName.size) refreshCostDependentViews();
}

function rememberStaticPokemonCosts() {
  for (const pokemon of allPokemon) {
    if (Object.prototype.hasOwnProperty.call(pokemon, '_staticCost')) continue;
    pokemon._staticCost = pokemon.cost ?? null;
    pokemon._staticCostDbl = pokemon.cost_dbl ?? pokemon.cost ?? null;
    pokemon._staticCostDblPlaceholder = Boolean(pokemon.cost_dbl_is_placeholder);
  }
}

function restoreStaticPokemonCosts() {
  for (const pokemon of allPokemon) {
    if (!Object.prototype.hasOwnProperty.call(pokemon, '_staticCost')) continue;
    pokemon.cost = pokemon._staticCost;
    pokemon.cost_dbl = pokemon._staticCostDbl;
    pokemon.cost_dbl_is_placeholder = pokemon._staticCostDblPlaceholder;
  }
}

function applySharedCostRows() {
  restoreStaticPokemonCosts();
  for (const [name, row] of sharedCostRows) {
    const pokemon = pokemonByName.get(name);
    if (!pokemon) continue;
    pokemon.cost = row.cost ?? null;
    pokemon.cost_dbl = row.cost_dbl ?? null;
    pokemon.cost_dbl_is_placeholder = false;
    pokemon.untiered = row.cost === null && row.cost_dbl === null ? pokemon.untiered : false;
  }
}

async function syncSharedCostsForSession() {
  if (!allPokemon.length) return;
  rememberStaticPokemonCosts();
  tierEditorDraft = new Map();
  sharedCostsError = '';
  if (!authSession?.user || !supabaseClient) {
    sharedCostRows = new Map();
    sharedCostsReady = false;
    restoreStaticPokemonCosts();
    refreshCostDependentViews();
    return;
  }

  const { data, error } = await supabaseClient
    .from('pokemon_costs')
    .select('pokemon_name,cost,cost_dbl,updated_at,updated_by');
  if (error) {
    sharedCostsReady = false;
    sharedCostsError = error.message;
    setTierEditorStatus('Die Kostentabelle ist noch nicht eingerichtet. Führe zuerst das Supabase-SQL aus.', 'error');
    return;
  }
  sharedCostRows = new Map((data ?? []).map((row) => [row.pokemon_name, row]));
  sharedCostsReady = true;
  applySharedCostRows();
  refreshCostDependentViews();
  if (activeHubView === 'tier-editor') renderTierEditor();
}

function normalizeEditableCost(value) {
  if (value === '' || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 && number <= 32 ? number : NaN;
}

async function saveSharedCostChanges(changes) {
  if (!authSession?.user || !supabaseClient) throw new Error('Nicht angemeldet.');
  if (!changes.length) return [];
  const rows = changes.map((change) => ({
    pokemon_name: change.pokemon_name,
    cost: change.cost,
    cost_dbl: change.cost_dbl,
    updated_at: new Date().toISOString(),
    updated_by: authSession.user.id,
  }));
  const { data, error } = await supabaseClient
    .from('pokemon_costs')
    .upsert(rows, { onConflict: 'pokemon_name' })
    .select('pokemon_name,cost,cost_dbl,updated_at,updated_by');
  if (error) throw error;
  for (const row of data ?? rows) sharedCostRows.set(row.pokemon_name, row);
  applySharedCostRows();
  refreshCostDependentViews();
  return data ?? rows;
}

function openAuthModal() {
  if (!authModal) return;
  authModal.hidden = false;
  syncAuthUi();
  setAuthFeedback('');
  if (!authSession?.user && isSupabaseConfigured()) authEmail?.focus();
}

function closeAuthModal() {
  if (authModal) authModal.hidden = true;
  if (!authRecoveryMode) setAuthFeedback('');
}

function getAuthRedirectUrl() {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  return url.toString();
}

async function submitAuthLogin(event) {
  event.preventDefault();
  if (!supabaseClient) return;
  const email = authEmail?.value.trim() ?? '';
  const password = authPassword?.value ?? '';
  if (!email || !password) return;
  if (authLoginSubmit) authLoginSubmit.disabled = true;
  setAuthFeedback('Anmeldung läuft …');
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (authLoginSubmit) authLoginSubmit.disabled = false;
  if (error) {
    setAuthFeedback('Anmeldung fehlgeschlagen. Prüfe E-Mail und Passwort.', 'error');
    return;
  }
  if (authPassword) authPassword.value = '';
  setAuthFeedback('Erfolgreich angemeldet.', 'success');
}

async function requestPasswordReset() {
  if (!supabaseClient) return;
  const email = authEmail?.value.trim() ?? '';
  if (!email) {
    setAuthFeedback('Trage zuerst deine E-Mail-Adresse ein.', 'error');
    authEmail?.focus();
    return;
  }
  if (authForgotPassword) authForgotPassword.disabled = true;
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: getAuthRedirectUrl() });
  if (authForgotPassword) authForgotPassword.disabled = false;
  setAuthFeedback(
    error ? 'Die Passwort-E-Mail konnte nicht gesendet werden.' : 'Falls das Konto existiert, wurde eine Passwort-E-Mail gesendet.',
    error ? 'error' : 'success',
  );
}

function showPasswordChange() {
  authRecoveryMode = true;
  syncAuthUi();
  setAuthFeedback('');
  authNewPassword?.focus();
}

function cancelPasswordChange() {
  authRecoveryMode = false;
  if (authNewPassword) authNewPassword.value = '';
  if (authNewPasswordConfirm) authNewPasswordConfirm.value = '';
  syncAuthUi();
  setAuthFeedback('');
}

async function submitPasswordChange(event) {
  event.preventDefault();
  if (!supabaseClient) return;
  const password = authNewPassword?.value ?? '';
  const confirmation = authNewPasswordConfirm?.value ?? '';
  if (password.length < 8) {
    setAuthFeedback('Das Passwort muss mindestens 8 Zeichen lang sein.', 'error');
    return;
  }
  if (password !== confirmation) {
    setAuthFeedback('Die Passwörter stimmen nicht überein.', 'error');
    return;
  }
  const submit = authPasswordForm?.querySelector('[type="submit"]');
  if (submit) submit.disabled = true;
  const { error } = await supabaseClient.auth.updateUser({ password });
  if (submit) submit.disabled = false;
  if (error) {
    setAuthFeedback('Das Passwort konnte nicht gespeichert werden.', 'error');
    return;
  }
  authRecoveryMode = false;
  if (authNewPassword) authNewPassword.value = '';
  if (authNewPasswordConfirm) authNewPasswordConfirm.value = '';
  syncAuthUi();
  setAuthFeedback('Passwort gespeichert.', 'success');
}

async function signOutUser() {
  if (!supabaseClient) return;
  if (authSignOut) authSignOut.disabled = true;
  const { error } = await supabaseClient.auth.signOut();
  if (authSignOut) authSignOut.disabled = false;
  if (error) setAuthFeedback('Abmelden fehlgeschlagen.', 'error');
  else setAuthFeedback('Du bist abgemeldet.', 'success');
}

function initializeSupabaseAuth() {
  if (!isSupabaseConfigured() || !window.supabase?.createClient) {
    syncAuthUi();
    return;
  }
  const config = window.SUPABASE_CONFIG;
  supabaseClient = window.supabase.createClient(config.url, config.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  supabaseClient.auth.onAuthStateChange((event, session) => {
    authRecoveryMode = event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && authLinkTypeAtLoad === 'invite');
    applyAuthSession(session);
    if (authRecoveryMode) openAuthModal();
  });
}
const favoritePokemonStorageKey = 'schwalboga-favorite-pokemon';
let favoritePokemonNames = new Set();
const abilityOptions = (meta.abilityOptions ?? (meta.abilities ?? []).map((name) => ({ id: normalizeText(name), name })))
  .map((option) => ({ ...option, searchText: option.searchText ?? normalizeText(`${option.name} ${option.names?.de ?? ''}`) }));
const moveOptions = (meta.moves ?? [])
  .map((option) => ({ ...option, searchText: option.searchText ?? normalizeText(`${option.name} ${option.names?.de ?? ''}`) }));
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
const informationGraphMetrics = [
  { id: 'generation', label: 'Generation', getValue: (pokemon) => getPokemonGenerationNumber(pokemon) },
  { id: 'cost', label: 'Punktekosten', getValue: (pokemon) => getPokemonCost(pokemon) },
  { id: 'hp', label: 'KP', getValue: (pokemon) => pokemon.baseStats?.hp },
  { id: 'atk', label: 'Angriff', getValue: (pokemon) => pokemon.baseStats?.atk },
  { id: 'def', label: 'Verteidigung', getValue: (pokemon) => pokemon.baseStats?.def },
  { id: 'spa', label: 'Spez. Angriff', getValue: (pokemon) => pokemon.baseStats?.spa },
  { id: 'spd', label: 'Spez. Vert', getValue: (pokemon) => pokemon.baseStats?.spd },
  { id: 'spe', label: 'Initiative', getValue: (pokemon) => pokemon.baseStats?.spe },
  { id: 'usage', label: 'Nutzung', getValue: (pokemon) => getPokemonTotalUsageCount(pokemon) },
];
let informationGraphPoints = [];

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
const eastereggModeStorageKey = 'friendly-pokemon-easteregg-mode';
const missingSpriteFallbackPath = 'assets/Sub.png';
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
const eastereggMascotByMode = {
  eastereggs: '🥚',
  serious: '💼',
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
let activeDetailShinySprites = new Map();
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
let detailOneShotEffectsPlayed = new Set();
let defenseProfileTick = 0;
let currentTheme = 'light';
let currentEastereggMode = 'eastereggs';
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
let ruleCheckerShowdownMode = 'import';
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
let draftOverviewMode = 'teams';
let draftOverviewActivePlayerId = null;
let draftOffenseOwnPlayerId = null;
let draftOffenseOpponentPlayerId = null;
const draftOffenseSelections = new Map();
let shedinjaCheckState = {
  teraActive: false,
  teraType: 'Electric',
  playerId: null,
};
const evOptimizerStats = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
const evOptimizerNatureLabels = { atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe' };
let evOptimizerState = {
  pokemonName: '',
  level: 100,
  trickRoom: false,
  naturePlus: '',
  natureMinus: '',
  stats: Object.fromEntries(evOptimizerStats.map((stat) => [stat, { iv: 31, ev: 0 }])),
};
const outspeedStageMultipliers = {
  '-6': 2 / 8,
  '-5': 2 / 7,
  '-4': 2 / 6,
  '-3': 2 / 5,
  '-2': 2 / 4,
  '-1': 2 / 3,
  0: 2 / 2,
  1: 3 / 2,
  2: 4 / 2,
  3: 5 / 2,
  4: 6 / 2,
  5: 7 / 2,
  6: 8 / 2,
};
let outspeedHelperState = {
  mode: 'value',
  pokemonName: '',
  level: 100,
  iv: 31,
  ev: 0,
  nature: 'neutral',
  item: 'none',
  ownWeatherRush: false,
  ownTailwind: false,
  targetWeatherRush: false,
  targetTailwind: false,
  avoidPositiveNature: false,
  avoidScarf: false,
  targetValue: 100,
  targetPokemonName: '',
  targetLevel: 100,
  targetIv: 31,
  targetEv: 0,
  targetNature: 'neutral',
  targetItem: 'none',
  targetStage: 0,
  targetBaseSpeed: 100,
  targetPreset: 'positive',
};
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
let controlRailStickyThreshold = null;
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

function getLocalizedName(entry) {
  if (!entry) return '';
  if (activeNameLanguage === 'de' && entry.names?.de) return entry.names.de;
  return entry.name ?? '';
}

function getPokemonSearchText(pokemon) {
  return pokemon.searchText ?? normalizeText([
    pokemon.displayNumber,
    pokemon.name,
    pokemon.names?.de,
    pokemon.displayName,
    ...(pokemon.types ?? []),
    String(pokemon.num),
  ].join(' '));
}

function getMoveDisplayName(move) {
  return getLocalizedName(move);
}

function getAbilityDisplayName(ability) {
  return getLocalizedName(ability);
}

function getOptionDisplayName(option) {
  return getLocalizedName(option);
}

function getOptionSearchText(option) {
  return option.searchText ?? normalizeText(`${option.name} ${option.names?.de ?? ''}`);
}

function assignRandomPokemonSprites(entries) {
  return entries.map((entry) => {
    const spriteOptions = Array.isArray(entry.spriteOptions)
      ? [...new Set(entry.spriteOptions.filter((option) => typeof option === 'string' && option.trim()).map((option) => option.trim()))]
      : [];
    if (spriteOptions.length <= 1) return { ...entry };
    return {
      ...entry,
      spriteOptions,
      sprite: spriteOptions[Math.floor(Math.random() * spriteOptions.length)],
    };
  });
}

function updateLanguageToggle() {
  if (!languageToggle) return;
  const isGerman = activeNameLanguage === 'de';
  languageToggle.setAttribute('aria-pressed', isGerman ? 'true' : 'false');
  languageToggle.setAttribute('aria-label', isGerman ? 'Deutsche Namen aktiv' : 'Englische Namen aktiv');
  const label = languageToggle.querySelector('.theme-toggle-label');
  if (label) label.textContent = isGerman ? 'DE Namen' : 'EN Names';
}

function setNameLanguage(language) {
  activeNameLanguage = language === 'de' ? 'de' : 'en';
  localStorage.setItem(languageStorageKey, activeNameLanguage);
  updateLanguageToggle();
  applyAllFilters();
  if (!pokemonDetailModal?.hidden) refreshActivePokemonDetail();
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

function closeMobilePanels() {
  for (const panel of mobilePanels) {
    panel.classList.remove('is-open');
  }
  for (const trigger of mobilePanelTriggers) {
    trigger.setAttribute('aria-expanded', 'false');
  }
  if (mobilePanelBackdrop) mobilePanelBackdrop.hidden = true;
  document.body.classList.remove('mobile-panel-open');
}

function openMobilePanel(panelName) {
  let openedPanel = null;
  for (const panel of mobilePanels) {
    const isTarget = panel.dataset.mobilePanel === panelName;
    panel.classList.toggle('is-open', isTarget);
    if (isTarget) openedPanel = panel;
  }
  for (const trigger of mobilePanelTriggers) {
    trigger.setAttribute('aria-expanded', trigger.dataset.mobilePanelTrigger === panelName ? 'true' : 'false');
  }
  if (mobilePanelBackdrop) mobilePanelBackdrop.hidden = !openedPanel;
  document.body.classList.toggle('mobile-panel-open', Boolean(openedPanel));
  openedPanel?.querySelector('input, select, button, a')?.focus({ preventScroll: true });
}

function toggleMobilePanel(panelName) {
  const isOpen = mobilePanels.some((panel) => panel.dataset.mobilePanel === panelName && panel.classList.contains('is-open'));
  if (isOpen) closeMobilePanels();
  else openMobilePanel(panelName);
}

function setRailCollapsed(collapsed) {
  document.body.classList.toggle('controls-collapsed', collapsed);
  railToggle?.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  railToggle?.setAttribute('aria-label', collapsed ? 'Show controls' : 'Hide controls');
}

function toggleRailCollapsed() {
  setRailCollapsed(!document.body.classList.contains('controls-collapsed'));
}

function setControlRailPortaled(portaled) {
  if (!themeToggleWrap || !themeToggleWrapHome.parent) return;
  if (portaled) {
    if (themeToggleWrap.parentNode !== document.body) {
      document.body.append(themeToggleWrap);
    }
    return;
  }
  if (themeToggleWrap.parentNode === themeToggleWrapHome.parent) return;
  themeToggleWrapHome.parent.insertBefore(themeToggleWrap, themeToggleWrapHome.nextSibling);
}

function isMobileLayout() {
  return window.matchMedia('(max-width: 820px)').matches;
}

function getControlRailStickyThreshold() {
  const heading = document.querySelector('.section-heading');
  if (!heading) return 96;
  return heading.getBoundingClientRect().bottom + window.scrollY - 8;
}

function resetControlRailStickyThreshold() {
  const wasSticky = document.body.classList.contains('controls-sticky');
  if (wasSticky) document.body.classList.remove('controls-sticky');
  setControlRailPortaled(false);
  controlRailStickyThreshold = getControlRailStickyThreshold();
  setControlRailPortaled(wasSticky && !isMobileLayout());
  document.body.classList.toggle('controls-sticky', wasSticky);
}

function hasScrolledPastHeaderControls() {
  if (controlRailStickyThreshold === null) {
    controlRailStickyThreshold = getControlRailStickyThreshold();
  }
  return window.scrollY > controlRailStickyThreshold;
}

function updateControlRailVisibility() {
  const shouldPinControls = !isMobileLayout() && hasScrolledPastHeaderControls();
  setControlRailPortaled(shouldPinControls);
  document.body.classList.toggle('controls-sticky', shouldPinControls);
  if (!shouldPinControls && !isMobileLayout()) {
    setRailCollapsed(false);
  }
}

function syncResponsiveMode() {
  const previousMode = currentEastereggMode;
  if (isMobileLayout()) {
    setControlRailPortaled(false);
    applyEastereggMode('serious');
  } else {
    applyEastereggMode(getStoredEastereggMode());
  }
  if (previousMode !== currentEastereggMode) {
    applyAllFilters();
    if (!pokemonDetailModal?.hidden) refreshActivePokemonDetail();
  }
  updateControlRailVisibility();
  if (!isMobileLayout()) closeMobilePanels();
}

function isMegaPokemon(name) {
  return name.includes('Mega') && name !== 'Meganium' && name !== 'Yanmega';
}

function getAnimatedBorderVariant(name) {
  if (name === 'Groudon-Primal') return 'primal-groudon';
  if (name === 'Kyogre-Primal') return 'primal-kyogre';
  if (isMegaPokemon(name)) return 'mega';
  if (isGmaxPokemon(name)) return 'gmax';
  return null;
}

function isGmaxPokemon(name) {
  return name.endsWith('-Gmax');
}

function hasBoosterCondition(pokemon) {
  const cost = getPokemonCost(pokemon);
  if (cost === null || cost > 15) return false;
  const abilityNames = Object.values(pokemon.abilities ?? {});
  return abilityNames.includes('Quark Drive') || abilityNames.includes('Protosynthesis');
}

function hasBeastBoost(pokemon) {
  const abilityNames = Object.values(pokemon.abilities ?? {});
  return abilityNames.includes('Beast Boost');
}

function hasWormholeEffect(pokemon) {
  if (!areEasterEggsEnabled()) return false;
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
  if (!areEasterEggsEnabled()) return false;
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
  if (!areEasterEggsEnabled()) return null;
  const abilityNames = Object.values(pokemon.abilities ?? {});
  if (pokemon.name === 'Miraidon' || abilityNames.includes('Quark Drive')) return 'quark';
  if (pokemon.name === 'Koraidon' || abilityNames.includes('Protosynthesis')) return 'proto';
  return null;
}

function getPokemonAbilityNames(pokemon) {
  return (pokemon.abilityDetails ?? []).map((ability) => ability.name).filter(Boolean);
}

function getDetailWeatherBadgeConfig(pokemon) {
  const abilityNames = getPokemonAbilityNames(pokemon);
  if (abilityNames.includes('Drought') || pokemon.name === 'Groudon-Primal' || pokemon.name === 'Koraidon') {
    return { emoji: '\u2600\uFE0F', className: 'is-sun' };
  }
  if (abilityNames.includes('Drizzle') || pokemon.name === 'Kyogre-Primal') {
    return { emoji: '\uD83C\uDF27\uFE0F', className: 'is-rain' };
  }
  if (abilityNames.includes('Snow Warning') || abilityNames.includes('Hail Warning')) {
    return { emoji: '\u2744\uFE0F', className: 'is-snow' };
  }
  if (abilityNames.includes('Sand Stream')) {
    return { emoji: '\uD83C\uDF2A\uFE0F', className: 'is-sand' };
  }
  return null;
}

function createDetailWeatherBadgeElement(pokemon) {
  const config = getDetailWeatherBadgeConfig(pokemon);
  if (!config) return null;
  const badge = document.createElement('span');
  badge.className = `detail-title-weather-badge ${config.className}`;
  badge.textContent = config.emoji;
  badge.setAttribute('aria-hidden', 'true');
  return badge;
}

function getDetailSubtitle(pokemon) {
  if (pokemon.name.startsWith('Necrozma')) return 'UB Black';
  return detailSubtitleByName.get(pokemon.name) ?? null;
}

function getPokemonDisplayName(pokemon) {
  if (activeNameLanguage === 'de' && pokemon?.names?.de) return pokemon.names.de;
  return pokemon?.displayName ?? pokemon?.name ?? '';
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

  renderChangelogPanelsFromData();
}

function renderChangelogPanelsFromData() {
  const getChangelogDateKey = (group) => {
    const value = group?.date ?? group?.title ?? '';
    const timestamp = Date.parse(value);
    return Number.isNaN(timestamp) ? 0 : timestamp;
  };
  const newestChangelogFirst = (left, right) => getChangelogDateKey(right) - getChangelogDateKey(left);

  const tierPanel = document.querySelector('#changelog-panel-tier');
  if (tierPanel) {
    const formatCost = (value) => (value === 'â€”' || value === '—' ? '\u2014' : value);
    const entries = [...(changelogData.tier ?? [])].sort(newestChangelogFirst).map((group) => {
      const entry = document.createElement('article');
      entry.className = 'changelog-entry';
      const title = document.createElement('h3');
      title.textContent = group.title ?? '';
      const wrap = document.createElement('div');
      wrap.className = 'changelog-table-wrap';
      const table = document.createElement('table');
      table.className = 'changelog-table';
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
          ${(group.entries ?? []).map(([name, oldCost, newCost, reason]) => `
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
      return entry;
    });
    tierPanel.replaceChildren(...entries);
  }

  const sitePanel = document.querySelector('#changelog-panel-site');
  if (sitePanel) {
    const entries = [...(changelogData.site ?? [])].sort(newestChangelogFirst).map((group) => {
      const entry = document.createElement('article');
      entry.className = 'changelog-entry';
      const title = document.createElement('h3');
      title.textContent = group.title ?? 'Seiten Updates';
      const date = document.createElement('p');
      date.className = 'changelog-date';
      date.textContent = group.date ?? '';
      const list = document.createElement('ul');
      list.className = 'changelog-list';
      (group.items ?? []).forEach((text) => {
        const item = document.createElement('li');
        item.textContent = text;
        list.append(item);
      });
      entry.append(title, date, list);
      return entry;
    });
    sitePanel.replaceChildren(...entries);
  }
}
function getStoredTheme() {
  const storedTheme = window.localStorage.getItem(themeStorageKey);
  return storedTheme === 'dark' ? 'dark' : 'light';
}

function getStoredEastereggMode() {
  const storedMode = window.localStorage.getItem(eastereggModeStorageKey);
  return storedMode === 'serious' ? 'serious' : 'eastereggs';
}

function areEasterEggsEnabled() {
  return currentEastereggMode === 'eastereggs';
}

function applyTheme(theme) {
  currentTheme = theme === 'dark' ? 'dark' : 'light';
  document.body.classList.toggle('dark-mode', currentTheme === 'dark');
  themeToggle?.setAttribute('aria-pressed', String(currentTheme === 'dark'));
  themeToggle?.setAttribute('aria-label', currentTheme === 'dark' ? 'Dunkelmodus aktiv' : 'Hellmodus aktiv');
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

function toggleEastereggMode() {
  if (isMobileLayout()) {
    applyEastereggMode('serious');
    return;
  }
  const nextMode = currentEastereggMode === 'eastereggs' ? 'serious' : 'eastereggs';
  applyEastereggMode(nextMode);
  window.localStorage.setItem(eastereggModeStorageKey, nextMode);
  applyAllFilters();
  if (!pokemonDetailModal?.hidden) refreshActivePokemonDetail();
}

function loadFavoritePokemonNames() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(favoritePokemonStorageKey) ?? '[]');
    favoritePokemonNames = new Set(Array.isArray(parsed) ? parsed.filter((name) => typeof name === 'string') : []);
  } catch {
    favoritePokemonNames = new Set();
  }
}

function saveFavoritePokemonNames() {
  window.localStorage.setItem(favoritePokemonStorageKey, JSON.stringify([...favoritePokemonNames].sort()));
}

function isFavoritePokemon(pokemonOrName) {
  const name = typeof pokemonOrName === 'string' ? pokemonOrName : pokemonOrName?.name;
  return Boolean(name && favoritePokemonNames.has(name));
}

function toggleFavoritePokemon(pokemon) {
  if (!pokemon?.name) return;
  if (favoritePokemonNames.has(pokemon.name)) {
    favoritePokemonNames.delete(pokemon.name);
  } else {
    favoritePokemonNames.add(pokemon.name);
  }
  saveFavoritePokemonNames();
  applyAllFilters();
  if (!pokemonDetailModal?.hidden) refreshActivePokemonDetail();
}

function createFavoritePokemonButton(pokemon, className = 'pokemon-favorite-button') {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.dataset.favoritePokemon = pokemon.name;
  const active = isFavoritePokemon(pokemon);
  button.classList.toggle('is-active', active);
  button.setAttribute('aria-pressed', String(active));
  button.setAttribute('aria-label', `${getPokemonDisplayName(pokemon)} ${active ? 'aus Favoriten entfernen' : 'zu Favoriten hinzufügen'}`);
  button.title = active ? 'Favorit entfernen' : 'Favorit markieren';
  button.textContent = active ? '★' : '☆';
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavoritePokemon(pokemon);
  });
  button.addEventListener('keydown', (event) => {
    event.stopPropagation();
  });
  return button;
}

function updateScrollTopButtonVisibility() {
  if (!scrollTopButton) return;
  if (activeHubView !== 'pokedex') {
    scrollTopButton.hidden = true;
    return;
  }
  const threshold = Math.max(window.innerHeight, 700);
  scrollTopButton.hidden = window.scrollY <= threshold;
}

function getJumpRailButtonLabel(target) {
  return target.shortLabel ?? target.label ?? '';
}

function getJumpRailTargetsFromDividers() {
  const dividers = sortDirection.value === 'desc' ? [...pokedexGenerationDividers].reverse() : [...pokedexGenerationDividers];
  return dividers.map((divider) => {
    const pokemon = currentRenderedPokemon.find((entry) => isPokemonWithinDividerRange(entry.num, divider));
    if (!pokemon) return null;
    const element = pokedexGrid.querySelector(`[data-pokemon-name="${CSS.escape(pokemon.name)}"]`);
    if (!element) return null;
    return {
      element,
      label: divider.name,
      shortLabel: divider.name.replace('Generation ', 'Gen'),
    };
  }).filter(Boolean);
}

function getJumpRailValueLabel(pokemon, field) {
  if (!pokemon) return '';
  if (field === 'name') return (getPokemonDisplayName(pokemon).trim().charAt(0) || '?').toUpperCase();
  if (field === 'cost') return getPokemonCost(pokemon) === null ? '?' : `${getPokemonCost(pokemon)}`;
  if (field === 'usage') return `${getPokemonTotalUsageCount(pokemon)}`;
  if (field === 'favorite') return isFavoritePokemon(pokemon) ? '★' : '☆';
  if (field === 'dex') return `#${pokemon.num}`;
  if (['hp', 'atk', 'def', 'spa', 'spd', 'spe'].includes(field)) {
    return `${pokemon.baseStats?.[field] ?? '—'}`;
  }
  if (field === 'physical-bulk' || field === 'special-bulk') {
    const value = getSortValue(pokemon, field);
    return value === null || value === undefined ? '—' : `${value}`;
  }
  return getPokemonDisplayName(pokemon).slice(0, 3).toUpperCase();
}

function getJumpRailThresholds(field) {
  if (field === 'cost') return [5, 10, 15, 20, 25, 30];
  if (['hp', 'atk', 'def', 'spa', 'spd', 'spe'].includes(field)) {
    return [25, 50, 75, 100, 125, 150, 175, 200, 225, 250];
  }
  return [];
}

function getJumpRailTargetsFromPositions() {
  const field = sortField.value;
  const entries = currentRenderedPokemon;
  if (!entries.length) return [];
  const fractions = entries.length >= 40 ? [0.15, 0.35, 0.55, 0.75, 0.9] : [0.25, 0.5, 0.75];
  const usedIndexes = new Set();
  return fractions
    .map((fraction) => Math.min(entries.length - 1, Math.max(1, Math.floor((entries.length - 1) * fraction))))
    .filter((index) => {
      if (usedIndexes.has(index)) return false;
      usedIndexes.add(index);
      return true;
    })
    .map((index) => {
      const pokemon = entries[index];
      const element = pokedexGrid.querySelector(`[data-pokemon-name="${CSS.escape(pokemon.name)}"]`);
      if (!element) return null;
      return {
        element,
        label: getSortDisplayValue(pokemon, field) ?? getPokemonDisplayName(pokemon),
        shortLabel: getJumpRailValueLabel(pokemon, field),
      };
    })
    .filter(Boolean);
}

function getJumpRailTargetsFromPokemon() {
  const field = sortField.value;
  const entries = currentRenderedPokemon;
  if (!entries.length) return [];
  const thresholds = getJumpRailThresholds(field);
  if (!thresholds.length) return getJumpRailTargetsFromPositions();
  const direction = sortDirection.value === 'desc' ? 'desc' : 'asc';
  const usedNames = new Set();
  return thresholds.map((threshold) => {
    const pokemon = entries.find((entry) => {
      if (usedNames.has(entry.name)) return false;
      const value = getSortValue(entry, field);
      if (value === null || value === undefined) return false;
      return direction === 'desc' ? Number(value) <= threshold : Number(value) >= threshold;
    });
    if (!pokemon) return null;
    usedNames.add(pokemon.name);
    const element = pokedexGrid.querySelector(`[data-pokemon-name="${CSS.escape(pokemon.name)}"]`);
    if (!element) return null;
    return {
      element,
      label: getSortDisplayValue(pokemon, field) ?? getPokemonDisplayName(pokemon),
      shortLabel: `${threshold}`,
    };
  }).filter(Boolean);
}

function getJumpRailTargets() {
  if (!pokedexGrid || currentRenderedPokemon.length < 8) return [];
  if (sortField.value === 'usage' || sortField.value === 'favorite') return [];
  if (sortField.value === 'dex') {
    const dividerTargets = getJumpRailTargetsFromDividers();
    if (dividerTargets.length) return dividerTargets;
  }
  return getJumpRailTargetsFromPokemon();
}

function jumpToRailTarget(target) {
  if (!target?.element) return;
  target.element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
}

function renderJumpRail() {
  if (!jumpRail) return;
  jumpRail.innerHTML = '';
  if (activeHubView !== 'pokedex') {
    jumpRail.hidden = true;
    return;
  }
  const targets = getJumpRailTargets();
  jumpRail.hidden = !targets.length;
  if (!targets.length) return;
  const fragment = document.createDocumentFragment();
  for (const target of targets) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'scroll-top-button jump-rail-button';
    button.textContent = getJumpRailButtonLabel(target);
    button.title = target.label;
    button.setAttribute('aria-label', target.label);
    button.addEventListener('click', () => jumpToRailTarget(target));
    fragment.append(button);
  }
  jumpRail.append(fragment);
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
    tera: getPokemonCost(pokemon) !== null && getPokemonCost(pokemon) <= 5,
    z: !mega && getPokemonCost(pokemon) !== null && getPokemonCost(pokemon) <= 10,
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
  if (format === 'free') return Infinity;
  if (format === 'normal') return 21;
  if (format === 'low-power') return 13;
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
    if (!getPokemonSearchText(pokemon).includes(normalizeText(appliedAdvancedSearch.name))) return false;
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
      if (field === 'ability') {
        return evaluateExpertListExpression((pokemon.abilityDetails ?? []).flatMap((ability) => [ability.name, ability.names?.de].filter(Boolean)), operator, expression);
      }
      if (field === 'move') {
        return evaluateExpertListExpression(getLegalPokemonMoveRows(pokemon).flatMap((move) => [move.name, move.names?.de].filter(Boolean)), operator, expression);
      }
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
        ? getPokemonCost(pokemon)
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
      if (normalizedValue === 'free' || normalizedValue === 'freies') return true;
      if (normalizedValue === 'normal') return getPokemonCost(pokemon) !== null && getPokemonCost(pokemon) < getFormatThreshold('normal');
      if (normalizedValue === 'low power' || normalizedValue === 'low-power') return getPokemonCost(pokemon) !== null && getPokemonCost(pokemon) < getFormatThreshold('low-power');
      return false;
    };
  }

  if (field === 'name') {
    const matcher = createExpertValueMatcher(operator, value);
    return (pokemon) => [pokemon.name, pokemon.names?.de].filter(Boolean).some((name) => matcher(name));
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
  if (query && !getPokemonSearchText(pokemon).includes(query)) return false;
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
  if (field === 'cost') return getPokemonCost(pokemon);
  if (field === 'usage') return getPokemonTotalUsageCount(pokemon);
  if (field === 'favorite') return isFavoritePokemon(pokemon) ? 0 : 1;
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
  if (field === 'usage') return `Nutzung: ${getPokemonTotalUsageCount(pokemon)}`;
  if (field === 'favorite') return isFavoritePokemon(pokemon) ? 'Favorit' : null;
  if (field === 'cost') return getPokemonCost(pokemon) === null ? 'Kosten: —' : `Kosten: ${getPokemonCost(pokemon)}`;
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
  const query = normalizeText(searchInput.value);
  const format = formatFilter.value;
  const triStates = getActiveTriStates();
  const showAll = Boolean(showAllPokemon?.checked);
  const allowHiddenLinkMatches = hasActiveSearchCriteria(query, triStates);

  const filtered = allPokemon
    .filter((pokemon) => showAll || !pokemon.hidden)
    .filter((pokemon) => {
      if (matchesPokemonFilters(pokemon, query, triStates)) return true;
      if (showAll || !allowHiddenLinkMatches) return false;

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

function applyCostStyling(costElement, cost, card, format = 'normal') {
  costElement.className = 'pokemon-cost';
  if (format !== 'free' && card.classList.contains('is-impossible')) {
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
  return sortField.value === 'dex' && !hideDividers.checked;
}

function getGenerationDividerMap() {
  if (!shouldRenderGenerationDividers()) return [];
  const dividers = [...pokedexGenerationDividers];
  return sortDirection.value === 'desc' ? dividers.reverse() : dividers;
}

function isPokemonWithinDividerRange(pokemonNum, divider) {
  return pokemonNum >= divider.startNum && pokemonNum <= divider.endNum;
}

function getDividerTerminalName(divider) {
  return sortDirection.value === 'desc' ? divider.start : divider.end;
}

function shouldInsertDividerBeforePokemon(pokemonNum, divider) {
  if (sortDirection.value === 'desc') return pokemonNum <= divider.endNum;
  return pokemonNum >= divider.startNum;
}

function createGenerationDividerCard(divider) {
  const card = document.createElement('article');
  card.className = `pokemon-card pokemon-divider-card ${divider.themeClass}`;
  card.dataset.dividerId = divider.id;
  card.dataset.jumpLabel = divider.name;
  card.dataset.jumpShortLabel = divider.name.replace('Generation ', 'Gen');
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
  const cost = getPokemonCost(pokemon);
  return (format !== 'free' && pokemon.impossible) || pokemon.unreleased || (cost !== null && cost > getFormatThreshold(format));
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
  cell.dataset.pokemonName = pokemon.name;
  if (isIllegal) cell.classList.add('is-illegal');
  if (flags.mega && !isIllegal) cell.classList.add('is-mega');
  if (sortField.value === 'usage' && getPokemonTotalUsageCount(pokemon) === 0) cell.classList.add('is-unused');
  if (isFavoritePokemon(pokemon)) cell.classList.add('is-favorite');
  cell.tabIndex = 0;
  cell.setAttribute('role', 'button');
  cell.setAttribute('aria-label', `${getPokemonDisplayName(pokemon)} details`);

  const cost = document.createElement('span');
  cost.className = 'pokemon-simple-cost';
  cost.textContent = getSimpleCostLabel(getPokemonCost(pokemon));
  markPlaceholderCost(cost, pokemon);

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

  const favoriteButton = createFavoritePokemonButton(pokemon, 'pokemon-favorite-button pokemon-simple-favorite-button');
  cell.append(cost, name, badges, favoriteButton);
  addSimpleCellOpenHandlers(cell, pokemon);
  return cell;
}

function createSimpleGenerationDividerCell(divider) {
  const cell = document.createElement('button');
  cell.className = `pokemon-simple-divider simple-generation-divider ${divider.themeClass}`;
  cell.type = 'button';
  cell.dataset.dividerId = divider.id;
  cell.dataset.jumpLabel = divider.name;
  cell.dataset.jumpShortLabel = divider.name.replace('Generation ', 'Gen');
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
    while (dividerIndex < dividers.length && shouldInsertDividerBeforePokemon(pokemonNum, dividers[dividerIndex])) {
      const divider = dividers[dividerIndex];
      fragment.append(createSimpleGenerationDividerCell(divider));
      activeCollapsedDivider = collapsedDividerIds.has(divider.id) ? divider : activeCollapsedDivider;
      dividerIndex += 1;
    }
  };

  for (const pokemon of pokemonList) {
    appendGenerationDividerIfNeeded(pokemon.num);
    if (activeCollapsedDivider) {
      if (!isPokemonWithinDividerRange(pokemon.num, activeCollapsedDivider)) {
        activeCollapsedDivider = null;
      } else {
        if (pokemon.name === getDividerTerminalName(activeCollapsedDivider)) activeCollapsedDivider = null;
        continue;
      }
    }

    const costKey = getSimpleCostLabel(getPokemonCost(pokemon));
    if (showCostDividers && costKey !== lastCostKey) {
      fragment.append(createSimpleCostDividerCell(getPokemonCost(pokemon)));
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

  if (pokemon.impossible && format !== 'free') card.classList.add('is-impossible');
  if (pokemon.unreleased) card.classList.add('is-unreleased');
  if (sortField.value === 'usage' && getPokemonTotalUsageCount(pokemon) === 0) card.classList.add('is-unused');
  if (isFavoritePokemon(pokemon)) card.classList.add('is-favorite');
  const animatedBorderVariant = getAnimatedBorderVariant(pokemon.name);
  if (animatedBorderVariant === 'mega') card.classList.add('has-mega-border');
  if (animatedBorderVariant === 'gmax') card.classList.add('has-gmax-border');
  if (animatedBorderVariant === 'primal-groudon') card.classList.add('has-primal-groudon-border');
  if (animatedBorderVariant === 'primal-kyogre') card.classList.add('has-primal-kyogre-border');
  if (hasWormholeEffect(pokemon)) card.classList.add('has-wormhole-effect');
  const borderColors = getTypeBorderColors(pokemon);
  card.style.setProperty('--card-type-primary', borderColors.primary);
  card.style.setProperty('--card-type-secondary', borderColors.secondary);
  card.tabIndex = 0;
  card.dataset.pokemonName = pokemon.name;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${getPokemonDisplayName(pokemon)} details`);
  number.textContent = pokemon.displayNumber;
  applyCostStyling(cost, getPokemonCost(pokemon), card, format);
  markPlaceholderCost(cost, pokemon);
  if (getPokemonCost(pokemon) !== null && getPokemonCost(pokemon) > formatThreshold) card.classList.add('is-over-format');
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
  card.append(createFavoritePokemonButton(pokemon));

  setPokemonSpriteWithFallback(sprite, pokemon, pokemon.sprite, `${getPokemonDisplayName(pokemon)} sprite`, card);
  applySpriteCheckerOverlay(card, pokemon, pokemon.sprite);

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
    currentRenderedPokemon = [];
    const emptyState = document.createElement('p');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No Pokemon match that search yet.';
    pokedexGrid.append(emptyState);
    updateResultsCount(0);
    renderJumpRail();
    return;
  }

  if (simpleViewToggle.checked) {
    renderSimplePokemonList(pokemonList, format);
    renderJumpRail();
    return;
  }

  const fragment = document.createDocumentFragment();
  const visiblePokemon = [];
  let activeCollapsedDivider = null;
  let dividerIndex = 0;

  const appendDividerIfNeeded = (pokemonNum) => {
    while (dividerIndex < dividers.length && shouldInsertDividerBeforePokemon(pokemonNum, dividers[dividerIndex])) {
      const divider = dividers[dividerIndex];
      fragment.append(createGenerationDividerCard(divider));
      activeCollapsedDivider = collapsedDividerIds.has(divider.id) ? divider : activeCollapsedDivider;
      dividerIndex += 1;
    }
  };

  for (const pokemon of pokemonList) {
    appendDividerIfNeeded(pokemon.num);
    if (activeCollapsedDivider) {
      if (!isPokemonWithinDividerRange(pokemon.num, activeCollapsedDivider)) {
        activeCollapsedDivider = null;
      } else {
        if (pokemon.name === getDividerTerminalName(activeCollapsedDivider)) activeCollapsedDivider = null;
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
  renderJumpRail();
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
  const pushChip = (text, onClick = null) => chips.push({ text, onClick });

  pushChip(`Format: ${formatFilter.options[formatFilter.selectedIndex].text}`);
  pushChip(`Sortierung: ${sortField.options[sortField.selectedIndex].text} (${sortDirection.value === 'desc' ? 'Absteigend' : 'Aufsteigend'})`);
  if (sortFieldSecondary?.value) {
    pushChip(`Sekundär: ${sortFieldSecondary.options[sortFieldSecondary.selectedIndex].text} (${sortDirectionSecondary?.value === 'desc' ? 'Absteigend' : 'Aufsteigend'})`);
  }
  if (searchInput.value.trim()) pushChip(`Suche: ${searchInput.value.trim()}`);
  if (appliedAdvancedSearch.name) pushChip(`Name: ${appliedAdvancedSearch.name}`);
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
  if (appliedAdvancedSearch.speedControl.enabled) pushChip(`Speed Control: ${speedControlMode.options[speedControlMode.selectedIndex].text}`);
  if (appliedAdvancedSearch.hazards.enabled) pushChip(`Hazards: ${hazardsMode.options[hazardsMode.selectedIndex].text}`);
  if (appliedAdvancedSearch.pivot.enabled) pushChip(`Pivot: ${pivotMode.options[pivotMode.selectedIndex].text}`);
  for (const criterion of appliedAdvancedSearch.defensiveCoverage) {
    const modeLabel = criterion.mode === 'resistant' ? 'Resistent' : criterion.mode === 'neutral' ? 'Nicht Schwach' : 'Immun';
    pushChip(`Defensiv: ${criterion.type} ${modeLabel}`);
  }
  if (triStates.z !== 'any') pushChip(`Z-Captain: ${triStates.z === 'include' ? 'Ja' : 'Nein'}`);
  if (triStates.tera !== 'any') pushChip(`Tera-Captain: ${triStates.tera === 'include' ? 'Ja' : 'Nein'}`);
  if (triStates.mega !== 'any') pushChip(`Mega: ${triStates.mega === 'include' ? 'Ja' : 'Nein'}`);
  if (triStates.gmax !== 'any') pushChip(`GMAX: ${triStates.gmax === 'include' ? 'Ja' : 'Nein'}`);
  if (activeExpertSearch.raw) pushChip(`Expertensuche: ${activeExpertSearch.raw}`);
  if (showAllPokemon?.checked) pushChip('Zeige alles', () => { showAllPokemon.checked = false; applyAllFilters(); });
  if (hideUnreleased.checked) pushChip('Hide Unreleased', () => { hideUnreleased.checked = false; applyAllFilters(); });
  if (hideImpossible.checked) pushChip('Hide Impossible', () => { hideImpossible.checked = false; applyAllFilters(); });
  if (hideUntiered.checked) pushChip('Hide Untiered', () => { hideUntiered.checked = false; applyAllFilters(); });
  if (hideDividers.checked) pushChip('Hide Dividers', () => { hideDividers.checked = false; applyAllFilters(); });
  if (simpleViewToggle.checked) pushChip('Einfache Ansicht');

  searchSummary.innerHTML = '';
  const firstChipText = typeof chips[0] === 'string' ? chips[0] : chips[0]?.text;
  searchSummary.hidden = chips.length === 1 && firstChipText?.startsWith('Format:') && formatFilter.value === 'normal';
  if (searchSummary.hidden) return;

  for (const chipEntry of chips) {
    const chipText = typeof chipEntry === 'string' ? chipEntry : chipEntry.text;
    const chipAction = typeof chipEntry === 'string' ? null : chipEntry.onClick;
    const chip = document.createElement(chipAction ? 'button' : 'span');
    chip.className = 'summary-chip';
    if (chipAction) {
      chip.type = 'button';
      chip.classList.add('is-interactive');
      chip.addEventListener('click', chipAction);
    }
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
    image.src = missingSpriteFallbackPath;
  };
}

const spriteOutlinePalettes = {
  'Kyogre-Primal': ['#dffbff', '#8af1ff', '#38cfff', '#c7fbff', '#5de7ff', '#f3ffff'],
  'Groudon-Primal': ['#fff08a', '#ffc83d', '#ff9a1f', '#ffe36b', '#ffb22e', '#fff7b5'],
  'Necrozma-Ultra': ['#fffbd1', '#fff27a', '#ffe64a', '#fff8a8', '#ffd93a', '#fffff0'],
  'Eternatus-Eternamax': ['#2a063f', '#5d1595', '#ff1f3d', '#15001f', '#b00835', '#ff5a67'],
};

function createSpriteOutlineImage(spriteUrl, label, palette = null, isAnimated = false) {
  const image = document.createElement('img');
  image.className = `sprite-outline-image${isAnimated ? ' is-pulsing-outline' : ''}`;
  image.src = spriteUrl;
  image.alt = '';
  image.loading = 'lazy';
  image.setAttribute('aria-hidden', 'true');
  image.title = label;
  if (palette) {
    palette.forEach((color, index) => {
      image.style.setProperty(`--sprite-outline-${index + 1}`, color);
    });
  }
  image.onerror = () => {
    image.remove();
  };
  return image;
}

function clearSpriteOutline(decorationTarget) {
  decorationTarget?.querySelectorAll(':scope > .sprite-outline-image, :scope > .mega-fallback-border-image, :scope > .mega-fallback-border-canvas').forEach((node) => node.remove());
}

function applySpriteOutline(decorationTarget, spriteUrl, label, palette = null, className = 'has-sprite-outline', isAnimated = false) {
  if (!decorationTarget || typeof spriteUrl !== 'string' || !spriteUrl) return;
  decorationTarget.classList.add(className);
  clearSpriteOutline(decorationTarget);
  decorationTarget.append(createSpriteOutlineImage(spriteUrl, label, palette, isAnimated));
}

function getSpecialSpriteOutlinePalette(pokemon) {
  return spriteOutlinePalettes[pokemon?.name] ?? null;
}

function applySpecialSpriteOutline(decorationTarget, pokemon, spriteUrl, label = `${pokemon?.name ?? 'Pokemon'} sprite`) {
  const palette = getSpecialSpriteOutlinePalette(pokemon);
  if (!palette) return;
  applySpriteOutline(decorationTarget, spriteUrl, label, palette, 'has-sprite-outline', true);
}

function getMegaFallbackPokemon(pokemon) {
  if (!pokemon) return null;
  if (pokemon.name === 'Zygarde-Mega') return pokemonByName.get('Zygarde-Complete') ?? getPreMegaPokemon(pokemon);
  return getPreMegaPokemon(pokemon);
}

function applyMegaFallbackSprite(image, pokemon, decorationTarget, label = `${pokemon?.name ?? 'Pokemon'} sprite`) {
  if (!image || !pokemon) return false;
  const preMegaPokemon = getMegaFallbackPokemon(pokemon);
  if (!preMegaPokemon?.sprite) return false;

  image.onerror = () => {
    image.onerror = null;
    image.src = missingSpriteFallbackPath;
  };
  image.src = preMegaPokemon.sprite;
  image.alt = `${getPokemonDisplayName(pokemon)} sprite, using ${getPokemonDisplayName(preMegaPokemon)} fallback`;
  applySpriteOutline(decorationTarget, preMegaPokemon.sprite, image.alt, null, 'has-mega-sprite-fallback');
  return true;
}

function setPokemonSpriteWithFallback(image, pokemon, spriteUrl = pokemon?.sprite, label = `${pokemon?.name ?? 'Pokemon'} sprite`, decorationTarget = image?.parentElement) {
  image.onerror = () => {
    image.onerror = null;
    if (applyMegaFallbackSprite(image, pokemon, decorationTarget, label)) return;
    image.src = missingSpriteFallbackPath;
  };
  image.src = spriteUrl;
  image.alt = label;
  applySpecialSpriteOutline(decorationTarget, pokemon, spriteUrl, label);
}

const spriteCheckerPalettes = {
  'Terapagos-Stellar': ['#ff4fb8', '#58d7ff', '#ffe56f', '#74ff8a', '#9a66ff', '#ff7b4d', '#54ffd4', '#f960ff'],
  'Ogerpon-Hearthflame-Tera': ['#ff2f1f', '#ff6b21', '#ff9d2e', '#d71912', '#ff4d2f', '#ffbd4a'],
  'Ogerpon-Cornerstone-Tera': ['#4a2a16', '#6f4724', '#8a6237', '#a98353', '#5b3b22', '#c09a62'],
  'Ogerpon-Wellspring-Tera': ['#136dff', '#20cfff', '#7aefff', '#0d8ed8', '#2aa7ff', '#c4fbff'],
  'Ogerpon-Teal-Tera': ['#1ab36f', '#16d0a0', '#67f2c0', '#0a866f', '#36c978', '#a5ffe3'],
};

function createSpriteCheckerCanvas(spriteUrl, colors) {
  const canvas = document.createElement('canvas');
  canvas.className = 'sprite-checker-overlay-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const image = new Image();
  image.onload = () => {
    const width = image.naturalWidth || 96;
    const height = image.naturalHeight || 96;
    canvas.width = width;
    canvas.height = height;
    canvas.dataset.spriteCheckerReady = 'true';

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const squareSize = Math.max(4, Math.round(width / 8));
    const diagonal = Math.ceil(Math.sqrt(width * width + height * height));
    const gridStart = -Math.ceil(diagonal / 2) - squareSize;
    const gridEnd = Math.ceil(diagonal / 2) + squareSize;

    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(Math.PI / 4);
      for (let y = gridStart; y < gridEnd; y += squareSize) {
        for (let x = gridStart; x < gridEnd; x += squareSize) {
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
          ctx.fillRect(x, y, squareSize, squareSize);
        }
      }
      ctx.restore();
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(image, 0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
    };

    paint();
    const schedulePaint = () => {
      const delay = Math.random() < 0.18
        ? 120 + Math.random() * 180
        : 520 + Math.random() * 980;
      setTimeout(() => {
        if (!canvas.isConnected) return;
        paint();
        schedulePaint();
      }, delay);
    };
    schedulePaint();
  };
  image.onerror = () => {
    canvas.remove();
  };
  image.src = spriteUrl;

  return canvas;
}

function getSpriteCheckerPalette(pokemon) {
  return spriteCheckerPalettes[pokemon?.name] ?? null;
}

function applySpriteCheckerOverlay(target, pokemon, spriteUrl) {
  const palette = getSpriteCheckerPalette(pokemon);
  if (!target || !palette) return;
  if (typeof spriteUrl !== 'string' || !spriteUrl) return;
  target.classList.add('has-sprite-checker-overlay');
  target.querySelectorAll(':scope > .sprite-checker-overlay-canvas, :scope > .stellar-sprite-glow-canvas').forEach((node) => node.remove());
  target.append(createSpriteCheckerCanvas(spriteUrl, palette));
}

function getTeraSpritePalette(teraType) {
  if (teraType === 'Stellar') return spriteCheckerPalettes['Terapagos-Stellar'];
  return shedinjaTeraPalettes[teraType] ?? shedinjaTeraPalettes.Electric;
}

function appendTeraSpriteCheckerOverlay(target, spriteUrl, teraType) {
  if (!target || !teraType || typeof spriteUrl !== 'string' || !spriteUrl) return;
  const palette = getTeraSpritePalette(teraType);
  if (!palette) return;
  target.classList.add('has-sprite-checker-overlay', 'has-tera-sprite-checker');
  target.querySelectorAll(':scope > .tera-sprite-checker-canvas').forEach((node) => node.remove());
  const canvas = createSpriteCheckerCanvas(spriteUrl, palette);
  canvas.classList.add('tera-sprite-checker-canvas');
  canvas.title = `Tera ${typeLabelsDe[teraType] ?? teraType}`;
  target.append(canvas);
}

function getShinySpriteUrl(spriteUrl) {
  if (typeof spriteUrl !== 'string') return null;
  const marker = '/sprites/gen5/';
  if (!spriteUrl.includes(marker)) return null;
  return spriteUrl.replace(marker, '/sprites/gen5-shiny/');
}

function getDetailShinyChance(pokemon) {
  return pokemon?.name === 'Schwalboga' ? 0.25 : 1 / 4096;
}

function prepareDetailShinySprites(pokemon) {
  activeDetailShinySprites = new Map();
  if (!pokemon || Math.random() >= getDetailShinyChance(pokemon)) return;
  for (const form of getLinkedTopForms(pokemon)) {
    const shinySprite = getShinySpriteUrl(form.sprite);
    if (shinySprite) activeDetailShinySprites.set(form.name, shinySprite);
  }
}

function getDetailSpriteData(form) {
  const shinySprite = activeDetailShinySprites.get(form.name);
  return {
    sprite: shinySprite ?? form.sprite,
    isShiny: Boolean(shinySprite),
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
  if (!areEasterEggsEnabled()) return;
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
  if (!areEasterEggsEnabled()) {
    setSpriteWithFallback(image, targetPokemon.sprite, `${targetPokemon.name} sprite`);
    return;
  }
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
  if (!areEasterEggsEnabled()) {
    setSpriteWithFallback(image, targetPokemon.sprite, `${targetPokemon.name} sprite`);
    return;
  }
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
    .filter((pokemon) => getPokemonSearchText(pokemon).includes(normalizedQuery))
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
  applyCostStyling(cost, getPokemonCost(pokemon), card);
  markPlaceholderCost(cost, pokemon);
  badgeStack.replaceChildren(...buildFormBadges(pokemon).map(createFormBadgeNode));
  setPokemonSpriteWithFallback(sprite, pokemon, pokemon.sprite, `${pokemon.name} sprite`, card);
  for (const type of pokemon.types ?? []) {
    const icon = document.createElement('img');
    icon.src = typeIcons[type] ?? '';
    icon.alt = type;
    typeList.append(icon);
  }
  name.textContent = getPokemonDisplayName(pokemon);
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
    const candidateCost = team.reduce((total, pokemon) => total + (getPokemonCost(pokemon) ?? 99), 0);
    const bestCost = best.team.reduce((total, pokemon) => total + (getPokemonCost(pokemon) ?? 99), 0);
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
    totalCost: team.reduce((total, pokemon) => total + (getPokemonCost(pokemon) ?? 99), 0),
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
  label.textContent = getPokemonDisplayName(pokemon);
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
      button.textContent = getPokemonDisplayName(pokemon);
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

function createSpriteLinkButton(entry) {
  const pokemon = entry?.pokemon ?? entry;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'detail-sprite-link';
  if (entry?.spriteEmoji) {
    const emoji = document.createElement('span');
    emoji.className = `detail-sprite-link-emoji${entry?.emojiClass ? ` ${entry.emojiClass}` : ''}`;
    emoji.textContent = entry.spriteEmoji;
    button.append(emoji);
  } else {
    const image = document.createElement('img');
    setSpriteWithFallback(image, pokemon.sprite, `${pokemon.name} sprite`);
    button.append(image);
  }
  const label = document.createElement('span');
  label.textContent = entry?.nameOverride ?? pokemon.name;
  button.append(label);
  button.addEventListener('click', () => openPokemonDetail(pokemon.name));
  return button;
}

function renderSpriteLinkSection(container, pokemonList, emptyMessage) {
  container.innerHTML = '';
  if (!pokemonList.length) {
    renderEmptyDetailState(container, emptyMessage);
    return;
  }
  for (const entry of pokemonList) {
    container.append(createSpriteLinkButton(entry));
  }
}

function applyEastereggMode(mode) {
  currentEastereggMode = mode === 'serious' ? 'serious' : 'eastereggs';
  document.body.classList.toggle('serious-mode', currentEastereggMode === 'serious');
  eastereggToggle?.setAttribute('aria-pressed', String(currentEastereggMode === 'eastereggs'));
  eastereggToggle?.setAttribute('aria-label', currentEastereggMode === 'eastereggs' ? 'Eastereggs aktiv' : 'Eastereggs aus');
  if (eastereggToggle) {
    const label = eastereggToggle.querySelector('.theme-toggle-label');
    if (label) label.textContent = currentEastereggMode === 'eastereggs' ? 'Eastereggs' : 'Seriös';
  }
  if (eastereggToggleMascot) {
    eastereggToggleMascot.textContent = eastereggMascotByMode[currentEastereggMode];
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
      cost.textContent = `${getPokemonCost(entry.pokemon) ?? '—'} Punkte`;
      markPlaceholderCost(cost, entry.pokemon);
    titleRow.append(title, cost);

    const typeRow = document.createElement('div');
    typeRow.className = 'detail-similar-card-types';
    const meta = document.createElement('div');
    const costLine = document.createElement('span');
    costLine.textContent = `Kosten: ${getPokemonCost(entry.pokemon) ?? '—'}`;
    markPlaceholderCost(costLine, entry.pokemon);
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
    .filter((pokemon) => getPokemonSearchText(pokemon).includes(query))
    .slice(0, 12);
}

function renderReplacementPickerSuggestions() {
  const matches = getReplacementPickerMatches();
  replacementPickerSuggestions.innerHTML = '';
  for (const pokemon of matches) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'suggestion-item';
    button.textContent = getPokemonDisplayName(pokemon);
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

function createNode(tag, className = '', text = '') {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== '') node.textContent = text;
  return node;
}

function getHubViewFromHash() {
  if (new URLSearchParams(window.location.search).has('pokemon')) return 'pokedex';
  const key = (window.location.hash || '#home').replace('#', '') || 'home';
  if (key === 'regelset') return 'ruleset';
  if (key === 'spieler') return 'teams';
  return ['home', 'pokedex', 'ruleset', 'teams', 'draft', 'draft-room', 'games', 'matchday', 'replays', 'tier-editor'].includes(key) ? key : 'home';
}

const matchdayRounds = [
  {
    label: 'Round 4',
    matches: [
      ['Stefan', 'Marc'],
      ['Andre', 'Jannik'],
      ['Tobi', 'Niklas'],
      ['Robin', 'Hans'],
    ],
  },
  {
    label: 'Round 5',
    matches: [
      ['Stefan', 'Andre'],
      ['Marc', 'Tobi'],
      ['Jannik', 'Robin'],
      ['Niklas', 'Hans'],
    ],
  },
  {
    label: 'Round 6',
    matches: [
      ['Stefan', 'Tobi'],
      ['Marc', 'Hans'],
      ['Andre', 'Robin'],
      ['Jannik', 'Niklas'],
    ],
  },
  {
    label: 'Round 7',
    matches: [
      ['Stefan', 'Niklas'],
      ['Marc', 'Jannik'],
      ['Andre', 'Hans'],
      ['Tobi', 'Robin'],
    ],
  },
];

const postponedMatchdayRounds = [
  { label: 'Round 2', matches: [['Hans', 'Jannik'], ['Marc', 'Niklas']] },
  { label: 'Round 3', matches: [['Stefan', 'Jannik'], ['Robin', 'Niklas'], ['Hans', 'Tobi'], ['Marc', 'Andre']] },
];

const finishedMatchdayMatches = [
  {
    players: ['Stefan', 'Hans'], winner: 'Stefan', score: '4:0',
    teams: [
      [['Virizion', true], ['Ampharos-Mega', false], ['Nidoking', true], ['Bronzong', false], ['Cofagrigus', false], ['Slurpuff', false]],
      [['Drednaw', true], ['Kilowattrel', true], ['Mimikyu', true], ['Bombirdier', true], ['Centiskorch', true], ['Breloom', true]],
    ],
  },
  {
    players: ['Marc', 'Robin'], winner: 'Marc', score: '2:0',
    teams: [
      [['Bisharp', false], ['Sableye', true], ['Vikavolt', true], ['Seismitoad', true], ['Medicham', false], ['Coalossal', true]],
      [['Forretress', true], ['Magmar', true], ['Tauros-Paldea-Aqua', true], ['Nidoqueen', true], ['Dracozolt', true], ['Articuno-Galar', true]],
    ],
  },
  {
    players: ['Andre', 'Niklas'], winner: 'Andre', score: '2:0',
    teams: [
      [['Tapu Bulu', false], ['Muk-Alola', true], ['Maushold', false], ['Golisopod', true], ['Magneton', true], ['Aurorus', true]],
      [['Toxicroak', true], ['Krookodile', true], ['Jellicent', true], ['Sceptile', true], ['Magmortar', true], ['Morpeko', true]],
    ],
  },
  {
    players: ['Tobi', 'Jannik'], winner: 'Jannik', score: '1:0',
    teams: [
      [['Pelipper', true], ['Kingdra', true], ['Espeon', true], ['Sirfetch’d', true], ['Gourgeist', true], ['Arctozolt', true]],
      [['Steelix', true], ['Raichu-Alola', true], ['Thwackey', true], ['Audino-Mega', false], ['Hitmonlee', true], ['Swalot', true]],
    ],
  },
  {
    players: ['Stefan', 'Robin'], winner: 'Stefan', score: '5:0',
    teams: [
      [['Ampharos-Mega', false], ['Nidoking', false], ['Virizion', false], ['Bronzong', false], ['Slurpuff', false], ['Komala', true]],
      [['Dracozolt', true], ['Tauros-Paldea-Aqua', true], ['Articuno-Galar', true], ['Magmar', true], ['Nidoqueen', true], ['Forretress', true]],
    ],
  },
  {
    players: ['Andre', 'Tobi'], winner: 'Andre', score: '1:0',
    teams: [
      [['Tapu Bulu', true], ['Muk-Alola', true], ['Camerupt', true], ['Golisopod', false], ['Magneton', true], ['Bronzor', true]],
      [['Arctozolt', true], ['Beartic', true], ['Pelipper', true], ['Sirfetch’d', true], ['Gourgeist', true], ['Espeon', true]],
    ],
  },
].map((match) => ({
  ...match,
  teams: match.teams.map((team) => team.map(([name, knockedOut]) => ({ name, knockedOut, unknown: name === '?' }))),
}));

function escapeMatchdayPrintHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getMatchdayPrintDate() {
  const value = matchdayPdfDate?.value;
  if (!value) return '____________________';
  const [year, month, day] = value.split('-');
  return `${day}.${month}.${year}`;
}

function getMatchdayPrintTeam(player) {
  return (player?.currentTeam ?? []).map((name) => {
    const pokemon = getPokemonByNameLoose(name);
    return {
      name: pokemon ? getPokemonDisplayName(pokemon) : name,
      sprite: pokemon?.sprite ?? missingSpriteFallbackPath,
    };
  });
}

function createMatchdayPrintTeamHtml(player, fallbackName) {
  const team = getMatchdayPrintTeam(player);
  const rows = team.length
    ? team.map((pokemon) => `
        <li>
          <img src="${escapeMatchdayPrintHtml(new URL(pokemon.sprite, document.baseURI).href)}" alt="" />
          <span>${escapeMatchdayPrintHtml(pokemon.name)}</span>
          <i aria-hidden="true"></i>
        </li>`).join('')
    : '<li class="empty-team"><span>Kein Team hinterlegt</span></li>';
  return `
    <section class="print-team">
      <h3>${escapeMatchdayPrintHtml(getMatchdayDisplayName(player, fallbackName))}</h3>
      <ul>${rows}</ul>
    </section>`;
}

function createMatchdayPrintMatchHtml(match) {
  const [leftName, rightName] = match;
  const leftPlayer = getMatchdayPlayer(leftName);
  const rightPlayer = getMatchdayPlayer(rightName);
  const leftDisplayName = getMatchdayDisplayName(leftPlayer, leftName);
  const rightDisplayName = getMatchdayDisplayName(rightPlayer, rightName);
  return `
    <article class="print-match">
      <h2>${escapeMatchdayPrintHtml(leftDisplayName)} <small>vs.</small> ${escapeMatchdayPrintHtml(rightDisplayName)}</h2>
      <div class="result-line"><strong>Sieger:</strong><span></span><strong>Differenz:</strong><b></b><em>:</em><b></b></div>
      <div class="print-teams">
        ${createMatchdayPrintTeamHtml(leftPlayer, leftName)}
        ${createMatchdayPrintTeamHtml(rightPlayer, rightName)}
      </div>
      <div class="replay-check"><i aria-hidden="true"></i><strong>Showdown Replay an replay@Schwalboga.de gesendet?</strong></div>
    </article>`;
}

function createMatchdayPrintDocument(autoPrint = true) {
  const rounds = matchdayRounds.map((round) => `
    <section class="print-round">
      <header><p>Match-Datum: <strong>${escapeMatchdayPrintHtml(getMatchdayPrintDate())}</strong></p><h1>${escapeMatchdayPrintHtml(round.label.replace('Round', 'Runde'))}</h1></header>
      <div class="print-matches">${round.matches.map(createMatchdayPrintMatchHtml).join('')}</div>
    </section>`).join('');
  return `<!doctype html>
  <html lang="de"><head><meta charset="utf-8"><title>Schwalboga Matchbogen</title>
  <style>
    @page { size: A4 landscape; margin: 8mm; }
    * { box-sizing: border-box; }
    html, body { margin: 0; color: #111827; font-family: Arial, Helvetica, sans-serif; }
    .print-round { min-height: 194mm; break-after: page; page-break-after: always; }
    .print-round:last-child { break-after: auto; page-break-after: auto; }
    header { position: relative; min-height: 15mm; border-bottom: 2px solid #b91c1c; }
    header p { position: absolute; left: 0; top: 2mm; margin: 0; font-size: 10pt; }
    header h1 { margin: 0; text-align: center; color: #991b1b; font-size: 24pt; line-height: 14mm; }
    .print-matches { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; padding-top: 4mm; }
    .print-match { height: 85mm; overflow: hidden; border: 1.2px solid #475569; border-radius: 2mm; padding: 2.5mm 3mm; }
    .print-match h2 { margin: 0 0 1.5mm; padding-bottom: 1mm; border-bottom: 1px solid #cbd5e1; font-size: 13pt; }
    .print-match h2 small { color: #64748b; font-size: 9pt; font-weight: 400; }
    .result-line { display: flex; align-items: end; gap: 2mm; height: 7mm; font-size: 9pt; }
    .result-line span { flex: 1; min-width: 25mm; border-bottom: 1px solid #111827; }
    .result-line b { width: 8mm; border-bottom: 1px solid #111827; }
    .result-line em { font-style: normal; font-weight: bold; }
    .print-teams { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
    .print-team h3 { margin: 1mm 0 .6mm; font-size: 10pt; }
    .print-team ul { display: grid; grid-template-columns: 1fr; gap: .1mm; margin: 0; padding: 0; list-style: none; }
    .print-team li { display: grid; grid-template-columns: 4mm minmax(0, 1fr) 3.8mm; align-items: center; min-height: 4.1mm; font-size: 9pt; line-height: 3.2mm; }
    .print-team img { width: 3.1mm; height: 3.1mm; object-fit: contain; image-rendering: pixelated; }
    .print-team li span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .print-team li i, .replay-check i { width: 3.8mm; height: 3.8mm; border: 1px solid #111827; }
    .empty-team { grid-column: 1 / -1; color: #64748b; }
    .replay-check { display: flex; align-items: center; gap: 2mm; margin-top: 1.5mm; padding-top: 1.5mm; border-top: 1px solid #cbd5e1; font-size: 8pt; }
    @media screen { body { background: #e2e8f0; } .print-round { width: 281mm; margin: 8mm auto; padding: 8mm; background: white; box-shadow: 0 2mm 8mm #64748b55; } }
  </style></head><body>${rounds}${autoPrint ? '<script>window.addEventListener(\'load\', () => setTimeout(() => window.print(), 350));<\\/script>' : ''}</body></html>`;
}

function openMatchdayPrintPdf() {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.alert('Das Druckfenster wurde blockiert. Bitte Pop-ups fuer diese Seite erlauben.');
    return;
  }
  printWindow.document.open();
  printWindow.document.write(createMatchdayPrintDocument());
  printWindow.document.close();
}

function getMatchdayPlayer(name) {
  const target = normalizeText(name);
  return getSpielerEntries().find((player) => {
    const normalized = normalizeText(player.name);
    if (normalized === target) return true;
    return target === 'andre' && normalized.startsWith('andr');
  }) ?? null;
}

function getMatchdayDraftPlayer(name) {
  const target = normalizeText(name);
  return getDraftOverviewPlayers().find((player) => {
    const normalized = normalizeText(player.name);
    if (normalized === target) return true;
    return target === 'andre' && normalized.startsWith('andr');
  }) ?? null;
}

function getMatchdayDisplayName(player, fallback) {
  if (!player) return fallback;
  return player.name;
}

function getMatchdayTeamPokemon(player) {
  return (player?.currentTeam ?? [])
    .map((name) => getPokemonByNameLoose(name))
    .filter(Boolean);
}

function loadMatchdayPaletteImage(src, crossOrigin = false) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (crossOrigin) image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function interpolateMatchdayColor(left, right, amount) {
  return left.map((channel, index) => Math.round(channel + (right[index] - channel) * amount));
}

const matchdaySubstitutePaletteFilters = {
  Politoed: 'grayscale(1) sepia(1) saturate(4.2) hue-rotate(118deg) brightness(1.08)',
  Drednaw: 'grayscale(1) sepia(1) saturate(4.5) hue-rotate(142deg) brightness(0.88)',
  Breloom: 'grayscale(1) sepia(1) saturate(3.6) hue-rotate(52deg) brightness(0.96)',
  Dubwool: 'grayscale(1) contrast(1.32) brightness(1.02)',
  Sandaconda: 'grayscale(1) sepia(0.9) saturate(2.2) hue-rotate(350deg) brightness(0.92)',
  Kilowattrel: 'grayscale(1) sepia(1) saturate(5.4) hue-rotate(352deg) brightness(1.04) contrast(1.15)',
  Bombirdier: 'grayscale(1) contrast(1.18) brightness(1.14)',
  Centiskorch: 'grayscale(1) sepia(1) saturate(5.2) hue-rotate(320deg) brightness(0.94)',
  Mimikyu: 'grayscale(1) sepia(0.72) saturate(1.9) hue-rotate(352deg) brightness(1.12)',
  Dragonair: 'grayscale(1) sepia(1) saturate(3.8) hue-rotate(148deg) brightness(1.12)',
};

async function recolorMatchdaySubstitute(image, pokemon) {
  try {
    const [substitute, source] = await Promise.all([
      loadMatchdayPaletteImage(missingSpriteFallbackPath),
      loadMatchdayPaletteImage(pokemon.sprite, true),
    ]);
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 96;
    sampleCanvas.height = 96;
    const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });
    sampleContext.drawImage(source, 0, 0, 96, 96);
    const sourcePixels = sampleContext.getImageData(0, 0, 96, 96).data;
    const colors = [];
    for (let index = 0; index < sourcePixels.length; index += 4) {
      const alpha = sourcePixels[index + 3];
      if (alpha < 96) continue;
      const color = [sourcePixels[index], sourcePixels[index + 1], sourcePixels[index + 2]];
      const max = Math.max(...color);
      const min = Math.min(...color);
      if (max - min < 18 || max < 24 || min > 242) continue;
      colors.push(color);
    }
    if (!colors.length) return;
    colors.sort((left, right) => (left[0] + left[1] + left[2]) - (right[0] + right[1] + right[2]));
    const dark = colors[Math.floor(colors.length * 0.16)];
    const middle = colors[Math.floor(colors.length * 0.52)];
    const light = colors[Math.floor(colors.length * 0.86)];
    const canvas = document.createElement('canvas');
    canvas.width = substitute.naturalWidth || 96;
    canvas.height = substitute.naturalHeight || 96;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(substitute, 0, 0, canvas.width, canvas.height);
    const output = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < output.data.length; index += 4) {
      if (output.data[index + 3] < 12) continue;
      const luminance = (output.data[index] * 0.21 + output.data[index + 1] * 0.72 + output.data[index + 2] * 0.07) / 255;
      const mapped = luminance < 0.5
        ? interpolateMatchdayColor(dark, middle, luminance * 2)
        : interpolateMatchdayColor(middle, light, (luminance - 0.5) * 2);
      output.data[index] = mapped[0];
      output.data[index + 1] = mapped[1];
      output.data[index + 2] = mapped[2];
    }
    context.putImageData(output, 0, 0);
    image.src = canvas.toDataURL('image/png');
    image.style.removeProperty('--matchday-color-filter');
  } catch {
    image.src = missingSpriteFallbackPath;
  }
}

function normalizeMatchdayTeamEntries(player, teamEntries = null) {
  if (teamEntries) return teamEntries.map((entry) => ({ ...entry, pokemon: entry.unknown ? null : getPokemonByNameLoose(entry.name) }));
  return getMatchdayTeamPokemon(player).map((pokemon) => ({ name: pokemon.name, pokemon, knockedOut: false, unknown: false }));
}

function createMatchdayCarousel(player, side, teamEntries = null, concealTeam = false) {
  const team = normalizeMatchdayTeamEntries(player, teamEntries);
  const carousel = createNode('div', `matchday-carousel is-${side}`);
  if (!team.length) {
    carousel.append(createNode('span', 'matchday-empty-team', 'Kein Team'));
    return carousel;
  }
  carousel.style.setProperty('--matchday-team-size', String(team.length));
  const duration = Math.max(10, team.length * 1.15);
  carousel.style.setProperty('--matchday-carousel-duration', `${duration}s`);
  team.forEach((entry, index) => {
    const sprite = entry.unknown ? createNode('span', 'matchday-pokemon-sprite matchday-unknown-sprite', '?') : document.createElement('img');
    sprite.className = `matchday-pokemon-sprite${entry.unknown ? ' matchday-unknown-sprite' : ''}${entry.knockedOut ? ' is-knocked-out' : ''}${concealTeam ? ' is-concealed' : ''}`;
    sprite.style.setProperty('--matchday-sprite-index', String(index));
    sprite.style.setProperty('--matchday-sprite-delay', `${-(duration / team.length) * index}s`);
    const displayTitle = concealTeam ? '?' : entry.unknown ? '?' : getPokemonDisplayName(entry.pokemon ?? { name: entry.name });
    sprite.title = `${displayTitle}${entry.knockedOut ? ' (KO)' : ''}`;
    if (!entry.unknown) {
      sprite.loading = 'lazy';
      if (concealTeam && entry.pokemon) {
        sprite.alt = 'Verdecktes Pokémon';
        sprite.src = missingSpriteFallbackPath;
        sprite.style.setProperty('--matchday-color-filter', matchdaySubstitutePaletteFilters[entry.pokemon.name] ?? 'grayscale(1) sepia(1) saturate(3)');
        void recolorMatchdaySubstitute(sprite, entry.pokemon);
      } else {
        setSpriteWithFallback(sprite, entry.pokemon?.sprite ?? missingSpriteFallbackPath, `${sprite.title} sprite`);
      }
    }
    carousel.append(sprite);
  });
  return carousel;
}

function createMatchdaySide(player, fallbackName, side, teamEntries = null, concealTeam = false) {
  const sideNode = createNode('div', `matchday-side is-${side}`);
  const trainer = document.createElement('img');
  trainer.className = 'matchday-trainer-sprite';
  trainer.loading = 'lazy';
  trainer.src = player?.sprite ?? missingSpriteFallbackPath;
  trainer.alt = `${fallbackName} trainer`;
  const name = createNode('strong', 'matchday-trainer-name', getMatchdayDisplayName(player, fallbackName));
  const header = createNode('div', 'matchday-trainer-header');
  header.append(trainer, name);
  sideNode.append(header, createMatchdayCarousel(player, side, teamEntries, concealTeam));
  return sideNode;
}

function createMatchdayChip(roundLabel, match, index, options = {}) {
  const [leftName, rightName] = match;
  const leftPlayer = getMatchdayPlayer(leftName);
  const rightPlayer = getMatchdayPlayer(rightName);
  const matchId = `${normalizeText(roundLabel)}-${index}`;
  const chip = createNode('article', 'matchday-chip');
  chip.style.setProperty('--matchday-delay', `${(index % 4) * 120}ms`);
  if (!options.finished) {
    chip.tabIndex = 0;
    chip.setAttribute('role', 'button');
    chip.setAttribute('aria-expanded', String(expandedMatchdayMatchId === matchId));
  }
  if (options.finished) chip.classList.add('is-finished');
  const center = createNode('div', 'matchday-center');
  center.append(createNode('div', 'matchday-vs', options.score ?? 'VS'));
  if (options.finished) center.append(createNode('strong', 'matchday-result', `${getMatchdayDisplayName(getMatchdayPlayer(options.winner), options.winner)} gewinnt`));
  chip.append(
    createMatchdaySide(leftPlayer, leftName, 'left', options.teams?.[0] ?? null, options.concealHans && normalizeText(leftName) === 'hans'),
    center,
    createMatchdaySide(rightPlayer, rightName, 'right', options.teams?.[1] ?? null, options.concealHans && normalizeText(rightName) === 'hans'),
  );
  chip.setAttribute('aria-label', `${roundLabel}: ${leftName} vs ${rightName}`);
  const toggle = () => {
    if (options.finished) return;
    expandedMatchdayMatchId = expandedMatchdayMatchId === matchId ? null : matchId;
    renderMatchday();
  };
  chip.addEventListener('click', toggle);
  chip.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    toggle();
  });
  return chip;
}

function createMatchdayExpandedPanel(match) {
  const [leftName, rightName] = match;
  const leftPlayer = getMatchdayDraftPlayer(leftName);
  const rightPlayer = getMatchdayDraftPlayer(rightName);
  const panel = createNode('div', 'matchday-expanded-panel');
  const grid = createNode('div', 'draft-overview-team-grid matchday-expanded-grid');
  if (leftPlayer) grid.append(createDraftOverviewTeamCard(leftPlayer));
  if (rightPlayer) grid.append(createDraftOverviewTeamCard(rightPlayer));
  if (!grid.children.length) {
    renderEmptyDetailState(panel, 'Keine Battle-Prep-Teams fuer dieses Match gefunden.');
  } else {
    panel.append(grid);
  }
  return panel;
}

function createMatchdayMatchNode(roundLabel, match, index, options = {}) {
  const matchId = `${normalizeText(roundLabel)}-${index}`;
  const wrap = createNode('div', `matchday-match${expandedMatchdayMatchId === matchId ? ' is-expanded' : ''}`);
  wrap.append(createMatchdayChip(roundLabel, match, index, options));
  if (!options.finished && expandedMatchdayMatchId === matchId) wrap.append(createMatchdayExpandedPanel(match));
  return wrap;
}

function createMatchdayRoundSection(round, options = {}) {
  const section = createNode('section', 'matchday-round');
  section.append(createNode(options.compact ? 'h4' : 'h3', `matchday-round-divider${options.compact ? ' is-compact' : ''}`, round.label.replace('Round', 'Runde')));
  const list = createNode('div', 'matchday-chip-row');
  round.matches.forEach((match, index) => list.append(createMatchdayMatchNode(`${options.keyPrefix ?? ''}${round.label}`, match, index, options)));
  section.append(list);
  return section;
}

function renderMatchday() {
  if (!matchdayContent) return;
  matchdayContent.innerHTML = '';
  for (const round of matchdayRounds) {
    matchdayContent.append(createMatchdayRoundSection(round, { concealHans: true, keyPrefix: 'active-' }));
  }
  matchdayContent.append(createNode('h3', 'matchday-group-divider', 'Aufgeschoben'));
  postponedMatchdayRounds.forEach((round) => matchdayContent.append(createMatchdayRoundSection(round, { compact: true, keyPrefix: 'postponed-' })));
  matchdayContent.append(createNode('h3', 'matchday-group-divider', 'Bisherige Kämpfe'));
  const history = createNode('section', 'matchday-history');
  finishedMatchdayMatches.forEach((finished, index) => history.append(createMatchdayMatchNode('finished', finished.players, index, { ...finished, finished: true })));
  matchdayContent.append(history);
}

function setTierEditorStatus(message = '', state = '') {
  if (!tierEditorStatus) return;
  tierEditorStatus.textContent = message;
  if (state) tierEditorStatus.dataset.state = state;
  else delete tierEditorStatus.dataset.state;
}

function updateTierEditorDraftFromRow(row, pokemon, { forceExplicit = false } = {}) {
  const singlesInput = row.querySelector('[data-cost-mode="singles"]');
  const doublesInput = row.querySelector('[data-cost-mode="doubles"]');
  const cost = normalizeEditableCost(singlesInput?.value ?? '');
  const costDbl = normalizeEditableCost(doublesInput?.value ?? '');
  if (Number.isNaN(cost) || Number.isNaN(costDbl)) {
    row.classList.add('is-dirty');
    setTierEditorStatus('Kosten müssen ganze Zahlen zwischen 0 und 32 sein oder leer bleiben.', 'error');
    return;
  }
  const unchanged = cost === getPokemonCost(pokemon, 'singles')
    && costDbl === getPokemonCost(pokemon, 'doubles')
    && !forceExplicit;
  if (unchanged) tierEditorDraft.delete(pokemon.name);
  else tierEditorDraft.set(pokemon.name, { pokemon_name: pokemon.name, cost, cost_dbl: costDbl });
  row.classList.toggle('is-dirty', tierEditorDraft.has(pokemon.name));
  const status = row.querySelector('[data-role="status"]');
  if (status) status.textContent = tierEditorDraft.has(pokemon.name)
    ? 'Ungespeichert'
    : isPlaceholderDoublesCost(pokemon) ? 'Doubles-Platzhalter' : 'Gespeichert';
  setTierEditorStatus(`${tierEditorDraft.size} ungespeicherte Änderung${tierEditorDraft.size === 1 ? '' : 'en'}.`);
}

function createTierEditorRow(pokemon) {
  const draft = tierEditorDraft.get(pokemon.name);
  const row = document.createElement('tr');
  row.dataset.pokemonName = pokemon.name;
  row.classList.toggle('is-dirty', Boolean(draft));

  const pokemonCell = document.createElement('td');
  const identity = createNode('div', 'tier-editor-pokemon');
  const sprite = document.createElement('img');
  setSpriteWithFallback(sprite, pokemon.sprite, `${pokemon.name} sprite`);
  sprite.loading = 'lazy';
  const copy = createNode('div');
  copy.append(createNode('strong', '', getPokemonDisplayName(pokemon)), createNode('div', '', pokemon.displayNumber ?? `#${pokemon.num}`));
  identity.append(sprite, copy);
  pokemonCell.append(identity);

  const createInputCell = (mode, value) => {
    const cell = document.createElement('td');
    const input = document.createElement('input');
    input.className = 'tier-editor-cost-input';
    input.type = 'number';
    input.min = '0';
    input.max = '32';
    input.step = '1';
    input.inputMode = 'numeric';
    input.dataset.costMode = mode;
    input.value = value === null ? '' : String(value);
    input.setAttribute('aria-label', `${pokemon.name} ${mode === 'singles' ? 'Singles' : 'Doubles'} Kosten`);
    input.addEventListener('input', () => updateTierEditorDraftFromRow(row, pokemon));
    cell.append(input);
    return cell;
  };

  const singlesValue = draft ? draft.cost : getPokemonCost(pokemon, 'singles');
  const doublesValue = draft ? draft.cost_dbl : getPokemonCost(pokemon, 'doubles');
  const statusCell = document.createElement('td');
  statusCell.dataset.role = 'status';
  if (draft) {
    statusCell.textContent = 'Ungespeichert';
  } else if (isPlaceholderDoublesCost(pokemon)) {
    const confirm = createNode('button', 'details-secondary tier-editor-placeholder-label', 'Platzhalter übernehmen');
    confirm.type = 'button';
    confirm.title = 'Speichert den aktuellen Doubles-Wert ausdrücklich, auch wenn er den Singles-Kosten entspricht.';
    confirm.addEventListener('click', () => {
      updateTierEditorDraftFromRow(row, pokemon, { forceExplicit: true });
      renderTierEditor();
    });
    statusCell.append(confirm);
  } else {
    statusCell.textContent = 'Gespeichert';
  }
  row.append(
    pokemonCell,
    createInputCell('singles', singlesValue),
    createInputCell('doubles', doublesValue),
    statusCell,
  );
  return row;
}

function renderTierEditor() {
  if (!tierEditorRows) return;
  if (!authSession?.user) {
    window.location.hash = '#home';
    renderHubView('home');
    openAuthModal();
    return;
  }
  tierEditorRows.innerHTML = '';
  if (!sharedCostsReady && sharedCostsError) {
    setTierEditorStatus('Die Supabase-Kostentabelle fehlt noch. Führe das vorbereitete SQL aus.', 'error');
  } else {
    setTierEditorStatus(`${tierEditorDraft.size} ungespeicherte Änderung${tierEditorDraft.size === 1 ? '' : 'en'}.`);
  }
  const query = normalizeText(tierEditorSearch?.value ?? '');
  const changedOnly = Boolean(tierEditorChangedOnly?.checked);
  const matches = allPokemon.filter((pokemon) => {
    if (pokemon.hidden) return false;
    if (changedOnly && !tierEditorDraft.has(pokemon.name)) return false;
    return !query || getPokemonSearchText(pokemon).includes(query) || String(pokemon.num) === query.replace(/^0+/, '');
  });
  const fragment = document.createDocumentFragment();
  for (const pokemon of matches) fragment.append(createTierEditorRow(pokemon));
  tierEditorRows.append(fragment);
}

async function saveTierEditorChanges() {
  if (!tierEditorDraft.size) {
    setTierEditorStatus('Es gibt keine ungespeicherten Änderungen.');
    return;
  }
  if (tierEditorSave) tierEditorSave.disabled = true;
  setTierEditorStatus(`${tierEditorDraft.size} Änderung${tierEditorDraft.size === 1 ? '' : 'en'} werden gespeichert …`);
  try {
    await saveSharedCostChanges([...tierEditorDraft.values()]);
    const savedCount = tierEditorDraft.size;
    tierEditorDraft = new Map();
    renderTierEditor();
    setTierEditorStatus(`${savedCount} Änderung${savedCount === 1 ? '' : 'en'} gespeichert.`, 'success');
  } catch (error) {
    setTierEditorStatus(`Speichern fehlgeschlagen: ${error.message}`, 'error');
  } finally {
    if (tierEditorSave) tierEditorSave.disabled = false;
  }
}

function discardTierEditorChanges() {
  tierEditorDraft = new Map();
  renderTierEditor();
  setTierEditorStatus('Ungespeicherte Änderungen wurden verworfen.');
}

if (matchdayPdfDate) matchdayPdfDate.value = new Date().toISOString().slice(0, 10);
matchdayPdfButton?.addEventListener('click', openMatchdayPrintPdf);

function renderHubView(viewKey = getHubViewFromHash()) {
  if (viewKey === 'tier-editor' && !authSession?.user) {
    window.location.hash = '#home';
    viewKey = 'home';
    window.setTimeout(openAuthModal, 0);
  }
  activeHubView = viewKey;
  for (const view of hubViews) {
    view.hidden = view.dataset.hubView !== viewKey;
  }
  document.body.dataset.hubView = viewKey;
  if (viewKey !== 'pokedex') {
    if (jumpRail) jumpRail.hidden = true;
    if (scrollTopButton) scrollTopButton.hidden = true;
  }
  if (viewKey === 'draft') {
    draftOverviewContext = 'page';
    renderDraftOverview();
  }
  if (viewKey === 'teams') {
    renderSpielerOverview();
  }
  if (viewKey === 'matchday') {
    renderMatchday();
  }
  if (viewKey === 'replays') {
    window.dispatchEvent(new CustomEvent('schwalboga:render-replays'));
  }
  if (viewKey === 'tier-editor') renderTierEditor();
  if (viewKey === 'pokedex') {
    requestAnimationFrame(() => {
      resetControlRailStickyThreshold();
      updateControlRailVisibility();
      renderJumpRail();
      updateScrollTopButtonVisibility();
    });
  } else {
    closeMobilePanels();
  }
}

function getHubSearchEntries() {
  const routeEntries = [
    { label: 'Pokedex', detail: 'Bereich', view: 'pokedex' },
    { label: 'Regelset', detail: 'Bereich', view: 'ruleset' },
    { label: 'Spieler', detail: 'Bereich', view: 'teams' },
    { label: 'Teams', detail: 'Spieler', view: 'teams', action: () => openSpieler() },
    { label: 'Battle Prep', detail: 'Bereich', view: 'draft' },
    { label: 'Draft Abend', detail: 'Bereich', view: 'draft-room' },
    { label: 'Games', detail: 'Bereich', view: 'games' },
    { label: 'Matchday', detail: 'Bereich', view: 'matchday' },
    { label: 'Replays', detail: 'Battle Archiv', view: 'replays' },
    ...(authSession?.user ? [{ label: 'Tiers Ändern', detail: 'Geschützter Bereich', view: 'tier-editor' }] : []),
    { label: 'Regel Checker', detail: 'Tool', view: 'ruleset', action: () => { void openRuleChecker(); } },
    { label: 'Stefans Pdf', detail: 'Regelset', view: 'ruleset', action: () => openStefansPdf() },
    { label: 'Ninjatom Check', detail: 'Battle Prep', view: 'draft', action: () => { draftOverviewMode = 'shedinja-check'; renderDraftOverview(); } },
    { label: 'EVs Optimieren', detail: 'Battle Prep', view: 'draft', action: () => { draftOverviewMode = 'ev-optimizer'; renderDraftOverview(); } },
    { label: 'Outspeed Helfer', detail: 'Battle Prep', view: 'draft', action: () => { draftOverviewMode = 'outspeed-helper'; renderDraftOverview(); } },
    { label: 'Damage Calc', detail: 'Battle Prep', view: 'draft', action: () => { window.location.href = 'damage-calc-master/dist/index.html'; } },
  ];
  const pokemonEntries = allPokemon
    .filter((pokemon) => !pokemon.hidden)
    .map((pokemon) => ({
      label: getPokemonDisplayName(pokemon),
      detail: `Pokemon #${pokemon.num}`,
      searchText: getPokemonSearchText(pokemon),
      view: 'pokedex',
      action: () => openPokemonDetail(pokemon.name),
    }));
  return [
    ...routeEntries.map((entry) => ({ ...entry, searchText: normalizeText(`${entry.label} ${entry.detail}`) })),
    ...pokemonEntries,
  ];
}

function runHubSearchEntry(entry) {
  window.location.hash = `#${entry.view}`;
  renderHubView(entry.view);
  if (hubSearchResults) hubSearchResults.hidden = true;
  if (hubSearchInput) hubSearchInput.value = '';
  if (typeof entry.action === 'function') window.setTimeout(entry.action, 0);
}

function renderHubSearchResults() {
  if (!hubSearchInput || !hubSearchResults) return;
  const query = normalizeText(hubSearchInput.value);
  hubSearchResults.innerHTML = '';
  if (!query || activeHubView !== 'home') {
    hubSearchResults.hidden = true;
    return;
  }
  const matches = getHubSearchEntries().filter((entry) => entry.searchText.includes(query)).slice(0, 12);
  hubSearchResults.hidden = !matches.length;
  for (const entry of matches) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hub-search-result';
    button.append(createNode('strong', '', entry.label), createNode('span', '', entry.detail));
    button.addEventListener('click', () => runHubSearchEntry(entry));
    hubSearchResults.append(button);
  }
}

function handleHubAction(action) {
  if (action === 'rule-checker') {
    void openRuleChecker();
    return;
  }
  if (action === 'stefans-pdf') {
    openStefansPdf();
    return;
  }
  if (action === 'spieler') {
    openSpieler('teams');
    return;
  }
  if (action === 'spieler-boxes') {
    openSpieler('boxes');
    return;
  }
  if (action === 'spieler-knockouts') {
    openSpieler('knockouts');
    return;
  }
  if (action === 'spieler-achievements') {
    openSpieler('achievements');
    return;
  }
  if (action === 'changelog') {
    openChangelog('site');
  }
}

function initializeLandingMatchdayBanner() {
  if (!landingBanner) return;
  const bannerText = landingBanner.textContent.replace(/\s+/g, ' ').trim();
  const match = bannerText.match(/^(Nächster Abend:\s*)(\d{2})\.(\d{2})\.(\d{4})(\s*-\s*.+)$/);
  if (!match) return;
  const [, prefix, day, month, year, suffix] = match;
  const today = new Date();
  const isToday = Number(day) === today.getDate()
    && Number(month) === today.getMonth() + 1
    && Number(year) === today.getFullYear();
  if (!isToday) return;
  landingBanner.replaceChildren(
    document.createTextNode(prefix),
    createNode('span', 'landing-banner-today', 'Heute'),
    document.createTextNode(suffix),
  );
  document.querySelector('.landing-tile.is-matchday')?.classList.add('is-today');
}

function parsePointHistoryDate(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDisplayDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}-${month}-${year}`;
}

function initializeLandingTierUpdate() {
  if (!landingTierUpdate || !landingTierUpdateText) return;
  const latestDate = pointCostHistory
    .map((entry) => parsePointHistoryDate(entry.date))
    .filter(Boolean)
    .sort((left, right) => right.getTime() - left.getTime())[0];
  if (!latestDate) {
    landingTierUpdateText.textContent = 'Letzte Tier-\u00c4nderung: --.--.----';
    landingTierUpdate.classList.remove('is-recent');
    updateLandingTierSprite([]);
    return;
  }
  landingTierUpdateText.textContent = `Letzte Tier-\u00c4nderung: ${formatDisplayDate(latestDate)}`;
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  landingTierUpdate.classList.toggle('is-recent', latestDate > oneMonthAgo);
  updateLandingTierSprite(getRecentPointCostPokemon());
}

function getRecentPointCostPokemon() {
  if (!pokemonByNormalizedName.size) return [];
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const seen = new Set();
  return pointCostHistory
    .map((entry) => ({ ...entry, parsedDate: parsePointHistoryDate(entry.date) }))
    .filter((entry) => entry.parsedDate && entry.parsedDate >= thirtyDaysAgo)
    .sort((left, right) => right.parsedDate.getTime() - left.parsedDate.getTime())
    .map((entry) => getPokemonByNameLoose(entry.name))
    .filter((pokemon) => {
      if (!pokemon || seen.has(pokemon.name)) return false;
      seen.add(pokemon.name);
      return true;
    });
}

function updateLandingTierSprite(pokemonList) {
  if (landingTierSpriteInterval !== null) {
    window.clearInterval(landingTierSpriteInterval);
    landingTierSpriteInterval = null;
  }
  if (!landingTierUpdateSprite || !pokemonList.length) {
    if (landingTierUpdateSprite) {
      landingTierUpdateSprite.hidden = true;
      landingTierUpdateSprite.removeAttribute('src');
      landingTierUpdateSprite.removeAttribute('title');
    }
    return;
  }
  let index = 0;
  const showPokemon = () => {
    const pokemon = pokemonList[index % pokemonList.length];
    landingTierUpdateSprite.hidden = false;
    landingTierUpdateSprite.title = getPokemonDisplayName(pokemon);
    setSpriteWithFallback(landingTierUpdateSprite, pokemon.sprite, `${getPokemonDisplayName(pokemon)} sprite`);
    index += 1;
  };
  showPokemon();
  if (pokemonList.length > 1) {
    landingTierSpriteInterval = window.setInterval(showPokemon, 1800);
  }
}

function getDraftOverviewPlayers() {
  return getSpielerEntries()
    .filter((player) => Array.isArray(player.currentTeam) && player.currentTeam.length)
    .map((player, index) => {
      const info = player.currentTeamInfo ?? {};
      return {
        id: `spieler-${normalizeText(player.name) || index}`,
        name: player.name,
        sprite: player.sprite,
        nudelsterne: Math.max(0, Number(player.nudelsterne) || 0),
        format: info.format ?? 'normal',
        teamLabel: info.label ?? '',
        teamDate: info.date ?? '',
        spentPoints: Number.isFinite(Number(info.spentPoints)) ? Number(info.spentPoints) : null,
        pokemon: player.currentTeam.map((name) => {
          const pokemon = getPokemonByNameLoose(name);
          return {
            name: pokemon?.name ?? name,
            cost: getPokemonCost(pokemon),
          };
        }),
        teraCaptain: info.teraCaptain ?? null,
        teraType: info.teraType ?? null,
        zCaptain: info.zCaptain ?? null,
        zType: info.zType ?? null,
      };
    });
}

function getDraftOverviewPrimaryFormat(players) {
  const formats = players.map((player) => player.format).filter(Boolean);
  return formats[0] ?? 'normal';
}

function getDraftOverviewBudget(playerOrFormat) {
  const format = typeof playerOrFormat === 'string' ? playerOrFormat : playerOrFormat?.format;
  return budgetTotalsByFormat[format] ?? budgetTotalsByFormat.normal;
}

function getDraftOverviewPlayerSpent(player) {
  if (activeBattleMode === 'singles' && Number.isFinite(player?.spentPoints)) return player.spentPoints;
  return (player?.pokemon ?? []).reduce((sum, pick) => sum + (Number(pick?.cost) || 0), 0);
}

function getDraftOverviewPlayerSlotCount(player) {
  return (player?.pokemon?.length ?? 0) + (player?.teraType ? 1 : 0) + (player?.zType ? 1 : 0);
}

function getDraftOverviewPokemonLink(name) {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '#pokedex';
  url.searchParams.set('pokemon', name);
  return url.toString();
}

function getDraftOverviewContentTarget() {
  return draftOverviewContext === 'page' ? draftPageContent : draftOverviewContent;
}

function getDraftOverviewTabsTarget() {
  return draftOverviewContext === 'page' ? draftPageTabs : draftOverviewTabs;
}

function renderDraftOverviewEmpty(message = 'Noch kein laufender Draft gefunden.') {
  const content = getDraftOverviewContentTarget();
  if (!content) return;
  content.innerHTML = '';
  renderEmptyDetailState(content, message);
}

function syncDraftOverviewTabs() {
  getDraftOverviewTabsTarget()?.querySelectorAll('[data-draft-overview-mode]').forEach((button) => {
    const isActive = button.dataset.draftOverviewMode === draftOverviewMode;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
}

function renderDraftOverview() {
  if (!getDraftOverviewContentTarget()) return;
  syncDraftOverviewTabs();
  const players = getDraftOverviewPlayers();
  if (!players.length) {
    draftOverviewActivePlayerId = null;
    if (draftOverviewMode === 'tools') {
      renderDraftOverviewTools(players);
      return;
    }
    if (draftOverviewMode === 'ev-optimizer') {
      renderEvOptimizer(players);
      return;
    }
    if (draftOverviewMode === 'outspeed-helper') {
      renderOutspeedHelper(players);
      return;
    }
    if (draftOverviewMode === 'shedinja-check') {
      renderShedinjaCheck(players);
      return;
    }
    renderDraftOverviewEmpty('Keine aktuellen Teams in der Spieler-Liste gefunden.');
    return;
  }
  if (!players.some((player) => player.id === draftOverviewActivePlayerId)) {
    draftOverviewActivePlayerId = players[0].id;
  }
  if (draftOverviewMode === 'matrix') {
    renderDraftOverviewMatrix(players);
    return;
  }
  if (draftOverviewMode === 'offense') {
    renderDraftOverviewOffenseMatrix(players);
    return;
  }
  if (draftOverviewMode === 'speed') {
    renderDraftOverviewSpeedTiers(players);
    return;
  }
  if (draftOverviewMode === 'tools') {
    renderDraftOverviewTools(players);
    return;
  }
  if (draftOverviewMode === 'ev-optimizer') {
    renderEvOptimizer(players);
    return;
  }
  if (draftOverviewMode === 'outspeed-helper') {
    renderOutspeedHelper(players);
    return;
  }
  if (draftOverviewMode === 'shedinja-check') {
    renderShedinjaCheck(players);
    return;
  }
  renderDraftOverviewTeams(players);
}

function renderDraftOverviewHeader(container, players) {
  const header = createNode('div', 'draft-overview-summary');
  const copy = createNode('div');
  const primaryFormat = getDraftOverviewPrimaryFormat(players);
  const labels = [...new Set(players.map((player) => player.teamLabel).filter(Boolean))];
  copy.append(
    createNode('p', 'eyebrow', 'Aktuelle Spieler-Teams'),
    createNode('h3', '', `${players.length} Teams`),
    createNode('p', '', `${labels[0] ?? primaryFormat} | Budget ${getDraftOverviewBudget(primaryFormat)}`),
  );
  header.append(copy);
  container.append(header);
}

function renderDraftOverviewTeams(players) {
  const content = getDraftOverviewContentTarget();
  if (!content) return;
  content.innerHTML = '';
  renderDraftOverviewHeader(content, players);
  const grid = createNode('div', 'draft-overview-team-grid');
  for (const player of players) {
    grid.append(createDraftOverviewTeamCard(player));
  }
  content.append(grid);
}

function createDraftOverviewTeamCard(player) {
  const card = createNode('article', 'draft-overview-team-card');
  const header = createNode('header', 'draft-overview-team-header');
  if (player.sprite) {
    const trainer = document.createElement('img');
    trainer.src = player.sprite;
    trainer.alt = `${player.name} Trainer`;
    trainer.loading = 'lazy';
    header.append(trainer);
  }
  const title = createNode('div');
  title.append(
    createNode('h3', '', player.name),
    createNode('p', '', `${getDraftOverviewPlayerSpent(player)} / ${getDraftOverviewBudget(player)} Punkte`),
  );
  header.append(title);
  card.append(header);

  const badges = createNode('div', 'draft-overview-badges');
  badges.append(
    createNode('span', '', `${player.nudelsterne ?? 0} Sterne`),
    createNode('span', '', `${player.pokemon?.length ?? 0}/12 Pokemon`),
    createNode('span', '', `${getDraftOverviewPlayerSlotCount(player)}/14 Slots`),
  );
  card.append(badges);

  const captains = createNode('div', 'draft-overview-captains');
  captains.append(
    createNode('span', '', `Tera: ${player.teraCaptain ? `${getPokemonDisplayName(pokemonByName.get(player.teraCaptain) ?? { name: player.teraCaptain })}${player.teraType ? ` (${player.teraType})` : ''}` : '-'}`),
    createNode('span', '', `Z: ${player.zCaptain ? `${getPokemonDisplayName(pokemonByName.get(player.zCaptain) ?? { name: player.zCaptain })}${player.zType ? ` (${player.zType})` : ''}` : '-'}`),
  );
  card.append(captains);

  const picks = createNode('div', 'draft-overview-picks');
  for (let index = 0; index < 12; index += 1) {
    const pick = player.pokemon?.[index] ?? null;
    const isTeraCaptain = pick && player.teraCaptain === pick.name && player.teraType;
    picks.append(pick ? createDraftOverviewPokemonLink(pick, '', { teraType: isTeraCaptain ? player.teraType : null }) : createNode('div', 'draft-overview-pick is-empty', `Slot ${index + 1}`));
  }
  card.append(picks);
  return card;
}

function createDraftOverviewPokemonLink(pick, extraLabel = '', options = {}) {
  const pokemon = pokemonByName.get(pick.name);
  const link = createNode('a', 'draft-overview-pick');
  link.href = getDraftOverviewPokemonLink(pick.name);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  const primaryType = pokemon?.types?.[0] ?? 'Normal';
  const secondaryType = pokemon?.types?.[1] ?? primaryType;
  link.style.setProperty('--pick-type-left', typeColorVars[primaryType] ?? typeColorVars.Normal);
  link.style.setProperty('--pick-type-right', typeColorVars[secondaryType] ?? typeColorVars[primaryType] ?? typeColorVars.Normal);
  if (pokemon?.sprite) {
    const spriteWrap = createNode('div', 'draft-overview-pick-sprite-wrap');
    const image = document.createElement('img');
    setSpriteWithFallback(image, pokemon.sprite, `${pokemon.name} sprite`);
    image.loading = 'lazy';
    spriteWrap.append(image);
    appendTeraSpriteCheckerOverlay(spriteWrap, pokemon.sprite, options.teraType);
    link.append(spriteWrap);
  }
  const label = createNode('span', '', `${pokemon ? getPokemonDisplayName(pokemon) : pick.name}${extraLabel}${pick.cost !== undefined && pick.cost !== null ? ` (${pick.cost})` : ''}`);
  link.append(label);
  return link;
}

function renderDraftOverviewPlayerPicker(players) {
  const picker = createNode('div', 'draft-overview-player-picker');
  for (const player of players) {
    const button = createNode('button', `details-secondary${player.id === draftOverviewActivePlayerId ? ' is-active' : ''}`, player.name);
    button.type = 'button';
    button.addEventListener('click', () => {
      draftOverviewActivePlayerId = player.id;
      renderDraftOverview();
    });
    picker.append(button);
  }
  return picker;
}

function renderDraftOverviewMatrix(players) {
  const content = getDraftOverviewContentTarget();
  if (!content) return;
  content.innerHTML = '';
  renderDraftOverviewHeader(content, players);
  content.append(renderDraftOverviewPlayerPicker(players));
  const player = players.find((entry) => entry.id === draftOverviewActivePlayerId) ?? players[0];
  const section = createNode('div', 'draft-overview-panel');
  section.append(createNode('h3', '', `${player.name}: Defense Matrix`));
  if (!player.pokemon?.length) {
    renderEmptyDetailState(section, 'Noch keine Pokemon fuer diese Matrix.');
    content.append(section);
    return;
  }

  const wrap = createNode('div', 'draft-overview-matrix-wrap');
  const table = document.createElement('table');
  table.className = 'budget-planner-type-matrix draft-overview-matrix';
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  headRow.append(createNode('th', '', 'Pokemon'));
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
    headRow.append(header);
  }
  thead.append(headRow);
  table.append(thead);

  const tbody = document.createElement('tbody');
  const entries = player.pokemon.map((pick) => ({ pick, label: '', defenseTypes: null }));
  if (player.teraCaptain && player.teraType) {
    const teraPick = player.pokemon.find((pick) => pick.name === player.teraCaptain);
    if (teraPick) entries.push({ pick: teraPick, label: ` (Tera ${player.teraType})`, defenseTypes: [player.teraType], teraType: player.teraType });
  }
  for (const entry of entries) {
    const pokemon = pokemonByName.get(entry.pick.name);
    if (!pokemon) continue;
    const row = document.createElement('tr');
    const nameCell = document.createElement('th');
    nameCell.className = 'budget-planner-matrix-pokemon';
    nameCell.append(createDraftOverviewPokemonLink(entry.pick, entry.label, { teraType: entry.teraType }));
    row.append(nameCell);
    for (const type of battleTypes) {
      const cell = document.createElement('td');
      cell.className = 'budget-planner-defense-cell';
      const text = createNode('span', 'budget-planner-defense-text');
      registerDefenseProfileNode(text, getDefenseProfiles(pokemon, type, entry.defenseTypes ?? pokemon.types), {
        classNames: (value) => [getBudgetPlannerDefenseCode(value).className],
        text: (value) => getBudgetPlannerDefenseCode(value).text,
      }, getDefenseAbilityStates(pokemon, entry.defenseTypes ?? pokemon.types));
      cell.append(text);
      cell.title = `${getPokemonDisplayName(pokemon)} vs ${type}`;
      row.append(cell);
    }
    tbody.append(row);
  }
  table.append(tbody);
  wrap.append(table);
  section.append(wrap);
  content.append(section);
}

const draftOffenseFixedNeutralMoveIds = new Set(['seismictoss', 'dragonrage', 'superfang', 'nightshade', 'natureswrath', 'naturesmadness']);
const draftOffenseNormalTypeAbilities = {
  aerilate: 'Flying',
  refrigerate: 'Ice',
  galvanize: 'Electric',
  pixilate: 'Fairy',
};

function getDraftOffenseSelectionKey(playerId, pokemonName) {
  return `${playerId}::${pokemonName}`;
}

function isDraftOffenseDamagingMove(move) {
  return Boolean(move?.type) && (move.category !== 'Status' || draftOffenseFixedNeutralMoveIds.has(move.id));
}

function getDraftOffenseMoveOptions(pokemon) {
  return getLegalPokemonMoveRows(pokemon);
}

function getDraftOffenseDamagingMoveOptions(pokemon) {
  return getDraftOffenseMoveOptions(pokemon).filter(isDraftOffenseDamagingMove);
}

function getDraftOffenseSelection(player, pick, pokemon) {
  const key = getDraftOffenseSelectionKey(player.id, pick.name);
  const abilityNames = getPokemonAbilityNames(pokemon);
  const moveOptions = getDraftOffenseMoveOptions(pokemon);
  const moveIds = new Set(moveOptions.map((move) => move.id));
  const existing = draftOffenseSelections.get(key) ?? {};
  const selectedMoves = (existing.moves ?? []).slice(0, 4).map((moveId) => (moveIds.has(moveId) ? moveId : ''));
  const defaultMoves = getDraftOffenseDamagingMoveOptions(pokemon).slice(0, 4).map((move) => move.id);
  while (selectedMoves.length < 4) selectedMoves.push(defaultMoves[selectedMoves.length] ?? '');
  const selection = {
    ability: abilityNames.includes(existing.ability) ? existing.ability : abilityNames[0] ?? '',
    moves: selectedMoves,
  };
  draftOffenseSelections.set(key, selection);
  return selection;
}

function setDraftOffenseSelection(player, pick, nextSelection) {
  draftOffenseSelections.set(getDraftOffenseSelectionKey(player.id, pick.name), nextSelection);
}

function createDraftOffenseSelect(labelText, value, options, onChange) {
  const label = createNode('label', 'draft-offense-select-field');
  label.append(createNode('span', '', labelText));
  const select = document.createElement('select');
  for (const option of options) {
    const node = document.createElement('option');
    node.value = option.value;
    node.textContent = option.label;
    if (option.title) node.title = option.title;
    select.append(node);
  }
  select.value = value ?? '';
  select.addEventListener('change', () => onChange(select.value));
  label.append(select);
  return label;
}

function normalizeDraftOffensePlayers(players) {
  if (!players.some((player) => player.id === draftOffenseOwnPlayerId)) {
    draftOffenseOwnPlayerId = players[0]?.id ?? null;
  }
  if (!players.some((player) => player.id === draftOffenseOpponentPlayerId)) {
    draftOffenseOpponentPlayerId = players.find((player) => player.id !== draftOffenseOwnPlayerId)?.id ?? players[0]?.id ?? null;
  }
  if (players.length > 1 && draftOffenseOwnPlayerId === draftOffenseOpponentPlayerId) {
    draftOffenseOpponentPlayerId = players.find((player) => player.id !== draftOffenseOwnPlayerId)?.id ?? draftOffenseOpponentPlayerId;
  }
}

function createDraftOffenseTeamControls(players) {
  const controls = createNode('div', 'draft-offense-controls');
  const playerOptions = players.map((player) => ({ value: player.id, label: player.name }));
  controls.append(
    createDraftOffenseSelect('Dein Team', draftOffenseOwnPlayerId, playerOptions, (value) => {
      draftOffenseOwnPlayerId = value;
      if (players.length > 1 && draftOffenseOpponentPlayerId === value) {
        draftOffenseOpponentPlayerId = players.find((player) => player.id !== value)?.id ?? draftOffenseOpponentPlayerId;
      }
      renderDraftOverview();
    }),
    createDraftOffenseSelect('Gegner Team', draftOffenseOpponentPlayerId, playerOptions, (value) => {
      draftOffenseOpponentPlayerId = value;
      renderDraftOverview();
    }),
  );
  return controls;
}

function createDraftOffensePokemonEditor(player, pick) {
  const pokemon = pokemonByName.get(pick.name);
  const card = createNode('div', 'draft-offense-card');
  if (!pokemon) {
    card.append(createNode('p', '', pick.name));
    return card;
  }
  const selection = getDraftOffenseSelection(player, pick, pokemon);
  const header = createNode('div', 'draft-offense-card-header');
  const sprite = document.createElement('img');
  setSpriteWithFallback(sprite, pokemon.sprite, `${getPokemonDisplayName(pokemon)} sprite`);
  header.append(sprite, createNode('strong', '', getPokemonDisplayName(pokemon)));

  const abilityOptions = getPokemonAbilityNames(pokemon).map((ability) => ({ value: ability, label: ability }));
  const moveOptions = [
    { value: '', label: 'Move waehlen' },
    ...getDraftOffenseMoveOptions(pokemon).map((move) => ({
      value: move.id,
      label: getMoveDisplayName(move),
      title: [move.type, move.category, move.basePower ? `${move.basePower} BP` : null].filter(Boolean).join(' / '),
    })),
  ];
  const fields = createNode('div', 'draft-offense-select-grid');
  fields.append(createDraftOffenseSelect('Faehigkeit', selection.ability, abilityOptions, (value) => {
    setDraftOffenseSelection(player, pick, { ...selection, ability: value });
    renderDraftOverview();
  }));
  for (let moveIndex = 0; moveIndex < 4; moveIndex += 1) {
    fields.append(createDraftOffenseSelect(`Move ${moveIndex + 1}`, selection.moves[moveIndex] ?? '', moveOptions, (value) => {
      const moves = [...selection.moves];
      moves[moveIndex] = value;
      setDraftOffenseSelection(player, pick, { ...selection, moves });
      renderDraftOverview();
    }));
  }
  card.append(header, fields);
  return card;
}

function getDraftOffenseMoveType(move, abilityName) {
  const normalizedAbility = normalizeText(abilityName);
  return move.type === 'Normal' && draftOffenseNormalTypeAbilities[normalizedAbility]
    ? draftOffenseNormalTypeAbilities[normalizedAbility]
    : move.type;
}

function getDraftOffenseTypeValue(defendingTypes, attackType, abilityName, moveId = '') {
  const normalizedAbility = normalizeText(abilityName);
  return (defendingTypes ?? []).reduce((product, defendingType) => {
    if (normalizedAbility === 'scrappy' && (attackType === 'Normal' || attackType === 'Fighting') && defendingType === 'Ghost') {
      return product;
    }
    if (moveId === 'freezedry' && defendingType === 'Water') return product * 2;
    return product * (typeDefenseChart[defendingType]?.[attackType] ?? 1);
  }, 1);
}

function applyDraftOffenseDefenderAbility(value, attackType, defenderAbility) {
  if (!defenderAbility) return value;
  if (attackType === 'Ground' && ['Earth Eater', 'Levitate'].includes(defenderAbility)) return 0;
  if (attackType === 'Water' && ['Dry Skin', 'Storm Drain', 'Water Absorb'].includes(defenderAbility)) return 0;
  if (attackType === 'Electric' && ['Lightning Rod', 'Motor Drive', 'Volt Absorb'].includes(defenderAbility)) return 0;
  if (attackType === 'Grass' && defenderAbility === 'Sap Sipper') return 0;
  if (attackType === 'Fire') {
    if (['Flash Fire', 'Well-Baked Body'].includes(defenderAbility)) return 0;
    if (['Heatproof', 'Thick Fat', 'Water Bubble'].includes(defenderAbility)) return value / 2;
    if (defenderAbility === 'Dry Skin') return value * 1.25;
  }
  if (attackType === 'Ice' && defenderAbility === 'Thick Fat') return value / 2;
  if (attackType === 'Ghost' && defenderAbility === 'Purifying Salt') return value / 2;
  if (value > 1 && ['Filter', 'Prism Armor', 'Solid Rock'].includes(defenderAbility)) return value * 0.75;
  return value;
}

function getDraftOffenseMoveEffectiveness(attackerAbility, move, defender) {
  let value;
  const moveType = getDraftOffenseMoveType(move, attackerAbility);
  const normalizedAbility = normalizeText(attackerAbility);
  if (draftOffenseFixedNeutralMoveIds.has(move.id)) {
    value = 1;
  } else {
    const baseValue = move.id === 'flyingpress'
      ? getDraftOffenseTypeValue(defender.types, 'Fighting', attackerAbility, move.id) *
        getDraftOffenseTypeValue(defender.types, 'Flying', attackerAbility, move.id)
      : getDraftOffenseTypeValue(defender.types, moveType, attackerAbility, move.id);
    if (normalizedAbility === 'moldbreaker') {
      value = baseValue;
    } else {
      const defenderAbilities = getDefenseAbilityStates(defender);
      value = Math.min(...defenderAbilities.map((ability) => applyDraftOffenseDefenderAbility(baseValue, moveType, ability)));
    }
  }
  if (normalizedAbility === 'tintedlens' && value === 0.5) value = 1;
  if (defender.name === 'Shedinja' && value < 2) value = 0;
  return value;
}

function getDraftOffenseBestResult(ownPlayer, ownPick, defender) {
  const attacker = pokemonByName.get(ownPick.name);
  if (!attacker) return null;
  const selection = getDraftOffenseSelection(ownPlayer, ownPick, attacker);
  const moveRows = new Map(getDraftOffenseMoveOptions(attacker).map((move) => [move.id, move]));
  const selectedMoves = selection.moves.map((moveId) => moveRows.get(moveId)).filter(isDraftOffenseDamagingMove);
  if (!selectedMoves.length) return null;
  return selectedMoves
    .map((move) => ({
      move,
      value: getDraftOffenseMoveEffectiveness(selection.ability, move, defender),
    }))
    .sort((left, right) => right.value - left.value || getMoveDisplayName(left.move).localeCompare(getMoveDisplayName(right.move)))[0] ?? null;
}

function getDraftOffenseValueClass(value) {
  if (value === null || value === undefined) return 'is-empty';
  const displayValue = Number(value.toFixed(2));
  if (displayValue === 0) return 'is-zero';
  if (displayValue <= 0.25) return 'is-red';
  if (displayValue <= 0.4) return 'is-dark-orange';
  if (displayValue < 1) return 'is-orange';
  if (displayValue === 1) return 'is-exact-neutral';
  if (displayValue > 1 && displayValue <= 2.5) return 'is-light-green';
  if (displayValue <= 3) return 'is-green';
  if (displayValue < 4) return 'is-dark-green';
  if (displayValue >= 4) return 'is-glow-green';
  return 'is-neutral';
}

function formatDraftOffenseValue(value) {
  if (value === null || value === undefined) return '-';
  return `${Number.isInteger(value) ? value : value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')}x`;
}

function createDraftOffenseHeaderChip(pick) {
  const pokemon = pokemonByName.get(pick.name);
  const chip = createNode('div', 'draft-offense-axis-chip');
  if (pokemon) {
    const sprite = document.createElement('img');
    setSpriteWithFallback(sprite, pokemon.sprite, `${getPokemonDisplayName(pokemon)} sprite`);
    chip.append(sprite, createNode('span', '', getPokemonDisplayName(pokemon)));
  } else {
    chip.append(createNode('span', '', pick.name));
  }
  return chip;
}

function renderDraftOverviewOffenseMatrix(players) {
  const content = getDraftOverviewContentTarget();
  if (!content) return;
  content.innerHTML = '';
  renderDraftOverviewHeader(content, players);
  normalizeDraftOffensePlayers(players);
  content.append(createDraftOffenseTeamControls(players));
  const ownPlayer = players.find((player) => player.id === draftOffenseOwnPlayerId) ?? players[0];
  const opponentPlayer = players.find((player) => player.id === draftOffenseOpponentPlayerId) ?? players[0];
  const section = createNode('div', 'draft-overview-panel');
  section.append(createNode('h3', '', `${ownPlayer.name} vs ${opponentPlayer.name}: Offense Matrix`));
  if (!ownPlayer.pokemon?.length || !opponentPlayer.pokemon?.length) {
    renderEmptyDetailState(section, 'Noch keine Pokemon fuer diese Offense Matrix.');
    content.append(section);
    return;
  }

  const roster = createNode('div', 'draft-offense-roster');
  for (const pick of ownPlayer.pokemon) roster.append(createDraftOffensePokemonEditor(ownPlayer, pick));

  const wrap = createNode('div', 'draft-offense-matrix-wrap');
  const table = document.createElement('table');
  table.className = 'draft-offense-matrix';
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.append(createNode('th', '', 'Gegner'));
  for (const pick of ownPlayer.pokemon) {
    const header = document.createElement('th');
    header.append(createDraftOffenseHeaderChip(pick));
    headerRow.append(header);
  }
  thead.append(headerRow);
  table.append(thead);

  const tbody = document.createElement('tbody');
  for (const defenderPick of opponentPlayer.pokemon) {
    const defender = pokemonByName.get(defenderPick.name);
    if (!defender) continue;
    const row = document.createElement('tr');
    const nameCell = document.createElement('th');
    nameCell.className = 'budget-planner-matrix-pokemon';
    nameCell.append(createDraftOverviewPokemonLink(defenderPick));
    row.append(nameCell);
    for (const ownPick of ownPlayer.pokemon) {
      const result = getDraftOffenseBestResult(ownPlayer, ownPick, defender);
      const cell = document.createElement('td');
      const value = result?.value ?? null;
      cell.className = `draft-offense-cell ${getDraftOffenseValueClass(value)}`;
      cell.textContent = formatDraftOffenseValue(value);
      if (result?.move) {
        const attacker = pokemonByName.get(ownPick.name);
        cell.title = `${attacker ? getPokemonDisplayName(attacker) : ownPick.name} -> ${getPokemonDisplayName(defender)}: ${getMoveDisplayName(result.move)}`;
      }
      row.append(cell);
    }
    tbody.append(row);
  }
  table.append(tbody);
  wrap.append(table);
  section.append(roster, wrap);
  content.append(section);
}

const shedinjaCheckMoveIds = {
  entryHazards: ['spikes', 'stealthrock'],
  burn: ['willowisp'],
  poison: ['toxic', 'banefulbunker', 'poisongas', 'poisonpowder', 'toxicspikes', 'toxicthread'],
  hail: ['hail'],
  sand: ['sandstorm'],
  bypass: ['moongeistbeam', 'photongeyser', 'sunsteelstrike'],
  seed: ['leechseed'],
  antiItem: ['gravity', 'wonderroom'],
};

const shedinjaCheckAbilityNames = {
  burn: ['Flame Body'],
  poison: ['Poison Point'],
  contact: ['Rough Skin', 'Iron Barbs'],
  sand: ['Sand Stream'],
  breaker: ['Mold Breaker', 'Teravolt', 'Turboblaze'],
};

const shedinjaTeraPalettes = {
  Normal: ['#d5d2c8', '#f7f4eb', '#aba69a', '#ffffff', '#c6c0b5', '#8f887d'],
  Fire: ['#ff3b22', '#ff8a2d', '#ffd166', '#b91c1c', '#ff5c38', '#fff0a6'],
  Water: ['#1677ff', '#53d3ff', '#b7f3ff', '#0f4fb3', '#6ba8ff', '#e3fbff'],
  Electric: ['#ffe047', '#fff68a', '#ffb703', '#f59e0b', '#fffbd1', '#facc15'],
  Grass: ['#1fa463', '#6ee787', '#b7f7c1', '#0f6b3f', '#3ddc84', '#eaffd8'],
  Ice: ['#71e8ff', '#d6fbff', '#a7f3ff', '#3bb5d5', '#f0feff', '#8bdff0'],
  Fighting: ['#d23936', '#ff6b5f', '#8a1f1c', '#ffc3b8', '#ef4444', '#7f1d1d'],
  Poison: ['#a855f7', '#d8b4fe', '#7e22ce', '#f0abfc', '#9333ea', '#581c87'],
  Ground: ['#d6a752', '#f3d28b', '#8a5f25', '#fff1bf', '#c08435', '#6b4218'],
  Flying: ['#82a9ff', '#c7d7ff', '#516fc4', '#eef4ff', '#9db8ff', '#384c9c'],
  Psychic: ['#ff4fa3', '#ff9ed2', '#be185d', '#ffd1ea', '#ec4899', '#831843'],
  Bug: ['#9aba23', '#d7ef6b', '#657c13', '#f3ffd0', '#a3c51f', '#4d5f0f'],
  Rock: ['#a98445', '#e3c277', '#6f5528', '#fff0bd', '#b99454', '#4c351c'],
  Ghost: ['#6d5bbf', '#a99af4', '#3f2b83', '#e3dcff', '#7c6de0', '#24134f'],
  Dragon: ['#6c4cff', '#a590ff', '#341ec3', '#ddd6ff', '#7f5fff', '#211080'],
  Dark: ['#5c4b43', '#a08a7e', '#2d2524', '#dccfc8', '#6b5a50', '#171312'],
  Steel: ['#8ea3b8', '#d9e4ef', '#5f748a', '#f6fbff', '#9aadc0', '#34495e'],
  Fairy: ['#ff87c9', '#ffd0ea', '#d946a5', '#fff0f8', '#f9a8d4', '#9d266d'],
};

function getShedinjaDefenseTypes() {
  return shedinjaCheckState.teraActive ? [shedinjaCheckState.teraType] : ['Bug', 'Ghost'];
}

function getShedinjaEffectiveness(move, defenseTypes = getShedinjaDefenseTypes()) {
  if (!move?.type || move.category === 'Status') return 0;
  if (move.id === 'flyingpress') {
    return getTypeChartDefenseValue(defenseTypes, 'Fighting') * getTypeChartDefenseValue(defenseTypes, 'Flying');
  }
  if (move.id === 'freezedry' && defenseTypes.includes('Water')) {
    return defenseTypes.reduce((product, defendingType) => product * (defendingType === 'Water' ? 2 : (typeDefenseChart[defendingType]?.Ice ?? 1)), 1);
  }
  return getTypeChartDefenseValue(defenseTypes, move.type);
}

function getShedinjaPokemonMoves(pokemon) {
  return getLegalPokemonMoveRows(pokemon);
}

function getShedinjaMoveMatches(pokemon, moveIds) {
  const requested = new Set(moveIds);
  return getShedinjaPokemonMoves(pokemon).filter((move) => requested.has(move.id));
}

function hasShedinjaMove(pokemon, moveId) {
  return getShedinjaMoveMatches(pokemon, [moveId]).length > 0;
}

function getShedinjaAbilityMatches(pokemon, abilityNames) {
  const requested = new Set(abilityNames);
  return getPokemonAbilityNames(pokemon).filter((ability) => requested.has(ability));
}

function createShedinjaReason(kind, label, details = [], options = {}) {
  return {
    kind,
    label,
    details: details.filter(Boolean),
    caution: options.caution ?? '',
  };
}

function formatShedinjaMoveList(moves, limit = 5) {
  const names = moves.map(getMoveDisplayName);
  if (names.length <= limit) return names;
  return [...names.slice(0, limit), `+${names.length - limit}`];
}

function getShedinjaCheckReasons(pokemon) {
  const reasons = [];
  const defenseTypes = getShedinjaDefenseTypes();
  const teraType = shedinjaCheckState.teraActive ? shedinjaCheckState.teraType : null;
  const damagingSuperMoves = getShedinjaPokemonMoves(pokemon)
    .filter((move) => move.category !== 'Status' && getShedinjaEffectiveness(move, defenseTypes) >= 2)
    .sort((left, right) => getMoveDisplayName(left).localeCompare(getMoveDisplayName(right)));
  const hasGravity = hasShedinjaMove(pokemon, 'gravity');
  const hasWonderRoom = hasShedinjaMove(pokemon, 'wonderroom');
  const antiAirMoves = [
    ...(hasGravity ? [moveDetailsById.gravity] : []),
    ...(hasWonderRoom ? [moveDetailsById.wonderroom] : []),
  ].filter(Boolean);
  const groundWarningApplies = teraType && ['Electric', 'Steel', 'Poison', 'Fire'].includes(teraType);
  const superMoveDetails = formatShedinjaMoveList(damagingSuperMoves);
  if (groundWarningApplies) {
    const groundMoves = damagingSuperMoves.filter((move) => move.type === 'Ground');
    if (groundMoves.length && !hasGravity && !hasWonderRoom) {
      superMoveDetails.push('❗ Vorsicht, Luftballon');
    } else if (groundMoves.length && antiAirMoves.length) {
      superMoveDetails.push(...formatShedinjaMoveList(antiAirMoves));
    }
  }
  if (damagingSuperMoves.length) reasons.push(createShedinjaReason('damage', 'Super-effektiver Schaden', superMoveDetails));

  const hazards = getShedinjaMoveMatches(pokemon, shedinjaCheckMoveIds.entryHazards);
  if (hazards.length) reasons.push(createShedinjaReason('hazard', 'Hazards', formatShedinjaMoveList(hazards)));

  if (teraType !== 'Fire') {
    const burnMoves = getShedinjaMoveMatches(pokemon, shedinjaCheckMoveIds.burn);
    const burnAbilities = getShedinjaAbilityMatches(pokemon, shedinjaCheckAbilityNames.burn);
    if (burnMoves.length || burnAbilities.length) reasons.push(createShedinjaReason('status', 'Burn', [...formatShedinjaMoveList(burnMoves), ...burnAbilities]));
  }

  if (teraType !== 'Poison') {
    const poisonMoves = getShedinjaMoveMatches(pokemon, shedinjaCheckMoveIds.poison);
    const poisonAbilities = getShedinjaAbilityMatches(pokemon, shedinjaCheckAbilityNames.poison);
    const poisonDetails = formatShedinjaMoveList(poisonMoves);
    if (poisonMoves.some((move) => move.id === 'poisonpowder') && !hasWonderRoom) poisonDetails.push('❗ Vorsicht, Schutzbrille');
    if (poisonMoves.some((move) => move.id === 'poisonpowder') && hasWonderRoom) poisonDetails.push(getMoveDisplayName(moveDetailsById.wonderroom));
    if (poisonMoves.length || poisonAbilities.length) reasons.push(createShedinjaReason('status', 'Poison', [...poisonDetails, ...poisonAbilities]));
  }

  const contactAbilities = getShedinjaAbilityMatches(pokemon, shedinjaCheckAbilityNames.contact);
  if (contactAbilities.length) reasons.push(createShedinjaReason('ability', 'Kontakt-Schaden', contactAbilities));

  if (teraType !== 'Ice') {
    const hailMoves = getShedinjaMoveMatches(pokemon, shedinjaCheckMoveIds.hail);
    const details = formatShedinjaMoveList(hailMoves);
    if (hailMoves.length && !hasWonderRoom) details.push('❗ Vorsicht, Schutzbrille');
    if (hailMoves.length && hasWonderRoom) details.push(getMoveDisplayName(moveDetailsById.wonderroom));
    if (hailMoves.length) reasons.push(createShedinjaReason('weather', 'Hail', details));
  }

  if (!['Ground', 'Rock', 'Steel'].includes(teraType ?? '')) {
    const sandMoves = getShedinjaMoveMatches(pokemon, shedinjaCheckMoveIds.sand);
    const sandAbilities = getShedinjaAbilityMatches(pokemon, shedinjaCheckAbilityNames.sand);
    const details = [...formatShedinjaMoveList(sandMoves), ...sandAbilities];
    if ((sandMoves.length || sandAbilities.length) && !hasWonderRoom) details.push('❗ Vorsicht, Schutzbrille');
    if ((sandMoves.length || sandAbilities.length) && hasWonderRoom) details.push(getMoveDisplayName(moveDetailsById.wonderroom));
    if (sandMoves.length || sandAbilities.length) reasons.push(createShedinjaReason('weather', 'Sand', details));
  }

  const bypassMoves = getShedinjaMoveMatches(pokemon, shedinjaCheckMoveIds.bypass)
    .filter((move) => !(move.id === 'moongeistbeam' && teraType === 'Normal'))
    .filter((move) => !(move.id === 'photongeyser' && teraType === 'Dark'));
  if (pokemon.name === 'Necrozma-Ultra') bypassMoves.push({ id: 'ultranecrozma', name: 'Ultra Necrozma' });
  if (bypassMoves.length) reasons.push(createShedinjaReason('bypass', 'Ignore Ability', bypassMoves.map((move) => move.name ? getMoveDisplayName(move) : move)));

  const breakerAbilities = getShedinjaAbilityMatches(pokemon, shedinjaCheckAbilityNames.breaker);
  if (breakerAbilities.length) reasons.push(createShedinjaReason('ability', 'Mold Breaker', breakerAbilities));

  if (teraType !== 'Grass') {
    const seedMoves = getShedinjaMoveMatches(pokemon, shedinjaCheckMoveIds.seed);
    if (seedMoves.length) reasons.push(createShedinjaReason('status', 'Leech Seed', formatShedinjaMoveList(seedMoves)));
  }

  return reasons;
}

function createShedinjaSpritePanel() {
  const panel = createNode('div', 'shedinja-check-sprite-panel');
  const shedinja = pokemonByName.get('Shedinja');
  const spriteWrap = createNode('div', 'shedinja-check-sprite-wrap');
  if (shedinja) {
    const sprite = document.createElement('img');
    setSpriteWithFallback(sprite, shedinja.sprite, 'Ninjatom sprite');
    spriteWrap.append(sprite);
    if (shedinjaCheckState.teraActive) {
      appendTeraSpriteCheckerOverlay(spriteWrap, shedinja.sprite, shedinjaCheckState.teraType);
    }
  }
  const label = createNode('strong', '', shedinjaCheckState.teraActive ? `Ninjatom Tera ${typeLabelsDe[shedinjaCheckState.teraType] ?? shedinjaCheckState.teraType}` : 'Ninjatom Bug/Ghost');
  panel.append(spriteWrap, label);
  return panel;
}

function createShedinjaCheckControls(players) {
  const controls = createNode('div', 'shedinja-check-controls');
  const teraToggle = createNode('label', 'hide-filter ev-optimizer-toggle');
  const teraInput = document.createElement('input');
  teraInput.type = 'checkbox';
  teraInput.checked = shedinjaCheckState.teraActive;
  teraInput.addEventListener('change', () => {
    shedinjaCheckState.teraActive = teraInput.checked;
    renderDraftOverview();
  });
  teraToggle.append(teraInput, document.createTextNode(' Tera aktiv'));

  const teraTypeField = createNode('label', 'details-field shedinja-tera-type-field');
  teraTypeField.hidden = !shedinjaCheckState.teraActive;
  teraTypeField.append(createNode('span', '', 'Tera-Typ'));
  const teraTypeSelect = document.createElement('select');
  for (const type of battleTypes) {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = typeLabelsDe[type] ?? type;
    if (type === shedinjaCheckState.teraType) option.selected = true;
    teraTypeSelect.append(option);
  }
  teraTypeSelect.addEventListener('change', () => {
    shedinjaCheckState.teraType = teraTypeSelect.value;
    renderDraftOverview();
  });
  teraTypeField.append(teraTypeSelect);

  const playerField = createNode('label', 'details-field');
  playerField.append(createNode('span', '', 'Spieler'));
  const playerSelect = document.createElement('select');
  for (const player of players) {
    const option = document.createElement('option');
    option.value = player.id;
    option.textContent = player.name;
    if (player.id === shedinjaCheckState.playerId) option.selected = true;
    playerSelect.append(option);
  }
  playerSelect.addEventListener('change', () => {
    shedinjaCheckState.playerId = playerSelect.value;
    renderDraftOverview();
  });
  playerField.append(playerSelect);
  controls.append(teraToggle, teraTypeField, playerField);
  return controls;
}

function createShedinjaCheckPokemonCard(pick) {
  const pokemon = pokemonByName.get(pick.name);
  const card = createNode('article', 'shedinja-check-card');
  if (!pokemon) {
    card.append(createNode('strong', '', pick.name));
    return card;
  }
  const header = createNode('div', 'shedinja-check-card-header');
  const sprite = document.createElement('img');
  setSpriteWithFallback(sprite, pokemon.sprite, `${getPokemonDisplayName(pokemon)} sprite`);
  header.append(sprite, createNode('strong', '', getPokemonDisplayName(pokemon)));
  const reasons = getShedinjaCheckReasons(pokemon);
  const reasonList = createNode('div', 'shedinja-check-reasons');
  if (!reasons.length) {
    reasonList.append(createNode('span', 'shedinja-check-empty', 'Kein Treffer'));
  } else {
    for (const reason of reasons) {
      const chip = createNode('div', `shedinja-check-reason is-${reason.kind}`);
      chip.append(createNode('strong', '', reason.label));
      if (reason.details.length) chip.append(createNode('span', '', reason.details.join(', ')));
      reasonList.append(chip);
    }
  }
  card.append(header, reasonList);
  return card;
}

function renderShedinjaCheck(players) {
  const content = getDraftOverviewContentTarget();
  if (!content) return;
  content.innerHTML = '';
  if (players.length) renderDraftOverviewHeader(content, players);
  if (!players.some((player) => player.id === shedinjaCheckState.playerId)) {
    shedinjaCheckState.playerId = players[0]?.id ?? null;
  }
  const section = createNode('div', 'draft-overview-panel shedinja-check-panel');
  const heading = createNode('div', 'detail-section-heading');
  heading.append(createNode('h3', '', 'Ninjatom Check'));
  const back = createNode('button', 'details-secondary', 'Weitere Tools');
  back.type = 'button';
  back.addEventListener('click', () => {
    draftOverviewMode = 'tools';
    renderDraftOverview();
  });
  heading.append(back);
  section.append(heading, createShedinjaSpritePanel(), createShedinjaCheckControls(players));
  const selectedPlayer = players.find((player) => player.id === shedinjaCheckState.playerId);
  if (!selectedPlayer?.pokemon?.length) {
    renderEmptyDetailState(section, 'Keine Pokemon fuer diesen Spieler gefunden.');
  } else {
    const roster = createNode('div', 'shedinja-check-roster');
    for (const pick of selectedPlayer.pokemon) roster.append(createShedinjaCheckPokemonCard(pick));
    section.append(roster);
  }
  content.append(section);
}

function createDraftOverviewToolCard({ label, key, action, disabled = false }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'hub-action-card draft-tool-card';
  if (key) button.dataset.draftTool = key;
  if (action) button.dataset.draftToolAction = action;
  if (disabled) {
    button.setAttribute('aria-disabled', 'true');
    button.classList.add('is-placeholder');
  }
  const art = createNode('span', 'hub-action-art');
  art.setAttribute('aria-hidden', 'true');
  button.append(art, createNode('span', '', label));
  return button;
}

function handleDraftToolAction(action) {
  if (action === 'core-finder') {
    openCoreFinder();
    return;
  }
  if (action === 'replacement-finder') {
    openReplacementPicker();
    return;
  }
  if (action === 'ev-optimizer') {
    draftOverviewMode = 'ev-optimizer';
    renderDraftOverview();
    return;
  }
  if (action === 'outspeed-helper') {
    draftOverviewMode = 'outspeed-helper';
    renderDraftOverview();
    return;
  }
  if (action === 'shedinja-check') {
    draftOverviewMode = 'shedinja-check';
    renderDraftOverview();
    return;
  }
  if (action === 'damage-calc') {
    window.location.href = 'damage-calc-master/dist/index.html';
  }
}

function renderDraftOverviewTools(players) {
  const content = getDraftOverviewContentTarget();
  if (!content) return;
  content.innerHTML = '';
  renderDraftOverviewHeader(content, players);
  const section = createNode('div', 'draft-overview-panel');
  section.append(createNode('h3', '', 'Weitere Tools'));
  const grid = createNode('div', 'hub-action-grid draft-tools-grid');
  [
    { label: 'Ninjatom Check', key: 'shedinja-check', action: 'shedinja-check' },
    { label: 'EVs Optimieren', key: 'ev-optimizer', action: 'ev-optimizer' },
    { label: 'Outspeed Helfer', key: 'outspeed-helper', action: 'outspeed-helper' },
    { label: 'Damage Calc', key: 'damage-calc', action: 'damage-calc' },
    { label: 'Core Sucher', key: 'core-finder', action: 'core-finder' },
    { label: 'Ersatzfinder', key: 'replacement-finder', action: 'replacement-finder' },
  ].forEach((tool) => grid.append(createDraftOverviewToolCard(tool)));
  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-draft-tool-action]');
    if (!button) return;
    handleDraftToolAction(button.dataset.draftToolAction);
  });
  section.append(grid);
  content.append(section);
}

function getEvOptimizerPokemonOptions() {
  return allPokemon
    .filter((pokemon) => !pokemon.hidden && !pokemon.unreleased && !pokemon.impossible)
    .sort((left, right) => left.num - right.num || left.name.localeCompare(right.name));
}

function getEvOptimizerPokemon() {
  if (!evOptimizerState.pokemonName) {
    evOptimizerState.pokemonName = getEvOptimizerPokemonOptions()[0]?.name ?? '';
  }
  return getPokemonByNameLoose(evOptimizerState.pokemonName) ?? getEvOptimizerPokemonOptions()[0] ?? null;
}

function clampInteger(value, min, max, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function getEvOptimizerNatureMultiplier(stat, plus = evOptimizerState.naturePlus, minus = evOptimizerState.natureMinus) {
  if (stat === 'hp') return 1;
  if (stat === plus) return 1.1;
  if (stat === minus) return 0.9;
  return 1;
}

function calculateEvOptimizerStat(baseStats, stat, options) {
  const base = baseStats?.[stat] ?? 0;
  if (stat === 'hp') return calculateRealHp(base, options);
  return calculateRealOtherStat(base, options);
}

function getEvOptimizerRealStats(pokemon) {
  return Object.fromEntries(evOptimizerStats.map((stat) => [stat, calculateEvOptimizerStat(pokemon.baseStats, stat, {
    level: evOptimizerState.level,
    iv: evOptimizerState.stats[stat]?.iv ?? 31,
    ev: evOptimizerState.stats[stat]?.ev ?? 0,
    nature: getEvOptimizerNatureMultiplier(stat),
  })]));
}

function getEvOptimizerScore(stats, trickRoom = evOptimizerState.trickRoom) {
  return evOptimizerStats.reduce((sum, stat) => sum + (stat === 'spe' && trickRoom ? -stats[stat] : stats[stat]), 0);
}

function getEvOptimizerNatureOptions() {
  const nonHp = evOptimizerStats.filter((stat) => stat !== 'hp');
  const options = [{ plus: '', minus: '', label: 'Neutral' }];
  for (const plus of nonHp) {
    for (const minus of nonHp) {
      if (plus === minus) continue;
      options.push({ plus, minus, label: `+${evOptimizerNatureLabels[plus]}/-${evOptimizerNatureLabels[minus]}` });
    }
  }
  return options;
}

function getEvOptimizerNatureKey(plus = evOptimizerState.naturePlus, minus = evOptimizerState.natureMinus) {
  return plus && minus ? `${plus}:${minus}` : 'neutral';
}

function parseEvOptimizerNatureKey(key) {
  if (key === 'neutral') return { plus: '', minus: '' };
  const [plus, minus] = key.split(':');
  return { plus: plus ?? '', minus: minus ?? '' };
}

function buildEvOptimizerStatOptions(pokemon, stat, nature, currentValue) {
  const isTrickRoomSpeed = evOptimizerState.trickRoom && stat === 'spe';
  const iv = isTrickRoomSpeed ? 0 : 31;
  const options = [];
  for (let q = 0; q <= 63; q += 1) {
    const ev = q * 4;
    const value = calculateEvOptimizerStat(pokemon.baseStats, stat, {
      level: evOptimizerState.level,
      iv,
      ev,
      nature: getEvOptimizerNatureMultiplier(stat, nature.plus, nature.minus),
    });
    const dominates = isTrickRoomSpeed ? value <= currentValue : value >= currentValue;
    if (dominates) options.push({ q, ev, iv, value });
  }
  return options;
}

function findEvOptimizerImprovement(pokemon, currentStats) {
  const currentScore = getEvOptimizerScore(currentStats);
  const natureOptions = getEvOptimizerNatureOptions();
  for (const nature of natureOptions) {
    const optionsByStat = Object.fromEntries(evOptimizerStats.map((stat) => [
      stat,
      buildEvOptimizerStatOptions(pokemon, stat, nature, currentStats[stat]),
    ]));
    if (evOptimizerStats.some((stat) => !optionsByStat[stat].length)) continue;
    let states = [{ q: 0, score: 0, values: {}, spread: {} }];
    for (const stat of evOptimizerStats) {
      const nextStates = [];
      for (const state of states) {
        for (const option of optionsByStat[stat]) {
          const totalQ = state.q + option.q;
          if (totalQ > 127) continue;
          nextStates.push({
            q: totalQ,
            score: state.score + (stat === 'spe' && evOptimizerState.trickRoom ? -option.value : option.value),
            values: { ...state.values, [stat]: option.value },
            spread: { ...state.spread, [stat]: { iv: option.iv, ev: option.ev } },
          });
        }
      }
      nextStates.sort((left, right) => right.score - left.score || left.q - right.q);
      const bestByQ = new Map();
      for (const state of nextStates) {
        if (!bestByQ.has(state.q)) bestByQ.set(state.q, state);
      }
      states = [...bestByQ.values()];
    }
    const best = states.sort((left, right) => right.score - left.score || left.q - right.q)[0];
    if (best && best.score > currentScore) {
      return { ...best, nature };
    }
  }
  return null;
}

function createEvOptimizerNumberField(labelText, value, min, max, onInput) {
  const label = createNode('label', 'details-field');
  label.append(createNode('span', '', labelText));
  const input = document.createElement('input');
  input.type = 'number';
  input.min = String(min);
  input.max = String(max);
  input.value = String(value);
  const commitValue = () => onInput(clampInteger(input.value, min, max, value));
  input.addEventListener('change', commitValue);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitValue();
    }
  });
  label.append(input);
  return label;
}

function renderEvOptimizer(players = []) {
  const content = getDraftOverviewContentTarget();
  if (!content) return;
  content.innerHTML = '';
  if (players.length) renderDraftOverviewHeader(content, players);
  const pokemon = getEvOptimizerPokemon();
  const section = createNode('div', 'draft-overview-panel ev-optimizer-panel');
  const heading = createNode('div', 'detail-section-heading');
  heading.append(createNode('h3', '', 'EVs Optimieren'));
  const back = createNode('button', 'details-secondary', 'Weitere Tools');
  back.type = 'button';
  back.addEventListener('click', () => {
    draftOverviewMode = 'tools';
    renderDraftOverview();
  });
  heading.append(back);

  const controls = createNode('div', 'ev-optimizer-controls');
  const pokemonField = createNode('label', 'details-field');
  pokemonField.append(createNode('span', '', 'Pokemon'));
  const pokemonInput = document.createElement('input');
  pokemonInput.type = 'search';
  pokemonInput.autocomplete = 'off';
  pokemonInput.value = pokemon ? getPokemonDisplayName(pokemon) : '';
  const pokemonList = document.createElement('datalist');
  pokemonList.id = 'ev-optimizer-pokemon-list';
  pokemonInput.setAttribute('list', pokemonList.id);
  for (const optionPokemon of getEvOptimizerPokemonOptions()) {
    const option = document.createElement('option');
    option.value = optionPokemon.name;
    option.label = getPokemonDisplayName(optionPokemon);
    pokemonList.append(option);
  }
  const commitPokemon = () => {
    const match = getPokemonByNameLoose(pokemonInput.value);
    if (!match) return;
    evOptimizerState.pokemonName = match.name;
    renderDraftOverview();
  };
  pokemonInput.addEventListener('change', commitPokemon);
  pokemonInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitPokemon();
    }
  });
  pokemonField.append(pokemonInput, pokemonList);

  const natureField = createNode('label', 'details-field');
  natureField.append(createNode('span', '', 'Nature'));
  const natureSelect = document.createElement('select');
  const activeNatureKey = getEvOptimizerNatureKey();
  for (const optionNature of getEvOptimizerNatureOptions()) {
    const option = document.createElement('option');
    option.value = getEvOptimizerNatureKey(optionNature.plus, optionNature.minus);
    option.textContent = optionNature.label;
    if (option.value === activeNatureKey) option.selected = true;
    natureSelect.append(option);
  }
  natureSelect.addEventListener('change', () => {
    const nature = parseEvOptimizerNatureKey(natureSelect.value);
    evOptimizerState.naturePlus = nature.plus;
    evOptimizerState.natureMinus = nature.minus;
    renderDraftOverview();
  });
  natureField.append(natureSelect);

  const trickRoomLabel = createNode('label', 'hide-filter ev-optimizer-toggle');
  const trickRoomInput = document.createElement('input');
  trickRoomInput.type = 'checkbox';
  trickRoomInput.checked = evOptimizerState.trickRoom;
  trickRoomInput.addEventListener('change', () => {
    evOptimizerState.trickRoom = trickRoomInput.checked;
    renderDraftOverview();
  });
  trickRoomLabel.append(trickRoomInput, document.createTextNode(' Trick Room'));

  controls.append(
    pokemonField,
    createEvOptimizerNumberField('Level', evOptimizerState.level, 1, 100, (value) => {
      evOptimizerState.level = value;
      renderDraftOverview();
    }),
    natureField,
    trickRoomLabel,
  );

  const pokemonCard = createNode('div', 'ev-optimizer-pokemon-card');
  if (pokemon) {
    const sprite = document.createElement('img');
    setSpriteWithFallback(sprite, pokemon.sprite, `${getPokemonDisplayName(pokemon)} sprite`);
    const copy = createNode('div');
    copy.append(
      createNode('strong', '', getPokemonDisplayName(pokemon)),
      createNode('span', '', (pokemon.types ?? []).join(' / ')),
    );
    pokemonCard.append(sprite, copy);
  }

  const statGrid = createNode('div', 'ev-optimizer-stat-grid');
  const currentStats = pokemon ? getEvOptimizerRealStats(pokemon) : {};
  for (const stat of evOptimizerStats) {
    const card = createNode('div', 'ev-optimizer-stat-card');
    card.append(createNode('strong', '', statLabels[stat]));
    card.append(createNode('span', 'ev-optimizer-base', `Base ${pokemon?.baseStats?.[stat] ?? '-'}`));
    card.append(createEvOptimizerNumberField('IV', evOptimizerState.stats[stat]?.iv ?? 31, 0, 31, (value) => {
      evOptimizerState.stats[stat].iv = value;
      renderDraftOverview();
    }));
    card.append(createEvOptimizerNumberField('EV', evOptimizerState.stats[stat]?.ev ?? 0, 0, 252, (value) => {
      evOptimizerState.stats[stat].ev = value;
      renderDraftOverview();
    }));
    card.append(createNode('span', 'ev-optimizer-real-stat', `Wert ${currentStats[stat] ?? '-'}`));
    statGrid.append(card);
  }

  const totalEv = evOptimizerStats.reduce((sum, stat) => sum + (evOptimizerState.stats[stat]?.ev ?? 0), 0);
  const status = createNode('div', `ev-optimizer-status${totalEv > 510 ? ' is-error' : ''}`);
  if (!pokemon) {
    status.textContent = 'Waehle zuerst ein Pokemon.';
  } else if (totalEv > 510) {
    status.textContent = `Zu viele EVs: ${totalEv}/510`;
  } else if (totalEv < 510) {
    status.textContent = `EVs: ${totalEv}/510`;
  } else {
    const improvement = findEvOptimizerImprovement(pokemon, currentStats);
    if (!improvement) {
      status.textContent = 'Optimale EVs! 👍';
    } else {
      const natureText = improvement.nature.label;
      const spreadText = evOptimizerStats.map((stat) => `${statLabels[stat]} ${improvement.spread[stat].ev}EV/${improvement.spread[stat].iv}IV`).join(', ');
      status.textContent = `EVs koennen verbessert werden: ${natureText}; ${spreadText}`;
    }
  }

  section.append(heading, controls, pokemonCard, statGrid, status);
  content.append(section);
}

function getOutspeedPokemonOptions() {
  return getEvOptimizerPokemonOptions();
}

function getOutspeedPokemon(name = outspeedHelperState.pokemonName) {
  if (!name && !outspeedHelperState.pokemonName) {
    outspeedHelperState.pokemonName = getOutspeedPokemonOptions()[0]?.name ?? '';
    name = outspeedHelperState.pokemonName;
  }
  return getPokemonByNameLoose(name) ?? getOutspeedPokemonOptions()[0] ?? null;
}

function getOutspeedNatureMultiplier(natureKey) {
  if (natureKey === 'positive') return 1.1;
  if (natureKey === 'negative') return 0.9;
  return 1;
}

function getOutspeedNatureLabel(natureKey) {
  if (natureKey === 'positive') return '+Spe';
  if (natureKey === 'negative') return '-Spe';
  return 'Neutral';
}

function getOutspeedItemMultiplier(item) {
  return item === 'scarf' ? 1.5 : 1;
}

function calculateOutspeedRawSpeed(baseSpeed, { level, iv, ev, nature }) {
  return calculateRealOtherStat(baseSpeed ?? 0, {
    level,
    iv,
    ev,
    nature: getOutspeedNatureMultiplier(nature),
  });
}

function applyOutspeedMultipliers(value, { item = 'none', weatherRush = false, tailwind = false, stage = 0 } = {}) {
  const weatherMultiplier = weatherRush ? 2 : 1;
  const tailwindMultiplier = tailwind ? 2 : 1;
  const stageMultiplier = outspeedStageMultipliers[String(stage)] ?? 1;
  return Math.floor(value * weatherMultiplier * tailwindMultiplier * stageMultiplier * getOutspeedItemMultiplier(item));
}

function getOutspeedCurrentOwnSpeed(pokemon) {
  const raw = calculateOutspeedRawSpeed(pokemon?.baseStats?.spe ?? 0, outspeedHelperState);
  return applyOutspeedMultipliers(raw, {
    item: outspeedHelperState.item,
    weatherRush: outspeedHelperState.ownWeatherRush,
    tailwind: outspeedHelperState.ownTailwind,
  });
}

function getOutspeedTargetPresets() {
  const level = outspeedHelperState.targetLevel;
  const base = outspeedHelperState.targetBaseSpeed;
  return {
    positive: {
      label: '31IV + 252EV + positiv',
      value: calculateOutspeedRawSpeed(base, { level, iv: 31, ev: 252, nature: 'positive' }),
    },
    neutral: {
      label: '31IV + 0EV + neutral',
      value: calculateOutspeedRawSpeed(base, { level, iv: 31, ev: 0, nature: 'neutral' }),
    },
    negative: {
      label: '0IV + 0EV + negativ',
      value: calculateOutspeedRawSpeed(base, { level, iv: 0, ev: 0, nature: 'negative' }),
    },
  };
}

function getOutspeedTargetRawSpeed() {
  if (outspeedHelperState.mode === 'value') return outspeedHelperState.targetValue;
  if (outspeedHelperState.mode === 'pokemon') {
    const target = getOutspeedPokemon(outspeedHelperState.targetPokemonName);
    return calculateOutspeedRawSpeed(target?.baseStats?.spe ?? 0, {
      level: outspeedHelperState.targetLevel,
      iv: outspeedHelperState.targetIv,
      ev: outspeedHelperState.targetEv,
      nature: outspeedHelperState.targetNature,
    });
  }
  return getOutspeedTargetPresets()[outspeedHelperState.targetPreset]?.value ?? 0;
}

function getOutspeedTargetEffectiveSpeed() {
  return applyOutspeedMultipliers(getOutspeedTargetRawSpeed(), {
    item: outspeedHelperState.mode === 'pokemon' ? outspeedHelperState.targetItem : 'none',
    weatherRush: outspeedHelperState.targetWeatherRush,
    tailwind: outspeedHelperState.targetTailwind,
    stage: outspeedHelperState.targetStage,
  });
}

function findOutspeedMinimumSpread(pokemon, targetSpeed) {
  const baseSpeed = pokemon?.baseStats?.spe ?? 0;
  const items = outspeedHelperState.avoidScarf ? ['none', 'scarf'] : ['none', 'scarf'];
  const natures = outspeedHelperState.avoidPositiveNature ? ['neutral', 'positive'] : ['positive', 'neutral'];
  const candidates = [];
  for (const item of items) {
    for (const nature of natures) {
      for (let ev = 0; ev <= 252; ev += 4) {
        for (let iv = 0; iv <= 31; iv += 1) {
          const raw = calculateOutspeedRawSpeed(baseSpeed, { level: outspeedHelperState.level, iv, ev, nature });
          const value = applyOutspeedMultipliers(raw, {
            item,
            weatherRush: outspeedHelperState.ownWeatherRush,
            tailwind: outspeedHelperState.ownTailwind,
          });
          if (value > targetSpeed) candidates.push({ item, nature, ev, iv, raw, value });
        }
      }
    }
  }
  if (!candidates.length) return null;
  candidates.sort((left, right) => {
    const scarfPenalty = outspeedHelperState.avoidScarf ? Number(left.item === 'scarf') - Number(right.item === 'scarf') : 0;
    if (scarfPenalty) return scarfPenalty;
    const naturePenalty = outspeedHelperState.avoidPositiveNature ? Number(left.nature === 'positive') - Number(right.nature === 'positive') : 0;
    if (naturePenalty) return naturePenalty;
    return left.ev - right.ev || left.iv - right.iv || Number(left.item === 'scarf') - Number(right.item === 'scarf') || Number(left.nature === 'positive') - Number(right.nature === 'positive');
  });
  return candidates[0];
}

function createOutspeedPokemonField(labelText, value, onCommit) {
  const field = createNode('label', 'details-field');
  field.append(createNode('span', '', labelText));
  const input = document.createElement('input');
  input.type = 'search';
  input.autocomplete = 'off';
  const selected = getPokemonByNameLoose(value);
  input.value = selected ? getPokemonDisplayName(selected) : value;
  const list = document.createElement('datalist');
  list.id = `outspeed-pokemon-list-${normalizeText(labelText)}`;
  input.setAttribute('list', list.id);
  for (const pokemon of getOutspeedPokemonOptions()) {
    const option = document.createElement('option');
    option.value = pokemon.name;
    option.label = getPokemonDisplayName(pokemon);
    list.append(option);
  }
  const commit = () => {
    const match = getPokemonByNameLoose(input.value);
    if (!match) return;
    onCommit(match.name);
    renderDraftOverview();
  };
  input.addEventListener('change', commit);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commit();
    }
  });
  field.append(input, list);
  return field;
}

function createOutspeedSelectField(labelText, value, options, onChange) {
  const field = createNode('label', 'details-field');
  field.append(createNode('span', '', labelText));
  const select = document.createElement('select');
  for (const optionConfig of options) {
    const option = document.createElement('option');
    option.value = optionConfig.value;
    option.textContent = optionConfig.label;
    if (String(optionConfig.value) === String(value)) option.selected = true;
    select.append(option);
  }
  select.addEventListener('change', () => {
    onChange(select.value);
    renderDraftOverview();
  });
  field.append(select);
  return field;
}

function createOutspeedToggle(labelText, checked, onChange) {
  const label = createNode('label', 'hide-filter ev-optimizer-toggle');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => {
    onChange(input.checked);
    renderDraftOverview();
  });
  label.append(input, document.createTextNode(` ${labelText}`));
  return label;
}

function createOutspeedSetupPanel(title, prefix, state, isTarget = false) {
  const panel = createNode('div', 'outspeed-helper-card');
  panel.append(createNode('h4', '', title));
  const grid = createNode('div', 'outspeed-helper-fields');
  grid.append(
    createEvOptimizerNumberField('Level', state.level, 1, 100, (value) => {
      outspeedHelperState[prefix ? `${prefix}Level` : 'level'] = value;
      renderDraftOverview();
    }),
    createEvOptimizerNumberField('IV', state.iv, 0, 31, (value) => {
      outspeedHelperState[prefix ? `${prefix}Iv` : 'iv'] = value;
      renderDraftOverview();
    }),
    createEvOptimizerNumberField('EV', state.ev, 0, 252, (value) => {
      outspeedHelperState[prefix ? `${prefix}Ev` : 'ev'] = value;
      renderDraftOverview();
    }),
    createOutspeedSelectField('Nature', state.nature, [
      { value: 'positive', label: '+Spe' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'negative', label: '-Spe' },
    ], (value) => {
      outspeedHelperState[prefix ? `${prefix}Nature` : 'nature'] = value;
    }),
    createOutspeedSelectField('Item', state.item, [
      { value: 'none', label: 'Kein Item' },
      { value: 'scarf', label: 'Choice Scarf' },
    ], (value) => {
      outspeedHelperState[prefix ? `${prefix}Item` : 'item'] = value;
    }),
  );
  if (isTarget) {
    grid.append(createOutspeedSelectField('Stufe', outspeedHelperState.targetStage, Object.keys(outspeedStageMultipliers).map((stage) => ({ value: stage, label: stage })), (value) => {
      outspeedHelperState.targetStage = Number(value);
    }));
  }
  panel.append(grid);
  return panel;
}

function renderOutspeedTargetControls(container) {
  const targetSection = createNode('div', 'outspeed-helper-card');
  targetSection.append(createNode('h4', '', 'Ziel'));
  const modeField = createOutspeedSelectField('Modus', outspeedHelperState.mode, [
    { value: 'value', label: 'Echter Wert' },
    { value: 'pokemon', label: 'Zweites Pokemon' },
    { value: 'base', label: 'Base-Speed Werte' },
  ], (value) => {
    outspeedHelperState.mode = value;
  });
  const fields = createNode('div', 'outspeed-helper-fields');
  fields.append(modeField);
  if (outspeedHelperState.mode === 'value') {
    fields.append(createEvOptimizerNumberField('Echter Wert', outspeedHelperState.targetValue, 1, 2000, (value) => {
      outspeedHelperState.targetValue = value;
      renderDraftOverview();
    }));
  } else if (outspeedHelperState.mode === 'pokemon') {
    fields.append(createOutspeedPokemonField('Gegner Pokemon', outspeedHelperState.targetPokemonName, (name) => {
      outspeedHelperState.targetPokemonName = name;
    }));
    targetSection.append(fields, createOutspeedSetupPanel('Gegner Set', 'target', {
      level: outspeedHelperState.targetLevel,
      iv: outspeedHelperState.targetIv,
      ev: outspeedHelperState.targetEv,
      nature: outspeedHelperState.targetNature,
      item: outspeedHelperState.targetItem,
    }, true));
    container.append(targetSection);
    return;
  } else {
    fields.append(
      createEvOptimizerNumberField('Base Speed', outspeedHelperState.targetBaseSpeed, 1, 255, (value) => {
        outspeedHelperState.targetBaseSpeed = value;
        renderDraftOverview();
      }),
      createEvOptimizerNumberField('Level', outspeedHelperState.targetLevel, 1, 100, (value) => {
        outspeedHelperState.targetLevel = value;
        renderDraftOverview();
      }),
    );
    const presets = createNode('div', 'outspeed-preset-grid');
    const presetValues = getOutspeedTargetPresets();
    for (const [key, preset] of Object.entries(presetValues)) {
      const button = createNode('button', `details-secondary${outspeedHelperState.targetPreset === key ? ' is-active' : ''}`, `${preset.label}: ${preset.value}`);
      button.type = 'button';
      button.addEventListener('click', () => {
        outspeedHelperState.targetPreset = key;
        renderDraftOverview();
      });
      presets.append(button);
    }
    targetSection.append(fields, presets);
    container.append(targetSection);
    return;
  }
  fields.append(createOutspeedSelectField('Stufe', outspeedHelperState.targetStage, Object.keys(outspeedStageMultipliers).map((stage) => ({ value: stage, label: stage })), (value) => {
    outspeedHelperState.targetStage = Number(value);
  }));
  targetSection.append(fields);
  container.append(targetSection);
}

function renderOutspeedHelper(players = []) {
  const content = getDraftOverviewContentTarget();
  if (!content) return;
  content.innerHTML = '';
  if (players.length) renderDraftOverviewHeader(content, players);
  const ownPokemon = getOutspeedPokemon();
  if (!outspeedHelperState.targetPokemonName) outspeedHelperState.targetPokemonName = ownPokemon?.name ?? '';
  const section = createNode('div', 'draft-overview-panel outspeed-helper-panel');
  const heading = createNode('div', 'detail-section-heading');
  heading.append(createNode('h3', '', 'Outspeed Helfer'));
  const back = createNode('button', 'details-secondary', 'Weitere Tools');
  back.type = 'button';
  back.addEventListener('click', () => {
    draftOverviewMode = 'tools';
    renderDraftOverview();
  });
  heading.append(back);

  const mainGrid = createNode('div', 'outspeed-helper-grid');
  const ownSection = createNode('div', 'outspeed-helper-card');
  ownSection.append(createNode('h4', '', 'Eigenes Pokemon'));
  ownSection.append(createOutspeedPokemonField('Pokemon', outspeedHelperState.pokemonName, (name) => {
    outspeedHelperState.pokemonName = name;
  }));
  ownSection.append(createOutspeedSetupPanel('Eigenes Set', '', {
    level: outspeedHelperState.level,
    iv: outspeedHelperState.iv,
    ev: outspeedHelperState.ev,
    nature: outspeedHelperState.nature,
    item: outspeedHelperState.item,
  }));
  mainGrid.append(ownSection);
  renderOutspeedTargetControls(mainGrid);

  const toggles = createNode('div', 'outspeed-toggle-grid');
  toggles.append(
    createOutspeedToggle('Eigene Wetter Rush Faehigkeit', outspeedHelperState.ownWeatherRush, (checked) => {
      outspeedHelperState.ownWeatherRush = checked;
    }),
    createOutspeedToggle('Gegner Wetter Rush Faehigkeit', outspeedHelperState.targetWeatherRush, (checked) => {
      outspeedHelperState.targetWeatherRush = checked;
    }),
    createOutspeedToggle('Eigener Rueckenwind', outspeedHelperState.ownTailwind, (checked) => {
      outspeedHelperState.ownTailwind = checked;
    }),
    createOutspeedToggle('Gegner Rueckenwind', outspeedHelperState.targetTailwind, (checked) => {
      outspeedHelperState.targetTailwind = checked;
    }),
    createOutspeedToggle('Faehigkeit neutral falls moeglich', outspeedHelperState.avoidPositiveNature, (checked) => {
      outspeedHelperState.avoidPositiveNature = checked;
    }),
    createOutspeedToggle('Scarf vermeiden falls moeglich', outspeedHelperState.avoidScarf, (checked) => {
      outspeedHelperState.avoidScarf = checked;
    }),
  );

  const targetSpeed = getOutspeedTargetEffectiveSpeed();
  const ownCurrent = ownPokemon ? getOutspeedCurrentOwnSpeed(ownPokemon) : 0;
  const minimum = findOutspeedMinimumSpread(ownPokemon, targetSpeed);
  const result = createNode('div', `ev-optimizer-status${minimum ? '' : ' is-error'}`);
  if (!ownPokemon) {
    result.textContent = 'Waehle zuerst ein Pokemon.';
  } else if (!minimum) {
    result.textContent = `Kein legales Set outspeedet ${targetSpeed}. Aktuell: ${ownCurrent}.`;
  } else {
    result.textContent = `Ziel ${targetSpeed}, aktuell ${ownCurrent}. Minimum: ${minimum.iv} IV / ${minimum.ev} EV / ${getOutspeedNatureLabel(minimum.nature)} / ${minimum.item === 'scarf' ? 'Choice Scarf' : 'kein Item'} -> ${minimum.value}`;
  }

  section.append(heading, mainGrid, toggles, result);
  content.append(section);
}

function renderDraftOverviewSpeedTiers(players) {
  const content = getDraftOverviewContentTarget();
  if (!content) return;
  content.innerHTML = '';
  renderDraftOverviewHeader(content, players);
  const entries = players.flatMap((player) => (player.pokemon ?? []).map((pick) => {
    const pokemon = pokemonByName.get(pick.name);
    return pokemon ? { player, pokemon } : null;
  }).filter(Boolean));
  if (!entries.length) {
    renderEmptyDetailState(content, 'Noch keine Pokemon fuer Speed Tiers.');
    return;
  }
  const rows = entries.flatMap((entry) =>
    getSpeedTierVariantsForPokemon(entry.pokemon, {
      team: entry.player.id,
      stage: 0,
      showAllStages: false,
    }).map((row) => ({ ...row, player: entry.player, pokemon: entry.pokemon })),
  );
  rows.sort((left, right) => right.value - left.value || left.label.localeCompare(right.label));
  const list = createNode('div', 'speed-tiers-ranks draft-overview-speed-list');
  for (const row of rows) {
    const item = createNode('a', 'speed-tiers-rank-row draft-overview-speed-row');
    item.href = getDraftOverviewPokemonLink(row.pokemon.name);
    item.target = '_blank';
    item.rel = 'noopener noreferrer';
    const label = createNode('span', 'speed-tiers-rank-label', `${row.label} | ${row.player.name}`);
    const value = createNode('strong', 'speed-tiers-rank-value', String(row.value));
    item.append(label, value);
    list.append(item);
  }
  content.append(list);
}

function openDraftOverview() {
  draftOverviewContext = 'modal';
  renderDraftOverview();
  if (draftOverviewModal) draftOverviewModal.hidden = false;
}

function closeDraftOverview() {
  if (draftOverviewModal) draftOverviewModal.hidden = true;
}

function openPokemonDetailFromUrl() {
  const requestedName = new URLSearchParams(window.location.search).get('pokemon');
  if (!requestedName) return;
  const pokemon = getPokemonByNameLoose(requestedName);
  if (pokemon) openPokemonDetail(pokemon.name);
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

function formatGermanNameList(names) {
  if (names.length <= 1) return names[0] ?? '';
  if (names.length === 2) return `${names[0]} und ${names[1]}`;
  return `${names.slice(0, -1).join(', ')} und ${names[names.length - 1]}`;
}

function getSpielerEntries() {
  return Array.isArray(window.SPIELER) ? window.SPIELER : [];
}

function getSpielerHistoricTeamPokemon(previousTeam) {
  if (Array.isArray(previousTeam)) return previousTeam;
  if (Array.isArray(previousTeam?.pokemon)) return previousTeam.pokemon;
  if (Array.isArray(previousTeam?.team)) return previousTeam.team;
  return [];
}

function teamIncludesPokemon(team, pokemon) {
  if (!Array.isArray(team) || !team.length) return false;
  return team.some((name) => {
    const teamPokemon = getPokemonByNameLoose(name);
    return teamPokemon ? teamPokemon.name === pokemon.name : normalizeText(name) === normalizeText(pokemon.name);
  });
}

function getPokemonCareerUsage(pokemon) {
  const currentPlayers = [];
  const historicPlayers = new Set();
  let historicTeamCount = 0;

  for (const player of getSpielerEntries()) {
    if (teamIncludesPokemon(player.currentTeam, pokemon)) {
      currentPlayers.push(player.name);
    }

    const previousTeams = Array.isArray(player.previousTeams) ? player.previousTeams : [];
    for (const previousTeam of previousTeams) {
      if (teamIncludesPokemon(getSpielerHistoricTeamPokemon(previousTeam), pokemon)) {
        historicPlayers.add(player.name);
        historicTeamCount += 1;
      }
    }
  }

  return {
    currentPlayers,
    historicPlayerCount: historicPlayers.size,
    historicTeamCount,
  };
}

function getPokemonTotalUsageCount(pokemon) {
  let count = 0;

  for (const player of getSpielerEntries()) {
    if (teamIncludesPokemon(player.currentTeam, pokemon)) count += 1;

    const previousTeams = Array.isArray(player.previousTeams) ? player.previousTeams : [];
    for (const previousTeam of previousTeams) {
      if (teamIncludesPokemon(getSpielerHistoricTeamPokemon(previousTeam), pokemon)) count += 1;
    }
  }

  return count;
}

function getPokemonGenerationNumber(pokemon) {
  const divider = pokedexGenerationDividers.find((entry) => isPokemonWithinDividerRange(pokemon.num, entry));
  if (!divider) return null;
  return Number(divider.id.replace('gen', ''));
}

function getInformationGraphMetric(id) {
  return informationGraphMetrics.find((metric) => metric.id === id) ?? informationGraphMetrics[0];
}

function populateInformationGraphControls() {
  if (!informationGraphX || !informationGraphY || informationGraphX.options.length) return;

  for (const select of [informationGraphX, informationGraphY]) {
    for (const metric of informationGraphMetrics) {
      const option = document.createElement('option');
      option.value = metric.id;
      option.textContent = metric.label;
      select.append(option);
    }
  }

  informationGraphX.value = 'cost';
  informationGraphY.value = 'usage';
}

function getInformationGraphPokemonPool() {
  return allPokemon.filter((pokemon) => !pokemon.hidden);
}

function getGraphCssColor(variableName, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
  return value || fallback;
}

function drawInformationGraph({ withData = false } = {}) {
  if (!informationGraphCanvas) return;

  const canvas = informationGraphCanvas;
  const context = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();
  const pixelRatio = window.devicePixelRatio || 1;
  const cssWidth = Math.max(320, Math.round(rect.width || canvas.width));
  const cssHeight = Math.max(260, Math.round(rect.height || canvas.height));
  canvas.width = Math.round(cssWidth * pixelRatio);
  canvas.height = Math.round(cssHeight * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const xMetric = getInformationGraphMetric(informationGraphX?.value);
  const yMetric = getInformationGraphMetric(informationGraphY?.value);
  const isDark = document.body.classList.contains('dark-mode');
  const ink = isDark ? '#dce6ff' : getGraphCssColor('--ink', '#1f2233');
  const muted = isDark ? 'rgba(209, 218, 241, 0.72)' : '#6f7080';
  const grid = isDark ? 'rgba(201, 214, 255, 0.14)' : 'rgba(31, 34, 51, 0.12)';
  const accent = getGraphCssColor('--accent', '#d94f3d');
  const bg = isDark ? 'rgba(18, 26, 42, 0.92)' : 'rgba(255, 253, 249, 0.96)';
  const plot = {
    left: 72,
    right: 28,
    top: 28,
    bottom: 66,
  };
  const plotWidth = cssWidth - plot.left - plot.right;
  const plotHeight = cssHeight - plot.top - plot.bottom;

  context.clearRect(0, 0, cssWidth, cssHeight);
  context.fillStyle = bg;
  context.fillRect(0, 0, cssWidth, cssHeight);

  const rows = withData
    ? getInformationGraphPokemonPool()
        .map((pokemon) => ({
          pokemon,
          x: Number(xMetric.getValue(pokemon)),
          y: Number(yMetric.getValue(pokemon)),
        }))
        .filter((row) => Number.isFinite(row.x) && Number.isFinite(row.y))
    : [];

  const xValues = rows.map((row) => row.x);
  const yValues = rows.map((row) => row.y);
  const fallbackX = xMetric.id === 'generation' ? [1, 9] : [0, 100];
  const fallbackY = yMetric.id === 'generation' ? [1, 9] : [0, 100];
  let minX = xValues.length ? Math.min(...xValues) : fallbackX[0];
  let maxX = xValues.length ? Math.max(...xValues) : fallbackX[1];
  let minY = yValues.length ? Math.min(...yValues) : fallbackY[0];
  let maxY = yValues.length ? Math.max(...yValues) : fallbackY[1];
  if (minX === maxX) {
    minX -= 1;
    maxX += 1;
  }
  if (minY === maxY) {
    minY -= 1;
    maxY += 1;
  }

  const padX = Math.max((maxX - minX) * 0.06, xMetric.id === 'generation' ? 0.35 : 1);
  const padY = Math.max((maxY - minY) * 0.06, yMetric.id === 'generation' ? 0.35 : 1);
  minX -= padX;
  maxX += padX;
  minY -= padY;
  maxY += padY;

  const toCanvasX = (value) => plot.left + ((value - minX) / (maxX - minX)) * plotWidth;
  const toCanvasY = (value) => plot.top + plotHeight - ((value - minY) / (maxY - minY)) * plotHeight;
  const formatTick = (value) => Number.isInteger(value) ? String(value) : value.toFixed(1);

  context.strokeStyle = grid;
  context.lineWidth = 1;
  context.font = '12px Chakra Petch, sans-serif';
  context.fillStyle = muted;
  context.textAlign = 'right';
  context.textBaseline = 'middle';

  for (let index = 0; index <= 5; index += 1) {
    const fraction = index / 5;
    const x = plot.left + fraction * plotWidth;
    const y = plot.top + fraction * plotHeight;
    const xValue = minX + fraction * (maxX - minX);
    const yValue = maxY - fraction * (maxY - minY);

    context.beginPath();
    context.moveTo(x, plot.top);
    context.lineTo(x, plot.top + plotHeight);
    context.stroke();
    context.textAlign = 'center';
    context.fillText(formatTick(xValue), x, plot.top + plotHeight + 22);

    context.beginPath();
    context.moveTo(plot.left, y);
    context.lineTo(plot.left + plotWidth, y);
    context.stroke();
    context.textAlign = 'right';
    context.fillText(formatTick(yValue), plot.left - 12, y);
  }

  context.strokeStyle = ink;
  context.lineWidth = 1.5;
  context.beginPath();
  context.moveTo(plot.left, plot.top);
  context.lineTo(plot.left, plot.top + plotHeight);
  context.lineTo(plot.left + plotWidth, plot.top + plotHeight);
  context.stroke();

  context.fillStyle = ink;
  context.font = '700 14px Chakra Petch, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  context.fillText(xMetric.label, plot.left + plotWidth / 2, cssHeight - 22);
  context.save();
  context.translate(22, plot.top + plotHeight / 2);
  context.rotate(-Math.PI / 2);
  context.fillText(yMetric.label, 0, 0);
  context.restore();

  informationGraphPoints = rows.map((row) => ({
    ...row,
    canvasX: toCanvasX(row.x),
    canvasY: toCanvasY(row.y),
  }));

  if (!withData) {
    context.fillStyle = muted;
    context.font = '700 14px Chakra Petch, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Achsen wählen und Graph generieren', plot.left + plotWidth / 2, plot.top + plotHeight / 2);
    return;
  }

  context.fillStyle = accent;
  context.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.72)' : 'rgba(255, 255, 255, 0.95)';
  for (const point of informationGraphPoints) {
    context.beginPath();
    context.arc(point.canvasX, point.canvasY, 4.2, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }
}

function openInformationGraph() {
  populateInformationGraphControls();
  if (informationGraphModal) informationGraphModal.hidden = false;
  drawInformationGraph({ withData: false });
}

function closeInformationGraph() {
  if (informationGraphModal) informationGraphModal.hidden = true;
  if (informationGraphTooltip) informationGraphTooltip.hidden = true;
}

function setCostSuggestionFeedback(message, state = '') {
  if (!costSuggestionFeedback) return;
  costSuggestionFeedback.textContent = message;
  costSuggestionFeedback.dataset.state = state;
}

function setCostSuggestionsStatus(message, state = '') {
  if (!costSuggestionsStatus) return;
  costSuggestionsStatus.textContent = message;
  costSuggestionsStatus.dataset.state = state;
}

function resetCostSuggestionForm() {
  if (costSuggestionForm) costSuggestionForm.hidden = true;
  if (costSuggestionValue) costSuggestionValue.value = '';
  if (costSuggestionReason) costSuggestionReason.value = '';
  setCostSuggestionFeedback('', '');
}

function renderCostSuggestionToggle() {
  if (!detailTierList || !costSuggestionForm) return;
  const action = document.createElement('div');
  action.className = 'detail-ribbon cost-suggestion-toggle-ribbon';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'details-secondary';
  button.textContent = 'Kostenänderung vorschlagen';
  button.addEventListener('click', () => {
    costSuggestionForm.hidden = !costSuggestionForm.hidden;
    button.textContent = costSuggestionForm.hidden ? 'Kostenänderung vorschlagen' : 'Vorschlag ausblenden';
    if (!costSuggestionForm.hidden) costSuggestionValue?.focus();
  });
  action.append(button);
  detailTierList.append(action);
}

function readSuggestionField(entry, names) {
  for (const name of names) {
    if (entry?.[name] !== undefined && entry[name] !== null && entry[name] !== '') return entry[name];
  }
  const normalizedNames = names.map(normalizeText);
  const key = Object.keys(entry ?? {}).find((candidate) => normalizedNames.includes(normalizeText(candidate)));
  return key ? entry[key] : '';
}

function formatSuggestionDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

function getNormalizedCostSuggestions(payload) {
  const suggestions = Array.isArray(payload?.suggestions)
    ? payload.suggestions
    : Array.isArray(payload?.rows)
      ? payload.rows
      : Array.isArray(payload)
        ? payload
        : [];

  return suggestions.map((entry) => ({
    timestamp: readSuggestionField(entry, ['Timestamp', 'Zeitstempel', 'Datum']),
    pokemon: readSuggestionField(entry, ['Pokemon', 'Pokémon', 'pokemon']),
    currentCost: readSuggestionField(entry, ['Current Cost', 'Aktuelle Kosten', 'currentCost']),
    suggestedCost: readSuggestionField(entry, ['Suggested Cost', 'Vorgeschlagene Kosten', 'suggestedCost']),
    reason: readSuggestionField(entry, ['Reason', 'Begründung', 'Begruendung', 'reason']),
    name: readSuggestionField(entry, ['Name', 'Trainer', 'name']),
  })).filter((entry) => entry.pokemon || entry.suggestedCost || entry.reason);
}

function renderCostSuggestionsTable(suggestions) {
  if (!costSuggestionsTableWrap) return;
  costSuggestionsTableWrap.innerHTML = '';

  if (!suggestions.length) {
    const empty = document.createElement('div');
    empty.className = 'detail-empty-state';
    empty.textContent = 'Noch keine Änderungsvorschläge gefunden.';
    costSuggestionsTableWrap.append(empty);
    return;
  }

  const table = document.createElement('table');
  table.className = 'cost-suggestions-table';
  table.innerHTML = `
    <thead>
      <tr>
        <th>Datum</th>
        <th>Pok&eacute;mon</th>
        <th>Aktuell</th>
        <th>Vorschlag</th>
        <th>Name</th>
        <th>Begr&uuml;ndung</th>
      </tr>
    </thead>
  `;
  const body = document.createElement('tbody');
  for (const suggestion of suggestions) {
    const row = document.createElement('tr');
    const cells = [
      formatSuggestionDate(suggestion.timestamp),
      suggestion.pokemon,
      suggestion.currentCost,
      suggestion.suggestedCost,
      suggestion.name,
      suggestion.reason,
    ];
    for (const value of cells) {
      const cell = document.createElement('td');
      cell.textContent = value === null || value === undefined || value === '' ? '-' : String(value);
      row.append(cell);
    }
    body.append(row);
  }
  table.append(body);
  costSuggestionsTableWrap.append(table);
}

async function submitCostSuggestion(event) {
  event?.preventDefault();
  const pokemon = pokemonByName.get(activeDetailPokemonName);
  const suggestedCost = Number(costSuggestionValue?.value);
  const reason = costSuggestionReason?.value.trim() ?? '';
  const name = costSuggestionName?.value.trim() ?? '';
  if (!pokemon || !Number.isFinite(suggestedCost) || !reason || !name) {
    setCostSuggestionFeedback('Bitte alle Felder ausfüllen.', 'error');
    return;
  }

  const payload = {
    pokemon: pokemon.name,
    displayName: getPokemonDisplayName(pokemon),
    currentCost: getPokemonCost(pokemon) ?? '',
    suggestedCost,
    reason,
    name,
  };

  costSuggestionSubmit.disabled = true;
  setCostSuggestionFeedback('Vorschlag wird gesendet...', 'loading');

  try {
    await fetch(costSuggestionsEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    costSuggestionValue.value = '';
    costSuggestionReason.value = '';
    costSuggestionName.value = '';
    setCostSuggestionFeedback('Vorschlag gesendet. Er erscheint gleich in der Liste.', 'success');
  } catch (error) {
    setCostSuggestionFeedback('Senden fehlgeschlagen. Bitte später nochmal versuchen.', 'error');
  } finally {
    costSuggestionSubmit.disabled = false;
  }
}

function openCostSuggestions() {
  if (!costSuggestionsModal) return;
  costSuggestionsModal.hidden = false;
  setCostSuggestionsStatus('', '');
  if (costSuggestionsTableWrap) costSuggestionsTableWrap.innerHTML = '';
  costSuggestionsPassword?.focus();
}

function closeCostSuggestions() {
  if (costSuggestionsModal) costSuggestionsModal.hidden = true;
}

async function loadCostSuggestions(event) {
  event?.preventDefault();
  const password = costSuggestionsPassword?.value ?? '';
  if (!password) {
    setCostSuggestionsStatus('Bitte Passwort eingeben.', 'error');
    return;
  }

  setCostSuggestionsStatus('Vorschläge werden geladen...', 'loading');
  if (costSuggestionsTableWrap) costSuggestionsTableWrap.innerHTML = '';

  try {
    const url = new URL(costSuggestionsEndpoint);
    url.searchParams.set('password', password);
    url.searchParams.set('t', String(Date.now()));
    const response = await fetch(url.toString(), { cache: 'no-store' });
    const payload = await response.json();
    if (payload?.ok === false) {
      setCostSuggestionsStatus(payload.error || 'Passwort nicht akzeptiert.', 'error');
      return;
    }
    const suggestions = getNormalizedCostSuggestions(payload);
    renderCostSuggestionsTable(suggestions);
    setCostSuggestionsStatus(`${suggestions.length} Vorschläge geladen.`, 'success');
  } catch (error) {
    setCostSuggestionsStatus('Vorschläge konnten nicht geladen werden. Prüfe Web-App-Zugriff und Apps-Script-Antwort.', 'error');
  }
}

function updateInformationGraphTooltip(event) {
  if (!informationGraphCanvas || !informationGraphTooltip || informationGraphModal?.hidden) return;
  if (!informationGraphPoints.length) {
    informationGraphTooltip.hidden = true;
    return;
  }

  const rect = informationGraphCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const nearest = informationGraphPoints.reduce((best, point) => {
    const distance = Math.hypot(point.canvasX - x, point.canvasY - y);
    return !best || distance < best.distance ? { point, distance } : best;
  }, null);

  if (!nearest || nearest.distance > 12) {
    informationGraphTooltip.hidden = true;
    return;
  }

  const xMetric = getInformationGraphMetric(informationGraphX?.value);
  const yMetric = getInformationGraphMetric(informationGraphY?.value);
  const title = document.createElement('strong');
  title.textContent = getPokemonDisplayName(nearest.point.pokemon);
  const xValue = document.createElement('span');
  xValue.textContent = `${xMetric.label}: ${nearest.point.x}`;
  const yValue = document.createElement('span');
  yValue.textContent = `${yMetric.label}: ${nearest.point.y}`;
  informationGraphTooltip.replaceChildren(title, xValue, yValue);
  informationGraphTooltip.style.left = `${nearest.point.canvasX}px`;
  informationGraphTooltip.style.top = `${nearest.point.canvasY}px`;
  informationGraphTooltip.hidden = false;
}

function createDetailTextRibbon(text, className = '') {
  const card = document.createElement('div');
  card.className = `detail-ribbon${className ? ` ${className}` : ''}`;
  const icon = document.createElement('span');
  icon.className = 'detail-ribbon-symbol';
  icon.textContent = '•';
  const copy = document.createElement('p');
  copy.textContent = text;
  card.append(icon, copy);
  return card;
}

function getPokemonPointHistory(pokemon) {
  const changes = pointCostHistory.filter((entry) => entry.name === pokemon.name);
  if (!changes.length) return [pokemon.cost];
  const values = [changes[0].from];
  for (const change of changes) {
    if (values.at(-1) !== change.to) values.push(change.to);
  }
  if (values.at(-1) !== pokemon.cost) values.push(pokemon.cost);
  return values;
}

function createPointCostHistoryRibbon(pokemon) {
  const ribbon = document.createElement('div');
  ribbon.className = 'detail-ribbon detail-cost-history';
  const label = document.createElement('strong');
  label.textContent = 'Kostenverlauf';
  const values = document.createElement('div');
  values.className = 'detail-cost-history-values';
  const history = getPokemonPointHistory(pokemon);
  history.forEach((cost, index) => {
    const value = document.createElement('span');
    value.className = 'detail-cost-history-value';
    if (index === history.length - 1) value.classList.add('is-current');
    value.textContent = `${cost ?? '-'} Punkte`;
    values.append(value);
    if (index < history.length - 1) values.append(document.createTextNode(' -> '));
  });
  ribbon.append(label, values);
  return ribbon;
}

function renderPokemonCareer(pokemon) {
  if (!detailCareer) return;
  detailCareer.innerHTML = '';
  const usage = getPokemonCareerUsage(pokemon);

  if (!usage.currentPlayers.length && usage.historicTeamCount === 0) {
    detailCareer.append(createDetailTextRibbon('Wurde bisher noch nicht genutzt!'));
  } else if (usage.currentPlayers.length === 1) {
    detailCareer.append(createDetailTextRibbon(`Aktuell im Team von ${usage.currentPlayers[0]}`));
  } else if (usage.currentPlayers.length > 1) {
    detailCareer.append(createDetailTextRibbon(`Aktuell in den Teams von ${formatGermanNameList(usage.currentPlayers)}`));
  }

  if (usage.historicTeamCount > 0) {
    detailCareer.append(createDetailTextRibbon(`Wurde zuvor von ${usage.historicPlayerCount} Spielern in insgesamt ${usage.historicTeamCount} Teams genutzt!`));
  }
  detailCareer.append(createPointCostHistoryRibbon(pokemon));
}

function getSpielerTeamNames(team) {
  if (!Array.isArray(team) || !team.length) {
    return Array.from({ length: 10 }, () => 'Ditto');
  }

  return team.slice(0, 12);
}

function getSpielerCaptainInfos(player, pokemonName) {
  const info = player?.currentTeamInfo ?? {};
  const captainName = normalizeText(pokemonName);
  const captains = [];
  if (info.teraCaptain && normalizeText(info.teraCaptain) === captainName) {
    captains.push({ kind: 'Tera', type: info.teraType, icon: teraIconPath });
  }
  if (info.zCaptain && normalizeText(info.zCaptain) === captainName) {
    captains.push({ kind: 'Z', type: info.zType, icon: zIconPath });
  }
  return captains;
}

function removeSpielerGenericCaptainBadges(card) {
  const badgeStack = card.querySelector('.form-badge-stack');
  if (!badgeStack) return;

  for (const badge of [...badgeStack.querySelectorAll('.form-badge-wrapper')]) {
    const alt = badge.querySelector('.form-badge')?.alt;
    if (alt === 'Tera' || alt === 'Z-Move') badge.remove();
  }
  if (!badgeStack.children.length) badgeStack.remove();
}

function addSpielerCaptainBadges(card, captainInfos) {
  if (!captainInfos.length) return;

  const stack = document.createElement('div');
  stack.className = 'spieler-captain-stack';
  if (captainInfos.length > 1) card.classList.add('has-multiple-captains');

  for (const captainInfo of captainInfos) {
    const badge = document.createElement('div');
    badge.className = `spieler-captain-badge is-${captainInfo.kind.toLowerCase()}`;
    badge.style.setProperty('--spieler-captain-color', typeColorVars[captainInfo.type] ?? 'var(--accent)');
    badge.title = `${captainInfo.kind}-Captain: ${typeLabelsDe[captainInfo.type] ?? captainInfo.type ?? '-'}`;

    const captainIcon = document.createElement('img');
    captainIcon.src = captainInfo.icon;
    captainIcon.alt = `${captainInfo.kind}-Captain`;
    captainIcon.loading = 'lazy';
    badge.append(captainIcon);

    if (captainInfo.type && typeIcons[captainInfo.type]) {
      const typeIcon = document.createElement('img');
      typeIcon.src = typeIcons[captainInfo.type];
      typeIcon.alt = typeLabelsDe[captainInfo.type] ?? captainInfo.type;
      typeIcon.loading = 'lazy';
      badge.append(typeIcon);
    }

    const label = document.createElement('span');
    label.textContent = `${captainInfo.kind} ${typeLabelsDe[captainInfo.type] ?? captainInfo.type ?? '-'}`;
    badge.append(label);
    stack.append(badge);
  }

  card.append(stack);
}

function createSpielerPokemonCard(name, player) {
  const pokemon = getPokemonByNameLoose(name);
  if (!pokemon) {
    const card = document.createElement('article');
    card.className = 'pokemon-card spieler-pokemon-card spieler-missing-pokemon';
    const label = document.createElement('p');
    label.className = 'pokemon-name';
    label.textContent = name;
    card.append(label);
    return card;
  }

  const fragment = createPokemonCard(pokemon, formatFilter?.value ?? 'normal');
  const card = fragment.querySelector('.pokemon-card');
  if (card) {
    const captainInfos = getSpielerCaptainInfos(player, pokemon.name);
    card.classList.add('spieler-pokemon-card');
    removeSpielerGenericCaptainBadges(card);
    addSpielerCaptainBadges(card, captainInfos);
    const teraCaptain = captainInfos.find((captainInfo) => captainInfo.kind === 'Tera' && captainInfo.type);
    if (teraCaptain) appendTeraSpriteCheckerOverlay(card, pokemon.sprite, teraCaptain.type);
    const sortValue = card.querySelector('.pokemon-sort-value');
    if (sortValue) sortValue.remove();
    card.querySelector('.pokemon-favorite-button')?.remove();
  }
  return fragment;
}

function createSpielerTeamGrid(team, player) {
  const grid = document.createElement('div');
  grid.className = 'spieler-team-grid';
  for (const name of getSpielerTeamNames(team)) {
    grid.append(createSpielerPokemonCard(name, player));
  }
  return grid;
}

function getSpielerFinishedBattleUsage(playerName) {
  const target = normalizeText(playerName);
  const brought = new Set();
  const knockouts = new Map();
  for (const match of finishedMatchdayMatches) {
    const playerIndex = match.players.findIndex((name) => normalizeText(name) === target);
    if (playerIndex < 0) continue;
    for (const entry of match.teams[playerIndex] ?? []) {
      if (!entry.unknown) brought.add(normalizeText(entry.name));
    }
    for (const entry of match.teams[playerIndex === 0 ? 1 : 0] ?? []) {
      if (entry.unknown || !entry.knockedOut) continue;
      const key = normalizeText(entry.name);
      if (!knockouts.has(key)) knockouts.set(key, entry.name);
    }
  }
  return { brought, knockouts: [...knockouts.values()] };
}

function createSpielerCollectionPokemon(name, options = {}) {
  const pokemon = getPokemonByNameLoose(name);
  const tile = document.createElement('article');
  tile.className = `spieler-collection-pokemon${options.unbrought ? ' is-unbrought' : ''}`;
  const image = document.createElement('img');
  image.loading = 'lazy';
  setSpriteWithFallback(image, pokemon?.sprite ?? missingSpriteFallbackPath, `${pokemon ? getPokemonDisplayName(pokemon) : name} sprite`);
  const label = document.createElement('span');
  label.textContent = pokemon ? getPokemonDisplayName(pokemon) : name;
  tile.append(image, label);
  return tile;
}

function getSpielerDraftCollections(player) {
  const currentInfo = player.currentTeamInfo ?? {};
  const drafts = [{
    label: currentInfo.label || currentInfo.format || 'Aktueller Draft',
    pokemon: Array.isArray(player.currentTeam) ? player.currentTeam : [],
    current: true,
  }];
  const previousTeams = Array.isArray(player.previousTeams) ? player.previousTeams : [];
  previousTeams.forEach((team, index) => drafts.push({
    label: team.label || team.format || `Draft ${index + 1}`,
    pokemon: getSpielerHistoricTeamPokemon(team),
    current: false,
  }));
  return drafts.filter((draft) => draft.pokemon.length);
}

function spielerPokemonWasBrought(broughtSet, pokemonName) {
  const normalized = normalizeText(pokemonName);
  if (broughtSet.has(normalized)) return true;
  if (normalized.endsWith('mega') && broughtSet.has(normalized.slice(0, -4))) return true;
  return false;
}

function createSpielerBoxesSection(player, usage) {
  const section = document.createElement('section');
  section.className = 'spieler-feature-section is-boxes';
  const banner = document.createElement('header');
  banner.className = 'spieler-feature-banner';
  const title = document.createElement('h4');
  title.textContent = 'Boxen';
  banner.append(title);
  const drafts = document.createElement('div');
  drafts.className = 'spieler-box-drafts';
  for (const draft of getSpielerDraftCollections(player)) {
    const broughtSet = draft.current ? usage.brought : new Set();
    const isComplete = draft.pokemon.length > 0 && draft.pokemon.every((name) => spielerPokemonWasBrought(broughtSet, name));
    const draftSection = document.createElement('section');
    draftSection.className = `spieler-box-draft${isComplete ? ' is-complete' : ''}`;
    const heading = document.createElement('h5');
    heading.textContent = draft.label;
    const grid = document.createElement('div');
    grid.className = 'spieler-collection-grid';
    draft.pokemon.forEach((name) => grid.append(createSpielerCollectionPokemon(name, { unbrought: !spielerPokemonWasBrought(broughtSet, name) })));
    draftSection.append(heading, grid);
    drafts.append(draftSection);
  }
  section.append(banner, drafts);
  return section;
}

function createSpielerKnockoutsSection(usage) {
  const section = document.createElement('section');
  section.className = 'spieler-feature-section is-knockouts';
  const banner = document.createElement('header');
  banner.className = 'spieler-feature-banner';
  const title = document.createElement('h4');
  title.textContent = 'Knock-Outs';
  banner.append(title);
  const list = document.createElement('div');
  list.className = 'spieler-knockout-list';
  const summary = document.createElement('div');
  summary.className = 'spieler-knockout-summary';
  summary.title = `${usage.knockouts.length} Knock-Outs`;
  summary.append(createNode('span', 'spieler-knockout-skull', '☠'), createNode('strong', '', String(usage.knockouts.length)));
  const viewport = document.createElement('div');
  viewport.className = 'spieler-knockout-viewport';
  if (usage.knockouts.length) {
    const grid = document.createElement('div');
    grid.className = `spieler-collection-grid spieler-knockout-grid${usage.knockouts.length > 12 ? ' is-scrolling' : ''}`;
    usage.knockouts.forEach((name) => grid.append(createSpielerCollectionPokemon(name)));
    viewport.append(grid);
    if (usage.knockouts.length > 12) {
      requestAnimationFrame(() => {
        const distance = Math.max(0, grid.scrollWidth - viewport.clientWidth);
        if (!distance || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        grid.animate(
          [{ transform: 'translateX(0)' }, { transform: `translateX(-${distance}px)` }],
          { duration: Math.max(18000, distance * 85), iterations: Infinity, direction: 'alternate', easing: 'linear' },
        );
      });
    }
  } else {
    const empty = document.createElement('p');
    empty.className = 'spieler-collection-empty';
    empty.textContent = 'Noch keine Knock-Outs erfasst.';
    viewport.append(empty);
  }
  list.append(summary, viewport);
  section.append(banner, list);
  return section;
}

function getSpielerAchievementBroughtPokemon(player) {
  const usage = getSpielerFinishedBattleUsage(player.name);
  const pokemon = new Map();
  for (const draft of getSpielerDraftCollections(player)) {
    for (const name of draft.pokemon) {
      if (!spielerPokemonWasBrought(usage.brought, name)) continue;
      const entry = getPokemonByNameLoose(name);
      if (entry) pokemon.set(entry.name, entry);
    }
  }
  const playerTarget = normalizeText(player.name);
  for (const match of finishedMatchdayMatches) {
    const playerIndex = match.players.findIndex((name) => normalizeText(name) === playerTarget);
    if (playerIndex < 0) continue;
    for (const battleEntry of match.teams[playerIndex] ?? []) {
      if (battleEntry.unknown) continue;
      const entry = getPokemonByNameLoose(battleEntry.name);
      if (entry) pokemon.set(entry.name, entry);
    }
  }
  return [...pokemon.values()];
}

function getSpielerDraftCaptainTypes(player, key) {
  const types = new Set();
  const infos = [player.currentTeamInfo, ...(Array.isArray(player.previousTeams) ? player.previousTeams : [])];
  for (const info of infos) {
    const value = info?.[key];
    if (value) types.add(value);
  }
  return types;
}

function getSpielerManualAchievementFlag(player, key) {
  const flags = window.SPIELER_ACHIEVEMENT_FLAGS ?? {};
  const direct = flags[player.name];
  if (direct && typeof direct[key] === 'boolean') return direct[key];
  const matchedKey = Object.keys(flags).find((name) => normalizeText(name) === normalizeText(player.name));
  return Boolean(matchedKey && flags[matchedKey]?.[key]);
}

function isSpielerPastParadox(pokemon) {
  return Object.values(pokemon?.abilities ?? {}).includes('Protosynthesis');
}

function isSpielerFutureParadox(pokemon) {
  return Object.values(pokemon?.abilities ?? {}).includes('Quark Drive');
}

function getSpielerCanonicalAchievementPokemon(pokemon) {
  return allPokemon.find((entry) => entry.num === pokemon.num && !entry.baseSpecies && !entry.forme && !entry.hidden) ?? pokemon;
}

function getSpielerGenerationAchievementEntries(pokemon, generation, exclusion = null) {
  const entries = new Map();
  for (const entry of pokemon) {
    if (getPokemonGenerationNumber(entry) !== generation) continue;
    if (exclusion === 'ultra-beast' && entry.tags?.includes('Ultra Beast')) continue;
    if (exclusion === 'future' && isSpielerFutureParadox(entry)) continue;
    if (exclusion === 'past' && isSpielerPastParadox(entry)) continue;
    const canonical = getSpielerCanonicalAchievementPokemon(entry);
    entries.set(entry.num, getPokemonDisplayName(canonical));
  }
  return [...entries.values()].sort((left, right) => left.localeCompare(right, 'de'));
}

function getSpielerAchievementProgress(player) {
  const target = normalizeText(player.name);
  const wonMatches = finishedMatchdayMatches.filter((match) => normalizeText(match.winner) === target);
  const beatenPlayers = new Set(wonMatches.flatMap((match) => match.players.filter((name) => normalizeText(name) !== target).map(normalizeText)));
  const broughtPokemon = getSpielerAchievementBroughtPokemon(player);
  const megaEntries = [...new Set(broughtPokemon.filter((pokemon) => pokemon.forme === 'Mega' || pokemon.name.includes('-Mega')).map((pokemon) => getPokemonDisplayName(pokemon)))].sort((left, right) => left.localeCompare(right, 'de'));
  const zTypes = getSpielerDraftCaptainTypes(player, 'zType');
  const teraTypes = getSpielerDraftCaptainTypes(player, 'teraType');
  const usage = getSpielerFinishedBattleUsage(player.name);
  const drafts = getSpielerDraftCollections(player);
  const completedDraft = drafts.some((draft) => draft.current
    && draft.pokemon.length > 0
    && draft.pokemon.every((name) => spielerPokemonWasBrought(usage.brought, name)));
  const boxEntries = drafts.flatMap((draft) => draft.pokemon.map((name) => `${spielerPokemonWasBrought(usage.brought, name) ? '✓' : '○'} ${name}`));
  const beatenEntries = [...beatenPlayers].map((name) => getMatchdayDisplayName(getMatchdayPlayer(name), name)).sort((left, right) => left.localeCompare(right, 'de'));
  const fullSweepEntries = wonMatches.filter((match) => match.score === '6:0').map((match) => `6:0 gegen ${match.players.find((name) => normalizeText(name) !== target)}`);
  const closeWinEntries = wonMatches.filter((match) => match.score === '1:0').map((match) => `1:0 gegen ${match.players.find((name) => normalizeText(name) !== target)}`);
  const generationEntries = Object.fromEntries([
    [1, getSpielerGenerationAchievementEntries(broughtPokemon, 1)],
    [2, getSpielerGenerationAchievementEntries(broughtPokemon, 2)],
    [3, getSpielerGenerationAchievementEntries(broughtPokemon, 3)],
    [4, getSpielerGenerationAchievementEntries(broughtPokemon, 4)],
    [5, getSpielerGenerationAchievementEntries(broughtPokemon, 5)],
    [6, getSpielerGenerationAchievementEntries(broughtPokemon, 6)],
    [7, getSpielerGenerationAchievementEntries(broughtPokemon, 7, 'ultra-beast')],
    [8, getSpielerGenerationAchievementEntries(broughtPokemon, 8)],
    ['9-past', getSpielerGenerationAchievementEntries(broughtPokemon, 9, 'future')],
    ['9-future', getSpielerGenerationAchievementEntries(broughtPokemon, 9, 'past')],
  ]);
  const hostUnlocked = getSpielerManualAchievementFlag(player, 'partyHost');
  const binary = (value) => ({ value: value ? 1 : 0, target: 1 });
  return [
    { name: 'Full Sweep', description: 'Gewinne in einem 6:0!', entries: fullSweepEntries, ...binary(fullSweepEntries.length > 0) },
    { name: 'Knappe Kiste', description: 'Gewinne in einem 1:0!', entries: closeWinEntries, ...binary(closeWinEntries.length > 0) },
    { name: 'Mega, ey', description: 'Bringe diverse Megas', entries: megaEntries, value: megaEntries.length, target: 25 },
    { name: 'Plan Z!', description: 'Bringe diverse Z-Typen', entries: [...zTypes].sort(), value: zTypes.size, target: 10 },
    { name: 'Neues Tera-torium', description: 'Bringe diverse Tera-Types', entries: [...teraTypes].sort(), value: teraTypes.size, target: 10 },
    { name: 'Schrecken der Maniacs', description: 'Besiege jeden anderen Maniac', entries: beatenEntries, value: beatenPlayers.size, target: Math.max(0, getSpielerEntries().length - 1) },
    { name: 'Der Bootsführerschein', description: 'Erhalte den Vollständigkeits-Nudelstern', entries: boxEntries, ...binary(completedDraft) },
    { name: 'Eichs Enkel', description: 'Bringe 50 Kanto-Pokémon', entries: generationEntries[1], value: generationEntries[1].length, target: 50 },
    { name: 'Linds Lehrling', description: 'Bringe 50 Johto-Pokémon', entries: generationEntries[2], value: generationEntries[2].length, target: 50 },
    { name: 'Birks Buddy', description: 'Bringe 50 Hoenn-Pokémon', entries: generationEntries[3], value: generationEntries[3].length, target: 50 },
    { name: 'Eibe Enthusiast', description: 'Bringe 50 Sinnoh-Pokémon', entries: generationEntries[4], value: generationEntries[4].length, target: 50 },
    { name: 'Esche Eleve', description: 'Bringe 50 Einall-Pokémon', entries: generationEntries[5], value: generationEntries[5].length, target: 50 },
    { name: 'Platans Praktikant', description: 'Bringe 50 Kalos-Pokémon', entries: generationEntries[6], value: generationEntries[6].length, target: 50 },
    { name: 'Kukui Kenner', description: 'Bringe 50 Alola-Pokémon', entries: generationEntries[7], value: generationEntries[7].length, target: 50 },
    { name: 'Sanias Schüler', description: 'Bringe 50 Galar-Pokémon', entries: generationEntries[8], value: generationEntries[8].length, target: 50 },
    { name: 'Antiquas Assistent', description: 'Bringe 50 Kalos oder Vergangenheits-Pokémon', entries: generationEntries['9-past'], value: generationEntries['9-past'].length, target: 50 },
    { name: 'Futurus Famulus', description: 'Bringe 50 Kalos oder Zukunfts-Pokémon', entries: generationEntries['9-future'], value: generationEntries['9-future'].length, target: 50 },
    { name: 'Plane-deine-Party-Kasten', description: 'Sei Gastgeber', entries: [hostUnlocked ? 'Manuell freigeschaltet' : 'Noch nicht manuell freigeschaltet'], ...binary(hostUnlocked) },
  ].map((achievement) => ({ ...achievement, achieved: achievement.target > 0 && achievement.value >= achievement.target }));
}

function createSpielerAchievementCard(achievement) {
  const card = document.createElement('article');
  card.className = `spieler-achievement${achievement.achieved ? ' is-achieved' : ''}`;
  const heading = document.createElement('div');
  heading.className = 'spieler-achievement-heading';
  const copy = document.createElement('div');
  const title = document.createElement('h4');
  title.textContent = achievement.name;
  const description = document.createElement('p');
  description.textContent = achievement.description;
  copy.append(title, description);
  if (achievement.achieved) heading.append(copy, createNode('span', 'spieler-achievement-trophy', '🏆'));
  else heading.append(copy);
  const progressMeta = document.createElement('div');
  progressMeta.className = 'spieler-achievement-progress-meta';
  progressMeta.append(createNode('span', '', achievement.achieved ? 'Erreicht' : 'Fortschritt'), createNode('strong', '', `${Math.min(achievement.value, achievement.target)} / ${achievement.target}`));
  const progress = document.createElement('div');
  progress.className = 'spieler-achievement-progress';
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-label', achievement.name);
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', String(achievement.target));
  progress.setAttribute('aria-valuenow', String(Math.min(achievement.value, achievement.target)));
  const fill = document.createElement('span');
  fill.style.width = `${achievement.target ? Math.min(100, achievement.value / achievement.target * 100) : 0}%`;
  progress.append(fill);
  const detailId = `spieler-achievement-details-${++spielerAchievementDetailId}`;
  const toggle = document.createElement('button');
  toggle.className = 'spieler-achievement-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', detailId);
  toggle.textContent = '▸ Einträge anzeigen';
  const details = document.createElement('div');
  details.className = 'spieler-achievement-details';
  details.id = detailId;
  details.hidden = true;
  const entries = achievement.entries ?? [];
  if (entries.length) {
    const list = document.createElement('ul');
    entries.forEach((entry) => {
      const item = document.createElement('li');
      item.textContent = entry;
      list.append(item);
    });
    details.append(list);
  } else {
    details.append(createNode('p', '', 'Noch keine passenden Einträge.'));
  }
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.textContent = `${expanded ? '▸' : '▾'} Einträge ${expanded ? 'anzeigen' : 'ausblenden'}`;
    details.hidden = expanded;
  });
  card.append(heading, progressMeta, progress, toggle, details);
  return card;
}

function renderSpielerAchievements() {
  if (!spielerGrid) return;
  spielerGrid.innerHTML = '';
  spielerGrid.classList.add('is-achievements');
  const players = getSpielerEntries();
  const selectedName = players.some((player) => normalizeText(player.name) === normalizeText(spielerAchievementPlayerName ?? ''))
    ? spielerAchievementPlayerName
    : players[0]?.name;
  spielerAchievementPlayerName = selectedName ?? null;
  const shell = document.createElement('section');
  shell.className = 'spieler-achievements-shell';
  const banner = document.createElement('header');
  banner.className = 'spieler-achievements-banner';
  banner.append(createNode('h3', '', 'Achievements'));
  const picker = document.createElement('label');
  picker.className = 'details-field spieler-achievement-picker';
  picker.append(createNode('span', '', 'Spieler auswählen'));
  const select = document.createElement('select');
  players.forEach((player) => {
    const option = document.createElement('option');
    option.value = player.name;
    option.textContent = player.name;
    option.selected = normalizeText(player.name) === normalizeText(spielerAchievementPlayerName ?? '');
    select.append(option);
  });
  picker.append(select);
  const list = document.createElement('div');
  list.className = 'spieler-achievement-list';
  const renderSelected = () => {
    spielerAchievementPlayerName = select.value;
    const player = players.find((entry) => normalizeText(entry.name) === normalizeText(select.value));
    list.innerHTML = '';
    if (!player) return;
    const playerHeading = document.createElement('div');
    playerHeading.className = 'spieler-achievement-player';
    const sprite = document.createElement('img');
    sprite.src = player.sprite;
    sprite.alt = `${player.name} trainer sprite`;
    playerHeading.append(sprite, createNode('h3', '', player.name));
    list.append(playerHeading, ...getSpielerAchievementProgress(player).map(createSpielerAchievementCard));
  };
  select.addEventListener('change', renderSelected);
  shell.append(banner, picker, list);
  spielerGrid.append(shell);
  renderSelected();
}

function getSpielerWinTitle(win) {
  const label = win.title || win.name || 'Sieg';
  return [label, win.date, win.format].filter(Boolean).join(' - ');
}

function getSpielerMatchWinRecords(player) {
  const target = normalizeText(player?.name ?? '');
  return finishedMatchdayMatches
    .filter((match) => normalizeText(match.winner) === target)
    .map((match) => {
      const opponent = match.players.find((name) => normalizeText(name) !== target) ?? 'Unbekannt';
      return {
        title: `${match.score} gegen ${getMatchdayDisplayName(getMatchdayPlayer(opponent), opponent)}`,
        format: 'Matchday',
      };
    });
}

function createSpielerWinRow(label, wins, emoji, showNumericZero = false) {
  const wrap = document.createElement('div');
  wrap.className = 'spieler-win-row';

  const title = document.createElement('span');
  title.className = 'spieler-win-label';
  title.textContent = label;
  wrap.append(title);

  const validWins = Array.isArray(wins)
    ? wins.filter((win) => win && (win.title || win.name || win.date || win.format))
    : [];

  if (!validWins.length) {
    const empty = document.createElement('span');
    empty.className = showNumericZero ? 'spieler-win-count' : 'spieler-win-empty';
    empty.textContent = showNumericZero ? '0' : 'Keine';
    wrap.append(empty);
    return wrap;
  }

  const count = document.createElement('span');
  count.className = 'spieler-win-count';
  count.textContent = String(validWins.length);
  count.title = `${label}: ${validWins.length}`;
  wrap.append(count);

  for (const win of validWins) {
    const badge = document.createElement('span');
    badge.className = 'spieler-win-badge';
    badge.title = getSpielerWinTitle(win);
    badge.textContent = emoji;
    wrap.append(badge);
  }

  return wrap;
}

function getSpielerNudelsternCount(player) {
  return Math.max(0, Number(player?.nudelsterne) || 0);
}

function createSpielerNudelsternRow(player) {
  const wrap = document.createElement('div');
  wrap.className = 'spieler-star-row';

  const label = document.createElement('span');
  label.className = 'spieler-win-label';
  label.textContent = 'Nudelsterne';

  const value = document.createElement('span');
  value.className = 'spieler-star-count';
  value.textContent = String(getSpielerNudelsternCount(player));

  wrap.append(label, value);
  return wrap;
}

function openSpielerPlayerInBattlePrep(player) {
  const players = getDraftOverviewPlayers();
  const target = players.find((entry) => normalizeText(entry.name) === normalizeText(player?.name ?? ''));
  if (target) draftOverviewActivePlayerId = target.id;
  draftOverviewMode = 'teams';
  closeSpieler();
  window.location.hash = '#draft';
  renderHubView('draft');
}

function createSpielerCard(player, index, mode = 'teams') {
  const card = document.createElement('article');
  card.className = 'spieler-card';

  const header = document.createElement('div');
  header.className = 'spieler-card-header';

  const sprite = document.createElement('img');
  sprite.className = 'spieler-trainer-sprite';
  sprite.src = player.sprite;
  sprite.alt = `${player.name} trainer sprite`;
  sprite.loading = 'lazy';

  const meta = document.createElement('div');
  meta.className = 'spieler-card-meta';
  const name = document.createElement('h3');
  name.textContent = player.name;
  const wins = document.createElement('div');
  wins.className = 'spieler-wins';
  wins.append(
    createSpielerWinRow('Match Siege', getSpielerMatchWinRecords(player), '🏅', true),
    createSpielerWinRow('Abend Siege', player.abendSiege, '🏆')
  );
  wins.append(createSpielerNudelsternRow(player));
  meta.append(name, wins);
  header.append(sprite, meta);

  const battleUsage = getSpielerFinishedBattleUsage(player.name);
  if (mode === 'boxes') {
    card.append(header, createSpielerBoxesSection(player, battleUsage));
    return card;
  }
  if (mode === 'knockouts') {
    card.classList.add('is-knockouts-view');
    card.append(header, createSpielerKnockoutsSection(battleUsage));
    return card;
  }

  const currentTitle = document.createElement('h4');
  currentTitle.className = 'spieler-team-heading';
  currentTitle.textContent = 'Aktuelles Team';

  const previousTeams = Array.isArray(player.previousTeams) ? player.previousTeams : [];
  const previousId = `spieler-previous-teams-${index}`;
  const previousWrap = document.createElement('div');
  previousWrap.className = 'spieler-previous-teams';
  previousWrap.id = previousId;
  previousWrap.hidden = true;

  for (const [teamIndex, previousTeam] of previousTeams.entries()) {
    const section = document.createElement('section');
    section.className = 'spieler-previous-team';
    const heading = document.createElement('h4');
    heading.className = 'spieler-team-heading';
    heading.textContent = previousTeam.label || previousTeam.format || `Altes Team ${teamIndex + 1}`;
    section.append(heading, createSpielerTeamGrid(getSpielerHistoricTeamPokemon(previousTeam), null));
    previousWrap.append(section);
  }

  const expandButton = document.createElement('button');
  expandButton.className = 'spieler-expand-button';
  expandButton.type = 'button';
  expandButton.setAttribute('aria-expanded', 'false');
  expandButton.setAttribute('aria-controls', previousId);
  expandButton.disabled = previousTeams.length === 0;
  expandButton.textContent = previousTeams.length ? '▸ Alte Teams' : '▸ Keine alten Teams';
  expandButton.addEventListener('click', () => {
    const expanded = expandButton.getAttribute('aria-expanded') === 'true';
    expandButton.setAttribute('aria-expanded', String(!expanded));
    previousWrap.hidden = expanded;
    expandButton.textContent = `${expanded ? '▸' : '▾'} Alte Teams`;
  });

  const battlePrepButton = document.createElement('button');
  battlePrepButton.className = 'spieler-expand-button spieler-battle-prep-button';
  battlePrepButton.type = 'button';
  battlePrepButton.textContent = 'In Battle Prep öffnen';
  battlePrepButton.disabled = !Array.isArray(player.currentTeam) || !player.currentTeam.length;
  battlePrepButton.addEventListener('click', () => openSpielerPlayerInBattlePrep(player));

  card.append(
    header,
    currentTitle,
    createSpielerTeamGrid(player.currentTeam, player),
    battlePrepButton,
    expandButton,
    previousWrap,
  );
  return card;
}

function renderSpielerOverview(mode = 'teams') {
  if (!spielerGrid) return;
  spielerGrid.innerHTML = '';
  spielerGrid.classList.remove('is-achievements');
  const fragment = document.createDocumentFragment();
  getSpielerEntries().forEach((player, index) => {
    fragment.append(createSpielerCard(player, index, mode));
  });
  spielerGrid.append(fragment);
}

function openSpieler(mode = 'teams') {
  const viewMode = typeof mode === 'string' ? mode : 'teams';
  if (viewMode === 'achievements') renderSpielerAchievements();
  else renderSpielerOverview(viewMode);
  if (spielerTitle) {
    spielerTitle.textContent = viewMode === 'boxes'
      ? 'Boxen'
      : viewMode === 'knockouts'
        ? 'Knock-Outs'
        : viewMode === 'achievements'
          ? 'Achievements'
          : 'Teams';
  }
  if (spielerModal) spielerModal.hidden = false;
}

function closeSpieler() {
  if (spielerModal) spielerModal.hidden = true;
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
  title.textContent = getPokemonDisplayName(pokemon);
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
  costLine.textContent = getPokemonCost(pokemon) === null ? 'Kosten: unbekannt' : `Kosten: ${getPokemonCost(pokemon)}`;
  markPlaceholderCost(costLine, pokemon);
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
      label: getAbilityDisplayName(ability),
      meta: ability.sourceLabel ?? getAbilitySlotLabel(ability.slot),
    }));
  }
}

function renderReplacementCostGrid(pokemon) {
  replacementCost.innerHTML = '';
  replacementCost.append(createReplacementPriorityButton({
    key: 'cost',
    label: 'Kosten',
    meta: getPokemonCost(pokemon) === null ? 'Unbekannt' : String(getPokemonCost(pokemon)),
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
      label: getMoveDisplayName(move),
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
    const targetCost = getPokemonCost(target);
    const candidateCost = getPokemonCost(candidate);
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
      if (getPokemonCost(left.pokemon) !== getPokemonCost(right.pokemon)) return (getPokemonCost(left.pokemon) ?? 999) - (getPokemonCost(right.pokemon) ?? 999);
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

  if (getPokemonCost(pokemon) !== null && getPokemonCost(pokemon) <= 10 && flags.mega) {
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

  if (areEasterEggsEnabled() && pokemon.name === 'Mewtwo') {
    ribbons.push({
      symbol: 'R',
      symbolClass: 'is-rocket',
      text: 'Dieses Pokémon ist Eigentum von Team Rocket. Unberechtigte Nutzung wird dem Boss gemeldet.',
      warning: true,
    });
  }

  if (areEasterEggsEnabled() && pokemon.name === 'Meowth') {
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

function getTypeChartDefenseValue(defendingTypes, attackType) {
  const types = Array.isArray(defendingTypes) ? defendingTypes.filter(Boolean) : [];
  if (!types.length) return 1;
  return types.reduce((product, defendingType) => {
    const value = typeDefenseChart[defendingType]?.[attackType] ?? 1;
    return product * value;
  }, 1);
}

function getDefenseProfiles(pokemon, attackType, defendingTypes = pokemon.types) {
  const baseValue = getTypeChartDefenseValue(defendingTypes, attackType);
  const abilityNames = new Set((pokemon.abilityDetails ?? []).map((ability) => ability.name));
  const profiles = [{ value: baseValue, label: 'Ohne Fähigkeit' }];
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

function getDefenseEntriesForType(pokemon, type) {
  return getDefenseProfiles(pokemon, type).map((profile) => ({ value: profile.value, reason: profile.label }));
}

function getDefenseAbilityStates(pokemon, defendingTypes = pokemon.types) {
  const abilities = (pokemon.abilityDetails ?? [])
    .filter((ability) => !ability.isPreMegaAbility)
    .filter((ability) => getAbilityRuleInfo(ability.name, pokemon)?.severity !== 'illegal')
    .map((ability) => ability.name)
    .filter(Boolean);
  return abilities.length ? abilities : ['Ohne Fähigkeit'];
}

function setDefenseProfilePresentation(node, profiles, formatter, abilityStates) {
  const activeAbility = abilityStates[defenseProfileTick % abilityStates.length];
  const profile = profiles.find((entry) => entry.label === activeAbility) ?? profiles[0];
  const classification = classifyDefenseValue(profile.value);
  node.classList.remove('neutral', 'resistant', 'immune', 'weak', 'very-weak', 'resist', 'double-resist', 'double-weak');
  node.classList.add(...formatter.classNames(profile.value, classification));
  node.textContent = formatter.text(profile.value, classification);
  node.title = activeAbility;
  node.dataset.defenseProfileLabel = activeAbility;
  if (formatter.showLabel) node.dataset.defenseShowLabel = 'true';
  else delete node.dataset.defenseShowLabel;
}

function registerDefenseProfileNode(node, profiles, formatter, abilityStates = ['Ohne Fähigkeit']) {
  if (abilityStates.length <= 1) {
    if (abilityStates[0] !== 'Ohne Fähigkeit') node.classList.add('is-defense-ability-active');
    setDefenseProfilePresentation(node, profiles, formatter, abilityStates);
    return;
  }
  node.classList.add('is-defense-cycling');
  node._defenseProfiles = profiles;
  node._defenseFormatter = formatter;
  node._defenseAbilityStates = abilityStates;
  setDefenseProfilePresentation(node, profiles, formatter, abilityStates);
}

function refreshDefenseProfileNodes() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  defenseProfileTick += 1;
  document.querySelectorAll('.is-defense-cycling').forEach((node) => {
    setDefenseProfilePresentation(node, node._defenseProfiles, node._defenseFormatter, node._defenseAbilityStates);
    node.classList.remove('is-defense-flashing');
    void node.offsetWidth;
    node.classList.add('is-defense-flashing');
  });
}

function getBudgetPlannerDefenseValue(pokemon, attackType, options = {}) {
  const overrideTypes = options.types ?? null;
  return Math.min(...getDefenseProfiles(pokemon, attackType, overrideTypes ?? pokemon.types).map((profile) => profile.value));
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

  if (moveId === 'hiddenpower' && getPokemonCost(pokemon) !== null && getPokemonCost(pokemon) >= 6) {
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
    const matchesQuery = !query || normalizeText(`${move.name} ${move.names?.de ?? ''} ${move.type ?? ''}`).includes(query);
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
      strong.textContent = getMoveDisplayName(move);
      nameCell.append(strong);
    } else {
      nameCell.textContent = getMoveDisplayName(move);
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

function clearVictiniLetterEffect() {
  pokemonDetailModal?.querySelectorAll('.victini-v-letter').forEach((node) => {
    node.replaceWith(document.createTextNode(node.textContent ?? ''));
  });
}

function clearDetailSpecialEffects() {
  for (const cleanup of detailSpecialEffectCleanups) cleanup();
  detailSpecialEffectCleanups = [];
  clearVictiniLetterEffect();
  pokemonDetailBody?.querySelectorAll('.detail-gimmick-layer').forEach((node) => node.remove());
  pokemonDetailModal?.querySelectorAll('.detail-fake-popup, .detail-cursor-stink').forEach((node) => node.remove());
  pokemonDetailDialog?.querySelectorAll('.detail-sprite-wrap').forEach((node) => {
    node.classList.remove('is-wimpod-startled', 'is-wimpod-scuttled', 'is-zygarde-jiggling');
    node.style.removeProperty('--kecleon-opacity');
  });
}

function createDetailBodyGimmickLayer(className) {
  if (!pokemonDetailBody) return null;
  const layer = document.createElement('div');
  layer.className = `detail-gimmick-layer ${className}`;
  pokemonDetailBody.prepend(layer);
  return layer;
}

function setupPaintSplatterDetailEffect(pokemon) {
  if (!areEasterEggsEnabled()) return;
  if (!pokemonDetailBody) return;
  if (pokemon.name !== 'Smeargle' && pokemon.name !== 'Grafaiai') return;
  const layer = createDetailBodyGimmickLayer('detail-paint-splatter-layer');
  if (!layer) return;
  const splatters = ['\uD83D\uDCA5', '\uD83D\uDCA6', '\u2728'];
  const splatterCount = pokemon.name === 'Smeargle' ? 18 : 14;
  for (let index = 0; index < splatterCount; index += 1) {
    const splatter = document.createElement('span');
    splatter.className = 'detail-paint-splatter';
    splatter.textContent = splatters[index % splatters.length];
    splatter.style.left = `${4 + Math.random() * 90}%`;
    splatter.style.top = `${3 + Math.random() * 92}%`;
    splatter.style.fontSize = `${1.1 + Math.random() * 2.3}rem`;
    splatter.style.transform = `translate(-50%, -50%) rotate(${Math.round(Math.random() * 360)}deg)`;
    splatter.style.filter = `hue-rotate(${Math.round(Math.random() * 360)}deg) saturate(${(1.2 + Math.random() * 1.8).toFixed(2)})`;
    splatter.style.opacity = `${0.1 + Math.random() * 0.16}`;
    layer.append(splatter);
  }
}

function setupMimikyuDetailEffect(pokemon, titleElements) {
  if (!areEasterEggsEnabled()) return;
  if (pokemon.name !== 'Mimikyu') return;
  if (detailOneShotEffectsPlayed.has('mimikyu')) return;
  detailOneShotEffectsPlayed.add('mimikyu');
  const revealName = () => {
    for (const element of titleElements) {
      if (!element?.isConnected) continue;
      element.textContent = getPokemonDisplayName(pokemon);
      element.classList.remove('is-disguised-name');
    }
  };
  for (const element of titleElements) {
    if (!element) continue;
    element.textContent = 'Pikachu?';
    element.classList.add('is-disguised-name');
    const onReveal = () => revealName();
    element.addEventListener('pointerenter', onReveal, { once: true });
    element.addEventListener('touchstart', onReveal, { once: true, passive: true });
    detailSpecialEffectCleanups.push(() => {
      element.removeEventListener('pointerenter', onReveal);
      element.removeEventListener('touchstart', onReveal);
    });
  }
}

function setupZygardeDetailEffect(pokemon, spriteWrap, image) {
  if (!areEasterEggsEnabled()) return;
  if (!spriteWrap || !image) return;
  const isFiftyPercent = pokemon.name === 'Zygarde';
  const isHundredPercent = pokemon.name === 'Zygarde-Complete';
  if (!isFiftyPercent && !isHundredPercent) return;
  const effectKey = isHundredPercent ? 'zygarde-complete' : 'zygarde-50';
  if (detailOneShotEffectsPlayed.has(effectKey)) return;
  detailOneShotEffectsPlayed.add(effectKey);

  const zygarde10 = pokemonByName.get('Zygarde-10%');
  const zygarde50 = pokemonByName.get('Zygarde');
  const zygarde100 = pokemonByName.get('Zygarde-Complete');
  if (!zygarde10 || !zygarde50 || !zygarde100) return;

  const swarm = document.createElement('div');
  swarm.className = `zygarde-cell-swarm ${isHundredPercent ? 'is-complete' : 'is-fifty'}`;
  for (let index = 0; index < 16; index += 1) {
    const cell = document.createElement('span');
    cell.className = 'zygarde-cell-emoji';
    cell.textContent = '\uD83D\uDFE2';
    const angle = (Math.PI * 2 * index) / 16;
    const radius = 34 + Math.random() * 18;
    cell.style.setProperty('--zygarde-cell-x', `${Math.cos(angle) * radius}%`);
    cell.style.setProperty('--zygarde-cell-y', `${Math.sin(angle) * radius}%`);
    cell.style.setProperty('--zygarde-cell-delay', `${(index * 0.08).toFixed(2)}s`);
    swarm.append(cell);
  }
  spriteWrap.append(swarm);
  setSpriteWithFallback(image, zygarde10.sprite, `${zygarde10.name} sprite`);

  const jiggle = () => {
    spriteWrap.classList.remove('is-zygarde-jiggling');
    void spriteWrap.offsetWidth;
    spriteWrap.classList.add('is-zygarde-jiggling');
  };

  if (isFiftyPercent) {
    queueDetailEffect(() => {
      if (activeDetailPokemonName !== pokemon.name) return;
      setSpriteWithFallback(image, zygarde50.sprite, `${zygarde50.name} sprite`);
      jiggle();
    }, 1450);
    queueDetailEffect(() => {
      swarm.remove();
      spriteWrap.classList.remove('is-zygarde-jiggling');
    }, 2800);
    return;
  }

  queueDetailEffect(() => {
    if (activeDetailPokemonName !== pokemon.name) return;
    setSpriteWithFallback(image, zygarde50.sprite, `${zygarde50.name} sprite`);
    jiggle();
    swarm.classList.add('is-phase-two');
  }, 1100);
  queueDetailEffect(() => {
    if (activeDetailPokemonName !== pokemon.name) return;
    setSpriteWithFallback(image, zygarde100.sprite, `${zygarde100.name} sprite`);
    jiggle();
  }, 2250);
  queueDetailEffect(() => {
    swarm.remove();
    spriteWrap.classList.remove('is-zygarde-jiggling');
  }, 2950);
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
  if (!areEasterEggsEnabled()) return;
  if (pokemon.name !== 'Meowth' || !pokemonDetailDialog) return;
  spawnMeowthCoin({
    isStarter: true,
    left: 22,
    top: Math.max(96, pokemonDetailDialog.clientHeight - 86),
  });
}

function setupWimpodDetailEffect(spriteWrap, pokemon) {
  if (!areEasterEggsEnabled()) return;
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
  if (!areEasterEggsEnabled()) return;
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

function setupStinkyCursorEffect(spriteWrap, pokemon) {
  if (!areEasterEggsEnabled()) return;
  if (!pokemonDetailBody || !pokemonDetailModal) return;
  if (!['Gloom', 'Koffing', 'Weezing'].includes(pokemon.name)) return;
  let stinkLayer = null;
  let activeUntil = 0;

  const ensureLayer = () => {
    if (stinkLayer?.isConnected) return stinkLayer;
    stinkLayer = document.createElement('div');
    stinkLayer.className = 'detail-cursor-stink';
    pokemonDetailModal.append(stinkLayer);
    return stinkLayer;
  };

  const onMove = (event) => {
    if (!stinkLayer || Date.now() > activeUntil) return;
    stinkLayer.style.setProperty('--cursor-x', `${event.clientX}px`);
    stinkLayer.style.setProperty('--cursor-y', `${event.clientY}px`);
  };

  const activate = () => {
    const layer = ensureLayer();
    layer.classList.remove('is-gloom', 'is-koffing', 'is-weezing');
    layer.classList.add(`is-${normalizeText(pokemon.name)}`);
    activeUntil = Date.now() + 4200;
    layer.classList.add('is-active');
    const timeout = window.setTimeout(() => {
      layer.classList.remove('is-active');
    }, 4200);
    detailSpecialEffectCleanups.push(() => window.clearTimeout(timeout));
  };

  spriteWrap.addEventListener('pointerenter', activate);
  pokemonDetailBody.addEventListener('mousemove', onMove);
  detailSpecialEffectCleanups.push(() => {
    spriteWrap.removeEventListener('pointerenter', activate);
    pokemonDetailBody.removeEventListener('mousemove', onMove);
    stinkLayer?.remove();
  });
}

function setupMagikarpDetailEffect(spriteWrap, image, pokemon) {
  if (!areEasterEggsEnabled()) return;
  if (pokemon.name !== 'Magikarp') return;
  let clickTimes = [];
  const threshold = 5;
  const onClick = () => {
    const now = Date.now();
    clickTimes = clickTimes.filter((time) => now - time <= 2600);
    clickTimes.push(now);
    const burst = document.createElement('span');
    burst.className = 'detail-anger-burst';
    burst.textContent = '\uD83D\uDCA2';
    spriteWrap.append(burst);
    const timeout = window.setTimeout(() => burst.remove(), 900);
    detailSpecialEffectCleanups.push(() => window.clearTimeout(timeout));
    if (clickTimes.length >= threshold) {
      openPokemonDetail('Gyarados');
    }
  };
  image.addEventListener('click', onClick);
  image.style.cursor = 'pointer';
  detailSpecialEffectCleanups.push(() => {
    image.removeEventListener('click', onClick);
    image.style.removeProperty('cursor');
  });
}

function createFakePopupSprite(name, alt = name) {
  const pokemon = getPokemonByNameLoose(name);
  if (!pokemon) return null;
  const image = document.createElement('img');
  image.className = 'detail-fake-popup-sprite';
  setSpriteWithFallback(image, pokemon.sprite, `${alt} sprite`);
  return image;
}

function setupPorygonFakePopupEffect(pokemon) {
  if (!areEasterEggsEnabled()) return;
  if (!pokemonDetailModal || !pokemonDetailBody) return;
  if (!['Porygon', 'Porygon2', 'Porygon-Z'].includes(pokemon.name)) return;

  const popup = document.createElement('aside');
  const variants = [
    {
      className: 'is-magenta',
      title: 'Heiße MILFs in deiner Umgebung!',
      build: (body) => {
        const sprite = createFakePopupSprite('Kangaskhan');
        if (sprite) body.append(sprite);
      },
    },
    {
      className: 'is-blue',
      title: 'Wachstumspillen für deinen Schlurm, nur 99 Pokedollar!',
      build: (body) => {
        const sprite = createFakePopupSprite('Orthworm');
        if (sprite) body.append(sprite);
      },
    },
    {
      className: 'is-red',
      title: 'Alolas raus! Wählt Rechtsrattikarl!',
      build: (body) => {
        const row = document.createElement('div');
        row.className = 'detail-fake-popup-icon-row';
        for (let index = 0; index < 3; index += 1) {
          const wrap = document.createElement('div');
          wrap.className = 'detail-fake-popup-crossed';
          const sprite = createFakePopupSprite('Rattata-Alola');
          if (sprite) wrap.append(sprite);
          row.append(wrap);
        }
        const rat = document.createElement('span');
        rat.className = 'detail-fake-popup-emoji';
        rat.textContent = '\uD83D\uDC00';
        row.append(rat);
        body.append(row);
      },
    },
    {
      className: 'is-grey',
      title: 'Sie haben 151 Virusse auf ihrem Computer!!! Jetzt scannen!!!',
      build: (body) => {
        const sprite = createFakePopupSprite('Pecharunt');
        if (sprite) body.append(sprite);
      },
    },
    {
      className: 'is-gold',
      title: 'Frohes Neues 2001!',
      build: (body) => {
        const row = document.createElement('div');
        row.className = 'detail-fake-popup-icon-row';
        const fireworks = document.createElement('span');
        fireworks.className = 'detail-fake-popup-emoji';
        fireworks.textContent = '\uD83C\uDF86\u2728';
        row.append(fireworks);
        const sprite = createFakePopupSprite('Slowpoke');
        if (sprite) row.append(sprite);
        body.append(row);
      },
    },
    {
      className: 'is-teal',
      title: 'Ankerarme!',
      build: (body) => {
        const row = document.createElement('div');
        row.className = 'detail-fake-popup-icon-row';
        const sprite = createFakePopupSprite('Dhelmise');
        if (sprite) row.append(sprite);
        const flex = document.createElement('span');
        flex.className = 'detail-fake-popup-emoji';
        flex.textContent = '\uD83D\uDCAA';
        row.append(flex);
        body.append(row);
      },
    },
  ];
  const variant = variants[Math.floor(Math.random() * variants.length)];
  popup.className = `detail-fake-popup ${variant.className}`;
  const title = document.createElement('strong');
  title.textContent = variant.title;
  const body = document.createElement('div');
  body.className = 'detail-fake-popup-body';
  variant.build(body);
  const cta = document.createElement('span');
  cta.className = 'detail-fake-popup-cta';
  cta.textContent = 'Hier clicken!!!';
  body.append(cta);
  popup.append(title, body);
  pokemonDetailModal.append(popup);

  const onScroll = () => {
    if (pokemonDetailBody.scrollTop > 0) popup.remove();
  };
  pokemonDetailBody.addEventListener('scroll', onScroll, { passive: true });
  detailSpecialEffectCleanups.push(() => {
    pokemonDetailBody.removeEventListener('scroll', onScroll);
    popup.remove();
  });
}

function wrapVictiniLetters(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const targets = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.textContent || !/[Vv]/.test(node.textContent)) continue;
    if (!node.parentElement) continue;
    if (node.parentElement.closest('.victini-v-letter')) continue;
    targets.push(node);
  }
  for (const node of targets) {
    const fragment = document.createDocumentFragment();
    for (const character of node.textContent) {
      if (character === 'V' || character === 'v') {
        const span = document.createElement('span');
        span.className = 'victini-v-letter';
        span.textContent = character;
        fragment.append(span);
      } else {
        fragment.append(document.createTextNode(character));
      }
    }
    node.parentNode?.replaceChild(fragment, node);
  }
}

function applyVictiniDetailLetterEffect(pokemon) {
  if (!areEasterEggsEnabled()) return;
  if (pokemon.name !== 'Victini') return;
  clearVictiniLetterEffect();
  wrapVictiniLetters(detailTitle);
  wrapVictiniLetters(detailTopPanel);
  wrapVictiniLetters(pokemonDetailBody);
}

function createDetailCostEditor(pokemon) {
  const form = document.createElement('form');
  form.className = 'detail-cost-editor';
  form.hidden = true;
  const createField = (labelText, mode) => {
    const field = createNode('label', 'details-field');
    field.append(createNode('span', '', labelText));
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.max = '32';
    input.step = '1';
    input.inputMode = 'numeric';
    input.dataset.mode = mode;
    const value = getPokemonCost(pokemon, mode);
    input.value = value === null ? '' : String(value);
    field.append(input);
    return field;
  };
  form.append(createField('Singles', 'singles'), createField('Doubles', 'doubles'));
  const actions = createNode('div', 'auth-actions');
  const save = createNode('button', 'details-primary', 'Kosten speichern');
  save.type = 'submit';
  const cancel = createNode('button', 'details-secondary', 'Abbrechen');
  cancel.type = 'button';
  cancel.addEventListener('click', () => {
    form.hidden = true;
  });
  actions.append(save, cancel);
  const feedback = createNode('p', 'auth-feedback');
  feedback.setAttribute('aria-live', 'polite');
  form.append(actions, feedback);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const cost = normalizeEditableCost(form.querySelector('[data-mode="singles"]').value);
    const costDbl = normalizeEditableCost(form.querySelector('[data-mode="doubles"]').value);
    if (Number.isNaN(cost) || Number.isNaN(costDbl)) {
      feedback.textContent = 'Kosten müssen ganze Zahlen zwischen 0 und 32 sein oder leer bleiben.';
      feedback.dataset.state = 'error';
      return;
    }
    save.disabled = true;
    feedback.textContent = 'Wird gespeichert …';
    delete feedback.dataset.state;
    try {
      await saveSharedCostChanges([{ pokemon_name: pokemon.name, cost, cost_dbl: costDbl }]);
      renderPokemonDetail(pokemon);
    } catch (error) {
      save.disabled = false;
      feedback.textContent = `Speichern fehlgeschlagen: ${error.message}`;
      feedback.dataset.state = 'error';
    }
  });
  return form;
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
    'is-gmax-detail',
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
  if (animatedBorderVariant === 'gmax') pokemonDetailModal.classList.add('is-gmax-detail');
  if (animatedBorderVariant === 'primal-groudon') pokemonDetailModal.classList.add('is-primal-groudon-detail');
  if (animatedBorderVariant === 'primal-kyogre') pokemonDetailModal.classList.add('is-primal-kyogre-detail');
  if (areEasterEggsEnabled() && isRotomFamily(pokemon) && Math.random() < 0.1) {
    pokemonDetailModal.classList.add('is-rotom-static');
    queueDetailEffect(() => {
      pokemonDetailModal.classList.remove('is-rotom-static');
    }, 1100);
  }
  detailTitle.textContent = getPokemonDisplayName(pokemon);
  if (costSuggestionValue) {
    costSuggestionValue.value = '';
    costSuggestionValue.placeholder = getPokemonCost(pokemon) === null ? 'Neue Kosten' : `Aktuell: ${getPokemonCost(pokemon)}`;
  }
  resetCostSuggestionForm();
  detailTitle.classList.remove('is-quark-name', 'is-proto-name', 'is-porygon-glitching', 'is-disguised-name');
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
    const detailSprite = getDetailSpriteData(form);
    if (hasWormholeEffect(form)) spriteWrap.classList.add('has-wormhole-effect');
    if (isGmaxPokemon(form.name)) spriteWrap.classList.add('has-gmax-sprite-aura');
    applySpriteCheckerOverlay(spriteWrap, form, detailSprite.sprite);
    if (['Zorua', 'Zorua-Hisui', 'Zoroark', 'Zoroark-Hisui'].includes(pokemon.name) && form.name === pokemon.name) {
      applyIllusionSpriteEffect(image, form);
    } else if (pokemon.name === 'Ditto' && form.name === 'Ditto') {
      applyDittoSpriteEffect(image, form);
    } else {
      setPokemonSpriteWithFallback(image, form, detailSprite.sprite, `${form.name}${detailSprite.isShiny ? ' shiny' : ''} sprite`, spriteWrap);
      if (detailSprite.isShiny) spriteWrap.classList.add('has-shiny-sparkle');
    }
    if (pokemon.name === 'Porygon-Z' && form.name === pokemon.name) {
      const blueLayer = document.createElement('img');
      blueLayer.className = 'detail-main-sprite detail-main-sprite-glitch detail-main-sprite-glitch-blue';
      setSpriteWithFallback(blueLayer, detailSprite.sprite, `${form.name}${detailSprite.isShiny ? ' shiny' : ''} sprite`);
      const pinkLayer = document.createElement('img');
      pinkLayer.className = 'detail-main-sprite detail-main-sprite-glitch detail-main-sprite-glitch-pink';
      setSpriteWithFallback(pinkLayer, detailSprite.sprite, `${form.name}${detailSprite.isShiny ? ' shiny' : ''} sprite`);
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
    const titleRow = document.createElement('div');
    titleRow.className = 'detail-top-title-row';
    const title = document.createElement('h3');
    title.className = 'detail-top-title';
    title.textContent = getPokemonDisplayName(form);
    const formNameVariant = getSpecialNameVariant(form);
    if (formNameVariant === 'quark') title.classList.add('is-quark-name');
    if (formNameVariant === 'proto') title.classList.add('is-proto-name');
    if (form.name === pokemon.name) activeTopTitle = title;
    const weatherBadge = createDetailWeatherBadgeElement(form);
    const subtitle = createDetailSubtitleElement(form);
    const tagIcons = createDetailTagIconsElement(form);
    if (tagIcons) headingWrap.append(tagIcons);
    titleRow.append(title);
    if (form.name === pokemon.name) titleRow.append(createFavoritePokemonButton(pokemon, 'pokemon-favorite-button detail-favorite-button'));
    if (weatherBadge) titleRow.append(weatherBadge);
    titleTextWrap.append(titleRow);
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
        registerDefenseProfileNode(label, entries.map((entry) => ({ value: entry.value, label: entry.reason })), {
          classNames: () => [],
          text: (value) => `${value}x`,
          showLabel: true,
        }, getDefenseAbilityStates(form));
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
      setupStinkyCursorEffect(spriteWrap, pokemon);
      setupZygardeDetailEffect(pokemon, spriteWrap, image);
      setupMagikarpDetailEffect(spriteWrap, image, pokemon);
    }
  }
  setupPaintSplatterDetailEffect(pokemon);
  setupPorygonFakePopupEffect(pokemon);
  if (activeTopTitle) setupMimikyuDetailEffect(pokemon, [detailTitle, activeTopTitle]);
  if (areEasterEggsEnabled() && pokemon.name === 'Porygon-Z' && activeTopTitle && activeSpriteWrap && activeSpriteLayers.length) {
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
    title.textContent = getAbilityDisplayName(ability);
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
  const singlesCost = getPokemonCost(pokemon, 'singles');
  const doublesCost = getPokemonCost(pokemon, 'doubles');
  const activeCost = getPokemonCost(pokemon);
  const costEditor = authSession?.user ? createDetailCostEditor(pokemon) : null;
  if (singlesCost === null && doublesCost === null) {
    renderEmptyDetailState(detailTierList, 'Für dieses Pokémon sind derzeit keine Punktekosten festgelegt.');
  } else {
    for (const [modeLabel, modeCost] of [['Singles', singlesCost], ['Doubles', doublesCost]]) {
      const costRibbon = document.createElement('div');
      costRibbon.className = 'detail-ribbon is-tier';
      const costBadge = document.createElement('span');
      costBadge.className = 'detail-tier-badge';
      if (modeCost !== null && modeCost >= 21) {
        costBadge.classList.add('is-premium', `cost-${modeCost}`);
      }
      costBadge.textContent = modeCost === null ? '—' : String(modeCost);
      markPlaceholderCost(costBadge, pokemon, modeLabel.toLowerCase());
      const costText = document.createElement('p');
      costText.textContent = modeCost === null
        ? `Für ${modeLabel} sind keine Punktekosten festgelegt`
        : `Dieses Pokémon kostet ${modeCost} Punkte in ${modeLabel}`;
      markPlaceholderCost(costText, pokemon, modeLabel.toLowerCase());
      costRibbon.append(costBadge, costText);
      if (authSession?.user) {
        const edit = createNode('button', 'details-secondary detail-cost-edit-button', '✎');
        edit.type = 'button';
        edit.setAttribute('aria-label', `${modeLabel}-Kosten bearbeiten`);
        edit.addEventListener('click', () => {
          if (!costEditor) return;
          costEditor.hidden = false;
          costEditor.querySelector(`[data-mode="${modeLabel.toLowerCase()}"]`)?.focus();
        });
        costRibbon.append(edit);
      }
      detailTierList.append(costRibbon);
    }
    if (costEditor) detailTierList.append(costEditor);
    renderCostSuggestionToggle();

    if (activeCost !== null && activeCost >= 16) {
      const lowPowerRibbon = document.createElement('div');
      lowPowerRibbon.className = 'detail-ribbon is-caution';
      const icon = document.createElement('span');
      icon.textContent = '⚠';
      const text = document.createElement('p');
      text.textContent = 'Dieses Pokémon ist in Low-Power Drafts nicht erlaubt';
      lowPowerRibbon.append(icon, text);
      detailTierList.append(lowPowerRibbon);
    }

    if (activeCost !== null && activeCost >= 21) {
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

  renderPokemonCareer(pokemon);

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
    detailFamilyTitle.textContent = areEasterEggsEnabled() ? 'Sandwich' : 'Familie';
    detailFamily.innerHTML = '';
    if (areEasterEggsEnabled()) {
      const sandwichCard = document.createElement('div');
      sandwichCard.className = 'detail-sandwich-card';
      const sandwichImage = document.createElement('img');
      sandwichImage.src = 'assets/koraidon-miraidon-sandwich.png';
      sandwichImage.alt = 'Sandwich';
      sandwichImage.loading = 'lazy';
      sandwichCard.append(sandwichImage);
      detailFamily.append(sandwichCard);
    }
  } else {
    detailFamilyTitle.textContent = 'Familie';
    const familyMembers = getFamilyMembers(pokemon);
    const familyEntries = areEasterEggsEnabled() && pokemon.name === 'Cubone'
      ? familyMembers.map((member) => (
        member.name === 'Marowak' || member.name === 'Marowak-Alola'
          ? { pokemon: member, spriteEmoji: '\uD83E\uDEA6', emojiClass: 'is-gravestone' }
          : member
      ))
      : familyMembers;
    renderSpriteLinkSection(detailFamily, familyEntries, 'Keine Familienmitglieder gefunden.');
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
    const chip = document.createElement('span');
    chip.className = 'detail-defense-chip';
    registerDefenseProfileNode(chip, getDefenseEntriesForType(pokemon, type).map((entry) => ({ value: entry.value, label: entry.reason })), {
      classNames: (value, classification) => [classification.className],
      text: (value, classification) => `${value}x ${classification.label}`,
      showLabel: true,
    }, getDefenseAbilityStates(pokemon));
    valuesWrap.append(chip);
    card.append(header, valuesWrap);
    detailWeaknessGrid.append(card);
  }

  renderPokemonDetailMoves(pokemon);
  renderSimilarPokemonSection(pokemon);
  initializeMeowthCoinHunt(pokemon);
  applyVictiniDetailLetterEffect(pokemon);
}

function openPokemonDetail(name) {
  const pokemon = pokemonByName.get(name);
  if (!pokemon) return;
  detailOneShotEffectsPlayed = new Set();
  expandedAbilityIds = new Set();
  loadedSimilarPokemonName = null;
  detailMoveSearch.value = '';
  detailMoveCategory.value = 'all';
  prepareDetailShinySprites(pokemon);
  renderPokemonDetail(pokemon);
  if (pokemonDetailBody) pokemonDetailBody.scrollTop = 0;
  pokemonDetailModal.hidden = false;
  document.body.classList.add('pokemon-detail-open');
  closeMobilePanels();
  if (pokemonDetailBody) pokemonDetailBody.scrollTop = 0;
}

function closePokemonDetail() {
  clearMeowthCoinHunt();
  clearDetailSpecialEffects();
  clearDetailEffectTimeouts();
  activeDetailShinySprites = new Map();
  pokemonDetailModal.hidden = true;
  document.body.classList.remove('pokemon-detail-open');
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
    chip.append(document.createTextNode(getOptionDisplayName(item)));
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
      .filter((option) => getOptionSearchText(option).includes(query))
      .filter((option) => !getItems().some((item) => item.id === option.id))
      .slice(0, 8);

    for (const match of matches) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'suggestion-item';
      button.textContent = getOptionDisplayName(match);
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
    const exact = options.find((option) => normalizeText(option.name) === query || normalizeText(option.names?.de ?? '') === query);
    const first = exact ?? options.find((option) => getOptionSearchText(option).includes(query));
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
  if (!pokemon || getPokemonCost(pokemon) === null) return 0;
  return getPokemonCost(pokemon) + getBudgetPlannerCaptainCost(slot.captainKind, slot.captainType);
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
  const baseCost = getPokemonCost(pokemon) ?? 0;
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

function getBudgetPlannerCountMascotEntry(count) {
  const spriteFor = (name) => pokemonByName.get(name)?.sprite ?? '';
  if (count >= 9) {
    return {
      className: 'is-healthy',
      sprite: spriteFor('Wishiwashi-School') || spriteFor('Wishiwashi'),
      alt: 'Wishiwashi-School sprite',
    };
  }
  return {
    className: 'is-low',
    sprite: spriteFor('Wishiwashi'),
    alt: 'Wishiwashi sprite',
  };
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
  if (!pokemon || pokemon.hidden || pokemon.unreleased || pokemon.impossible || getPokemonCost(pokemon) === null) {
    return { unavailable: true, reason: 'Unavailable' };
  }
  if (budgetPlannerState.format === 'low-power' && getPokemonCost(pokemon) > 13) {
    return { unavailable: true, reason: 'Too expensive for Low Power' };
  }
  if (budgetPlannerState.format === 'normal' && getPokemonCost(pokemon) > 20) {
    return { unavailable: true, reason: 'Too expensive for Normal' };
  }
  const megaEntry = getBudgetPlannerSelectedMegaSlot(slotIndex);
  if (megaEntry && getPokemonFlags(pokemon).mega) {
    return { unavailable: true, reason: 'Another Mega is already selected' };
  }
  const projectedSpent = getBudgetPlannerSpentBudget(slotIndex) + getPokemonCost(pokemon);
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
    const baseCost = getPokemonCost(entry.pokemon) ?? 0;
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
  const selectedCount = getBudgetPlannerSelectedEntries().length;
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
  if (budgetPlannerCountCurrent) budgetPlannerCountCurrent.textContent = String(selectedCount);
  if (budgetPlannerCountTotal) budgetPlannerCountTotal.textContent = '12';
  if (budgetPlannerCount) {
    budgetPlannerCount.classList.remove('is-low', 'is-healthy');
    const mascot = getBudgetPlannerCountMascotEntry(selectedCount);
    for (const className of mascot.className.split(' ')) {
      if (className) budgetPlannerCount.classList.add(className);
    }
    if (budgetPlannerCountMascot && mascot.sprite) {
      budgetPlannerCountMascot.hidden = false;
      budgetPlannerCountMascot.src = mascot.sprite;
      budgetPlannerCountMascot.alt = mascot.alt;
    } else if (budgetPlannerCountMascot) {
      budgetPlannerCountMascot.hidden = true;
      budgetPlannerCountMascot.removeAttribute('src');
    }
  }
}

function renderBudgetPlannerStars() {
  if (!budgetPlannerStars) return;
  budgetPlannerStars.innerHTML = '';
  const selected = getBudgetPlannerSelectedEntries();
  const oneCostEntry = selected.find((entry) => getPokemonCost(entry.pokemon) === 1);
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
        pokemon: entry.pokemon,
        defenseTypes: [entry.slot.captainType],
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
      cell.className = 'budget-planner-defense-cell';
      const text = document.createElement('span');
      text.className = 'budget-planner-defense-text';
      registerDefenseProfileNode(text, getDefenseProfiles(entry.pokemon, type, entry.defenseTypes ?? entry.pokemon.types), {
        classNames: (value) => [getBudgetPlannerDefenseCode(value).className],
        text: (value) => getBudgetPlannerDefenseCode(value).text,
      }, getDefenseAbilityStates(entry.pokemon, entry.defenseTypes ?? entry.pokemon.types));
      cell.append(text);
      cell.title = `${entry.name} vs ${type}`;
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
    markPlaceholderCost(cost, entry.pokemon);
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
  const trimmed = normalizeText(query);
  if (!trimmed) return;
  const slot = budgetPlannerState.slots[slotIndex];
  if (slot?.name && normalizeText(slot.input) === normalizeText(slot.name)) return;
  const suggestions = allPokemon
    .filter((pokemon) => getPokemonSearchText(pokemon).includes(trimmed))
    .sort((left, right) => left.num - right.num || left.sourceIndex - right.sourceIndex)
    .slice(0, 16);
  for (const pokemon of suggestions) {
    const state = isBudgetPlannerPokemonUnavailable(pokemon, slotIndex);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `suggestion-item budget-planner-suggestion ${state.unavailable ? 'is-invalid' : ''}`;
    button.disabled = state.unavailable;
    const costText = getPokemonCost(pokemon) === null ? '—' : String(getPokemonCost(pokemon));
    button.textContent = `${getPokemonDisplayName(pokemon)} (${costText})${state.reason ? ` - ${state.reason}` : ''}`;
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
    const baseCost = getPokemonCost(entry.pokemon) ?? 0;
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
  const projected = getBudgetPlannerSpentBudget(slotIndex) + (getPokemonCost(pokemon) ?? 0) + nextExtra;
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
    name.textContent = getPokemonDisplayName(pokemon);
    const cost = document.createElement('span');
    cost.textContent = `${getBudgetPlannerSlotTotalCost(slot)} Punkte`;
    markPlaceholderCost(cost, pokemonByName.get(slot.name));
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

function getRuleCheckerCurrentTeamOptions() {
  return getDraftOverviewPlayers()
    .filter((player) => Array.isArray(player.pokemon) && player.pokemon.length)
    .map((player) => ({
      id: player.id,
      label: [player.name, player.teamLabel].filter(Boolean).join(' - '),
      format: player.format,
      names: player.pokemon.map((pick) => pick.name).filter(Boolean).slice(0, 12),
    }));
}

function renderRuleCheckerCurrentTeamImportOptions() {
  if (!ruleCheckerCurrentTeamSelect || !ruleCheckerCurrentTeamEmpty || !ruleCheckerCurrentTeamConfirm) return [];
  const options = getRuleCheckerCurrentTeamOptions();
  ruleCheckerCurrentTeamSelect.innerHTML = '';
  for (const option of options) {
    const node = document.createElement('option');
    node.value = option.id;
    node.textContent = `${option.label} (${option.names.length})`;
    ruleCheckerCurrentTeamSelect.append(node);
  }
  const isEmpty = !options.length;
  ruleCheckerCurrentTeamSelect.disabled = isEmpty;
  ruleCheckerCurrentTeamConfirm.disabled = isEmpty;
  ruleCheckerCurrentTeamEmpty.hidden = !isEmpty;
  return options;
}

function openRuleCheckerCurrentTeamImport() {
  if (!ruleCheckerCurrentTeamOverlay) return;
  renderRuleCheckerCurrentTeamImportOptions();
  ruleCheckerCurrentTeamOverlay.hidden = false;
}

function closeRuleCheckerCurrentTeamImport() {
  if (ruleCheckerCurrentTeamOverlay) ruleCheckerCurrentTeamOverlay.hidden = true;
}

function importRuleCheckerFromCurrentTeam() {
  const options = getRuleCheckerCurrentTeamOptions();
  const selectedId = ruleCheckerCurrentTeamSelect?.value;
  const selected = options.find((option) => option.id === selectedId) ?? options[0];
  if (!selected?.names.length) return;
  ruleCheckerState.rosterNames = [...new Set(selected.names)].slice(0, 12);
  if (selected.format) ruleCheckerState.format = selected.format;
  ruleCheckerState.pickerInput = '';
  syncRuleCheckerBattleSlots();
  resetRuleCheckerValidation();
  closeRuleCheckerCurrentTeamImport();
  renderRuleChecker();
}

function resetRuleCheckerBattleSlotFromImport(slot, imported) {
  slot.name = imported.name;
  slot.item = imported.item ?? '';
  slot.ability = imported.ability ?? '';
  slot.moves = [...(imported.moves ?? []).slice(0, 4), '', '', '', ''].slice(0, 4);
  slot.teraActive = Boolean(imported.teraType);
  slot.teraType = imported.teraType ?? '';
  slot.zActive = Boolean(imported.zType);
  slot.zType = imported.zType ?? '';
}

function getRuleCheckerCanonicalAbility(pokemon, abilityText) {
  const query = normalizeText(abilityText);
  if (!pokemon || !query) return '';
  return (pokemon.abilityDetails ?? []).find((ability) =>
    normalizeText(ability.name) === query || normalizeText(ability.names?.de ?? '') === query
  )?.name ?? abilityText.trim();
}

function getRuleCheckerCanonicalMove(pokemon, moveText) {
  const query = normalizeText(moveText);
  if (!pokemon || !query) return moveText.trim();
  return getPokemonMoveRows(pokemon).find((move) =>
    normalizeText(move.name) === query || normalizeText(getMoveDisplayName(move)) === query || normalizeText(move.names?.de ?? '') === query
  )?.name ?? moveText.trim();
}

function normalizeRuleCheckerTypeName(typeText) {
  const query = normalizeText(typeText);
  if (!query) return '';
  return [...battleTypes, 'Stellar'].find((type) =>
    normalizeText(type) === query || normalizeText(typeLabelsDe[type] ?? '') === query
  ) ?? typeText.trim();
}

function parseRuleCheckerShowdownText(text) {
  return String(text ?? '')
    .split(/\n\s*\n/g)
    .map((block) => {
      const lines = block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (!lines.length) return null;
      const imported = { name: '', item: '', ability: '', teraType: '', zType: '', moves: [] };
      const first = lines[0];
      const itemSplit = first.split(/\s+@\s+/);
      let speciesText = itemSplit[0].replace(/\s+\([MF]\)$/i, '').trim();
      if (itemSplit[1]) imported.item = itemSplit.slice(1).join(' @ ').trim();
      const nicknameSpecies = speciesText.match(/\(([^()]+)\)\s*$/);
      if (nicknameSpecies && getPokemonByNameLoose(nicknameSpecies[1])) speciesText = nicknameSpecies[1];
      const pokemon = getPokemonByNameLoose(speciesText);
      if (!pokemon) return null;
      imported.name = pokemon.name;
      for (const line of lines.slice(1)) {
        if (/^Ability:/i.test(line)) imported.ability = getRuleCheckerCanonicalAbility(pokemon, line.replace(/^Ability:\s*/i, ''));
        else if (/^Tera Type:/i.test(line)) imported.teraType = normalizeRuleCheckerTypeName(line.replace(/^Tera Type:\s*/i, ''));
        else if (/^Z[- ]?Type:/i.test(line)) imported.zType = normalizeRuleCheckerTypeName(line.replace(/^Z[- ]?Type:\s*/i, ''));
        else if (/^-/.test(line) && imported.moves.length < 4) imported.moves.push(getRuleCheckerCanonicalMove(pokemon, line.replace(/^-\s*/, '')));
      }
      return imported;
    })
    .filter(Boolean)
    .slice(0, 6);
}

function importRuleCheckerFromShowdownText(text) {
  const importedSets = parseRuleCheckerShowdownText(text);
  if (!importedSets.length) return;
  ruleCheckerState.rosterNames = [...new Set([...ruleCheckerState.rosterNames, ...importedSets.map((entry) => entry.name)])].slice(0, 12);
  ruleCheckerState.battleSlots = Array.from({ length: 6 }, (_, index) => ({
    name: '',
    teraActive: false,
    teraType: '',
    zActive: false,
    zType: '',
    item: '',
    ability: '',
    moves: ['', '', '', ''],
  }));
  importedSets.forEach((imported, index) => resetRuleCheckerBattleSlotFromImport(ruleCheckerState.battleSlots[index], imported));
  ruleCheckerState.pickerInput = '';
  syncRuleCheckerBattleSlots();
  resetRuleCheckerValidation();
  closeRuleCheckerShowdownOverlay();
  renderRuleChecker();
}

function buildRuleCheckerShowdownText() {
  return ruleCheckerState.battleSlots
    .map((slot) => {
      const pokemon = getPokemonByNameLoose(slot.name);
      if (!pokemon) return '';
      const lines = [`${pokemon.name}${slot.item ? ` @ ${slot.item}` : ''}`];
      if (slot.ability) lines.push(`Ability: ${slot.ability}`);
      if (slot.teraActive && slot.teraType) lines.push(`Tera Type: ${slot.teraType}`);
      if (slot.zActive && slot.zType) lines.push(`Z-Type: ${slot.zType}`);
      for (const move of slot.moves ?? []) {
        if (move?.trim()) lines.push(`- ${move.trim()}`);
      }
      return lines.join('\n');
    })
    .filter(Boolean)
    .join('\n\n');
}

function openRuleCheckerShowdownOverlay(mode) {
  if (!ruleCheckerShowdownOverlay || !ruleCheckerShowdownText || !ruleCheckerShowdownConfirm) return;
  ruleCheckerShowdownMode = mode;
  const isExport = mode === 'export';
  if (ruleCheckerShowdownTitle) ruleCheckerShowdownTitle.textContent = isExport ? 'Showdown exportieren' : 'Showdown importieren';
  if (ruleCheckerShowdownHelp) {
    ruleCheckerShowdownHelp.textContent = isExport
      ? 'Kopiere diese Sets in deinen Showdown-Teambuilder.'
      : 'Füge Showdown-Sets ein. Erkannte Pokémon werden in die sechs Vorschau-Slots übernommen.';
  }
  ruleCheckerShowdownText.value = isExport ? buildRuleCheckerShowdownText() : '';
  ruleCheckerShowdownText.readOnly = isExport;
  ruleCheckerShowdownConfirm.textContent = isExport ? 'Schließen' : 'Importieren';
  ruleCheckerShowdownOverlay.hidden = false;
  window.setTimeout(() => {
    ruleCheckerShowdownText.focus();
    if (isExport) ruleCheckerShowdownText.select();
  }, 0);
}

function closeRuleCheckerShowdownOverlay() {
  if (ruleCheckerShowdownOverlay) ruleCheckerShowdownOverlay.hidden = true;
}

function confirmRuleCheckerShowdownOverlay() {
  if (ruleCheckerShowdownMode === 'export') {
    closeRuleCheckerShowdownOverlay();
    return;
  }
  importRuleCheckerFromShowdownText(ruleCheckerShowdownText?.value ?? '');
}

function renderRuleCheckerPickerSuggestions() {
  if (!ruleCheckerPickerSuggestions) return;
  ruleCheckerPickerSuggestions.innerHTML = '';
  const trimmed = ruleCheckerState.pickerInput.trim().toLowerCase();
  if (!trimmed || ruleCheckerState.rosterNames.length >= 12) return;
  const suggestions = allPokemon
    .filter((pokemon) => getPokemonSearchText(pokemon).includes(normalizeText(trimmed)) && !ruleCheckerState.rosterNames.includes(pokemon.name))
    .sort((left, right) => left.num - right.num || left.sourceIndex - right.sourceIndex)
    .slice(0, 16);
  for (const pokemon of suggestions) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'suggestion-item';
    button.textContent = getPokemonDisplayName(pokemon);
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
      if ((getPokemonCost(entry.pokemon) ?? 0) > 13) {
        addRuleCheckerViolation(`${entry.pokemon.name} ist zu teuer für Low-Power Drafts!`, {
          cardSlots: [entry.slotIndex],
        });
      }
    }
  }

  if (ruleCheckerState.format === 'normal') {
    for (const entry of entries) {
      if ((getPokemonCost(entry.pokemon) ?? 0) > 20) {
        addRuleCheckerViolation(`${entry.pokemon.name} ist im ${getRuleCheckerUberTierLabel(getPokemonCost(entry.pokemon) ?? 0)} Uber Tier!`, {
          cardSlots: [entry.slotIndex],
        });
      }
    }
  }

  for (const entry of teraEntries) {
    if ((getPokemonCost(entry.pokemon) ?? 0) > 5) {
      addRuleCheckerViolation(`${entry.pokemon.name} kostet ${getPokemonCost(entry.pokemon)} Punkte und darf kein Tera-Captain sein!`, {
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
    if ((getPokemonCost(entry.pokemon) ?? 0) > 10) {
      addRuleCheckerViolation(`${entry.pokemon.name} kostet ${getPokemonCost(entry.pokemon)} Punkte und darf kein Z-Captain sein!`, {
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
    if (hiddenPowerMove && (getPokemonCost(entry.pokemon) ?? 0) > 5) {
      addRuleCheckerViolation(`Nur Pokémon bis 5 Punkten dürfen Kraftreserve nutzen. ${entry.pokemon.name} kostet ${getPokemonCost(entry.pokemon)} Punkte.`, {
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
    button.textContent = getAbilityDisplayName(ability);
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
    option.textContent = getPokemonDisplayName(rosterPokemon);
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
  name.textContent = getPokemonDisplayName(pokemon);
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
      option.value = getMoveDisplayName(move);
      moveList.append(option);
    }
    moveInput.addEventListener('change', () => {
      const exactMatch = moveRows.find((move) => move.name === moveInput.value || getMoveDisplayName(move) === moveInput.value);
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
  if (ruleCheckerFormat) ruleCheckerFormat.value = ruleCheckerState.format;
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
  closeRuleCheckerCurrentTeamImport();
  closeRuleCheckerShowdownOverlay();
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
    .filter((pokemon) => !pokemon.hidden && getPokemonSearchText(pokemon).includes(normalizeText(query)) && !taken.has(pokemon.name))
    .sort((left, right) => left.num - right.num || left.sourceIndex - right.sourceIndex)
    .slice(0, 16);
  for (const pokemon of suggestions) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'suggestion-item';
    button.textContent = getPokemonDisplayName(pokemon);
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
      entry.cost_dbl = cost;
      entry.cost_dbl_is_placeholder = false;
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
      cost_dbl: 1,
      cost_dbl_is_placeholder: false,
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
      cost_dbl: 19,
      cost_dbl_is_placeholder: false,
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
        cost_dbl: null,
        cost_dbl_is_placeholder: false,
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
      cost_dbl: 22,
      cost_dbl_is_placeholder: false,
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
initializeLandingMatchdayBanner();
initializeLandingTierUpdate();
detailsButton.addEventListener('click', openDetailsModal);
expertSearchButton?.addEventListener('click', openExpertSearchModal);
searchExpandButton?.addEventListener('click', () => setSearchAdvancedExpanded(!isSearchAdvancedExpanded));
for (const trigger of mobilePanelTriggers) {
  trigger.addEventListener('click', () => toggleMobilePanel(trigger.dataset.mobilePanelTrigger));
}
for (const button of mobilePanelCloseButtons) {
  button.addEventListener('click', closeMobilePanels);
}
for (const panel of mobilePanels) {
  panel.addEventListener('click', (event) => {
    if (event.target.closest('[data-mobile-panel-close]')) return;
    if (event.target.closest('.details-button')) closeMobilePanels();
  }, { capture: true });
}
mobilePanelBackdrop?.addEventListener('click', closeMobilePanels);
railToggle?.addEventListener('click', toggleRailCollapsed);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMobilePanels();
});
window.addEventListener('resize', () => {
  resetControlRailStickyThreshold();
  syncResponsiveMode();
});
window.addEventListener('scroll', updateControlRailVisibility, { passive: true });
window.addEventListener('hashchange', () => renderHubView());
hubActionButtons.forEach((button) => {
  button.addEventListener('click', () => handleHubAction(button.dataset.hubAction));
});
hubSearchInput?.addEventListener('input', renderHubSearchResults);
hubSearchInput?.addEventListener('focus', renderHubSearchResults);
hubSearchInput?.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  const first = hubSearchResults?.querySelector('.hub-search-result');
  if (first) {
    event.preventDefault();
    first.click();
  }
});
replacementFinderButton?.addEventListener('click', () => openReplacementPicker());
coreFinderButton?.addEventListener('click', openCoreFinder);
budgetPlannerButton?.addEventListener('click', openBudgetPlanner);
ruleCheckerButton?.addEventListener('click', () => {
  void openRuleChecker();
});
draftOverviewButton?.addEventListener('click', openDraftOverview);
stefansPdfButton?.addEventListener('click', openStefansPdf);
changelogButton?.addEventListener('click', () => openChangelog('site'));
spielerButton?.addEventListener('click', openSpieler);
informationGraphButton?.addEventListener('click', openInformationGraph);
costSuggestionsButton?.addEventListener('click', openCostSuggestions);
legendButton?.addEventListener('click', openLegend);
themeToggle?.addEventListener('click', toggleTheme);
eastereggToggle?.addEventListener('click', toggleEastereggMode);
languageToggle?.addEventListener('click', () => setNameLanguage(activeNameLanguage === 'de' ? 'en' : 'de'));
battleModeToggle?.addEventListener('click', toggleBattleMode);
authToggle?.addEventListener('click', openAuthModal);
authClose?.addEventListener('click', closeAuthModal);
authModal?.addEventListener('click', (event) => {
  if (event.target.dataset.closeAuth === 'true') closeAuthModal();
});
tierEditorSearch?.addEventListener('input', renderTierEditor);
tierEditorChangedOnly?.addEventListener('change', renderTierEditor);
tierEditorSave?.addEventListener('click', () => {
  void saveTierEditorChanges();
});
tierEditorDiscard?.addEventListener('click', discardTierEditorChanges);
authLoginForm?.addEventListener('submit', (event) => {
  void submitAuthLogin(event);
});
authForgotPassword?.addEventListener('click', () => {
  void requestPasswordReset();
});
authShowPasswordChange?.addEventListener('click', showPasswordChange);
authPasswordCancel?.addEventListener('click', cancelPasswordChange);
authPasswordForm?.addEventListener('submit', (event) => {
  void submitPasswordChange(event);
});
authSignOut?.addEventListener('click', () => {
  void signOutUser();
});
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
  draftOverviewClose?.addEventListener('click', closeDraftOverview);
  draftOverviewModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeDraftOverview === 'true') closeDraftOverview();
  });
  draftOverviewTabs?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-draft-overview-mode]');
    if (!button) return;
    draftOverviewContext = 'modal';
    draftOverviewMode = button.dataset.draftOverviewMode;
    renderDraftOverview();
  });
  draftPageTabs?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-draft-overview-mode]');
    if (!button) return;
    draftOverviewContext = 'page';
    draftOverviewMode = button.dataset.draftOverviewMode;
    renderDraftOverview();
  });
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
  spielerClose?.addEventListener('click', closeSpieler);
  spielerModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeSpieler === 'true') closeSpieler();
  });
  informationGraphClose?.addEventListener('click', closeInformationGraph);
  informationGraphModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeInformationGraph === 'true') closeInformationGraph();
  });
  informationGraphGenerate?.addEventListener('click', () => drawInformationGraph({ withData: true }));
  informationGraphCanvas?.addEventListener('mousemove', updateInformationGraphTooltip);
  informationGraphCanvas?.addEventListener('mouseleave', () => {
    if (informationGraphTooltip) informationGraphTooltip.hidden = true;
  });
  costSuggestionForm?.addEventListener('submit', (event) => {
    void submitCostSuggestion(event);
  });
  costSuggestionsClose?.addEventListener('click', closeCostSuggestions);
  costSuggestionsModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeCostSuggestions === 'true') closeCostSuggestions();
  });
  costSuggestionsAuth?.addEventListener('submit', (event) => {
    void loadCostSuggestions(event);
  });
  window.addEventListener('resize', () => {
    if (informationGraphModal?.hidden === false) drawInformationGraph({ withData: informationGraphPoints.length > 0 });
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
  const exact = getPokemonByNameLoose(speedTiersState.pickerInput);
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
ruleCheckerImportCurrentTeam?.addEventListener('click', openRuleCheckerCurrentTeamImport);
ruleCheckerCurrentTeamClose?.addEventListener('click', closeRuleCheckerCurrentTeamImport);
ruleCheckerCurrentTeamCancel?.addEventListener('click', closeRuleCheckerCurrentTeamImport);
ruleCheckerCurrentTeamConfirm?.addEventListener('click', importRuleCheckerFromCurrentTeam);
ruleCheckerCurrentTeamOverlay?.addEventListener('click', (event) => {
  if (event.target.dataset.closeRuleCheckerCurrentTeam === 'true') closeRuleCheckerCurrentTeamImport();
});
ruleCheckerImportShowdown?.addEventListener('click', () => openRuleCheckerShowdownOverlay('import'));
ruleCheckerExportShowdown?.addEventListener('click', () => openRuleCheckerShowdownOverlay('export'));
ruleCheckerShowdownClose?.addEventListener('click', closeRuleCheckerShowdownOverlay);
ruleCheckerShowdownCancel?.addEventListener('click', closeRuleCheckerShowdownOverlay);
ruleCheckerShowdownConfirm?.addEventListener('click', confirmRuleCheckerShowdownOverlay);
ruleCheckerShowdownOverlay?.addEventListener('click', (event) => {
  if (event.target.dataset.closeRuleCheckerShowdown === 'true') closeRuleCheckerShowdownOverlay();
});
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
  const exact = getPokemonByNameLoose(ruleCheckerState.pickerInput);
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
    allPokemon = injectCustomPokemonEntries(assignRandomPokemonSprites(loadedEntries));
    loadFavoritePokemonNames();
    coreDefenseProfileCache = new Map();
    pokemonByName = new Map(allPokemon.map((pokemon) => [pokemon.name, pokemon]));
    rememberStaticPokemonCosts();
    pokemonByNormalizedName = new Map();
    for (const pokemon of allPokemon) {
      pokemonByNormalizedName.set(normalizeText(pokemon.name), pokemon);
      if (pokemon.names?.de) pokemonByNormalizedName.set(normalizeText(pokemon.names.de), pokemon);
    }
    hiddenPokemonByLink = allPokemon.reduce((map, pokemon) => {
      if (!pokemon.hidden || !pokemon.linkedTo) return map;
      const linkedPokemon = map.get(pokemon.linkedTo) ?? [];
      linkedPokemon.push(pokemon);
      map.set(pokemon.linkedTo, linkedPokemon);
      return map;
    }, new Map());
    applyAllFilters();
    void syncSharedCostsForSession();
    openPokemonDetailFromUrl();
    initializeLandingTierUpdate();
    if (activeHubView === 'draft') renderDraftOverview();
    if (activeHubView === 'matchday') renderMatchday();
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
applyEastereggMode(getStoredEastereggMode());
resetControlRailStickyThreshold();
syncResponsiveMode();
updateLanguageToggle();
syncBattleModeToggle();
initializeSupabaseAuth();
initializeAdvancedSearch();
renderHubView();
searchInput.addEventListener('input', applyAllFilters);
sortField.addEventListener('change', applyAllFilters);
sortDirection.addEventListener('change', applyAllFilters);
sortFieldSecondary?.addEventListener('change', applyAllFilters);
sortDirectionSecondary?.addEventListener('change', applyAllFilters);
formatFilter.addEventListener('change', applyAllFilters);
showAllPokemon?.addEventListener('change', () => {
  if (showAllPokemon.checked) {
    for (const checkbox of hideFilterCheckboxes) checkbox.checked = false;
  }
  applyAllFilters();
});
for (const checkbox of hideFilterCheckboxes) {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked && showAllPokemon) showAllPokemon.checked = false;
    applyAllFilters();
  });
}
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
window.setInterval(() => {
  if (!document.hidden) refreshDefenseProfileNodes();
}, 2000);



