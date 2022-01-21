/* Copyright 2021, vite-plugin-book by Mirone. */

import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-unresolved
import { book } from 'vite-plugin-book/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [book()],
});
