/* Copyright 2021, vite-plugin-book by Mirone. */

import { FC, StrictMode, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';

import { FileProvider } from '../provider/FileProvider';
import { ModeProvider } from '../provider/ModeProvider';
import { DevRpcProvider, RuntimeRpcProvider } from '../provider/RpcProvider';
import { App } from './App';

const params = new URLSearchParams(location.search);

export const Root: FC<{ isRuntime?: boolean }> = ({ isRuntime = false }) => {
    const RpcProvider = useMemo(() => (isRuntime ? RuntimeRpcProvider : DevRpcProvider), [isRuntime]);
    const mode = isRuntime ? 'preview' : params.get('preview') ? 'preview' : 'editable';
    return (
        <StrictMode>
            <HashRouter>
                <ModeProvider mode={mode}>
                    <RpcProvider>
                        <FileProvider>
                            <App />
                        </FileProvider>
                    </RpcProvider>
                </ModeProvider>
            </HashRouter>
        </StrictMode>
    );
};
