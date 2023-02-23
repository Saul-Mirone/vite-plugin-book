/* Copyright 2021, vite-plugin-book by Mirone. */
import './global.css';
import 'material-icons/iconfont/outlined.css';
import 'prism-themes/themes/prism-nord.css';
// eslint-disable-next-line import/no-unresolved
import '@milkdown/theme-nord/style.css';

import { FC, lazy, memo, StrictMode, Suspense, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from '../provider/ConfigProvider';
import { DialogProvider } from '../provider/DialogProvider';
import { FileProvider } from '../provider/FileProvider';
import { ModeProvider } from '../provider/ModeProvider';
import { OutlineProvider } from '../provider/OutlineProvider';
import { RouteBaseProvider } from '../provider/RouteBaseProvider';
import { ToastProvider } from '../provider/ToastProvider';
import { UIProvider } from '../provider/UIProvider';
import { App } from './App';

const DevRpc = lazy(() => import('../provider/RpcProvider').then((module) => ({ default: module.DevRpcProvider })));
const RuntimeRpc = lazy(() =>
    import('../provider/RuntimeRpcProvider').then((module) => ({ default: module.RuntimeRpcProvider })),
);

const Rpc: FC<{ isRuntime: boolean }> = memo(({ children, isRuntime }) => {
    const RpcProvider = useMemo(() => (isRuntime ? RuntimeRpc : DevRpc), [isRuntime]);
    return (
        <Suspense fallback={<div>{children}</div>}>
            <RpcProvider>{children}</RpcProvider>
        </Suspense>
    );
});

export const Root: FC<{ isRuntime?: boolean; prefix?: string }> = memo(({ isRuntime = false, prefix }) => {
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
                        <Rpc isRuntime={isRuntime}>
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
                        </Rpc>
                    </RouteBaseProvider>
                </ModeProvider>
            </BrowserRouter>
        </StrictMode>
    );
});
