// src/detect.ts
import path from "path";
import findUp from "find-up";
var LOCKS = {
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm"
};
async function detectPackageManager(cwd = process.cwd()) {
  const result = await findUp(Object.keys(LOCKS), { cwd });
  const agent = result ? LOCKS[path.basename(result)] : null;
  return agent;
}

// src/install.ts
import execa from "execa";
async function installPackage(names, options = {}) {
  const agent = options.packageManager || await detectPackageManager(options.cwd) || "npm";
  if (!Array.isArray(names))
    names = [names];
  const args = options.additionalArgs || [];
  if (options.preferOffline)
    args.unshift("--prefer-offline");
  return execa(agent, [
    agent === "yarn" ? "add" : "install",
    options.dev ? "-D" : "",
    ...args,
    ...names
  ].filter(Boolean), {
    stdio: options.silent ? "ignore" : "inherit",
    cwd: options.cwd
  });
}
export {
  detectPackageManager,
  installPackage
};
