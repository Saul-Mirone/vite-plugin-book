/* Copyright 2021, vite-plugin-book by Mirone. */

import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/__vite_plugin_book__/',
    build: {
        outDir: 'dist/ui',
    },
    plugins: [
        react(),
        Unocss({
            theme: {
                colors: {
                    shadow: 'rgba(59, 66, 82, var(--un-text-opacity, 1))',
                    primary: 'rgba(94, 129, 172, var(--un-text-opacity, 1))',
                    secondary: 'rgba(129, 161, 193, var(--un-text-opacity, 1))',
                    neutral: 'rgba(46, 52, 64, var(--un-text-opacity, 1))',
                    solid: 'rgba(76, 86, 106, var(--un-text-opacity, 1))',
                    line: 'rgba(216, 222, 233, var(--un-text-opacity, 1))',
                    background: 'rgba(236, 239, 244, var(--un-text-opacity, 1))',
                    surface: 'rgba(255, 255, 255, var(--un-text-opacity, 1))',
                },
            },
            rules: [
                [
                    /^text-(.*)$/,
                    ([, c], { theme }) => {
                        const t = <{ colors: Record<string, string> }>theme;
                        if (t.colors[c]) return { color: t.colors[c] };
                    },
                ],
                [
                    /^bg-(.*)$/,
                    ([, c], { theme }) => {
                        const t = <{ colors: Record<string, string> }>theme;
                        if (t.colors[c]) return { 'background-color': t.colors[c] };
                    },
                ],
            ],
        }),
    ],
});
