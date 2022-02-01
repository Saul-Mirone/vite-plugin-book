/* Copyright 2021, vite-plugin-book by Mirone. */
import fs from 'fs-extra';
// eslint-disable-next-line import/no-named-as-default
import produce from 'immer';
import path from 'pathe';

import { BookConfig, DirInfo, ItemInfo } from '../interface';
import { walkThroughTree, withOutExt } from '../utils/helper';
import { readProject } from './read-project';

export class ConfigService {
    #rootDir: string;
    #configPath: string;
    #projectName: string;
    #configData!: BookConfig;
    ready: Promise<void>;

    constructor(rootDir: string, name: string) {
        this.#rootDir = rootDir;
        this.#configPath = path.resolve(rootDir, 'settings.json');
        this.#projectName = name;
        this.ready = this.#ensureConfig();
    }

    get() {
        return this.#configData;
    }

    async #ensureConfig() {
        const exists = await fs.pathExists(this.#configPath);
        if (exists) {
            const stat = await fs.stat(this.#configPath);
            if (stat.isFile()) {
                this.#configData = await fs.readJSON(this.#configPath);
                return;
            }
        }

        await this.#initConfig();
    }

    async #initConfig(): Promise<void> {
        const projectInfo = await readProject(this.#rootDir, this.#projectName);
        const config = {
            projectInfo,
        };

        this.#configData = config;
        await this.writeConfig();
    }

    async writeConfig(): Promise<void> {
        await fs.writeJSON(this.#configPath, this.#configData, { spaces: 4 });
    }

    setConfig(config: BookConfig) {
        this.#configData = config;
    }

    async moveFile(url: string, name: string, fullPath: string) {
        let newPath = '';
        let isFile = true;
        let relativeUrl = '';

        const config = this.get();

        const list = produce(config.projectInfo.list, (draft) => {
            walkThroughTree(draft, (x) => {
                if (x.id === url) {
                    if (x.type === 'file') {
                        newPath = path.resolve(path.dirname(fullPath), name);
                        relativeUrl = path.relative(this.#rootDir, newPath);
                        isFile = true;

                        x.id = relativeUrl;
                        x.url = relativeUrl;
                        x.name = name + '.md';
                        return;
                    }

                    newPath = path.resolve(path.dirname(fullPath), '..', name);
                    relativeUrl = path.relative(this.#rootDir, newPath);
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

        this.setConfig({ ...config, projectInfo: { ...config.projectInfo, list } });
        await this.writeConfig();

        return { isFile, newPath } as const;
    }

    async createFile(fullPath: string, name: string, folder: boolean) {
        let id = '';
        const dir = path.dirname(fullPath);

        const fileName = name + (!folder ? '.md' : '');

        const filePath = path.resolve(dir, fileName);

        const config = this.get();

        const list = produce(config.projectInfo.list, (draft) => {
            const relativeUrl = path.relative(this.#rootDir, filePath);
            id = withOutExt(relativeUrl);
            const fileInfo: ItemInfo = folder
                ? {
                      type: 'dir',
                      name: fileName,
                      url: id,
                      id,
                      hasIndex: true,
                      list: [],
                  }
                : {
                      type: 'file',
                      name: fileName,
                      url: id,
                      id,
                  };
            if (this.#rootDir === dir) {
                draft.push(fileInfo);
                return;
            }

            let target: DirInfo | undefined;
            walkThroughTree(draft, (x) => {
                if (x.type === 'dir' && x.id === path.relative(this.#rootDir, dir)) {
                    target = x;
                }
            });
            if (!target) return;

            target.list.push(fileInfo);
        });
        this.setConfig({ ...config, projectInfo: { ...config.projectInfo, list } });
        await this.writeConfig();

        return { id, filePath } as const;
    }
}
