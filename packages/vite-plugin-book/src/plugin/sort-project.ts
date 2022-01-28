/* Copyright 2021, vite-plugin-book by Mirone. */
import fs from 'fs-extra';
import produce from 'immer';
import path from 'pathe';

import type { ItemInfo } from '../interface';
import { flatItems, isEqualState, walkThroughTree, withOutExt } from '../utils/helper';

export const flushId = (state: ItemInfo[]) => {
    const value = produce(state, (draft) => {
        walkThroughTree(draft, (item) => {
            item.id = item.url;
        });
    });

    return value;
};

export const sortProject = (rootDir: string, prev: ItemInfo[], next: ItemInfo[]): boolean => {
    if (isEqualState(prev, next)) {
        return false;
    }
    const flattenPrev = flatItems(prev);
    const flattenNext = flatItems(next);

    const deleteStack: string[] = [];

    flattenNext.map((to) => {
        const from = flattenPrev.find((prev) => prev.id === to.id);
        if (!from) return;

        if (to.url === from.url) {
            return;
        }
        const suffix = from.type === 'dir' ? '' : '.md';
        const fromUrl = path.resolve(rootDir, from.url) + suffix;
        const toUrl = path.resolve(rootDir, to.url) + suffix;

        if (fs.existsSync(fromUrl)) {
            fs.copySync(fromUrl, toUrl);
            deleteStack.push(fromUrl);
        }
    });

    deleteStack.forEach((url) => {
        if (fs.pathExistsSync(url)) {
            fs.removeSync(url);
            return;
        }
    });

    return true;
};
