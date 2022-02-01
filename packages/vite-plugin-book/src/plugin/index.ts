/* Copyright 2021, vite-plugin-book by Mirone. */

import json from '@rollup/plugin-json';
import type { Plugin } from 'vite';

import { vitePluginBookDev } from './plugin-dev';
import { vitePluginBookMarkdown } from './plugin-markdown';
import { vitePluginBookRuntimeInject } from './plugin-runtime-inject';

export type BookPluginOptions = {
    name: string;
};

export function book(options?: BookPluginOptions): Plugin[] {
    const overrideOptions: BookPluginOptions = {
        name: 'vite-book',
        ...(options || {}),
    };
    return [
        json(),
        vitePluginBookDev(overrideOptions),
        vitePluginBookMarkdown(),
        vitePluginBookRuntimeInject(overrideOptions),
    ];
}
