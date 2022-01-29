// src/customisations/compare.ts
import { defaults } from "./index.mjs";
var allKeys = Object.keys(defaults);
var filteredKeys = allKeys.filter((key) => key !== "width" && key !== "height");
function compare(item1, item2, compareDimensions = true) {
  const keys = compareDimensions ? allKeys : filteredKeys;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (item1[key] !== item2[key]) {
      return false;
    }
  }
  return true;
}
export {
  compare
};
