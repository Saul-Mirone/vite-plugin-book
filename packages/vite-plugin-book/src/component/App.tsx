/* Copyright 2021, vite-plugin-book by Mirone. */

import { useEffect } from 'react';

import { useConfig } from '../hook/useConfig';
import { useMode } from '../hook/useMode';
import { useRpc } from '../hook/useRpc';
import { useToast } from '../hook/useToast';
import { Editor } from './Editor';
import { Header } from './Header';
import { Layout } from './Layout';
import { NavBar } from './NavBar';
import { Outline } from './Outline';

export const App = () => {
    const ctx = useRpc();
    const { config, getConfig } = useConfig();
    const mode = useMode();
    const setToast = useToast();

    useEffect(() => {
        if (ctx.status === 'connected') {
            const onConnected = async () => {
                await getConfig();
                setToast('Local Env Connected');
            };
            onConnected();
        }
    }, [ctx, getConfig, mode, setToast]);

    return (
        <Layout>
            {config && <NavBar projectInfo={config.projectInfo} />}
            <div className="overflow-auto h-full flex flex-col">
                <Header />
                <div className="px-30px flex justify-center mb-30px">
                    <Editor readonly={mode !== 'editable'} />
                    <div className="w-255px ml-10px flex-shrink-0">
                        <Outline />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
