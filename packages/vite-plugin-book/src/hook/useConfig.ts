/* Copyright 2021, vite-plugin-book by Mirone. */
import { useCallback, useContext, useMemo } from 'react';

import { ConfigCtx, SetConfigCtx } from '../provider/ConfigProvider';
import { useRpc } from './useRpc';

export const useConfig = () => {
    const ctx = useRpc();
    const config = useContext(ConfigCtx);
    const setConfig = useContext(SetConfigCtx);

    const getConfig = useCallback(async () => {
        if (ctx.status === 'connected') {
            try {
                const config = await ctx.rpc.getConfig();
                setConfig(config);
            } catch (e) {
                console.error(e);
            }
        }
    }, [ctx, setConfig]);

    return useMemo(() => ({ config, setConfig, getConfig } as const), [config, setConfig, getConfig]);
};
