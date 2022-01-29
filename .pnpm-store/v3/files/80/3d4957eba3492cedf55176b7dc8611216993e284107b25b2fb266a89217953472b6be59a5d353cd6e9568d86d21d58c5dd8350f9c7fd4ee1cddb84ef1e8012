"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = void 0;
const index_1 = require("./index");
// Get all keys
const allKeys = Object.keys(index_1.defaults);
// All keys without width/height
const filteredKeys = allKeys.filter((key) => key !== 'width' && key !== 'height');
/**
 * Compare sets of cusotmisations, return false if they are different, true if the same
 *
 * If dimensions are derived from props1 or props2, do not compare them.
 */
function compare(item1, item2, compareDimensions = true) {
    const keys = compareDimensions ? allKeys : filteredKeys;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (item1[key] !== item2[key]) {
            return false;
        }
    }
    return true;
}
exports.compare = compare;
