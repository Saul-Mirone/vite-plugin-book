'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@unocss/core');

const GoogleFontsProvider = {
  name: "google",
  getImportUrl(fonts) {
    const strings = fonts.filter((i) => i.provider === "google").map((i) => {
      let name = i.name.replace(/\s+/g, "+");
      if (i.weights?.length) {
        name += i.italic ? `:ital,wght@${i.weights.flatMap((i2) => [`0,${i2}`, `1,${i2}`]).sort().join(";")}` : `:wght@${i.weights.sort().join(";")}`;
      }
      return `family=${name}`;
    }).join("&");
    return `https://fonts.googleapis.com/css2?${strings}&display=swap`;
  },
  getFontName(font) {
    return `"${font.name}"`;
  }
};

const NoneProvider = {
  name: "none",
  getPreflight() {
    return "";
  },
  getFontName(font) {
    return font.name;
  }
};

const layerName = "__webfonts__";
function normalizedFontMeta(meta, defaultProvider) {
  if (typeof meta !== "string") {
    meta.provider = meta.provider ?? defaultProvider;
    return meta;
  }
  const [name, weights = ""] = meta.split(":");
  return {
    name,
    weights: weights.split(/[,;]\s*/).filter(Boolean),
    provider: defaultProvider
  };
}
const providers = {
  google: GoogleFontsProvider,
  none: NoneProvider
};
const preset = (options = {}) => {
  const {
    provider: defaultProvider = "google",
    extendTheme = true,
    inlineImports = true,
    themeKey = "fontFamily"
  } = options;
  const fontObject = Object.fromEntries(Object.entries(options.fonts || {}).map(([name, meta]) => [name, core.toArray(meta).map((m) => normalizedFontMeta(m, defaultProvider))]));
  const fonts = Object.values(fontObject).flatMap((i) => i);
  const importCache = {};
  async function importUrl(url) {
    if (inlineImports) {
      if (!importCache[url]) {
        try {
          const { default: axios } = await import('axios');
          const { data } = await axios.get(url, { headers: {} });
          importCache[url] = data;
        } catch (e) {
          console.error("Failed to fetch web fonts");
          console.error(e);
          if (typeof process !== "undefined" && process.env.CI)
            throw e;
        }
      }
      return importCache[url];
    } else {
      return `@import url('${url}')`;
    }
  }
  const preset2 = {
    name: "@unocss/preset-web-fonts",
    layers: {
      [layerName]: -Infinity
    },
    preflights: [
      {
        async getCSS() {
          const names = new Set(fonts.map((i) => i.provider || defaultProvider));
          const preflights = [];
          for (const name of names) {
            const fontsForProvider = fonts.filter((i) => i.provider === name);
            const provider = providers[name];
            if (provider.getImportUrl) {
              const url = provider.getImportUrl(fontsForProvider);
              if (url)
                preflights.push(await importUrl(url));
            }
            preflights.push(provider.getPreflight?.(fontsForProvider));
          }
          return preflights.filter(Boolean).join("\n");
        },
        layer: layerName
      }
    ]
  };
  if (extendTheme) {
    preset2.extendTheme = (theme) => {
      if (!theme[themeKey])
        theme[themeKey] = {};
      const obj = Object.fromEntries(Object.entries(fontObject).map(([name, fonts2]) => [name, fonts2.map((f) => providers[f.provider || defaultProvider].getFontName(f))]));
      for (const key of Object.keys(obj)) {
        if (typeof theme[themeKey][key] === "string")
          theme[themeKey][key] = obj[key].map((i) => `${i},`).join("") + theme[themeKey][key];
        else
          theme[themeKey][key] = obj[key].join(",");
      }
    };
  }
  return preset2;
};

exports["default"] = preset;
exports.normalizedFontMeta = normalizedFontMeta;
