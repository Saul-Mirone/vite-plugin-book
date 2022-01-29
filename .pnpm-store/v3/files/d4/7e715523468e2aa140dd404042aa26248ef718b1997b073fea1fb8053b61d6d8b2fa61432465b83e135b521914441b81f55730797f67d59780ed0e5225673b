"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIcons = exports.propsToCopy = void 0;
const icon_1 = require("../icon");
/**
 * Optional properties that must be copied when copying icon set
 */
exports.propsToCopy = Object.keys(icon_1.iconDefaults).concat([
    'provider',
]);
/**
 * Extract icons from icon set
 */
function getIcons(data, icons, not_found) {
    const result = {
        prefix: data.prefix,
        icons: Object.create(null),
    };
    const tested = new Set();
    let empty = true;
    function copy(name, iteration) {
        var _a, _b, _c;
        if (iteration > 5 || tested.has(name)) {
            // Already copied or too much nesting
            return true;
        }
        tested.add(name);
        // Check for icon
        if (data.icons[name] !== void 0) {
            empty = false;
            result.icons[name] = { ...data.icons[name] };
            return true;
        }
        // Check for alias
        if (((_a = data.aliases) === null || _a === void 0 ? void 0 : _a[name]) !== void 0) {
            const copied = copy(data.aliases[name].parent, iteration + 1);
            if (copied) {
                if (result.aliases === void 0) {
                    result.aliases = Object.create(null);
                }
                result.aliases[name] = { ...data.aliases[name] };
            }
            return copied;
        }
        // Check for character, return as alias
        if (((_b = data.chars) === null || _b === void 0 ? void 0 : _b[name]) !== void 0) {
            const parent = (_c = data.chars) === null || _c === void 0 ? void 0 : _c[name];
            const copied = copy(parent, iteration + 1);
            if (copied) {
                if (result.aliases === void 0) {
                    result.aliases = Object.create(null);
                }
                result.aliases[name] = {
                    parent,
                };
            }
            return copied;
        }
        // Not found
        return false;
    }
    // Copy common properties
    exports.propsToCopy.forEach((attr) => {
        if (data[attr] !== void 0) {
            result[attr] = data[attr];
        }
    });
    // Copy all icons
    icons.forEach((name) => {
        if (!copy(name, 0) && not_found === true) {
            if (result.not_found === void 0) {
                result.not_found = [];
            }
            result.not_found.push(name);
        }
    });
    return empty && not_found !== true ? null : result;
}
exports.getIcons = getIcons;
