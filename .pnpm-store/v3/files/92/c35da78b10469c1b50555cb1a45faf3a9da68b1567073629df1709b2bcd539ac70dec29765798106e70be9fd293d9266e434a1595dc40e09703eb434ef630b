// src/index.ts
import fs from "fs";
import path from "path";
import _debug from "debug";
import _jiti from "jiti";
var jiti;
var defaultConfigureFiles = [
  "windi.config.ts",
  "windi.config.js",
  "windi.config.mjs",
  "windi.config.cjs",
  "windicss.config.ts",
  "windicss.config.js",
  "windicss.config.mjs",
  "windicss.config.cjs",
  "tailwind.config.ts",
  "tailwind.config.js",
  "tailwind.config.mjs",
  "tailwind.config.cjs"
];
function loadConfiguration(options) {
  if (!jiti)
    jiti = _jiti(void 0, { requireCache: false, cache: false, v8cache: false });
  let resolved = {};
  let configFilePath;
  let error;
  const {
    name = "windicss-config",
    config,
    root = process.cwd(),
    configFiles: configureFiles = defaultConfigureFiles,
    onConfigurationError = (e) => {
      throw e;
    },
    onConfigurationNotFound = (path2) => {
      console.warn(`[${name}] config file "${path2}" not found, ignored`);
    }
  } = options;
  const debugConfig = _debug(`${name}:config`);
  if (typeof config === "string" || !config) {
    if (!config) {
      for (const name2 of configureFiles) {
        const tryPath = path.resolve(root, name2);
        if (fs.existsSync(tryPath)) {
          configFilePath = tryPath;
          break;
        }
      }
    } else {
      configFilePath = path.resolve(root, config);
      if (!fs.existsSync(configFilePath)) {
        onConfigurationNotFound(config);
        configFilePath = void 0;
      }
    }
    if (configFilePath) {
      try {
        debugConfig("loading from ", configFilePath);
        resolved = jiti(configFilePath);
        if (resolved.default)
          resolved = resolved.default;
      } catch (e) {
        error = e;
        configFilePath = void 0;
        resolved = {};
        onConfigurationError == null ? void 0 : onConfigurationError(e);
      }
    }
  } else {
    resolved = config;
  }
  debugConfig(resolved);
  return {
    error,
    config: resolved,
    filepath: configFilePath
  };
}
export {
  defaultConfigureFiles,
  loadConfiguration
};
