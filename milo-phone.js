window.getMiloPhonePortrait = function getMiloPhonePortrait(contact, speaker = contact.name) {
  // Host lines always use his own portrait, including calls to Pokémon.
  if (speaker === 'Günther Jauchzelot') return { src: `assets/Trainer/${encodeURIComponent('Günther')}.png`, metallic: false };
  const pokemon = { flegmon: 'slowpoke', pikachu: 'pikachu', kricketune: 'kricketune', urglmator: 'cramorant' }[contact.id];
  if (pokemon) return { src: `https://play.pokemonshowdown.com/sprites/gen5/${pokemon}.png`, metallic: contact.id === 'urglmator' };
  const aliases = {
    'Gary Eich': 'GaryEich', 'Dita Kiefsling': 'DitaKiefsling', 'Junichi Masuda': 'JunichiMasuda',
    'Schwerthold und Schildrich': 'SchwertholdundSchildrich', 'Team Rocket': 'TeamRocket', Agnieszka: 'Aga',
    'Geologe aus Alola': 'Geologe-Alola', 'Geologe aus Paldea': 'Geologe-Paldea',
    Naturbusche: 'Naturbursche', 'Obdachloser hinterm PokeMarkt': 'Obdachloser',
    'Pokémon Zensus': 'Pokemon Zensur', 'Pokémon Tutor': 'Pokemon Tutor', 'Pokémon-Verkuppler': 'Pokemon-Verkuppler',
    'Werte-Experte': 'WerteExperte', 'Trainerschulen-Hausmeister': 'Hausmeister', 'PokéLiga Vorstand': 'Pokeliga-Vorstand',
    'Roto-Dex': 'RotoDex', 'Pokémon-Züchter': 'Pokemon-Züchter', Glückspieler: 'Glücksspieler',
  };
  const file = contact.id === 'ability-expert' ? 'Ability-Expert' : aliases[contact.name] ?? contact.name;
  return { src: `assets/Trainer/${encodeURIComponent(file)}.png`, metallic: false };
};

window.createMiloPhoneContacts = function createMiloPhoneContacts(context) {
  const { question, prize, player, previousAnswer } = context;
  const answer = question.options[question.correct];
  const references = question.referencePokemon ?? [];
  const reference = references.map((p) => p.de).join(', ') || question.prompt;
  const rocketNames = new Set(['Meowth', 'Ekans', 'Arbok', 'Koffing', 'Weezing', 'Lickitung',
    'Weepinbell', 'Victreebel', 'Smoochum', 'Seviper', 'Cacnea', 'Dustox', 'Mime Jr.', 'Yanmega',
    'Kakuna', 'Woobat', 'Amoonguss', 'Frillish', 'Inkay', 'Pumpkaboo', 'Gourgeist', 'Mareanie',
    'Mimikyu', 'Morpeko', 'Bewear', 'Stufful']);
  const rocketReference = references.find((p) => rocketNames.has(p.name));
  const wobbuffet = ['woingenau', 'wobbuffet'].includes(answer.toLowerCase());
  const forcedAga = ['wegge', 'andre', 'andré', 'drew'].includes(player.trim().toLowerCase());
  const line = (speaker, text, timing) => ({ speaker, text, ...timing });
  const contacts = [];
  function add(id, name, usefulness, dialogue, forced = false) {
    contacts.push({ id, name, usefulness, dialogue, forced });
  }
  if (question.category === 'damage-comparison' && question.battle) {
    const battle = question.battle;
    const best = battle.answers.find((row) => row.label === answer);
    const number = (value) => value.toLocaleString('de-DE', {maximumFractionDigits: 4});
    if (battle.attacker.stats && battle.defender.stats) add('damage-stat-nerd', 'DamageCalc-Nerd', 'semi', () => [
      line('DamageCalc-Nerd', `Schau dir erstmal die Werte an: ${battle.attacker.de} hat ${battle.attacker.stats.atk} Angriff und ${battle.attacker.stats.spa} Spezial-Angriff. Bei ${battle.defender.de} stehen dem ${battle.defender.stats.def} Verteidigung und ${battle.defender.stats.spd} Spezial-Verteidigung gegenüber. Das sind die Werte ohne Fähigkeitsmultiplikatoren. Die Stärke der Attacke und die Fähigkeiten musst du natürlich trotzdem berücksichtigen.`),
    ]);
    add('damage-balanced-trainer', 'Ausgeglichener Trainer', 'semi', ({wrong}) => {
      const visible = battle.answers.filter((row) => row.label === answer || wrong.includes(row.label));
      const usable = visible.filter((row) => row.matchup.typeMultiplier * row.matchup.abilityTypeModifier > 0);
      const tiedFactors = usable.filter((row) => usable.some((other) => row !== other
        && row.matchup.typeMultiplier * row.matchup.abilityTypeModifier === other.matchup.typeMultiplier * other.matchup.abilityTypeModifier));
      const row = pick(tiedFactors.length ? tiedFactors : usable.length ? usable : visible);
      const factor = row.matchup;
      let text = `${row.label} trifft ${battle.defender.de} mit dem Typenfaktor ${number(factor.typeMultiplier)}.`;
      if (row.id === 'freezedry') text += ' Die besondere Wirkung von Gefriertrockner gegen Wasser ist darin bereits berücksichtigt.';
      if (factor.abilityTypeModifier !== 1) text += factor.abilityTypeModifier === 0
        ? ` ${battle.defender.abilityDe} verhindert den Schaden aber vollständig.`
        : ` Durch ${battle.defender.abilityDe} kommt zusätzlich der Faktor ${number(factor.abilityTypeModifier)} dazu.`;
      if (factor.contactModifier !== 1) text += ` Weil die Attacke Kontakt herstellt, halbiert ${battle.defender.abilityDe} ihren Schaden zusätzlich.`;
      text += ' Ob das für den höchsten Schaden reicht, musst du selbst herausfinden. Stärke, Werte und weitere Schadensfaktoren zählen ebenfalls.';
      return [line('Ausgeglichener Trainer', text)];
    });
    add('damage-analyst', 'Kampfanalytiker', 'helpful', () => {
      const details = [`Die Attacke ist ${best.category === 'Physical' ? 'physisch' : 'speziell'} und hat eine Grundstärke von ${best.power}.`];
      if (best.stab) details.push('Sie profitiert vom Typenbonus STAB.');
      details.push(`Ihr Typenfaktor gegen ${battle.defender.de} beträgt ${number(best.matchup.typeMultiplier)}.`);
      if (best.id === 'freezedry') details.push('Dabei ist die besondere Effektivität von Gefriertrockner gegen Wasser bereits eingerechnet.');
      if (best.offensePokemon === 'target') details.push('Für diese Attacke zählt der Angriff des Ziels statt des eigenen Angriffs.');
      if (best.category === 'Special' && best.defenseStat === 'def') details.push('Obwohl sie speziell ist, trifft sie die physische Verteidigung.');
      if (best.critical) details.push('Ihr garantierter Volltreffer ist eingerechnet.');
      else if (best.guaranteedCritical) details.push(`Ihr garantierter Volltreffer wird von ${battle.defender.abilityDe} verhindert.`);
      if (best.abilityEffects.length) details.push(`Die Berechnung berücksichtigt außerdem ${[...new Set(best.abilityEffects)].join(' und ')}.`);
      return [line('Kampfanalytiker', `Ich habe es durchgerechnet: ${best.label} verursacht zwischen ${best.minimum} und ${best.maximum} KP Schaden, im Durchschnitt ${number(best.average)}. Damit liegt sie vorne.`),
        line('Kampfanalytiker', details.join(' '))];
    });
  }
  if (question.learning) {
    const data = question.learning;
    const helpful = (speaker, wrong) => {
      let text;
      if (data.kind === 'evolution-delay') text = `${data.pokemon} lernt ${data.move} in Generation ${data.gen} auf Level ${data.level}. Das ist die nächste neue Level-Attacke nach dem Entwicklungslevel ${data.evolutionLevel}.`;
      else text = `${data.move} bekommt ${data.pokemon} in Generation ${data.gen} durch ${data.labels[data.method]}. ${data.kind === 'learning-generation' ? `In Generation ${data.fromGen} war es noch ${data.labels[data.from]}.` : 'Keine andere erfasste Lernmethode dieser Generation bietet diese Attacke an.'}`;
      const rows = data.rows.filter((row) => wrong.includes(row.label));
      const comparison = rows[0];
      return [line(speaker, text), ...(comparison && data.kind !== 'learning-generation' ? [line(speaker,
        `${comparison.label} ist dagegen ${comparison.level ? `auf Level ${comparison.level}` : `durch ${comparison.methods.map((method) => data.labels[method]).join(' oder ')}`} erlernbar.`)] : [])];
    };
    add('learning-reminder', 'Attackenerlerner', 'helpful', ({wrong}) => helpful('Attackenerlerner', wrong));
    if (data.kind !== 'evolution-delay' && data.method === 'M') add('learning-tm-merchant', 'TM-Händler', 'helpful', ({wrong}) => helpful('TM-Händler', wrong));
    if (data.kind !== 'evolution-delay' && data.method === 'E') add('learning-breeder', 'Pokémon-Züchter', 'helpful', ({wrong}) => helpful('Pokémon-Züchter', wrong));
    const hint = (speaker, wrong, veteran) => {
      // A direct exclusion after 50:50 would give away the answer. Supply a
      // true learnset fact instead, without naming either remaining answer.
      if (wrong.length < 2) return [line(speaker, veteran
        ? `In Generation ${data.gen} hatte ${data.pokemon} ${data.levelMoveCount} verschiedene Attacken im Level-Lernset. Vielleicht hilft dir diese Erinnerung weiter.`
        : `In Generation ${data.gen} sind für ${data.pokemon} insgesamt ${data.methodCount} verschiedene Lernmethoden erfasst. Nur eine Attacke zu kennen reicht also nicht immer.`)];
      const rejected = wrong[veteran ? wrong.length - 1 : 0];
      if (data.kind === 'learning-generation') return [line(speaker,
        `In Generation ${data.gen} bekommt ${data.pokemon} ${data.move} jedenfalls nicht durch ${rejected}. ${veteran ? 'Das hätte ich mir gemerkt.' : 'Das hatten wir gerade im Unterricht!'}`)];
      const row = data.rows.find((row) => row.label === rejected);
      return [line(speaker, data.kind === 'evolution-delay'
        ? `${row.label} lernt ${data.pokemon} in Generation ${data.gen} auf Level ${row.level}. ${veteran ? 'Damals habe ich die Entwicklung auch manchmal aufgeschoben.' : 'Das steht so in meinen Notizen.'}`
        : `${row.label} bekommt ${data.pokemon} in Generation ${data.gen} durch ${row.methods.map((method) => data.labels[method]).join(' oder ')}. ${veteran ? 'Daran erinnere ich mich noch.' : 'Das hatten wir gerade im Unterricht!'}`)];
    };
    add('learning-schoolboy', 'Schuljunge', 'semi', ({wrong}) => hint('Schuljunge', wrong, false));
    add('learning-veteran', 'Veteran', 'semi', ({wrong}) => hint('Veteran', wrong, true));
  }
  if (question.category === 'type-effectiveness' && question.typeEffectiveness) {
    const data = question.typeEffectiveness;
    const number = (value) => String(value).replace('.', ',');
    const correct = data.answers.find((row) => row.label === answer);
    const abilityEffect = (row, ability) => ability.multiplier === 0
      ? `${row.label}-Attacken vollständig abgefangen`
      : `${row.label}-Attacken um den Faktor ${number(ability.modifier)} ${ability.modifier > 1 ? 'verstärkt' : 'abgeschwächt'}`;
    add('type-safari-warden', 'Safari-Zonen Wärter', 'semi', () => [
      line('Safari-Zonen Wärter', `${data.pokemon}? Also auf dem Schild steht ${data.types.join(' und ')}. Wie sich das miteinander verrechnet, musste selber wissen.`),
    ]);
    if (data.withAbilities && data.answers.some((row) => row.changed)) {
      add('type-dream-world-visitor', 'Traumwelt-Besucher', 'semi', ({ wrong }) => {
        const affected = data.answers.filter((row) => row.changed && (row.label === answer || wrong.includes(row.label)));
        const row = pick(affected);
        if (!row) {
          const ability = pick(correct.abilities);
          return [line('Traumwelt-Besucher', `${data.pokemon} kann übrigens ${ability.name} haben. Damit wird keine deiner verbliebenen Antworten in ihrem Typenfaktor verändert. Vielleicht hilft dir das.`)];
        }
        const ability = pick(row.abilities.filter((a) => a.multiplier !== row.base));
        return [line('Traumwelt-Besucher', `${data.pokemon} kann übrigens ${ability.name} haben. Damit werden ${abilityEffect(row, ability)}. Vielleicht hilft dir das.`)];
      });
    }
    add('type-expert', 'Typen-Experte', 'helpful', ({ wrong }) => {
      const factors = data.types.map((type, index) => `${correct.label} trifft ${type} mit dem Faktor ${number(correct.factors[index])}`).join(' und ');
      const pages = [line('Typen-Experte', `Ich würde ${answer} nehmen. ${data.pokemon} ist vom Typ ${data.types.join(' und ')}. ${factors}. ${data.types.length > 1 ? 'Zusammen ergibt das' : 'Das ergibt'} ${number(correct.base)}.`)];
      if (data.withAbilities) {
        let detail;
        if (correct.maximum > correct.base) {
          const ability = correct.abilities.find((a) => a.multiplier === correct.maximum);
          detail = `Mit ${ability.name} steigt dieser Faktor sogar auf ${number(correct.maximum)}.`;
        } else if (correct.maximum < correct.base) {
          detail = `Auch unter Berücksichtigung seiner Fähigkeiten erreicht dieser Typ höchstens ${number(correct.maximum)}. Das ist unter deinen Antworten trotzdem die beste Wahl.`;
        } else {
          const competitor = data.answers.filter((row) => wrong.includes(row.label) && row.changed)
            .sort((a, b) => b.base - a.base)[0];
          if (competitor) {
            const ability = competitor.abilities.find((a) => a.multiplier !== competitor.base);
            detail = `${competitor.label} würde ohne Fähigkeiten den Faktor ${number(competitor.base)} erreichen. Mit ${ability.name} werden ${abilityEffect(competitor, ability)}. Unter allen möglichen Fähigkeiten erreicht dieser Typ höchstens ${number(competitor.maximum)}.`;
          } else detail = `Der höchste Faktor bleibt auch unter Berücksichtigung aller möglichen Fähigkeiten bei ${number(correct.maximum)}.`;
        }
        pages.push(line('Typen-Experte', `${detail} Der höchste mögliche Faktor für ${answer} beträgt also ${number(correct.maximum)}. Keine deiner anderen Antworten erreicht diesen Wert.`));
      }
      return pages;
    });
  }
  if (prize === 1000000) {
    const hints = question.team?.phoneHints;
    const draft = hints?.draft ?? (question.team?.cards ?? []).map((card) => {
      const p = window.POKEDEX_ENTRIES?.find((p) => p.name === card.pokemonName);
      return { name: p?.names?.de ?? card.pokemonName, cost: card.cost, selectable: card.variant !== 'mega' };
    });
    add('million-draft-expert', 'Draft-Experte', 'semi', () => [
      line('Draft-Experte', 'Alles klar, ich kann dir den Wert für ein Pokémon sagen.'),
      { ...line('Draft-Experte', 'Welches Pokémon? Du kannst genau eines auswählen.'), singleChoice: true,
        choices: draft.map((p) => ({ label: p.name, disabled: !p.selectable,
          response: line('Draft-Experte', `${p.name}? Okay, in dieser Form ohne weitere Gimmicks kostet es ${p.cost} ${p.cost === 1 ? 'Punkt' : 'Punkte'}.`) })) },
    ]);
    add('million-gimmick-fan', 'Gimmick-Fan', 'semi', () => {
      if (!hints) return [line('Gimmick-Fan', 'Für dieses Team fehlen mir gerade die Gimmick-Kostendaten.')];
      let text = `Schauen wir mal. Also ${hints.z.typeName}-Z würde in dieser Form ${hints.z.cost} ${hints.z.cost === 1 ? 'Punkt' : 'Punkte'} zusätzlich kosten. Und Tera-${hints.tera.typeName} käme auf zusätzliche ${hints.tera.cost} ${hints.tera.cost === 1 ? 'Punkt' : 'Punkte'}.`;
      if (hints.mega) {
        const { name, baseName, difference } = hints.mega;
        text += difference === 0 ? ` ${name} ist genauso teuer wie ${baseName}.`
          : ` ${name} ist ${Math.abs(difference)} ${Math.abs(difference) === 1 ? 'Punkt' : 'Punkte'} ${difference > 0 ? 'teurer' : 'günstiger'} als ${baseName}.`;
      }
      return [line('Gimmick-Fan', text)];
    });
    add('million-comparison-master', 'Vergleichsmeister', 'semi', () => {
      const rows = hints?.comparisons;
      if (!rows?.length) return [line('Vergleichsmeister', 'Für dieses Team habe ich gerade keinen passenden Preisvergleich.')];
      return [line('Vergleichsmeister', `${rows[0].reference} ist genauso teuer wie ${rows[0].comparison}. Das gleiche gilt für ${rows[1].reference} und ${rows[1].comparison}, ${rows[2].reference} ohne Z-Kristall und ${rows[2].comparison}, sowie ${rows[3].reference} ohne Terakristallisierung und ${rows[3].comparison}.`)];
    });
    return contacts;
  }
  if (question.category === 'cost-value' && question.upgradeCost) {
    const { kind, typeName, surcharge } = question.upgradeCost;
    if (kind === 'z') {
      const symbol = typeName.slice(0, 2);
      add('alola-geologist', 'Geologe aus Alola', 'helpful', () => [
        line('Geologe aus Alola', `${typeName}-Z-Kristall? Ach, die Laienbezeichnung für (${symbol},Ca)(Mg,Li,Al,${symbol}2+,Fe3+)3(Al,Mg,Cr)6(BO3)3Si6O18(OH,O,F)4! Nun dieser Stein wird soweit ich weiss mit ${surcharge} besteuert, und sein Träger darf höchstens 10 Punkte kosten.`),
      ]);
    } else if (kind === 'tera') {
      add('paldea-geologist', 'Geologe aus Paldea', 'helpful', () => [
        line('Geologe aus Paldea', `Ein wunderschöner Glanz! Das ist ein ${typeName}-Kristall, nicht wahr? Diese kosten normalerweise ${surcharge}. Mit diesem Kristall dürfte sein Träger daher insgesamt maximal ${5 + surcharge} kosten.`),
        line('Geologe aus Paldea', 'Wie ich den Glanz über das Telefon sehen kann? ... Halt die Fresse.'),
      ]);
    }
  }
  const specialists = {
    spe: ['Rennradfahrer', 'seine Initiative'],
    atk: ['Schwarzgurt', 'sein Angriff'],
    spa: ['Hexe', 'sein Spezial-Angriff'],
    def: ['Wanderer', 'seine Verteidigung'],
    spd: ['Psycho', 'seine Spezial-Verteidigung'],
    hp: ['Krankenschwester', 'sein KP-Basiswert'],
    bst: ['Veteran', 'seine Basiswertsumme'],
    singles: ['Schiedsrichter', 'sein Singles-Punktwert'],
    doubles: ['Zwillinge', 'sein Doubles-Punktwert'],
  };
  const comparison = question.comparison;
  if (['stat-comparison', 'cost-comparison'].includes(question.category) && comparison) {
    const specialist = specialists[comparison.stat === 'cost' ? comparison.mode : comparison.stat];
    if (specialist) {
      const [speaker, stat] = specialist;
      add('comparison-schoolboy', 'Schuljunge', 'semi', () => [
        line('Schuljunge', `${comparison.reference.name} also? Nun ${stat} beträgt ${comparison.reference.value}!`),
      ]);
      add(`comparison-specialist-${comparison.stat === 'cost' ? comparison.mode : comparison.stat}`, speaker, 'helpful', ({ wrong }) => {
        const rejected = comparison.options.filter((option) => wrong.includes(option.name))
          .sort((a, b) => comparison.direction < 0 ? b.value - a.value : a.value - b.value)[0];
        return [line(speaker, `${comparison.reference.name} also? Nun ${stat} beträgt ${comparison.reference.value}! Zum Vergleich hat ${rejected.name} einen Wert von ${rejected.value}. Damit scheidet das als Antwort schon mal aus.`)];
      });
    }
  }
  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  if (prize > 1000 || (prize === 1000 && question.category === 'type-effectiveness')) {
    add('kricketune', 'Zirpeise', 'useless', () => [
      { ...line('Zirpeise', 'Delele whooooo'), stream: 'kricketune' },
    ]);
  }
  if (question.category === 'nature-effect' && question.natureQuestion) {
    const { nature } = question.natureQuestion;
    const pool = (window.POKEDEX_ENTRIES ?? []).filter((p) => !p.hidden && !p.impossible && !p.unreleased);
    const matches = (p, highest, lowest) => Object.entries(p.baseStats).every(([stat, value]) =>
      (stat === highest || p.baseStats[highest] - value > 15)
      && (stat === lowest || value - p.baseStats[lowest] > 15));
    const fitting = pool.filter((p) => matches(p, nature.plus, nature.minus));
    const contrary = pool.filter((p) => matches(p, nature.minus, nature.plus));
    if (fitting.length && contrary.length) {
      add('nature-outdoorsman', 'Naturbusche', 'semi', () => {
        const first = pick(fitting), second = pick(contrary);
        return [line('Naturbusche', `${nature.de} also? Also ich hatte mal ein ${first.names?.de ?? first.name}, das war ordentlich ${nature.de.toLocaleLowerCase('de-DE')}. Mein ${second.names?.de ?? second.name} eher weniger.`)];
      });
    }
  }
  if (question.category === 'nature-choice' && question.natureQuestion) {
    const { stat, direction } = question.natureQuestion;
    const labels = { atk: 'Angriff', def: 'Verteidigung', spa: 'Spezial-Angriff', spd: 'Spezial-Verteidigung', spe: 'Initiative' };
    const feminine = ['def', 'spd', 'spe'].includes(stat);
    const adjective = direction === 1 ? feminine ? 'hohe' : 'hoher' : feminine ? 'niedrige' : 'niedriger';
    const alternatives = (window.POKEMON_NATURES ?? []).filter((n) => n[direction === 1 ? 'plus' : 'minus'] === stat
      && !question.options.includes(n.de));
    if (alternatives.length >= 3) {
      add('pokemart-homeless', 'Obdachloser hinterm PokeMarkt', 'semi', () => {
        const names = shuffle(alternatives).slice(0, 3).map((n) => n.de);
        return [line('Obdachloser hinterm PokeMarkt', `Besonders ${adjective} ${labels[stat]}? Hast dus mal mit ${names[0]}, ${names[1]} oder ${names[2]} versucht?`)];
      });
    }
  }
  if (['nature-effect', 'nature-choice'].includes(question.category) && question.natureQuestion) {
    const { nature, stat, direction } = question.natureQuestion;
    const labels = { atk: 'Angriff', def: 'Verteidigung', spa: 'Spezial-Angriff', spd: 'Spezial-Verteidigung', spe: 'Initiative' };
    add('mint-merchant', 'Minzenhändler', 'helpful', () => [line('Minzenhändler', question.category === 'nature-effect'
      ? `${nature.de}? Dafür habe ich eine Minze! Die stärkt ${labels[nature.plus]}, schwächt allerdings ${labels[nature.minus]}.`
      : `Für ${direction === 1 ? 'mehr' : 'weniger'} ${labels[stat]} würde ich ${nature.de} empfehlen. Die passende Minze habe ich zufällig vorrätig.`)]);
  }
  if (question.category === 'move-percentage' && question.movePercentage) {
    const data = question.movePercentage;
    const values = question.options.map((option) => Number(option.replace('%', '')));
    const anchors = [50, 25, 10, 75, 66.6, 33.3, 100];
    const ranges = anchors.flatMap((first) => anchors.filter((second) => second !== first)
      .map((second) => ({ first, second }))).filter(({ first, second }) => {
      const matches = values.map((value) => Math.abs(value - first) < Math.abs(value - second));
      return matches[question.correct] && matches.filter(Boolean).length === 2;
    });
    if (ranges.length) {
      const range = pick(ranges);
      add('estimator', 'Schätzmeister', 'semi', () => [
        line('Schätzmeister', `Hmm... also die richtige Antwort sollte definitiv näher an ${range.first.toLocaleString('de-DE')}% sein als an ${range.second.toLocaleString('de-DE')}%.`),
      ]);
    }
    add('pokemon-census', 'Pokémon Zensus', 'semi', ({ wrong }) => {
      const majority = data.learners / data.total > 0.5;
      const remaining = wrong.map((option) => Number(option.replace('%', '')));
      const keepsWrong = data.learners * 2 !== data.total && remaining.some((value) => majority ? value > 50 : value <= 50);
      const ending = keepsWrong ? ` Da bin ich überfragt, aber ist eine ${majority ? 'Mehrheit' : 'Minderheit'} würde ich meinen.` : ' Da bin ich überfragt.';
      return [line('Pokémon Zensus', `Nun, ich kann dir sagen es gibt ${data.total} ${data.typeName}-Pokémon, und ${data.allLearners} im allgemeinen. Wie viele davon vom Typ ${data.typeName} sind?${ending}`)];
    });
    add('pokemon-tutor', 'Pokémon Tutor', 'helpful', ({ wrong }) => {
      const correct = values[question.correct];
      const candidates = wrong.map((option) => ({ option, value: Number(option.replace('%', '')) }))
        .sort((a, b) => Math.abs(b.value - correct) - Math.abs(a.value - correct));
      const first = candidates[0];
      const second = candidates.find((row) => (row.value < correct) !== (first.value < correct)) ?? candidates[1];
      const compare = (row) => correct > row.value ? 'mehr' : 'weniger';
      return [line('Pokémon Tutor', `Ah. keine infache Frage... nun es sind definitiv ${compare(first)} als ${first.option}.${second ? ` Ich denke aber es sind auch ${compare(second)} als ${second.option}.` : ''} Mehr kann ich nicht sagen.`)];
    });
  }
  if (question.category === 'ability-pair' && question.abilityPair) {
    const rows = question.abilityPair.options;
    add('ability-matchmaker', 'Pokémon-Verkuppler', 'semi', ({ wrong }) => {
      const rejected = rows.filter((row) => wrong.includes(row.name)).sort((a, b) => a.shared - b.shared).slice(0, 2);
      return [line('Pokémon-Verkuppler', `Fähigkeiten, wie schön. Nun leider kann ich dir sagen, dass Pärchen mit ${rejected.map((row) => row.name).join(' and ')} nicht gut funktionieren. ${rejected.length === 2 ? 'Die beiden sind' : 'Die ist'} einfach zu selten kompatibel.`)];
    });
    const expertise = pick(rows);
    add('ability-expert', `${expertise.name}-Experte`, 'semi', ({ wrong }) => {
      const row = expertise.name === answer || wrong.includes(expertise.name) ? expertise
        : pick(rows.filter((item) => item.name === answer || wrong.includes(item.name)));
      return [line(`${row.name}-Experte`, `${row.name} gibt es auf jeden Fall auf ${row.count} Pokémon. Sie wird mit ${row.partners} verbunden werden, falls dir das weiterhilft.`)];
    });
    const description = rows.find((row) => row.name === answer)?.description;
    if (description) add('ability-capsule-addict', 'Fähigkeitenkapsel-Junkie', 'helpful', () => [
      line('Fähigkeitenkapsel-Junkie', description),
      line('Fähigkeitenkapsel-Junkie', '...was? Hab ich was gesagt?'),
    ]);
  }
  if (question.category === 'stat-value' && question.numericStat) {
    const data = question.numericStat;
    const feminine = ['def', 'spd', 'spe', 'bst'].includes(data.stat);
    add('larry', 'Aoki', 'semi', () => [
      line('Aoki', `Hey man, was willst du? Ach, ${data.label} von ${data.pokemon}? Nun, mein Boss zieht mir die Ohren lang wenn ich dir das direkt verrate. Aber naja, du hast schon angerufen. Also ${feminine ? 'die' : 'der'} durchschnittliche ${data.label} liegt bei ${data.average.toLocaleString('de-DE', { maximumFractionDigits: 1 })}, da liegt ${data.pokemon} schon im ${data.third} Drittel. So, ich muss noch Überstunden machen. Bis dann.`),
    ]);
    add('stat-value-expert', 'Werte-Experte', 'helpful', () => {
      const benchmark = data.stat === 'bst' ? 500 : 100;
      if (benchmark === data.value) return [line('Werte-Experte', `Das willst du wissen? Nun, wenn du ${benchmark} gesagt hättest, lägest du genau richtig.`)];
      const error = Math.abs(benchmark - data.value) / data.value * 100;
      const band = error < 25 ? 'weniger als 25%' : error <= 50 ? 'zwischen 25% und 50%' : error <= 75 ? 'zwischen 50% und 75%' : 'mehr als 75%';
      return [line('Werte-Experte', `Das willst du wissen? Nun, wenn du ${benchmark} gesagt hättest, lägest du um ${band} zu ${benchmark < data.value ? 'niedrig' : 'hoch'}.`)];
    });
  }
  if (comparison && ['stat-comparison', 'cost-comparison'].includes(question.category)) {
    const label = specialists[comparison.stat === 'cost' ? comparison.mode : comparison.stat]?.[1].replace(/^seine? /, '');
    if (label) add('school-caretaker', 'Trainerschulen-Hausmeister', 'semi', ({ wrong }) => {
      const row = pick(comparison.options.filter((option) => option.name === answer || wrong.includes(option.name)));
      const fact = comparison.stat === 'cost'
        ? `${row.name} kostet ${row.value} Punkte im ${comparison.mode === 'doubles' ? 'Doubles' : 'Singles'}`
        : `${row.name} hat bei ${label} einen Wert von ${row.value}`;
      return [line('Trainerschulen-Hausmeister', `Also ich bin mir ziemlich sicher ${fact}. Mehr kann ich nich sagen.`)];
    });
  }
  if (question.category === 'cost-value' && question.numericCost) {
    const data = question.numericCost;
    if (!question.upgradeCost) {
      const limits = [{ value: 5, item: 'Tera' }, { value: 10, item: 'Z' },
        ...(data.paradox ? [{ value: 15, item: 'Booster-Energie' }] : [])];
      const nearest = limits.sort((a, b) => Math.abs(a.value - data.value) - Math.abs(b.value - data.value))[0];
      const legal = data.value <= nearest.value;
      const difference = legal ? nearest.value + 1 - data.value : data.value - nearest.value;
      add('league-board', 'PokéLiga Vorstand', 'helpful', () => [
        line('PokéLiga Vorstand', `Also ich sach mal so, ne, wenn dat Viech noch ${difference} Punkte ${legal ? 'mehr' : 'weniger'} kosten würde, dann könnteste dat ${legal ? 'nich mit' : 'mit'} ${nearest.item} spielen, nech?`),
      ]);
    } else {
      const upgrade = question.upgradeCost;
      const limit = upgrade.kind === 'tera' ? 5 : 10;
      add('tactician', 'Taktiker', 'semi', () => [
        line('Taktiker', `Also mit ${upgrade.kind === 'tera' ? 'Tera' : 'Z'}? Ja da hattest echt Glück ne, wenn der Grundpreis von ${data.pokemon} ${limit + 1 - data.value} mehr wäre, dann könnteste den nicht mit ${upgrade.kind === 'tera' ? 'Tera' : 'Z'} spielen.`),
      ]);
    }
  }
  if (prize < 1000) {
    add('pikachu', 'Pikachu', 'useless', () => {
      const sounds = ['pika', 'pika-pi', 'pi', 'kaa', 'chu', 'kachu', 'pipi-chu', 'pikachu-chu', 'pikapi', 'pikachu'];
      const lines = Array.from({ length: 10 }, () => {
        const words = [];
        let sentenceStart = true;
        let commas = 0;
        const chunks = [...pick([[5, 5, 5, 5], [6, 7, 7], [7, 6, 7], [7, 7, 6]])];
        let nextPunctuation = chunks.shift();
        for (let index = 1; index <= 20; index += 1) {
          let word = pick(sounds);
          if (sentenceStart) word = word[0].toUpperCase() + word.slice(1);
          sentenceStart = false;
          if (index === nextPunctuation || index === 20) {
            const period = index === 20 || commas === 2 || Math.random() < 0.5;
            word += period ? '.' : ',';
            sentenceStart = period;
            commas = period ? 0 : commas + 1;
            nextPunctuation = index + (chunks.shift() ?? 0);
          }
          words.push(word);
        }
        return line('Pikachu', words.join(' '));
      });
      return [...lines, line('Günther Jauchzelot', 'Okay, die Zeit ist um. Ich hoffe das war hilfreich.')];
    });
  }
  const missingAbility = ['ability-association', 'ability-type', 'ability-evolution'].includes(question.category);
  const abilityInfo = question.pokemonAbilities;
  if (missingAbility && abilityInfo && references.length === 1) {
    const pokemon = references[0].de;
    const actual = question.options.filter((_, index) => index !== question.correct);
    if (abilityInfo.hidden || abilityInfo.regular.length) {
      add('dream-world-visitor', 'Traumwelt-Besucher', 'semi', ({ wrong }) => {
        const hidden = abilityInfo.hidden && wrong.includes(abilityInfo.hidden);
        const ability = hidden ? abilityInfo.hidden : abilityInfo.regular.find((name) => wrong.includes(name)) ?? wrong[0];
        const slot = hidden ? 'versteckte' : ability === abilityInfo.regular[0] ? 'erste' : 'andere';
        return [line('Traumwelt-Besucher', `Du weißt das vielleicht nicht, aber die ${slot} Fähigkeit von ${pokemon} ist ${ability}.`)];
      });
    }
    if (abilityInfo.descriptions?.length === 3 && abilityInfo.descriptions.every((row) => row.description)) {
      add('roto-dex', 'Roto-Dex', 'helpful', ({ wrong }) => {
        const definitions = abilityInfo.descriptions.filter((row) => wrong.includes(row.name));
        return [...definitions.map((row, index) => ({
          ...line('Roto-Dex', `${index === 0 ? 'Bzzzt... ' : ''}${row.description}`), theme: 'roto',
        })), { ...line('Roto-Dex', `... Bzzzt... keine weiteren Definitionen gefunden für ${pokemon}.`), theme: 'roto' }];
      });
    }
    if (abilityInfo.regular.length && abilityInfo.hidden) {
      add('urglmator', 'Urglmator', 'semi', ({ wrong }) => {
        const regular = abilityInfo.regular.filter((ability) => wrong.includes(ability));
        const hiddenVisible = wrong.includes(abilityInfo.hidden);
        const text = regular.length && hiddenVisible
          ? `HIER IHR ITEM: EIN FÄHIGKEITEN-PFLASTER. NUTZEN SIE ES, UM ${pokemon.toUpperCase()}S ${regular[0].toUpperCase()} ZU ${abilityInfo.hidden.toUpperCase()} ZU ÄNDERN.`
          : `HIER IHR ITEM: EIN FÄHIGKEITEN-PFLASTER. BESTÄTIGTE FÄHIGKEIT FÜR ${pokemon.toUpperCase()}: ${wrong[0].toUpperCase()}.`;
        return [
          { ...line('Urlgmator', 'Brrrrt.... Ding.'), theme: 'matrix' },
          { ...line('Urlgmator', text), theme: 'matrix' },
        ];
      });
    }
    const prevo = abilityInfo.preEvolution;
    const shared = prevo?.abilities.filter((ability) => actual.includes(ability)) ?? [];
    const exclusive = prevo?.abilities.filter((ability) => !actual.includes(ability) && question.options.includes(ability)) ?? [];
    if (shared.length && exclusive.length) {
      add('pokemon-breeder', 'Pokémon-Züchter', 'semi', ({ wrong }) => {
        const available = shared.filter((ability) => wrong.includes(ability));
        const pair = shuffle([...(available.length ? [pick(available)] : []), pick(exclusive)]);
        return [line('Pkmn-Züchter', `Hallöchen. Hmm also mit ${pokemon} kenne ich mich nicht aus, aber ${prevo.name} lernt ${pair.join(' and ')}.`)];
      });
    }
  }
  if (question.category === 'coverage' && references.length === 1) {
    add('move-reminder', 'Attackenerlerner', 'helpful', ({ wrong }) => [
      line('Attackenerlerner', `Wenn ich deinem ${references[0].de} ${answer} beibringen soll, dann komm mit einer Herzschuppe wieder. Wenn ich deinem ${references[0].de} ${pick(wrong)} beibringen soll, dann träum weiter.`),
    ]);
  }
  const sharedMove = ['shared-three', 'shared-four'].includes(question.category);
  if (sharedMove || question.category === 'coverage') {
    const move = question.answerMoves?.[question.correct];
    const alternatives = question.answerMoves?.filter((other, index) => other && index !== question.correct) ?? [];
    if (move && ['Physical', 'Special', 'Status'].includes(move.category)) {
      const category = { Physical: 'physisch', Special: 'speziell', Status: 'status' }[move.category];
      add('balanced-trainer', 'Ausgeglichener Trainer', 'semi', () => [
        line('Ausgeglichener Trainer', `Ha, gute Frage. Also die Attacke die du suchst ist auf jeden Fall ${category}.`),
      ]);
    }
    if (move && Number.isFinite(move.accuracy) && move.accuracy > 0 && move.accuracy < 100) {
      add('gambler', 'Glückspieler', 'semi', () => [
        line('Glückspieler', `Hmm, der Name der Attacke fällt mir gerade nicht ein, aber ich weiß sie ist bei mir neulich dreimal in Folge daneben gegangen. Kannst du dir das vorstellen? Dreimal in Folge! Bei ${move.accuracy} Genauigkeit!!`),
      ]);
      contacts.at(-1).weight = alternatives.some((other) => Number.isFinite(other.accuracy) && other.accuracy > 0 && other.accuracy < 100) ? 3 : 1;
    }
    if (move?.accuracy === 100 && move.category !== 'Status' && Number.isFinite(move.basePower) && move.basePower > 0
      && references.length && references.every((p) => Array.isArray(p.types))) {
      const sharing = references.filter((p) => p.types.includes(move.type));
      const power = (move.basePower * 1.5).toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      let hint;
      if (!sharing.length) hint = `Wenn diese Attacke nur STAB hätte, dann wäre sie bei ${power}!`;
      else if (sharing.length === references.length) hint = `STAB mit eingerechnet hat die ${power}!`;
      else hint = `Bei ${pick(sharing).de} sind das stolze ${power}!`;
      add('damagecalc-nerd', 'DamageCalc-Nerd', 'semi', () => [
        line('DamageCalc-Nerd', `Welche Attacke? Pah, das kann ich dir sagen, aber finde es mal selbst raus. ${hint} Den Moveset Typ verrate ich dir doch nicht!`),
      ]);
      contacts.at(-1).weight = alternatives.some((other) => other.category !== 'Status' && other.basePower > 0
        && Math.abs(other.basePower - move.basePower) <= 20) ? 3 : 1;
    }
  }
  const relationships = question.moveLearners;
  if (sharedMove && relationships?.length === 4) {
    add('move-tutor-wife', 'Frau vom Attacken-Tutor', 'helpful', ({ wrong }) => [{
      ...line('Frau vom Attacken-Tutor', 'Okay Liebchen, was ist denn deine Vermutung?'),
      choices: question.options.filter((option, index) => index === question.correct || wrong.includes(option)).map((option) => {
        const row = relationships.find((item) => item.option === option);
        const correct = option === answer;
        const text = correct
          ? `Hm also ${references[0].de} und ${references[1].de} lernen diese Attacke... ${references.slice(2).map((p) => p.de).join(' und ')}... ja doch, ich glaube das passt!`
          : `Oh... bist du dir sicher? Ich glaube nicht das ${pick(row.nonLearners)} ${option} lernt, oder?`;
        return { label: option, response: line('Frau vom Attacken-Tutor', text) };
      }),
    }]);
    if (prize <= 32000 && relationships.filter((row) => row.option !== answer).every((row) => row.nonLearners.length)) {
      add('move-deleter', 'Attackenverlerner', 'semi', ({ wrong }) => {
        const rejected = wrong.slice(0, 2).map((option) => relationships.find((row) => row.option === option));
        const firstPokemon = pick(rejected[0].nonLearners);
        const first = `Ich kann dein ${firstPokemon} leider nicht ${rejected[0].option} vergessen lassen, da es das gar nicht lernen kann.`;
        if (rejected.length === 1) return [line('Attackenverlerner', first)];
        const otherPokemon = rejected[1].nonLearners.filter((pokemon) => pokemon !== firstPokemon);
        const secondPokemon = pick(otherPokemon.length ? otherPokemon : rejected[1].nonLearners);
        return [line('Attackenverlerner', `${first} Auch dein ${secondPokemon} kann leider nicht ${rejected[1].option} verlernen, hörst du mir überhaupt zu?`)];
      });
    }
    if (prize >= 64000 && relationships.every((row) => row.learners.length >= 2)) {
      add('tm-merchant', 'TM-Händler', 'semi', ({ wrong }) => {
        const visible = shuffle(relationships.filter((row) => row.option === answer || wrong.includes(row.option)));
        const clauses = visible.map((row, index) => {
          const [first, second] = shuffle(row.learners);
          if (index === 0) return `${row.option}? Hm... ja, die TM könntest du ${first} oder ${second} beibringen.`;
          if (index === 1) return `${row.option} wäre etwas für ${first} oder ${second}.`;
          if (index === 2) return `Bei ${row.option} kämen mir ${first} und ${second} in den Sinn.`;
          return `Und bei ${row.option} natürlich ${first} und ${second}.`;
        });
        return [line('TM-Händler', clauses.join(' '))];
      });
    }
  }
  if (question.options.length === 4 && question.options.every((option) => /^\d+$/.test(option))) {
    let estimates;
    add('achromas', 'Achromas', 'semi', ({ wrong }) => {
      if (!estimates) {
        const numeric = question.options.map(Number);
        const correct = numeric[question.correct];
        const distances = numeric.map((value) => Math.abs(value - correct));
        const tiers = [500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
        const difficulty = Math.max(0, tiers.indexOf(prize)) / (tiers.length - 1);
        const rankedDistances = distances.map((distance, index) => ({ distance, index, tie: Math.random() }))
          .filter(({ index }) => index !== question.correct)
          .sort((a, b) => a.distance - b.distance || a.tie - b.tie);
        const [nearest, middle, farthest] = rankedDistances;
        const rivalChance = 34 + Math.floor(Math.random() * 7);
        const noise = (Math.random() * 2 - 1) * (2 + 2 * difficulty);
        const correctChance = Math.max(34, Math.min(40,
          Math.round(rivalChance + 2 * (1 - difficulty) + noise)));
        const separation = (farthest.distance - middle.distance) / Math.max(1, farthest.distance);
        const farthestChance = Math.round(4 + Math.random() * 4 + 3 * (1 - separation));
        const weights = new Array(4);
        weights[question.correct] = correctChance;
        weights[nearest.index] = rivalChance;
        weights[farthest.index] = farthestChance;
        weights[middle.index] = 100 - correctChance - rivalChance - farthestChance;
        estimates = weights;

      }
      const visible = question.options.map((option, index) => ({ option, index }))
        .filter(({ index, option }) => index === question.correct || wrong.includes(option));
      const total = visible.reduce((sum, { index }) => sum + estimates[index], 0);
      const shares = visible.map(({ index }) => estimates[index] / total * 100);
      const percentages = shares.map(Math.floor);
      const remainderOrder = shares.map((share, index) => ({ index, fraction: share - percentages[index] }))
        .sort((a, b) => b.fraction - a.fraction);
      const remainder = 100 - percentages.reduce((sum, value) => sum + value, 0);
      for (let i = 0; i < remainder; i += 1) percentages[remainderOrder[i].index] += 1;
      const correctPosition = visible.findIndex(({ index }) => index === question.correct);
      const ranked = percentages.map((value, index) => ({ value, index })).sort((a, b) => b.value - a.value);
      if (ranked.filter(({ value }) => value > percentages[correctPosition]).length > 1) {
        const second = ranked[1].index;
        [percentages[correctPosition], percentages[second]] = [percentages[second], percentages[correctPosition]];
      }
      if (visible.length === 2) {
        // Keep the remaining wrong answer below 50% after eliminating the other two.
        const correctChance = Math.max(51, percentages[correctPosition]);
        percentages[correctPosition] = correctChance;
        percentages[1 - correctPosition] = 100 - correctChance;
      }
      const text = visible.map(({ option }, index) => `${option} hat eine ${percentages[index]}% Chance korrekt zu sein.`).join(' ');

      return [{ ...line('Achromas', `Ich kalkuliere... ${text} Messungenauigkeiten können auftreten.`),
        estimates: visible.map(({ index }, position) => ({ index, percent: percentages[position] })) }];
    });
  }
  if (question.category === 'spelling' && prize <= 100) {
    add('gary', 'Gary Eich', 'helpful', () => [
      line('Gary Eich', `Hey ${player}! Bist du wirklich so ein nutzloser Amateur, das du nicht einmal weißt wie man ${answer} schreibt?`),
      line('Gary Eich', 'Naja, ich habe bereits drei Orden verdient, also beeil dich mal lieber. Wir riechen uns später, loser!'),
    ]);
  }
  if (prize <= 500) {
    add('sephiron', 'Sephiron', 'semi', ({ wrong }) => [
      line('Sephiron', "Alter die Weintrauben hier sind echt geil. Mega... hä, worum geht's?"),
      line('Sephiron', `Achso ja äh, ich meine ${wrong[0]}. Wobei, nee quatsch, richtige Antwort is⸺`),
    ]);
    add('frank', 'Frank', 'useless', () => [
      line('Frank', '.... .... .... ....', { interval: 2000 }),
      { ...line('Günther Jauchzelot', 'Äh, scheint als wäre der gute Herr nicht erreichbar. Naja. Dann bekommen sie den Telefonjoker erstattet. Aber erst bei der nächsten Frage!'), refund: true },
    ]);
  }
  if ([100, 200].includes(prize) && previousAnswer) {
    add('flegmon', 'Flegmon', 'useless', () => [
      line('Flegmon', 'Ich... glaube... die... Antwort... auf... diese... Frage... ist...', { interval: 1500 }),
      line('Flegmon', `Ja... genau... die... Antwort... ist... ${previousAnswer}.`, { interval: 1500 }),
    ], true);
  }
  if (question.category === 'translation') {
    if (prize === 1000) {
      add('junichi-masuda', 'Junichi Masuda', 'useless', ({ wrong }) => {
        const alternatives = shuffle(wrong);
        const text = [
          'この質問をありがとうございます。',
          `この問題では、選択肢${alternatives[0]}は誤りです。`,
          `一方、選択肢${answer}は正解です。`,
          ...(alternatives[1] ? [`選択肢${alternatives[1]}も誤りです。`] : []),
          ...(alternatives[2] ? [`選択肢${alternatives[2]}を選べば、不正解となります。`] : []),
          'お役に立てれば幸いです。',
        ].join('\n');
        return [line('増田順一', text)];
      });
    }
    if ([500, 1000].includes(prize)) {
      add('swordward-shielbert', 'Schwerthold und Schildrich', 'semi', ({ wrong }) => {
        const alternatives = shuffle([answer, pick(wrong)]);
        return [
          line('Schildrich', `Mein über die Maßen hochgeschätzter Schwerthold, so mir gestattet sei, das Ergebnis meiner alleruntertänigsten Erwägungen vor Euch auszubreiten, dünkt mich, es könne die Erwiderung schlechterdings nur ${alternatives[0]} lauten. Jedwede anderweitige Fügung widerstritte der Ordnung der Dinge aufs Empfindlichste.`),
          line('Schwerthold', `Allein, mein vortrefflichster Schildrich, geruht doch zu erwägen, ob nicht auch ${alternatives[1]} mit einer solchen Anmut der Wahrscheinlichkeit einherzuschreiten beliebe, dass man ihr die Gunst geneigter Betrachtung kaum versagen dürfte?`),
          line('Schildrich', 'Fürwahr, mein Teuerster, Euer Einwurf nötigt meiner Überzeugung die tiefste Reverenz ab. Mithin wird die Wahrheit, so sie sich endlich zu erkennen zu geben geruht, unter einer dieser beiden Gestalten vor uns zu erscheinen haben.'),
          line('Schwerthold', 'Ganz wie Ihr zu befinden geruht. Eine der beiden muss es sein, und zwar mit einer Endgültigkeit, wider welche selbst der hartnäckigste Zweifel keinen Audienztermin mehr zu erwirken vermöchte.'),
          line('Schwerthold und Schildrich', 'Ohohohohoho!'),
        ];
      });
    }
    add('dita', 'Dita Kiefsling', prize >= 500 ? 'helpful' : 'semi', ({ wrong }) => [
      line('Dita Kiefsling', prize === 300 && wrong.length >= 2
        ? `Oh come on, think about it, scatterbrain! It's obviously not ${wrong[0]} or ${wrong[1]}, is it?`
        : `Oh come on, think about it, scatterbrain! It's obviously not ${wrong[0]}, is it?`),
    ]);
  }
  if (references.length || wobbuffet) {
    add('rocket', 'Team Rocket', rocketReference || wobbuffet ? 'helpful' : 'useless', () =>
      wobbuffet ? [line('Woingenau', 'Woingenau!')]
        : rocketReference ? [line('Mauzi', `Tja Knirps, da staunst du über unser ${rocketReference.de}, was? Da kann dein Pikachu einpacken. Die richtige Antwort ist ${answer}, miauz, genau!`)]
          : [line('Jessie', 'Gleich gibt es Ärger!'), line('James', 'Und es kommt noch härter!'),
            line('Jessie', 'Denn wir haben keine Ahnung!'), line('James', 'Tschüss, Knirps!')],
    Boolean(rocketReference || wobbuffet));
  }
  if (forcedAga) {
    add('aga', 'Agnieszka', 'helpful', () => [
      line('Aga', `Jebać to, chłopie. Nie mam pojęcia. Kurwa mać, o czym ty w ogóle mówisz. Do kurwy nędzy. Może coś w stylu ${answer}. A jak nie, to wypierdalać. Ten typ tu papla coś o ${reference}. Mam już tego dość`),
    ], true);
  }
  if (prize === 1000000 && !wobbuffet) {
    const rocket = contacts.find((contact) => contact.id === 'rocket');
    if (rocket) rocket.forced = false;
  }
  return contacts;
};

window.selectMiloPhoneContacts = function selectMiloPhoneContacts(context) {
  function shuffled(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  const candidates = window.createMiloPhoneContacts(context);
  if (context.prize === 1000000) return candidates;
  const selected = candidates.filter((contact) => contact.forced);
  const remaining = shuffled(candidates.filter((contact) => !contact.forced));
  const { prize } = context;
  let slots = prize < 500 ? ['useless', 'flexible', 'flexible']
    : prize <= 64000 ? ['useless', 'semi', 'helpful']
      : prize < 1000000 ? ['semi', 'semi', 'helpful'] : ['semi', 'semi', 'semi'];
  for (const contact of selected) {
    const match = slots.indexOf(contact.usefulness);
    slots.splice(match >= 0 ? match : slots.lastIndexOf('flexible') >= 0 ? slots.lastIndexOf('flexible') : slots.length - 1, 1);
  }
  for (const slot of slots) {
    const matching = remaining.filter((contact) => slot === 'flexible'
      ? contact.usefulness !== 'useless' || selected.filter((item) => item.usefulness === 'useless').length < 2
      : contact.usefulness === slot);
    const totalWeight = matching.reduce((sum, contact) => sum + (contact.weight ?? 1), 0);
    let draw = Math.random() * totalWeight;
    let contact = matching.find((candidate) => {
      draw -= candidate.weight ?? 1;
      return draw < 0;
    });
    if (contact) remaining.splice(remaining.indexOf(contact), 1);
    else {
      // Approved placeholder until enough category-specific contacts are supplied.
      contact = window.createMiloPhoneContacts({ ...context, prize: 500 }).find((item) => item.id === 'frank');
      contact = { ...contact, id: `frank-placeholder-${selected.length}`, placeholderFor: slot };
    }
    selected.push(contact);
  }
  return shuffled(selected);
};
