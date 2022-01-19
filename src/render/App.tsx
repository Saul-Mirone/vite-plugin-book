/* Copyright 2021, vite-plugin-book by Mirone. */
import { useRef } from 'react';

import { useEditor } from '../hook/useEditor';

export const App = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const { status, set } = useEditor(divRef, true);
    return <div ref={divRef} />;
};
