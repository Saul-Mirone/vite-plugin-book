/* Copyright 2021, vite-plugin-book by Mirone. */
import { useCallback, useContext } from 'react';

import { SetToastDataCtx } from '../provider/ToastProvider';

export const useToast = () => {
    const setToast = useContext(SetToastDataCtx);
    const toast = useCallback(
        (text: string, timeout?: number) => {
            setToast({
                description: text,
                timeout,
            });
        },
        [setToast],
    );
    return toast;
};
