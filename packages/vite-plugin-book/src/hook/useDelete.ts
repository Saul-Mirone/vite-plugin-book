/* Copyright 2021, vite-plugin-book by Mirone. */
import { useCallback } from 'react';

import { useConfig } from './useConfig';
import { useDialog } from './useDialog';
import { useNav } from './useNav';
import { useRpc } from './useRpc';

export const useDelete = (url: string) => {
    const ctx = useRpc();
    const { getConfig } = useConfig();
    const { hide } = useDialog();
    const nav = useNav();

    const onDelete = useCallback(async () => {
        if (ctx.status !== 'connected') {
            hide();
            return;
        }
        const nextId = await ctx.rpc.deleteFile(url);
        await getConfig();
        nav(nextId, { replace: true });

        hide();
    }, [ctx, getConfig, hide, nav, url]);

    return onDelete;
};
