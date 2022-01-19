/* Copyright 2021, vite-plugin-book by Mirone. */

import { useEffect, useState } from 'react';

import { Layout } from '../component/Layout';
import { useFile } from '../hook/useFile';
import { useRpc } from '../hook/useRpc';
import { ItemInfo } from '../interface';
import { isIndexPage } from '../utils/helper';
import { Editor } from './component/Editor';
import { NavBar } from './component/NavBar';

export const App = () => {
    const ctx = useRpc();
    const { setUrl } = useFile();
    const [items, setItems] = useState<ItemInfo[]>([]);

    useEffect(() => {
        if (ctx.status === 'connected') {
            const getFiles = async () => {
                const fs = await ctx.rpc.$.getFiles();
                setItems(fs);
                const indexPage = fs.find(isIndexPage);
                if (indexPage) {
                    setUrl(indexPage.url);
                }
            };
            getFiles();
        }
    }, [ctx, setUrl]);

    return (
        <Layout>
            <NavBar items={items} />
            <Editor />
        </Layout>
    );
};
