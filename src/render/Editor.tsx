/* Copyright 2021, vite-plugin-book by Mirone. */
import { useEffect, useRef } from 'react';

import { useEditor } from '../hook/useEditor';
import { useFile } from '../hook/useFile';

export const Editor = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const { status, set } = useEditor(divRef, true);
    const { file } = useFile();
    useEffect(() => {
        if (status !== 'loaded') return;

        set(file);
    }, [file, set, status]);
    return <div className="m-x-8 m-y-4" ref={divRef} />;
};
