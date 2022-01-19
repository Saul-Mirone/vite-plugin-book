/* Copyright 2021, vite-plugin-book by Mirone. */
import { useRef } from 'react';

import { useEditor } from '../hook/useEditor';

export const Editor = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const { status, set } = useEditor(divRef, true);
    return <div className="m-x-8 m-y-4" ref={divRef} />;
};
