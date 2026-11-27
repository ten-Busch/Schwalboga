window.createMiloQuiz = function createMiloQuiz(getAdminId, generateQuestion, scoreStore) {
  const prizes = [50, 100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
  const checkpoints = new Set([500, 16000, 1000000]);
  const letters = ['A', 'B', 'C', 'D'];
  const format = new Intl.NumberFormat('de-DE');

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  const dialog = element('dialog', 'milo-dialog');
  dialog.lang = 'de';
  dialog.setAttribute('aria-labelledby', 'milo-title');
  dialog.innerHTML = `
    <header class="milo-header">
      <div><p class="milo-kicker">Games</p><h2 id="milo-title">Wer wird Milo-när?</h2></div>
      <div class="milo-display-controls">
        <button type="button" class="milo-fullscreen">Vollbild</button>
        <a class="milo-back" href="index.html#games">Zu Games</a>
      </div>
    </header>
    <div class="milo-layout">
      <div class="milo-stage"></div>
      <aside class="milo-ladder" aria-label="Gewinnleiter">
        <h3>Gewinnleiter</h3>
        <ol reversed></ol>
        <p><span aria-hidden="true">◆</span> Sicherheitsstufe</p>
      </aside>
    </div>
  `;
  const stage = dialog.querySelector('.milo-stage');
  const ladder = dialog.querySelector('ol');
  const fullscreenButton = dialog.querySelector('.milo-fullscreen');
  const fullscreenStatus = element('p', 'milo-fullscreen-status');
  fullscreenStatus.setAttribute('role', 'status');
  fullscreenStatus.hidden = true;
  dialog.querySelector('.milo-header').after(fullscreenStatus);
  let adminId;
  let scores = [];
  let scoreStatus = '';
  let scoreRequest = 0;
  let round;
  let answerHintHeld = false;
  let developerKeyHeld = false;
  let startDraft = { name: '', mode: 'safe', bonus: 'doppelteam' };
  let setupStep = 'name';
  const lifelines = {
    half: ['50:50', '5050', 'Entfernt zwei falsche Antworten.'],
    audience: ['Publikum', 'publikum', 'Abstimmung vor Ort mit live anpassbaren Stimmen. Auf derselben Frage erneut aufrufbar.'],
    telephone: ['Telefon', 'telefon', 'Wähle einen von drei Kontakten und lies seinen Rat.'],
    doppelteam: ['Doppelteam', 'doppelteam', 'Logge zwei Antworten ein. Eine richtige genügt. Nicht nach 50:50 nutzbar.'],
    genwunner: ['Genwunner', 'genwunner', 'Neue Frage derselben Kategorie mit ausschließlich Pokémon der ersten Generation. Verfügbar bei Pokémon-Namen in der Frage oder den Antworten, auch bei Schreibweisen und Pokémon-Übersetzungen.'],
    hilfe: ['Hilfe!', 'hilfe', 'Bitte eine Person aus dem Publikum um Rat.'],
    reroll: ['Reroll', 'reroll', 'Neue Frage, möglichst aus einer anderen Kategorie. Entfernte Antworten erscheinen wieder.'],
    zerschneider: ['Zerschneider', 'zerschneider', 'Überspringe eine Frage. Ihr Punktewert wird am Ende von deinem Ergebnis abgezogen.'],
    amnesie: ['Amnesie', 'amnesie', 'Neue Frage aus der nächstleichteren Stufe. Von 100 bis einschließlich 16.000 Punkten nutzbar. Der Gewinn der aktuellen Stufe bleibt gleich.'],
    seher: ['Seher', 'seher', 'Verrät den richtigen Antwortbuchstaben der Frage nach der nächsten. Nutzbar von 50 bis 125.000 Punkten; die Vorhersage reicht bis 500.000.'],
    metronom: ['Metronom', 'metronom', 'Gewährt beim Anklicken einen zufälligen zusätzlichen Standardjoker. Beim Telefonjoker wird einer der drei verfügbaren Kontakte zufällig angerufen. Die Standardjoker bleiben unberührt.'],
    blank: ['Kein Wahljoker', 'blank', ''],
  };
  const bonuses = ['doppelteam', 'genwunner', 'hilfe', 'reroll', 'zerschneider', 'amnesie', 'seher', 'metronom'];
  function icon(id, used = false, unavailable = false) {
    const image = element('img', 'milo-lifeline-icon');
    const file = unavailable && !used && id === 'genwunner' ? 'gewunnerna'
      : unavailable && !used && id === 'amnesie' ? 'amnesiena'
        : unavailable && !used && id === 'seher' ? 'seherna' : lifelines[id][1] + (used && id !== 'blank' ? 'used' : '');
    image.src = `assets/wwtbam/${file}.png`;
    image.alt = `${lifelines[id][0]}${used ? ' · benutzt' : ' · unbenutzt'}`;
    return image;
  }
  function historyIcons(history, mode = 'safe') {
    const strip = element('div', 'milo-lifeline-history');
    const slots = history?.length ? history : ['half', 'audience', 'telephone', 'blank'].map((id) => ({ id, used: false }));
    slots.forEach((slot, index) => {
      const id = index === 3 && mode !== 'risk' ? 'blank' : slot.id;
      if (lifelines[id]) strip.append(icon(id, slot.used));
    });
    return strip;
  }
  const usedCount = (row) => row.usedCount ?? row.lifelines?.filter((slot) => slot.used).length ?? 0;
  const rankScores = (a, b) => b.score - a.score || usedCount(a) - usedCount(b);
  function markUsed(id) { const slot = round.lifelines.find((item) => item.id === id); if (slot) slot.used = true; }
  function hasPokemonNames() {
    const texts = [round.question.prompt, ...round.question.options];
    return round.question.referencePokemon?.some((p) => [p.name, p.de].some((name) => name && texts.some((text) => text.includes(name))));
  }
  let jokerPopup = null;
  let phoneTimer;
  let metronomTimer;
  let estimateTimer;
  let estimateSourceIndex = 0;
  function estimateSources() {
    return [
      {id: 'audience', name: 'Publikum', values: round?.audienceEstimates},
      {id: 'achromas', name: 'Achromas', values: round?.achromasEstimates},
    ].filter((source) => source.values?.length);
  }
  function updateAnswerEstimates() {
    const sources = estimateSources();
    if (!sources.length) return;
    const source = sources[estimateSourceIndex % sources.length];
    stage.querySelectorAll('[data-milo-estimate]').forEach((badge) => {
      const value = source.values.find((item) => item.index === Number(badge.dataset.miloEstimate));
      if (!value) return;
      badge.className = `milo-answer-estimate milo-${source.id === 'audience' ? 'audience' : 'achromas'}-estimate`;
      badge.dataset.source = source.id;
      badge.replaceChildren(element('small', 'milo-estimate-source', source.name), element('span', '', `${value.percent}%`));
      badge.setAttribute('aria-label', `${source.name}: ${value.percent} Prozent`);
    });
  }
  const safetyPoints = () => (round?.mode ?? (setupStep === 'mode' ? startDraft.mode : 'safe')) === 'risk'
    ? new Set([500, 1000000]) : checkpoints;

  function closeJokerPopup() {
    clearTimeout(phoneTimer);
    clearTimeout(metronomTimer);
    if (jokerPopup?.open) jokerPopup.close();
    jokerPopup?.remove();
    jokerPopup = null;
  }

  function popup(title) {
    closeJokerPopup();
    const box = element('dialog', 'milo-joker-dialog');
    const heading = element('h3', '', title);
    heading.id = 'milo-joker-title';
    box.setAttribute('aria-labelledby', heading.id);
    box.append(heading);
    box.addEventListener('close', () => {
      box.remove();
      if (jokerPopup === box) jokerPopup = null;
    }, { once: true });
    dialog.append(box);
    jokerPopup = box;
    return box;
  }

  function updateDeveloperControls() {
    stage.querySelectorAll('[data-milo-dev]').forEach((control) => {
      control.hidden = !developerKeyHeld || !isAuthorized();
    });
    stage.querySelectorAll('[data-milo-joker]').forEach((control) => {
      control.disabled = jokerDisabled(control.dataset.miloJoker);
    });
  }

  function jokerDisabled(joker) {
    if (!round?.question || round.revealed) return true;
    if (joker === 'bonus') {
      if (round.mode !== 'risk') return true;
      if (round.bonus === 'doppelteam' && round.removed.length) return true;
      if (round.bonus === 'genwunner' && !hasPokemonNames()) return true;
      if (round.bonus === 'amnesie' && (round.index === 0 || prizes[round.index] > 16000)) return true;
      if (round.bonus === 'seher' && (prizes[round.index] > 125000 || !prizes[round.index + 2])) return true;
      if (round.bonus === 'metronom' && round.metronom?.questionId === round.questionId
        && (round.metronom.refunded || round.metronom.kind === 'audience'
          || (round.metronom.kind === 'telephone' && !round.metronom.telephone?.refundNext))) return false;
      return round.bonusUsed && !developerKeyHeld;
    }
    if (joker === 'half' && round.doubleActive) return true;
    if (developerKeyHeld) return false;
    if (joker === 'half') return round.halfUsed || round.removed.length > 0;
    const state = round[joker];
    return Boolean(state && (state.refundNext || state.questionId !== round.questionId));
  }

  function applyPrediction(question) {
    if (!question) return;
    const slot = round.futureSlots.get(round.index);
    if (slot === undefined || slot === question.correct) return;
    [question.options[slot], question.options[question.correct]] = [question.options[question.correct], question.options[slot]];
    question.correct = slot;
  }

  function clearDeveloperKey() {
    developerKeyHeld = false;
    updateDeveloperControls();
  }
  let celebrationTimer;
  const coinRain = element('div', 'milo-coin-rain');
  coinRain.setAttribute('aria-hidden', 'true');
  dialog.append(coinRain);

  function resetCelebration() {
    clearTimeout(celebrationTimer);
    coinRain.replaceChildren();
    dialog.classList.remove('milo-millionaire');
  }

  function celebrateMillion() {
    if (dialog.classList.contains('milo-millionaire')) return;
    dialog.classList.add('milo-millionaire');
    for (let i = 0; i < 80; i += 1) {
      const coin = element('span', '', ['🪙', '💶', '€'][i % 3]);
      coin.style.setProperty('--coin-left', `${Math.random() * 100}%`);
      coin.style.setProperty('--coin-delay', `${Math.random() * 4}s`);
      coin.style.setProperty('--coin-duration', `${3 + Math.random() * 3}s`);
      coin.style.setProperty('--coin-drift', `${Math.random() * 160 - 80}px`);
      coinRain.append(coin);
    }
    celebrationTimer = setTimeout(() => coinRain.replaceChildren(), 10500);
  }

  function updateAnswerHint() {
    const active = answerHintHeld && isAuthorized() && round?.question && !round.result && !round.revealed;
    stage.querySelectorAll('.milo-answer').forEach((answer, index) => {
      answer.classList.toggle('milo-answer-hint', Boolean(active && index === round.correct));
    });
  }

  function clearAnswerHint() {
    answerHintHeld = false;
    updateAnswerHint();
  }

  function isAuthorized() {
    return Boolean(adminId && adminId === getAdminId() && dialog.open);
  }

  function close() {
    clearInterval(estimateTimer);
    closeJokerPopup();
    scoreRequest += 1;
    clearDeveloperKey();
    resetCelebration();
    clearAnswerHint();
    adminId = null;
    round = null;
    setupStep = 'name';
    scores = [];
    if (dialog.open) dialog.close();
    dialog.remove();
  }

  function button(label, onClick, className = '', disabled = false) {
    const control = element('button', className, label);
    control.type = 'button';
    control.disabled = disabled;
    control.addEventListener('click', () => {
      if (isAuthorized()) onClick?.();
      else close();
    });
    return control;
  }

  function scoreBoard() {
    const board = element('section', 'milo-board');
    board.append(element('h3', '', 'Bestenliste'));
    const manage = button('Dev · Bestenliste bearbeiten', openScoreEditor);
    manage.dataset.miloDev = '';
    board.append(manage);
    if (scoreStatus) board.append(element('p', 'milo-muted', scoreStatus));
    if (scoreStatus.includes('fehlgeschlagen')) {
      board.append(button('Speicherung erneut versuchen', () => refreshScores()));
    }
    if (!scores.length) {
      board.append(element('p', 'milo-muted', 'Bisher wurde keine Runde beendet.'));
      return board;
    }
    const list = element('ol', '');
    scores.forEach(({ name, score, mode, lifelines: history }) => {
      const row = element('li', '');
      row.append(element('span', '', `${name} · ${mode === 'risk' ? 'Risk' : 'Safe'}`), element('strong', '', format.format(score)));
      row.append(historyIcons(history, mode));
      list.append(row);
    });
    board.append(list);
    return board;
  }

  async function openScoreEditor() {
    const owner = adminId;
    const box = popup('Bestenliste bearbeiten');
    box.classList.add('milo-score-editor');
    const status = element('p', 'milo-muted', 'Einträge werden geladen …');
    status.setAttribute('role', 'status');
    const records = element('div', 'milo-score-records');
    box.append(status, records, button('Schließen', () => box.close()));
    box.addEventListener('close', () => {
      if (owner === adminId && isAuthorized()) void refreshScores();
    }, { once: true });
    box.showModal();
    const active = () => box.open && owner === adminId && isAuthorized();
    try {
      const entries = await scoreStore.list(owner);
      if (!active()) return;
      status.textContent = entries.length ? `${entries.length} Einträge, einschließlich Testrunden.` : 'Keine Einträge vorhanden.';
      for (const entry of entries) {
        const form = element('form', 'milo-score-form');
        const field = (caption, control) => {
          const label = element('label', '');
          control.setAttribute('aria-label', caption);
          label.append(element('span', '', caption), control);
          form.append(label);
        };
        const name = element('input', '');
        name.value = entry.player_name;
        name.required = true;
        name.maxLength = 40;
        field('Spielername', name);
        const score = element('input', '');
        score.type = 'number'; score.min = '0'; score.max = '1000000'; score.step = '1'; score.required = true;
        score.value = String(entry.score);
        field('Punkte', score);
        const mode = element('select', '');
        for (const [value, text] of [['safe', 'Safe Mode'], ['risk', 'Risk Mode']]) {
          const option = element('option', '', text);
          option.value = value;
          option.selected = value === entry.run_mode;
          mode.append(option);
        }
        field('Modus', mode);
        const test = element('input', '');
        test.type = 'checkbox';
        test.checked = entry.is_test;
        field('Testrunde (ausgeblendet)', test);
        const feedback = element('p', 'milo-muted');
        feedback.setAttribute('role', 'status');
        const save = element('button', 'milo-primary', 'Speichern');
        save.type = 'submit';
        const remove = button('Entfernen', () => {
          confirmation.hidden = false;
          remove.hidden = true;
        });
        const confirmation = element('div', 'milo-call-options');
        confirmation.hidden = true;
        confirmation.append(element('span', '', `„${entry.player_name}“ wirklich entfernen?`),
          button('Ja, entfernen', () => mutate(() => scoreStore.remove(entry.id), true)),
          button('Abbrechen', () => { confirmation.hidden = true; remove.hidden = false; }));
        async function mutate(operation, deleting = false) {
          if (!active()) return;
          const controls = [...form.querySelectorAll('input,select,button')];
          controls.forEach((control) => { control.disabled = true; });
          feedback.textContent = 'Wird gespeichert …';
          try {
            await operation();
            if (!active()) return;
            if (deleting) form.remove();
            else feedback.textContent = 'Gespeichert.';
          } catch (error) {
            if (!active()) return;
            feedback.textContent = 'Speichern fehlgeschlagen. Bitte Supabase-Regeln prüfen und erneut versuchen.';
            console.error(error);
          } finally {
            controls.forEach((control) => { control.disabled = false; });
          }
        }
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          if (!name.value.trim()) {
            name.setCustomValidity('Bitte gib einen Namen ein.');
            name.reportValidity();
            return;
          }
          void mutate(() => scoreStore.update(entry.id, {
            player_name: name.value, score: score.value, run_mode: mode.value, is_test: test.checked, lifelines: entry.lifelines,
          }));
        });
        name.addEventListener('input', () => name.setCustomValidity(''));
        form.append(element('p', 'milo-muted', new Date(entry.created_at).toLocaleString('de-DE')),
          historyIcons(entry.lifelines, entry.run_mode), save, remove, confirmation, feedback);
        records.append(form);
      }
    } catch (error) {
      if (!active()) return;
      status.textContent = 'Laden fehlgeschlagen. Bitte die aktualisierte Highscore-SQL in Supabase ausführen.';
      console.error(error);
    }
  }

  async function refreshScores(saveResult = null) {
    const owner = adminId;
    const request = ++scoreRequest;
    scoreStatus = saveResult ? 'Ergebnis wird gespeichert …' : 'Bestenliste wird geladen …';
    render();
    try {
      const loaded = saveResult
        ? await scoreStore.save(owner, saveResult.player, saveResult.score, saveResult.mode, saveResult.assisted, saveResult.lifelines)
        : await scoreStore.load(owner);
      if (request !== scoreRequest || owner !== adminId || !isAuthorized()) return;
      scores = loaded;
      scoreStatus = '';
    } catch (error) {
      if (request !== scoreRequest || owner !== adminId || !isAuthorized()) return;
      scoreStatus = error.message === 'Ergebnis konnte weder lokal noch online gespeichert werden.'
        ? 'Speicherung fehlgeschlagen. Dieses Ergebnis konnte weder lokal noch online gespeichert werden.'
        : 'Online-Synchronisierung fehlgeschlagen. Lokal gespeicherte Ergebnisse werden beim nächsten Versuch übertragen.';
      if (!scores.length) {
        scores = await scoreStore.localScores(owner);
        if (request !== scoreRequest || owner !== adminId || !isAuthorized()) return;
      }
      console.error('Bestenliste konnte nicht synchronisiert werden.', error);
    }
    if (!round || round.result) render();
  }

  function makeStep() {
    closeJokerPopup();
    round.questionId = (round.questionId ?? 0) + 1;
    refundMetronomPhone();
    round.achromasEstimates = null;
    round.audienceEstimates = null;
    estimateSourceIndex = 0;
    if (round.telephone?.refundNext) round.telephone = null;
    const prize = prizes[round.index];
    round.question = generateQuestion(prize, round.seen);
    applyPrediction(round.question);
    round.correct = round.question?.correct;
    round.removed = [];
    round.selected = null;
    round.selectedAnswers = [];
    round.doubleActive = false;
    round.revealed = false;
    round.packOpened = false;
    round.packStarted = false;
  }

  function replaceDeveloperQuestion(replacement, assisted = true) {
    clearAnswerHint();
    closeJokerPopup();
    if (assisted) round.assisted = true;
    round.questionId += 1;
    refundMetronomPhone();
    if (round.telephone?.refundNext) round.telephone = null;
    round.achromasEstimates = null;
    round.audienceEstimates = null;
    estimateSourceIndex = 0;
    round.question = replacement;
    applyPrediction(round.question);
    round.correct = round.question.correct;
    round.selected = null;
    round.selectedAnswers = [];
    round.doubleActive = false;
    round.revealed = false;
    round.removed = [];
    round.packOpened = false;
    round.packStarted = false;
    render(true);
  }

  function openBooster() {
    if (!isAuthorized() || !round?.question?.team) return;
    const currentRound = round;
    const currentQuestion = round.question;
    const box = popup('Die Millionenfrage');
    const preview = window.createMiloBooster(box, currentQuestion.team, () => {
      if (!isAuthorized() || round !== currentRound || round.question !== currentQuestion) return;
      round.packOpened = true;
      box.close();
      render(true);
    });
    box.addEventListener('close', () => {
      if (isAuthorized() && round === currentRound && round.question === currentQuestion && !round.packOpened) render(true);
    }, { once: true });
    box.showModal();
    if (round.packOpened) preview.showAll();
  }

  function openQuestionJump() {
    const box = popup('Zu einer Frage springen');
    const label = element('label', '', 'Frage und Gewinnstufe');
    const select = element('select', '');
    select.setAttribute('aria-label', 'Frage und Gewinnstufe');
    prizes.forEach((prize, index) => {
      const option = element('option', '', `Frage ${index + 1} · ${format.format(prize)} Punkte`);
      option.value = String(index);
      option.selected = index === round.index;
      select.append(option);
    });
    label.append(select);
    const feedback = element('p', 'milo-muted');
    feedback.setAttribute('role', 'status');
    box.append(label, element('p', '', 'Der Sprung setzt die Joker zurück und passt Kontostand und Sicherheitsstufe an. Die Runde zählt als Entwicklerlauf.'),
      feedback, button('Zur Frage springen', () => {
        const target = Number(select.value);
        const replacement = generateQuestion(prizes[target], round.seen);
        if (!replacement) {
          feedback.textContent = 'Für diese Stufe ist gerade keine Frage verfügbar. Bitte Tierdaten prüfen oder erneut versuchen.';
          return;
        }
        round.index = target;
        round.earned = target ? prizes[target - 1] : 0;
        round.safe = [...safetyPoints()].filter((value) => value <= round.earned).reduce((maximum, value) => Math.max(maximum, value), 0);
        round.previousAnswer = null;
        round.halfUsed = false;
        round.audience = null;
        round.telephone = null;
        round.bonusUsed = false;
        round.metronom = null;
        round.penalty = 0;
        round.lifelines.forEach((slot) => { slot.used = false; });
        resetCelebration();
        replaceDeveloperQuestion(replacement);
      }, 'milo-primary'), button('Abbrechen', () => box.close()));
    box.showModal();
  }

  function renderStart() {
    const welcome = element('div', 'milo-welcome');
    const mascot = element('img', 'milo-mascot');
    mascot.src = 'https://play.pokemonshowdown.com/sprites/gen5/milotic.png';
    mascot.alt = '';
    mascot.addEventListener('error', () => mascot.remove());
    welcome.append(mascot, element('h3', '', 'Bereit für die Million?'),
      element('p', 'milo-muted', 'Die Fragen werden für jede Runde neu erzeugt. Für Teamkosten werden die aktuellen Tiers geladen.'));
    const form = element('form', 'milo-name-form');
    const label = element('label', '', 'Name für die Bestenliste');
    const name = element('input', '');
    name.name = 'player';
    name.required = true;
    name.maxLength = 40;
    name.autocomplete = 'off';
    name.value = startDraft.name;
    name.addEventListener('input', () => { startDraft.name = name.value; });
    name.addEventListener('input', () => name.setCustomValidity(''));
    const start = element('button', 'milo-primary', 'Weiter');
    start.type = 'submit';
    label.append(name);
    form.append(label, start);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!isAuthorized()) return close();
      if (!name.value.trim()) {
        name.setCustomValidity('Bitte gib einen Namen ein.');
        name.reportValidity();
        return;
      }
      startDraft.name = name.value.trim();
      setupStep = 'mode';
      render(true);
    });
    welcome.append(form);
    const cards = button('Dev · Kartenwerkstatt', () => {
      const preview = window.MiloCards.preview();
      dialog.append(preview);
      preview.showModal();
    });
    cards.dataset.miloDev = '';
    welcome.append(cards);
    const boosterStatus = element('p', 'milo-muted');
    boosterStatus.setAttribute('role', 'status');
    boosterStatus.dataset.miloDev = '';
    const booster = button('Dev · Booster testen', () => {
      const question = generateQuestion(1000000, new Set());
      if (!question?.team) {
        boosterStatus.textContent = 'Kein legales Fünfer-Team verfügbar. Bitte die aktuellen Tierdaten laden lassen und erneut versuchen.';
        return;
      }
      boosterStatus.textContent = '';
      const box = popup('Booster-Vorschau');
      window.createMiloBooster(box, question.team, () => box.close());
      box.showModal();
    });
    booster.dataset.miloDev = '';
    welcome.append(booster, boosterStatus);
    stage.append(welcome, scoreBoard());
  }

  function renderMode() {
    const panel = element('section', 'milo-welcome milo-mode-screen');
    panel.append(element('h3', 'milo-focus', `${startDraft.name}, wähle deinen Spielmodus`));
    const modes = element('div', 'milo-mode-choice');
    for (const [id, title, description] of [
      ['safe', 'Safe Mode', 'Drei Joker. Sicherheitsstufen bei 500 und 16.000 Punkten.'],
      ['risk', 'Risiko', 'Vier Joker. Keine Sicherheitsstufe bei 16.000 Punkten; 500 bleiben sicher. Wähle einen zusätzlichen Joker.'],
    ]) {
      const control = button(`${title} · ${description}`, () => { startDraft.mode = id; render(true); });
      control.setAttribute('aria-pressed', String(startDraft.mode === id));
      modes.append(control);
    }
    panel.append(modes, element('h4', '', 'Deine Joker'));
    panel.append(historyIcons(['half', 'audience', 'telephone', startDraft.mode === 'risk' ? startDraft.bonus : 'blank'].map((id) => ({id, used:false})), startDraft.mode));
    for (const id of ['half', 'audience', 'telephone']) panel.append(element('p', '', `${lifelines[id][0]}: ${lifelines[id][2]}`));
    panel.append(element('h4', '', 'Wahljoker für Risiko'));
    const choices = element('div', 'milo-bonus-choices');
    for (const id of bonuses) {
      const control = button('', () => { startDraft.bonus = id; render(true); }, 'milo-bonus-choice', startDraft.mode !== 'risk');
      control.append(icon(id), element('strong', '', lifelines[id][0]), element('span', '', lifelines[id][2]));
      control.setAttribute('aria-label', lifelines[id][0]);
      control.setAttribute('aria-pressed', String(startDraft.mode === 'risk' && startDraft.bonus === id));
      choices.append(control);
    }
    panel.append(choices, button('Zurück', () => { setupStep = 'name'; render(true); }), button('Spiel starten', () => {
      round = { player: startDraft.name, mode: startDraft.mode, bonus: startDraft.bonus, bonusUsed: false,
        penalty: 0, index: 0, earned: 0, safe: 0, seen: new Set(), halfUsed: false,
        audience: null, telephone: null, assisted: false, futureSlots: new Map(),
        lifelines: ['half', 'audience', 'telephone', startDraft.mode === 'risk' ? startDraft.bonus : 'blank'].map((id) => ({id, used:false})) };
      makeStep(); render(true);
    }, 'milo-primary'));
    stage.append(panel);
  }

  function useBonus() {
    if (jokerDisabled('bonus')) return;
    if (developerKeyHeld) round.assisted = true;
    const id = round.bonus;
    if (id === 'metronom') {
      const fresh = !round.metronom || round.metronom.refunded || round.metronom.questionId !== round.questionId || developerKeyHeld;
      if (fresh) {
        const context = phoneContext();
        const notCalled = (contact) => !calledPeople().has(contact.name);
        let contacts = (window.selectMiloPhoneContacts?.(context) ?? []).filter(notCalled);
        if (!contacts.length) contacts = (window.createMiloPhoneContacts?.(context) ?? []).filter(notCalled);
        const eligible = [];
        if (!round.removed.length) eligible.push('half');
        if (round.audience?.questionId !== round.questionId && round.metronom?.audience?.questionId !== round.questionId) eligible.push('audience');
        if (contacts.length) eligible.push('telephone');
        if (!eligible.length) return;
        round.metronom = {questionId: round.questionId, eligible, contacts, kind: eligible[Math.floor(Math.random() * eligible.length)]};
      }
      round.metronom.refunded = false;
      round.bonusUsed = true; markUsed(id);
      if (fresh) animateMetronom();
      else activateMetronom();
      return;
    }
    if (id === 'seher') {
      const target = round.index + 2;
      const slot = round.futureSlots.get(target) ?? Math.floor(Math.random() * 4);
      round.futureSlots.set(target, slot);
      round.bonusUsed = true; markUsed(id); render();
      const box = popup('Seher');
      const dialogue = element('div', 'milo-phone-dialogue');
      const portrait = element('div', 'milo-phone-portrait milo-seher-portrait');
      const sprite = element('img', '');
      sprite.src = window.POKEDEX_ENTRIES?.find((p) => p.name === 'Grumpig')?.sprite
        ?? 'https://play.pokemonshowdown.com/sprites/gen5/grumpig.png';
      sprite.alt = 'Groink';
      portrait.append(sprite);
      const speech = element('section', 'milo-phone milo-xatu');
      speech.append(element('p', '', `Ich sehe... die Antwort ist ${letters[slot]}. Aber nicht jetzt... in der Frage nach der nächsten...`));
      dialogue.append(portrait, speech);
      box.append(dialogue, element('p', 'milo-muted', `Vorhersage für die ${format.format(prizes[target])}-Punkte-Frage.`), button('Zurück zur Frage', () => box.close()));
      box.showModal(); return;
    }
    if (['genwunner', 'reroll', 'amnesie'].includes(id)) {
      const value = round.question.prize ?? prizes[round.index];
      let replacement;
      if (id === 'genwunner') replacement = generateQuestion.genOne?.(value, round.seen, round.question.category);
      if (id === 'reroll') replacement = generateQuestion(value, round.seen, null, round.question.category)
        ?? generateQuestion(value, round.seen);
      if (id === 'amnesie') {
        const lower = prizes[Math.max(0, prizes.indexOf(value) - 1)];
        const later = new Set(prizes.filter((prize) => prize > lower).flatMap((prize) => generateQuestion.availableCategories?.(prize) ?? []));
        const exclusive = (generateQuestion.availableCategories?.(lower) ?? []).filter((category) => !later.has(category));
        if (exclusive.length && Math.random() < 0.8) {
          replacement = generateQuestion(lower, round.seen, exclusive[Math.floor(Math.random() * exclusive.length)]);
        }
        replacement ??= generateQuestion(lower, round.seen);
      }
      if (!replacement) {
        const box = popup('Keine passende Frage verfügbar');
        box.append(element('p', '', 'Bitte erneut versuchen. Dein Joker wurde nicht verbraucht.'), button('Schließen', () => box.close()));
        box.showModal(); return;
      }
      round.bonusUsed = true; markUsed(id);
      if (id === 'genwunner') replacement.genwunnerStyle = true;
      replaceDeveloperQuestion(replacement, false);
      return;
    }
    round.bonusUsed = true; markUsed(id);
    if (id === 'doppelteam') {
      round.doubleActive = true; round.selectedAnswers = round.selected === null ? [] : [round.selected]; render(true);
    } else if (id === 'hilfe') {
      render();
      const box = popup('Hilfe!');
      box.append(element('p', '', 'Bitte eine Person aus dem Publikum vor Ort, dich bei dieser Frage zu beraten.'), button('Zurück zur Frage', () => box.close()));
      box.showModal();
    } else if (id === 'zerschneider') {
      round.penalty += prizes[round.index];
      round.earned = prizes[round.index];
      if (safetyPoints().has(round.earned)) round.safe = round.earned;
      round.previousAnswer = round.question.options[round.correct];
      if (round.index === prizes.length - 1) return finish(round.earned, 'Runde beendet');
      round.index += 1; makeStep(); render(true);
    }
  }

  function finish(score, title) {
    if (round.result) return;
    score = Math.max(0, score - round.penalty);
    round.result = { score, title };
    if (!round.assisted) scores = [...scores, { name: round.player, score, mode: round.mode, lifelines: round.lifelines }].sort(rankScores).slice(0, 10);
    render(true);
    void refreshScores({ player: round.player, score, mode: round.mode, assisted: round.assisted, lifelines: round.lifelines });
  }

  function refundMetronomPhone() {
    if (round.metronom?.telephone?.refundNext || round.metronom?.refunded) round.metronom = {questionId: round.questionId, refunded: true};
  }

  function activateMetronom() {
    if (round.metronom.kind === 'audience') return audienceJoker(true);
    if (round.metronom.kind === 'telephone') return telephoneJoker(true);
    const alreadyActive = round.removed.length > 0;
    if (!alreadyActive) useHalfJoker(true);
    render();
    const box = popup('Metronom · 50:50');
    box.append(element('p', '', alreadyActive ? '50:50 ist bei dieser Frage bereits aktiv. Es können keine weiteren Antworten gestrichen werden.'
      : 'Metronom hat zwei falsche Antworten gestrichen, ohne einen deiner Standardjoker zu verbrauchen.'), button('Zurück zur Frage', () => box.close()));
    box.showModal();
  }

  function animateMetronom() {
    render();
    const owner = round, selection = round.metronom, questionId = round.questionId;
    const kinds = ['half', 'audience', 'telephone'];
    const target = kinds.indexOf(selection.kind);
    const box = popup('Metronom');
    box.classList.add('milo-metronom-dialog');
    box.addEventListener('cancel', (event) => event.preventDefault());
    const reel = element('div', 'milo-metronom-reel');
    const options = kinds.map((id) => {
      const option = element('div', 'milo-metronom-option');
      option.append(icon(id), element('strong', '', lifelines[id][0]));
      reel.append(option);
      return option;
    });
    const pointer = element('div', 'milo-metronom-pointer', '☝️');
    pointer.setAttribute('aria-hidden', 'true');
    reel.append(pointer);
    const status = element('p', 'milo-muted', 'Metronom wählt einen Joker …');
    status.setAttribute('role', 'status');
    box.append(reel, status); box.showModal();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const totalSteps = reduced ? 0 : 9 + target;
    let step = 0;
    const active = () => box.open && isAuthorized() && round === owner && round.questionId === questionId && round.metronom === selection;
    function tick() {
      if (!active()) return;
      const done = step >= totalSteps;
      const eligible = selection.eligible ?? kinds;
      const slot = done ? target : kinds.indexOf(eligible[step % eligible.length]);
      options.forEach((option, index) => {
        option.classList.toggle('is-active', index === slot);
        option.classList.toggle('is-selected', done && index === slot);
      });
      if (done) {
        pointer.classList.add('is-stopped');
        status.textContent = `${lifelines[selection.kind][0]} wird eingesetzt!`;
        metronomTimer = setTimeout(() => {
          if (!active()) return;
          closeJokerPopup(); activateMetronom();
        }, reduced ? 120 : 500);
      } else {
        step += 1;
        metronomTimer = setTimeout(tick, 65 + step * 11);
      }
    }
    tick();
  }

  function audienceJoker(extra = false) {
    if (!extra && jokerDisabled('audience')) return;
    if (!extra) markUsed('audience');
    if (developerKeyHeld) {
      round.assisted = true;
      if (!extra && round.audience?.questionId !== round.questionId) round.audience = null;
    }
    const state = extra ? (round.metronom.audience ??= {questionId: round.questionId, votes: [0, 0, 0, 0]})
      : (round.audience ??= { questionId: round.questionId, votes: [0, 0, 0, 0] });
    const box = popup(extra ? 'Metronom · Publikumsjoker' : 'Publikumsjoker');
    box.append(element('p', '', 'Bitte stimmt vor Ort ab. Tragt die Stimmen für A, B, C und D mit + und − ein.'));
    box.append(element('p', 'milo-joker-question', round.question.prompt));
    const graph = element('div', 'milo-votes');
    const rows = [];
    const totalLabel = element('p', 'milo-muted');
    totalLabel.setAttribute('aria-live', 'polite');
    function update() {
      const total = state.votes.reduce((sum, count) => sum + count, 0);
      const percentages = state.votes.map((count) => total ? count / total * 100 : 0);
      const rounded = percentages.map(Math.floor);
      const order = percentages.map((value, index) => ({index, fraction: value - rounded[index]})).sort((a, b) => b.fraction - a.fraction || a.index - b.index);
      const remainder = total ? 100 - rounded.reduce((sum, value) => sum + value, 0) : 0;
      for (let i = 0; i < remainder; i++) rounded[order[i].index] += 1;
      round.audienceEstimates = rounded.map((percent, index) => ({index, percent}));
      updateAnswerEstimates();
      rows.forEach(({ bar, label, minus }, index) => {
        const count = state.votes[index];
        const percent = rounded[index];
        bar.style.width = `${percent}%`;
        bar.parentElement.setAttribute('aria-valuenow', String(count));
        bar.parentElement.setAttribute('aria-valuemax', String(Math.max(1, total)));
        label.textContent = `${count} · ${Math.round(percent)}%`;
        minus.disabled = count === 0;
      });
      totalLabel.textContent = `${total} Stimmen insgesamt`;
    }
    round.question.options.forEach((answer, index) => {
      const row = element('div', 'milo-vote-row');
      const label = element('span', '');
      const track = element('div', 'milo-vote-track');
      track.setAttribute('role', 'progressbar');
      track.setAttribute('aria-label', `Stimmen für ${letters[index]}`);
      track.setAttribute('aria-valuemin', '0');
      const bar = element('div', 'milo-vote-bar');
      track.append(bar);
      const minus = button('−', () => { state.votes[index] = Math.max(0, state.votes[index] - 1); update(); });
      const plus = button('+', () => { state.votes[index] += 1; update(); }, '', round.removed.includes(index));
      minus.setAttribute('aria-label', `Stimme für ${letters[index]} entfernen`);
      plus.setAttribute('aria-label', `Stimme für ${letters[index]} hinzufügen`);
      row.append(element('strong', '', `${letters[index]} · ${answer}`), track, label, minus, plus);
      graph.append(row);
      rows.push({ bar, label, minus });
    });
    box.append(graph, totalLabel, button('Zurück zur Frage', () => { box.close(); render(true); }));
    update();
    render();
    // The popup is a sibling of the stage, so updating the joker button preserves it.
    box.showModal();
  }

  function calledPeople() {
    if (round.phoneHistory?.questionId !== round.questionId) round.phoneHistory = {questionId: round.questionId, names: new Set()};
    return round.phoneHistory.names;
  }

  function phoneContext() {
    return {
      question: round.question, prize: round.question.prize ?? prizes[round.index], player: round.player,
      previousAnswer: round.previousAnswer,
      futureAnswerSlot: round.futureSlots.get(round.index + 2),
    };
  }

  function telephoneJoker(extra = false) {
    if (!extra && jokerDisabled('telephone')) return;
    if (!extra) markUsed('telephone');
    const context = phoneContext();
    const developerSelection = developerKeyHeld && !extra;
    if (developerSelection) {
      round.assisted = true;
      round.telephone = null;
    }
    const makeCall = () => ({
      questionId: round.questionId,
      contacts: extra ? round.metronom.contacts : window.selectMiloPhoneContacts(context),
      chosen: null, line: 0, revealedWords: 1,
    });
    const call = extra ? (round.metronom.telephone ??= makeCall()) : (round.telephone ??= makeCall());
    if (extra && call.chosen === null) call.chosen = Math.floor(Math.random() * call.contacts.length);
    const callActive = () => isAuthorized() && (extra ? round?.metronom?.telephone : round?.telephone) === call && round?.questionId === call.questionId;
    function portrait(contact, speaker) {
      const data = window.getMiloPhonePortrait?.(contact, speaker);
      if (!data) return null;
      const frame = element('div', 'milo-phone-portrait');
      frame.setAttribute('aria-hidden', 'true');
      const image = element('img', '');
      image.src = data.src;
      image.alt = '';
      image.addEventListener('error', () => frame.remove(), { once: true });
      frame.append(image);
      if (data.metallic) {
        frame.classList.add('milo-phone-portrait-metallic');
        const sheen = element('span', 'milo-phone-portrait-sheen');
        sheen.style.maskImage = `url("${data.src}")`;
        sheen.style.webkitMaskImage = `url("${data.src}")`;
        frame.append(sheen);
      }
      return frame;
    }
    const availableContacts = developerSelection && call.chosen === null
      ? window.createMiloPhoneContacts(context) : call.contacts;
    const box = popup('Telefonjoker');
    box.classList.add('milo-phone-dialog');
    box.addEventListener('close', () => {
      clearTimeout(phoneTimer);
      if (callActive() && call.spokenEstimates) {
        round.achromasEstimates = call.spokenEstimates;
        render();
      }
    }, { once: true });
    function draw() {
      clearTimeout(phoneTimer);
      box.replaceChildren(element('h3', '', call.chosen === null ? 'Wen anrufen?' : 'Telefonjoker'));
      box.querySelector('h3').id = 'milo-joker-title';
      if (call.chosen === null) {
        box.append(element('p', '', developerSelection
          ? 'Entwicklerauswahl · alle für diese Frage verfügbaren Kontakte.'
          : 'Wähle einen von drei Kontakten.'));
        const options = element('div', 'milo-call-options milo-contact-options');
        availableContacts.forEach((contact) => {
          const choice = button('', () => {
          const existing = call.contacts.indexOf(contact);
          if (existing === -1) call.contacts.push(contact);
          call.chosen = existing === -1 ? call.contacts.length - 1 : existing;
          call.line = 0;
          call.revealedWords = 1;
          draw();
          }, 'milo-contact-choice');
          const image = portrait(contact);
          if (image) choice.append(image);
          choice.append(element('span', '', contact.name));
          options.append(choice);
        });
        box.append(options);
      } else {
        const contact = call.contacts[call.chosen];
        calledPeople().add(contact.name);
        const visibleWrong = round.question.options.filter((_, index) => index !== round.correct && !round.removed.includes(index));
        const signature = round.removed.join(',');
        if (!call.lines || call.signature !== signature) {
          for (let i = visibleWrong.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [visibleWrong[i], visibleWrong[j]] = [visibleWrong[j], visibleWrong[i]];
          }
          const introduction = {
            speaker: 'Günther Jauchzelot',
            text: `Okay, ${contact.name} am Apparat? ${round.player} ist bei der ${format.format(prizes[round.index])}€ Frage! Ihre Zeit läuft ab jetzt.`,
          };
          call.lines = [
            ...(contact.skipIntroduction ? [] : [introduction]),
            ...contact.dialogue({ wrong: visibleWrong }),
          ];
          call.signature = signature;
          call.line = Math.min(call.line, call.lines.length - 1);
        }
        const current = call.lines[call.line];
        if (current.predictionSlot !== undefined) {
          const fixedSlot = round.futureSlots.get(round.index + 2);
          if (fixedSlot !== undefined && fixedSlot !== current.predictionSlot) {
            current.predictionSlot = fixedSlot;
            current.text = current.text.replace(/Antwort ist [ABCD]/, `Antwort ist ${letters[fixedSlot]}`);
          }
          round.futureSlots.set(round.index + 2, current.predictionSlot);
        }
        if (current.estimates) call.spokenEstimates = current.estimates;
        if (current.refund) call.refundNext = true;
        const speech = element('section', 'milo-phone');
        if (current.theme === 'matrix') speech.classList.add('milo-matrix');
        if (current.theme === 'xatu') speech.classList.add('milo-xatu');
        if (current.theme === 'roto') speech.classList.add('milo-roto');
        const text = element('p', '');
        speech.append(element('h3', 'milo-speaker', current.speaker), text);
        const dialogue = element('div', 'milo-phone-dialogue');
        const speakerPortrait = portrait(contact, current.speaker);
        if (speakerPortrait) dialogue.append(speakerPortrait);
        dialogue.append(speech);
        box.append(dialogue);
        const navigation = element('div', 'milo-call-options');
        const back = button('◂ Zurück', () => {
          call.line -= 1;
          call.revealedWords = 1;
          draw();
        }, '', call.line === 0);
        const next = button('Weiter ▸', () => {
          call.line += 1;
          call.revealedWords = 1;
          draw();
        }, 'milo-primary', call.line === call.lines.length - 1);
        navigation.append(back, next);
        box.append(navigation);
        if (current.choices) {
          const choices = element('div', 'milo-call-options');
          const choiceKey = `${contact.id}:${call.line}`;
          const locked = current.singleChoice ? call.lockedChoices?.[choiceKey] : null;
          current.choices.forEach((choice) => choices.append(button(choice.label, () => {
            if (choice.disabled || (locked && locked !== choice.label)) return;
            if (current.singleChoice) {
              call.lockedChoices ??= {};
              call.lockedChoices[choiceKey] = choice.label;
            }
            call.lines.splice(call.line + 1, current.choiceResponseInserted ? 1 : 0, choice.response);
            current.choiceResponseInserted = true;
            call.line += 1;
            draw();
          }, '', Boolean(choice.disabled || (locked && locked !== choice.label)))));
          speech.append(choices);
          next.disabled = !current.choiceResponseInserted;
        }
        if (current.stream === 'kricketune') {
          text.classList.add('milo-kricketune-text');
          current.streamState ??= { elapsed: 0, count: 5 };
          const state = current.streamState;
          function stream() {
            text.textContent = `Delele wh${'o'.repeat(state.count)}${state.elapsed >= 10000 ? 'p' : ''}`;
            text.scrollTop = text.scrollHeight;
            next.disabled = call.line === call.lines.length - 1 || state.elapsed < 10000;
            if (state.elapsed < 10000) phoneTimer = setTimeout(() => {
              if (!box.open || !callActive()) return;
              state.elapsed = Math.min(10000, state.elapsed + 100);
              state.count += 1 + Math.ceil((state.elapsed / 1000) ** 2);
              stream();
            }, 100);
          }
          stream();
        } else if (current.interval) {
          const words = current.text.split(' ');
          function reveal() {
            text.textContent = words.slice(0, call.revealedWords).join(' ');
            next.disabled = call.line === call.lines.length - 1 || call.revealedWords < words.length;
            if (call.revealedWords < words.length) {
              phoneTimer = setTimeout(() => {
                if (!box.open || !callActive()) return;
                call.revealedWords += 1;
                reveal();
              }, current.interval);
            }
          }
          reveal();
        } else text.textContent = current.text;
      }
      box.append(button('Zurück zur Frage', () => { box.close(); render(true); }));
    }
    render();
    box.showModal();
    draw();
  }

  function useHalfJoker(extra = false) {
    if (!extra && jokerDisabled('half')) return;
    if (developerKeyHeld) round.assisted = true;
    if (!extra) { round.halfUsed = true; markUsed('half'); }
    const wrong = letters.map((_, index) => index).filter((index) => index !== round.correct);
    wrong.splice(Math.floor(Math.random() * wrong.length), 1);
    round.removed = wrong;
    if (wrong.includes(round.selected)) { round.selected = null; round.selectedAnswers = []; }
    render(true);
  }

  function renderRound() {
    const status = element('div', 'milo-round-status');
    status.append(element('strong', '', round.player),
      element('span', '', round.mode === 'risk' ? 'Risk Mode' : 'Safe Mode'),
      element('span', '', `Kontostand ${format.format(round.earned)}`),
      element('span', '', `Sicher ${format.format(round.safe)}`));
    stage.append(status);
    if (round.penalty) stage.append(element('p', 'milo-muted', `Zerschneider-Abzug am Ende: ${format.format(round.penalty)} Punkte.`));
    const jump = button('Dev · Zu Frage springen', openQuestionJump);
    jump.dataset.miloDev = '';
    stage.append(jump);
    if (!round.question) {
      stage.append(element('p', 'milo-focus', 'Für diese Stufe konnte keine Frage erzeugt werden.'),
        button('Erneut versuchen', () => {
          makeStep();
          render(true);
        }, 'milo-primary'),
        button('Aussteigen', () => finish(round.earned, 'Ausgestiegen')));
      return;
    }
    if (round.question.team && !round.packOpened) {
      stage.append(element('h3', 'milo-focus', 'Dein Booster für die Millionenfrage'),
        element('p', 'milo-muted', 'Fünf Pokémon warten auf ihren Auftritt. Öffne den Booster und entdecke dein Team.'),
        button('Booster öffnen', openBooster, 'milo-primary'));
      if (!round.packStarted) {
        round.packStarted = true;
        const question = round.question;
        queueMicrotask(() => {
          if (isAuthorized() && round?.question === question && !round.packOpened) openBooster();
        });
      }
      return;
    }
    const jokers = element('div', 'milo-jokers');
    for (const [id, action] of [['half', useHalfJoker], ['audience', audienceJoker], ['telephone', telephoneJoker], ['bonus', useBonus]]) {
      const actual = id === 'bonus' ? (round.mode === 'risk' ? round.bonus : 'blank') : id;
      const recordedUsed = round.lifelines.find((slot) => slot.id === actual)?.used;
      // A refunded call is available again, while history still records its use.
      const used = actual === 'telephone' && !round.telephone ? false
        : actual === 'metronom' && round.metronom?.refunded ? false : recordedUsed;
      const disabled = jokerDisabled(id);
      const control = button('', action, 'milo-joker', disabled);
      control.setAttribute('aria-label', lifelines[actual][0] + (used ? ' · benutzt' : ''));
      control.title = lifelines[actual][2];
      control.append(icon(actual, used, disabled), element('span', '', lifelines[actual][0]));
      control.dataset.miloJoker = id;
      jokers.append(control);
    }
    stage.append(jokers);
    const developerControls = element('div', 'milo-actions');
    const developerStatus = element('p', 'milo-muted');
    developerControls.dataset.miloDev = '';
    developerStatus.dataset.miloDev = '';
    developerStatus.setAttribute('role', 'status');
    developerControls.append(
      button('Dev · Bewertung', () => {
        round.assisted = true;
        const popup = element('dialog', 'milo-dev-dialog');
        const heading = element('h3', '', 'Fragenbewertung');
        heading.id = 'milo-dev-title';
        popup.setAttribute('aria-labelledby', heading.id);
        const details = element('pre', '', [
          `Kategorie: ${round.question.category}`,
          `Preis: ${format.format(prizes[round.index])}`,
          round.question.prompt,
          `Richtige Antwort: ${letters[round.correct]} · ${round.question.options[round.correct]}`,
          round.question.difficultyDetails,
          round.question.explanation,
          'Ease-Grenzen: ≥75 → 500; ≥55 → 1.000; ≥40 → 2.000; ≥30 → 4.000; ≥22 → 8.000; ≥15 → 16.000; ≥8 → 32.000; ≥4 → 64.000; sonst 125.000.',
        ].filter(Boolean).join('\n\n'));
        const dismiss = button('Schließen', () => popup.close());
        popup.append(heading, details, dismiss);
        popup.addEventListener('close', () => popup.remove(), { once: true });
        dialog.append(popup);
        popup.showModal();
      }),
      button('Dev · Neu würfeln', () => {
        const replacement = generateQuestion(prizes[round.index], round.seen, round.question.category);
        if (!replacement) {
          developerStatus.textContent = 'Keine weitere Frage dieser Kategorie verfügbar. Erneut versuchen.';
          return;
        }
        replaceDeveloperQuestion(replacement);
      }, '', round.revealed),
      button('Dev · Andere Kategorie', () => {
        const replacement = generateQuestion(prizes[round.index], round.seen, null, round.question.category);
        if (!replacement) {
          developerStatus.textContent = 'Keine andere Kategorie für diese Gewinnstufe verfügbar.';
          return;
        }
        replaceDeveloperQuestion(replacement);
      }, '', round.revealed),
    );
    stage.append(developerControls, developerStatus);

    const question = element('section', 'milo-question');
    if (round.question.genwunnerStyle) question.classList.add('milo-gb-box');
    question.append(element('p', 'milo-kicker', `Stufe ${round.index + 1} / ${prizes.length} · ${format.format(prizes[round.index])} Punkte`),
      element('h3', round.revealed ? '' : 'milo-focus', round.question.prompt));
    if (round.question.rules) question.append(element('p', 'milo-muted milo-question-rules', round.question.rules));
    if (round.question.team) question.append(button('Teamkarten ansehen', openBooster));
    if (round.doubleActive) question.append(element('p', '', 'Doppelteam: Wähle genau zwei Antworten.'));
    const answers = element('div', 'milo-answers');
    letters.forEach((letter, index) => {
      const removed = round.removed.includes(index);
      const answer = button(removed ? '—' : `${letter} · ${round.question.options[index]}`, () => {
        if (round.doubleActive) {
          if (round.selectedAnswers.includes(index)) round.selectedAnswers = round.selectedAnswers.filter((value) => value !== index);
          else if (round.selectedAnswers.length < 2) round.selectedAnswers.push(index);
        } else { round.selected = index; round.selectedAnswers = [index]; }
        for (const [answerIndex, control] of [...answers.children].entries()) {
          control.setAttribute('aria-pressed', String(round.selectedAnswers.includes(answerIndex)));
        }
        actions.querySelector('.milo-primary').disabled = round.doubleActive ? round.selectedAnswers.length !== 2 : round.selected === null;
      }, 'milo-answer', removed || round.revealed);
      if (round.question.genwunnerStyle) answer.classList.add('milo-gb-box');
      if (!removed && estimateSources().length) {
        answer.classList.add('milo-answer-with-estimate');
        const badge = element('span', 'milo-answer-estimate');
        badge.dataset.miloEstimate = String(index);
        answer.append(badge);
      }
      if (removed) answer.setAttribute('aria-label', `Antwort ${letter} gestrichen`);
      answer.setAttribute('aria-pressed', String(round.selectedAnswers.includes(index)));
      if (round.revealed && index === round.correct) answer.dataset.result = 'correct';
      if (round.revealed && round.selectedAnswers.includes(index) && index !== round.correct) answer.dataset.result = 'wrong';
      answers.append(answer);
    });
    const actions = element('div', 'milo-actions');
    if (round.revealed) {
      const correct = round.selectedAnswers.includes(round.correct);
      const result = element('p', 'milo-focus', correct ? 'Richtig!' : `Falsch. Richtig war ${letters[round.correct]}.`);
      const won = round.earned === prizes.at(-1);
      actions.append(result, button(correct && !won ? 'Nächste Stufe' : 'Ergebnis anzeigen', () => {
        if (!correct) return finish(round.safe, 'Runde beendet');
        if (won) return finish(round.earned, 'Die Million geknackt!');
        round.previousAnswer = round.question.options[round.correct];
        round.index += 1;
        makeStep();
        render(true);
      }, 'milo-primary'));
    } else {
      actions.append(button('Aussteigen', () => finish(round.earned, 'Ausgestiegen')),
        button('Antwort einloggen', () => {
          if (round.doubleActive ? round.selectedAnswers.length !== 2 : round.selected === null || round.removed.includes(round.selected)) return;
          round.revealed = true;
          if (round.selectedAnswers.includes(round.correct)) {
            round.earned = prizes[round.index];
            if (safetyPoints().has(round.earned)) round.safe = round.earned;
            if (round.earned === 1000000) celebrateMillion();
          }
          render(true);
        }, 'milo-primary', round.doubleActive ? round.selectedAnswers.length !== 2 : round.selected === null));
    }
    if (round.question.battle) {
      const battle = round.question.battle;
      const context = element('div', 'milo-battle-context');
      const conditions = element('aside', 'milo-battle-conditions');
      conditions.setAttribute('aria-label', 'Kampfbedingungen');
      conditions.append(element('h4', '', 'Kampfbedingungen'),
        element('p', '', `Verteidiger: ${battle.defender.de} · ${battle.defender.abilityDe}`),
        element('p', '', `Angreifer: ${battle.attacker.de} · ${battle.attacker.abilityDe}`),
        element('p', '', 'Beide: Level 100 · neutrales Wesen · 0 EVs · 0 IVs'),
        element('p', '', 'Volle KP · keine Items, Statusprobleme oder Stufenänderungen'),
        element('p', '', 'Keine Tera · neutrales Wetter · kein Terrain · Einzelkampf'),
        element('p', '', 'NatDex-Lernset · Schadensmechanik: Generation 9'),
        element('p', 'milo-muted milo-battle-note', 'Attacken treffen. Nur garantierte Volltreffer zählen, sofern sie nicht verhindert werden. Schaden vor der KP-Begrenzung.'));
      context.append(conditions);
      stage.append(context);
    }
    stage.append(question, answers, actions);
    if (round.revealed && round.question.explanation) {
      stage.append(element('p', 'milo-muted', round.question.explanation));
    }
  }

  function render(focus = false) {
    clearInterval(estimateTimer);
    stage.replaceChildren();
    ladder.replaceChildren();
    for (const [index, prize] of [...prizes.entries()].reverse()) {
      const row = element('li', '');
      const checkpoint = safetyPoints().has(prize);
      row.append(element('span', '', String(index + 1)), element('strong', '', format.format(prize)),
        element('span', 'milo-diamond', checkpoint ? '◆' : ''));
      if (checkpoint) row.setAttribute('aria-label', `Stufe ${index + 1}, ${format.format(prize)}, Sicherheitsstufe`);
      if (round && !round.result && round.index === index) row.setAttribute('aria-current', 'step');
      if (round && prize <= (round.result?.score ?? round.earned)) row.classList.add('milo-earned');
      ladder.append(row);
    }
    if (!round) { if (setupStep === 'mode') renderMode(); else renderStart(); }
    else if (!round.result) renderRound();
    else {
      const summary = element('section', 'milo-result');
      summary.append(element('h3', 'milo-focus', round.result.title),
        element('p', '', `${round.player} · ${format.format(round.result.score)} Punkte`));
      if (round.result.unsaved) summary.append(element('p', 'milo-muted', 'Die Bestenliste konnte auf diesem Gerät nicht gespeichert werden.'));
      if (round.assisted) summary.append(element('p', 'milo-muted', 'Entwicklerhilfe verwendet · dieses Ergebnis zählt nicht zur Bestenliste.'));
      summary.append(historyIcons(round.lifelines, round.mode));
      if (round.penalty) summary.append(element('p', '', `Enthält ${format.format(round.penalty)} Punkte Zerschneider-Abzug.`));
      summary.append(button('Neue Runde', () => {
        resetCelebration();
        round = null;
        setupStep = 'name';
        render(true);
      }, 'milo-primary'));
      stage.append(summary, scoreBoard());
    }
    updateAnswerEstimates();
    if (round && !round.result && estimateSources().length > 1 && stage.querySelector('[data-milo-estimate]')) {
      const owner = round, questionId = round.questionId;
      estimateTimer = setInterval(() => {
        if (!isAuthorized() || round !== owner || round.questionId !== questionId) { clearInterval(estimateTimer); return; }
        estimateSourceIndex += 1;
        updateAnswerEstimates();
      }, 3000);
    }
    updateAnswerHint();
    updateDeveloperControls();
    if (focus) {
      const target = stage.querySelector('.milo-focus, input');
      if (target) {
        if (target.tagName !== 'INPUT') target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    }
  }

  fullscreenButton.hidden = !document.fullscreenEnabled;
  document.addEventListener('keydown', (event) => {
    if (event.code !== 'KeyD' || event.ctrlKey || event.altKey || event.metaKey
      || event.target.closest?.('input, textarea, select, [contenteditable="true"]')
      || !isAuthorized()) return;
    event.preventDefault();
    developerKeyHeld = true;
    updateDeveloperControls();
  });
  document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyD') clearDeveloperKey();
  });
  window.addEventListener('blur', clearDeveloperKey);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearDeveloperKey();
  });
  document.addEventListener('keydown', (event) => {
    if (event.code !== 'KeyH' || event.ctrlKey || event.altKey || event.metaKey
      || event.target.closest?.('input, textarea, select, [contenteditable="true"]')
      || !isAuthorized() || !round?.question || round.result || round.revealed) return;
    event.preventDefault();
    round.assisted = true;
    answerHintHeld = true;
    updateAnswerHint();
  });
  document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyH') clearAnswerHint();
  });
  window.addEventListener('blur', clearAnswerHint);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearAnswerHint();
  });
  fullscreenButton.addEventListener('click', async () => {
    if (!isAuthorized()) return;
    fullscreenStatus.hidden = true;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      fullscreenStatus.textContent = 'Vollbild ist nicht verfügbar. Nutze den Vollbildmodus deines Browsers.';
      fullscreenStatus.hidden = false;
    }
  });
  document.addEventListener('fullscreenchange', () => {
    fullscreenButton.textContent = document.fullscreenElement ? 'Vollbild beenden' : 'Vollbild';
  });

  return {
    open(accountId) {
      if (!accountId || accountId !== getAdminId() || dialog.open) return;
      adminId = accountId;
      scores = [];
      document.body.append(dialog);
      fullscreenStatus.hidden = true;
      dialog.show();
      render(true);
      void refreshScores();
    },
    close,
  };
};
