// src/icon-set/expand.ts
import { iconDefaults } from "../icon/index.mjs";
function expandIconSet(data) {
  const icons = Object.keys(data.icons);
  Object.keys(iconDefaults).forEach((prop) => {
    if (typeof data[prop] !== typeof iconDefaults[prop]) {
      return;
    }
    const value = data[prop];
    icons.forEach((name) => {
      const item = data.icons[name];
      if (item[prop] === void 0) {
        item[prop] = value;
      }
    });
    delete data[prop];
  });
}
export {
  expandIconSet
};
