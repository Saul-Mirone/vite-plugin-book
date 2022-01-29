// src/loader/custom.ts
import createDebugger from "debug";
import { mergeIconProps } from "./utils.mjs";
var debug = createDebugger("@iconify-loader:custom");
async function getCustomIcon(custom, collection, icon, iconsCustomizations) {
  let result;
  debug(`${collection}:${icon}`);
  if (typeof custom === "function") {
    result = await custom(icon);
  } else {
    const inline = custom[icon];
    result = typeof inline === "function" ? await inline() : inline;
  }
  if (result) {
    if (!result.startsWith("<svg ")) {
      console.warn(`Custom icon "${icon}" in "${collection}" is not a valid SVG`);
      return result;
    }
    const {
      transform,
      additionalProps = {},
      iconCustomizer
    } = iconsCustomizations || {};
    return await mergeIconProps(transform ? await transform(result) : result, collection, icon, additionalProps, void 0, iconCustomizer);
  }
}
export {
  getCustomIcon
};
