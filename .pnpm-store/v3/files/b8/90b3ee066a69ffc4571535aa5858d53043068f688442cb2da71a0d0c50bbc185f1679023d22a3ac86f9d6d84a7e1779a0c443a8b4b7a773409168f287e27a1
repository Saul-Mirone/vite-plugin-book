"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToKebab = exports.pascalize = exports.camelize = void 0;
/**
 * Convert string to camelCase
 */
function camelize(str) {
    return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
}
exports.camelize = camelize;
/**
 * Convert string to PascaleCase
 */
function pascalize(str) {
    const camel = camelize(str);
    return camel.slice(0, 1).toUpperCase() + camel.slice(1);
}
exports.pascalize = pascalize;
/**
 * Convert camelCase string to kebab-case
 */
function camelToKebab(key) {
    const result = key
        .replace(/:/g, '-')
        .replace(/([A-Z])/g, ' $1')
        .trim();
    return result.split(/\s+/g).join('-').toLowerCase();
}
exports.camelToKebab = camelToKebab;
