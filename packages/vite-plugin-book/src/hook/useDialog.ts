/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext } from 'react';

import { DialogData, SetDialogDataCtx, SetShowDialogCtx } from '../provider/DialogProvider';

export const useDialog = () => {
    const setShow = useContext(SetShowDialogCtx);
    const setData = useContext(SetDialogDataCtx);

    const show = (data: DialogData) => {
        setData(data);
        setShow(true);
    };

    const hide = () => setShow(false);

    return {
        show,
        hide,
    } as const;
};
