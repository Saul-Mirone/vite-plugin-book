/* Copyright 2021, vite-plugin-book by Mirone. */

import json from '@rollup/plugin-json';
import type { Plugin } from 'vite';

import { vitePluginBookDev } from './plugin-dev';
import { vitePluginBookMarkdown } from './plugin-markdown';
import { vitePluginBookRuntimeInject } from './plugin-runtime-inject';

export type BookPluginOptions = {
    name: string;
    path: string;
    repo: string;
};

export function book(options?: Partial<BookPluginOptions>): Plugin[] {
    const overrideOptions: BookPluginOptions = {
        name: 'Vite Book',
        path: 'docs',
        repo: '',
        ...(options || {}),
    };
    return [
        json(),
        vitePluginBookDev(overrideOptions),
        vitePluginBookMarkdown(),
        vitePluginBookRuntimeInject(overrideOptions),
    ];
}
