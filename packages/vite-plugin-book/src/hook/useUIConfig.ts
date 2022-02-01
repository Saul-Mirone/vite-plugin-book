/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext, useMemo } from 'react';

import { IsDarkModeCtx, MenuFoldCtx, SetIsDarkModeCtx, SetMenuFoldCtx } from '../provider/UIProvider';

export const useUIConfig = () => {
    const menuFold = useContext(MenuFoldCtx);
    const setMenuFold = useContext(SetMenuFoldCtx);
    const isDarkMode = useContext(IsDarkModeCtx);
    const setIsDarkMode = useContext(SetIsDarkModeCtx);

    return useMemo(
        () =>
            ({
                menuFold,
                setMenuFold,
                isDarkMode,
                setIsDarkMode,
            } as const),
        [isDarkMode, menuFold, setIsDarkMode, setMenuFold],
    );
};
