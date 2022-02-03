/* Copyright 2021, vite-plugin-book by Mirone. */

import { createContext, FC, useEffect, useRef, useState } from 'react';

import { WebSocketServerEvents } from '../interface';
import { Rpc } from '../utils/rpc';

export type Status = 'connecting' | 'connected' | 'disconnected';
export const RpcCtx = createContext<WebSocketServerEvents | undefined>(undefined);
export const RpcStatusCtx = createContext<Status>('connecting');

export const DevRpcProvider: FC = ({ children }) => {
    const rpcRef = useRef<Rpc>();
    const [ws, setWs] = useState<WebSocket | null>();
    const [status, setStatus] = useState<Status>('connecting');
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        rpcRef.current = new Rpc(setWs);
    }, []);

    useEffect(() => {
        if (!ws) return;

        setStatus('connecting');

        ws.addEventListener('open', () => {
            setStatus('connected');
        });

        ws.addEventListener('close', () => {
            setClosing(true);
        });
    }, [ws]);

    useEffect(() => {
        if (closing) {
            setTimeout(() => {
                if (status === 'connecting') {
                    setStatus('disconnected');
                }
                setClosing(false);
            }, 1000);
        }
    }, [closing, status]);

    return (
        <RpcStatusCtx.Provider value={status}>
            <RpcCtx.Provider value={rpcRef.current}>{children}</RpcCtx.Provider>
        </RpcStatusCtx.Provider>
    );
};
