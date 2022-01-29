"use strict";
/**
 * IDs usage:
 *
 * id="{id}"
 * xlink:href="#{id}"
 * url(#{id})
 *
 * From SVG animations:
 *
 * begin="0;{id}.end"
 * begin="{id}.end"
 * begin="{id}.click"
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceIDs = void 0;
/**
 * Regular expression for finding ids
 */
const regex = /\sid="(\S+)"/g;
/**
 * New random-ish prefix for ids
 *
 * Do not use dash, it cannot be used in SVG 2 animations
 */
const randomPrefix = 'IconifyId' +
    Date.now().toString(16) +
    ((Math.random() * 0x1000000) | 0).toString(16);
/**
 * Counter for ids, increasing with every replacement
 */
let counter = 0;
/**
 * Replace IDs in SVG output with unique IDs
 */
function replaceIDs(body, prefix = randomPrefix) {
    // Find all IDs
    const ids = [];
    let match;
    while ((match = regex.exec(body))) {
        ids.push(match[1]);
    }
    if (!ids.length) {
        return body;
    }
    // Replace with unique ids
    ids.forEach((id) => {
        const newID = typeof prefix === 'function' ? prefix(id) : prefix + counter++;
        const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        body = body.replace(
        // Allowed characters before id: [#;"]
        // Allowed characters after id: [)"], .[a-z]
        new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', 'g'), '$1' + newID + '$3');
    });
    return body;
}
exports.replaceIDs = replaceIDs;
