/* Copyright 2021, vite-plugin-book by Mirone. */

import fs from 'fs-extra';
import { resolve } from 'pathe';

import type { DirInfo, FileInfo, ItemInfo, WebSocketServerEvents } from '../interface';
import { withOutExt } from '../utils/helper';

export class ContentManager implements WebSocketServerEvents {
    constructor(private docDir: string) {}
    async getFiles(): Promise<ItemInfo[]> {
        const handlePath = async (dir: string) => {
            const files = await fs.readdir(dir, { withFileTypes: true });
            return Promise.all(
                files.map(async (file): Promise<ItemInfo> => {
                    if (file.isDirectory()) {
                        const dirInfo: DirInfo = {
                            type: 'dir',
                            name: file.name,
                            list: await handlePath(resolve(dir, file.name)),
                        };
                        return dirInfo;
                    }

                    const fileInfo: FileInfo = {
                        type: 'file',
                        name: file.name,
                        url: withOutExt(file.name),
                    };
                    return fileInfo;
                }),
            );
        };
        return handlePath(this.docDir);
    }

    async getFile(url: string): Promise<string> {
        return fs.readFile(this.resolveFilePath(url), 'utf-8');
    }

    async writeFile(url: string, markdown: string): Promise<void> {
        await fs.writeFile(this.resolveFilePath(url), markdown);
    }

    private resolveFilePath(url: string) {
        const target = resolve(this.docDir, url) + '.md';
        if (fs.existsSync(target)) {
            return target;
        }
        const index = resolve(withOutExt(target), 'index.md');
        if (fs.existsSync(index)) {
            return index;
        }
        console.error('Cannot resolve file: ', url);
        return '';
    }
}
