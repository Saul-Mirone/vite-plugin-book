/* Copyright 2021, vite-plugin-book by Mirone. */

import { createContext, Dispatch, FC, memo, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { nope } from '../utils/helper';

export const MenuFoldCtx = createContext<boolean>(false);
export const SetMenuFoldCtx = createContext<Dispatch<SetStateAction<boolean>>>(nope);

export const IsDarkModeCtx = createContext<boolean>(false);
export const SetIsDarkModeCtx = createContext<Dispatch<SetStateAction<boolean>>>(nope);
export const IsMobileCtx = createContext<boolean>(false);

const isDark = Boolean(
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
);

const isMob = Boolean(typeof window !== 'undefined' && document.body.getBoundingClientRect().width < 905);

export const UIProvider: FC<{ children: ReactNode }> = memo(({ children }) => {
    const [isMobile, setIsMobile] = useState(isMob);
    const [menuFold, setMenuFold] = useState(isMobile);
    const [isDarkMode, setIsDarkMode] = useState(isDark);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const listener = (event: MediaQueryListEvent) => {
            const newColorScheme = !!event.matches;

            setIsDarkMode(newColorScheme);
        };
        const onResize = () => {
            const screenWidth = document.body.getBoundingClientRect().width;
            setIsMobile(screenWidth < 905);
        };

        media.addEventListener('change', listener);
        window.addEventListener('resize', onResize);
        return () => {
            media.removeEventListener('change', listener);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <IsMobileCtx.Provider value={isMobile}>
            <IsDarkModeCtx.Provider value={isDarkMode}>
                <SetIsDarkModeCtx.Provider value={setIsDarkMode}>
                    <MenuFoldCtx.Provider value={menuFold}>
                        <SetMenuFoldCtx.Provider value={setMenuFold}>{children}</SetMenuFoldCtx.Provider>
                    </MenuFoldCtx.Provider>
                </SetIsDarkModeCtx.Provider>
            </IsDarkModeCtx.Provider>
        </IsMobileCtx.Provider>
    );
});
