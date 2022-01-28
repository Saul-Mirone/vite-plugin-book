/* Copyright 2021, vite-plugin-book by Mirone. */
import fs from 'fs-extra';
import produce from 'immer';
import { basename, dirname, relative, resolve } from 'pathe';

import type { BookConfig, ItemInfo, WebSocketServerEvents } from '../interface';
import { walkThroughTree, withOutExt } from '../utils/helper';
import { ConfigService } from './config-service';
import { flushId, sortProject } from './sort-project';

export class ContentManager implements WebSocketServerEvents {
    constructor(private docDir: string, private configService: ConfigService) {}

    async getFile(url: string): Promise<string> {
        return fs.readFile(this.resolveFilePath(url), 'utf-8');
    }

    async writeFile(url: string, name: string, markdown: string): Promise<void> {
        const fullPath = this.resolveFilePath(url);
        await fs.writeFile(fullPath, markdown);
        const filename = basename(fullPath);
        if (filename !== name) {
            const config = this.configService.get();

            let newPath = '';
            let isFile = true;
            let relativeUrl = '';

            const newList = produce(config.projectInfo.list, (draft) => {
                walkThroughTree(draft, (x) => {
                    if (x.id === url) {
                        if (x.type === 'file') {
                            newPath = resolve(dirname(fullPath), name);
                            isFile = true;
                            relativeUrl = relative(this.docDir, newPath);

                            x.id = relativeUrl;
                            x.url = relativeUrl;
                            x.name = name + '.md';
                            return;
                        }

                        newPath = resolve(dirname(fullPath), '..', name);
                        relativeUrl = relative(this.docDir, newPath);
                        isFile = false;

                        x.id = relativeUrl;
                        x.url = relativeUrl;
                        x.name = name;
                        return;
                    }

                    if (isFile) return;

                    const newId = x.url.replace(url, relativeUrl);
                    x.id = newId;
                    x.url = newId;
                });
            });

            this.configService.setConfig({ ...config, projectInfo: { ...config.projectInfo, list: newList } });
            await fs.rename(isFile ? fullPath : dirname(fullPath), newPath + (isFile ? '.md' : ''));
            await this.configService.writeConfig();
        }
    }

    async getConfig(): Promise<BookConfig> {
        // TODO: diff the saved config with file system
        return Promise.resolve(this.configService.get());
    }

    async sort(info: ItemInfo[]): Promise<boolean> {
        try {
            const config = this.configService.get();
            const saved = config.projectInfo.list;
            const changed = sortProject(this.docDir, saved, info);
            if (changed) {
                this.configService.setConfig({
                    ...config,
                    projectInfo: { ...config.projectInfo, list: flushId(info) },
                });

                await this.configService.writeConfig();
            }
            return changed;
        } catch (e) {
            console.error(e);
        }
        return false;
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
