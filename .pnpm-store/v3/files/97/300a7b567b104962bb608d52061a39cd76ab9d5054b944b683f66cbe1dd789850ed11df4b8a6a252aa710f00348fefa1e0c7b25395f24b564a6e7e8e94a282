import { resolve, dirname } from 'path';
import fs from 'fs';
import { createConfigLoader as createConfigLoader$1 } from 'unconfig';

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
  const resolved = resolve(configOrPath);
  let cwd = resolved;
  let isFile = false;
  if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
    isFile = true;
    cwd = dirname(resolved);
  }
  const loader = createConfigLoader$1({
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
        ...result.config.configDeps.map((i) => resolve(cwd, i))
      ];
    }
    return result;
  };
}
function loadConfig(dirOrPath) {
  return createConfigLoader(dirOrPath)();
}

export { createConfigLoader, loadConfig };
