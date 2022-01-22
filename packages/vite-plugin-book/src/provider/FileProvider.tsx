/* Copyright 2021, vite-plugin-book by Mirone. */
import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';

import { RouteBaseCtx } from './RouteBaseProvider';

export const FileCtx = createContext('');
export const SetFileCtx = createContext<Dispatch<SetStateAction<string>>>(() => {
    throw new Error();
});
export const UrlCtx = createContext('');
export const SetUrlCtx = createContext<Dispatch<SetStateAction<string>>>(() => {
    throw new Error();
});

export const FileProvider: FC = ({ children }) => {
    const base = useContext(RouteBaseCtx);
    const pureBase = window.location.pathname.replace(base, '');
    const [file, setFile] = useState('');
    const [url, setUrl] = useState(pureBase.length === 0 ? '/' : pureBase);
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
