/* Copyright 2021, vite-plugin-book by Mirone. */
import { defineConfig } from 'vite';

import vitePluginBook from '../dist/plugin';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vitePluginBook()],
});
