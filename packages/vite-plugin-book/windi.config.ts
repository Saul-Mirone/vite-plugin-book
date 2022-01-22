/* Copyright 2021, vite-plugin-book by Mirone. */
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
    darkMode: 'class',
    safelist: 'p-3 p-4 p-5',
    theme: {
        extend: {
            colors: {
                shadow: 'rgba(59, 66, 82, var(--tw-text-opacity, 1))',
                primary: 'rgba(94, 129, 172, var(--tw-text-opacity, 1))',
                secondary: 'rgba(129, 161, 193, var(--tw-text-opacity, 1))',
                neutral: 'rgba(46, 52, 64, var(--tw-text-opacity, 1))',
                solid: 'rgba(76, 86, 106, var(--tw-text-opacity, 1))',
                line: 'rgba(216, 222, 233, var(--tw-text-opacity, 1))',
                background: 'rgba(236, 239, 244, var(--tw-text-opacity, 1))',
                surface: 'rgba(255, 255, 255, var(--tw-text-opacity, 1))',
            },
        },
    },
});
