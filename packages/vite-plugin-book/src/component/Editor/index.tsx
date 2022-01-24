/* Copyright 2021, vite-plugin-book by Mirone. */
import './style.css';

import { FC, useEffect, useRef } from 'react';

import { useEditor } from '../../hook/useEditor';
import { useFile } from '../../hook/useFile';
import { useRpc } from '../../hook/useRpc';
import { Toolbar } from '../Toolbar';

export const Editor: FC<{ readonly: boolean }> = ({ readonly }) => {
    const ctx = useRpc();
    const { file, url, setFile } = useFile();
    const divRef = useRef<HTMLDivElement>(null);
    const { flush, get, changed } = useEditor(divRef, file, readonly);

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
        flush();
    };

    return (
        <>
            <div className="max-w-760px w-full" ref={divRef} />
            <Toolbar changed={changed} onSave={onSave} onCancel={onCancel} />
        </>
    );
};
