/* Copyright 2021, vite-plugin-book by Mirone. */
import './Header.css';

import { FC } from 'react';

import { useFile } from '../hook/useFile';
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
    const { url } = useFile();
    return (
        <div className="h-64px flex justify-between px-16px items-center">
            <Button onClick={() => setMenuFold((x) => !x)} text="menu" />
            <div className="flex gap-4px">
                <Button onClick={() => setIsDarkMode((x) => !x)} text="dark_mode" />
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText(`${location.protocol}//${location.host}/${url}`);
                    }}
                    text="share"
                />
            </div>
        </div>
    );
};
