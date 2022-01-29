var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
  DefaultExtractor: () => DefaultExtractor,
  PugExtractor: () => PugExtractor,
  SupportedLayers: () => SupportedLayers,
  SvelteExtractor: () => SvelteExtractor,
  applyExtractors: () => applyExtractors,
  buildAliasTransformer: () => buildAliasTransformer,
  createUtils: () => createUtils,
  defaultAlias: () => defaultAlias,
  defineConfig: () => defineConfig,
  escapeRegExp: () => escapeRegExp,
  exclude: () => exclude,
  flattenArray: () => flattenArray,
  getDefaultExtractors: () => getDefaultExtractors,
  htmlTags: () => htmlTags,
  include: () => include,
  isResolvedOptions: () => isResolvedOptions,
  kebabCase: () => kebabCase,
  mergeArrays: () => mergeArrays,
  mergeWindicssConfig: () => mergeWindicssConfig,
  partition: () => import_utils2.partition,
  preflightTags: () => preflightTags,
  resolveOptions: () => resolveOptions,
  slash: () => import_utils2.slash,
  toArray: () => import_utils2.toArray,
  transformGroups: () => transformGroups
});

// src/constants.ts
var defaultAlias = {
  "router-link": "a"
};
var preflightTags = ["html", "body", "div"];
var htmlTags = [
  "html",
  "body",
  "div",
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "base",
  "basefont",
  "bdo",
  "blink",
  "blockquote",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "col",
  "colgroup",
  "command",
  "comment",
  "datalist",
  "dd",
  "del",
  "details",
  "dir",
  "dl",
  "dt",
  "embed",
  "fieldset",
  "figure",
  "b",
  "big",
  "i",
  "small",
  "tt",
  "font",
  "footer",
  "form",
  "frame",
  "frameset",
  "head",
  "header",
  "hgroup",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "isindex",
  "iframe",
  "ilayer",
  "img",
  "input",
  "ins",
  "keygen",
  "keygen",
  "label",
  "layer",
  "legend",
  "li",
  "link",
  "map",
  "mark",
  "marquee",
  "menu",
  "meta",
  "meter",
  "multicol",
  "nav",
  "nobr",
  "noembed",
  "noframes",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "cite",
  "code",
  "dfn",
  "em",
  "kbd",
  "samp",
  "strong",
  "var",
  "plaintext",
  "pre",
  "progress",
  "q",
  "ruby",
  "script",
  "section",
  "select",
  "spacer",
  "span",
  "s",
  "strike",
  "style",
  "sub",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "u",
  "ul",
  "video",
  "wbr",
  "wbr",
  "xmp"
];

// src/defineConfig.ts
function defineConfig(config) {
  return config;
}

// src/createUtils.ts
var import_fs = __toESM(require("fs"));
var import_style = require("windicss/utils/style");
var import_parser = require("windicss/utils/parser");
var import_utils5 = require("windicss/utils");
var import_utils6 = require("@antfu/utils");
var import_fast_glob = __toESM(require("fast-glob"));
var import_debug2 = __toESM(require("debug"));
var import_micromatch = __toESM(require("micromatch"));
var import_windicss = __toESM(require("windicss"));

// src/resolveOptions.ts
var resolveOptions_exports = {};
__export(resolveOptions_exports, {
  isResolvedOptions: () => isResolvedOptions,
  resolveOptions: () => resolveOptions
});
var import_path2 = __toESM(require("path"));
var import_debug = __toESM(require("debug"));
var import_config = require("@windicss/config");

// src/utils.ts
var import_utils = require("@antfu/utils");
var import_utils2 = require("@antfu/utils");
function flattenArray(v) {
  return (0, import_utils.toArray)(v).flat();
}
function mergeArrays(...args) {
  return args.flatMap((i) => flattenArray(i || []));
}
function kebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function include(set, v) {
  for (const i of v)
    set.add(i);
}
function exclude(set, v) {
  for (const i of v)
    set.delete(i);
}
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// src/extractors/helper.ts
var import_path = require("path");

// src/regexes.ts
var regexHtmlTag = /<(\w[\w-]*)([\S\s]*?)\/?>/mg;
var regexClassSplitter = /[\s'"`{}]/g;
var regexClassGroup = /([!\w+-<@][\w+:_/-]*?\w):\(((?:[!\w\s:/\\,%#.$-]|\[.*?\])*?)\)/gm;
var regexAttributifyItem = /(?:\s|^)([\w+:_/-]+)\s?=\s?(['"{])((?:\\\2|\\\\|\n|\r|.)*?)(?:\2|\})/gm;
var regexClassCheck1 = /^!?[a-z\d@<>.+-](?:\([\w,.%#\(\)+-]*\)|[\w:/\\,%#\[\].$-])*$/;
var regexClassCheck2 = /[a-z].*[\w)\]]$/;
var regexClassChecks = [
  regexClassCheck1,
  regexClassCheck2
];
var regexSvelteClass = /class:([\w:/\\,%#\[\].$-]+?)=["']?\{/g;
function validClassName(i) {
  return regexClassChecks.every((r) => i.length > 2 && i.match(r));
}

// src/extractors/default.ts
function DefaultExtractor(code, id) {
  if ((id == null ? void 0 : id.endsWith(".css")) || (id == null ? void 0 : id.endsWith(".postcss"))) {
    return {
      classes: [],
      tags: []
    };
  }
  const tags = Array.from(code.matchAll(regexHtmlTag));
  const tagNames = tags.map((i) => i[1]);
  return {
    tags: tagNames,
    get classes() {
      return code.split(regexClassSplitter).filter(validClassName);
    },
    get attributes() {
      const attrRanges = [];
      const attributes = {
        names: [],
        values: []
      };
      const attributesBlocklist = ["class", "className"];
      const tagsBlocklist = ["meta", "script", "style", "link"];
      tags.filter((i) => !tagsBlocklist.includes(i[1])).forEach((i) => {
        return Array.from(i[2].matchAll(regexAttributifyItem) || []).forEach((match) => {
          let name = match[1];
          const [full, , , value] = match;
          name = name.replace(/^(:|v-bind:)/, "");
          if (attributesBlocklist.includes(name))
            return;
          attributes.names.push(name);
          attributes.values.push(value);
          if (match.index != null)
            attrRanges.push([match.index, match.index + full.length]);
        });
      });
      return attributes;
    }
  };
}

// src/extractors/pug.ts
var regexTemplate = /<template.*?lang=['"]pug['"][^>]*?>\n([\s\S]*?\n)<\/template>/gm;
function PugExtractor(code, id) {
  const Pug = require("pug");
  const compile = (code2) => {
    try {
      return Pug.compile(code2, { filename: id })();
    } catch {
    }
  };
  let compiled;
  if (id && id.match(/\.vue$/)) {
    const matches = Array.from(code.matchAll(regexTemplate));
    let tail = "";
    for (const match of matches) {
      if (match && match[1])
        tail += `

${compile(match[1])}`;
    }
    if (tail)
      compiled = `${code}

${tail}`;
  } else {
    compiled = compile(code);
  }
  return DefaultExtractor(compiled || code);
}

// src/extractors/svelte.ts
function SvelteExtractor(code, id) {
  const result = DefaultExtractor(code, id);
  return {
    tags: result.tags,
    get classes() {
      return [
        ...result.classes,
        ...Array.from(code.matchAll(regexSvelteClass)).map((i) => i[1]).filter(Boolean)
      ];
    },
    get attributes() {
      return result.attributes;
    }
  };
}

// src/extractors/helper.ts
function getDefaultExtractors() {
  const extractors = [
    {
      extractor: SvelteExtractor,
      extensions: ["svelte"]
    }
  ];
  try {
    require("pug");
    extractors.push({
      extractor: PugExtractor,
      extensions: ["vue", "pug"]
    });
  } catch (e) {
  }
  return extractors;
}
async function applyExtractors(code, id, extractors = [], defaultExtract = DefaultExtractor) {
  let ext = id ? (0, import_path.extname)(id) : "*";
  if (ext[0] === ".")
    ext = ext.slice(1);
  for (const { extractor, extensions } of extractors) {
    if (extensions.includes(ext))
      return extractor(code, id);
  }
  return defaultExtract(code, id);
}

// src/resolveOptions.ts
__reExport(resolveOptions_exports, require("@windicss/config"));
function isResolvedOptions(options) {
  return options.__windi_resolved;
}
function buildGlobs(dirs, fileExtensions) {
  dirs = (0, import_utils2.toArray)(dirs);
  const exts = (0, import_utils2.toArray)(fileExtensions);
  const globs = exts.length ? dirs.map((i) => import_path2.default.posix.join(i, exts.length > 1 ? `**/*.{${exts.join(",")}}` : `**/*.${exts[0]}`)) : [];
  globs.push("index.html");
  return globs;
}
async function resolveOptions(options = {}, utilsOptions = {}, loadConfigFile = false) {
  var _a, _b, _c, _d, _e, _f, _g;
  if (isResolvedOptions(options))
    return options;
  const {
    name = "windicss-plugin-utils"
  } = utilsOptions;
  const debugOptions = (0, import_debug.default)(`${name}:options`);
  const root = options.root || utilsOptions.root || process.cwd();
  let { config, filepath: configFilePath } = loadConfigFile ? (0, import_config.loadConfiguration)(__spreadProps(__spreadValues({
    onConfigurationError: (error) => console.error(error)
  }, utilsOptions), {
    root,
    config: options.config,
    configFiles: options.configFiles
  })) : { config: {}, filepath: void 0 };
  const modifiedConfigs = await ((_a = options.onConfigResolved) == null ? void 0 : _a.call(options, config, configFilePath));
  if (modifiedConfigs != null)
    config = modifiedConfigs;
  const {
    scan = true,
    preflight = true,
    transformCSS = true,
    transformGroups: transformGroups2 = true,
    sortUtilities = true
  } = options;
  const preflightOptions = Object.assign({
    includeBase: true,
    includeGlobal: true,
    includePlugin: true,
    enableAll: false,
    includeAll: false,
    safelist: [],
    blocklist: [],
    alias: {}
  }, typeof config.preflight === "boolean" ? {} : config.preflight, typeof preflight === "boolean" ? {} : preflight);
  preflightOptions.includeAll = preflightOptions.includeAll || preflightOptions.enableAll;
  const scanOptions = Object.assign({
    fileExtensions: ["html", "vue", "md", "mdx", "pug", "jsx", "tsx", "svelte", "ts", "js", "css", "postcss", "pcss"],
    dirs: ["src"],
    exclude: [],
    include: [],
    runOnStartup: true,
    transformers: [],
    extractors: [],
    extraTransformTargets: {
      css: [],
      detect: []
    }
  }, typeof scan === "boolean" ? {} : scan);
  function resolveGlob(glob) {
    if (glob.startsWith("!"))
      return `!${(0, import_utils2.slash)(import_path2.default.resolve(root, glob.slice(1)))}`;
    return (0, import_utils2.slash)(import_path2.default.resolve(root, glob));
  }
  scanOptions.exclude = mergeArrays((_b = config.extract) == null ? void 0 : _b.exclude, scanOptions.exclude, ((_c = config.extract) == null ? void 0 : _c.exclude) ? [] : [
    "node_modules",
    ".git",
    "windi.config.{ts,js}",
    "tailwind.config.{ts,js}"
  ]).map(resolveGlob);
  scanOptions.include = mergeArrays((_d = config.extract) == null ? void 0 : _d.include, scanOptions.include, ((_e = config.extract) == null ? void 0 : _e.include) ? [] : buildGlobs(scanOptions.dirs, scanOptions.fileExtensions)).map(resolveGlob);
  scanOptions.extractors = mergeArrays(getDefaultExtractors(), (_f = config.extract) == null ? void 0 : _f.extractors);
  const safelist = new Set(mergeArrays(config.safelist, options.safelist).flatMap((i) => i.split(" ")));
  const blocklist = new Set(mergeArrays(config.blocklist, options.blocklist).flatMap((i) => i.split(" ")));
  const configPreflightOptions = typeof config.preflight === "boolean" ? {} : config.preflight || {};
  preflightOptions.safelist = new Set(mergeArrays(configPreflightOptions == null ? void 0 : configPreflightOptions.safelist, Array.from(preflightOptions.safelist)).flatMap((i) => i.split(" ")).map((i) => {
    var _a2;
    const match = (_a2 = i.match(/^\[(.*?)\]$/)) == null ? void 0 : _a2[1];
    if (match)
      return `div ${match}`;
    return i;
  }));
  preflightOptions.blocklist = new Set(mergeArrays(configPreflightOptions == null ? void 0 : configPreflightOptions.blocklist, Array.from(preflightOptions.blocklist)).flatMap((i) => i.split(" ")));
  preflightOptions.alias = Object.fromEntries(Object.entries(__spreadValues(__spreadValues(__spreadValues({}, defaultAlias), configPreflightOptions.alias), preflightOptions.alias)).filter(([k, v]) => [kebabCase(k), v]));
  let resolvedOptions = __spreadProps(__spreadValues({}, options), {
    root,
    config,
    configFilePath,
    enableScan: Boolean(scan),
    scanOptions,
    enablePreflight: config.preflight !== false && Boolean(preflight),
    preflightOptions,
    transformCSS,
    transformGroups: transformGroups2,
    sortUtilities,
    safelist,
    blocklist,
    __windi_resolved: true
  });
  const modifiedOptions = await ((_g = resolvedOptions.onOptionsResolved) == null ? void 0 : _g.call(resolvedOptions, resolvedOptions));
  if (modifiedOptions != null && modifiedOptions !== resolvedOptions)
    resolvedOptions = Object.assign(resolvedOptions, modifiedOptions);
  debugOptions(resolvedOptions);
  return resolvedOptions;
}

// src/transforms.ts
var import_magic_string = __toESM(require("magic-string"));
function transformGroups(code, sourcemap = true) {
  const s = new import_magic_string.default(code);
  let hasReplaced = false;
  let match;
  regexClassGroup.lastIndex = 0;
  while (match = regexClassGroup.exec(code)) {
    hasReplaced = true;
    const start = match.index;
    const end = start + match[0].length;
    const a = match[1];
    const b = match[2];
    const replacement = b.split(/\s+/g).filter(Boolean).map((i) => i.replace(/^(!?)(.*)/, `$1${a}:$2`)).join(" ");
    s.overwrite(start, end, replacement);
  }
  if (!hasReplaced)
    return null;
  return {
    code: s.toString(),
    map: sourcemap ? s.generateMap({ hires: true }) : void 0
  };
}
function buildAliasTransformer(alias) {
  if (!alias || !Object.keys(alias).length)
    return () => null;
  const keys = Object.keys(alias).sort((a, b) => b.length - a.length).map((i) => escapeRegExp(i)).join("|");
  const regexText = `\\*(?:${keys})(?<=[^w-])`;
  const regex = new RegExp(regexText, "g");
  return function transformAlias(code, sourcemap = true) {
    const s = new import_magic_string.default(code);
    let hasReplaced = false;
    let match;
    regex.lastIndex = 0;
    while (match = regex.exec(code)) {
      hasReplaced = true;
      const start = match.index;
      const end = start + match[0].length;
      const name = code.slice(start + 1, end);
      const replacement = alias[name];
      s.overwrite(start, end, replacement);
    }
    if (!hasReplaced)
      return null;
    return {
      code: s.toString(),
      map: sourcemap ? s.generateMap({ hires: true }) : void 0
    };
  };
}

// src/createUtils.ts
var SupportedLayers = ["base", "utilities", "components"];
function createUtils(userOptions = {}, utilsOptions = {
  name: "windicss-plugin-utils"
}) {
  let options = {};
  const name = utilsOptions.name;
  const debug = {
    config: (0, import_debug2.default)(`${name}:config`),
    debug: (0, import_debug2.default)(`${name}:debug`),
    compile: (0, import_debug2.default)(`${name}:compile`),
    scan: (0, import_debug2.default)(`${name}:scan`),
    scanGlob: (0, import_debug2.default)(`${name}:scan:glob`),
    scanTransform: (0, import_debug2.default)(`${name}:scan:transform`),
    detectClass: (0, import_debug2.default)(`${name}:detect:class`),
    detectTag: (0, import_debug2.default)(`${name}:detect:tag`),
    detectAttrs: (0, import_debug2.default)(`${name}:detect:attrs`),
    compileLayer: (0, import_debug2.default)(`${name}:compile:layer`)
  };
  let processor;
  let completions;
  let files = [];
  const classesGenerated = /* @__PURE__ */ new Set();
  const classesPending = /* @__PURE__ */ new Set();
  const tagsGenerated = /* @__PURE__ */ new Set();
  const tagsPending = /* @__PURE__ */ new Set();
  const attrsGenerated = /* @__PURE__ */ new Set();
  const tagsAvailable = /* @__PURE__ */ new Set();
  const attributes = [];
  let _transformAlias = () => null;
  const _locks = [];
  function getCompletions() {
    if (!completions)
      completions = (0, import_utils5.generateCompletions)(processor);
    return completions;
  }
  async function getFiles() {
    await ensureInit();
    debug.scanGlob("include", options.scanOptions.include);
    debug.scanGlob("exclude", options.scanOptions.exclude);
    const files2 = await (0, import_fast_glob.default)(options.scanOptions.include, {
      cwd: options.root,
      ignore: options.scanOptions.exclude,
      onlyFiles: true,
      absolute: true
    });
    files2.sort();
    debug.scanGlob("files", files2);
    return files2;
  }
  let scanned = false;
  const scan = (0, import_utils6.createSingletonPromise)(async () => {
    await ensureInit();
    debug.scan("started");
    files.push(...await getFiles());
    const contents = await Promise.all(files.filter((id) => isDetectTarget(id)).map(async (id) => [await import_fs.default.promises.readFile(id, "utf-8"), id]));
    await Promise.all(contents.map(async ([content, id]) => {
      if (isCssTransformTarget(id))
        return transformCSS(content, id);
      else
        return extractFile(content, id, true);
    }));
    scanned = true;
    debug.scan("finished");
  });
  function isExcluded(id) {
    return import_micromatch.default.contains((0, import_utils2.slash)(id), options.scanOptions.exclude, { dot: true });
  }
  function isIncluded(id) {
    return import_micromatch.default.isMatch((0, import_utils2.slash)(id), options.scanOptions.include);
  }
  function isDetectTarget(id) {
    if (options.scanOptions.extraTransformTargets.detect.some((i) => typeof i === "string" ? i === id : i(id)))
      return true;
    if (files.includes(id) || files.includes(id.slice(0, id.indexOf("?"))))
      return true;
    id = (0, import_utils2.slash)(id);
    return isIncluded(id) && !isExcluded(id);
  }
  function isScanTarget(id) {
    return options.enableScan ? files.some((file) => id.startsWith(file)) : isDetectTarget(id);
  }
  function isCssTransformTarget(id) {
    if (options.scanOptions.extraTransformTargets.css.some((i) => typeof i === "string" ? i === id : i(id)))
      return true;
    if (id.match(/\.(?:postcss|pcss|scss|sass|css|stylus|less)(?:$|\?)/i) && !isExcluded(id))
      return true;
    return false;
  }
  function addClasses(classes) {
    let changed = false;
    classes.forEach((i) => {
      if (!i || classesGenerated.has(i) || classesPending.has(i) || options.blocklist.has(i))
        return;
      classesPending.add(i);
      changed = true;
    });
    return changed;
  }
  function addTags(tags) {
    if (options.preflightOptions.includeAll)
      return false;
    let changed = false;
    tags.forEach((tag) => {
      if (!tagsAvailable.has(tag))
        tag = options.preflightOptions.alias[kebabCase(tag)];
      if (options.preflightOptions.blocklist.has(tag))
        return;
      if (tagsAvailable.has(tag) && !tagsPending.has(tag)) {
        tagsPending.add(tag);
        tagsAvailable.delete(tag);
        changed = true;
      }
    });
    return changed;
  }
  async function applyExtractors2(code, id) {
    return await applyExtractors(code, id, options.scanOptions.extractors);
  }
  async function extractFile(code, id, applyTransform = true) {
    var _a, _b, _c, _d;
    if (applyTransform) {
      code = (_b = (_a = _transformAlias(code, false)) == null ? void 0 : _a.code) != null ? _b : code;
      if (options.transformGroups)
        code = (_d = (_c = transformGroups(code, false)) == null ? void 0 : _c.code) != null ? _d : code;
    }
    if (id) {
      debug.scanTransform(id);
      for (const trans of options.scanOptions.transformers) {
        const result = trans(code, id);
        if (result != null)
          code = result;
      }
    }
    const extractResult = await applyExtractors2(code, id);
    let changed = false;
    if (options.enablePreflight && !options.preflightOptions.includeAll) {
      changed = addTags(extractResult.tags || []) || changed;
    }
    if (options.config.attributify) {
      const extractedAttrs = extractResult.attributes;
      if (extractedAttrs == null ? void 0 : extractedAttrs.names.length) {
        extractedAttrs.names.forEach((name2, i) => {
          attributes.push([name2, extractedAttrs.values[i]]);
        });
        changed = true;
      }
      changed = addClasses((extractedAttrs == null ? void 0 : extractedAttrs.classes) || extractResult.classes || []) || changed;
    } else {
      changed = addClasses(extractResult.classes || []) || changed;
    }
    if (changed) {
      debug.detectClass(classesPending);
      debug.detectTag(tagsPending);
      debug.detectAttrs(attributes);
    }
    return changed;
  }
  function transformCSS(css, id, transformOptions) {
    var _a;
    if (!options.transformCSS)
      return css;
    const style = new import_parser.CSSParser(css, processor).parse();
    if (transformOptions == null ? void 0 : transformOptions.globaliseKeyframes) {
      const [nonKeyframeBlocks, keyframeBlocks] = (0, import_utils2.partition)(style.children, (i) => !i.atRules || !i.atRules[0].match(/keyframes (pulse|spin|ping|bounce)/));
      updateLayers(keyframeBlocks, "__classes", false);
      style.children = nonKeyframeBlocks;
    }
    const [layerBlocks, blocks] = (0, import_utils2.partition)(style.children, (i) => i.meta.group === "layer-block" && SupportedLayers.includes(i.meta.type));
    if (layerBlocks.length) {
      updateLayers(layerBlocks, id);
      style.children = blocks;
    }
    const transformed = style.build();
    if (layerBlocks.length)
      (_a = transformOptions == null ? void 0 : transformOptions.onLayerUpdated) == null ? void 0 : _a.call(transformOptions);
    return transformed;
  }
  const layers = {
    base: {},
    utilities: {},
    components: {}
  };
  const layerStylesMap = /* @__PURE__ */ new Map();
  function updateLayers(styles, filepath, replace = true) {
    var _a;
    const timestamp = +Date.now();
    debug.compileLayer("update", filepath);
    const changedLayers = /* @__PURE__ */ new Set();
    styles.forEach((i) => changedLayers.add(i.meta.type));
    if (replace) {
      (_a = layerStylesMap.get(filepath)) == null ? void 0 : _a.forEach((i) => changedLayers.add(i.meta.type));
      layerStylesMap.set(filepath, styles);
    } else {
      const prevStyles = layerStylesMap.get(filepath) || [];
      layerStylesMap.set(filepath, prevStyles.concat(styles));
    }
    for (const name2 of changedLayers) {
      const layer = layers[name2];
      if (layer) {
        layer.timestamp = timestamp;
        layer.cssCache = void 0;
      }
    }
  }
  function buildLayerCss(name2) {
    var _a;
    const layer = layers[name2];
    if (layer.cssCache == null) {
      const style = new import_style.StyleSheet(Array.from(layerStylesMap.values()).flatMap((i) => i).filter((i) => i.meta.type === name2));
      style.prefixer = (_a = options.config.prefixer) != null ? _a : true;
      debug.compileLayer(name2, style.children.length);
      if (options.sortUtilities)
        style.sort();
      layer.cssCache = `/* windicss layer ${name2} */
${style.build()}`;
    }
    return layer.cssCache;
  }
  function buildPendingStyles() {
    var _a, _b;
    (_a = options.onBeforeGenerate) == null ? void 0 : _a.call(options, {
      classesPending,
      tagsPending
    });
    if (classesPending.size) {
      const result = processor.interpret(Array.from(classesPending).join(" "));
      if (result.success.length) {
        debug.compile(`compiled ${result.success.length} classes out of ${classesPending.size}`);
        debug.compile(result.success);
        updateLayers(result.styleSheet.children, "__classes", false);
        include(classesGenerated, result.success);
        classesPending.clear();
      }
    }
    if (options.enablePreflight) {
      if (options.preflightOptions.includeAll) {
        if (!layerStylesMap.has("__preflights")) {
          const preflightStyle = processor.preflight(void 0, options.preflightOptions.includeBase, options.preflightOptions.includeGlobal, options.preflightOptions.includePlugin);
          updateLayers(preflightStyle.children, "__preflights", true);
        }
      } else if (tagsPending.size) {
        const preflightStyle = processor.preflight(Array.from(tagsPending).map((i) => `<${i}/>`).join(" "), options.preflightOptions.includeBase, options.preflightOptions.includeGlobal, options.preflightOptions.includePlugin);
        updateLayers(preflightStyle.children, "__preflights", false);
        include(tagsGenerated, tagsPending);
        tagsPending.clear();
      }
    }
    if (options.config.attributify) {
      if (attributes.length) {
        const attributesObject = {};
        attributes.forEach(([name2, value]) => {
          if (!attributesObject[name2])
            attributesObject[name2] = [];
          attributesObject[name2].push(...value.split(regexClassSplitter).filter(Boolean));
        });
        const attributifyStyle = processor.attributify(attributesObject);
        updateLayers(attributifyStyle.styleSheet.children, "__attributify", false);
        attributes.length = 0;
      }
    }
    (_b = options.onGenerated) == null ? void 0 : _b.call(options, {
      classes: classesGenerated,
      tags: tagsGenerated
    });
  }
  async function generateCSS(layer) {
    await ensureInit();
    if (options.enableScan && options.scanOptions.runOnStartup)
      await scan();
    buildPendingStyles();
    return layer ? buildLayerCss(layer) : [
      buildLayerCss("base"),
      buildLayerCss("components"),
      buildLayerCss("utilities")
    ].join("\n").trim();
  }
  function clearCache(clearAll = false) {
    layers.base = {};
    layers.utilities = {};
    layers.components = {};
    layerStylesMap.clear();
    completions = void 0;
    if (clearAll) {
      classesPending.clear();
      tagsPending.clear();
      tagsAvailable.clear();
    } else {
      include(classesPending, classesGenerated);
      include(tagsPending, tagsGenerated);
      include(tagsPending, preflightTags);
    }
    include(tagsAvailable, htmlTags);
    include(classesPending, options.safelist);
    include(tagsPending, options.preflightOptions.safelist);
    exclude(tagsAvailable, preflightTags);
    exclude(tagsAvailable, options.preflightOptions.safelist);
    classesGenerated.clear();
    tagsGenerated.clear();
    attrsGenerated.clear();
  }
  async function lock(fn) {
    const p = fn();
    _locks.push(p);
    await p;
    const i = _locks.indexOf(p);
    if (i >= 0)
      _locks.splice(i, 1);
  }
  async function waitLocks() {
    await Promise.all(_locks);
  }
  const utils = {
    init,
    ensureInit,
    extractFile,
    applyExtractors: applyExtractors2,
    generateCSS,
    getFiles,
    clearCache,
    transformCSS,
    transformGroups,
    get transformAlias() {
      return _transformAlias;
    },
    buildPendingStyles,
    isDetectTarget,
    isScanTarget,
    isCssTransformTarget,
    isExcluded,
    scan,
    classesGenerated,
    classesPending,
    tagsGenerated,
    tagsPending,
    tagsAvailable,
    layersMeta: layers,
    addClasses,
    addTags,
    getCompletions,
    lock,
    waitLocks,
    get initialized() {
      return !!processor;
    },
    get options() {
      return options;
    },
    get files() {
      return files;
    },
    get globs() {
      return options.scanOptions.include;
    },
    get processor() {
      return processor;
    },
    get scanned() {
      return scanned;
    },
    get configFilePath() {
      return options.configFilePath;
    },
    get hasPending() {
      return Boolean(tagsPending.size || classesPending.size);
    }
  };
  async function _init() {
    var _a;
    options = await resolveOptions(userOptions, utilsOptions, true);
    files = [];
    processor = new import_windicss.default(options.config);
    clearCache(false);
    (_a = options.onInitialized) == null ? void 0 : _a.call(options, utils);
    _transformAlias = buildAliasTransformer(options.config.alias);
    return processor;
  }
  let _promise_init;
  async function init() {
    _promise_init = _init();
    return _promise_init;
  }
  async function ensureInit() {
    if (processor)
      return processor;
    if (!_promise_init)
      _promise_init = _init();
    return _promise_init;
  }
  return utils;
}

// src/index.ts
__reExport(src_exports, resolveOptions_exports);

// src/merge.ts
var isObject = (val) => toString.call(val) === "[object Object]";
function deepMerge(a, b, rootPath) {
  a = __spreadValues({}, a);
  Object.keys(b).forEach((key) => {
    if (isObject(a[key]))
      a[key] = deepMerge(a[key], b[key], rootPath ? `${rootPath}.${key}` : key);
    else if (Array.isArray(a[key]))
      a[key] = [...a[key], ...b[key]];
    else
      a[key] = b[key];
  });
  return a;
}
function mergeWindicssConfig(a, b) {
  return deepMerge(a, b, "");
}
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultExtractor,
  PugExtractor,
  SupportedLayers,
  SvelteExtractor,
  applyExtractors,
  buildAliasTransformer,
  createUtils,
  defaultAlias,
  defineConfig,
  escapeRegExp,
  exclude,
  flattenArray,
  getDefaultExtractors,
  htmlTags,
  include,
  isResolvedOptions,
  kebabCase,
  mergeArrays,
  mergeWindicssConfig,
  partition,
  preflightTags,
  resolveOptions,
  slash,
  toArray,
  transformGroups
});
