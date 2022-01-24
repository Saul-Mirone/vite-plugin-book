/* Copyright 2021, vite-plugin-book by Mirone. */
import './style.css';

import { FC, useRef } from 'react';

import { useDialog } from '../../hook/useDialog';
import { useEditor } from '../../hook/useEditor';
import { useFile } from '../../hook/useFile';
import { useMode } from '../../hook/useMode';
import { useRpc } from '../../hook/useRpc';
import { nope } from '../../utils/helper';
import { Toolbar } from '../Toolbar';

export const Editor: FC<{ readonly: boolean }> = ({ readonly }) => {
    const mode = useMode();
    const ctx = useRpc();
    const { file, url, setFile } = useFile();
    const divRef = useRef<HTMLDivElement>(null);
    const { flush, get, changed } = useEditor(divRef, file, readonly);
    const { show, hide } = useDialog();

    const onSave = () => {
        if (ctx.status !== 'connected' || !url) return;

        const markdown = get();

        if (markdown != null) {
            ctx.rpc.writeFile(url, markdown);
            setFile(markdown);
        }
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

    const onAdd = nope;

    return (
        <>
            <div className="max-w-760px w-full" ref={divRef} />
            {mode === 'editable' && <Toolbar changed={changed} onAdd={onAdd} onSave={onSave} onCancel={onCancel} />}
        </>
    );
};
