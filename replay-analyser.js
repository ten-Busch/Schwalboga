(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PokemonReplayAnalyser = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function decodeHtml(value) {
    const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'" };
    return String(value).replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|#39);/gi, (_, code) => {
      if (code[0] === '#') {
        const hex = code[1].toLowerCase() === 'x';
        return String.fromCodePoint(parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10));
      }
      return named[code.toLowerCase()];
    });
  }

  function extractBattleLog(html) {
    const match = String(html).match(/<script\b[^>]*class\s*=\s*["'][^"']*\bbattle-log-data\b[^"']*["'][^>]*>([\s\S]*?)<\/script\s*>/i);
    if (!match) throw new Error('Keine Pokémon-Showdown-Kampfdaten in dieser HTML-Datei gefunden.');
    return decodeHtml(match[1]).replace(/\\\//g, '/').trim();
  }

  function pokemonName(reference) {
    const value = String(reference || '');
    const colon = value.indexOf(':');
    return (colon >= 0 ? value.slice(colon + 1) : value).trim();
  }

  function sideId(reference) {
    return String(reference || '').match(/^(p\d)/)?.[1] || null;
  }

  function slug(value) {
    return String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function remember(map, key, value) {
    if (!key || !value) return;
    map[key] ||= [];
    if (!map[key].includes(value)) map[key].push(value);
  }

  function analyzeBattleLog(log, source = {}) {
    const players = {};
    const teams = {};
    const movesByPokemon = {};
    const itemsByPokemon = {};
    const abilitiesByPokemon = {};
    const pokemonKnockouts = [];
    const turns = [];
    const events = [];
    let currentTurn = 0;
    let pendingMove = null;
    let pendingDirectFaint = null;
    let winner = null;
    let format = null;
    let timestamp = null;

    for (const rawLine of String(log).split(/\r?\n/)) {
      if (!rawLine.startsWith('|')) continue;
      const parts = rawLine.split('|');
      const command = parts[1];
      if (command === 'player') players[parts[2]] = parts[3];
      else if (command === 'tier') format = parts[2] || null;
      else if (command === 't:') timestamp = Number(parts[2]) || null;
      else if (command === 'win') winner = parts[2] || null;
      else if (['switch', 'drag', 'replace'].includes(command)) {
        pendingMove = null; pendingDirectFaint = null;
        const side = sideId(parts[2]); const name = pokemonName(parts[2]);
        if (side && name) remember(teams, side, name);
        if (command !== 'replace') events.push({ turn: currentTurn, type: command, pokemon: name, side });
      } else if (command === 'poke') {
        const name = (parts[3] || '').split(',')[0].trim();
        remember(teams, parts[2], name);
      } else if (command === 'turn') {
        currentTurn = Number(parts[2]); pendingMove = null; pendingDirectFaint = null;
      } else if (command === 'upkeep') {
        pendingMove = null; pendingDirectFaint = null;
      } else if (command === 'move') {
        const user = pokemonName(parts[2]); const move = parts[3]; const target = pokemonName(parts[4]);
        remember(movesByPokemon, user, move);
        pendingMove = { turn: currentTurn, user, move, target };
        pendingDirectFaint = null;
        const event = { turn: currentTurn, type: 'move', user, move, target: target || null };
        turns.push(event); events.push(event);
      } else if (command === '-item' || command === '-enditem') {
        remember(itemsByPokemon, pokemonName(parts[2]), parts[3]);
      } else if (command === '-ability') {
        remember(abilitiesByPokemon, pokemonName(parts[2]), parts[3]);
      } else if (command === '-damage') {
        const victim = pokemonName(parts[2]);
        const fainted = /(?:^|\s)0(?:\s|$)|\bfnt\b/.test(parts[3] || '');
        const indirect = parts.slice(4).some((field) => field.startsWith('[from]'));
        if (pendingMove && fainted && !indirect && (!pendingMove.target || pendingMove.target === victim)) pendingDirectFaint = { victim, move: pendingMove };
        else if (fainted && indirect) pendingDirectFaint = null;
      }

      const itemField = parts.find((field) => field.startsWith('[from] item: '));
      if (itemField) {
        const ownerField = parts.find((field) => field.startsWith('[of] '));
        remember(itemsByPokemon, ownerField ? pokemonName(ownerField.slice(5)) : pokemonName(parts[2]), itemField.slice(13));
      }
      const abilityField = parts.find((field) => field.startsWith('[from] ability: '));
      if (abilityField) {
        const ownerField = parts.find((field) => field.startsWith('[of] '));
        remember(abilitiesByPokemon, ownerField ? pokemonName(ownerField.slice(5)) : pokemonName(parts[2]), abilityField.slice(16));
      }

      if (command === 'faint') {
        const victim = pokemonName(parts[2]);
        const knockout = pendingDirectFaint?.victim === victim
          ? { turn: currentTurn, killer: pendingDirectFaint.move.user, victim, move: pendingDirectFaint.move.move }
          : { turn: currentTurn, killer: null, victim, move: null };
        pokemonKnockouts.push(knockout); events.push({ ...knockout, type: 'faint' });
        pendingMove = null; pendingDirectFaint = null;
      }
    }

    const teamList = Object.entries(teams).map(([side, members]) => ({ side, player: players[side] || null, pokemon: members }));
    const pokemon = [...new Set(teamList.flatMap((team) => team.pokemon))];
    const date = source.date || (timestamp ? new Date(timestamp * 1000).toISOString() : null);
    const playerNames = teamList.map((team) => team.player).filter(Boolean);
    const baseId = source.id || slug(`${date || 'replay'}-${playerNames.join('-vs-')}`) || `replay-${Date.now()}`;
    return {
      schemaVersion: 1,
      id: baseId,
      source: { fileName: source.fileName || null, url: source.url || null },
      meta: { format, date, winner, turns: currentTurn },
      players,
      teams: teamList,
      pokemon,
      movesByPokemon,
      itemsByPokemon,
      abilitiesByPokemon,
      pokemonKnockouts,
      turns,
      events,
    };
  }

  function analyzeReplayHtml(html, source) { return analyzeBattleLog(extractBattleLog(html), source); }
  function createDatabase(replays) {
    return { schemaVersion: 1, generatedAt: new Date().toISOString(), replays: Array.from(new Map(replays.map((replay) => [replay.id, replay])).values()) };
  }
  return { extractBattleLog, analyzeBattleLog, analyzeReplayHtml, createDatabase };
});
