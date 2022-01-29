// src/icon-set/get-icons.ts
import { iconDefaults } from "../icon/index.mjs";
var propsToCopy = Object.keys(iconDefaults).concat([
  "provider"
]);
function getIcons(data, icons, not_found) {
  const result = {
    prefix: data.prefix,
    icons: Object.create(null)
  };
  const tested = new Set();
  let empty = true;
  function copy(name, iteration) {
    var _a, _b, _c;
    if (iteration > 5 || tested.has(name)) {
      return true;
    }
    tested.add(name);
    if (data.icons[name] !== void 0) {
      empty = false;
      result.icons[name] = { ...data.icons[name] };
      return true;
    }
    if (((_a = data.aliases) == null ? void 0 : _a[name]) !== void 0) {
      const copied = copy(data.aliases[name].parent, iteration + 1);
      if (copied) {
        if (result.aliases === void 0) {
          result.aliases = Object.create(null);
        }
        result.aliases[name] = { ...data.aliases[name] };
      }
      return copied;
    }
    if (((_b = data.chars) == null ? void 0 : _b[name]) !== void 0) {
      const parent = (_c = data.chars) == null ? void 0 : _c[name];
      const copied = copy(parent, iteration + 1);
      if (copied) {
        if (result.aliases === void 0) {
          result.aliases = Object.create(null);
        }
        result.aliases[name] = {
          parent
        };
      }
      return copied;
    }
    return false;
  }
  propsToCopy.forEach((attr) => {
    if (data[attr] !== void 0) {
      result[attr] = data[attr];
    }
  });
  icons.forEach((name) => {
    if (!copy(name, 0) && not_found === true) {
      if (result.not_found === void 0) {
        result.not_found = [];
      }
      result.not_found.push(name);
    }
  });
  return empty && not_found !== true ? null : result;
}
export {
  getIcons,
  propsToCopy
};
