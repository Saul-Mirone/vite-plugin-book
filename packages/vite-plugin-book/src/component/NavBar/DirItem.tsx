/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

import { ItemInfo } from '../../interface';
import { isIndexPage, nope } from '../../utils/helper';
import { List } from './List';
import { SubListHeader } from './SubListHeader';

type DirItemProps = {
    name: string;
    onClick: (url: string) => void;
    list: ItemInfo[];
    url: string;
};

export const DirItem: FC<DirItemProps> = ({ name, onClick, list, url }) => {
    const item = list.find(isIndexPage);
    return (
        <SubListHeader hasIndex={item != null} url={url} name={name} onClick={item ? onClick : nope}>
            <List onClick={onClick} items={list.filter((item) => !isIndexPage(item))} />
        </SubListHeader>
    );
};