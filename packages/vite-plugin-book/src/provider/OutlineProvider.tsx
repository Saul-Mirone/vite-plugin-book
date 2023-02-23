/* Copyright 2021, vite-plugin-book by Mirone. */
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

import { nope } from '../utils/helper';

type OutlineItem = {
    text: string;
    level: number;
};
export type OutlineList = OutlineItem[];

export const OutlineCtx = createContext<OutlineList>([]);
export const SetOutlineCtx = createContext<Dispatch<SetStateAction<OutlineList>>>(nope);

export const OutlineProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [outline, setOutline] = useState<OutlineList>([]);
    return (
        <OutlineCtx.Provider value={outline}>
            <SetOutlineCtx.Provider value={setOutline}>{children}</SetOutlineCtx.Provider>
        </OutlineCtx.Provider>
    );
};
