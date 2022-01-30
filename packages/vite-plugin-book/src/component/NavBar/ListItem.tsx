/* Copyright 2021, vite-plugin-book by Mirone. */
import './ListItem.css';

import { FC, memo, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useActive } from '../../hook/useActive';
import { useConfig } from '../../hook/useConfig';
import { useDialog } from '../../hook/useDialog';
import { useMode } from '../../hook/useMode';
import { useRpc } from '../../hook/useRpc';
import { RouteBaseCtx } from '../../provider/RouteBaseProvider';
import { transformName } from '../../utils/helper';
import { DraggingCtx } from '.';
import { IconButton } from './IconButton';

type ListItemProps = {
    name: string;
    url: string;
    onClick: (url: string) => void;
};

export const ListItem: FC<ListItemProps> = memo(({ url, name, onClick }) => {
    const ctx = useRpc();
    const dragging = useContext(DraggingCtx);
    const base = useContext(RouteBaseCtx);
    const { to, isActive } = useActive(url);
    const { getConfig } = useConfig();
    const { show, hide } = useDialog();
    const navigate = useNavigate();
    const mode = useMode();
    return (
        <li className={`list-item-container ${dragging ? '' : 'not-dragging'} ${isActive ? 'active' : ''}`}>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `list-item ${dragging ? '' : 'not-dragging'} ${isActive ? 'active' : 'inactive'}`
                }
                onClick={() => onClick(url)}
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
                                    onClick(nextId);

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
