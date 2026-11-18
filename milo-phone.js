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
      { ...line('Günther Lauchzelot', 'Äh, scheint als wäre der gute Herr nicht erreichbar. Naja. Dann bekommen sie den Telefonjoker erstattet. Aber erst bei der nächsten Frage!'), refund: true },
    ]);
  }
  if ([100, 200].includes(prize) && previousAnswer) {
    add('flegmon', 'Flegmon', 'useless', () => [
      line('Flegmon', 'Ich... glaube... die... Antwort... auf... diese... Frage... ist...', { interval: 1500 }),
      line('Flegmon', `Ja... genau... die... Antwort... ist... ${previousAnswer}.`, { interval: 1500 }),
    ], true);
  }
  if (question.category === 'translation') {
    add('dita', 'Dita Kiefsling', 'semi', ({ wrong }) => [
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
    let contact = matching[0];
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
