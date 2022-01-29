var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
  default: () => src_default
});

// ../../node_modules/.pnpm/tsup@5.11.11_typescript@4.5.4/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/index.ts
var import_path2 = require("path");
var import_debug2 = __toESM(require("debug"));
var import_plugin_utils = require("@windicss/plugin-utils");

// ../shared/virtual-module.ts
var import_fs = require("fs");
var MODULE_IDS = [/^virtual:windi(.*?)\.css/, /^windi(.*?)\.css/];
var MODULE_ID_VIRTUAL_PREFIX = "/@windicss/windi";
var MODULE_ID_VIRTUAL = /\/\@windicss\/windi-?(.*?)\.css/;
var MODULE_ID_VIRTUAL_MODULES = [
  `${MODULE_ID_VIRTUAL_PREFIX}.css`,
  `${MODULE_ID_VIRTUAL_PREFIX}-base.css`,
  `${MODULE_ID_VIRTUAL_PREFIX}-utilities.css`,
  `${MODULE_ID_VIRTUAL_PREFIX}-components.css`
];
function createVirtualModuleLoader(ctx) {
  return {
    resolveId(id) {
      for (const idRegex of MODULE_IDS) {
        const match = id.match(idRegex);
        if (match)
          return `${MODULE_ID_VIRTUAL_PREFIX}${match[1]}.css`;
      }
      return null;
    },
    async load(id) {
      const match = id.match(MODULE_ID_VIRTUAL);
      if (match) {
        await ctx.utils.scan();
        await ctx.utils.waitLocks();
        ctx.utils.files.map((id2) => this.addWatchFile(id2));
        const layer = match[1] || void 0;
        const css = await ctx.utils.generateCSS(layer);
        return css;
      }
    },
    async watchChange(id, change) {
      if (change.event === "delete" || !(0, import_fs.existsSync)(id))
        return;
      if (!ctx.utils.isDetectTarget(id))
        return;
      ctx.utils.lock(async () => {
        const content = await import_fs.promises.readFile(id, "utf-8");
        await ctx.utils.extractFile(content, id, true);
      });
    }
  };
}

// src/devtools.ts
var import_fs2 = __toESM(require("fs"));
var import_path = require("path");
var import_url = require("url");
var import_debug = __toESM(require("debug"));

// src/constants.ts
var NAME = "vite-plugin-windicss";

// src/modules.ts
function getChangedModuleNames(utils) {
  if (utils.hasPending)
    utils.buildPendingStyles();
  const moduleNames = [
    `${MODULE_ID_VIRTUAL_PREFIX}.css`
  ];
  Object.entries(utils.layersMeta).forEach(([name, meta]) => {
    if (meta.cssCache == null)
      moduleNames.push(`${MODULE_ID_VIRTUAL_PREFIX}-${name}.css`);
  });
  return moduleNames;
}
function getCssModules(server, names = MODULE_ID_VIRTUAL_MODULES) {
  return names.map((name) => server.moduleGraph.getModuleById(name)).filter(Boolean);
}
function invalidateCssModules(server, modules = getCssModules(server)) {
  return modules.forEach((m) => server.moduleGraph.invalidateModule(m));
}
function sendHmrReload(server, modules = getCssModules(server)) {
  const timestamp = +Date.now();
  server.ws.send({
    type: "update",
    updates: modules.map((m) => ({
      acceptedPath: m.id || m.file,
      path: m.id || m.file,
      timestamp,
      type: "js-update"
    }))
  });
}
function reloadChangedCssModules(server, utils) {
  const cssModules = getCssModules(server, getChangedModuleNames(utils));
  invalidateCssModules(server, cssModules);
  sendHmrReload(server, cssModules);
  return cssModules;
}

// src/devtools.ts
var _dirname = typeof __dirname !== "undefined" ? __dirname : (0, import_path.dirname)((0, import_url.fileURLToPath)(importMetaUrl));
var debug = {
  devtools: (0, import_debug.default)(`${NAME}:devtools`)
};
var DEVTOOLS_MODULE_ID = "virtual:windi-devtools";
var MOCK_CLASSES_MODULE_ID = "virtual:windi-mock-classes";
var MOCK_CLASSES_PATH = "/@windicss/mock-classes";
var DEVTOOLS_PATH = "/@windicss/devtools";
var MODULES_MAP = {
  [DEVTOOLS_MODULE_ID]: DEVTOOLS_PATH,
  [MOCK_CLASSES_MODULE_ID]: MOCK_CLASSES_PATH
};
var POST_PATH = "/@windicss-devtools-update";
function getBodyJson(req) {
  return new Promise((resolve3, reject) => {
    let body = "";
    req.on("data", (chunk) => body += chunk);
    req.on("error", reject);
    req.on("end", () => {
      try {
        resolve3(JSON.parse(body) || {});
      } catch (e) {
        reject(e);
      }
    });
  });
}
function createDevtoolsPlugin(ctx) {
  let config;
  let server;
  let clientCode = "";
  function updateCSS() {
    if (!server)
      return;
    const names = getChangedModuleNames(ctx.utils);
    const modules = getCssModules(server, names);
    invalidateCssModules(server, modules);
    sendHmrReload(server, modules);
  }
  function toClass(name) {
    return `.${ctx.utils.processor.e(name)}{}`;
  }
  function getMockClassesInjector() {
    const completions = ctx.utils.getCompletions();
    const comment = "/* Windi CSS mock class names for devtools auto-completion */\n";
    const css = [
      ...completions.color,
      ...completions.static
    ].map(toClass).join("");
    return `
const style = document.createElement('style')
style.setAttribute('type', 'text/css')
style.innerHTML = ${JSON.stringify(comment + css)}
document.head.prepend(style)
`;
  }
  return [
    {
      name: `${NAME}:devtools`,
      configResolved(_config) {
        config = _config;
      },
      configureServer(_server) {
        server = _server;
        server.middlewares.use(async (req, res, next) => {
          if (req.url !== POST_PATH)
            return next();
          try {
            const data = await getBodyJson(req);
            const type = data == null ? void 0 : data.type;
            debug.devtools(data);
            let changed = false;
            switch (type) {
              case "add-classes":
                changed = ctx.utils.addClasses(data.data || []);
            }
            if (changed)
              updateCSS();
            res.statusCode = 200;
          } catch (e) {
            console.error(e);
            res.statusCode = 500;
          }
          res.end();
        });
      },
      resolveId(id) {
        return MODULES_MAP[id];
      },
      async load(id) {
        var _a, _b;
        if (id === DEVTOOLS_PATH) {
          if (!clientCode) {
            clientCode = [
              await import_fs2.default.promises.readFile((0, import_path.resolve)(_dirname, "client.mjs"), "utf-8"),
              `import('${MOCK_CLASSES_MODULE_ID}')`
            ].join("\n").replace("__POST_PATH__", ((_b = (_a = config.server) == null ? void 0 : _a.origin) != null ? _b : "") + POST_PATH);
          }
          return config.command === "build" ? "" : clientCode;
        } else if (id === MOCK_CLASSES_PATH) {
          return getMockClassesInjector();
        }
      }
    }
  ];
}

// src/index.ts
__reExport(src_exports, require("@windicss/plugin-utils"));
var debug2 = {
  hmr: (0, import_debug2.default)(`${NAME}:hmr`),
  css: (0, import_debug2.default)(`${NAME}:transform:css`),
  group: (0, import_debug2.default)(`${NAME}:transform:group`),
  alias: (0, import_debug2.default)(`${NAME}:transform:alias`),
  memory: (0, import_debug2.default)(`${NAME}:memory`)
};
function VitePluginWindicss(userOptions = {}, utilsOptions = {}) {
  let utils;
  let server;
  let viteConfig;
  const plugins = [];
  plugins.push({
    name: `${NAME}:alias`,
    enforce: "pre",
    configResolved(_config) {
      viteConfig = _config;
    },
    async transform(code, id) {
      await utils.ensureInit();
      if (!utils.isDetectTarget(id))
        return;
      debug2.alias(id);
      return utils.transformAlias(code, !!viteConfig.build.sourcemap);
    }
  });
  if (userOptions.transformGroups !== false) {
    plugins.push({
      name: `${NAME}:groups`,
      enforce: "pre",
      async transform(code, id) {
        await utils.ensureInit();
        if (!utils.isDetectTarget(id))
          return;
        debug2.group(id);
        return utils.transformGroups(code, !!viteConfig.build.sourcemap);
      }
    });
  }
  plugins.push({
    name: NAME,
    get api() {
      return utils;
    }
  });
  plugins.push(__spreadValues({
    name: `${NAME}:entry`,
    enforce: "post",
    configureServer(_server) {
      server = _server;
    },
    async configResolved(_config) {
      var _a;
      utils = (_a = utilsOptions.utils) != null ? _a : (0, import_plugin_utils.createUtils)(userOptions, __spreadValues({
        name: NAME,
        root: _config.root,
        onConfigurationError(e) {
          if (_config.command === "build") {
            throw e;
          } else {
            console.error(`[${NAME}] Error on loading configurations`);
            console.error(e);
          }
        }
      }, utilsOptions));
      await utils.ensureInit();
    }
  }, createVirtualModuleLoader({ get utils() {
    return utils;
  } })));
  let _cssReloadTask;
  function reloadCssModules(server2) {
    clearTimeout(_cssReloadTask);
    _cssReloadTask = setTimeout(() => {
      reloadChangedCssModules(server2, utils);
    }, 1);
  }
  plugins.push({
    name: `${NAME}:hmr`,
    apply: "serve",
    enforce: "pre",
    async configureServer(_server) {
      var _a;
      server = _server;
      await utils.ensureInit();
      if (utils.configFilePath)
        server.watcher.add(utils.configFilePath);
      const supportsGlobs = ((_a = server.config.server.watch) == null ? void 0 : _a.disableGlobbing) === false;
      server.watcher.add(supportsGlobs ? utils.globs : await utils.getFiles());
    },
    async handleHotUpdate({ server: server2, file, read }) {
      if ((0, import_path2.resolve)(file) === utils.configFilePath) {
        debug2.hmr(`config file changed: ${file}`);
        await utils.init();
        setTimeout(() => {
          (0, import_debug2.log)("configure file changed, reloading");
          server2.ws.send({ type: "full-reload" });
        }, 0);
        return getCssModules(server2);
      }
      if (!utils.isDetectTarget(file))
        return;
      utils.extractFile(await read(), file, true).then((changed) => {
        if (changed) {
          debug2.hmr(`refreshed by ${file}`);
          reloadCssModules(server2);
        }
      });
    }
  });
  const { transformCSS: transformCSSOptions = true } = userOptions;
  const transformCSS = (code, id) => utils.transformCSS(code, id, {
    onLayerUpdated() {
      if (server)
        reloadCssModules(server);
    }
  });
  if (transformCSSOptions === true) {
    plugins.push({
      name: `${NAME}:css`,
      async transform(code, id) {
        await utils.ensureInit();
        if (!utils.isCssTransformTarget(id) || id.startsWith(MODULE_ID_VIRTUAL_PREFIX))
          return;
        debug2.css(id);
        code = transformCSS(code, id);
        if (viteConfig.build.sourcemap) {
          return {
            code: transformCSS(code, id),
            map: { mappings: "" }
          };
        } else {
          return code;
        }
      }
    });
  } else if (typeof transformCSSOptions === "string") {
    plugins.push({
      name: `${NAME}:css`,
      enforce: transformCSSOptions,
      transform(code, id) {
        if (!utils.isCssTransformTarget(id) || id.startsWith(MODULE_ID_VIRTUAL_PREFIX))
          return;
        debug2.css(id, transformCSSOptions);
        code = transformCSS(code, id);
        if (viteConfig.build.sourcemap) {
          return {
            code: transformCSS(code, id),
            map: { mappings: "" }
          };
        } else {
          return code;
        }
      }
    });
  }
  plugins.push({
    name: `${NAME}:css:svelte`,
    api: {
      sveltePreprocess: {
        style({ content, id }) {
          return {
            code: transformCSS(content, id)
          };
        }
      }
    }
  });
  plugins.push(...createDevtoolsPlugin({ get utils() {
    return utils;
  } }));
  return plugins;
}
var src_default = VitePluginWindicss;
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
