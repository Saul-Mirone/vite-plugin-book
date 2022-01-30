/* Copyright 2021, vite-plugin-book by Mirone. */

import type { DirInfo, FileInfo, ItemInfo } from '../interface';

export const nope = () => {
    // do nothing
};

export const isIndexPage = (item: ItemInfo): item is FileInfo => item.type === 'file' && item.name === 'index.md';

export const withOutExt = (name: string) => {
    return name.split('.md')[0] as string;
};

export const transformName = (name: string) => {
    return withOutExt(name)
        .split('-')
        .map((str) => {
            const [first = ''] = str.slice(0, 1);
            const rest = str.slice(1);
            return first.toUpperCase() + rest;
        })
        .join(' ');
};

export const walkThroughTree = (
    items: ItemInfo[],
    callback: (item: ItemInfo, parent: DirInfo | null, index: number[]) => void,
) => {
    const walk = (item: ItemInfo, parent: DirInfo | null, index: number[]) => {
        callback(item, parent, index);
        if (item.type === 'file') {
            return;
        }

        return item.list.forEach((it, idx) => {
            walk(it, item, [...index, idx]);
            return;
        });
    };

    return items.forEach((item, index) => walk(item, null, [index]));
};

export const flatItems = (items: ItemInfo[]): (FileInfo | Omit<DirInfo, 'list'>)[] => {
    return items.flatMap((item) => {
        if (item.type === 'dir') {
            const { list, ...rest } = item;
            return [rest, ...flatItems(list)];
        }

        return [item];
    });
};

export const isEqualState = (prevState: ItemInfo[], nextState: ItemInfo[]): boolean => {
    return prevState.every((item, index) => {
        const next = nextState[index];
        if (!next) {
            return false;
        }
        if (item.id !== next.id) {
            return false;
        }
        if (item.type === 'dir') {
            if (next.type !== 'dir') {
                return false;
            }
            return isEqualState(item.list, next.list);
        }
        return true;
    });
};
