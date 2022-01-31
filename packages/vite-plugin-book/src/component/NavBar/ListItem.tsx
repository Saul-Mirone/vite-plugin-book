/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, memo, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useActive } from '../../hook/useActive';
import { useConfig } from '../../hook/useConfig';
import { useDialog } from '../../hook/useDialog';
import { useFile } from '../../hook/useFile';
import { useMode } from '../../hook/useMode';
import { useRpc } from '../../hook/useRpc';
import { RouteBaseCtx } from '../../provider/RouteBaseProvider';
import { transformName } from '../../utils/helper';
import { DraggingCtx } from '.';
import { IconButton } from './IconButton';
import cx from './ListItem.module.css';

type ListItemProps = {
    name: string;
    url: string;
};

export const ListItem: FC<ListItemProps> = memo(({ url, name }) => {
    const ctx = useRpc();
    const dragging = useContext(DraggingCtx);
    const base = useContext(RouteBaseCtx);
    const { to, isActive } = useActive(url);
    const { getConfig } = useConfig();
    const { show, hide } = useDialog();
    const navigate = useNavigate();
    const mode = useMode();
    const { setUrl } = useFile();
    return (
        <li
            className={`${cx['list-item-container']} ${dragging ? '' : cx['not-dragging']} ${
                isActive ? cx['active'] : ''
            }`}
        >
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `${cx['list-item']} ${dragging ? '' : cx['not-dragging']} ${
                        isActive ? cx['active'] : cx['inactive']
                    }`
                }
                onClick={() => setUrl(url)}
            >
                {transformName(name)}
                {isActive && mode === 'editable' && (
                    <IconButton
                        type="remove_circle_outline"
                        onClick={() => {
                            show({
                                icon: 'delete',
                                title: 'Delete the menu',
                                description: (
                                    <div className="text-neutral">
                                        <p>Are you sure you want to do this?</p>
                                        <div className="text-sm mt-2 text-neutral text-opacity-60">
                                            You file will be deleted.
                                        </div>
                                    </div>
                                ),
                                onConfirm: async () => {
                                    if (ctx.status !== 'connected') {
                                        hide();
                                        return;
                                    }
                                    const nextId = await ctx.rpc.deleteFile(url);
                                    await getConfig();
                                    navigate(base + nextId, { replace: true });
                                    setUrl(nextId);

                                    hide();
                                },
                                onCancel: () => {
                                    hide();
                                },
                            });
                        }}
                    />
                )}
            </NavLink>
        </li>
    );
});
