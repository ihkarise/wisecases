/**
 * WiseCases Configuration (Layer B abstraction)
 * WiseAiTechs — For All Medicos
 *
 * This configuration controls data mode (local vs. Google Sheets),
 * remote backend endpoints, feature toggles, and default gameplay parameters.
 */
(function() {
  window.WISECASES_CONFIG = {
    // Operational mode: "google" (Google Apps Script Web App) is the primary source of cases.
    // "local" keeps everything in this browser only.
    mode: "google",

    // Google Apps Script Web App connection settings
    googleAppsScript: {
      enabled: true,
      baseUrl: "https://script.google.com/macros/s/AKfycbx1TWEOFmV3q0PBvAAiJEcs8UYRqujYrKzmJT6trwXS8a7hf6kWSfg4a193xzUb5JKC/exec",
      // Administrator key lives in Apps Script Script Properties. It is entered in Settings
      // and kept in this browser only — never committed here.
      adminKey: "",
      timeoutMs: 20000
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
          // Only honor a saved mode after the user explicitly picks one in Settings.
          // Older sessions stored "local" by default and would otherwise hide sheet updates.
          if (parsed.modeLockedByUser && parsed.mode) window.WISECASES_CONFIG.mode = parsed.mode;
          if (parsed.googleAppsScript) {
            const merged = Object.assign({}, window.WISECASES_CONFIG.googleAppsScript, parsed.googleAppsScript);
            if (!merged.baseUrl) merged.baseUrl = window.WISECASES_CONFIG.googleAppsScript.baseUrl;
            window.WISECASES_CONFIG.googleAppsScript = merged;
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
