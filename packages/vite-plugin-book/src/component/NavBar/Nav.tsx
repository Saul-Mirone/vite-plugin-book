/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { useMode } from '../../hook/useMode';
import { ItemInfo } from '../../interface';
import { RouteBaseCtx } from '../../provider/RouteBaseProvider';
import { isIndexPage } from '../../utils/helper';
import { Button } from '../Button';
import { List } from './List';

type NavProps = {
    title: string;
    items: ItemInfo[];
    onClick: (url: string) => void;
};

export const Nav: FC<NavProps> = ({ title, items, onClick }) => {
    const indexPage = items.find(isIndexPage);
    const base = useContext(RouteBaseCtx);
    // const mode = useMode();
    // const onClickAdd = () => {
    //     // TODO: add file
    // };
    return (
        <nav className="h-full w-full flex flex-col bg-surface py-12px">
            <div className="cursor-pointer mx-12px text-base flex justify-between items-center h-42px my-8px">
                <NavLink
                    onClick={() => indexPage && onClick(indexPage.url)}
                    to={base}
                    className="pl-12px no-underline text-neutral"
                >
                    {title}
                </NavLink>
                {/* {mode === 'editable' && <Button text="New" icon="add" onClick={onClickAdd} />} */}
            </div>
            <List items={items.filter((item) => !isIndexPage(item))} onClick={onClick} />
        </nav>
    );
};
