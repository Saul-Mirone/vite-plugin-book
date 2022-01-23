/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useActive } from '../../hook/useActive';
import { transformName } from '../../utils/helper';
import { Divider } from './Divider';

/* Copyright 2021, vite-plugin-book by Mirone. */
type SubListHeaderProps = {
    name: string;
    url: string;
    onClick: (url: string) => void;
    hasIndex: boolean;
};

export const SubListHeader: FC<SubListHeaderProps> = ({ hasIndex, url, name, children, onClick }) => {
    const { to } = useActive(url);

    return (
        <li key={url}>
            <Divider />
            <div className={`transition py-18px px-16px text-neutral ${hasIndex ? 'hover:text-primary' : ''}`}>
                {hasIndex ? (
                    <NavLink
                        to={to}
                        className={({ isActive }) =>
                            ` cursor-pointer no-underline text-sm hover:text-primary hover:text-opacity-100 ${
                                isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'
                            }`
                        }
                        onClick={() => onClick(url)}
                    >
                        {transformName(name)}
                    </NavLink>
                ) : (
                    <span className="text-neutral text-opacity-60">{transformName(name)}</span>
                )}
            </div>
            {children}
        </li>
    );
};