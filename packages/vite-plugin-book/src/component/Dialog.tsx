/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

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

export const Dialog: FC<DialogProps> = ({ title, description, onConfirm, onCancel, icon }) => (
    <div className={cx['mask']}>
        <div className="rounded-28px bg-background bg-opacity-100 p-24px w-312px">
            {icon && (
                <div className="text-center mb-16px">
                    <span className="text-3xl text-primary material-icons">{icon}</span>
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
