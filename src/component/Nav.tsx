/* Copyright 2021, vite-plugin-book by Mirone. */
import type { FC } from 'react';

import type { ItemInfo } from '../interface';
import { isIndexPage, nope, transformName } from '../utils/helper';

type ListItemProps = {
    name: string;
    url: string;
    isActive: boolean;
    onClick: (url: string) => void;
};

const ListItem: FC<ListItemProps> = ({ isActive, url, name, onClick, children }) => (
    <li
        className={`transition cursor-pointer p-x-6 p-y-3 text-sm hover:text-primary hover:text-opacity-100 ${
            isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'
        }`}
        key={url}
        onClick={() => onClick(url)}
    >
        {transformName(name)}
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
        <ListItem
            url={item?.url || ''}
            name={name}
            isActive={Boolean(item && item.url === activeUrl)}
            onClick={item ? onClick : nope}
        >
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
                <ListItem
                    key={item.url}
                    url={item.url}
                    name={item.name}
                    isActive={item.url === activeUrl}
                    onClick={onClick}
                />
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
            <div
                onClick={() => indexPage && onClick(indexPage.url)}
                className="cursor-pointer p-x-6 p-y-3 text-xl m-t-5"
            >
                {title}
            </div>
            <List items={items.filter((item) => !isIndexPage(item))} activeUrl={activeUrl} onClick={onClick} />
        </nav>
    );
};
