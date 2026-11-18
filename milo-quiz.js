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
  let startDraft = { name: '', mode: 'safe' };
  let jokerPopup = null;
  let phoneTimer;
  const safetyPoints = () => round?.mode === 'risk' ? new Set([500, 1000000]) : checkpoints;

  function closeJokerPopup() {
    clearTimeout(phoneTimer);
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
    closeJokerPopup();
    scoreRequest += 1;
    clearDeveloperKey();
    resetCelebration();
    clearAnswerHint();
    adminId = null;
    round = null;
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
    scores.forEach(({ name, score, mode }) => {
      const row = element('li', '');
      row.append(element('span', '', `${name} · ${mode === 'risk' ? 'Risk' : 'Safe'}`), element('strong', '', format.format(score)));
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
        const score = element('select', '');
        for (const value of [0, ...prizes]) {
          const option = element('option', '', format.format(value));
          option.value = String(value);
          option.selected = value === entry.score;
          score.append(option);
        }
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
            player_name: name.value, score: score.value, run_mode: mode.value, is_test: test.checked,
          }));
        });
        name.addEventListener('input', () => name.setCustomValidity(''));
        form.append(element('p', 'milo-muted', new Date(entry.created_at).toLocaleString('de-DE')),
          save, remove, confirmation, feedback);
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
        ? await scoreStore.save(owner, saveResult.player, saveResult.score, saveResult.mode, saveResult.assisted)
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
    if (round.telephone?.refundNext) round.telephone = null;
    const prize = prizes[round.index];
    round.question = generateQuestion(prize, round.seen);
    round.correct = round.question?.correct;
    round.removed = [];
    round.selected = null;
    round.revealed = false;
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
    const modes = element('fieldset', 'milo-mode-choice');
    modes.append(element('legend', '', 'Spielmodus'));
    for (const [value, title, description] of [
      ['safe', 'Safe Mode', 'Sicherheitsstufen bei 500 und 16.000 Punkten.'],
      ['risk', 'Risk Mode', 'Sicherheitsstufe bei 500 Punkten. Der zusätzliche Wahljoker wird später ergänzt.'],
    ]) {
      const choice = element('label', 'milo-mode-option');
      const radio = element('input', '');
      radio.type = 'radio';
      radio.name = 'mode';
      radio.value = value;
      radio.checked = startDraft.mode === value;
      radio.addEventListener('change', () => { startDraft.mode = value; });
      choice.append(radio, element('strong', '', title), element('span', '', description));
      modes.append(choice);
    }
    const start = element('button', 'milo-primary', 'Spiel starten');
    start.type = 'submit';
    label.append(name);
    form.append(label, modes, start);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!isAuthorized()) return close();
      const player = name.value.trim();
      if (!player) {
        name.setCustomValidity('Bitte gib einen Namen ein.');
        name.reportValidity();
        return;
      }
      round = { player, mode: startDraft.mode, index: 0, earned: 0, safe: 0, seen: new Set(),
        halfUsed: false, audience: null, telephone: null, assisted: false };
      makeStep();
      render(true);
    });
    welcome.append(form);
    stage.append(welcome, scoreBoard());
  }

  function finish(score, title) {
    if (round.result) return;
    round.result = { score, title };
    if (!round.assisted) scores = [...scores, { name: round.player, score, mode: round.mode }].sort((a, b) => b.score - a.score).slice(0, 10);
    render(true);
    void refreshScores({ player: round.player, score, mode: round.mode, assisted: round.assisted });
  }

  function audienceJoker() {
    if (round.revealed || (round.audience && round.audience.questionId !== round.questionId)) return;
    round.audience ??= { questionId: round.questionId, votes: [0, 0, 0, 0] };
    const box = popup('Publikumsjoker');
    box.append(element('p', '', 'Bitte stimmt vor Ort ab. Tragt die Stimmen für A, B, C und D mit + und − ein.'));
    box.append(element('p', 'milo-joker-question', round.question.prompt));
    const graph = element('div', 'milo-votes');
    const rows = [];
    const totalLabel = element('p', 'milo-muted');
    totalLabel.setAttribute('aria-live', 'polite');
    function update() {
      const total = round.audience.votes.reduce((sum, count) => sum + count, 0);
      rows.forEach(({ bar, label, minus }, index) => {
        const count = round.audience.votes[index];
        const percent = total ? count / total * 100 : 0;
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
      const minus = button('−', () => { round.audience.votes[index] = Math.max(0, round.audience.votes[index] - 1); update(); });
      const plus = button('+', () => { round.audience.votes[index] += 1; update(); }, '', round.removed.includes(index));
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

  function telephoneJoker() {
    if (round.revealed || (round.telephone && (round.telephone.refundNext || round.telephone.questionId !== round.questionId))) return;
    const context = {
      question: round.question, prize: prizes[round.index], player: round.player,
      previousAnswer: round.previousAnswer,
    };
    round.telephone ??= {
      questionId: round.questionId,
      contacts: window.selectMiloPhoneContacts(context),
      chosen: null, line: 0, revealedWords: 1,
    };
    const call = round.telephone;
    const box = popup('Telefonjoker');
    box.classList.add('milo-phone-dialog');
    box.addEventListener('close', () => clearTimeout(phoneTimer), { once: true });
    function draw() {
      clearTimeout(phoneTimer);
      box.replaceChildren(element('h3', '', call.chosen === null ? 'Wen anrufen?' : 'Telefonjoker'));
      box.querySelector('h3').id = 'milo-joker-title';
      if (call.chosen === null) {
        box.append(element('p', '', 'Wähle einen von drei Kontakten.'));
        const options = element('div', 'milo-call-options');
        call.contacts.forEach((contact, index) => options.append(button(contact.name, () => {
          call.chosen = index;
          call.line = 0;
          call.revealedWords = 1;
          draw();
        })));
        box.append(options);
      } else {
        const contact = call.contacts[call.chosen];
        const visibleWrong = round.question.options.filter((_, index) => index !== round.correct && !round.removed.includes(index));
        const signature = round.removed.join(',');
        if (!call.lines || call.signature !== signature) {
          for (let i = visibleWrong.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [visibleWrong[i], visibleWrong[j]] = [visibleWrong[j], visibleWrong[i]];
          }
          const introduction = {
            speaker: 'Günther Lauchzelot',
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
        if (current.refund) call.refundNext = true;
        const speech = element('section', 'milo-phone');
        const text = element('p', '');
        speech.append(element('h3', 'milo-speaker', current.speaker), text);
        box.append(speech);
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
        if (current.interval) {
          const words = current.text.split(' ');
          function reveal() {
            text.textContent = words.slice(0, call.revealedWords).join(' ');
            next.disabled = call.line === call.lines.length - 1 || call.revealedWords < words.length;
            if (call.revealedWords < words.length) {
              phoneTimer = setTimeout(() => {
                if (!box.open || !isAuthorized() || round.telephone !== call) return;
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

  function useHalfJoker() {
    if (round.halfUsed || round.revealed) return;
    round.halfUsed = true;
    const wrong = letters.map((_, index) => index).filter((index) => index !== round.correct);
    wrong.splice(Math.floor(Math.random() * wrong.length), 1);
    round.removed = wrong;
    if (wrong.includes(round.selected)) round.selected = null;
    render(true);
  }

  function renderRound() {
    const status = element('div', 'milo-round-status');
    status.append(element('strong', '', round.player),
      element('span', '', round.mode === 'risk' ? 'Risk Mode' : 'Safe Mode'),
      element('span', '', `Kontostand ${format.format(round.earned)}`),
      element('span', '', `Sicher ${format.format(round.safe)}`));
    stage.append(status);
    if (!round.question) {
      stage.append(element('p', 'milo-focus', 'Für diese Stufe konnte keine Frage erzeugt werden.'),
        button('Erneut versuchen', () => {
          makeStep();
          render(true);
        }, 'milo-primary'),
        button('Aussteigen', () => finish(round.earned, 'Ausgestiegen')));
      return;
    }
    const jokers = element('div', 'milo-jokers');
    jokers.append(
      button(round.halfUsed ? '50:50 ✓' : '50:50', useHalfJoker, 'milo-joker', round.halfUsed || round.revealed),
      button(round.audience ? 'Publikum ✓' : 'Publikum', audienceJoker, 'milo-joker',
        round.revealed || Boolean(round.audience && round.audience.questionId !== round.questionId)),
      button(round.telephone ? 'Telefon ✓' : 'Telefon', telephoneJoker, 'milo-joker',
        round.revealed || Boolean(round.telephone && (round.telephone.refundNext || round.telephone.questionId !== round.questionId))),
    );
    if (round.mode === 'risk') jokers.append(button('Wahljoker · folgt', null, 'milo-joker', true));
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
        clearAnswerHint();
        round.assisted = true;
        closeJokerPopup();
        round.questionId += 1;
        round.question = replacement;
        round.correct = replacement.correct;
        round.selected = null;
        round.revealed = false;
        round.removed = [];
        render(true);
      }, '', round.revealed),
    );
    stage.append(developerControls, developerStatus);

    const question = element('section', 'milo-question');
    question.append(element('p', 'milo-kicker', `Stufe ${round.index + 1} / ${prizes.length} · ${format.format(prizes[round.index])} Punkte`),
      element('h3', round.revealed ? '' : 'milo-focus', round.question.prompt));
    const answers = element('div', 'milo-answers');
    letters.forEach((letter, index) => {
      const removed = round.removed.includes(index);
      const answer = button(removed ? '—' : `${letter} · ${round.question.options[index]}`, () => {
        round.selected = index;
        for (const [answerIndex, control] of [...answers.children].entries()) {
          control.setAttribute('aria-pressed', String(answerIndex === index));
        }
        actions.querySelector('.milo-primary').disabled = false;
      }, 'milo-answer', removed || round.revealed);
      if (removed) answer.setAttribute('aria-label', `Antwort ${letter} gestrichen`);
      answer.setAttribute('aria-pressed', String(round.selected === index));
      if (round.revealed && index === round.correct) answer.dataset.result = 'correct';
      if (round.revealed && index === round.selected && index !== round.correct) answer.dataset.result = 'wrong';
      answers.append(answer);
    });
    const actions = element('div', 'milo-actions');
    if (round.revealed) {
      const correct = round.selected === round.correct;
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
          if (round.selected === null || round.removed.includes(round.selected)) return;
          round.revealed = true;
          if (round.selected === round.correct) {
            round.earned = prizes[round.index];
            if (safetyPoints().has(round.earned)) round.safe = round.earned;
            if (round.earned === 1000000) celebrateMillion();
          }
          render(true);
        }, 'milo-primary', round.selected === null));
    }
    stage.append(question, answers, actions);
    if (round.revealed && round.question.explanation) {
      stage.append(element('p', 'milo-muted', round.question.explanation));
    }
  }

  function render(focus = false) {
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
    if (!round) renderStart();
    else if (!round.result) renderRound();
    else {
      const summary = element('section', 'milo-result');
      summary.append(element('h3', 'milo-focus', round.result.title),
        element('p', '', `${round.player} · ${format.format(round.result.score)} Punkte`));
      if (round.result.unsaved) summary.append(element('p', 'milo-muted', 'Die Bestenliste konnte auf diesem Gerät nicht gespeichert werden.'));
      if (round.assisted) summary.append(element('p', 'milo-muted', 'Entwicklerhilfe verwendet · dieses Ergebnis zählt nicht zur Bestenliste.'));
      summary.append(button('Neue Runde', () => {
        resetCelebration();
        round = null;
        render(true);
      }, 'milo-primary'));
      stage.append(summary, scoreBoard());
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
