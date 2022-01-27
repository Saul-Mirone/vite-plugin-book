/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, memo } from 'react';

import { ItemInfo } from '../../interface';
import { isIndexPage, nope } from '../../utils/helper';
import { List } from './List';
import { SubListHeader } from './SubListHeader';

type DirItemProps = {
    hasIndex: boolean;
    name: string;
    onClick: (url: string) => void;
    list: ItemInfo[];
    url: string;
    indexList: number[];
};

export const DirItem: FC<DirItemProps> = memo(({ name, onClick, list, url, indexList, hasIndex }) => (
    <SubListHeader hasIndex={hasIndex} url={url} name={name} onClick={hasIndex ? onClick : nope}>
        <List indexList={[...indexList]} id={url} onClick={onClick} items={list.filter((item) => !isIndexPage(item))} />
    </SubListHeader>
));
