'use strict';

const cac = require('cac');
const index = require('./chunks/index.cjs');
require('fs/promises');
require('pathe');
require('fast-glob');
require('consola');
require('colorette');
require('@unocss/core');
require('@unocss/config');
require('@unocss/preset-uno');

const name = "unocss";
async function main(options = {}) {
  const cli = cac.cac(name);
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
    await index.build(options);
  });
  cli.help();
  cli.version(index.version);
  cli.parse(process.argv, { run: false });
  await cli.runMatchedCommand();
}
main().catch(index.handleError);
