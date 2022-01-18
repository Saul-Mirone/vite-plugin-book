/* Copyright 2021, vite-plugin-book by Mirone. */

import { FC } from 'react';

import { FileInfo, ItemInfo } from '../../interface';
import { useFile } from '../hook/useFile';
import { useRpc } from '../hook/useRpc';

export const Nav: FC<{ items: ItemInfo[] }> = ({ items }) => {
    const ctx = useRpc();
    const [_, setFile] = useFile();
    const files = items.filter((item): item is FileInfo => {
        return item.type === 'file';
    });

    const onClickItem = async (url: string) => {
        if (ctx.status !== 'connected') {
            return;
        }

        const file = await ctx.rpc.$.getFile(url);

        setFile(file);
    };

    return (
        <nav className="h-full w-full flex flex-col bg-background">
            <ul className="list-none m-0 p-0">
                {files.map(({ name, url }) => (
                    <li
                        className="cursor-pointer p-x-6 p-y-3 border-rounded text-sm text-neutral text-opacity-60 hover:text-opacity-90"
                        key={url}
                        onClick={() => onClickItem(url)}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
