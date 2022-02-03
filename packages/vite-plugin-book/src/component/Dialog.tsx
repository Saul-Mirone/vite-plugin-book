/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, useContext, useEffect } from 'react';

import { ShowDialogCtx } from '../provider/DialogProvider';
import cx from './Dialog.module.css';

const DialogButton: FC<{ onClick: () => void }> = ({ children, onClick }) => {
    return (
        <div className={cx['button-container']} onClick={onClick}>
            <div className={cx['button']}>{children}</div>
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
        <div className={cx['mask']}>
            <div className="rounded-28px bg-background bg-opacity-100 p-24px w-312px">
                {icon && (
                    <div className="text-center mb-16px">
                        <span className="text-3xl text-primary material-icons-outlined">{icon}</span>
                    </div>
                )}
                <div className="text-neutral text-opacity-87 text-2xl mb-16px text-center">{title}</div>
                <div className="text-neutral text-opacity-87 mb-24px">{description}</div>
                <div className="text-primary flex justify-end gap-8px">
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
