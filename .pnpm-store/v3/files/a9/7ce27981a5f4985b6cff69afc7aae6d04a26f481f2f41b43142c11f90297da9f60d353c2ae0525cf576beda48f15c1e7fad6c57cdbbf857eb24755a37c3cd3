"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIconSet = exports.matchChar = void 0;
const icon_1 = require("../icon");
/**
 * Match character
 */
exports.matchChar = /^[a-f0-9]+(-[a-f0-9]+)*$/;
/**
 * Validate icon
 *
 * Returns name of property that failed validation or null on success
 */
function validateIconProps(item, fix) {
    // Check other properties
    for (const key in item) {
        const attr = key;
        const value = item[attr];
        const type = typeof value;
        if (type === 'undefined') {
            // Undefined was passed ???
            delete item[attr];
            continue;
        }
        switch (key) {
            case 'body':
            case 'parent':
                if (type !== 'string') {
                    return key;
                }
                break;
            case 'hFlip':
            case 'vFlip':
            case 'hidden':
                if (type !== 'boolean') {
                    if (fix) {
                        delete item[attr];
                    }
                    else {
                        return key;
                    }
                }
                break;
            case 'width':
            case 'height':
            case 'left':
            case 'top':
            case 'rotate':
            case 'inlineHeight': // Legacy properties
            case 'inlineTop':
            case 'verticalAlign':
                if (type !== 'number') {
                    if (fix) {
                        delete item[attr];
                    }
                    else {
                        return key;
                    }
                }
                break;
            default:
                // Unknown property, make sure its not object
                if (type === 'object') {
                    if (fix) {
                        delete item[attr];
                    }
                    else {
                        return key;
                    }
                }
        }
    }
    return null;
}
/**
 * Validate icon set, return it as IconifyJSON type on success, throw error on failure
 */
function validateIconSet(obj, options) {
    const fix = !!(options === null || options === void 0 ? void 0 : options.fix);
    // Check for object with 'icons' nested object
    if (typeof obj !== 'object' ||
        obj === null ||
        typeof obj.icons !== 'object' ||
        !obj.icons) {
        throw new Error('Bad icon set');
    }
    // Convert type
    const data = obj;
    // Set or validate prefix
    if (typeof (options === null || options === void 0 ? void 0 : options.prefix) === 'string') {
        data.prefix = options.prefix;
    }
    else if (typeof data.prefix !== 'string' ||
        !data.prefix.match(icon_1.matchName)) {
        throw new Error('Invalid prefix');
    }
    // Set or validate provider
    if (typeof (options === null || options === void 0 ? void 0 : options.provider) === 'string') {
        data.provider = options.provider;
    }
    else if (data.provider !== void 0) {
        const value = data.provider;
        if (typeof value !== 'string' ||
            (value !== '' && !value.match(icon_1.matchName))) {
            if (fix) {
                delete data.provider;
            }
            else {
                throw new Error('Invalid provider');
            }
        }
    }
    // Validate all icons
    const icons = data.icons;
    Object.keys(icons).forEach((name) => {
        if (!name.match(icon_1.matchName)) {
            if (fix) {
                delete icons[name];
                return;
            }
            throw new Error(`Invalid icon name: "${name}"`);
        }
        const item = icons[name];
        if (typeof item !== 'object' ||
            item === null ||
            typeof item.body !== 'string') {
            if (fix) {
                delete icons[name];
                return;
            }
            throw new Error(`Invalid icon: "${name}"`);
        }
        // Check other properties
        const key = typeof item.parent ===
            'string'
            ? 'parent'
            : validateIconProps(item, fix);
        if (key !== null) {
            if (fix) {
                delete icons[name];
                return;
            }
            throw new Error(`Invalid property "${key}" in icon "${name}"`);
        }
    });
    // Make sure icons list is not empty
    if (!Object.keys(data.icons).length) {
        throw new Error('Icon set is empty');
    }
    // Validate aliases
    if (data.aliases !== void 0) {
        if (typeof data.aliases !== 'object' || data.aliases === null) {
            if (fix) {
                delete data.aliases;
            }
            else {
                throw new Error('Invalid aliases list');
            }
        }
    }
    if (typeof data.aliases === 'object') {
        const aliases = data.aliases;
        const validatedAliases = new Set();
        const failedAliases = new Set();
        // eslint-disable-next-line no-inner-declarations
        function validateAlias(name, iteration) {
            // Check if alias has already been validated
            if (validatedAliases.has(name)) {
                return !failedAliases.has(name);
            }
            const item = aliases[name];
            if (
            // Loop or very long chain: invalidate all aliases
            iteration > 5 ||
                // Check if value is a valid object
                typeof item !== 'object' ||
                item === null ||
                typeof item.parent !== 'string' ||
                // Check if name is valid
                !name.match(icon_1.matchName)) {
                if (fix) {
                    delete aliases[name];
                    failedAliases.add(name);
                    return false;
                }
                throw new Error(`Invalid icon alias: "${name}"`);
            }
            // Check if parent icon/alias exists
            const parent = item.parent;
            if (data.icons[parent] === void 0) {
                // Check for parent alias
                if (aliases[parent] === void 0 ||
                    !validateAlias(parent, iteration + 1)) {
                    if (fix) {
                        delete aliases[name];
                        failedAliases.add(name);
                        return false;
                    }
                    throw new Error(`Missing parent icon for alias "${name}`);
                }
            }
            // Check other properties
            if (fix &&
                item.body !== void 0) {
                delete item.body;
            }
            const key = item.body !== void 0
                ? 'body'
                : validateIconProps(item, fix);
            if (key !== null) {
                if (fix) {
                    delete aliases[name];
                    failedAliases.add(name);
                    return false;
                }
                throw new Error(`Invalid property "${key}" in alias "${name}"`);
            }
            validatedAliases.add(name);
            return true;
        }
        Object.keys(aliases).forEach((name) => {
            validateAlias(name, 0);
        });
        // Delete empty aliases object
        if (fix && !Object.keys(data.aliases).length) {
            delete data.aliases;
        }
    }
    // Validate all properties that can be optimised
    Object.keys(icon_1.iconDefaults).forEach((prop) => {
        const expectedType = typeof icon_1.iconDefaults[prop];
        const actualType = typeof data[prop];
        if (actualType !== 'undefined' && actualType !== expectedType) {
            throw new Error(`Invalid value type for "${prop}"`);
        }
    });
    // Validate characters map
    if (data.chars !== void 0) {
        if (typeof data.chars !== 'object' || data.chars === null) {
            if (fix) {
                delete data.chars;
            }
            else {
                throw new Error('Invalid characters map');
            }
        }
    }
    if (typeof data.chars === 'object') {
        const chars = data.chars;
        Object.keys(chars).forEach((char) => {
            var _a;
            if (!char.match(exports.matchChar) || typeof chars[char] !== 'string') {
                if (fix) {
                    delete chars[char];
                    return;
                }
                throw new Error(`Invalid character "${char}"`);
            }
            const target = chars[char];
            if (data.icons[target] === void 0 &&
                ((_a = data.aliases) === null || _a === void 0 ? void 0 : _a[target]) === void 0) {
                if (fix) {
                    delete chars[char];
                    return;
                }
                throw new Error(`Character "${char}" points to missing icon "${target}"`);
            }
        });
        // Delete empty aliases object
        if (fix && !Object.keys(data.chars).length) {
            delete data.chars;
        }
    }
    return data;
}
exports.validateIconSet = validateIconSet;
