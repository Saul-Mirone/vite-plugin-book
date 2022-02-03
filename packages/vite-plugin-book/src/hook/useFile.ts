/* Copyright 2021, vite-plugin-book by Mirone. */
import { useCallback, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ChangedCtx, FileCtx, SetChangedCtx, SetFileCtx, SetUrlCtx, UrlCtx } from '../provider/FileProvider';
import { RouteBaseCtx } from '../provider/RouteBaseProvider';
import { useDialog } from './useDialog';

export function useFile() {
    const location = useLocation();
    const file = useContext(FileCtx);
    const setFile = useContext(SetFileCtx);
    const url = useContext(UrlCtx);
    const setUrl = useContext(SetUrlCtx);
    const changed = useContext(ChangedCtx);
    const setChanged = useContext(SetChangedCtx);
    const base = useContext(RouteBaseCtx);
    const { show, hide } = useDialog();
    const navigate = useNavigate();

    const checkAndSetUrl = useCallback(
        (next: string) => {
            if (next === url) {
                return;
            }
            if (changed) {
                show({
                    title: 'Unsaved Changes',
                    description: 'You have unsaved changes, are you sure you want to leave this page?',
                    onConfirm: () => {
                        setUrl(next);
                        navigate(base + next);
                        hide();
                    },
                    onCancel: () => {
                        hide();
                    },
                });
                return;
            }
            setUrl(next);
            navigate(base + next);
        },
        [base, changed, hide, navigate, setUrl, show, url],
    );
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
        setUrl: checkAndSetUrl,
        changed,
        setChanged,
    };
}
