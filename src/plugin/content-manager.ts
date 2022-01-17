/* Copyright 2021, vite-plugin-book by Mirone. */

import fs from 'fs-extra';
import { resolve } from 'pathe';

import type { Item, WebSocketServerEvents } from '../interface';

export class ContentManager implements WebSocketServerEvents {
    constructor(private docDir: string) {}
    async getFiles(): Promise<Item[]> {
        const files = await fs.readdir(this.docDir);
        return files.map((name) => ({
            name,
            url: resolve(this.docDir, name),
        }));
    }
    async getFile(url: string): Promise<string> {
        const data = await fs.readFile(url, 'utf-8');
        return data;
    }
    async writeFile(url: string, markdown: string): Promise<void> {
        await fs.writeFile(url, markdown);
    }
}
