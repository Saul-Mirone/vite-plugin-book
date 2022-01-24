/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

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
    const { to, isActive } = useActive(url);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [spread, setSpread] = useState(pathname.includes(url));

    useEffect(() => {
        if (isActive) return;
        setSpread(pathname.includes(url));
    }, [isActive, pathname, url]);

    return (
        <li>
            <div
                className={`transition cursor-pointer rounded-8px hover:bg-primary hover:bg-opacity-38 transition py-18px pl-24px pr-8px text-neutral flex justify-between items-center ${
                    hasIndex ? 'hover:text-primary' : ''
                }`}
                onClick={() => {
                    onClick(url);
                    setSpread(!spread);
                    if (hasIndex) {
                        navigate(to);
                    }
                }}
            >
                <div className="flex h-24px">
                    <span
                        className={`leading-24px cursor-pointer no-underline text-sm hover:text-primary hover:text-opacity-100 ${
                            isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'
                        }`}
                        onClick={() => hasIndex && onClick(url)}
                    >
                        {transformName(name)}
                    </span>
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
            {spread && <>{children}</>}
        </li>
    );
};
