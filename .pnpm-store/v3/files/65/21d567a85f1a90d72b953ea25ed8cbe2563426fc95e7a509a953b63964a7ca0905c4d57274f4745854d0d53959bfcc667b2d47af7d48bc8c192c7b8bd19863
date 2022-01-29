"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIconSet = exports.isVariation = void 0;
const icon_1 = require("../icon");
const get_icon_1 = require("./get-icon");
const validate_1 = require("./validate");
/**
 * Check if alias is a variation
 */
function isVariation(item) {
    for (const key in icon_1.iconDefaults) {
        if (item[key] !== void 0) {
            return true;
        }
    }
    return false;
}
exports.isVariation = isVariation;
/**
 * Extract icons from an icon set
 *
 * Returns list of icons that were found in icon set
 */
function parseIconSet(data, callback, options) {
    options = options || {};
    // List of icon names
    const names = [];
    // Must be an object and must have 'icons' property
    if (typeof data !== 'object' || typeof data.icons !== 'object') {
        return names;
    }
    // Validate icon set
    const validate = options.validate;
    if (validate !== false) {
        // Validate icon set
        try {
            (0, validate_1.validateIconSet)(data, typeof validate === 'object' ? validate : { fix: true });
        }
        catch (err) {
            return names;
        }
    }
    // Check for missing icons list returned by API
    if (data.not_found instanceof Array) {
        data.not_found.forEach((name) => {
            callback(name, null);
            names.push(name);
        });
    }
    // Get icons
    const icons = data.icons;
    Object.keys(icons).forEach((name) => {
        const iconData = (0, get_icon_1.getIconData)(data, name, true);
        if (iconData) {
            // Call callback
            callback(name, iconData);
            names.push(name);
        }
    });
    // Get aliases
    const parseAliases = options.aliases || 'all';
    if (parseAliases !== 'none' && typeof data.aliases === 'object') {
        const aliases = data.aliases;
        Object.keys(aliases).forEach((name) => {
            if (parseAliases === 'variations' && isVariation(aliases[name])) {
                return;
            }
            const iconData = (0, get_icon_1.getIconData)(data, name, true);
            if (iconData) {
                // Call callback
                callback(name, iconData);
                names.push(name);
            }
        });
    }
    return names;
}
exports.parseIconSet = parseIconSet;
