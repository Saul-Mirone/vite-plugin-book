/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useActive } from '../../hook/useActive';
import { transformName } from '../../utils/helper';
import { Divider } from './Divider';

type SubListHeaderProps = {
    name: string;
    url: string;
    onClick: (url: string) => void;
    hasIndex: boolean;
};

export const SubListHeader: FC<SubListHeaderProps> = ({ hasIndex, url, name, children, onClick }) => {
    const { to } = useActive(url);
    const { pathname } = useLocation();
    const [spread, setSpread] = useState(pathname.includes(url));

    useEffect(() => {
        setSpread(pathname.includes(url));
    }, [pathname, url]);

    return (
        <li>
            <div
                className={`transition cursor-pointer rounded-8px hover:bg-primary hover:bg-opacity-38 transition py-18px pl-24px pr-8px text-neutral flex justify-between items-center ${
                    hasIndex ? 'hover:text-primary' : ''
                }`}
                onClick={() => {
                    setSpread(!spread);
                }}
            >
                <div className="flex h-24px">
                    {hasIndex ? (
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                `leading-24px cursor-pointer no-underline text-sm hover:text-primary hover:text-opacity-100 ${
                                    isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'
                                }`
                            }
                            onClick={() => onClick(url)}
                        >
                            {transformName(name)}
                        </NavLink>
                    ) : (
                        <span className="leading-24px text-sm text-neutral text-opacity-60">{transformName(name)}</span>
                    )}
                </div>
                <div className="flex items-center gap-4px">
                    {spread && (
                        <>
                            <span className="cursor-pointer text-lg text-opacity-60 text-neutral hover:text-primary hover:text-opacity-100 material-icons-outlined">
                                add
                            </span>
                            <span className="cursor-pointer text-lg text-opacity-60 text-neutral hover:text-primary hover:text-opacity-100 material-icons-outlined">
                                delete
                            </span>
                        </>
                    )}
                    <span className="material-icons-outlined text-neutral text-opacity-60 text-lg">
                        {!spread ? 'arrow_drop_down' : 'arrow_drop_up'}
                    </span>
                </div>
            </div>
            {spread && children}
        </li>
    );
};
