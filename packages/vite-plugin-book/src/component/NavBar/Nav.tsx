/* Copyright 2021, vite-plugin-book by Mirone. */
import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useConfig } from '../../hook/useConfig';
import { useFile } from '../../hook/useFile';
import { useMode } from '../../hook/useMode';
import { useRpc } from '../../hook/useRpc';
import { ItemInfo } from '../../interface';
import { RouteBaseCtx } from '../../provider/RouteBaseProvider';
import { IconButton } from './IconButton';
import { List } from './List';
import cx from './Nav.module.css';

type NavProps = {
    title: string;
    state: ItemInfo[];
    setDragging: Dispatch<SetStateAction<boolean>>;
};

export const Nav: FC<NavProps> = ({ title, state, setDragging }) => {
    const base = useContext(RouteBaseCtx);
    const { url, setUrl } = useFile();
    const ctx = useRpc();
    const { getConfig } = useConfig();
    const navigate = useNavigate();
    const mode = useMode();
    return (
        <nav className={cx['nav']}>
            <div className={cx['container']}>
                <NavLink onClick={() => setUrl('/')} to={base} className={cx['title']}>
                    {title}
                </NavLink>
                {mode === 'editable' && (
                    <div className={cx['icon-group']}>
                        <IconButton
                            type="post_add"
                            onClick={async () => {
                                if (ctx.status !== 'connected') return;
                                const nextId = await ctx.rpc.createFile(url);
                                await getConfig();
                                const to = `${base}${nextId}`;
                                navigate(to);
                                setUrl(nextId);
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
                                setUrl(nextId);
                            }}
                        />
                    </div>
                )}
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
