/* Copyright 2021, vite-plugin-book by Mirone. */

import { Allotment } from 'allotment';
import clsx from 'clsx';
import { useEffect } from 'react';

import { useConfig } from '../hook/useConfig';
import { useFile } from '../hook/useFile';
import { useIsRuntime, useMode } from '../hook/useMode';
import { useRpc } from '../hook/useRpc';
import { useToast } from '../hook/useToast';
import { useUIConfig } from '../hook/useUIConfig';
import { Editor } from './Editor';
import { Header } from './Header';
import { Layout } from './Layout';
import { Loading } from './Loading';
import { NavBar } from './NavBar';
import { Outline } from './Outline';

export const App = () => {
    const ctx = useRpc();
    const { config, getConfig } = useConfig();
    const { isMobile, menuFold } = useUIConfig();
    const { loading } = useFile();
    const mode = useMode();
    const setToast = useToast();
    const isRuntime = useIsRuntime();

    useEffect(() => {
        if (ctx.status === 'connected') {
            const onConnected = async () => {
                await getConfig();
                if (!isRuntime) {
                    setToast('Local Env Connected');
                }
            };
            onConnected();
        }
    }, [ctx, getConfig, isRuntime, mode, setToast]);

    const className = clsx(!isMobile && 'px-7', loading && 'hidden', 'flex justify-center mb-7');

    return (
        <Layout>
            <Allotment.Pane minSize={280} maxSize={500} preferredSize={320} visible={!menuFold}>
                {config && <NavBar projectInfo={config.projectInfo} />}
            </Allotment.Pane>
            <Allotment.Pane snap>
                <div className="overflow-auto h-full flex flex-col relative">
                    {config && <Header projectInfo={config.projectInfo} />}
                    <Loading />
                    <div className={className}>
                        <Editor readonly={mode !== 'editable'} />
                        <div className={clsx(isMobile ? 'hidden' : 'w-64 ml-2 flex-shrink-0')}>
                            <Outline />
                        </div>
                    </div>
                </div>
            </Allotment.Pane>
        </Layout>
    );
};
