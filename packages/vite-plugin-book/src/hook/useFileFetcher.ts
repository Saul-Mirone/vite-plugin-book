/* Copyright 2021, vite-plugin-book by Mirone. */
import { useEffect } from 'react';

import { ListReducerState } from '../component/NavBar/listReducer';
import { flatItems } from '../utils/helper';
import { useConfig } from './useConfig';
import { useFile } from './useFile';
import { useRpc } from './useRpc';

export const useFileFetcher = (state: ListReducerState) => {
    const ctx = useRpc();
    const { setFile, url } = useFile();
    const { getConfig } = useConfig();
    useEffect(() => {
        if (ctx.status !== 'connected') {
            return;
        }

        const setFileByUrl = async () => {
            const file = await ctx.rpc.getFile(url === '/' ? 'index' : url);

            setFile(file);
        };

        setFileByUrl();
    }, [url, setFile, ctx]);

    useEffect(() => {
        if (ctx.status !== 'connected') {
            return;
        }

        if (flatItems(state.curr).length !== state.count || state.count === 0) {
            return;
        }

        const sortFiles = async () => {
            const changed = await ctx.rpc.sort(state.curr);
            if (changed) {
                getConfig();
            }
        };

        sortFiles();
    }, [ctx, getConfig, state]);
};
