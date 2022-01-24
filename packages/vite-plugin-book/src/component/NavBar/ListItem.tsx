/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { useActive } from '../../hook/useActive';
import { transformName } from '../../utils/helper';
import { DraggingCtx } from './Nav';

type ListItemProps = {
    index: number;
    name: string;
    url: string;
    onClick: (url: string) => void;
};

export const ListItem: FC<ListItemProps> = ({ url, name, onClick, children, index }) => {
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
                    `transition px-24px py-18px block no-underline text-sm ${
                        dragging ? '' : 'hover:text-primary hover:text-opacity-100'
                    } ${isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'}`
                }
                onClick={() => onClick(url)}
            >
                {transformName(name)}
            </NavLink>
            {children}
        </li>
    );
};
