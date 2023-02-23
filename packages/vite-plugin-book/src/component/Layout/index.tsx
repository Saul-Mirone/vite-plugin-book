/* Copyright 2021, vite-plugin-book by Mirone. */
import './style.css';

// eslint-disable-next-line import/namespace
import { Allotment } from 'allotment';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import { useUIConfig } from '../../hook/useUIConfig';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    const { menuFold, isMobile, setMenuFold } = useUIConfig();
    const [nav = null, main = null] = children as ReactNode[];

    if (isMobile) {
        return (
            <div className="bg-background h-screen w-screen overflow-hidden font-sans">
                <div className={clsx('mobile-nav', menuFold && 'fold')}>{nav}</div>
                {!menuFold && <div className="mobile-mask" onClick={() => setMenuFold(true)} />}
                {main}
            </div>
        );
    }

    return (
        <div className="h-screen w-screen overflow-hidden font-sans">
            <Allotment className="bg-background">{children}</Allotment>
        </div>
    );
};
