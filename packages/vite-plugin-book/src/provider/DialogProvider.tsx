/* Copyright 2021, vite-plugin-book by Mirone. */
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

import { Dialog } from '../component/Dialog';
import { nope } from '../utils/helper';

export type DialogData = {
    icon?: string;
    title: string;
    description: string | JSX.Element;
    onConfirm: () => void;
    onCancel: () => void;
};

export const ShowDialogCtx = createContext<boolean>(false);
export const SetShowDialogCtx = createContext<Dispatch<SetStateAction<boolean>>>(nope);
export const SetDialogDataCtx = createContext<Dispatch<SetStateAction<DialogData>>>(nope);

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogData, setDialogData] = useState({} as DialogData);

    return (
        <ShowDialogCtx.Provider value={showDialog}>
            <SetShowDialogCtx.Provider value={setShowDialog}>
                <SetDialogDataCtx.Provider value={setDialogData}>
                    {children}
                    {showDialog && <Dialog {...dialogData} />}
                </SetDialogDataCtx.Provider>
            </SetShowDialogCtx.Provider>
        </ShowDialogCtx.Provider>
    );
};
