"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandIconSet = void 0;
const icon_1 = require("../icon");
/**
 * Expand minified icon set
 *
 * Opposite of minifyIconSet() from ./minify.ts
 */
function expandIconSet(data) {
    const icons = Object.keys(data.icons);
    Object.keys(icon_1.iconDefaults).forEach((prop) => {
        if (typeof data[prop] !== typeof icon_1.iconDefaults[prop]) {
            return;
        }
        const value = data[prop];
        icons.forEach((name) => {
            const item = data.icons[name];
            if (item[prop] === void 0) {
                item[prop] = value;
            }
        });
        delete data[prop];
    });
}
exports.expandIconSet = expandIconSet;
