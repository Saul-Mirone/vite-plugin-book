/* Copyright 2021, vite-plugin-book by Mirone. */

import fs from 'fs-extra';
import { resolve } from 'pathe';

import type { ItemInfo, WebSocketServerEvents } from '../interface';
import { withOutExt } from '../utils/helper';

export class ContentManager implements WebSocketServerEvents {
    constructor(private docDir: string) {}
    async getFiles(): Promise<ItemInfo[]> {
        const files = await fs.readdir(this.docDir);
        return files.map((name) => ({
            type: 'file',
            name,
            url: withOutExt(name),
        }));
    }
    async getFile(url: string): Promise<string> {
        const data = await fs.readFile(this.resolveFilePath(url), 'utf-8');
        return data;
    }
    async writeFile(url: string, markdown: string): Promise<void> {
        await fs.writeFile(this.resolveFilePath(url), markdown);
    }

    private resolveFilePath(url: string) {
        return resolve(this.docDir, url) + '.md';
    }
}
