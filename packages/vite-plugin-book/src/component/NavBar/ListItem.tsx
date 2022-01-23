/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useActive } from '../../hook/useActive';
import { transformName } from '../../utils/helper';

type ListItemProps = {
    name: string;
    url: string;
    onClick: (url: string) => void;
};

export const ListItem: FC<ListItemProps> = ({ url, name, onClick, children }) => {
    const { to, isActive } = useActive(url);
    return (
        <li
            key={url}
            className={`transition cursor-pointer rounded-8px hover:bg-primary hover:bg-opacity-38 ${
                isActive ? 'bg-secondary bg-opacity-12' : ''
            }`}
        >
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `transition px-24px py-18px block no-underline text-sm hover:text-primary hover:text-opacity-100 ${
                        isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'
                    }`
                }
                onClick={() => onClick(url)}
            >
                {transformName(name)}
            </NavLink>
            {children}
        </li>
    );
};