/* Copyright 2021, vite-plugin-book by Mirone. */

import './IconButton.css';

import { FC } from 'react';

export type IconButtonProps = {
    type: string;
    onClick: () => void;
};

export const IconButton: FC<IconButtonProps> = ({ type, onClick }) => {
    return (
        <div className="icon-btn-container">
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClick();
                }}
                className="icon-btn material-icons-outlined"
            >
                {type}
            </span>
        </div>
    );
};
