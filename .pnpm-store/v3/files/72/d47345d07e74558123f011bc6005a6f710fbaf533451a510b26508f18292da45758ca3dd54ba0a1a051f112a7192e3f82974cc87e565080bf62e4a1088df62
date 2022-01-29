"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBoolean = void 0;
/**
 * Get boolean customisation value from attribute
 */
function toBoolean(name, value, defaultValue) {
    switch (typeof value) {
        case 'boolean':
            return value;
        case 'number':
            return !!value;
        case 'string':
            switch (value.toLowerCase()) {
                case '1':
                case 'true':
                case name.toLowerCase():
                    return true;
                case '0':
                case 'false':
                case '':
                    return false;
            }
    }
    return defaultValue;
}
exports.toBoolean = toBoolean;
