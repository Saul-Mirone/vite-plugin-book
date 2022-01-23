/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, useEffect, useRef } from 'react';

import { useEditor } from '../../hook/useEditor';
import { useFile } from '../../hook/useFile';
import { useRpc } from '../../hook/useRpc';

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
            ctx.rpc.writeFile(url, markdown);
        }
    };

    return (
        <>
            <div className="max-w-760px w-full" ref={divRef} />
            <div>
                {/* <button
                    className="transition cursor-pointer text-secondary p-x-4 p-y-2 bg-transparent b-2 b-secondary hover:b-primary hover:text-primary"
                    onClick={() => onSave()}
                >
                    Save
                </button> */}
            </div>
        </>
    );
};
