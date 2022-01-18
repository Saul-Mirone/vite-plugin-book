/* Copyright 2021, vite-plugin-book by Mirone. */
import { dataToEsm } from '@rollup/pluginutils';
import fs from 'fs-extra';
import MagicString from 'magic-string';
import { dirname, relative, resolve } from 'pathe';
import sirv from 'sirv';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

import { createWsServer } from './ws-server';

// The virtual id for our shared "process" mock.
// We prefix it with \0 so that other plugins ignore it
const name = 'vite-plugin-book';
const VIRTUAL_MODULE_ID = `\0${name}`;

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
    let entry = '';
    let mode = '';
    let docMapping: string[];
    return [
        {
            name: 'vite-plugin-book-dev',
            apply: 'serve',
            async configureServer(server) {
                const clientDist = resolve(fileURLToPath(import.meta.url), '../ui');

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
            name: 'vite-plugin-markdown',
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
                const clientDist = resolve(fileURLToPath(import.meta.url), '../../ui');
                entry = resolve(clientDist, 'main.tsx');
                mode = resolvedConfig.mode;
                const docsDir = resolve(root, 'docs');
                // TODO: don't read whole file, just keep a mapping
                const files = await fs.readdir(docsDir);
                docMapping = await Promise.all(
                    files.map(async (name) => {
                        const url = resolve(docsDir, name);
                        const markdown = await fs.readFile(url, 'utf-8');
                        return markdown;
                    }),
                );
            },
            async transform(code: string, id: string) {
                if (id !== entry) {
                    return null;
                }

                const magicString = new MagicString(code);

                const docsDir = resolve(root, 'docs');
                const files = await fs.readdir(docsDir);
                files.forEach((fileName) => {
                    const url = resolve(docsDir, fileName);
                    const name = transformName(fileName);
                    magicString.prepend(
                        `globalThis.__VITE_PLUGIN_BOOK__.${name} = () => import('${relative(dirname(entry), url)}');\n`,
                    );
                });

                magicString.prepend(`import '${VIRTUAL_MODULE_ID}';\n`);
                magicString.prepend(`globalThis.__VITE_PLUGIN_BOOK__ = {};`);

                return {
                    code: magicString.toString(),
                    map: magicString.generateMap({ hires: true }),
                };
            },
            resolveId(id: string) {
                // this tells Rollup not to try to resolve imports from our virtual id
                if (id === VIRTUAL_MODULE_ID) {
                    return VIRTUAL_MODULE_ID;
                }
            },
            load(id: string) {
                if (id === VIRTUAL_MODULE_ID) {
                    return `
(function() {
    const env = ${JSON.stringify({ docMapping, mode })};
    globalThis.__vite_plugin_doc__ = env;
})();
`;
                }
                return null;
            },
        },
    ];
}
