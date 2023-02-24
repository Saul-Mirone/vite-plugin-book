/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, ReactNode, useContext, useEffect } from 'react';

import { ShowDialogCtx } from '../provider/DialogProvider';

const DialogButton: FC<{ onClick: () => void; children: ReactNode }> = ({ children, onClick }) => {
    return (
        <div className="transition rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700" onClick={onClick}>
            <div className="px-3 py-2 cursor-pointer flex justify-center items-center leading-6 gap-1">{children}</div>
        </div>
    );
};

export type DialogProps = {
    icon?: string;
    title: string;
    description: string | JSX.Element;
    onConfirm: () => void;
    onCancel: () => void;
};

export const Dialog: FC<DialogProps> = ({ title, description, onConfirm, onCancel, icon }) => {
    const isShow = useContext(ShowDialogCtx);
    useEffect(() => {
        const keyBoardEvent = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onConfirm();
            }
            if (e.key === 'Escape') {
                onCancel();
            }
        };
        if (isShow) {
            window.addEventListener('keydown', keyBoardEvent);
        }
        return () => {
            window.removeEventListener('keydown', keyBoardEvent);
        };
    }, [isShow, onCancel, onConfirm]);
    return (
        <div className="font-sans fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex items-center justify-center bg-gray-600/60 dark:bg-gray-800/60">
            <div className="rounded-lg bg-gray-100 dark:bg-gray-600 bg-opacity-100 p-[24px] w-[312px]">
                {icon && (
                    <div className="text-center mb-[16px]">
                        <span className="text-3xl text-primary material-icons-outlined">{icon}</span>
                    </div>
                )}
                <div className="text-opacity-87 text-2xl mb-[16px] text-center">{title}</div>
                <div className="text-opacity-87 mb-[24px]">{description}</div>
                <div className="text-nord10 dark:text-nord9 flex justify-end gap-2">
                    <DialogButton onClick={onCancel}>
                        <span className="material-icons-outlined">close</span>Cancel
                    </DialogButton>
                    <DialogButton onClick={onConfirm}>
                        <span className="material-icons-outlined">done</span>
                        Confirm
                    </DialogButton>
                </div>
            </div>
        </div>
    );
};
