/* Copyright 2021, vite-plugin-book by Mirone. */
/* eslint-disable no-var */

/// <reference types="vite/client" />

import { ItemInfo } from './interface';

declare global {
    var __VITE_PLUGIN_BOOK__: {
        mapping: Record<string, () => Promise<{ default: string }>>;
        items: ItemInfo[];
    };
}
