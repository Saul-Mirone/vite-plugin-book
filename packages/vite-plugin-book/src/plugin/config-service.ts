/* Copyright 2021, vite-plugin-book by Mirone. */
import fs from 'fs-extra';
import path from 'pathe';

import { BookConfig } from '../interface';
import { readProject } from './read-project';

export class ConfigService {
    #rootDir: string;
    #configPath: string;
    #configData!: BookConfig;
    ready: Promise<void>;

    constructor(rootDir: string) {
        this.#rootDir = rootDir;
        this.#configPath = path.resolve(rootDir, 'settings.json');
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
        const projectInfo = await readProject(this.#rootDir);
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
}
