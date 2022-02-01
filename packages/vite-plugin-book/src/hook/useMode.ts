/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext } from 'react';

import { IsRuntimeCtx, ModeCtx } from '../provider/ModeProvider';

export const useMode = () => {
    const mode = useContext(ModeCtx);
    return mode;
};

export const useIsRuntime = () => {
    const isRuntime = useContext(IsRuntimeCtx);
    return isRuntime;
};
