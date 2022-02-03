/* Copyright 2021, vite-plugin-book by Mirone. */

export type FileInfo = {
    id: string;
    url: string;
    type: 'file';
    name: string;
};

export type DirInfo = {
    id: string;
    url: string;
    type: 'dir';
    name: string;
    hasIndex: boolean;
    list: ItemInfo[];
};

export type ItemInfo = FileInfo | DirInfo;

export type ProjectInfo = {
    name: string;
    repo: string;
    list: ItemInfo[];
};

export type BookConfig = {
    projectInfo: ProjectInfo;
};

// These events are only supported for editable mode
interface AdminEvents {
    createFile(near: string, folder?: boolean): Promise<string>;
    deleteFile(url: string): Promise<string>;
    writeFile(url: string, name: string, markdown: string): Promise<void>;
    sort(info: ItemInfo[]): Promise<boolean>;
}

export interface WebSocketServerEvents extends AdminEvents {
    getConfig(): Promise<BookConfig>;
    getFile(url: string): Promise<string>;
}

export type WebSocketClientEvents = {
    // add client events here
};
