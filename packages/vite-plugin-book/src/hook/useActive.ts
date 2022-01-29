/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext } from 'react';
import { useMatch, useResolvedPath } from 'react-router-dom';

import { RouteBaseCtx } from '../provider/RouteBaseProvider';

export const useActive = (url: string) => {
    const base = useContext(RouteBaseCtx);
    const to = `${base}${url}`;
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    return {
        to,
        isActive: Boolean(match),
    };
};
