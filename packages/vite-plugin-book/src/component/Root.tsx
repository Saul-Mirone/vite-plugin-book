/* Copyright 2021, vite-plugin-book by Mirone. */
import '@fontsource/roboto';
import 'material-icons/iconfont/outlined.css';
import 'prism-themes/themes/prism-material-light.css';

import { FC, memo, StrictMode, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from '../provider/ConfigProvider';
import { DialogProvider } from '../provider/DialogProvider';
import { FileProvider } from '../provider/FileProvider';
import { ModeProvider } from '../provider/ModeProvider';
import { OutlineProvider } from '../provider/OutlineProvider';
import { RouteBaseProvider } from '../provider/RouteBaseProvider';
import { DevRpcProvider, RuntimeRpcProvider } from '../provider/RpcProvider';
import { UIProvider } from '../provider/UIProvider';
import { App } from './App';

const isPreview = location.pathname.split('/').includes('__preview__');
const base = location.pathname.includes('__vite_plugin_book__')
    ? isPreview
        ? '/__vite_plugin_book__/__preview__/'
        : '/__vite_plugin_book__/'
    : '/';

export const Root: FC<{ isRuntime?: boolean }> = memo(({ isRuntime = false }) => {
    const RpcProvider = useMemo(() => (isRuntime ? RuntimeRpcProvider : DevRpcProvider), [isRuntime]);
    const mode = isRuntime || isPreview || base === '/' ? 'preview' : 'editable';
    return (
        <StrictMode>
            <BrowserRouter>
                <ModeProvider mode={mode} isRuntime={isRuntime}>
                    <RouteBaseProvider base={base}>
                        <RpcProvider>
                            <FileProvider>
                                <ConfigProvider>
                                    <OutlineProvider>
                                        <DialogProvider>
                                            <UIProvider>
                                                <App />
                                            </UIProvider>
                                        </DialogProvider>
                                    </OutlineProvider>
                                </ConfigProvider>
                            </FileProvider>
                        </RpcProvider>
                    </RouteBaseProvider>
                </ModeProvider>
            </BrowserRouter>
        </StrictMode>
    );
});
