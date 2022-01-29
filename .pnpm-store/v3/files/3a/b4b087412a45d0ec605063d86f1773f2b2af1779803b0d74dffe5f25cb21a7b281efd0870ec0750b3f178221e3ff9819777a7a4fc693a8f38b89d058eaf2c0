// src/loader/utils.ts
import { installPackage } from "@antfu/install-pkg";
import { sleep } from "@antfu/utils";
import { cyan, yellow } from "kolorist";
var warned = new Set();
function warnOnce(msg) {
  if (!warned.has(msg)) {
    warned.add(msg);
    console.warn(yellow(`[@iconify-loader] ${msg}`));
  }
}
var pending;
var tasks = {};
async function mergeIconProps(svg, collection, icon, additionalProps, propsProvider, iconCustomizer) {
  var _a;
  const props = (_a = await (propsProvider == null ? void 0 : propsProvider())) != null ? _a : {};
  await (iconCustomizer == null ? void 0 : iconCustomizer(collection, icon, props));
  Object.keys(additionalProps).forEach((p) => {
    const v = additionalProps[p];
    if (v !== void 0 && v !== null)
      props[p] = v;
  });
  const replacement = svg.startsWith("<svg ") ? "<svg " : "<svg";
  return svg.replace(replacement, `${replacement}${Object.keys(props).map((p) => `${p}="${props[p]}"`).join(" ")}`);
}
async function tryInstallPkg(name) {
  if (pending) {
    await pending;
  }
  if (!tasks[name]) {
    console.log(cyan(`Installing ${name}...`));
    tasks[name] = pending = installPackage(name, {
      dev: true,
      preferOffline: true
    }).then(() => sleep(300)).catch((e) => {
      warnOnce(`Failed to install ${name}`);
      console.error(e);
    }).finally(() => {
      pending = void 0;
    });
  }
  return tasks[name];
}
export {
  mergeIconProps,
  tryInstallPkg,
  warnOnce
};
