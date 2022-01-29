/* Copyright 2021, vite-plugin-book by Mirone. */

import { FC } from 'react';

export type IconButtonProps = {
    type: string;
    onClick: () => void;
};

export const IconButton: FC<IconButtonProps> = ({ type, onClick }) => {
    return (
        <div className="transition flex w-28px h-28px items-center justify-center hover:bg-background rounded-4xl">
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
        </div>
    );
};
