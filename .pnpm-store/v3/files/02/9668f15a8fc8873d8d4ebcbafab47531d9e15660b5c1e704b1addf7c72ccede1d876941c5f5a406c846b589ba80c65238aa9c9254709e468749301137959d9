'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const _default = require('./chunks/default.cjs');
const _default$1 = require('./chunks/default2.cjs');
const _default$2 = require('./chunks/default3.cjs');
const colors = require('./chunks/colors.cjs');
const utilities = require('./chunks/utilities.cjs');
require('@unocss/core');
require('./chunks/variants.cjs');

const presetMini = (options = {}) => {
  options.dark = options.dark ?? "class";
  options.attributifyPseudo = options.attributifyPseudo ?? false;
  return {
    name: "@unocss/preset-mini",
    theme: _default.theme,
    rules: _default$1.rules,
    variants: _default$2.variants(options),
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

exports.theme = _default.theme;
exports.colors = colors.colors;
exports.parseColor = utilities.parseColor;
exports["default"] = presetMini;
exports.presetMini = presetMini;
