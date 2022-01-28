/* Copyright 2021, vite-plugin-book by Mirone. */

import { FC } from 'react';

export type IconButtonProps = {
    type: string;
    onClick: () => void;
};

export const IconButton: FC<IconButtonProps> = ({ type, onClick }) => {
    return (
        <span
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClick();
            }}
            className="cursor-pointer text-lg text-opacity-60 text-neutral hover:text-primary hover:text-opacity-100 material-icons-outlined"
        >
            {type}
        </span>
    );
};
