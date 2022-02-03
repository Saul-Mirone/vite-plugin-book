/* Copyright 2021, vite-plugin-book by Mirone. */
import 'material-icons/iconfont/outlined.css';
import 'prism-themes/themes/prism-nord.css';

import { FC, memo, StrictMode, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from '../provider/ConfigProvider';
import { DialogProvider } from '../provider/DialogProvider';
import { FileProvider } from '../provider/FileProvider';
import { ModeProvider } from '../provider/ModeProvider';
import { OutlineProvider } from '../provider/OutlineProvider';
import { RouteBaseProvider } from '../provider/RouteBaseProvider';
import { DevRpcProvider, RuntimeRpcProvider } from '../provider/RpcProvider';
import { ToastProvider } from '../provider/ToastProvider';
import { UIProvider } from '../provider/UIProvider';
import { App } from './App';

export const Root: FC<{ isRuntime?: boolean; prefix?: string }> = memo(({ isRuntime = false, prefix }) => {
    const RpcProvider = useMemo(() => (isRuntime ? RuntimeRpcProvider : DevRpcProvider), [isRuntime]);
    const isPreview = location.pathname.split('/').includes('__preview__');
    const [p = '/'] = import.meta.env.BASE_URL.split('__vite_plugin_book__');
    const pre = prefix != null ? prefix : p;
    const base = location.pathname.includes('__vite_plugin_book__')
        ? isPreview
            ? pre + '__vite_plugin_book__/__preview__/'
            : pre + '__vite_plugin_book__/'
        : pre;
    const mode = isRuntime || isPreview || base === pre ? 'preview' : 'editable';
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
                                            <ToastProvider>
                                                <UIProvider>
                                                    <App />
                                                </UIProvider>
                                            </ToastProvider>
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
