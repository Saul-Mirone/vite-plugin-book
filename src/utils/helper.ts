/* Copyright 2021, vite-plugin-book by Mirone. */

import type { FileInfo, ItemInfo } from '../interface';

export const nope = () => {
    // do nothing
};

export const isIndexPage = (item: ItemInfo): item is FileInfo => item.type === 'file' && item.name === 'index.md';

export const transformName = (name: string) => {
    const [withOutExt] = name.split('.md');
    return withOutExt
        .split('-')
        .map((str) => {
            const [first] = str.slice(0, 1);
            const rest = str.slice(1);
            return first.toUpperCase() + rest;
        })
        .join(' ');
};
