/* Copyright 2021, vite-plugin-book by Mirone. */
import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

import { useConfig } from '../../hook/useConfig';
import { useFile } from '../../hook/useFile';
import { useRpc } from '../../hook/useRpc';
import { ItemInfo } from '../../interface';
import { RouteBaseCtx } from '../../provider/RouteBaseProvider';
import { isIndexPage, nope } from '../../utils/helper';
import { Button } from '../Button';
import { IconButton } from './IconButton';
import { List } from './List';
import { ListReducerState } from './listReducer';

type NavProps = {
    title: string;
    state: ItemInfo[];
    onClick: (url: string) => void;
    setDragging: Dispatch<SetStateAction<boolean>>;
};

export const Nav: FC<NavProps> = ({ title, state, onClick, setDragging }) => {
    const base = useContext(RouteBaseCtx);
    const { url } = useFile();
    const ctx = useRpc();
    const { getConfig } = useConfig();
    const navigate = useNavigate();
    return (
        <nav className="h-full w-full flex flex-col bg-surface py-12px">
            <div className="cursor-pointer mx-12px text-base flex justify-between items-center h-42px my-8px">
                <NavLink onClick={() => onClick('/')} to={base} className="pl-12px no-underline text-neutral">
                    {title}
                </NavLink>
                <div className="flex gap-8px mr-8px">
                    <IconButton
                        type="post_add"
                        onClick={async () => {
                            if (ctx.status !== 'connected') return;
                            const nextId = await ctx.rpc.createFile(url);
                            await getConfig();
                            const to = `${base}${nextId}`;
                            navigate(to);
                            onClick(nextId);
                        }}
                    />
                    <IconButton
                        type="create_new_folder"
                        onClick={async () => {
                            if (ctx.status !== 'connected') return;
                            const nextId = await ctx.rpc.createFile(url, true);
                            await getConfig();
                            const to = `${base}${nextId}`;
                            navigate(to);
                            onClick(nextId);
                        }}
                    />
                </div>
            </div>
            <div
                className="pr-12px overflow-auto"
                onDrag={() => {
                    setDragging(true);
                }}
                onDragEnd={() => {
                    setDragging(false);
                }}
            >
                <List indexList={[]} id="root" items={state} onClick={onClick} />
            </div>
        </nav>
    );
};
