/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext } from 'react';

import { FileCtx, SetFileCtx, SetUrlCtx, UrlCtx } from '../provider/FileProvider';

export function useFile() {
    const file = useContext(FileCtx);
    const setFile = useContext(SetFileCtx);
    const url = useContext(UrlCtx);
    const setUrl = useContext(SetUrlCtx);
    return {
        file,
        setFile,
        url,
        setUrl,
    };
}
