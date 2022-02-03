/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { FileCtx, SetFileCtx, SetUrlCtx, UrlCtx } from '../provider/FileProvider';
import { RouteBaseCtx } from '../provider/RouteBaseProvider';

export function useFile() {
    const file = useContext(FileCtx);
    const setFile = useContext(SetFileCtx);
    const url = useContext(UrlCtx);
    const setUrl = useContext(SetUrlCtx);
    const location = useLocation();
    const base = useContext(RouteBaseCtx);
    useEffect(() => {
        const current = location.pathname.replace(base, '');
        if (url !== current) {
            setUrl(current);
        }
    }, [base, location, setUrl, url]);
    return {
        file,
        setFile,
        url,
        setUrl,
    };
}
