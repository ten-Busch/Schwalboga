window.createMiloDamageGenerator = function createMiloDamageGenerator(entries, moves, engine = window.MiloCalc ?? window.calc) {
  if (!engine?.Generations || !engine?.calculate) return () => null;
  const gen = engine.Generations.get(9);
  const zero = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  const name = (p) => p.names?.de ?? p.name;
  const id = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const pick = (rows) => rows[Math.floor(Math.random() * rows.length)];
  function shuffle(rows) {
    const out = [...rows];
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
    return out;
  }
  // Only audited single-hit, immediate, fixed-power moves. Effects after the
  // initial hit do not contribute to this question's damage.
  const supportedMoves = new Set(('tackle pound scratch quickattack swift headbutt bodyslam slam strength slash extremespeed '
    + 'facade hypervoice echoedvoice return frustration tackle hyperfang crushclaw workup '
    + 'ember flamethrower fireblast heatwave incinerate mysticalfire flameburst flamecharge firefang firepunch flareblitz lavaplume searingshot sacredfire '
    + 'watergun waterpulse surf hydropump scald aquatail liquidation waterfall aquajet razorshell brine '
    + 'thundershock thunderbolt thunder discharge thunderpunch thunderfang spark wildcharge nuzzle zingzap '
    + 'vinewhip razorleaf magicalleaf energyball leafblade leafstorm powerwhip seedbomb petalblizzard woodhammer trailblaze '
    + 'icebeam blizzard icepunch icefang iceshard iciclecrash icywind aurorabeam snowscape '
    + 'karatechop lowsweep brickbreak closecombat superpower crosschop hammerarm drainpunch machpunch vacuumwave focusblast aurasphere sacredsword '
    + 'poisonsting sludge sludgebomb sludgewave poisonjab gunkshot crosspoison venoshock acid acidspray '
    + 'earthquake earthpower mudshot mudbomb highhorsepower drillrun scorchingsands bonemerang '
    + 'gust wingattack aerialace airslash aircutter hurricane drillpeck bravebird dualwingbeat '
    + 'confusion psybeam psychic psyshock extrasensory zenheadbutt psychocut mistball lusterpurge expandingforce '
    + 'bugbite strugglebug bugbuzz xscissor megahorn uturn lunge pollenpuff firstimpression '
    + 'rockthrow rocktomb rockslide stoneedge powergem ancientpower meteorbeam '
    + 'lick shadowball shadowclaw shadowpunch shadowsneak astonish poltergeist spiritshackle shadowbone '
    + 'dragonbreath dragonpulse dragonclaw dracometeor outrage dragonrush breakingswipe dragonhammer '
    + 'bite crunch darkpulse nightslash foulplay snarl knockoff darkestlariat throatchop '
    + 'metalclaw ironhead irontail flashcannon steelwing bulletpunch smartstrike meteormash '
    + 'fairywind dazzlinggleam moonblast playrough drainingkiss spiritbreak fleurcannon '
    + 'freezedry frostbreath stormthrow wickedblow flowertrick').split(/\s+/));
  // Explicitly remove variable/conditional, multihit, charge and item-dependent
  // entries rather than treating their nominal base power as ordinary damage.
  for (const move of ['facade','echoedvoice','return','frustration','workup','brine','venoshock','bonemerang','dualwingbeat','firstimpression','meteorbeam','poltergeist','expandingforce','snowscape']) supportedMoves.delete(move);
  // Audited passive abilities for the fixed setup. Entry stat boosts, weather/
  // terrain setters, transformation and first-hit shields are excluded.
  const supportedAbilities = new Set(('overgrow blaze torrent swarm chlorophyll sandrush slushrush swiftswim '
    + 'ironbarbs anticipation overcoat battlearmor shellarmor sniper keeneye tintedlens effectspore damp '
    + 'magmaarmor flamebody weakarmor reckless rockhead sandveil klutz unnerve runaway pickup technician lightmetal heavymetal '
    + 'shielddust shedskin compoundeyes insomnia earlybird pressure frisk infiltrator poisonpoint poisontouch rivalry guts quickfeet '
    + 'limber owntempo oblivious forewarn synchronize innerfocus steadfast moxie justified rattled telepathy immunity vitalspirit '
    + 'hypercutter clearbody whitesmoke suctioncups illuminate stickyhold gluttony ripen hustle naturalcure serenegrace regenerator '
    + 'healer merciless corrosion skilllink superluck bigpecks stench tangledfeet sweetveil flowerveil ballfetch honeygather '
    + 'levitate flashfire wellbakedbody waterabsorb stormdrain dryskin voltabsorb lightningrod motordrive sapsipper eartheater '
    + 'fluffy heatproof thickfat waterbubble purifyingsalt solidrock filter prismarmor wonderguard '
    + 'adaptability aerilate pixilate refrigerate galvanize normalize ironfist strongjaw toughclaws sheerforce megalauncher '
    + 'sharpness punkrock steelyspirit steelworker dragonsmaw transistor defeatist hugepower purepower furcoat icescales '
    + 'multiscale shadowshield grasspelt marvelscale furcoat gorillatactics stakeout').split(' '));
  supportedAbilities.delete('rivalry'); // Requires a displayed gender comparison.
  supportedAbilities.delete('stakeout'); // Requires a switching defender.
  const specialIds = new Set(['freezedry', 'frostbreath', 'stormthrow', 'wickedblow', 'flowertrick']);
  const all = entries.filter((p) => !p.forme && !p.hidden && !p.impossible && !p.unreleased && gen.species.get(id(p.name)))
    .map((p) => ({ p, abilities: p.abilityDetails.filter((a) => supportedAbilities.has(a.id) && gen.abilities.get(a.id)),
      moves: p.moveIds.filter((moveId) => {
        const move = gen.moves.get(moveId);
        return supportedMoves.has(moveId) && moves[moveId] && move && move.basePower > 0 && move.category !== 'Status'
          && !move.multihit && !move.isZ && !move.isMax;
      }) })).filter((row) => row.abilities.length);
  const attackers = all.filter((row) => row.moves.length >= 4);
  const specialAttackers = attackers.filter((row) => row.moves.some((move) => specialIds.has(move)));
  const waterDefenders = all.filter((row) => row.p.types.includes('Water'));
  const cache = new Map();
  function pokemon(p, ability) {
    return new engine.Pokemon(gen, p.name, { level: 100, nature: 'Serious', ivs: zero, evs: zero, boosts: zero,
      ability: ability.name, abilityOn: false, item: '', status: '', overrides: { baseStats: p.baseStats, types: p.types } });
  }
  function calculate(attacker, attackAbility, defender, defenseAbility, moveIds) {
    const key = [attacker.name, attackAbility.id, defender.name, defenseAbility.id, moveIds.join(',')].join('|');
    if (cache.has(key)) return cache.get(key);
    const a = pokemon(attacker, attackAbility), d = pokemon(defender, defenseAbility);
    const rows = [];
    for (const moveId of moveIds) {
      const data = gen.moves.get(moveId);
      const move = new engine.Move(gen, data.name, { ability: attackAbility.name, species: attacker.name });
      move.isCrit = Boolean(data.willCrit); // No random critical hits.
      const result = engine.calculate(gen, a, d, move, new engine.Field({ gameType: 'Singles' }));
      const rolls = typeof result.damage === 'number' ? [result.damage] : result.damage;
      if (!rolls.length || !rolls.every((n) => typeof n === 'number' && Number.isFinite(n))) continue;
      const average = rolls.reduce((sum, n) => sum + n, 0) / rolls.length;
      const effectiveMove = result.move;
      const typeMultiplier = defender.types.reduce((factor, type) => factor * (moveId === 'freezedry' && type === 'Water'
        ? 2 : gen.types.get(effectiveMove.type.toLowerCase()).effectiveness[type]), 1);
      let abilityTypeModifier = 1;
      const defensiveTypeModifiers = {
        thickfat: {Fire: 0.5, Ice: 0.5}, heatproof: {Fire: 0.5}, fluffy: {Fire: 2},
        dryskin: {Fire: 1.25}, waterbubble: {Fire: 0.5}, purifyingsalt: {Ghost: 0.5},
      };
      abilityTypeModifier = defensiveTypeModifiers[defenseAbility.id]?.[effectiveMove.type] ?? 1;
      if (['solidrock', 'filter', 'prismarmor'].includes(defenseAbility.id) && typeMultiplier > 1) abilityTypeModifier = 0.75;
      // Zero damage with an otherwise nonzero type factor is an ability immunity
      // in the audited species/move pool. Read its activation from the result.
      if (average === 0 && typeMultiplier > 0 && result.rawDesc.defenderAbility) abilityTypeModifier = 0;
      const contactModifier = defenseAbility.id === 'fluffy' && effectiveMove.flags.contact ? 0.5 : 1;
      rows.push({ id: moveId, label: moves[moveId].names?.de ?? data.name, type: effectiveMove.type, category: effectiveMove.category,
        power: move.bp, average, minimum: Math.min(...rolls), maximum: Math.max(...rolls), rolls: [...rolls],
        critical: Boolean(result.rawDesc.isCritical), guaranteedCritical: Boolean(data.willCrit),
        stab: attacker.types.includes(effectiveMove.type),
        offensePokemon: effectiveMove.overrideOffensivePokemon ?? 'source',
        offenseStat: effectiveMove.overrideOffensiveStat ?? (effectiveMove.category === 'Special' ? 'spa' : 'atk'),
        defenseStat: effectiveMove.overrideDefensiveStat ?? (effectiveMove.category === 'Special' ? 'spd' : 'def'),
        matchup: {typeMultiplier, abilityTypeModifier, contactModifier},
        abilityEffects: [result.rawDesc.attackerAbility ? attackAbility.names?.de ?? attackAbility.name : null,
          result.rawDesc.defenderAbility ? defenseAbility.names?.de ?? defenseAbility.name : null].filter(Boolean),
        special: specialIds.has(moveId), description: average > 0 ? result.desc() : `${data.name}: 0 damage (immunity)` });
    }
    if (cache.size >= 80) cache.delete(cache.keys().next().value);
    cache.set(key, rows);
    return rows;
  }
  const bands = { 32000: [0.35, 0.4], 64000: [0.2, 0.35], 125000: [0.1, 0.2], 250000: [0.04, 0.1], 500000: [0, 0.04] };
  function generate(prize) {
    const band = bands[prize];
    if (!band || !attackers.length || !all.length) return null;
    for (let attempt = 0; attempt < 160; attempt++) {
      const preferSpecial = prize >= 125000 && specialAttackers.length && Math.random() < 0.4;
      const attack = pick(preferSpecial ? specialAttackers : attackers);
      const defense = pick(preferSpecial && attack.moves.includes('freezedry') && waterDefenders.length && Math.random() < 0.6 ? waterDefenders : all);
      const attackAbility = pick(attack.abilities), defenseAbility = pick(defense.abilities);
      const candidates = shuffle(calculate(attack.p, attackAbility, defense.p, defenseAbility, attack.moves)
        .filter((row) => prize >= 125000 || !row.special));
      for (const best of candidates.filter((row) => row.average > 0)) {
        const worse = candidates.filter((row) => best.average - row.average >= 1 && row.label !== best.label);
        const second = pick(worse.filter((row) => {
          const gap = (best.average - row.average) / best.average;
          return gap > band[0] && gap <= band[1];
        }));
        if (!second) continue;
        const minimumRatio = { 32000: 0, 64000: 0.15, 125000: 0.3, 250000: 0.55, 500000: 0.75 }[prize];
        const rest = [];
        for (const row of shuffle(worse.filter((row) => second.average - row.average >= 1 && row.label !== second.label && row.average >= best.average * minimumRatio))) {
          if (rest.every((other) => other.label !== row.label && Math.abs(other.average - row.average) >= 1)) rest.push(row);
          if (rest.length === 2) break;
        }
        if (rest.length !== 2) continue;
        const answers = shuffle([best, second, ...rest]);
        if (preferSpecial && !answers.some((row) => row.special)) continue;
        const gap = (best.average - second.average) / best.average;
        const fighter = (p, ability) => ({ name: p.name, de: name(p), ability: ability.name, abilityDe: ability.names?.de ?? ability.name,
          stats: {...pokemon(p, ability).rawStats} });
        const battle = { attacker: fighter(attack.p, attackAbility), defender: fighter(defense.p, defenseAbility),
          generation: 9, level: 100, ivs: 0, evs: 0, nature: 'neutral', averageDamage: true, answers, gap };
        return { prompt: `Welche dieser Attacken verursacht bei einem Angriff von ${name(attack.p)} auf ${name(defense.p)} im Durchschnitt den höchsten Schaden?`,
          options: answers.map((row) => row.label), correct: answers.indexOf(best), battle,
          referencePokemon: [attack.p, defense.p].map((p) => ({ name: p.name, de: name(p), types: [...p.types] })),
          explanation: answers.map((row) => `${row.label}: Ø ${row.average.toLocaleString('de-DE')} KP (${row.minimum}–${row.maximum})`).join(' · '),
          difficultyDetails: `Vorläufige Schadensabstands-Kurve: ${Math.round(band[0] * 100)}–${Math.round(band[1] * 100)} %.\nMindestabstand zwischen allen Antwortdurchschnitten: 1 KP.\nAbstand zur zweitbesten Antwort: ${(gap * 100).toFixed(2)} %.\n${answers.map((row) => row.description).join('\n')}` };
      }
    }
    return null;
  }
  generate.calculate = calculate;
  return generate;
};
