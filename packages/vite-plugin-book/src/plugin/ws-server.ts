/* Copyright 2021, vite-plugin-book by Mirone. */

import { BirpcReturn, createBirpc } from 'birpc';
import { parse, stringify } from 'flatted';
import type { ViteDevServer } from 'vite';
import { WebSocket, WebSocketServer } from 'ws';

import { WebSocketClientEvents, WebSocketServerEvents } from '../interface';
import { ConfigService } from './config-service';
import { ContentManager } from './content-manager';

type ClientMap = Map<WebSocket, BirpcReturn<WebSocketClientEvents>>;

export const createWsServer = (server: ViteDevServer, docDir: string, name: string, repo: string) => {
    const clients: ClientMap = new Map();
    const wss = new WebSocketServer({ noServer: true });

    server.httpServer?.on('upgrade', (request, socket, head) => {
        if (!request.url) return;

        const { pathname } = new URL(request.url, 'http://localhost');
        if (pathname !== '/__vite-plugin-book-server__') return;

        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
            setupClient(ws, clients, docDir, name, repo);
        });
    });
};

async function setupClient(ws: WebSocket, clientMap: ClientMap, docDir: string, name: string, repo: string) {
    const configService = new ConfigService(docDir, name, repo);
    await configService.ready;
    const rpc = createBirpc<WebSocketClientEvents, WebSocketServerEvents>(new ContentManager(docDir, configService), {
        post: (msg) => ws.send(msg),
        on: (fn) => ws.on('message', fn),
        serialize: stringify,
        deserialize: parse,
    });
    clientMap.set(ws, rpc);

    ws.on('close', () => {
        clientMap.delete(ws);
    });
}
