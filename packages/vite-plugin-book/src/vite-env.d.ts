/* Copyright 2021, vite-plugin-book by Mirone. */

/// <reference types="vite/client" />

import { BookConfig } from './interface';

declare global {
    var __VITE_PLUGIN_BOOK__: {
        mapping: Record<string, () => Promise<{ default: string }>>;
        config: BookConfig;
    };
}
