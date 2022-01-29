"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeIconData = void 0;
const index_1 = require("./index");
/**
 * Merge icon and alias
 */
function mergeIconData(icon, alias) {
    const result = { ...icon };
    for (const key in index_1.iconDefaults) {
        const prop = key;
        if (alias[prop] !== void 0) {
            const value = alias[prop];
            if (result[prop] === void 0) {
                // Missing value
                result[prop] = value;
                continue;
            }
            switch (prop) {
                case 'rotate':
                    result[prop] =
                        (result[prop] + value) % 4;
                    break;
                case 'hFlip':
                case 'vFlip':
                    result[prop] = value !== result[prop];
                    break;
                default:
                    // Overwrite value
                    result[prop] =
                        value;
            }
        }
    }
    return result;
}
exports.mergeIconData = mergeIconData;
