/* Copyright 2021, vite-plugin-book by Mirone. */

import { FC, useEffect, useState } from 'react';

import { ToastData } from '../../provider/ToastProvider';
import cx from './Toast.module.css';

export const Toast: FC<ToastData> = ({ timeout = 2000, description }) => {
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        if (!description) return;
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        }, timeout);
    }, [description, timeout]);

    return (
        <div className={`${cx['container']} ${display ? '' : cx['hide']}`}>
            <span>{description}</span>
            <span onClick={() => setDisplay(false)} className={`${cx['icon']} material-icons-outlined`}>
                cancel
            </span>
        </div>
    );
};
