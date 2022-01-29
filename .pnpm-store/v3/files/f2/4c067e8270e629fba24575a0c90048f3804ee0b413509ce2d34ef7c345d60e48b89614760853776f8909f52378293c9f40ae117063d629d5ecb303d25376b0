/// <reference types="node" />
import type { Server } from 'http';
import type { ServerOptions as HttpsServerOptions } from 'https';
import type { WebSocket as WebSocketTypes } from 'types/ws';
import type { HMRPayload } from 'types/hmrPayload';
import type { ResolvedConfig } from '..';
export declare const HMR_HEADER = "vite-hmr";
export interface WebSocketServer {
    on: WebSocketTypes.Server['on'];
    off: WebSocketTypes.Server['off'];
    send(payload: HMRPayload): void;
    close(): Promise<void>;
}
export declare function createWebSocketServer(server: Server | null, config: ResolvedConfig, httpsOptions?: HttpsServerOptions): WebSocketServer;
