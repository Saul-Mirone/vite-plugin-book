"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryInstallPkg = exports.mergeIconProps = exports.warnOnce = void 0;
const install_pkg_1 = require("@antfu/install-pkg");
const utils_1 = require("@antfu/utils");
const kolorist_1 = require("kolorist");
const warned = new Set();
function warnOnce(msg) {
    if (!warned.has(msg)) {
        warned.add(msg);
        console.warn((0, kolorist_1.yellow)(`[@iconify-loader] ${msg}`));
    }
}
exports.warnOnce = warnOnce;
let pending;
const tasks = {};
async function mergeIconProps(svg, collection, icon, additionalProps, propsProvider, iconCustomizer) {
    var _a;
    const props = (_a = (await (propsProvider === null || propsProvider === void 0 ? void 0 : propsProvider()))) !== null && _a !== void 0 ? _a : {};
    await (iconCustomizer === null || iconCustomizer === void 0 ? void 0 : iconCustomizer(collection, icon, props));
    Object.keys(additionalProps).forEach((p) => {
        const v = additionalProps[p];
        if (v !== undefined && v !== null)
            props[p] = v;
    });
    const replacement = svg.startsWith('<svg ') ? '<svg ' : '<svg';
    return svg.replace(replacement, `${replacement}${Object.keys(props)
        .map((p) => `${p}="${props[p]}"`)
        .join(' ')}`);
}
exports.mergeIconProps = mergeIconProps;
async function tryInstallPkg(name) {
    if (pending) {
        await pending;
    }
    if (!tasks[name]) {
        // eslint-disable-next-line no-console
        console.log((0, kolorist_1.cyan)(`Installing ${name}...`));
        tasks[name] = pending = (0, install_pkg_1.installPackage)(name, {
            dev: true,
            preferOffline: true,
        })
            .then(() => (0, utils_1.sleep)(300))
            // eslint-disable-next-line
            .catch((e) => {
            warnOnce(`Failed to install ${name}`);
            console.error(e);
        })
            .finally(() => {
            pending = undefined;
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return tasks[name];
}
exports.tryInstallPkg = tryInstallPkg;
