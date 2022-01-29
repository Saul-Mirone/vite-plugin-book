'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const VitePlugin = require('@unocss/vite');
const presetUno = require('@unocss/preset-uno');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const VitePlugin__default = /*#__PURE__*/_interopDefaultLegacy(VitePlugin);
const presetUno__default = /*#__PURE__*/_interopDefaultLegacy(presetUno);

function UnocssVitePlugin(configOrPath) {
  return VitePlugin__default(configOrPath, {
    presets: [
      presetUno__default()
    ]
  });
}

exports["default"] = UnocssVitePlugin;
for (const k in VitePlugin) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = VitePlugin[k];
}
