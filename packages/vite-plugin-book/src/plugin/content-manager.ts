/* Copyright 2021, vite-plugin-book by Mirone. */

import fs from 'fs-extra';
import { relative, resolve } from 'pathe';

import type { DirInfo, FileInfo, ItemInfo, WebSocketServerEvents } from '../interface';
import { withOutExt } from '../utils/helper';

export class ContentManager implements WebSocketServerEvents {
    constructor(private docDir: string) {}
    async getFiles(): Promise<ItemInfo[]> {
        const handlePath = async (dir: string) => {
            const files = await fs.readdir(dir, { withFileTypes: true });
            const data = await Promise.all(
                files.map(async (file): Promise<ItemInfo | null> => {
                    const relativeUrl = relative(this.docDir, resolve(dir, file.name));
                    if (file.isDirectory()) {
                        const dirInfo: DirInfo = {
                            type: 'dir',
                            name: file.name,
                            list: await handlePath(resolve(dir, file.name)),
                            url: relativeUrl,
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
                    };
                    return fileInfo;
                }),
            );
            return data.filter((x): x is ItemInfo => !!x);
        };
        return handlePath(this.docDir);
    }

    async getFile(url: string): Promise<string> {
        return fs.readFile(this.resolveFilePath(url), 'utf-8');
    }

    async writeFile(url: string, markdown: string): Promise<void> {
        await fs.writeFile(this.resolveFilePath(url), markdown);
    }

    async getConfig(): Promise<Record<string, unknown>> {
        const jsonConfigPath = resolve(this.docDir, 'settings.json');
        await fs.outputJSON(jsonConfigPath, {});
        return fs.readJSON(jsonConfigPath);
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
