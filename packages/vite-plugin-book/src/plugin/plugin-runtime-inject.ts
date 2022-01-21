/* Copyright 2021, vite-plugin-book by Mirone. */

// TODO: use report nodejs lib instead of console
/* eslint-disable no-console */

import fs from 'fs-extra';
import MagicString from 'magic-string';
import { dirname, extname, relative, resolve } from 'pathe';
import type { Plugin } from 'vite';

import { ItemInfo } from '../interface';
import { withOutExt } from '../utils/helper';
import { ContentManager } from './content-manager';

export function vitePluginBookRuntimeInject(): Plugin {
    let root = '';
    let docMapping: ItemInfo[];
    let injected = false;
    return {
        name: 'vite-plugin-book-runtime-inject',
        apply: 'build',
        async configResolved(resolvedConfig) {
            root = resolvedConfig.root;

            const docsDir = resolve(root, 'docs');
            const contentManager = new ContentManager(docsDir);

            docMapping = await contentManager.getFiles();
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

                const injectStr = `globalThis.__VITE_PLUGIN_BOOK__.mapping['${withOutExt(
                    fileName,
                )}'] = () => import('./${relative(dirname(id), url)}');`;

                console.log(injectStr);
                magicString.prepend(injectStr);
            });

            magicString.prepend(`globalThis.__VITE_PLUGIN_BOOK__.items = ${JSON.stringify(docMapping)};`);
            magicString.prepend(`globalThis.__VITE_PLUGIN_BOOK__ = { mapping: {} };`);

            injected = true;

            return {
                code: magicString.toString(),
                map: magicString.generateMap({ hires: true }),
            };
        },
    };
}
