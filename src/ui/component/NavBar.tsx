/* Copyright 2021, vite-plugin-book by Mirone. */

import { FC, useEffect, useState } from 'react';

import { Nav } from '../../component/Nav';
import { useFile } from '../../hook/useFile';
import { useRpc } from '../../hook/useRpc';
import { ItemInfo } from '../../interface';
import { isIndexPage } from '../../utils/helper';

export const NavBar: FC = () => {
    const ctx = useRpc();
    const { setFile, url, setUrl } = useFile();
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

    useEffect(() => {
        if (ctx.status !== 'connected' || !url) {
            return;
        }

        const setFileByUrl = async () => {
            const file = await ctx.rpc.$.getFile(url);

            setFile(file);
        };

        setFileByUrl();
    }, [url, setFile, ctx]);

    const onClickItem = (url: string) => {
        setUrl(url);
    };

    return <Nav title={'Vite Plugin Book'} items={items} activeUrl={url} onClick={(u) => onClickItem(u)} />;
};
