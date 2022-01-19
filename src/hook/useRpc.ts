/* Copyright 2021, vite-plugin-book by Mirone. */

import { useContext, useMemo } from 'react';

import { RpcCtx, RpcStatusCtx } from '../ui/provider/RpcProvider';
import { Rpc } from '../ui/rpc';

type UseRpc = { status: 'connected'; rpc: Rpc } | { status: 'connecting' } | { status: 'disconnected' };

export function useRpc(): UseRpc {
    const status = useContext(RpcStatusCtx);
    const rpc = useContext(RpcCtx);

    return useMemo(() => ({ status, rpc } as UseRpc), [rpc, status]);
}
