/* Copyright 2021, vite-plugin-book by Mirone. */
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react';

import { useConfig } from '../../hook/useConfig';
import { useFile } from '../../hook/useFile';
import { useMode } from '../../hook/useMode';
import { useRpc } from '../../hook/useRpc';
import { useToast } from '../../hook/useToast';
import { ItemInfo } from '../../interface';
import { IconButton } from './IconButton';
import { List } from './List';

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

    const newFile = useCallback(async () => {
        if (ctx.status !== 'connected') return;
        const nextId = await ctx.rpc.createFile(url);
        await getConfig();
        setUrl(nextId);
        setToast('New File Created');
    }, [ctx, getConfig, setToast, setUrl, url]);

    const newFolder = useCallback(async () => {
        if (ctx.status !== 'connected') return;
        const nextId = await ctx.rpc.createFile(url, true);
        await getConfig();
        setUrl(nextId);
        setToast('New Directory Created');
    }, [ctx, getConfig, setToast, setUrl, url]);

    useEffect(() => {
        if (mode !== 'editable') return;

        const keyBoardListener = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'Enter') {
                    if (e.shiftKey) {
                        newFolder();
                    } else {
                        newFile();
                    }
                    e.preventDefault();
                }
            }
        };

        window.addEventListener('keydown', keyBoardListener);

        return () => {
            window.removeEventListener('keydown', keyBoardListener);
        };
    }, [mode, newFile, newFolder]);

    if (mode !== 'editable') return null;
    return (
        <div className="flex gap-2 mr-2">
            <IconButton type="post_add" onClick={newFile} />
            <IconButton type="create_new_folder" onClick={newFolder} />
        </div>
    );
};

export const Nav: FC<NavProps> = ({ title, state, setDragging }) => {
    const { setUrl } = useFile();
    return (
        <nav className="h-full w-full flex flex-col py-3">
            <div className="cursor-pointer h-11 mx-3 my-2 text-base flex justify-between items-center">
                <span onClick={() => setUrl('')} className="pl-3 no-underline">
                    {title}
                </span>
                <ButtonGroup />
            </div>
            <div
                className="px-3 overflow-auto"
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
