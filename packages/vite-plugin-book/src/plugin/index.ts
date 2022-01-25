/* Copyright 2021, vite-plugin-book by Mirone. */

import json from '@rollup/plugin-json';
import type { Plugin } from 'vite';

import { vitePluginBookDev } from './plugin-dev';
import { vitePluginBookMarkdown } from './plugin-markdown';
import { vitePluginBookRuntimeInject } from './plugin-runtime-inject';

export function book(): Plugin[] {
    return [json(), vitePluginBookDev(), vitePluginBookMarkdown(), vitePluginBookRuntimeInject()];
}
