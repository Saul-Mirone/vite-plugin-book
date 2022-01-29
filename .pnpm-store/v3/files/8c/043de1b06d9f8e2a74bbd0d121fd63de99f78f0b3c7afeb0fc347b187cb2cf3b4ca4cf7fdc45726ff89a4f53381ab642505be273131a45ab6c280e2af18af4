'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const fs = require('fs');
const localPkg = require('local-pkg');

const _collections = {};
const isLegacyExists = localPkg.isPackageExists("@iconify/json");
async function loadCollectionFromFS(name) {
  if (!_collections[name])
    _collections[name] = task();
  return _collections[name];
  async function task() {
    let jsonPath = localPkg.resolveModule(`@iconify-json/${name}/icons.json`);
    if (!jsonPath && isLegacyExists)
      jsonPath = localPkg.resolveModule(`@iconify/json/json/${name}.json`);
    if (jsonPath) {
      const icons = JSON.parse(await fs.promises.readFile(jsonPath, "utf8"));
      return icons;
    } else {
      return void 0;
    }
  }
}

exports.loadCollectionFromFS = loadCollectionFromFS;
