/* Copyright 2021, vite-plugin-book by Mirone. */
/* eslint-disable no-console */

import type { Plugin } from 'vite';

import { vitePluginBookDev } from './plugin-dev';
import { vitePluginBookMarkdown } from './plugin-markdown';
import { vitePluginBookRuntimeInject } from './plugin-runtime-inject';

export default function vitePluginBook(): Plugin[] {
    return [vitePluginBookDev(), vitePluginBookMarkdown(), vitePluginBookRuntimeInject()];
}
