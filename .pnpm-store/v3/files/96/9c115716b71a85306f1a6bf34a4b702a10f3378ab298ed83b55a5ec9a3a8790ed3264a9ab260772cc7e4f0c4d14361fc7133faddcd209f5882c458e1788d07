"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomIcon = void 0;
const debug_1 = __importDefault(require("debug"));
const utils_1 = require("./utils");
const debug = (0, debug_1.default)('@iconify-loader:custom');
/**
 * Get custom icon from inline collection or using loader
 */
async function getCustomIcon(custom, collection, icon, iconsCustomizations) {
    let result;
    debug(`${collection}:${icon}`);
    if (typeof custom === 'function') {
        result = await custom(icon);
    }
    else {
        const inline = custom[icon];
        result = typeof inline === 'function' ? await inline() : inline;
    }
    if (result) {
        if (!result.startsWith('<svg ')) {
            console.warn(`Custom icon "${icon}" in "${collection}" is not a valid SVG`);
            return result;
        }
        const { transform, additionalProps = {}, iconCustomizer, } = iconsCustomizations || {};
        return await (0, utils_1.mergeIconProps)(transform ? await transform(result) : result, collection, icon, additionalProps, undefined, iconCustomizer);
    }
}
exports.getCustomIcon = getCustomIcon;
