'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const path = require('path');
const fs = require('fs');
const unconfig = require('unconfig');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

function createConfigLoader(configOrPath = process.cwd(), extraConfigSources = []) {
  let inlineConfig = {};
  if (typeof configOrPath !== "string") {
    inlineConfig = configOrPath;
    if (inlineConfig.configFile === false) {
      return async () => ({
        config: inlineConfig,
        sources: []
      });
    } else {
      configOrPath = inlineConfig.configFile || process.cwd();
    }
  }
  const resolved = path.resolve(configOrPath);
  let cwd = resolved;
  let isFile = false;
  if (fs__default.existsSync(resolved) && fs__default.statSync(resolved).isFile()) {
    isFile = true;
    cwd = path.dirname(resolved);
  }
  const loader = unconfig.createConfigLoader({
    sources: isFile ? [
      {
        files: resolved,
        extensions: []
      }
    ] : [
      {
        files: [
          "unocss.config",
          "uno.config"
        ]
      },
      ...extraConfigSources
    ],
    cwd,
    defaults: inlineConfig
  });
  return async () => {
    const result = await loader.load();
    result.config = result.config || inlineConfig;
    if (result.config.configDeps) {
      result.sources = [
        ...result.sources,
        ...result.config.configDeps.map((i) => path.resolve(cwd, i))
      ];
    }
    return result;
  };
}
function loadConfig(dirOrPath) {
  return createConfigLoader(dirOrPath)();
}

exports.createConfigLoader = createConfigLoader;
exports.loadConfig = loadConfig;
