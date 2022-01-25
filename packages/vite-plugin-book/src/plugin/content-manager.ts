/* Copyright 2021, vite-plugin-book by Mirone. */

import fs from 'fs-extra';
import { relative, resolve } from 'pathe';

import type { BookConfig, DirInfo, FileInfo, ItemInfo, SideBarItem, WebSocketServerEvents } from '../interface';
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

    async getConfig(): Promise<BookConfig> {
        this.ensureConfig();
        // TODO: diff the saved config with file system
        return fs.readJSON(this.configPath);
    }

    async writeConfig(config: BookConfig): Promise<void> {
        await fs.writeJSON(this.configPath, config, { spaces: 4 });
    }

    private get configPath() {
        return resolve(this.docDir, 'settings.json');
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

    private async ensureConfig() {
        const exists = await fs.pathExists(this.configPath);
        if (exists) {
            return;
        }
        const config = await this.initConfig();
        this.writeConfig(config);
    }

    private async initConfig(): Promise<BookConfig> {
        const files = await this.getFiles();
        const handleFiles = (files: ItemInfo[]) => {
            return files.map((file, index): SideBarItem => {
                if (file.type === 'file') {
                    return {
                        type: 'file',
                        url: file.url,
                        index,
                    };
                }

                return {
                    type: 'dir',
                    url: file.url,
                    index,
                    list: handleFiles(file.list),
                };
            });
        };
        const sidebar = handleFiles(files);
        return { sidebar };
    }
}
