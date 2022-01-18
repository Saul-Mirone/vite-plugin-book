/* Copyright 2021, vite-plugin-book by Mirone. */

import { useContext } from 'react';

import { RpcCtx, RpcStatusCtx } from '../provider/RpcProvider';
import { Rpc } from '../rpc';

type UseRpc = { status: 'connected'; rpc: Rpc } | { status: 'connecting' } | { status: 'disconnected' };

export function useRpc(): UseRpc {
    const status = useContext(RpcStatusCtx);
    const rpc = useContext(RpcCtx);

    return { status, rpc } as UseRpc;
}
