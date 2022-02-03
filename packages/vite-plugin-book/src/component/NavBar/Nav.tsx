/* Copyright 2021, vite-plugin-book by Mirone. */
import { Dispatch, FC, SetStateAction } from 'react';

import { useConfig } from '../../hook/useConfig';
import { useFile } from '../../hook/useFile';
import { useMode } from '../../hook/useMode';
import { useRpc } from '../../hook/useRpc';
import { useToast } from '../../hook/useToast';
import { ItemInfo } from '../../interface';
import { IconButton } from './IconButton';
import { List } from './List';
import cx from './Nav.module.css';

type NavProps = {
    title: string;
    state: ItemInfo[];
    setDragging: Dispatch<SetStateAction<boolean>>;
};

const ButtonGroup = () => {
    const { url, setUrl } = useFile();
    const ctx = useRpc();
    const { getConfig } = useConfig();
    const mode = useMode();
    const setToast = useToast();

    if (mode !== 'editable') return null;
    return (
        <div className={cx['icon-group']}>
            <IconButton
                type="post_add"
                onClick={async () => {
                    if (ctx.status !== 'connected') return;
                    const nextId = await ctx.rpc.createFile(url);
                    await getConfig();
                    setUrl(nextId);
                    setToast('New File Created');
                }}
            />
            <IconButton
                type="create_new_folder"
                onClick={async () => {
                    if (ctx.status !== 'connected') return;
                    const nextId = await ctx.rpc.createFile(url, true);
                    await getConfig();
                    setUrl(nextId);
                    setToast('New Directory Created');
                }}
            />
        </div>
    );
};

export const Nav: FC<NavProps> = ({ title, state, setDragging }) => {
    const { setUrl } = useFile();
    return (
        <nav className={cx['nav']}>
            <div className={cx['container']}>
                <span onClick={() => setUrl('')} className={cx['title']}>
                    {title}
                </span>
                <ButtonGroup />
            </div>
            <div
                className={cx['list']}
                onDrag={() => {
                    setDragging(true);
                }}
                onDragEnd={() => {
                    setDragging(false);
                }}
            >
                <List indexList={[]} id="root" items={state} />
            </div>
        </nav>
    );
};
