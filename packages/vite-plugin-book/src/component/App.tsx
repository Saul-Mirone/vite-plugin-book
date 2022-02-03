/* Copyright 2021, vite-plugin-book by Mirone. */

import { useEffect } from 'react';

import { useConfig } from '../hook/useConfig';
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
    const { isMobile } = useUIConfig();
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

    return (
        <Layout>
            {config && <NavBar projectInfo={config.projectInfo} />}
            <div className="overflow-auto h-full flex flex-col relative">
                {config && <Header projectInfo={config.projectInfo} />}
                <Loading />
                <div className="px-30px flex justify-center mb-30px">
                    <Editor readonly={mode !== 'editable'} />
                    <div className={`${isMobile ? 'hidden' : 'w-255px ml-10px flex-shrink-0'}`}>
                        <Outline />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
