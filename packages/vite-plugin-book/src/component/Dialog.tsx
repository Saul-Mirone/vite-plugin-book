/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

const DialogButton: FC<{ onClick: () => void }> = ({ children, onClick }) => {
    return (
        <div className="transition bg-opacity-30 hover:bg-primary rounded-16px" onClick={onClick}>
            <div className="px-12px py-10px cursor-pointer text-primary text-opacity-100 flex justify-center items-center leading-24px gap-4px">
                {children}
            </div>
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
    <div className="font-sans fixed top-0 bottom-0 left-0 right-0 w-full h-full z-1 bg-neutral bg-opacity-80 flex items-center justify-center">
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
