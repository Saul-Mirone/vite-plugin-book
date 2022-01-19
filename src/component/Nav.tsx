/* Copyright 2021, vite-plugin-book by Mirone. */
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import type { ItemInfo } from '../interface';
import { isIndexPage, nope, transformName } from '../utils/helper';

type ListItemProps = {
    name: string;
    url: string;
    onClick: (url: string) => void;
};

const ListItem: FC<ListItemProps> = ({ url, name, onClick, children }) => (
    <li key={url}>
        <NavLink
            onClick={() => onClick(url)}
            to={url}
            className={({ isActive }) =>
                `transition no-underline cursor-pointer p-x-6 p-y-3 text-sm hover:text-primary hover:text-opacity-100 ${
                    isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'
                }`
            }
        >
            {transformName(name)}
        </NavLink>
        {children}
    </li>
);

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
    <ul className="list-none m-0 p-0 p-l-2">
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
    return (
        <nav className="h-full w-full flex flex-col bg-background">
            <div className="cursor-pointer p-x-6 p-y-3 text-xl m-t-5">
                <NavLink
                    onClick={() => indexPage && onClick(indexPage.url)}
                    to="/"
                    className="no-underline text-neutral"
                >
                    {title}
                </NavLink>
            </div>
            <hr />
            <List items={items.filter((item) => !isIndexPage(item))} activeUrl={activeUrl} onClick={onClick} />
        </nav>
    );
};
