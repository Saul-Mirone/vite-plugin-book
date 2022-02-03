/* Copyright 2021, vite-plugin-book by Mirone. */

import path from 'path';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-unresolved
import { book } from 'vite-plugin-book/vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/vite-plugin-book/',
    plugins: [
        book(),
        copy({
            targets: [
                {
                    src: [path.resolve(__dirname, '404.html')],
                    dest: path.resolve(__dirname, './dist'),
                },
            ],
            hook: 'writeBundle',
        }),
    ],
});
