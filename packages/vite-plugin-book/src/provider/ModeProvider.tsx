/* Copyright 2021, vite-plugin-book by Mirone. */

import { createContext, FC, memo, ReactNode } from 'react';

export const ModeCtx = createContext<'editable' | 'preview'>('preview');
export const IsRuntimeCtx = createContext(false);

export const ModeProvider: FC<{ mode: 'editable' | 'preview'; isRuntime: boolean; children: ReactNode }> = memo(
    ({ mode, children, isRuntime }) => {
        return (
            <IsRuntimeCtx.Provider value={isRuntime}>
                <ModeCtx.Provider value={mode}>{children}</ModeCtx.Provider>
            </IsRuntimeCtx.Provider>
        );
    },
);
