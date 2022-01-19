/* Copyright 2021, vite-plugin-book by Mirone. */
/* eslint-disable no-console */

import { dataToEsm } from '@rollup/pluginutils';
import fs from 'fs-extra';
import MagicString from 'magic-string';
import { dirname, extname, relative, resolve } from 'pathe';
import sirv from 'sirv';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

import { createWsServer } from './ws-server';

function transformName(name: string) {
    const [withOutExt] = name.split('.md');
    return withOutExt
        .split('-')
        .map((str) => {
            const [first] = str.slice(0, 1);
            const rest = str.slice(1);
            return first.toUpperCase() + rest;
        })
        .join('_');
}

export default function vitePluginBook(): Plugin[] {
    let root = '';
    let docMapping: { name: string; url: string }[];
    let injected = false;
    return [
        {
            name: 'vite-plugin-book-dev',
            apply: 'serve',
            async configureServer(server) {
                const clientDist = resolve(fileURLToPath(import.meta.url), '../../ui');

                const { root } = server.config;

                const docsDir = resolve(root, 'docs');

                createWsServer(server, docsDir);

                server.middlewares.use(
                    '/__vite-plugin-book__/',
                    sirv(clientDist, {
                        single: true,
                        dev: true,
                    }),
                );
            },
        },
        {
            name: 'vite-plugin-book-markdown',
            enforce: 'pre',
            async transform(code: string, id: string) {
                if (id.endsWith('.md')) {
                    return dataToEsm(code);
                }

                return null;
            },
        },
        {
            name: 'vite-plugin-book-build',
            apply: 'build',
            async configResolved(resolvedConfig) {
                root = resolvedConfig.root;

                const docsDir = resolve(root, 'docs');
                const files = await fs.readdir(docsDir);
                docMapping = await Promise.all(
                    files.map(async (name) => {
                        const url = resolve(docsDir, name);
                        return { name, url };
                    }),
                );
            },
            async transform(code: string, id: string) {
                const ext = extname(id);
                if (injected) return null;
                if (!['.ts', '.tsx', '.js'].includes(ext)) {
                    return null;
                }
                if (!id.includes(root)) {
                    return null;
                }
                if (id.includes('node_modules')) {
                    return null;
                }
                console.log('\n');
                console.log('Inject global environments for vite-plugin-book to file: ', id);

                const magicString = new MagicString(code);

                const docsDir = resolve(root, 'docs');
                const files = await fs.readdir(docsDir);
                files.forEach((fileName) => {
                    const url = resolve(docsDir, fileName);
                    const name = transformName(fileName);
                    console.log(
                        `globalThis.__VITE_PLUGIN_BOOK__.file.${name} = () => import('./${relative(
                            dirname(id),
                            url,
                        )}');`,
                    );
                    magicString.prepend(
                        `globalThis.__VITE_PLUGIN_BOOK__.file.${name} = () => import('./${relative(
                            dirname(id),
                            url,
                        )}');\n`,
                    );
                });

                magicString.prepend(`globalThis.__VITE_PLUGIN_BOOK__.mapping = ${JSON.stringify(docMapping)};`);
                magicString.prepend(`globalThis.__VITE_PLUGIN_BOOK__ = { file: {} };`);

                injected = true;

                return {
                    code: magicString.toString(),
                    map: magicString.generateMap({ hires: true }),
                };
            },
        },
    ];
}
