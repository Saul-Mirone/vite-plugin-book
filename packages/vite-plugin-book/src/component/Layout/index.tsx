/* Copyright 2021, vite-plugin-book by Mirone. */

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
            <div className="font-sans">
                <div
                    className={clsx(
                        'fixed transition left-0 top-0 bottom-0 w-[255px] z-20 bg-slate-50 dark:bg-slate-900',
                        menuFold && '-translate-x-full',
                    )}
                >
                    {nav}
                </div>
                {!menuFold && (
                    <div
                        className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex items-center justify-center bg-slate-600/60 dark:bg-slate-800/60"
                        onClick={() => setMenuFold(true)}
                    />
                )}
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
