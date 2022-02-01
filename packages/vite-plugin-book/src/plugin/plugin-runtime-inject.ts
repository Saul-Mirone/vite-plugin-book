/* Copyright 2021, vite-plugin-book by Mirone. */

import fs from 'fs-extra';
import MagicString from 'magic-string';
import { dirname, extname, relative, resolve } from 'pathe';
import type { Plugin } from 'vite';

import { withOutExt } from '../utils/helper';
import { BookPluginOptions } from '.';
import { ConfigService } from './config-service';
import { ContentManager } from './content-manager';

export function vitePluginBookRuntimeInject(bookOptions: BookPluginOptions): Plugin {
    let root = '';
    let docConfig: Record<string, unknown>;
    let injected = false;
    return {
        name: 'vite-plugin-book:runtime-inject',
        apply: 'build',
        async configResolved(resolvedConfig) {
            root = resolvedConfig.root;

            const docDir = resolve(root, 'docs');
            const configService = new ConfigService(docDir, bookOptions.name);
            await configService.ready;
            const contentManager = new ContentManager(docDir, configService);

            docConfig = await contentManager.getConfig();
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

            async function handlePath(dir: string) {
                const files = await fs.readdir(dir, { withFileTypes: true });
                await Promise.all(
                    files.map(async (file): Promise<void> => {
                        const relativeUrl = relative(docsDir, resolve(dir, file.name));
                        if (file.isDirectory()) {
                            await handlePath(resolve(dir, file.name));
                            return;
                        }

                        if (!file.name.endsWith('.md')) {
                            return;
                        }

                        const url = resolve(docsDir, dir, file.name);
                        const injectStr = `globalThis.__VITE_PLUGIN_BOOK__.mapping['${withOutExt(
                            relativeUrl,
                        )}'] = () => import('./${relative(dirname(id), url)}');`;

                        console.log(injectStr);
                        magicString.prepend(injectStr);
                    }),
                );
            }

            await handlePath(docsDir);

            // TODO: inject json config here
            console.log(docConfig);
            magicString.prepend(`globalThis.__VITE_PLUGIN_BOOK__.config = ${JSON.stringify(docConfig)};`);
            magicString.prepend(`globalThis.__VITE_PLUGIN_BOOK__ = { mapping: {} };`);

            injected = true;

            return {
                code: magicString.toString(),
                map: magicString.generateMap({ hires: true }),
            };
        },
    };
}
