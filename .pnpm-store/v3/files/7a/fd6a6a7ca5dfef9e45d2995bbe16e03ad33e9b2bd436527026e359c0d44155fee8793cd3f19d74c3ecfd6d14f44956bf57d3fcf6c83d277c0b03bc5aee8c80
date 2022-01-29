"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateFromString = void 0;
/**
 * Get rotation value
 */
function rotateFromString(value, defaultValue = 0) {
    const units = value.replace(/^-?[0-9.]*/, '');
    function cleanup(value) {
        while (value < 0) {
            value += 4;
        }
        return value % 4;
    }
    if (units === '') {
        const num = parseInt(value);
        return isNaN(num) ? 0 : cleanup(num);
    }
    else if (units !== value) {
        let split = 0;
        switch (units) {
            case '%':
                // 25% -> 1, 50% -> 2, ...
                split = 25;
                break;
            case 'deg':
                // 90deg -> 1, 180deg -> 2, ...
                split = 90;
        }
        if (split) {
            let num = parseFloat(value.slice(0, value.length - units.length));
            if (isNaN(num)) {
                return 0;
            }
            num = num / split;
            return num % 1 === 0 ? cleanup(num) : 0;
        }
    }
    return defaultValue;
}
exports.rotateFromString = rotateFromString;
