/* Copyright 2021, vite-plugin-book by Mirone. */
import fs from 'fs-extra';
import { produce } from 'immer';
import { basename, dirname, relative, resolve } from 'pathe';

import type { BookConfig, ItemInfo, WebSocketServerEvents } from '../interface';
import { walkThroughTree, withOutExt } from '../utils/helper';
import { ConfigService } from './config-service';
import { flushId, sortProject } from './sort-project';

export class ContentManager implements WebSocketServerEvents {
    constructor(private docDir: string, private configService: ConfigService) {}

    getFile = async (url: string): Promise<string> => {
        return fs.readFile(this.resolveFilePath(url), 'utf-8');
    };

    writeFile = async (url: string, name: string, markdown: string): Promise<void> => {
        const fullPath = this.resolveFilePath(url);
        await fs.writeFile(fullPath, markdown);
        const filename = basename(fullPath);
        if (url !== '/' && url !== '' && filename !== name) {
            const { isFile, newPath } = await this.configService.moveFile(url, name, fullPath);

            const from = isFile ? fullPath : dirname(fullPath);
            const to = newPath + (isFile ? '.md' : '');

            await fs.rename(from, to);
        }
    };

    createFile = async (near: string, folder = false): Promise<string> => {
        const date = new Date().toISOString().replaceAll(':', '-').split('.')[0] as string;
        const fullPath = this.resolveFilePath(near);
        const { id, filePath } = await this.configService.createFile(fullPath, date, folder);
        if (folder) {
            await fs.ensureDir(filePath);
            await fs.writeFile(resolve(filePath, 'index.md'), `# ${date}\n`);
        } else {
            await fs.writeFile(filePath, `# ${date}\n`);
        }
        return id;
    };

    deleteFile = async (url: string): Promise<string> => {
        let fullPath = this.resolveFilePath(url);
        if (fullPath.length === 0) {
            fullPath = resolve(this.docDir, url);
        }
        const dir = dirname(fullPath);

        const isDir = this.filterDir(url);
        if (isDir != null) {
            await fs.remove(isDir);
        } else {
            await fs.remove(fullPath);
        }

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
        if (fs.existsSync(dir)) {
            const relativeUrl = relative(this.docDir, dir);
            return withOutExt(relativeUrl);
        }
        return withOutExt(relative(this.docDir, resolve(dir, '..')));
    };

    getConfig = async (): Promise<BookConfig> => {
        return Promise.resolve(this.configService.get());
    };

    sort = async (info: ItemInfo[]): Promise<boolean> => {
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
    };

    private resolveFilePath = (url: string) => {
        if (url === '/' || url === '') {
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
    };

    private filterDir = (url: string) => {
        if (url === '/' || url === '') {
            return null;
        }
        const target = resolve(this.docDir, url) + '.md';
        if (fs.existsSync(target)) {
            return null;
        }
        const index = resolve(withOutExt(target), 'index.md');
        if (fs.existsSync(index)) {
            return withOutExt(target);
        }
        console.error('Cannot resolve file: ', url);
        return null;
    };
}
