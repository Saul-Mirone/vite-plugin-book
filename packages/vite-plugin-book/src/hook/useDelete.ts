/* Copyright 2021, vite-plugin-book by Mirone. */
import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouteBaseCtx } from '../provider/RouteBaseProvider';
import { useConfig } from './useConfig';
import { useDialog } from './useDialog';
import { useFile } from './useFile';
import { useRpc } from './useRpc';

export const useDelete = (url: string) => {
    const ctx = useRpc();
    const base = useContext(RouteBaseCtx);
    const { getConfig } = useConfig();
    const { hide } = useDialog();
    const navigate = useNavigate();
    const { setUrl } = useFile();

    const onDelete = useCallback(async () => {
        if (ctx.status !== 'connected') {
            hide();
            return;
        }
        const nextId = await ctx.rpc.deleteFile(url);
        await getConfig();
        navigate(base + nextId, { replace: true });
        setUrl(nextId);

        hide();
    }, [base, ctx, getConfig, hide, navigate, setUrl, url]);

    return onDelete;
};
