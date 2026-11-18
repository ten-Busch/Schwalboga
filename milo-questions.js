window.createMiloQuestionGenerator = function createMiloQuestionGenerator(entries, moves, getCost, captainCosts = window.CAPTAIN_TYPE_COSTS ?? {}) {
  const pool = entries.filter((p) => !p.forme && !p.hidden && !p.impossible && !p.unreleased);
  const name = (p) => p.names?.de ?? p.name;
  const key = (value) => value.normalize('NFC').toLowerCase();
  let difficultyDetails = '';
  let referencePokemon = [];
  const realNames = new Set(entries.flatMap((p) => [p.name, name(p)]).map(key));
  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function question(prompt, correct, wrong, explanation) {
    if (new Set([correct, ...wrong].map(key)).size !== 4 || wrong.length !== 3) return null;
    const options = shuffle([correct, ...wrong]);
    return { prompt, options, correct: options.indexOf(correct), explanation,
      referencePokemon: referencePokemon.map((p) => ({ name: p.name, de: name(p) })) };
  }

  const translationGroups = [
    { prize: 300, label: 'Pokémon', rows: pool },
    { prize: 500, label: 'Attacke', rows: Object.values(moves) },
    { prize: 1000, label: 'Fähigkeit', rows: entries.flatMap((p) => p.abilityDetails) },
  ].map(({ rows, ...group }) => {
    const translations = new Map();
    for (const row of rows) {
      if (!row.names?.de || key(row.name) === key(row.names.de)) continue;
      translations.set(key(row.name) + ':' + key(row.names.de), { en: row.name, de: row.names.de });
    }
    return { ...group, rows: [...translations.values()] };
  });
  const translationChoices = new Map();
  const letterCounts = (text) => {
    const counts = new Map();
    for (const char of key(text).replace(/[^\p{L}]/gu, '')) counts.set(char, (counts.get(char) ?? 0) + 1);
    return counts;
  };
  function longestLetterRun(left, right) {
    const a = [...key(left)];
    const b = [...key(right)];
    let previous = new Array(b.length + 1).fill(0);
    let longest = 0;
    for (const char of a) {
      const current = new Array(b.length + 1).fill(0);
      for (let j = 0; j < b.length; j += 1) {
        if (/\p{L}/u.test(char) && char === b[j]) {
          current[j + 1] = previous[j] + 1;
          longest = Math.max(longest, current[j + 1]);
        }
      }
      previous = current;
    }
    return longest;
  }
  function translationQuestion(prize) {
    const group = translationGroups.find((item) => item.prize === prize);
    const target = pick(['en', 'de']);
    const source = target === 'en' ? 'de' : 'en';
    const row = pick(group.rows);
    if (group.label === 'Pokémon') referencePokemon = pool.filter((p) => p.name === row.en);
    const cacheKey = `${prize}:${target}:${row[source]}`;
    if (!translationChoices.has(cacheKey)) {
      const validAnswers = new Set(group.rows.filter((other) => key(other[source]) === key(row[source])).map((other) => key(other[target])));
      const correctLetters = letterCounts(row[target]);
      const ranked = [...new Set(group.rows.map((other) => other[target]))]
        .filter((candidate) => !validAnswers.has(key(candidate)))
        .map((candidate) => {
          const letters = letterCounts(candidate);
          const overlap = [...correctLetters].reduce((sum, [char, count]) => sum + Math.min(count, letters.get(char) ?? 0), 0);
          return { candidate, run: longestLetterRun(row[target], candidate), overlap,
            lengthDifference: Math.abs([...key(candidate)].length - [...key(row[target])].length) };
        });
      translationChoices.set(cacheKey, ranked);
    }
    const ranked = shuffle(translationChoices.get(cacheKey))
      .sort((a, b) => b.run - a.run || b.overlap - a.overlap || a.lengthDifference - b.lengthDifference);
    const wrong = [];
    for (const { candidate } of ranked) {
      if (!wrong.some((value) => key(value) === key(candidate))) wrong.push(candidate);
      if (wrong.length === 3) break;
    }
    return question(`Wie lautet der ${target === 'en' ? 'englische' : 'deutsche'} Name ${group.label === 'Pokémon' ? 'des Pokémon' : 'der ' + group.label} „${row[source]}“?`,
      row[target], wrong, `${row.de} ↔ ${row.en}`);
  }

  const spellings = new Map([[50, []], [100, []], [200, []], [300, []]]);
  function typos(original) {
    const basic = new Set();
    const advanced = new Set();
    const easyOnly = new Set();
    const vowel = /[aeiouäöü]/i;
    const consonant = /[b-df-hj-np-tv-zß]/i;
    const chars = [...original];
    const swap = (i, j) => {
      const copy = [...chars];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy.map((char, index) => index === 0 ? char.toUpperCase() : char.toLowerCase()).join('');
    };
    for (let i = 0; i < chars.length; i += 1) {
      const char = chars[i];
      const lower = char.toLowerCase();
      const previous = chars[i - 1]?.toLowerCase();
      const next = chars[i + 1]?.toLowerCase();
      const replace = (text, length = 1) => chars.slice(0, i).join('') + text + chars.slice(i + length).join('');
      if (i > 0 && consonant.test(char) && !consonant.test(previous ?? '') && !consonant.test(next ?? '')) {
        basic.add(replace(char + lower));
      }
      if (vowel.test(char)) {
        for (let j = i + 1; j < chars.length; j += 1) {
          if (vowel.test(chars[j]) && lower !== chars[j].toLowerCase()) basic.add(swap(i, j));
        }
      }
      if (chars.slice(i, i + 3).join('').toLowerCase() === 'sch') {
        basic.add(replace(i === 0 ? 'C' : 'c', 2));
      }
      if (lower === 'e' && next === 'u') basic.add(replace(i === 0 ? 'Öi' : 'öi', 2));
      if (lower === 'o' && next === 'r') easyOnly.add(replace(char + 'h'));
      if (lower === 'k' && i > 0 && i < chars.length - 1 && previous !== 'c') advanced.add(replace('c'));
      if (lower === 'i' && next === 'e') {
        advanced.add(replace(char, 2));
        advanced.add(replace(char + 'h', 2));
      }
      if (lower === 's' && next === 's') advanced.add(replace(i === 0 ? 'ẞ' : 'ß', 2));
      if (lower === 'z' && previous !== 't' && previous !== 'z' && next !== 'z') advanced.add(replace(i === 0 ? 'Tz' : 'tz'));
      if (lower === 't' && next === 'z') advanced.add(replace(i === 0 ? 'Z' : 'z', 2));
      if (consonant.test(char) && lower === next) advanced.add(replace(char, 2));
      const plain = { ä: 'a', ö: 'o', ü: 'u' }[lower];
      if (plain) advanced.add(replace(i === 0 ? plain.toUpperCase() : plain));
    }
    const ending = original.match(/(?:ck|g|k|c)$/i);
    if (ending) {
      for (const replacement of ['g', 'k', 'ck', 'c']) {
        if (replacement !== ending[0].toLowerCase()) advanced.add(original.slice(0, -ending[0].length) + replacement);
      }
    }
    const valid = (candidate) => !realNames.has(key(candidate)) && !/^([b-df-hj-np-tv-zß])\1/i.test(candidate);
    return { basic: [...basic].filter(valid), advanced: [...advanced].filter(valid),
      easy: [...new Set([...basic, ...easyOnly])].filter(valid) };
  }

  for (const p of pool) {
    const forms = [[name(p), 'Welche Schreibweise ist richtig?']];
    if (key(name(p)) !== key(p.name)) forms.push([p.name, `Wie lautet der englische Name von ${name(p)}?`]);
    for (const [answer, prompt] of forms) {
      if (!/^[a-zäöüß]+$/i.test(answer)) continue;
      const { basic, advanced, easy } = typos(answer);
      if (easy.length >= 3) spellings.get(p.num <= 151 ? 50 : 100).push({ answer, prompt, basic: easy });
      if (basic.length >= 2 && advanced.some((typo) => !basic.includes(typo))) {
        const candidate = { answer, prompt, basic, advanced: advanced.filter((typo) => !basic.includes(typo)) };
        spellings.get(200).push(candidate);
        if (p.num > 386) spellings.get(300).push(candidate);
      }
    }
  }

  const totals = new Map(pool.map((p) => [p, Object.values(p.baseStats).reduce((sum, stat) => sum + stat, 0)]));
  const statLabels = { hp: 'Basis-KP', atk: 'Angriff', def: 'Verteidigung', spa: 'Spezial-Angriff',
    spd: 'Spezial-Verteidigung', spe: 'Initiative', bst: 'Basiswertsumme' };
  const feminineStats = new Set(['def', 'spd', 'spe', 'bst']);
  const thresholds = [[75, 500], [55, 1000], [40, 2000], [30, 4000], [22, 8000],
    [15, 16000], [8, 32000], [4, 64000], [-Infinity, 125000]];
  const statValue = (p, stat) => stat === 'bst' ? totals.get(p) : p.baseStats[stat];
  function isPrime(value) {
    if (value < 2) return false;
    for (let divisor = 2; divisor * divisor <= value; divisor += 1) if (value % divisor === 0) return false;
    return true;
  }
  function numericStatRule(p, stat) {
    if (stat === 'bst') return null;
    if (p.tags?.includes('Ultra Beast')) return { label: 'Primzahlen', accepts: isPrime };
    if (p.tags?.includes('Paradox')) {
      const future = p.name.startsWith('Iron ');
      return { label: future ? 'gerade Zahlen (Zukunft)' : 'ungerade Zahlen (Vergangenheit)',
        accepts: (value) => value % 2 === (future ? 0 : 1) };
    }
    return null;
  }
  function snapStat(value, rule) {
    if (!rule) return value;
    for (let distance = 0; ; distance += 1) {
      // Prefer the lower valid number when both are equally close.
      if (value - distance >= 1 && rule.accepts(value - distance)) return value - distance;
      if (rule.accepts(value + distance)) return value + distance;
    }
  }
  function statModifier(p, stat) {
    const value = statValue(p, stat);
    if (stat === 'bst') return value === 600 ? 24 : 0;
    const recall = value >= 100 ? 2 : value >= 60 && value <= 80 ? -3 : 0;
    const lowShare = value <= totals.get(p) * 0.08 ? 12 : 0;
    const difference = Math.abs(p.baseStats.atk - p.baseStats.spa);
    const offense = ['atk', 'spa'].includes(stat) ? difference <= 15 ? -4 : difference >= 35 ? 4 : 0 : 0;
    return recall + lowShare + offense;
  }

  const statIndexes = Object.fromEntries(Object.keys(statLabels).map((stat) => {
    const values = new Map();
    for (const p of pool) {
      const value = statValue(p, stat);
      if (!values.has(value)) values.set(value, []);
      values.get(value).push(p);
    }
    return [stat, values];
  }));

  function statQuestion(prize, numeric = false) {
    const stats = Object.keys(statLabels).filter((stat) => prize <= 32000 || stat !== 'spe');
    for (let attempt = 0; attempt < 2500; attempt += 1) {
      const stat = pick(stats);
      const index = statIndexes[stat];
      const r = pick(pool);
      const rv = statValue(r, stat);
      const direction = numeric ? 0 : pick([-1, 0, 1]);
      const valid = (value) => Math.sign(value - rv) === direction;
      const rightValues = [...index.keys()].filter((value) => valid(value) && (value !== rv || index.get(value).length > 1));
      if (!rightValues.length) continue;
      const cv = pick(rightValues);
      const c = pick(index.get(cv).filter((p) => p !== r));
      const falseValues = [...index.keys()].filter((value) => !valid(value)
        && (value !== rv || index.get(value).length > 1));
      if (!falseValues.length) continue;
      const neighbor = pick(falseValues);
      const wrong = [pick(index.get(neighbor).filter((p) => p !== r))];
      const extraValues = falseValues.filter((value) => Math.abs(value - cv) >= Math.abs(neighbor - cv));
      for (let i = 0; i < 8 && wrong.length < 3; i += 1) {
        const p = pick(index.get(pick(extraValues)));
        if (p !== r && !wrong.includes(p)) wrong.push(p);
      }
      if (wrong.length !== 3) continue;
      const separation = Math.abs(cv - neighbor);
      const gap = stat === 'spe' ? separation + Math.max(0, separation - 3) : separation;
      const referenceGap = Math.min(Math.abs(cv - rv), ...wrong.map((p) => Math.abs(statValue(p, stat) - rv)));
      const multiplier = stat === 'bst' ? 0.7 : ['atk', 'spa'].includes(stat) ? 1.15 : 1;
      const ease = (direction === 0 ? gap : 0.8 * gap + 0.2 * referenceGap) * multiplier
        + statModifier(r, stat) + statModifier(c, stat) + 0.5 * statModifier(wrong[0], stat) + (numeric ? 4 : 0);
      const payout = thresholds.find(([floor]) => ease >= floor)[1];
      if ((stat === 'spe' ? Math.min(payout, 32000) : payout) !== prize) continue;
      referencePokemon = [r];
      difficultyDetails = `Stat: ${statLabels[stat]}\nAbstand richtige/falsche Antwort: ${separation}\nGewichteter Abstand: ${gap}\nReferenzabstand: ${referenceGap}\nStat-Multiplikator: ${multiplier}\nModifikatoren Referenz / richtig / falsch: ${statModifier(r, stat)} / ${statModifier(c, stat)} / ${statModifier(wrong[0], stat)} × 0,5\nNumerischer Antwortbonus: ${numeric ? 4 : 0}\nEase: ${ease.toFixed(2)}\nInitiative maximal 32.000 Punkte.`;
      if (numeric) {
        const rule = numericStatRule(r, stat);
        if (rule && !rule.accepts(rv)) continue;
        const answers = wrong.map((p) => snapStat(statValue(p, stat), rule));
        difficultyDetails += rule ? `\nZahlenregel: ${rule.label}. Falsche Werte auf die nächste passende Zahl gerundet; bei Gleichstand nach unten. Ursprüngliche Werte: ${wrong.map((p) => statValue(p, stat)).join(', ')}.` : '';
        const result = question(`Welchen Basiswert hat ${name(r)} in ${statLabels[stat]}?`, String(rv),
          answers.map(String), `${name(r)}: ${rv} (${statLabels[stat]})`);
        if (result) return result;
        continue;
      }
      const feminine = feminineStats.has(stat);
      const comparison = stat === 'hp'
        ? direction === 0 ? 'genauso viele' : direction > 0 ? 'mehr' : 'weniger'
        : direction === 0 ? feminine ? 'eine gleich hohe' : 'einen gleich hohen'
          : direction > 0 ? feminine ? 'eine höhere' : 'einen höheren' : feminine ? 'eine niedrigere' : 'einen niedrigeren';
      const prompt = `Welches Pokémon hat ${comparison} ${statLabels[stat]} ${direction === 0 ? 'wie' : 'als'} ${name(r)}?`;
      const explanation = [r, c, ...wrong].map((p) => `${name(p)}: ${statValue(p, stat)}`).join(' · ');
      const result = question(prompt, name(c), wrong.map(name), explanation);
      if (result && !result.options.some((option) => key(option) === key(name(r)))) return result;
    }
    return null;
  }

  const types = { Normal: 'Normal', Fire: 'Feuer', Water: 'Wasser', Electric: 'Elektro', Grass: 'Pflanze',
    Ice: 'Eis', Fighting: 'Kampf', Poison: 'Gift', Ground: 'Boden', Flying: 'Flug', Psychic: 'Psycho',
    Bug: 'Käfer', Rock: 'Gestein', Ghost: 'Geist', Dragon: 'Drache', Dark: 'Unlicht', Steel: 'Stahl', Fairy: 'Fee' };
  const moveName = (id) => moves[id].names?.de ?? moves[id].name;
  const learned = new Map(pool.map((p) => [p, new Set(p.moveIds.filter((id) => moves[id]))]));
  const moveIds = [...new Set([...learned.values()].flatMap((ids) => [...ids]))];
  const offType = (p, id) => !p.types.includes(moves[id].type);
  const offTypeCounts = new Map();
  for (const [p, ids] of learned) {
    for (const id of ids) if (offType(p, id)) offTypeCounts.set(id, (offTypeCounts.get(id) ?? 0) + 1);
  }
  const movePercentages = [];
  for (const type of Object.keys(types)) {
    const typed = pool.filter((p) => p.types.includes(type));
    if (!typed.length) continue;
    for (const id of moveIds.filter((id) => moves[id].type === type)) {
      const learners = typed.filter((p) => learned.get(p).has(id)).length;
      if (learners / typed.length < 0.5 || learners === typed.length) continue;
      movePercentages.push({ type, id, learners, total: typed.length });
    }
  }
  function percentageQuestion(prize) {
    const candidate = pick(movePercentages);
    if (!candidate) return null;
    const { type, id, learners, total } = candidate;
    const percent = Math.round(100 * learners / total);
    const minimumGap = prize === 250000 ? 10 : 5;
    const maximumGap = prize === 250000 ? 25 : 12;
    const wrong = shuffle(Array.from({ length: 101 }, (_, value) => value)
      .filter((value) => Math.abs(value - percent) >= minimumGap && Math.abs(value - percent) <= maximumGap)).slice(0, 3);
    difficultyDetails = `Standardformen mit Typ ${types[type]}: ${total}\nDavon lernen ${moveName(id)}: ${learners}\n100 × ${learners} / ${total} = ${(100 * learners / total).toFixed(4)}%, auf ganze Prozent gerundet: ${percent}%.\nHäufigkeitsminimum 50%, exakte 100% ausgeschlossen.\nFeste Stufe ${prize}: falsche Antworten ${minimumGap}–${maximumGap} Prozentpunkte von der gerundeten Lösung entfernt.`;
    return question(`Welcher Anteil an Pokémon vom Typ ${types[type]} lernt die Attacke ${moveName(id)}? (Standardformen, auf ganze Prozent gerundet)`,
      `${percent}%`, wrong.map((value) => `${value}%`), `${learners} von ${total} Pokémon: ${percent}%`);
  }
  const fit = (p, id) => {
    const difference = p.baseStats.atk - p.baseStats.spa;
    return moves[id].category === 'Physical' ? difference : moves[id].category === 'Special' ? -difference : 0;
  };
  const coverage = new Map([[2000, []], [4000, []], [8000, []], [16000, []]]);
  for (const [p, ids] of learned) {
    const groups = new Map();
    for (const id of ids) {
      const { type, category } = moves[id];
      if (!types[type] || !offType(p, id) || category === 'Status') continue;
      for (const group of [type, `${type}:${category}`]) {
        if (!groups.has(group)) groups.set(group, []);
        groups.get(group).push(id);
      }
    }
    for (const [group, options] of groups) {
      if (options.length !== 1) continue;
      const id = options[0];
      const [type, category] = group.split(':');
      const wrong = moveIds.filter((other) => !ids.has(other) && moves[other].type === type
        && moves[other].category !== 'Status' && (!category || moves[other].category === category)
        && moveName(other) !== moveName(id));
      if (new Set(wrong.map(moveName)).size < 3) continue;
      const alignment = fit(p, id);
      const prize = alignment >= 40 ? 2000 : alignment >= 20 ? 4000 : alignment >= 0 ? 8000 : 16000;
      coverage.get(prize).push({ p, id, type, category, wrong });
    }
  }

  function coverageQuestion(prize) {
    const candidate = pick(coverage.get(prize) ?? []);
    if (!candidate) return null;
    const { p, id, type, category, wrong } = candidate;
    referencePokemon = [p];
    difficultyDetails = `Angriff: ${p.baseStats.atk}; Spezial-Angriff: ${p.baseStats.spa}\nPassung zur Attacke: ${fit(p, id)}\nPassung ≥40 → 2.000; ≥20 → 4.000; ≥0 → 8.000; sonst 16.000. Enthält die bestätigte Erhöhung um zwei Stufen und das 16.000-Limit.\nAb 8.000 werden häufige typfremde Attacken als falsche Antworten bevorzugt.`;
    const choices = shuffle(wrong);
    if (prize >= 8000) choices.sort((a, b) => (offTypeCounts.get(b) ?? 0) - (offTypeCounts.get(a) ?? 0));
    const adjective = category === 'Physical' ? 'physische ' : category === 'Special' ? 'spezielle ' : '';
    return question(`Welches ist die einzige ${adjective}Coverage-Attacke vom Typ ${types[type]}, die ${name(p)} lernt?`,
      moveName(id), [...new Set(choices.map(moveName))].slice(0, 3));
  }

  function sharedQuestion(prize) {
    for (let attempt = 0; attempt < 300; attempt += 1) {
      const team = [pick(pool), pick(pool), pick(pool)];
      if (new Set(team.map((p) => key(name(p)))).size !== 3) continue;
      const frequency = new Map();
      for (const p of team) for (const id of learned.get(p)) frequency.set(id, (frequency.get(id) ?? 0) + 1);
      const candidates = [...frequency].filter(([id, count]) => {
        if (count !== 3 || team.filter((p) => offType(p, id)).length < 2) return false;
        const alignment = team.reduce((sum, p) => sum + fit(p, id), 0) / 3;
        return (alignment >= 20 ? 4000 : alignment <= -15 ? 16000 : 8000) === prize;
      });
      if (!candidates.length) continue;
      const [id] = pick(candidates);
      referencePokemon = team;
      difficultyDetails = `Mittlere offensive Passung: ${(team.reduce((sum, p) => sum + fit(p, id), 0) / 3).toFixed(2)}\n≥20 → 4.000; ≤−15 → 16.000; sonst 8.000.\nRichtige Antwort bei mindestens zwei Pokémon typfremd; falsche Antworten jeweils von genau zwei gelernt.`;
      const sharedNames = new Set([...frequency].filter(([, count]) => count === 3).map(([i]) => moveName(i)));
      const wrong = shuffle([...frequency].filter(([i, count]) => count === 2 && !sharedNames.has(moveName(i))
        && team.some((p) => offType(p, i)))).map(([i]) => moveName(i));
      const result = question(`Welche dieser Attacken lernen ${name(team[0])}, ${name(team[1])} und ${name(team[2])} alle?`,
        moveName(id), [...new Set(wrong)].slice(0, 3));
      if (result) return result;
    }
    return null;
  }

  function fourSharedQuestion(prize) {
    const wrongCount = prize <= 16000 ? 2 : 3;
    for (let attempt = 0; attempt < 180; attempt += 1) {
      const team = Array.from({ length: 4 }, () => pick(pool));
      if (new Set(team.map(name)).size !== 4) continue;
      const frequency = new Map();
      for (const p of team) for (const id of learned.get(p)) frequency.set(id, (frequency.get(id) ?? 0) + 1);
      const common = [...frequency].filter(([, count]) => count === 4).map(([id]) => id);
      if (!common.length) continue;
      const correct = pick(common);
      const alignment = team.reduce((sum, p) => sum + fit(p, correct), 0) / 4;
      const familiarity = (offTypeCounts.get(correct) ?? 0) / pool.length;
      const target = wrongCount === 2 ? alignment >= 0 ? 8000 : 16000
        : familiarity >= 0.3 ? 32000 : alignment >= 0 ? 64000 : 125000;
      if (target !== prize) continue;
      referencePokemon = team;
      difficultyDetails = `Falsche Antworten von genau ${wrongCount} Pokémon gelernt.\nMittlere offensive Passung: ${alignment.toFixed(2)}\nTypfremde Verbreitung der richtigen Attacke: ${(familiarity * 100).toFixed(1)}%\nZwei Lerner: Passung ≥0 → 8.000, sonst 16.000. Drei Lerner: Verbreitung ≥30% → 32.000; sonst Passung ≥0 → 64.000; sonst 125.000.`;
      const excluded = new Set(common.map(moveName));
      const wrong = [...new Set(shuffle([...frequency].filter(([id, count]) =>
        count === wrongCount && !excluded.has(moveName(id)))).map(([id]) => moveName(id)))].slice(0, 3);
      const result = question(`Welche dieser Attacken lernen ${team.map(name).join(', ')} alle?`,
        moveName(correct), wrong, `Alle vier lernen ${moveName(correct)}. Jede andere Antwort lernen genau ${wrongCount} der vier Pokémon.`);
      if (result) return result;
    }
    return null;
  }

  const thresholdBonus = (value) => {
    const distance = Math.min(...[5, 10, 15, 20].map((threshold) => Math.abs(value - threshold)));
    return distance === 0 ? 12 : distance === 1 ? 8 : 0;
  };
  function costQuestion(prize, numeric) {
    const mode = pick(['singles', 'doubles']);
    const format = mode === 'singles' ? 'Singles' : 'Doubles';
    const priced = pool.map((p) => ({ p, value: getCost(p, mode) })).filter(({ value }) => Number.isInteger(value) && value >= 0);
    if (priced.length < 4) return null;
    for (let attempt = 0; attempt < 600; attempt += 1) {
      const reference = pick(priced);
      if (numeric) {
        const enhanced = prize >= 32000;
        const kind = pick(['tera', 'z']);
        const available = Object.entries(captainCosts).filter(([, costs]) => Number.isInteger(costs[kind]));
        if (enhanced && (reference.value > (kind === 'tera' ? 5 : 10) || !available.length)) continue;
        const upgrade = enhanced ? pick(available) : null;
        const extra = upgrade?.[1][kind] ?? 0;
        const total = reference.value + extra;
        const gap = pick([1, 2, 3, 4, 5, 6]);
        const wrong = shuffle(Array.from({ length: 33 }, (_, value) => value)
          .filter((value) => value !== total && Math.abs(value - total) >= gap && Math.abs(value - total) <= gap + 3)).slice(0, 3);
        if (wrong.length < 3) continue;
        const ease = enhanced ? 10 - extra * 3 + thresholdBonus(reference.value) * 0.25
          : 0.7 * gap * 5 + thresholdBonus(reference.value) + 4;
        if (thresholds.find(([floor]) => ease >= floor)[1] !== prize) continue;
        referencePokemon = [reference.p];
        difficultyDetails = `Format: ${format}\nBasis: ${reference.value}; Zusatz: ${extra}; Antwort: ${total}\nMindestabstand der angebotenen Zahlen: ${gap}\nSchwellenbonus: ${thresholdBonus(reference.value)}\nEase: ${ease.toFixed(2)}\nFormel: ${enhanced ? '10 − 3 × Zusatz + 0,25 × Schwellenbonus' : '0,7 × Abstand × 5 + Schwellenbonus + 4'}`;
        const enhancement = upgrade ? kind === 'tera' ? ` mit Tera-Typ ${types[upgrade[0]] ?? upgrade[0]}`
          : ` mit einem Z-Kristall vom Typ ${types[upgrade[0]] ?? upgrade[0]}` : '';
        return question(`Wie viele Punkte kostet ${name(reference.p)}${enhancement} im ${format} insgesamt?`,
          String(total), wrong.map(String), `Pokémon: ${reference.value} · Zusatzkosten: ${extra} · Gesamt: ${total}`);
      }
      const direction = pick([-1, 0, 1]);
      const corrects = priced.filter((row) => row.p !== reference.p && Math.sign(row.value - reference.value) === direction);
      const falseOptions = priced.filter((row) => row.p !== reference.p && Math.sign(row.value - reference.value) !== direction);
      if (!corrects.length || falseOptions.length < 3) continue;
      const correct = pick(corrects);
      const wrong = shuffle(falseOptions).slice(0, 3);
      const separation = Math.min(...wrong.map((row) => Math.abs(row.value - correct.value))) * 5;
      const referenceGap = Math.min(Math.abs(correct.value - reference.value), ...wrong.map((row) => Math.abs(row.value - reference.value))) * 5;
      const ease = (direction === 0 ? separation : 0.8 * separation + 0.2 * referenceGap) + thresholdBonus(reference.value);
      if (thresholds.find(([floor]) => ease >= floor)[1] !== prize) continue;
      referencePokemon = [reference.p];
      difficultyDetails = `Format: ${format}\nAntwortabstand ×5: ${separation}\nReferenzabstand ×5: ${referenceGap}\nSchwellenbonus: ${thresholdBonus(reference.value)}\nEase: ${ease.toFixed(2)}\nGleichheit: Antwortabstand + Bonus; sonst 0,8 × Antwortabstand + 0,2 × Referenzabstand + Bonus.`;
      const comparison = direction === 0 ? 'genauso viele Punkte wie' : direction > 0 ? 'mehr Punkte als' : 'weniger Punkte als';
      return question(`Welches Pokémon kostet im ${format} ${comparison} ${name(reference.p)}?`,
        name(correct.p), wrong.map((row) => name(row.p)),
        [reference, correct, ...wrong].map((row) => `${name(row.p)}: ${row.value}`).join(' · '));
    }
    return null;
  }

  const labels = new Map();
  const counts = new Map();
  const typeTotals = new Map();
  const abilityTypes = new Map();
  const pairs = new Map();
  const abilities = new Map();
  const families = new Map();
  const byName = new Map(entries.map((p) => [p.name, p]));
  const family = (p) => p.prevo && byName.has(p.prevo) ? family(byName.get(p.prevo)) : p.name;
  const isExcluded = (p, id) => ['Milotic', 'Gyarados', 'Magikarp'].includes(p.name)
    || family(p) === 'Eevee' || (id === 'prankster' && ['Murkrow', 'Honchkrow'].includes(p.name));
  for (const p of pool) {
    const ids = [...new Set(p.abilityDetails.map(({ id }) => id))];
    abilities.set(p, ids);
    const root = family(p);
    if (!families.has(root)) families.set(root, []);
    families.get(root).push(p);
    for (const type of p.types) typeTotals.set(type, (typeTotals.get(type) ?? 0) + 1);
    for (const ability of p.abilityDetails) {
      if (!labels.has(ability.id) || ability.names?.de) labels.set(ability.id, ability.names?.de ?? ability.name);
    }
    for (const id of ids) {
      counts.set(id, (counts.get(id) ?? 0) + 1);
      if (!pairs.has(id)) pairs.set(id, new Map());
      if (!abilityTypes.has(id)) abilityTypes.set(id, new Map());
      const byType = abilityTypes.get(id);
      for (const type of p.types) byType.set(type, (byType.get(type) ?? 0) + 1);
      const partners = pairs.get(id);
      for (const other of ids) if (other !== id) partners.set(other, (partners.get(other) ?? 0) + 1);
    }
  }

  const abilityQuestions = new Map([[8000, []], [16000, []], [32000, []], [64000, []], [125000, []], [250000, []]]);
  for (const [p, own] of abilities) {
    if (own.length !== 3 || new Set(own.map((id) => labels.get(id))).size !== 3) continue;
    const relatives = new Set(families.get(family(p)).filter((relative) => relative !== p).flatMap((relative) => abilities.get(relative)));
    for (const id of counts.keys()) {
      if (own.includes(id) || own.some((other) => labels.get(id) === labels.get(other))) continue;
      if (relatives.has(id)) {
        if (!isExcluded(p, id)) abilityQuestions.get(250000).push({ p, own, id });
        continue;
      }
      const typeShare = Math.max(...p.types.map((type) => {
        const count = abilityTypes.get(id).get(type) ?? 0;
        return count >= 5 ? count / typeTotals.get(type) : 0;
      }));
      if (typeShare >= 0.12) abilityQuestions.get(typeShare >= 0.22 ? 64000 : 125000).push({ p, own, id });
      const association = Math.max(...own.map((other) => {
        const count = pairs.get(other).get(id) ?? 0;
        return count >= 4 ? count / (counts.get(other) - 1) : 0;
      }));
      if (association >= 0.2) abilityQuestions.get(association >= 0.4 ? 8000 : association >= 0.25 ? 16000 : 32000)
        .push({ p, own, id });
    }
  }

  function abilityQuestion(prize) {
    const { p, own, id } = pick(abilityQuestions.get(prize));
    referencePokemon = [p];
    difficultyDetails = `Typ-Häufigkeiten: ${p.types.map((type) => `${types[type]} ${abilityTypes.get(id).get(type) ?? 0}/${typeTotals.get(type)}`).join(', ')}\nPaarungen mit tatsächlichen Fähigkeiten: ${own.map((other) => `${labels.get(other)} ${pairs.get(other).get(id) ?? 0}/${counts.get(other) - 1}`).join(', ')}\n8k/16k/32k nach Paarungsanteil ≥40%/≥25%/≥20% (mindestens 4 Partner). 64k/125k nach Typanteil ≥22%/≥12% (mindestens 5). Evolutionslinie: feste 250k.`;
    return question(`Welche Fähigkeit hat ${name(p)} nicht?`, labels.get(id), own.map((ability) => labels.get(ability)));
  }

  const ranks = new Map([...pairs].map(([id, partners]) => [id, [...partners].sort((a, b) => b[1] - a[1])]));
  const uniqueRank = (rank, i) => rank[i] && rank[i - 1]?.[1] !== rank[i][1] && rank[i + 1]?.[1] !== rank[i][1] ? rank[i][0] : null;
  const abilityPairs = [];
  for (const [reference, rank] of ranks) {
    const correct = uniqueRank(rank, 0);
    const second = uniqueRank(rank, 1);
    if (!correct || !second) continue;
    const correctRank = ranks.get(correct);
    const first = uniqueRank(correctRank, 1);
    if (!first || first === reference || first === second) continue;
    const third = rank.map(([id]) => id).filter((id) => ![correct, first, second, correctRank[0][0]].includes(id) && pairs.get(correct).has(id));
    if (third.length) abilityPairs.push({ reference, correct, first, second, third });
  }

  function pairQuestion() {
    difficultyDetails = 'Feste Kategorie für 500.000 Punkte. Richtige Antwort ist der häufigste eindeutige Partner der Referenzfähigkeit; die Alternativen folgen den bestätigten Paarungsrang-Regeln.';
    const candidate = pick(abilityPairs);
    if (!candidate) return null;
    const { reference, correct, first, second, third } = candidate;
    const wrong = [first, second, pick(third)];
    const explanation = [correct, ...wrong].map((id) => `${labels.get(id)}: ${pairs.get(reference).get(id) ?? 0}`).join(' · ');
    return question(`Welche dieser Fähigkeiten kommt am häufigsten bei denselben Pokémon vor wie ${labels.get(reference)}?`,
      labels.get(correct), wrong.map((id) => labels.get(id)), explanation);
  }

  function teamQuestion(mode) {
    difficultyDetails = 'Feste Kategorie für 1.000.000 Punkte. Vier aktuelle Tierkosten plus genau ein Tera-/Z-Zuschlag. Maximal ein Mega; im Singles nach Möglichkeit ein Mega. Falsche Zahlen liegen 15–35% vom Gesamtwert entfernt.';
    const priced = entries.filter((p) => !p.hidden && !p.impossible && !p.unreleased)
      .map((p) => ({ name: p.forme ? p.name : name(p), species: p.num, cost: getCost(p, mode),
        mega: /^Mega(?:-|$)/i.test(p.forme ?? '') || /-Mega(?:-|$)/i.test(p.name) }))
      .filter(({ cost }) => Number.isInteger(cost) && cost >= 0);
    const upgrades = priced.filter((p) => !p.mega && p.cost <= 10).flatMap((p) =>
      ['tera', 'z'].filter((kind) => p.cost <= (kind === 'tera' ? 5 : 10))
        .flatMap((kind) => Object.entries(captainCosts)
          .filter(([, costs]) => Number.isInteger(costs[kind]) && costs[kind] > 0)
          .map(([type, costs]) => ({ ...p, upgrade: { kind, type, cost: costs[kind] } }))));
    if (!upgrades.length) return null;
    const team = [pick(upgrades)];
    const megas = priced.filter((p) => p.mega && p.species !== team[0].species);
    if (mode === 'singles' && megas.length) team.push(pick(megas));
    for (const p of shuffle(priced)) {
      if (!team.some(({ species }) => species === p.species) && (!p.mega || !team.some((member) => member.mega))) team.push(p);
      if (team.length === 4) break;
    }
    if (team.length !== 4) return null;
    referencePokemon = team.map((member) => entries.find((p) => p.num === member.species && (p.forme ? p.name : name(p)) === member.name));
    const total = team.reduce((sum, p) => sum + p.cost + (p.upgrade?.cost ?? 0), 0);
    const displayName = (p) => {
      if (!p.upgrade) return p.name;
      const { kind, type } = p.upgrade;
      return `${p.name} (${kind === 'tera' ? 'Tera-Typ' : 'Z-Kristall vom Typ'} ${types[type] ?? type})`;
    };
    const wrong = [];
    for (let value = Math.ceil(total * 65 / 100); value <= Math.floor(total * 135 / 100); value += 1) {
      const difference = Math.abs(value - total) * 100;
      if (difference && difference >= total * 15 && difference <= total * 35) wrong.push(String(value));
    }
    return question(`Wie viele Punkte würde dieses 4er-Team im ${mode === 'doubles' ? 'Doubles' : 'Singles'} nach aktuellem Stand kosten? ${shuffle(team).map(displayName).join(', ')}.`,
      String(total), shuffle(wrong).slice(0, 3),
      team.map((p) => `${displayName(p)}: ${p.cost}${p.upgrade ? ` + ${p.upgrade.cost}` : ''}`).join(' · '));
  }

  const promptKey = (result) => result.prompt === 'Welche Schreibweise ist richtig?'
    ? result.options[result.correct] : result.prompt;
  const categoryHistory = new WeakMap();
  return function generate(prize, seen = new Set(), requiredCategory = null) {
    const sources = [];
    const add = (category, generate, weight = 1) => sources.push({ category, generate, weight });
    if (!categoryHistory.has(seen)) categoryHistory.set(seen, new Map());
    const usage = categoryHistory.get(seen);
    if ([300, 500, 1000].includes(prize)) add('translation', () => translationQuestion(prize), prize === 300 ? 1 : 4);
    if (spellings.has(prize)) {
      add('spelling', () => {
        const { basic, advanced, answer, prompt } = pick(spellings.get(prize));
        referencePokemon = pool.filter((p) => p.name === answer || name(p) === answer).slice(0, 1);
        const wrong = advanced ? [pick(advanced), ...shuffle(basic).slice(0, 2)] : shuffle(basic).slice(0, 3);
        return question(prompt, answer, wrong);
      });
    }
    if (prize >= 500 && prize <= 125000) {
      add('stat-comparison', () => statQuestion(prize));
      add('stat-value', () => statQuestion(prize, true));
      add('cost-comparison', () => costQuestion(prize, false));
      add('cost-value', () => costQuestion(prize, true));
    }
    if (coverage.has(prize)) add('coverage', () => coverageQuestion(prize));
    if ([4000, 8000, 16000].includes(prize)) add('shared-three', () => sharedQuestion(prize));
    if ([8000, 16000, 32000, 64000, 125000].includes(prize)) add('shared-four', () => fourSharedQuestion(prize));
    if (abilityQuestions.get(prize)?.length) add(prize === 250000 ? 'ability-evolution' : prize >= 64000 ? 'ability-type' : 'ability-association', () => abilityQuestion(prize));
    if (prize === 500000) add('ability-pair', pairQuestion);
    if ([250000, 500000].includes(prize)) add('move-percentage', () => percentageQuestion(prize));
    if (prize === 1000000) {
      add('team-singles', () => teamQuestion('singles'));
      add('team-doubles', () => teamQuestion('doubles'));
    };
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const ordered = sources.filter((source) => !requiredCategory || source.category === requiredCategory)
        .map((source) => ({ ...source, priority: -Math.log(1 - Math.random()) / source.weight }))
        .sort((a, b) => (usage.get(a.category) ?? 0) - (usage.get(b.category) ?? 0) || a.priority - b.priority);
      for (const source of ordered) {
        difficultyDetails = '';
        referencePokemon = [];
        const result = source.generate();
        if (result && !seen.has(promptKey(result))) {
          seen.add(promptKey(result));
          if (!requiredCategory) usage.set(source.category, (usage.get(source.category) ?? 0) + 1);
          result.category = source.category;
          result.difficultyDetails = difficultyDetails || (source.category === 'translation'
            ? 'Feste Stufen: Pokémon 300, Attacken 500, Fähigkeiten 1.000. Distraktoren nach längster gemeinsamer Buchstabenfolge, dann gemeinsamen Buchstaben und ähnlicher Länge.'
            : 'Feste Schreibweisen-Stufe: 50/100 einfache Tippfehler; 200 komplexe Tippfehler; 300 komplexe Tippfehler neuerer Pokémon.');
          result.prize = prize;
          return result;
        }
      }
    }
    return null;
  };
};
