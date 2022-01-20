/* Copyright 2021, vite-plugin-book by Mirone. */
import { resolve } from 'pathe';
import sirv from 'sirv';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

import { createWsServer } from './ws-server';

export function vitePluginBookDev(): Plugin {
    return {
        name: 'vite-plugin-book-dev',
        apply: 'serve',
        async configureServer(server) {
            const clientDist = resolve(fileURLToPath(import.meta.url), '../../ui');

            const { root } = server.config;

            const docsDir = resolve(root, 'docs');

            createWsServer(server, docsDir);

            server.middlewares.use(
                '/__vite-plugin-book__/',
                sirv(clientDist, {
                    single: true,
                    dev: true,
                }),
            );
        },
    };
}
