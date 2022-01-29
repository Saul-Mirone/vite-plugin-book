var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  defaultConfigureFiles: () => defaultConfigureFiles,
  loadConfiguration: () => loadConfiguration
});
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_debug = __toESM(require("debug"));
var import_jiti = __toESM(require("jiti"));
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
    jiti = (0, import_jiti.default)(void 0, { requireCache: false, cache: false, v8cache: false });
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
  const debugConfig = (0, import_debug.default)(`${name}:config`);
  if (typeof config === "string" || !config) {
    if (!config) {
      for (const name2 of configureFiles) {
        const tryPath = import_path.default.resolve(root, name2);
        if (import_fs.default.existsSync(tryPath)) {
          configFilePath = tryPath;
          break;
        }
      }
    } else {
      configFilePath = import_path.default.resolve(root, config);
      if (!import_fs.default.existsSync(configFilePath)) {
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
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultConfigureFiles,
  loadConfiguration
});
