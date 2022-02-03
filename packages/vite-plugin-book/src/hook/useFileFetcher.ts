/* Copyright 2021, vite-plugin-book by Mirone. */
import { useEffect } from 'react';

import { ListReducerState } from '../component/NavBar/listReducer';
import { flatItems } from '../utils/helper';
import { useConfig } from './useConfig';
import { useFile } from './useFile';
import { useMode } from './useMode';
import { useRpc } from './useRpc';
import { useToast } from './useToast';
import { useUIConfig } from './useUIConfig';

export const useFileFetcher = (state: ListReducerState) => {
    const ctx = useRpc();
    const { setFile, url, setLoading } = useFile();
    const { isMobile, setMenuFold } = useUIConfig();
    const { getConfig } = useConfig();
    const mode = useMode();
    const setToast = useToast();
    useEffect(() => {
        if (ctx.status !== 'connected') {
            return;
        }

        const setFileByUrl = async () => {
            setLoading(true);
            if (isMobile) {
                setMenuFold(true);
            }
            const file = await ctx.rpc.getFile(url === '/' ? 'index' : url);

            setFile(file);
            setLoading(false);
        };

        setFileByUrl();
    }, [url, setFile, ctx, setLoading, isMobile, setMenuFold]);

    useEffect(() => {
        if (mode !== 'editable') {
            return;
        }

        if (ctx.status !== 'connected') {
            return;
        }

        if (flatItems(state.curr).length !== state.count || state.count === 0) {
            return;
        }

        const sortFiles = async () => {
            const changed = await ctx.rpc.sort(state.curr);
            if (changed) {
                await getConfig();
                setToast('Sort Files Succeed');
            }
        };

        sortFiles();
    }, [ctx, getConfig, mode, setToast, state]);
};
