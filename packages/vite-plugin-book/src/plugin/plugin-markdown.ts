/* Copyright 2021, vite-plugin-book by Mirone. */
import { dataToEsm } from '@rollup/pluginutils';
import type { Plugin } from 'vite';

// esbuild cannot handle replaceAll by some reason. Have to hack for it.
function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export function vitePluginBookMarkdown(): Plugin {
    return {
        name: 'vite-plugin-book:markdown',
        enforce: 'pre',
        async transform(code: string, id: string) {
            if (id.endsWith('.md')) {
                // Hack for encode env
                return dataToEsm(replaceAll(code, 'meta.env', '$META_ENV$'));
            }

            return null;
        },
    };
}
