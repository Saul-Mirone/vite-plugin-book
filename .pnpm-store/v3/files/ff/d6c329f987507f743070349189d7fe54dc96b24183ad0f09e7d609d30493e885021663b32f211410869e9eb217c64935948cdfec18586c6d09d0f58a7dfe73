import { cac } from 'cac';
import { h as handleError, b as build, v as version } from './chunks/index.mjs';
import 'fs/promises';
import 'pathe';
import 'fast-glob';
import 'consola';
import 'colorette';
import '@unocss/core';
import '@unocss/config';
import '@unocss/preset-uno';

const name = "unocss";
async function main(options = {}) {
  const cli = cac(name);
  cli.command("[...patterns]", "Glob patterns", {
    ignoreOptionDefaultValue: true
  }).option("-o, --out-file <file>", "Output file", {
    default: process.cwd()
  }).option("-w, --watch", "Watch for file changes").action(async (patterns, flags) => {
    Object.assign(options, {
      ...flags
    });
    if (patterns)
      options.patterns = patterns;
    await build(options);
  });
  cli.help();
  cli.version(version);
  cli.parse(process.argv, { run: false });
  await cli.runMatchedCommand();
}
main().catch(handleError);
