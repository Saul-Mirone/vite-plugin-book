/* Copyright 2021, vite-plugin-book by Mirone. */
import { Dir } from 'fs';
import fs from 'fs-extra';
import { relative, resolve } from 'pathe';

import type { DirInfo, FileInfo, ItemInfo, ProjectInfo } from '../interface';
import { isIndexPage, withOutExt } from '../utils/helper';

const checkHasIndex = (files: fs.Dirent[]) =>
    !!files.find((file) => {
        if (file.isFile() && file.name === 'index.md') {
            return true;
        }
        return false;
    });

const readDir = async (root: string, dir: string = root): Promise<DirInfo> => {
    const files = await fs.readdir(dir, { withFileTypes: true });
    const data = await Promise.all(
        files.map(async (file): Promise<ItemInfo | null> => {
            const relativeUrl = relative(root, resolve(dir, file.name));
            if (file.isDirectory()) {
                const { list, hasIndex } = await readDir(root, resolve(dir, file.name));
                const dirInfo: DirInfo = {
                    list,
                    type: 'dir',
                    name: file.name,
                    id: relativeUrl,
                    url: relativeUrl,
                    hasIndex,
                };
                return dirInfo;
            }

            if (!file.name.endsWith('.md')) {
                return null;
            }

            const fileInfo: FileInfo = {
                type: 'file',
                name: file.name,
                url: withOutExt(relativeUrl),
                id: withOutExt(relativeUrl),
            };
            return fileInfo;
        }),
    );
    const list = data.filter((x): x is ItemInfo => !!x).filter((x) => !isIndexPage(x));
    return {
        type: 'dir',
        name: '_vite_book_project_root_',
        url: '/',
        id: '/',
        list,
        hasIndex: checkHasIndex(files),
    };
};

export const readProject = async (root: string): Promise<ProjectInfo> => {
    const rootDirInfo = await readDir(root);

    return {
        name: 'vite-book',
        list: rootDirInfo.list,
    };
};
