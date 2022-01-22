/* Copyright 2021, vite-plugin-book by Mirone. */

import { createContext, FC } from 'react';

export const RouteBaseCtx = createContext<string>('/');

export const RouteBaseProvider: FC<{ base: string }> = ({ base, children }) => {
    return <RouteBaseCtx.Provider value={base}>{children}</RouteBaseCtx.Provider>;
};
