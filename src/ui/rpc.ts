/* Copyright 2021, vite-plugin-book by Mirone. */
import { BirpcReturn, createBirpc } from 'birpc';
import { parse, stringify } from 'flatted';

import { WebSocketClientEvents, WebSocketServerEvents } from '../interface';

const reconnectTries = 10;
const reconnectInterval = 2000;
export const PORT = import.meta.hot ? '3000' : location.port;
export const HOST = [location.hostname, PORT].filter(Boolean).join(':');
const wsUrl = `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${HOST}/__vite-plugin-book-server__`;

export class Rpc {
    ws: WebSocket;
    $: BirpcReturn<WebSocketServerEvents>;

    #onMessage: (...args: unknown[]) => unknown = () => {
        // do nothing
    };
    #openPromise: Promise<void> = Promise.resolve();
    #tries = reconnectTries;

    constructor(private updateWS: (ws: WebSocket) => void) {
        this.ws = new window.WebSocket(wsUrl);
        this.$ = createBirpc<WebSocketServerEvents, WebSocketClientEvents>(
            {},
            {
                post: (msg) => this.ws.send(msg),
                on: (fn) => (this.#onMessage = fn),
                serialize: stringify,
                deserialize: parse,
            },
        );
        this.register();
        this.updateWS(this.ws);
    }

    register() {
        this.#openPromise = new Promise((resolve) => {
            this.ws.addEventListener('open', () => {
                this.#tries = reconnectTries;
                resolve();
            });
        });
        this.ws.addEventListener('message', (v) => {
            this.#onMessage(v.data);
        });

        this.ws.addEventListener('close', () => {
            this.#tries -= 1;
            if (this.#tries > 0) setTimeout(this.reconnect, reconnectInterval);
        });
    }

    reconnect(reset = false) {
        if (reset) this.#tries = reconnectTries;
        this.ws = new WebSocket(wsUrl);
        this.register();
        this.updateWS(this.ws);
    }

    waitForConnect() {
        return this.#openPromise;
    }
}
