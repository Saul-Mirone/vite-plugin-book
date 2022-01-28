/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, memo, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { useActive } from '../../hook/useActive';
import { transformName } from '../../utils/helper';
import { DraggingCtx } from '.';
import { IconButton } from './IconButton';

type ListItemProps = {
    name: string;
    url: string;
    onClick: (url: string) => void;
};

export const ListItem: FC<ListItemProps> = memo(({ url, name, onClick }) => {
    const dragging = useContext(DraggingCtx);
    const { to, isActive } = useActive(url);
    return (
        <li
            className={`transition cursor-pointer rounded-8px ${
                dragging ? '' : 'hover:bg-primary hover:bg-opacity-38'
            } ${isActive ? 'bg-secondary bg-opacity-12' : ''}`}
        >
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `transition py-18px block no-underline text-sm flex justify-between items-center px-24px h-56px ${
                        dragging ? '' : 'hover:text-primary hover:text-opacity-100'
                    } ${isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'}`
                }
                onClick={() => onClick(url)}
            >
                {transformName(name)}
                {isActive && (
                    <IconButton
                        type="delete"
                        onClick={() => {
                            // TODO
                            console.error('delete item not implemented');
                        }}
                    />
                )}
            </NavLink>
        </li>
    );
});
