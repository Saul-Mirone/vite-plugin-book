"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeCustomisations = exports.defaults = void 0;
/**
 * Default icon customisations values
 */
exports.defaults = Object.freeze({
    // Display mode
    inline: false,
    // Dimensions
    width: null,
    height: null,
    // Alignment
    hAlign: 'center',
    vAlign: 'middle',
    slice: false,
    // Transformations
    hFlip: false,
    vFlip: false,
    rotate: 0,
});
/**
 * TypeScript
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental, @typescript-eslint/no-unused-vars
function assertNever(v) {
    //
}
/**
 * Convert IconifyIconCustomisations to FullIconCustomisations
 */
function mergeCustomisations(defaults, item) {
    const result = {};
    for (const key in defaults) {
        const attr = key;
        // Copy old value
        result[attr] = defaults[attr];
        if (item[attr] === void 0) {
            continue;
        }
        // Validate new value
        const value = item[attr];
        switch (attr) {
            // Boolean attributes that override old value
            case 'inline':
            case 'slice':
                if (typeof value === 'boolean') {
                    result[attr] = value;
                }
                break;
            // Boolean attributes that are merged
            case 'hFlip':
            case 'vFlip':
                if (value === true) {
                    result[attr] = !result[attr];
                }
                break;
            // Non-empty string
            case 'hAlign':
            case 'vAlign':
                if (typeof value === 'string' && value !== '') {
                    result[attr] = value;
                }
                break;
            // Non-empty string / non-zero number / null
            case 'width':
            case 'height':
                if ((typeof value === 'string' && value !== '') ||
                    (typeof value === 'number' && value) ||
                    value === null) {
                    result[attr] = value;
                }
                break;
            // Rotation
            case 'rotate':
                if (typeof value === 'number') {
                    result[attr] += value;
                }
                break;
            default:
                assertNever(attr);
        }
    }
    return result;
}
exports.mergeCustomisations = mergeCustomisations;
