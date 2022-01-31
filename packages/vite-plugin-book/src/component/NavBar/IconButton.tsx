/* Copyright 2021, vite-plugin-book by Mirone. */

import { FC } from 'react';

import cx from './IconButton.module.css';

export type IconButtonProps = {
    type: string;
    onClick: () => void;
};

export const IconButton: FC<IconButtonProps> = ({ type, onClick }) => {
    return (
        <div className={cx['icon-btn-container']}>
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClick();
                }}
                className={`${cx['icon-btn']} material-icons-outlined`}
            >
                {type}
            </span>
        </div>
    );
};
