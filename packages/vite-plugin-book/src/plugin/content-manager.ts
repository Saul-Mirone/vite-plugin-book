/* Copyright 2021, vite-plugin-book by Mirone. */

import fs from 'fs-extra';
import { resolve } from 'pathe';

import type { BookConfig, ItemInfo, WebSocketServerEvents } from '../interface';
import { withOutExt } from '../utils/helper';
import { ConfigService } from './config-service';
import { flushId, sortProject } from './sort-project';

export class ContentManager implements WebSocketServerEvents {
    constructor(private docDir: string, private configService: ConfigService) {}

    async getFile(url: string): Promise<string> {
        return fs.readFile(this.resolveFilePath(url), 'utf-8');
    }

    async writeFile(url: string, markdown: string): Promise<void> {
        await fs.writeFile(this.resolveFilePath(url), markdown);
    }

    async getConfig(): Promise<BookConfig> {
        // TODO: diff the saved config with file system
        return Promise.resolve(this.configService.get());
    }

    async sort(info: ItemInfo[]): Promise<boolean> {
        const config = this.configService.get();
        const saved = config.projectInfo.list;
        const changed = sortProject(this.docDir, saved, info);
        if (changed) {
            this.configService.setConfig({ ...config, projectInfo: { ...config.projectInfo, list: flushId(info) } });

            await this.configService.writeConfig();
        }

        return changed;
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
