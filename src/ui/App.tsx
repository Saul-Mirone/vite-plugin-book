/* Copyright 2021, vite-plugin-book by Mirone. */

import { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';

import { ItemInfo } from '../interface';
import { Editor } from './Editor';
import { Nav } from './Nav';
import { useRpc } from './useRpc';

export function App() {
    const ctx = useRpc();
    const [items, setItems] = useState<ItemInfo[]>([]);
    useEffect(() => {
        if (ctx.status === 'connected') {
            const getFiles = async () => {
                const fs = await ctx.rpc.$.getFiles();
                setItems(fs);
            };
            getFiles();
        }
    }, [ctx]);
    return (
        <div className="h-screen w-screen overflow-hidden">
            <SplitPane split="vertical" defaultSize={200} minSize={120}>
                <Nav items={items} />
                <Editor />
            </SplitPane>
        </div>
    );
}
