window.createMiloScoreStore = function createMiloScoreStore(client) {
  const validScores = new Set([0, 50, 100, 200, 300, 500, 1000, 2000, 4000, 8000,
    16000, 32000, 64000, 125000, 250000, 500000, 1000000]);
  const valid = (row) => typeof row?.player_name === 'string' && row.player_name.trim().length > 0
    && row.player_name.length <= 40 && validScores.has(row.score);
  const prefix = (userId) => `schwalboga-milo-pending:${userId}:`;
  let syncing = null;

  function pending(userId) {
    const rows = [];
    let length;
    try {
      length = localStorage.length;
    } catch {
      return rows;
    }
    for (let index = 0; index < length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith(prefix(userId))) continue;
      try {
        const row = JSON.parse(localStorage.getItem(key));
        if (valid(row) && row.created_by === userId && key === prefix(userId) + row.id) rows.push(row);
      } catch {
        // Leave unrelated or damaged browser data untouched.
      }
    }
    return rows;
  }

  async function legacyRows(userId) {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(`schwalboga-milo-test-scores:${userId}`) ?? '[]');
    } catch {
      return [];
    }
    if (!Array.isArray(saved)) return [];
    const rows = [];
    for (const [index, entry] of saved.entries()) {
      const row = { player_name: entry?.name, score: entry?.score, created_by: userId, is_test: true, run_mode: 'safe' };
      if (!valid(row)) continue;
      // Stable IDs make re-importing old browser scores safe to retry.
      const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256',
        new TextEncoder().encode(JSON.stringify([userId, index, row.player_name, row.score]))));
      bytes[6] = (bytes[6] & 15) | 80;
      bytes[8] = (bytes[8] & 63) | 128;
      const hex = [...bytes.slice(0, 16)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
      row.id = [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-');
      rows.push(row);
    }
    return rows;
  }

  async function synchronize(userId) {
    const old = await legacyRows(userId);
    const rows = [...old, ...pending(userId)];
    if (rows.length) {
      const { error } = await client.from('milo_highscores').upsert(rows, { onConflict: 'id', ignoreDuplicates: true });
      if (error) throw error;
      for (const row of rows) localStorage.removeItem(prefix(userId) + row.id);
    }
    const { data, error } = await client.from('milo_highscores')
      .select('id,player_name,score,created_at,run_mode').eq('is_test', false).eq('is_deleted', false).order('score', { ascending: false })
      .order('created_at', { ascending: true }).order('id', { ascending: true }).limit(10);
    if (error) throw error;
    return data.map((row) => ({ id: row.id, name: row.player_name, score: row.score, mode: row.run_mode }));
  }

  function load(userId) {
    // Serialize requests so retries cannot race the queue acknowledgements.
    const task = (syncing ?? Promise.resolve()).catch(() => {}).then(() => synchronize(userId));
    syncing = task;
    return task;
  }

  return {
    load,
    async list(userId) {
      await load(userId);
      const rows = [];
      let lastId;
      while (true) {
        let query = client.from('milo_highscores')
          .select('id,player_name,score,run_mode,is_test,created_at')
          .eq('is_deleted', false).order('id').limit(1000);
        if (lastId) query = query.gt('id', lastId);
        const { data, error } = await query;
        if (error) throw error;
        rows.push(...data);
        if (data.length < 1000) return rows.sort((a, b) => b.score - a.score || a.created_at.localeCompare(b.created_at));
        lastId = data.at(-1).id;
      }
    },
    async update(id, changes) {
      const row = { player_name: changes.player_name.trim(), score: Number(changes.score),
        run_mode: changes.run_mode, is_test: Boolean(changes.is_test) };
      if (!valid(row) || !['safe', 'risk'].includes(row.run_mode)) throw new Error('Ungültiges Ergebnis.');
      const { data, error } = await client.from('milo_highscores').update(row).eq('id', id)
        .eq('is_deleted', false).select('id').single();
      if (error) throw error;
      if (!data) throw new Error('Der Eintrag wurde nicht gefunden.');
    },
    async remove(id) {
      // Retain the ID so importing an old browser score cannot restore a removed entry.
      const { data, error } = await client.from('milo_highscores').update({ is_deleted: true })
        .eq('id', id).eq('is_deleted', false).select('id').single();
      if (error) throw error;
      if (!data) throw new Error('Der Eintrag wurde nicht gefunden.');
    },
    async localScores(userId) {
      const rows = pending(userId).filter((row) => row.is_test === false);
      return rows.sort((a, b) => b.score - a.score).slice(0, 10)
        .map((row) => ({ name: row.player_name, score: row.score, mode: row.run_mode }));
    },
    async save(userId, name, score, mode = 'safe', assisted = false) {
      const row = { id: crypto.randomUUID(), player_name: name.trim(), score, created_by: userId,
        run_mode: mode, is_test: Boolean(assisted) };
      if (!['safe', 'risk'].includes(mode)) throw new Error('Ungültiger Spielmodus.');
      if (!valid(row)) throw new Error('Ungültiges Ergebnis.');
      try {
        localStorage.setItem(prefix(userId) + row.id, JSON.stringify(row));
      } catch {
        // A direct insert still permits cloud storage when browser storage is full.
        const { error } = await client.from('milo_highscores').insert(row);
        if (error) throw new Error('Ergebnis konnte weder lokal noch online gespeichert werden.');
      }
      return load(userId);
    },
  };
};
