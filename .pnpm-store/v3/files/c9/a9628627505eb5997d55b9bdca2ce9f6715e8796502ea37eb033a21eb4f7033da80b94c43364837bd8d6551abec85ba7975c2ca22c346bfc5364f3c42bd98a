import { promises } from 'fs';
import { isPackageExists, resolveModule } from 'local-pkg';

const _collections = {};
const isLegacyExists = isPackageExists("@iconify/json");
async function loadCollectionFromFS(name) {
  if (!_collections[name])
    _collections[name] = task();
  return _collections[name];
  async function task() {
    let jsonPath = resolveModule(`@iconify-json/${name}/icons.json`);
    if (!jsonPath && isLegacyExists)
      jsonPath = resolveModule(`@iconify/json/json/${name}.json`);
    if (jsonPath) {
      const icons = JSON.parse(await promises.readFile(jsonPath, "utf8"));
      return icons;
    } else {
      return void 0;
    }
  }
}

export { loadCollectionFromFS };
