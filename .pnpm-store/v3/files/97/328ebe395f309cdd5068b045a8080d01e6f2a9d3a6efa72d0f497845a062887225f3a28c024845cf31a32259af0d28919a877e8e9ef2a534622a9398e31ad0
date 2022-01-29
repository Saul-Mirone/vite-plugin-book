var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/index.ts
__export(exports, {
  detectPackageManager: () => detectPackageManager,
  installPackage: () => installPackage
});

// src/detect.ts
var import_path = __toModule(require("path"));
var import_find_up = __toModule(require("find-up"));
var LOCKS = {
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm"
};
async function detectPackageManager(cwd = process.cwd()) {
  const result = await (0, import_find_up.default)(Object.keys(LOCKS), { cwd });
  const agent = result ? LOCKS[import_path.default.basename(result)] : null;
  return agent;
}

// src/install.ts
var import_execa = __toModule(require("execa"));
async function installPackage(names, options = {}) {
  const agent = options.packageManager || await detectPackageManager(options.cwd) || "npm";
  if (!Array.isArray(names))
    names = [names];
  const args = options.additionalArgs || [];
  if (options.preferOffline)
    args.unshift("--prefer-offline");
  return (0, import_execa.default)(agent, [
    agent === "yarn" ? "add" : "install",
    options.dev ? "-D" : "",
    ...args,
    ...names
  ].filter(Boolean), {
    stdio: options.silent ? "ignore" : "inherit",
    cwd: options.cwd
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  detectPackageManager,
  installPackage
});
