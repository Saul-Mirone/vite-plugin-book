// src/loader/modern.ts
import { promises as fs } from "fs";
import { iconToSVG } from "../svg/build.mjs";
import { getIconData } from "../icon-set/get-icon.mjs";
import { mergeIconProps, tryInstallPkg } from "./utils.mjs";
import createDebugger from "debug";
import { isPackageExists, resolveModule } from "local-pkg";
import { defaults as DefaultIconCustomizations } from "../customisations/index.mjs";
var debug = createDebugger("@iconify-loader:icon");
var debugModern = createDebugger("@iconify-loader:modern");
var debugLegacy = createDebugger("@iconify-loader:legacy");
var _collections = {};
var isLegacyExists = isPackageExists("@iconify/json");
async function loadCollection(name, autoInstall = false) {
  if (!_collections[name]) {
    _collections[name] = task();
  }
  return _collections[name];
  async function task() {
    let jsonPath = resolveModule(`@iconify-json/${name}/icons.json`);
    if (jsonPath) {
      debugModern(name);
    }
    if (!jsonPath && isLegacyExists) {
      jsonPath = resolveModule(`@iconify/json/json/${name}.json`);
      if (jsonPath) {
        debugLegacy(name);
      }
    }
    if (!jsonPath && !isLegacyExists && autoInstall) {
      await tryInstallPkg(`@iconify-json/${name}`);
      jsonPath = resolveModule(`@iconify-json/${name}/icons.json`);
    }
    if (jsonPath) {
      return JSON.parse(await fs.readFile(jsonPath, "utf8"));
    } else {
      debugModern(`failed to load ${name}`);
      return void 0;
    }
  }
}
async function searchForIcon(iconSet, collection, ids, iconCustomizations) {
  let iconData;
  const {
    customize,
    additionalProps = {},
    iconCustomizer
  } = iconCustomizations || {};
  for (const id of ids) {
    iconData = getIconData(iconSet, id, true);
    if (iconData) {
      debug(`${collection}:${id}`);
      const defaultCustomizations = { ...DefaultIconCustomizations };
      const { attributes, body } = iconToSVG(iconData, typeof customize === "function" ? customize(defaultCustomizations) : defaultCustomizations);
      return await mergeIconProps(`<svg>${body}</svg>`, collection, id, additionalProps, () => attributes, iconCustomizer);
    }
  }
}
export {
  loadCollection,
  searchForIcon
};
