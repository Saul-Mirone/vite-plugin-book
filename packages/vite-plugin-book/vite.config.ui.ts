/* Copyright 2021, vite-plugin-book by Mirone. */

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/__vite_plugin_book__/',
    build: {
        outDir: 'dist/ui',
    },
    plugins: [react(), WindiCSS(), visualizer()],
});
