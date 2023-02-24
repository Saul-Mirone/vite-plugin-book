/* Copyright 2021, vite-plugin-book by Mirone. */
import './style.css';

import { Milkdown } from '@milkdown/react';
import { getMarkdown } from '@milkdown/utils';
import { FC, KeyboardEvent, memo, useContext } from 'react';

import { useConfig } from '../../hook/useConfig';
import { useDialog } from '../../hook/useDialog';
import { useEditor } from '../../hook/useEditor';
import { useFile } from '../../hook/useFile';
import { useIsRuntime, useMode } from '../../hook/useMode';
import { useNav } from '../../hook/useNav';
import { useOutline } from '../../hook/useOutline';
import { useRpc } from '../../hook/useRpc';
import { useToast } from '../../hook/useToast';
import { RouteBaseCtx } from '../../provider/RouteBaseProvider';
import { Toolbar } from '../Toolbar';

export const Editor: FC<{ readonly: boolean }> = memo(({ readonly }) => {
    const base = useContext(RouteBaseCtx);
    const mode = useMode();
    const ctx = useRpc();
    const { file, url, setFile, changed } = useFile();
    const { flush, get, recoverSelection, loading } = useEditor(file, readonly);
    const { show, hide } = useDialog();
    const [data] = useOutline();
    const { getConfig } = useConfig();
    const isRuntime = useIsRuntime();
    const nav = useNav();
    const setToast = useToast();

    const onSave = async () => {
        if (ctx.status !== 'connected' || !changed || loading) return;

        const markdown = get()?.action(getMarkdown());

        const [h1] = data;

        const name = h1 ? h1.text.replace(/\s/g, '-') : 'untitled';

        if (markdown != null) {
            await ctx.rpc.writeFile(url, name, markdown);
            setFile(markdown);
        }

        await getConfig();
        const prevPathList = url.split('/');

        let newPath = '';
        const isRoot = url === '/' || url === '';
        if (!isRoot) {
            newPath = prevPathList
                .slice(0, prevPathList.length - 1)
                .concat(name)
                .join('/');
        }

        if (newPath !== url) {
            nav(newPath, { replace: true });
        }

        setToast('Article Saved');
        setTimeout(() => {
            recoverSelection();
        }, 0);
    };

    const onCancel = () => {
        if (ctx.status !== 'connected') return;
        show({
            icon: 'report_problem',
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
        location.href = location.href.replace('/__preview__', '');
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (mode === 'preview') return;

        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            onSave();
            e.preventDefault();
            return;
        }

        if (e.key === 'Escape') {
            onCancel();
            e.preventDefault();
        }
    };

    return (
        <>
            <div className="flex-1 min-w-0" onKeyDown={onKeyDown}>
                <Milkdown />
            </div>
            {!isRuntime && (
                <Toolbar changed={changed} onSave={onSave} onCancel={onCancel} onPreview={onPreview} onEdit={onEdit} />
            )}
        </>
    );
});
