/* Copyright 2021, vite-plugin-book by Mirone. */
import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

export const FileCtx = createContext('');
export const SetFileCtx = createContext<Dispatch<SetStateAction<string>>>(() => {
    throw new Error();
});
export const UrlCtx = createContext('');
export const SetUrlCtx = createContext<Dispatch<SetStateAction<string>>>(() => {
    throw new Error();
});

const path = window.location.hash
    .split('/')
    .filter((x) => x && x !== '#')
    .join('/');

export const FileProvider: FC = ({ children }) => {
    const [file, setFile] = useState('');
    const [url, setUrl] = useState(path.length === 0 ? '/' : path);
    return (
        <UrlCtx.Provider value={url}>
            <SetUrlCtx.Provider value={setUrl}>
                <FileCtx.Provider value={file}>
                    <SetFileCtx.Provider value={setFile}>{children}</SetFileCtx.Provider>
                </FileCtx.Provider>
            </SetUrlCtx.Provider>
        </UrlCtx.Provider>
    );
};
