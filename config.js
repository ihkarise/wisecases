/**
 * WiseCases Configuration (Layer B abstraction)
 * WiseAiTechs — For All Medicos
 *
 * This configuration controls data mode (local vs. Google Sheets),
 * remote backend endpoints, feature toggles, and default gameplay parameters.
 */
(function() {
  window.WISECASES_CONFIG = {
    // Operational mode: "local" (in-browser JSON/localStorage) or "google" (Google Apps Script Web App)
    mode: "local",

    // Google Apps Script Web App connection settings
    googleAppsScript: {
      enabled: true,
      baseUrl: "https://script.google.com/macros/s/AKfycbx1TWEOFmV3q0PBvAAiJEcs8UYRqujYrKzmJT6trwXS8a7hf6kWSfg4a193xzUb5JKC/exec", // e.g. "https://script.google.com/macros/s/AKfycbx.../exec"
      timeoutMs: 12000
    },

    // Feature availability toggles
    features: {
      excelImport: true,
      csvImport: true,
      jsonImport: true,
      googleSheets: true,
      results: true,
      adminStudio: true,
      offlineCache: true
    },

    // Default gameplay rules
    player: {
      defaultLives: 5,
      startingScore: 1000,
      wrongAnswerPenalty: 100
    },

    // Application metadata
    app: {
      name: "WiseCases",
      brand: "WiseAiTechs",
      tagline: "For All Medicos",
      version: "2.5.0",
      schemaVersion: "2.0"
    }
  };

  // Allow localStorage override for active session settings
  try {
    if (typeof localStorage !== 'undefined') {
      const savedConfig = localStorage.getItem('wisecases_config_override');
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        if (parsed && typeof parsed === 'object') {
          if (parsed.mode) window.WISECASES_CONFIG.mode = parsed.mode;
          if (parsed.googleAppsScript) {
            window.WISECASES_CONFIG.googleAppsScript = Object.assign({}, window.WISECASES_CONFIG.googleAppsScript, parsed.googleAppsScript);
          }
          if (parsed.player) {
            window.WISECASES_CONFIG.player = Object.assign({}, window.WISECASES_CONFIG.player, parsed.player);
          }
        }
      }
    }
  } catch (e) {
    console.warn('Could not read configuration override from localStorage:', e);
  }
})();
