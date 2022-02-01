/* Copyright 2021, vite-plugin-book by Mirone. */
import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

import { Toast } from '../component/Toast';
import { nope } from '../utils/helper';

export type ToastData = {
    description: string;
    timeout?: number;
};

export const SetToastDataCtx = createContext<Dispatch<SetStateAction<ToastData>>>(nope);

export const ToastProvider: FC = ({ children }) => {
    const [dialogData, setDialogData] = useState({} as ToastData);

    return (
        <SetToastDataCtx.Provider value={setDialogData}>
            {children}
            <Toast {...dialogData} />
        </SetToastDataCtx.Provider>
    );
};
