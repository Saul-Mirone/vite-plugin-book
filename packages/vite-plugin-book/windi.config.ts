/* Copyright 2021, vite-plugin-book by Mirone. */
import { defineConfig } from 'windicss/helpers';

const colorFactory = (r: number, g: number, b: number) =>
    `rgba(${r}, ${g}, ${b}, var(--tw-text-opacity, var(--tw-bg-opacity, 1)))`;

export default defineConfig({
    preflight: false,
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                shadow: colorFactory(59, 66, 82),
                primary: colorFactory(94, 129, 172),
                secondary: colorFactory(129, 161, 193),
                neutral: colorFactory(46, 52, 64),
                solid: colorFactory(76, 86, 106),
                line: colorFactory(216, 222, 233),
                background: colorFactory(236, 239, 244),
                surface: colorFactory(255, 255, 255),
            },
        },
    },
});
