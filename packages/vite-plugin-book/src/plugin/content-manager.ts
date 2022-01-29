/* Copyright 2021, vite-plugin-book by Mirone. */
import fs from 'fs-extra';
// eslint-disable-next-line import/no-named-as-default
import produce from 'immer';
import { basename, dirname, relative, resolve } from 'pathe';

import type { BookConfig, DirInfo, FileInfo, ItemInfo, WebSocketServerEvents } from '../interface';
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

    async createFile(near: string, folder = false): Promise<string> {
        // TODO: Check if has untitled
        let id = '';
        const date = new Date().toISOString().split('T')[0];
        const fullPath = this.resolveFilePath(near);
        const dir = dirname(fullPath);
        const filePath = resolve(dir, date + (!folder ? '.md' : ''));
        if (folder) {
            await fs.ensureDir(filePath);
            await fs.writeFile(resolve(filePath, 'index.md'), `# ${date}\n`);
        } else {
            await fs.writeFile(filePath, `# ${date}\n`);
        }
        const config = this.configService.get();
        const newList = produce(config.projectInfo.list, (draft) => {
            const relativeUrl = relative(this.docDir, filePath);
            id = withOutExt(relativeUrl);
            const fileInfo: ItemInfo = folder
                ? {
                      type: 'dir',
                      name: date,
                      url: id,
                      id,
                      hasIndex: true,
                      list: [],
                  }
                : {
                      type: 'file',
                      name: date + '.md',
                      url: id,
                      id,
                  };
            if (this.docDir === dir) {
                draft.push(fileInfo);
                return;
            }

            let target: DirInfo | undefined;
            walkThroughTree(draft, (x) => {
                if (x.type === 'dir' && x.id === relative(this.docDir, dir)) {
                    target = x;
                }
            });
            if (!target) return;

            target.list.push(fileInfo);
        });
        this.configService.setConfig({ ...config, projectInfo: { ...config.projectInfo, list: newList } });
        await this.configService.writeConfig();
        return id;
    }

    async deleteFile(url: string): Promise<string> {
        const fullPath = this.resolveFilePath(url);
        const dir = dirname(fullPath);
        await fs.remove(fullPath);
        const config = this.configService.get();
        const newList = produce(config.projectInfo.list, (draft) => {
            let parent: ItemInfo[] | undefined;
            let index = -1;
            walkThroughTree(draft, (x, p, i) => {
                if (x.id === url) {
                    index = i[i.length - 1];
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
