/* Copyright 2021, vite-plugin-book by Mirone. */

type File = {
    name: string;
    url: string;
};

type Dir = {
    name: string;
    list: Item[];
};

type Item = File | Dir;

export type WebSocketServerEvents = {
    getFiles(): Item[];
};

export type WebSocketClientEvents = {};
