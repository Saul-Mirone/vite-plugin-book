"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemIconLoader = void 0;
const fs_1 = require("fs");
const strings_1 = require("../misc/strings");
/**
 * Returns CustomIconLoader for loading icons from a directory
 */
function FileSystemIconLoader(dir, transform) {
    return async (name) => {
        const paths = [
            `${dir}/${name}.svg`,
            `${dir}/${(0, strings_1.camelize)(name)}.svg`,
            `${dir}/${(0, strings_1.pascalize)(name)}.svg`,
        ];
        let stat;
        for (const path of paths) {
            try {
                stat = await fs_1.promises.lstat(path);
            }
            catch (err) {
                continue;
            }
            if (stat.isFile()) {
                const svg = await fs_1.promises.readFile(path, 'utf-8');
                return typeof transform === 'function'
                    ? await transform(svg)
                    : svg;
            }
        }
    };
}
exports.FileSystemIconLoader = FileSystemIconLoader;
