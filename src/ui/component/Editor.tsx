/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, useEffect, useRef } from 'react';

import { useEditor } from '../hook/useEditor';
import { useFile } from '../hook/useFile';
import { useRpc } from '../hook/useRpc';

export const Editor: FC = () => {
    const ctx = useRpc();
    const { file, url } = useFile();
    const divRef = useRef<HTMLDivElement>(null);
    const { status, set, get } = useEditor(divRef);

    useEffect(() => {
        if (status !== 'loaded') return;

        set(file);
    }, [file, set, status]);

    const onSave = () => {
        if (status !== 'loaded' || ctx.status !== 'connected' || !url) return;

        const markdown = get();

        if (markdown != null) {
            ctx.rpc.$.writeFile(url, markdown);
        }
    };

    return (
        <>
            <div className="m-x-8 m-y-4" ref={divRef} />
            <div>
                <button onClick={() => onSave()}>Save</button>
            </div>
        </>
    );
};
