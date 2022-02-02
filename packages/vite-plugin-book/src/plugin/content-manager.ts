/* Copyright 2021, vite-plugin-book by Mirone. */
import fs from 'fs-extra';
// eslint-disable-next-line import/no-named-as-default
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
        if (url !== '/' && filename !== name) {
            const { isFile, newPath } = await this.configService.moveFile(url, name, fullPath);

            const from = isFile ? fullPath : dirname(fullPath);
            const to = newPath + (isFile ? '.md' : '');

            await fs.rename(from, to);
        }
    }

    async createFile(near: string, folder = false): Promise<string> {
        // TODO: Check if has untitled
        const date = new Date().toISOString().split('T')[0] as string;
        const fullPath = this.resolveFilePath(near);
        const { id, filePath } = await this.configService.createFile(fullPath, date, folder);
        if (folder) {
            await fs.ensureDir(filePath);
            await fs.writeFile(resolve(filePath, 'index.md'), `# ${date}\n`);
        } else {
            await fs.writeFile(filePath, `# ${date}\n`);
        }
        return id;
    }

    async deleteFile(url: string): Promise<string> {
        let fullPath = this.resolveFilePath(url);
        if (fullPath.length === 0) {
            fullPath = resolve(this.docDir, url);
        }
        const dir = dirname(fullPath);
        await fs.remove(fullPath);
        const config = this.configService.get();
        const newList = produce(config.projectInfo.list, (draft) => {
            let parent: ItemInfo[] | undefined;
            let index = -1;
            walkThroughTree(draft, (x, p, i) => {
                if (x.id === url) {
                    index = i[i.length - 1] as number;
                    if (!p) {
                        parent = draft;
                    } else {
                        parent = p.list;
                    }
                }
            });
            if (!parent || index < 0) return;
            parent.splice(index, 1);
        });
        this.configService.setConfig({ ...config, projectInfo: { ...config.projectInfo, list: newList } });
        await this.configService.writeConfig();
        const relativeUrl = relative(this.docDir, dir);
        return withOutExt(relativeUrl);
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
        if (url === '/') {
            url = 'index';
        }
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
