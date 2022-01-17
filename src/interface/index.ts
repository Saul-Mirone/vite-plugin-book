/* Copyright 2021, vite-plugin-book by Mirone. */

export type File = {
    name: string;
    url: string;
};

export type Dir = {
    name: string;
    list: Item[];
};

export type Item = File | Dir;

export interface WebSocketServerEvents {
    // getConfig
    getFiles(): Promise<Item[]>;
    getFile(url: string): Promise<string>;
    writeFile(url: string, markdown: string): Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WebSocketClientEvents {}
