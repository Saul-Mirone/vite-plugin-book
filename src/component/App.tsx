/* Copyright 2021, vite-plugin-book by Mirone. */

import { useEffect, useState } from 'react';

import { useMode } from '../hook/useMode';
import { useRpc } from '../hook/useRpc';
import { ItemInfo } from '../interface';
import { Editor } from './Editor';
import { Layout } from './Layout';
import { NavBar } from './NavBar';
import { Reader } from './Reader';

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
            {mode === 'editable' ? <Editor /> : <Reader />}
        </Layout>
    );
};
