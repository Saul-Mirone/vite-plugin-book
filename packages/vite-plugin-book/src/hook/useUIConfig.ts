/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext, useMemo } from 'react';

import { MenuFoldCtx, SetMenuFoldCtx } from '../provider/UIProvider';

export const useUIConfig = () => {
    const menuFold = useContext(MenuFoldCtx);
    const setMenuFold = useContext(SetMenuFoldCtx);

    return useMemo(
        () =>
            ({
                menuFold,
                setMenuFold,
            } as const),
        [menuFold, setMenuFold],
    );
};
