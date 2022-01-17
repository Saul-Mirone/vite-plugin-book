/* Copyright 2021, vite-plugin-book by Mirone. */

import { useContext } from 'react';

import { RpcCtx, RpcStatusCtx } from './RpcProvider';

export function useRpc() {
    const status = useContext(RpcStatusCtx);
    const rpc = useContext(RpcCtx);

    return [status, rpc];
}
