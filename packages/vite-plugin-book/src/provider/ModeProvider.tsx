/* Copyright 2021, vite-plugin-book by Mirone. */

import { createContext, FC } from 'react';

export const ModeCtx = createContext<'editable' | 'preview'>('preview');

export const ModeProvider: FC<{ mode: 'editable' | 'preview' }> = ({ mode, children }) => {
    return <ModeCtx.Provider value={mode}>{children}</ModeCtx.Provider>;
};
