import { t as theme } from './chunks/default.mjs';
export { t as theme } from './chunks/default.mjs';
import { r as rules } from './chunks/default2.mjs';
import { v as variants } from './chunks/default3.mjs';
export { c as colors } from './chunks/colors.mjs';
export { p as parseColor } from './chunks/utilities.mjs';
import '@unocss/core';
import './chunks/variants.mjs';

const presetMini = (options = {}) => {
  options.dark = options.dark ?? "class";
  options.attributifyPseudo = options.attributifyPseudo ?? false;
  return {
    name: "@unocss/preset-mini",
    theme,
    rules,
    variants: variants(options),
    options,
    postprocess: options.variablePrefix && options.variablePrefix !== "un-" ? VarPrefixPostprocessor(options.variablePrefix) : void 0
  };
};
function VarPrefixPostprocessor(prefix) {
  return (obj) => {
    obj.entries.forEach((i) => {
      i[0] = i[0].replace(/^--un-/, `--${prefix}`);
      if (typeof i[1] === "string")
        i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`);
    });
  };
}

export { presetMini as default, presetMini };
