/* Copyright 2021, vite-plugin-book by Mirone. */
import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

export const FileCtx = createContext('');
export const SetFileCtx = createContext<Dispatch<SetStateAction<string>>>(() => {
    throw new Error();
});

export const FileProvider: FC = ({ children }) => {
    const [file, setFile] = useState('');
    return (
        <FileCtx.Provider value={file}>
            <SetFileCtx.Provider value={setFile}>{children}</SetFileCtx.Provider>
        </FileCtx.Provider>
    );
};
