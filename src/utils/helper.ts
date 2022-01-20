/* Copyright 2021, vite-plugin-book by Mirone. */

import type { FileInfo, ItemInfo } from '../interface';

export const nope = () => {
    // do nothing
};

export const isIndexPage = (item: ItemInfo): item is FileInfo => item.type === 'file' && item.name === 'index.md';

export const withOutExt = (name: string) => {
    return name.split('.md')[0];
};

export const transformName = (name: string) => {
    return withOutExt(name)
        .split('-')
        .map((str) => {
            const [first] = str.slice(0, 1);
            const rest = str.slice(1);
            return first.toUpperCase() + rest;
        })
        .join(' ');
};
