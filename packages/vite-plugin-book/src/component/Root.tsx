/* Copyright 2021, vite-plugin-book by Mirone. */

import { FC, StrictMode, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { FileProvider } from '../provider/FileProvider';
import { ModeProvider } from '../provider/ModeProvider';
import { OutlineProvider } from '../provider/OutlineProvider';
import { RouteBaseProvider } from '../provider/RouteBaseProvider';
import { DevRpcProvider, RuntimeRpcProvider } from '../provider/RpcProvider';
import { App } from './App';

const isPreview = location.pathname.split('/').includes('__preview__');
const base = location.pathname.includes('__vite_plugin_book__')
    ? isPreview
        ? '/__vite_plugin_book__/__preview__/'
        : '/__vite_plugin_book__/'
    : '/';

export const Root: FC<{ isRuntime?: boolean }> = ({ isRuntime = false }) => {
    const RpcProvider = useMemo(() => (isRuntime ? RuntimeRpcProvider : DevRpcProvider), [isRuntime]);
    const mode = isRuntime || isPreview || base === '/' ? 'preview' : 'editable';
    return (
        <StrictMode>
            <BrowserRouter>
                <ModeProvider mode={mode}>
                    <RouteBaseProvider base={base}>
                        <RpcProvider>
                            <FileProvider>
                                <OutlineProvider>
                                    <App />
                                </OutlineProvider>
                            </FileProvider>
                        </RpcProvider>
                    </RouteBaseProvider>
                </ModeProvider>
            </BrowserRouter>
        </StrictMode>
    );
};
