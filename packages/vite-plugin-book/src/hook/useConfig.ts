/* Copyright 2021, vite-plugin-book by Mirone. */
import { useCallback, useContext, useEffect, useMemo } from 'react';

import { ConfigCtx, SetConfigCtx } from '../provider/ConfigProvider';
import { useMode } from './useMode';
import { useRpc } from './useRpc';

export const useConfig = () => {
    const ctx = useRpc();
    const config = useContext(ConfigCtx);
    const setConfig = useContext(SetConfigCtx);

    const getConfig = useCallback(() => {
        if (ctx.status === 'connected') {
            const fetchConfig = async () => {
                try {
                    const config = await ctx.rpc.getConfig();
                    setConfig(config);
                } catch (e) {
                    console.error(e);
                }
            };
            fetchConfig();
        }
    }, [ctx, setConfig]);

    return useMemo(() => ({ config, setConfig, getConfig } as const), [config, setConfig, getConfig]);
};
