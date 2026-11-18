(() => {
  const status = document.querySelector('#milo-page-status');
  const message = status.querySelector('[role="status"]');
  const config = window.SUPABASE_CONFIG;
  const canPlay = user => user?.app_metadata?.site_access?.permissions?.play_milo === true;
  if (!config || !window.supabase?.createClient || !window.createMiloQuiz || !window.createMiloScoreStore || !window.selectMiloPhoneContacts
    || !window.createMiloQuestionGenerator || !window.POKEDEX_ENTRIES || !window.POKEDEX_META?.movesById) {
    message.textContent = 'Das Quiz konnte nicht geladen werden.';
    return;
  }

  const client = window.supabase.createClient(config.url, config.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  let adminId = null;
  let sessionVersion = 0;
  let quiz;
  const costs = new Map();
  const scoreStore = window.createMiloScoreStore(client);

  function revoke() {
    adminId = null;
    costs.clear();
    quiz?.close();
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    status.hidden = false;
    message.textContent = 'Melde dich auf der Hauptseite mit dem Admin-Konto an.';
  }

  async function loadCosts(version) {
    const snapshot = new Map();
    let lastName;
    while (version === sessionVersion && adminId) {
      let query = client.from('pokemon_costs').select('pokemon_name,cost,cost_dbl').order('pokemon_name').limit(1000);
      if (lastName !== undefined) query = query.gt('pokemon_name', lastName);
      const { data, error } = await query;
      if (error || version !== sessionVersion) return;
      for (const row of data) snapshot.set(row.pokemon_name, row);
      if (data.length < 1000) {
        for (const [name, row] of snapshot) costs.set(name, row);
        return;
      }
      lastName = data.at(-1).pokemon_name;
    }
  }

  async function verifySession(userId, version) {
    try {
      const { data, error } = await client.auth.getUser();
      if (version !== sessionVersion) return;
      if (error || data?.user?.id !== userId || !canPlay(data.user)) {
        revoke();
        message.textContent = 'Die Admin-Anmeldung konnte nicht bestätigt werden.';
        return;
      }
      quiz ??= window.createMiloQuiz(() => adminId, window.createMiloQuestionGenerator(
        window.POKEDEX_ENTRIES, window.POKEDEX_META.movesById,
        (pokemon, mode) => costs.get(pokemon.name)?.[mode === 'doubles' ? 'cost_dbl' : 'cost'],
      ), scoreStore);
      adminId = userId;
      quiz.open(adminId);
      status.hidden = true;
      void loadCosts(version).catch((error) => console.error('Tierkosten konnten nicht geladen werden.', error));
    } catch (error) {
      if (version !== sessionVersion) return;
      revoke();
      message.textContent = 'Das Quiz konnte nicht geöffnet werden.';
      console.error(error);
    }
  }

  client.auth.onAuthStateChange((event, session) => {
    const user = session?.user;
    if (event === 'PASSWORD_RECOVERY' || !canPlay(user) || !user?.id) {
      sessionVersion += 1;
      revoke();
      return;
    }
    const version = ++sessionVersion;
    setTimeout(() => void verifySession(user.id, version), 0);
  });
})();
