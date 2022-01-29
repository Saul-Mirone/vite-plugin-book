"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchForIcon = exports.loadCollection = void 0;
const fs_1 = require("fs");
const build_1 = require("../svg/build");
const get_icon_1 = require("../icon-set/get-icon");
const utils_1 = require("./utils");
const debug_1 = __importDefault(require("debug"));
const local_pkg_1 = require("local-pkg");
const customisations_1 = require("../customisations");
const debug = (0, debug_1.default)('@iconify-loader:icon');
const debugModern = (0, debug_1.default)('@iconify-loader:modern');
const debugLegacy = (0, debug_1.default)('@iconify-loader:legacy');
const _collections = {};
const isLegacyExists = (0, local_pkg_1.isPackageExists)('@iconify/json');
async function loadCollection(name, autoInstall = false) {
    if (!_collections[name]) {
        _collections[name] = task();
    }
    return _collections[name];
    async function task() {
        let jsonPath = (0, local_pkg_1.resolveModule)(`@iconify-json/${name}/icons.json`);
        if (jsonPath) {
            debugModern(name);
        }
        if (!jsonPath && isLegacyExists) {
            jsonPath = (0, local_pkg_1.resolveModule)(`@iconify/json/json/${name}.json`);
            if (jsonPath) {
                debugLegacy(name);
            }
        }
        if (!jsonPath && !isLegacyExists && autoInstall) {
            await (0, utils_1.tryInstallPkg)(`@iconify-json/${name}`);
            jsonPath = (0, local_pkg_1.resolveModule)(`@iconify-json/${name}/icons.json`);
        }
        if (jsonPath) {
            return JSON.parse(await fs_1.promises.readFile(jsonPath, 'utf8'));
        }
        else {
            debugModern(`failed to load ${name}`);
            return undefined;
        }
    }
}
exports.loadCollection = loadCollection;
async function searchForIcon(iconSet, collection, ids, iconCustomizations) {
    let iconData;
    const { customize, additionalProps = {}, iconCustomizer, } = iconCustomizations || {};
    for (const id of ids) {
        iconData = (0, get_icon_1.getIconData)(iconSet, id, true);
        if (iconData) {
            debug(`${collection}:${id}`);
            const defaultCustomizations = { ...customisations_1.defaults };
            const { attributes, body } = (0, build_1.iconToSVG)(iconData, typeof customize === 'function'
                ? customize(defaultCustomizations)
                : defaultCustomizations);
            return await (0, utils_1.mergeIconProps)(`<svg>${body}</svg>`, collection, id, additionalProps, () => attributes, iconCustomizer);
        }
    }
}
exports.searchForIcon = searchForIcon;
