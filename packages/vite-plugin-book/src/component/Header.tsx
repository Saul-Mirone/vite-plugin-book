/* Copyright 2021, vite-plugin-book by Mirone. */
import './Header.css';

import { FC } from 'react';

import { useDialog } from '../hook/useDialog';
import { useFile } from '../hook/useFile';
import { useToast } from '../hook/useToast';
import { useUIConfig } from '../hook/useUIConfig';

const Button: FC<{ text: string; onClick: () => void }> = ({ text, onClick }) => {
    return (
        <div className="header-button" onClick={onClick}>
            <span className="material-icons-outlined">{text}</span>
        </div>
    );
};

export const Header = () => {
    const { setMenuFold, setIsDarkMode } = useUIConfig();
    const { url, changed } = useFile();
    const setToast = useToast();
    const { show, hide } = useDialog();
    return (
        <div className="h-64px flex justify-between px-16px items-center">
            <Button onClick={() => setMenuFold((x) => !x)} text="menu" />
            <div className="flex gap-4px">
                <Button
                    onClick={() => {
                        if (!changed) {
                            setIsDarkMode((x) => !x);
                            return;
                        }
                        show({
                            title: 'Unsaved Changes',
                            description: 'You have unsaved changes, are you sure you want to leave this page?',
                            onConfirm: () => {
                                setIsDarkMode((x) => !x);
                                hide();
                            },
                            onCancel: () => {
                                hide();
                            },
                        });
                    }}
                    text="dark_mode"
                />
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText(`${location.protocol}//${location.host}/${url}`);
                        setToast('Link Copied');
                    }}
                    text="share"
                />
            </div>
        </div>
    );
};
