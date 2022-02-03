/* Copyright 2021, vite-plugin-book by Mirone. */

import { FC, useRef, useState } from 'react';

import { RuntimeRpc } from '../utils/runtime-rpc';
import { RpcCtx, RpcStatusCtx, Status } from './RpcProvider';

export const RuntimeRpcProvider: FC = ({ children }) => {
    const rpcRef = useRef<RuntimeRpc>(new RuntimeRpc());
    const [status] = useState<Status>('connected');

    return (
        <RpcStatusCtx.Provider value={status}>
            <RpcCtx.Provider value={rpcRef.current}>{children}</RpcCtx.Provider>
        </RpcStatusCtx.Provider>
    );
};
