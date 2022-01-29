"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIcon = exports.stringToIcon = void 0;
const index_1 = require("./index");
/**
 * Convert string to Icon object.
 */
const stringToIcon = (value, validate, allowSimpleName, provider = '') => {
    const colonSeparated = value.split(':');
    // Check for provider with correct '@' at start
    if (value.slice(0, 1) === '@') {
        // First part is provider
        if (colonSeparated.length < 2 || colonSeparated.length > 3) {
            // "@provider:prefix:name" or "@provider:prefix-name"
            return null;
        }
        provider = colonSeparated.shift().slice(1);
    }
    // Check split by colon: "prefix:name", "provider:prefix:name"
    if (colonSeparated.length > 3 || !colonSeparated.length) {
        return null;
    }
    if (colonSeparated.length > 1) {
        // "prefix:name"
        const name = colonSeparated.pop();
        const prefix = colonSeparated.pop();
        const result = {
            // Allow provider without '@': "provider:prefix:name"
            provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
            prefix,
            name,
        };
        return validate && !(0, exports.validateIcon)(result) ? null : result;
    }
    // Attempt to split by dash: "prefix-name"
    const name = colonSeparated[0];
    const dashSeparated = name.split('-');
    if (dashSeparated.length > 1) {
        const result = {
            provider: provider,
            prefix: dashSeparated.shift(),
            name: dashSeparated.join('-'),
        };
        return validate && !(0, exports.validateIcon)(result) ? null : result;
    }
    // If allowEmpty is set, allow empty provider and prefix, allowing names like "home"
    if (allowSimpleName && provider === '') {
        const result = {
            provider: provider,
            prefix: '',
            name,
        };
        return validate && !(0, exports.validateIcon)(result, allowSimpleName)
            ? null
            : result;
    }
    return null;
};
exports.stringToIcon = stringToIcon;
/**
 * Check if icon is valid.
 *
 * This function is not part of stringToIcon because validation is not needed for most code.
 */
const validateIcon = (icon, allowSimpleName) => {
    if (!icon) {
        return false;
    }
    return !!((icon.provider === '' || icon.provider.match(index_1.matchName)) &&
        ((allowSimpleName && icon.prefix === '') ||
            icon.prefix.match(index_1.matchName)) &&
        icon.name.match(index_1.matchName));
};
exports.validateIcon = validateIcon;
