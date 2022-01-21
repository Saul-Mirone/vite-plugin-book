/* Copyright 2021, vite-plugin-book by Mirone. */

import { FC, useEffect } from 'react';

import { useFile } from '../hook/useFile';
import { useRpc } from '../hook/useRpc';
import { ItemInfo } from '../interface';
import { Nav } from './Nav';

export const NavBar: FC<{ items: ItemInfo[] }> = ({ items }) => {
    const ctx = useRpc();
    const { setFile, url, setUrl } = useFile();

    useEffect(() => {
        if (ctx.status !== 'connected') {
            return;
        }

        const setFileByUrl = async () => {
            // TODO: handle url in dir
            const file = await ctx.rpc.getFile(url === '/' ? 'index' : url);

            setFile(file);
        };

        setFileByUrl();
    }, [url, setFile, ctx]);

    return <Nav title={'Vite Plugin Book'} items={items} activeUrl={url} onClick={setUrl} />;
};
