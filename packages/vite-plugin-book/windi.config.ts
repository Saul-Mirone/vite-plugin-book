/* Copyright 2021, vite-plugin-book by Mirone. */
import { defineConfig } from 'windicss/helpers';

const colorFactory = (r: number, g: number, b: number) => `rgba(${r}, ${g}, ${b}, 1)`;

export default defineConfig({
    preflight: false,
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                shadow: 'rgba(var(--shadow), 1)',
                primary: 'rgba(var(--primary), 1)',
                secondary: 'rgba(var(--secondary), 1)',
                neutral: 'rgba(var(--neutral), 1)',
                solid: 'rgba(var(--solid), 1)',
                line: 'rgba(var(--line), 1)',
                background: 'rgba(var(--background), 1)',
                surface: 'rgba(var(--surface), 1)',
            },
        },
    },
});
