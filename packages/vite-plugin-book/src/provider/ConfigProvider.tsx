/* Copyright 2021, vite-plugin-book by Mirone. */

import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';

import { BookConfig } from '../interface';

export const ConfigCtx = createContext<BookConfig | undefined>({} as BookConfig);
export const SetConfigCtx = createContext<Dispatch<SetStateAction<BookConfig | undefined>>>(() => {
    throw new Error();
});

export const ConfigProvider: FC = ({ children }) => {
    const [config, setConfig] = useState<BookConfig>();

    return (
        <ConfigCtx.Provider value={config}>
            <SetConfigCtx.Provider value={setConfig}>{children}</SetConfigCtx.Provider>
        </ConfigCtx.Provider>
    );
};
