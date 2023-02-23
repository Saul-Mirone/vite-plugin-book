/* Copyright 2021, vite-plugin-book by Mirone. */

import { createContext, Dispatch, FC, memo, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';

import { nope } from '../utils/helper';

export const MenuFoldCtx = createContext<boolean>(false);
export const SetMenuFoldCtx = createContext<Dispatch<SetStateAction<boolean>>>(nope);

export const IsDarkModeCtx = createContext<boolean>(false);
export const SetIsDarkModeCtx = createContext<Dispatch<SetStateAction<boolean>>>(nope);
export const IsMobileCtx = createContext<boolean>(false);

const isDark = Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

const screenWidth = document.body.getBoundingClientRect().width;

export const UIProvider: FC<{ children: ReactNode }> = memo(({ children }) => {
    const isMobile = useRef(screenWidth < 905);
    const [menuFold, setMenuFold] = useState(isMobile.current);
    const [isDarkMode, setIsDarkMode] = useState(isDark);

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const listener = (event: MediaQueryListEvent) => {
            const newColorScheme = !!event.matches;

            setIsDarkMode(newColorScheme);
        };

        media.addEventListener('change', listener);
        return () => {
            media.removeEventListener('change', listener);
        };
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <IsMobileCtx.Provider value={isMobile.current}>
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
