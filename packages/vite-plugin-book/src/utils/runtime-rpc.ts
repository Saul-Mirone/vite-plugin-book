/* Copyright 2021, vite-plugin-book by Mirone. */
import { BookConfig, WebSocketServerEvents } from '../interface';

export class RuntimeRpc implements WebSocketServerEvents {
    get store() {
        return globalThis.__VITE_PLUGIN_BOOK__;
    }

    async getConfig(): Promise<BookConfig> {
        return Promise.resolve(this.store.config);
    }

    async getFile(url: string) {
        let target = url;
        if (url.length === 0) {
            target = 'index';
        }
        if (!this.store.mapping[target]) {
            target += '/index';
        }
        const getter = this.store.mapping[target];
        if (!getter) {
            throw new Error();
        }
        const module = await getter();
        // Hack for decode env
        return module.default.replaceAll('$META_ENV$', 'meta.env');
    }

    getFiles() {
        throw new Error();
    }

    writeFile(): Promise<void> {
        throw new Error();
    }

    writeConfig(): Promise<void> {
        throw new Error();
    }

    createFile(): Promise<string> {
        throw new Error();
    }

    deleteFile(): Promise<string> {
        throw new Error();
    }

    sort(): Promise<boolean> {
        throw new Error();
    }
}
