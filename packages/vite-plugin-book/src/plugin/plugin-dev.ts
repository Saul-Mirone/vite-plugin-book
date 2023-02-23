/* Copyright 2021, vite-plugin-book by Mirone. */
import type { AddressInfo } from 'net';
import { resolve } from 'pathe';
import colors from 'picocolors';
import sirv from 'sirv';
import { fileURLToPath } from 'url';
import type { Plugin } from 'vite';

import pkgJson from '../../package.json' assert { type: 'json' };
import { BookPluginOptions } from '.';
import { createWsServer } from './ws-server';

function resolveHostname(optionsHost: string | boolean | undefined) {
    let host: string | undefined;
    if (optionsHost === undefined || optionsHost === false || optionsHost === 'localhost') {
        // Use a secure default
        host = '127.0.0.1';
    } else if (optionsHost === true) {
        // If passed --host in the CLI without arguments
        host = undefined; // undefined typically means 0.0.0.0 or :: (listen on all IPs)
    } else {
        host = optionsHost;
    }

    // Set host name to localhost when possible, unless the user explicitly asked for '127.0.0.1'
    const name =
        (optionsHost !== '127.0.0.1' && host === '127.0.0.1') ||
        host === '0.0.0.0' ||
        host === '::' ||
        host === undefined
            ? 'localhost'
            : host;

    return { host, name } as const;
}

export function vitePluginBookDev(bookOptions: BookPluginOptions): Plugin {
    return {
        name: 'vite-plugin-book:dev',
        apply: 'serve',
        async configureServer(server) {
            const clientDist = resolve(fileURLToPath(import.meta.url), '../../ui');

            const { root } = server.config;

            const docsDir = resolve(root, bookOptions.path);

            createWsServer(server, docsDir, bookOptions.name, bookOptions.repo);

            server.middlewares.use(
                '/__vite_plugin_book__/',
                sirv(clientDist, {
                    single: true,
                    dev: true,
                }),
            );

            const { httpServer } = server;
            if (!httpServer) return;

            const options = server.config.server;
            const host = resolveHostname(options.host);
            const protocol = options.https ? 'https' : 'http';

            const logger = server.config.logger;
            httpServer.once('listening', () => {
                const addr = httpServer.address() as AddressInfo;
                if (!addr?.address) return;

                const url = `${protocol}://${host.name}:${addr.port}/__vite_plugin_book__/`;

                setTimeout(() => {
                    logger.info('');
                    logger.info(`  ${colors.green('VPB v' + pkgJson.version)}`);
                    logger.info('');
                    logger.info(`  ${colors.green('➜')}  Book Admin: ${colors.cyan(url)}`);
                    logger.info(`  ${colors.green('➜')}  Book Preview: ${colors.cyan(url + '__preview__/')}`);
                }, 100);
            });
        },
    };
}
