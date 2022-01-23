/* Copyright 2021, vite-plugin-book by Mirone. */
import { useContext } from 'react';

import { OutlineCtx, SetOutlineCtx } from '../provider/OutlineProvider';

export const useOutline = () => {
    const outline = useContext(OutlineCtx);
    const setOutline = useContext(SetOutlineCtx);
    return [outline, setOutline] as const;
};
