(function () {
  'use strict';
  const list = document.querySelector('#replay-list');
  const detail = document.querySelector('#replay-detail');
  const search = document.querySelector('#replay-search');
  const defaultReplayFile = 'Sehr echtes Replay.html';
  const displayOnlyReplay = window.DEFAULT_REPLAY_DETAILS || null;
  const publicReplayIds = new Set(displayOnlyReplay?.id ? [displayOnlyReplay.id] : []);
  const accountPlayerNames = new Map([
    ['tenbusch1@gmail.com', ['tenbusch']],
    ['stefan.gysbers@web.de', ['gysi1994']],
    ['robin.nyboer@web.de', ['mrstarli']],
    ['aweggebakker@uos.de', ['nyantacuga']],
    ['niklasnykamp16@gmail.com', ['sibra1998']],
  ]);
  let selectedId = null;

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }

  function allReplays() {
    const candidates = [displayOnlyReplay, ...(window.REPLAY_CATALOG || [])].filter(Boolean);
    const unique = [...new Map(candidates.map((replay) => [replay.id, replay])).values()];
    return unique.filter(canViewReplay);
  }
  function players(replay) { return replay.teams.map((team) => team.player || team.side); }
  function normalizePlayer(value) { return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function canViewReplay(replay) {
    if (publicReplayIds.has(replay.id)) return true;
    const viewer = window.SCHWALBOGA_AUTH?.getReplayViewer?.() || {};
    if (viewer.canViewAll) return true;
    if (!viewer.authenticated) return false;
    const identities = new Set([
      viewer.displayName,
      String(viewer.email || '').split('@')[0],
      ...(accountPlayerNames.get(String(viewer.email || '').toLowerCase()) || []),
    ].map(normalizePlayer).filter(Boolean));
    return players(replay).some((player) => identities.has(normalizePlayer(player)));
  }
  function replayTitle(replay) { return players(replay).join(' vs. ') || replay.source?.fileName || 'Replay'; }
  function replayFileUrl(replay) {
    const fileName = replay?.source?.fileName || (publicReplayIds.has(replay?.id) ? defaultReplayFile : '');
    return fileName ? `replays/${encodeURIComponent(fileName)}` : '';
  }
  function dateLabel(value) {
    if (!value) return 'Datum unbekannt';
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? value : new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
  }

  function spriteFor(name) {
    const normalized = String(name).toLowerCase().replace(/[^a-z0-9]/g, '');
    const pokemon = (window.POKEDEX_ENTRIES || []).find((entry) => {
      const candidates = [entry.name, entry.speciesId, entry.names?.de].filter(Boolean).map((value) => String(value).toLowerCase().replace(/[^a-z0-9]/g, ''));
      return candidates.includes(normalized);
    });
    return pokemon?.sprite || `https://play.pokemonshowdown.com/sprites/gen5/${normalized}.png`;
  }

  function renderList() {
    if (!list) return;
    const query = String(search?.value || '').trim().toLowerCase();
    const replays = allReplays().filter((replay) => JSON.stringify(replay).toLowerCase().includes(query));
    list.innerHTML = '';
    if (!replays.length) {
      list.innerHTML = '<div class="replay-empty"><strong>Replay nicht verfügbar</strong><span>Die Anzeige-Daten fehlen. Bitte den Default-Replay-Build ausführen.</span></div>';
      renderDetail(null); return;
    }
    if (!replays.some((replay) => replay.id === selectedId)) selectedId = replays[0].id;
    for (const replay of replays) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `replay-list-item${replay.id === selectedId ? ' is-active' : ''}`;
      button.innerHTML = `<strong>${esc(replayTitle(replay))}</strong><span>${esc(replay.meta?.format || 'Unbekanntes Format')} · ${esc(dateLabel(replay.meta?.date))}</span>`;
      button.addEventListener('click', () => { selectedId = replay.id; renderList(); });
      list.append(button);
    }
    renderDetail(replays.find((replay) => replay.id === selectedId));
  }

  function renderTeam(team, replay) {
    return `<section class="replay-team"><h4>${esc(team.player || team.side)}</h4><div class="replay-team-grid">${team.pokemon.map((name) => `
      <article class="replay-pokemon">
        <img src="${esc(spriteFor(name))}" alt="" loading="lazy" />
        <div><strong>${esc(name)}</strong><span>${esc((replay.movesByPokemon[name] || []).join(' · ') || 'Keine Attacke gezeigt')}</span><small>${esc((replay.itemsByPokemon[name] || []).join(', ') || 'Item unbekannt')}</small></div>
      </article>`).join('')}</div></section>`;
  }

  function renderDetail(replay) {
    if (!detail) return;
    if (!replay) { detail.innerHTML = '<div class="replay-empty replay-empty-detail"><strong>Battle-Archiv</strong><span>Wähle links ein Replay aus.</span></div>'; return; }
    const kos = replay.pokemonKnockouts || [];
    const replayUrl = replayFileUrl(replay);
    const turns = Number(replay.meta?.turns || 0);
    const analysisAvailable = replay.analysisAvailable !== false;
    detail.innerHTML = `
      <header class="replay-detail-header">
        <div><p class="eyebrow">${esc(replay.meta?.format || 'Showdown Battle')}</p><h3>${esc(replayTitle(replay))}</h3><p>${esc(dateLabel(replay.meta?.date))}${turns ? ` · ${turns} Runden` : ''}</p></div>
        ${replay.meta?.winner ? `<span class="replay-winner">Sieger: ${esc(replay.meta.winner)}</span>` : ''}
      </header>
      <div class="replay-primary-actions">
        ${replayUrl ? `<a class="details-primary replay-watch-button" href="${esc(replayUrl)}" target="_blank" rel="noopener noreferrer">Replay ansehen</a>` : '<span class="replay-file-missing">Replay-Datei nicht verfügbar</span>'}
      </div>
      ${analysisAvailable ? `<details class="replay-analysis">
        <summary>Auswertung &amp; Kampfdaten anzeigen</summary>
        <div class="replay-analysis-body">
          <div class="replay-teams">${replay.teams.map((team) => renderTeam(team, replay)).join('')}</div>
          <section class="replay-timeline"><h4>Kampfverlauf</h4>${kos.length ? kos.map((ko) => `<div class="replay-ko"><b>Runde ${Number(ko.turn || 0)}</b><span>${ko.killer ? `${esc(ko.killer)} besiegt ${esc(ko.victim)}${ko.move ? ` mit ${esc(ko.move)}` : ''}` : `${esc(ko.victim)} wurde besiegt`}</span></div>`).join('') : '<p>Keine K.-o.-Ereignisse erkannt.</p>'}</section>
        </div>
      </details>` : '<p class="replay-file-missing">Detaillierte Kampfdaten werden später ergänzt.</p>'}`;
  }

  search?.addEventListener('input', renderList);
  window.addEventListener('schwalboga:render-replays', renderList);
  window.addEventListener('schwalboga:auth-changed', renderList);
  renderList();
})();
