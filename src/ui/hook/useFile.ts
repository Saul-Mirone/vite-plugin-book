/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext } from 'react';

import { FileCtx, SetFileCtx } from '../provider/FileProvider';

export function useFile() {
    const file = useContext(FileCtx);
    const setFile = useContext(SetFileCtx);
    return [file, setFile] as const;
}
