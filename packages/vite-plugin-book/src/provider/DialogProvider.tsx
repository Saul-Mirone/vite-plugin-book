/* Copyright 2021, vite-plugin-book by Mirone. */
import { createContext, Dispatch, FC, SetStateAction, useState } from 'react';

import { Dialog } from '../component/Dialog';
import { nope } from '../utils/helper';

export type DialogData = {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export const SetShowDialogCtx = createContext<Dispatch<SetStateAction<boolean>>>(nope);
export const SetDialogDataCtx = createContext<Dispatch<SetStateAction<DialogData>>>(nope);

export const DialogProvider: FC = ({ children }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogData, setDialogData] = useState({} as DialogData);

    return (
        <SetShowDialogCtx.Provider value={setShowDialog}>
            <SetDialogDataCtx.Provider value={setDialogData}>
                {children}
                {showDialog && <Dialog {...dialogData} />}
            </SetDialogDataCtx.Provider>
        </SetShowDialogCtx.Provider>
    );
};
