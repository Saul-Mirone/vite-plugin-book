/* Copyright 2021, vite-plugin-book by Mirone. */

import { useEffect } from 'react';

import { useRpc } from './useRpc';

export function App() {
    const ctx = useRpc();
    useEffect(() => {
        if (ctx.status === 'connected') {
            // const playWithRpc = async () => {
            //     const files = await ctx.rpc.$.getFiles();
            //     const [file] = files;
            //     console.log(file);
            //     const markdown = await ctx.rpc.$.getFile((file as { url: string }).url);
            //     console.log(markdown);
            //     await ctx.rpc.$.writeFile((file as { url: string }).url, '> Override by client');
            //     const markdown2 = await ctx.rpc.$.getFile((file as { url: string }).url);
            //     console.log(markdown2);
            // };
            // playWithRpc();
        }
    }, [ctx]);
    return <div className="App">App {ctx.status}</div>;
}
