/* Copyright 2021, vite-plugin-book by Mirone. */

import clsx from 'clsx';
import { FC } from 'react';

export type IconButtonProps = {
    type: string;
    onClick: () => void;
};

export const IconButton: FC<IconButtonProps> = ({ type, onClick }) => {
    return (
        <div className="transition w-7 h-7 flex items-center justify-center rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-600">
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClick();
                }}
                className={clsx(
                    'cursor-pointer !text-lg hover:text-nord10 hover:dark:text-nord9',
                    'material-icons-outlined',
                )}
            >
                {type}
            </span>
        </div>
    );
};
