var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/index.ts
import { existsSync, statSync } from "fs";
import { extname, resolve, dirname, join } from "path";
import { transform as transform2 } from "esbuild";
import { createFilter } from "@rollup/pluginutils";
import createDebug from "debug";

// src/options.ts
import fs from "fs";
import JoyCon from "joycon";
import { parse } from "jsonc-parser";
var joycon = new JoyCon();
joycon.addLoader({
  test: /\.json$/,
  load: async (file) => {
    const content = await fs.promises.readFile(file, "utf8");
    return parse(content);
  }
});
var getOptions = async (cwd, tsconfig) => {
  const { data, path: path2 } = await joycon.load([tsconfig || "tsconfig.json"], cwd);
  if (path2 && data) {
    const { jsxFactory, jsxFragmentFactory, target } = data.compilerOptions || {};
    return {
      jsxFactory,
      jsxFragment: jsxFragmentFactory,
      target: target && target.toLowerCase()
    };
  }
  return {};
};

// src/minify.ts
import { transform } from "esbuild";

// src/warn.ts
import {
  formatMessages
} from "esbuild";
var warn = async (pluginContext, messages) => {
  if (messages.length > 0) {
    const warnings = await formatMessages(messages, {
      kind: "warning",
      color: true
    });
    warnings.forEach((warning) => pluginContext.warn(warning));
  }
};

// src/minify.ts
var getEsbuildFormat = (rollupFormat) => {
  if (rollupFormat === "es") {
    return "esm";
  }
  if (rollupFormat === "cjs") {
    return rollupFormat;
  }
};
var getRenderChunk = (options) => async function(code, _, rollupOptions) {
  if (options.minify || options.minifyWhitespace || options.minifyIdentifiers || options.minifySyntax) {
    const format = getEsbuildFormat(rollupOptions.format);
    const result = await transform(code, {
      format,
      loader: "js",
      minify: options.minify,
      minifyWhitespace: options.minifyWhitespace,
      minifyIdentifiers: options.minifyIdentifiers,
      minifySyntax: options.minifySyntax,
      keepNames: options.keepNames,
      legalComments: options.legalComments,
      sourcemap: options.sourceMap !== false,
      target: options.target
    });
    await warn(this, result.warnings);
    if (result.code) {
      return {
        code: result.code,
        map: result.map || null
      };
    }
  }
  return null;
};
var minify = (options = {}) => {
  let sourceMap = false;
  return {
    name: "esbuild-minify",
    outputOptions({ sourcemap }) {
      var _a;
      sourceMap = (_a = options.sourceMap) != null ? _a : !!sourcemap;
      return null;
    },
    renderChunk: getRenderChunk(__spreadProps(__spreadValues({
      minify: true
    }, options), {
      sourceMap
    }))
  };
};

// src/optimizer/optmize-deps.ts
import fs2 from "fs";
import path from "path";
import { build } from "esbuild";
import {
  init,
  parse as parse2
} from "es-module-lexer";
var slash = (p) => p.replace(/\\/g, "/");
var optimizeDeps = async (options) => {
  var _a;
  const cacheDir = path.join(options.cwd, "node_modules/.optimize_deps");
  await fs2.promises.mkdir(cacheDir, { recursive: true });
  await init;
  const result = await build(__spreadProps(__spreadValues({
    entryPoints: options.include,
    absWorkingDir: options.cwd,
    bundle: true,
    format: "esm",
    ignoreAnnotations: true,
    metafile: true,
    splitting: true,
    outdir: cacheDir,
    sourcemap: options.sourceMap
  }, options.esbuildOptions), {
    plugins: [
      {
        name: "optimize-deps",
        async setup(build2) {
          build2.onResolve({ filter: /.*/ }, async (args) => {
            var _a2, _b;
            if ((_a2 = options.exclude) == null ? void 0 : _a2.includes(args.path)) {
              return {
                external: true
              };
            }
            if ((_b = args.pluginData) == null ? void 0 : _b.__resolving_dep_path__) {
              return;
            }
            if (options.include.includes(args.path)) {
              const resolved = await build2.resolve(args.path, {
                resolveDir: args.resolveDir,
                kind: "import-statement",
                pluginData: { __resolving_dep_path__: true }
              });
              if (resolved.errors.length > 0 || resolved.warnings.length > 0) {
                return resolved;
              }
              return {
                path: args.path,
                namespace: "optimize-deps",
                pluginData: {
                  resolveDir: args.resolveDir,
                  absolute: resolved.path
                }
              };
            }
          });
          build2.onLoad({ filter: /.*/, namespace: "optimize-deps" }, async (args) => {
            const { absolute, resolveDir } = args.pluginData;
            const contents = await fs2.promises.readFile(absolute, "utf-8");
            const [, exported] = parse2(contents);
            return {
              contents: exported.length > 0 ? `export * from '${slash(absolute)}'` : `module.exports = require('${slash(absolute)}')`,
              resolveDir
            };
          });
        }
      },
      ...((_a = options.esbuildOptions) == null ? void 0 : _a.plugins) || []
    ]
  }));
  const optimized = new Map();
  for (const id of options.include) {
    optimized.set(id, { file: path.join(cacheDir, `${id}.js`) });
  }
  return {
    optimized,
    cacheDir
  };
};

// src/index.ts
var debugOptimizeDeps = createDebug("rpe:optimize-deps");
var defaultLoaders = {
  ".js": "js",
  ".jsx": "jsx",
  ".ts": "ts",
  ".tsx": "tsx"
};
var src_default = (options = {}) => {
  let target;
  const loaders = __spreadValues({}, defaultLoaders);
  if (options.loaders) {
    for (const key of Object.keys(options.loaders)) {
      const value = options.loaders[key];
      if (typeof value === "string") {
        loaders[key] = value;
      } else if (value === false) {
        delete loaders[key];
      }
    }
  }
  const extensions = Object.keys(loaders);
  const INCLUDE_REGEXP = new RegExp(`\\.(${extensions.map((ext) => ext.slice(1)).join("|")})$`);
  const EXCLUDE_REGEXP = /node_modules/;
  const filter = createFilter(options.include || INCLUDE_REGEXP, options.exclude || EXCLUDE_REGEXP);
  const resolveFile = (resolved, index = false) => {
    for (const ext of extensions) {
      const file = index ? join(resolved, `index${ext}`) : `${resolved}${ext}`;
      if (existsSync(file))
        return file;
    }
    return null;
  };
  let optimizeDepsResult;
  let cwd = process.cwd();
  let sourceMap = false;
  return {
    name: "esbuild",
    options({ context }) {
      if (context) {
        cwd = context;
        options;
      }
      return null;
    },
    outputOptions({ sourcemap }) {
      var _a;
      sourceMap = (_a = options.sourceMap) != null ? _a : !!sourcemap;
      return null;
    },
    async buildStart() {
      if (!options.optimizeDeps || optimizeDepsResult)
        return;
      optimizeDepsResult = await optimizeDeps(__spreadValues({
        cwd,
        sourceMap
      }, options.optimizeDeps));
      debugOptimizeDeps("optimized %O", optimizeDepsResult.optimized);
    },
    async resolveId(id, importer) {
      if (optimizeDepsResult == null ? void 0 : optimizeDepsResult.optimized.has(id)) {
        const m = optimizeDepsResult.optimized.get(id);
        debugOptimizeDeps("resolved %s to %s", id, m.file);
        return m.file;
      }
      if (importer && id[0] === ".") {
        const resolved = resolve(importer ? dirname(importer) : process.cwd(), id);
        let file = resolveFile(resolved);
        if (file)
          return file;
        if (!file && existsSync(resolved) && statSync(resolved).isDirectory()) {
          file = resolveFile(resolved, true);
          if (file)
            return file;
        }
      }
    },
    async transform(code, id) {
      if (!filter(id) || (optimizeDepsResult == null ? void 0 : optimizeDepsResult.optimized.has(id))) {
        return null;
      }
      const ext = extname(id);
      const loader = loaders[ext];
      if (!loader) {
        return null;
      }
      const defaultOptions = options.tsconfig === false ? {} : await getOptions(dirname(id), options.tsconfig);
      target = options.target || defaultOptions.target || "es2017";
      const result = await transform2(code, {
        loader,
        target,
        jsx: options.jsx,
        jsxFactory: options.jsxFactory || defaultOptions.jsxFactory,
        jsxFragment: options.jsxFragment || defaultOptions.jsxFragment,
        define: options.define,
        sourcemap: sourceMap,
        sourcefile: id,
        pure: options.pure,
        legalComments: options.legalComments
      });
      await warn(this, result.warnings);
      return result.code && {
        code: result.code,
        map: result.map || null
      };
    },
    renderChunk: getRenderChunk(__spreadProps(__spreadValues({}, options), {
      sourceMap
    }))
  };
};
export {
  src_default as default,
  minify
};
