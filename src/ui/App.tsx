/* Copyright 2021, vite-plugin-book by Mirone. */

import { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';

import { useRpc } from '../hook/useRpc';
import { ItemInfo } from '../interface';
import { Editor } from './component/Editor';
import { Nav } from './component/Nav';

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
        <div className="h-screen w-screen overflow-hidden font-mono">
            <SplitPane className="bg-background" split="vertical" defaultSize="16rem" minSize={200} maxSize={400}>
                <Nav items={items} />
                <Editor />
            </SplitPane>
        </div>
    );
}
