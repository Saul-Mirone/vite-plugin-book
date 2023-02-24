/* Copyright 2021, vite-plugin-book by Mirone. */

import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { ToastData } from '../../provider/ToastProvider';

export const Toast: FC<ToastData> = (props) => {
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        const { timeout = 2000, description } = props;
        if (!description) return;
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        }, timeout);
    }, [props]);

    return (
        // <div className={`${cx['container']} ${display ? '' : cx['hide']}`}>
        <div
            className={clsx(
                'font-sans transition duration-500 shadow-lg rounded-[28px] fixed top-6 bg-gray-100 dark:bg-gray-600 p-3 flex justify-between items-center gap-2 left-1/2 -translate-x-1/2',
                !display && 'translate-y-[-100px]',
            )}
        >
            <span>{props.description}</span>
            {/* <span onClick={() => setDisplay(false)} className={`${cx['icon']} material-icons-outlined`}> */}
            <span
                onClick={() => setDisplay(false)}
                className="transition w-7 h-7 flex items-center justify-center rounded-3xl cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-nord10 hover:dark:text-nord9"
            >
                <span className="material-icons-outlined !text-base">cancel</span>
            </span>
        </div>
    );
};
