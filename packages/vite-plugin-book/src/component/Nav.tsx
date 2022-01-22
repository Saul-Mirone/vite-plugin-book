/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, useContext } from 'react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

import { useActive } from '../hook/useActive';
import { useMode } from '../hook/useMode';
import type { ItemInfo } from '../interface';
import { RouteBaseCtx } from '../provider/RouteBaseProvider';
import { isIndexPage, nope, transformName } from '../utils/helper';
import { Button } from './Button';

type ListItemProps = {
    name: string;
    url: string;
    onClick: (url: string) => void;
    path: string;
};

const ListItem: FC<ListItemProps> = ({ url, name, onClick, children, path }) => {
    const { to, isActive } = useActive(path + url);
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
                onClick={() => onClick(path + url)}
            >
                {transformName(name)}
            </NavLink>
            {children}
        </li>
    );
};

const SubList: FC<ListItemProps & { hasIndex: boolean }> = ({ hasIndex, url, name, children, onClick, path }) => {
    const base = useContext(RouteBaseCtx);
    const to = path + name + '/' + url;
    return (
        <li key={url}>
            <div className={`transition py-18px px-16px text-neutral ${hasIndex ? 'hover:text-primary' : ''}`}>
                {hasIndex ? (
                    <NavLink
                        to={base + to}
                        className={({ isActive }) =>
                            ` cursor-pointer no-underline text-sm hover:text-primary hover:text-opacity-100 ${
                                isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'
                            }`
                        }
                        onClick={() => onClick(to)}
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

type DirItemProps = {
    name: string;
    activeUrl: string;
    onClick: (url: string) => void;
    list: ItemInfo[];
    path: string;
};

const DirItem: FC<DirItemProps> = ({ name, activeUrl, onClick, list, path }) => {
    const item = list.find(isIndexPage);
    const hasIndex = list.find((x) => x.name === 'index.md') != null;
    return (
        <SubList path={path} hasIndex={hasIndex} url={item?.url || ''} name={name} onClick={item ? onClick : nope}>
            <List
                path={path + name + '/'}
                onClick={onClick}
                activeUrl={activeUrl}
                items={list.filter((item) => !isIndexPage(item))}
            />
        </SubList>
    );
};

type ListProps = {
    items: ItemInfo[];
    onClick: (url: string) => void;
    activeUrl: string;
    path: string;
};

const List: FC<ListProps> = ({ items, activeUrl, onClick, path }) => (
    <ul className="list-none m-0 px-12px">
        {items.map((item) =>
            item.type === 'file' ? (
                <ListItem key={item.url} path={path} url={item.url} name={item.name} onClick={onClick} />
            ) : (
                <DirItem
                    key={item.name}
                    path={path}
                    name={item.name}
                    activeUrl={activeUrl}
                    onClick={onClick}
                    list={item.list}
                />
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
        <nav className="h-full w-full flex flex-col bg-surface py-12px ">
            <div className="cursor-pointer mx-12px text-base flex justify-between items-center h-42px my-8px">
                <NavLink
                    onClick={() => indexPage && onClick(indexPage.url)}
                    to={base}
                    className="pl-12px no-underline text-neutral"
                >
                    {title}
                </NavLink>
                {mode === 'editable' && <Button text="New" icon="add" onClick={onClickAdd} />}
            </div>
            <List path="" items={items.filter((item) => !isIndexPage(item))} activeUrl={activeUrl} onClick={onClick} />
        </nav>
    );
};
