"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullIcon = exports.iconDefaults = exports.matchName = void 0;
/**
 * Expression to test part of icon name.
 */
exports.matchName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
/**
 * Default values for all optional IconifyIcon properties
 */
exports.iconDefaults = Object.freeze({
    left: 0,
    top: 0,
    width: 16,
    height: 16,
    rotate: 0,
    vFlip: false,
    hFlip: false,
});
/**
 * Add optional properties to icon
 */
function fullIcon(data) {
    return { ...exports.iconDefaults, ...data };
}
exports.fullIcon = fullIcon;
