/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { useMode } from '../hook/useMode';
import type { ItemInfo } from '../interface';
import { RouteBaseCtx } from '../provider/RouteBaseProvider';
import { isIndexPage, nope, transformName } from '../utils/helper';
import { Button } from './Button';

type ListItemProps = {
    name: string;
    url: string;
    onClick: (url: string) => void;
};

const ListItem: FC<ListItemProps> = ({ url, name, onClick, children }) => {
    const base = useContext(RouteBaseCtx);
    return (
        <li key={url} className="px-24px py-18px">
            <NavLink
                onClick={() => onClick(url)}
                to={`${base}${url}`}
                className={({ isActive }) =>
                    `transition no-underline cursor-pointer text-sm hover:text-primary hover:text-opacity-100 ${
                        isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'
                    }`
                }
            >
                {transformName(name)}
            </NavLink>
            {children}
        </li>
    );
};

type DirItemProps = {
    name: string;
    activeUrl: string;
    onClick: (url: string) => void;
    list: ItemInfo[];
};

const DirItem: FC<DirItemProps> = ({ name, activeUrl, onClick, list }) => {
    const item = list.find(isIndexPage);
    return (
        <ListItem url={item?.url || ''} name={name} onClick={item ? onClick : nope}>
            <List onClick={onClick} activeUrl={activeUrl} items={list.filter((item) => !isIndexPage(item))} />
        </ListItem>
    );
};

type ListProps = {
    items: ItemInfo[];
    onClick: (url: string) => void;
    activeUrl: string;
};

const List: FC<ListProps> = ({ items, activeUrl, onClick }) => (
    <ul className="list-none m-0">
        {items.map((item) =>
            item.type === 'file' ? (
                <ListItem key={item.url} url={item.url} name={item.name} onClick={onClick} />
            ) : (
                <DirItem key={item.name} name={item.name} activeUrl={activeUrl} onClick={onClick} list={item.list} />
            ),
        )}
    </ul>
);

export type NavProps = {
    title: string;
    items: ItemInfo[];
    activeUrl: string;
    onClick: (url: string) => void;
};

export const Nav: FC<NavProps> = ({ title, items, activeUrl, onClick }) => {
    const indexPage = items.find(isIndexPage);
    const base = useContext(RouteBaseCtx);
    const mode = useMode();
    const onClickAdd = () => {
        // TODO: add file
    };
    return (
        <nav className="h-full w-full flex flex-col bg-surface p-12px ">
            <div className="cursor-pointer py-3 text-base flex justify-between items-center h-42px">
                <NavLink
                    onClick={() => indexPage && onClick(indexPage.url)}
                    to={base}
                    className="pl-12px no-underline text-neutral"
                >
                    {title}
                </NavLink>
                {mode === 'editable' && <Button text="New" icon="add" onClick={onClickAdd} />}
            </div>
            <List items={items.filter((item) => !isIndexPage(item))} activeUrl={activeUrl} onClick={onClick} />
        </nav>
    );
};
