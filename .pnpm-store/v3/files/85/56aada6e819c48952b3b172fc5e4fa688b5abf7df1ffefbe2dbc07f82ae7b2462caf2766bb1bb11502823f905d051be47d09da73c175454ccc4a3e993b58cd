"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIconData = void 0;
const icon_1 = require("../icon");
const merge_1 = require("../icon/merge");
function getIconData(data, name, full = false) {
    function getIcon(name, iteration) {
        var _a, _b, _c, _d;
        if (data.icons[name] !== void 0) {
            // Return icon
            return Object.assign({}, data.icons[name]);
        }
        // Check loop
        if (iteration > 5) {
            return null;
        }
        // Check if alias exists
        if (((_a = data.aliases) === null || _a === void 0 ? void 0 : _a[name]) !== void 0) {
            const item = (_b = data.aliases) === null || _b === void 0 ? void 0 : _b[name];
            const result = getIcon(item.parent, iteration + 1);
            if (result) {
                return (0, merge_1.mergeIconData)(result, item);
            }
            return result;
        }
        // Check if character exists
        if (iteration === 0 && ((_c = data.chars) === null || _c === void 0 ? void 0 : _c[name]) !== void 0) {
            return getIcon((_d = data.chars) === null || _d === void 0 ? void 0 : _d[name], iteration + 1);
        }
        return null;
    }
    const result = getIcon(name, 0);
    // Add default properties
    if (result) {
        for (const key in icon_1.iconDefaults) {
            if (result[key] === void 0 &&
                data[key] !== void 0) {
                result[key] =
                    data[key];
            }
        }
    }
    // Return icon
    return result && full ? (0, icon_1.fullIcon)(result) : result;
}
exports.getIconData = getIconData;
