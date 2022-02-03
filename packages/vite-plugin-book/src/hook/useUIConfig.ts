/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext, useMemo } from 'react';

import { IsDarkModeCtx, IsMobileCtx, MenuFoldCtx, SetIsDarkModeCtx, SetMenuFoldCtx } from '../provider/UIProvider';

export const useUIConfig = () => {
    const menuFold = useContext(MenuFoldCtx);
    const setMenuFold = useContext(SetMenuFoldCtx);
    const isDarkMode = useContext(IsDarkModeCtx);
    const setIsDarkMode = useContext(SetIsDarkModeCtx);
    const isMobile = useContext(IsMobileCtx);

    return useMemo(
        () =>
            ({
                menuFold,
                setMenuFold,
                isDarkMode,
                setIsDarkMode,
                isMobile,
            } as const),
        [isDarkMode, isMobile, menuFold, setIsDarkMode, setMenuFold],
    );
};
