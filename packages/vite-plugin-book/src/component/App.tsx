/* Copyright 2021, vite-plugin-book by Mirone. */

import { useEffect, useState } from 'react';

import { useMode } from '../hook/useMode';
import { useRpc } from '../hook/useRpc';
import { ItemInfo } from '../interface';
import { Editor } from './Editor';
import { Header } from './Header';
import { Layout } from './Layout';
import { NavBar } from './NavBar';
import { Outline } from './Outline';

export const App = () => {
    const ctx = useRpc();
    const [items, setItems] = useState<ItemInfo[]>([]);
    const mode = useMode();

    useEffect(() => {
        if (ctx.status === 'connected') {
            const getFiles = async () => {
                try {
                    const fs = await ctx.rpc.getFiles();
                    setItems(fs);
                } catch (e) {
                    console.error(e);
                }
            };
            getFiles();
        }
    }, [ctx]);

    return (
        <Layout>
            <NavBar items={items} />
            <div className="overflow-auto h-full">
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
