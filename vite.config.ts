/* Copyright 2021, vite-plugin-book by Mirone. */

import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), Unocss()],
});
