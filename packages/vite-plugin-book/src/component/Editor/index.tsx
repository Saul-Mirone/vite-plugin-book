/* Copyright 2021, vite-plugin-book by Mirone. */
import './style.css';

import { FC, memo, useContext, useRef } from 'react';

import { useConfig } from '../../hook/useConfig';
import { useDialog } from '../../hook/useDialog';
import { useEditor } from '../../hook/useEditor';
import { useFile } from '../../hook/useFile';
import { useIsRuntime } from '../../hook/useMode';
import { useNav } from '../../hook/useNav';
import { useOutline } from '../../hook/useOutline';
import { useRpc } from '../../hook/useRpc';
import { useToast } from '../../hook/useToast';
import { RouteBaseCtx } from '../../provider/RouteBaseProvider';
import { Toolbar } from '../Toolbar';

export const Editor: FC<{ readonly: boolean }> = memo(({ readonly }) => {
    const base = useContext(RouteBaseCtx);
    const ctx = useRpc();
    const { file, url, setFile } = useFile();
    const divRef = useRef<HTMLDivElement>(null);
    const { flush, get, changed } = useEditor(divRef, file, readonly);
    const { show, hide } = useDialog();
    const [data] = useOutline();
    const { getConfig } = useConfig();
    const isRuntime = useIsRuntime();
    const nav = useNav();
    const setToast = useToast();

    const onSave = async () => {
        if (ctx.status !== 'connected' || !url) return;

        const markdown = get();

        const [h1] = data;

        const name = h1 ? h1.text.replace(/\s/g, '-') : 'untitled';

        if (markdown != null) {
            await ctx.rpc.writeFile(url, name, markdown);
            setFile(markdown);
        }
        await getConfig();
        const prevPathList = url.split('/');
        const newPath = prevPathList
            .slice(0, prevPathList.length - 1)
            .concat(name)
            .join('/');
        nav(newPath);
        setToast('Article Saved');
    };

    const onCancel = () => {
        if (ctx.status !== 'connected' || !url) return;
        show({
            title: 'Abandon you change',
            description: 'Are you sure you want to do this?',
            onConfirm: () => {
                flush();
                hide();
            },
            onCancel: () => {
                hide();
            },
        });
    };

    const onPreview = () => {
        location.href = `${location.protocol}//${location.host}${base}__preview__/${url}`;
    };
    const onEdit = () => {
        location.href = `${location.protocol}//${location.host}/__vite_plugin_book__/${url}`;
    };

    return (
        <>
            <div className="max-w-1080px milkdown-wrapper" ref={divRef} />
            {!isRuntime && (
                <Toolbar changed={changed} onSave={onSave} onCancel={onCancel} onPreview={onPreview} onEdit={onEdit} />
            )}
        </>
    );
});
