/* Copyright 2021, vite-plugin-book by Mirone. */

import react from '@vitejs/plugin-react';
import { presetIcons, presetUno } from 'unocss';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';

import vitePluginBook from './src/plugin';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        Unocss({
            presets: [presetUno(), presetIcons()],
        }),
        vitePluginBook(),
    ],
});
