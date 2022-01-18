/* Copyright 2021, vite-plugin-book by Mirone. */

import React, { FC } from 'react';

import { FileInfo, ItemInfo } from '../../interface';
import { useFile } from '../hook/useFile';
import { useRpc } from '../hook/useRpc';

function transformName(name: string) {
    const [withOutExt] = name.split('.md');
    return withOutExt
        .split('-')
        .map((str) => {
            const [first] = str.slice(0, 1);
            const rest = str.slice(1);
            return first.toUpperCase() + rest;
        })
        .join(' ');
}

export const Nav: FC<{ items: ItemInfo[] }> = ({ items }) => {
    const ctx = useRpc();
    const { setFile, url, setUrl } = useFile();
    const files = items.filter((item): item is FileInfo => {
        return item.type === 'file';
    });

    const onClickItem = async (url: string) => {
        if (ctx.status !== 'connected') {
            return;
        }
        setUrl(url);

        const file = await ctx.rpc.$.getFile(url);

        setFile(file);
    };

    return (
        <nav className="h-full w-full flex flex-col bg-background">
            <div className="cursor-pointer p-x-6 p-y-3 text-xl m-t-5">Vite Plugin Book</div>
            <ul className="list-none m-0 p-0 p-l-2">
                {files.map(({ name, url: u }) => (
                    <li
                        className={`transition cursor-pointer p-x-6 p-y-3 text-sm hover:text-primary hover:text-opacity-100 ${
                            url === u ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'
                        }`}
                        key={u}
                        onClick={() => onClickItem(u)}
                    >
                        {transformName(name)}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
