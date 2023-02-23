/* Copyright 2021, vite-plugin-book by Mirone. */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['**/*.tsx', '**/*.ts'],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography'), require('tailwind-nord')],
};
