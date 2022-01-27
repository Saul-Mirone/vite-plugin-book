/* Copyright 2021, vite-plugin-book by Mirone. */
import { useEffect } from 'react';

import { useFile } from './useFile';
import { useRpc } from './useRpc';

export const useFileFetcher = () => {
    const ctx = useRpc();
    const { setFile, url } = useFile();
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
};
