/* Copyright 2021, vite-plugin-book by Mirone. */
import './Header.css';

import { FC } from 'react';

const Button: FC<{ text: string }> = ({ text }) => {
    return (
        <div className="header-button">
            <span className="material-icons-outlined">{text}</span>
        </div>
    );
};

export const Header = () => {
    return (
        <div className="h-64px flex justify-between px-16px items-center">
            <Button text="menu" />
            <div className="flex gap-4px">
                <Button text="dark_mode" />
                <Button text="share" />
            </div>
        </div>
    );
};
