/* Copyright 2021, vite-plugin-book by Mirone. */

import react from '@vitejs/plugin-react';
import path from 'pathe';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/__vite-plugin-book__/',
    build: {
        lib: {
            formats: ['es'],
            entry: path.resolve(__dirname, 'src/render/index.tsx'),
            fileName: () => `index.js`,
        },
        outDir: 'dist/render',
    },
    plugins: [react(), dts({ insertTypesEntry: true })],
});
