/* ============================================================
   Léxico — Sistema de progresso
   Persiste em localStorage. Módulos futuros chamam
   LEXICO.progress.complete(slug) ao concluir uma lição.
   ============================================================ */
window.LEXICO = window.LEXICO || {};

(function () {
  const KEY = "lexico.progress.v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }

  const state = load(); // { completed: { slug: true }, lastVisited: slug }

  const progress = {
    isDone(slug) { return !!(state.completed && state.completed[slug]); },

    complete(slug) {
      state.completed = state.completed || {};
      state.completed[slug] = true;
      save(state);
      document.dispatchEvent(new CustomEvent("lexico:progress"));
    },

    reset() {
      state.completed = {};
      save(state);
      document.dispatchEvent(new CustomEvent("lexico:progress"));
    },

    setLastVisited(slug) { state.lastVisited = slug; save(state); },
    lastVisited() { return state.lastVisited || null; },

    // Registra uma visita no dia de hoje (chave YYYY-MM-DD). Chamado a cada carga.
    visitToday() {
      const d = new Date();
      const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      state.visits = state.visits || {};
      state.visits[key] = (state.visits[key] || 0) + 1;
      save(state);
      return key;
    },
    // Mapa { 'YYYY-MM-DD': contagem } com todas as visitas registradas.
    visitMap() { return state.visits || {}; },
    // Quantos dias distintos o usuário já estudou.
    daysActive() { return Object.keys(state.visits || {}).length; },

    // Percent by path ('js' | 'ts')
    pathPercent(path) {
      const mods = (LEXICO.modules || []).filter((m) => m.path === path);
      if (!mods.length) return 0;
      const done = mods.filter((m) => progress.isDone(m.slug)).length;
      return Math.round((done / mods.length) * 100);
    },

    counts(path) {
      const mods = (LEXICO.modules || []).filter((m) => !path || m.path === path);
      const done = mods.filter((m) => progress.isDone(m.slug)).length;
      return { done, total: mods.length };
    },

    // Effective status for a module row (respects completion)
    statusOf(mod) {
      if (progress.isDone(mod.slug)) return "done";
      return mod.status || "planned";
    },
  };

  LEXICO.progress = progress;
})();
