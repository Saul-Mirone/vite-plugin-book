/* Copyright 2021, vite-plugin-book by Mirone. */

import { createContext, Dispatch, FC, memo, SetStateAction, useEffect, useState } from 'react';

import { nope } from '../utils/helper';

export const MenuFoldCtx = createContext<boolean>(false);
export const SetMenuFoldCtx = createContext<Dispatch<SetStateAction<boolean>>>(nope);

export const IsDarkModeCtx = createContext<boolean>(false);
export const SetIsDarkModeCtx = createContext<Dispatch<SetStateAction<boolean>>>(nope);

export const UIProvider: FC = memo(({ children }) => {
    const [menuFold, setMenuFold] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
        Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
    );

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
            setIsDarkMode(event.matches);
        });
    }, []);

    return (
        <IsDarkModeCtx.Provider value={isDarkMode}>
            <SetIsDarkModeCtx.Provider value={setIsDarkMode}>
                <MenuFoldCtx.Provider value={menuFold}>
                    <SetMenuFoldCtx.Provider value={setMenuFold}>{children}</SetMenuFoldCtx.Provider>
                </MenuFoldCtx.Provider>
            </SetIsDarkModeCtx.Provider>
        </IsDarkModeCtx.Provider>
    );
});
