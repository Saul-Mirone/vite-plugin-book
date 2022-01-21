/* Copyright 2021, vite-plugin-book by Mirone. */

export type FileInfo = {
    type: 'file';
    name: string;
    url: string;
};

export type DirInfo = {
    type: 'dir';
    name: string;
    list: ItemInfo[];
};

export type ItemInfo = FileInfo | DirInfo;

export interface WebSocketServerEvents {
    // getConfig
    getFiles(): Promise<ItemInfo[]>;
    getFile(url: string): Promise<string>;
    writeFile(url: string, markdown: string): Promise<void>;
}

export type WebSocketClientEvents = {
    // add client events here
};
