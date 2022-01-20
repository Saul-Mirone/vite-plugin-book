/* Copyright 2021, vite-plugin-book by Mirone. */

import { useContext, useMemo } from 'react';

import type { WebSocketServerEvents } from '../interface';
import { RpcCtx, RpcStatusCtx } from '../provider/RpcProvider';

type UseRpc =
    | { status: 'connected'; rpc: WebSocketServerEvents }
    | { status: 'connecting' }
    | { status: 'disconnected' };

export function useRpc(): UseRpc {
    const status = useContext(RpcStatusCtx);
    const rpc = useContext(RpcCtx);

    return useMemo(() => ({ status, rpc } as UseRpc), [rpc, status]);
}
