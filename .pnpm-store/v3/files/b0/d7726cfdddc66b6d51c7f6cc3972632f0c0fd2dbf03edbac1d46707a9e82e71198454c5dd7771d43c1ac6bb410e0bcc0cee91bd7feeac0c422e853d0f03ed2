// src/loader/loaders.ts
import { promises as fs } from "fs";
import { camelize, pascalize } from "../misc/strings.mjs";
function FileSystemIconLoader(dir, transform) {
  return async (name) => {
    const paths = [
      `${dir}/${name}.svg`,
      `${dir}/${camelize(name)}.svg`,
      `${dir}/${pascalize(name)}.svg`
    ];
    let stat;
    for (const path of paths) {
      try {
        stat = await fs.lstat(path);
      } catch (err) {
        continue;
      }
      if (stat.isFile()) {
        const svg = await fs.readFile(path, "utf-8");
        return typeof transform === "function" ? await transform(svg) : svg;
      }
    }
  };
}
export {
  FileSystemIconLoader
};
