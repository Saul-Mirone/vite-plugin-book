/* Copyright 2021, vite-plugin-book by Mirone. */

import { useEffect } from 'react';

import { useRpc } from './useRpc';

export function App() {
    const [status, rpc] = useRpc();
    useEffect(() => {
        if (status === 'connected') {
            rpc.$.getFiles().then(console.log);
        }
    }, [rpc, status]);
    return <div className="App">App {status}</div>;
}
