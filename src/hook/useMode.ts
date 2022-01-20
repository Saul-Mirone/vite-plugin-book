/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext } from 'react';

import { ModeCtx } from '../provider/ModeProvider';

export const useMode = () => {
    const mode = useContext(ModeCtx);
    return mode;
};
