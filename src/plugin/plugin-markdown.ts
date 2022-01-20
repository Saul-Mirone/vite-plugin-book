/* Copyright 2021, vite-plugin-book by Mirone. */
import { dataToEsm } from '@rollup/pluginutils';
import type { Plugin } from 'vite';

export function vitePluginBookMarkdown(): Plugin {
    return {
        name: 'vite-plugin-book-markdown',
        enforce: 'pre',
        async transform(code: string, id: string) {
            if (id.endsWith('.md')) {
                return dataToEsm(code);
            }

            return null;
        },
    };
}
