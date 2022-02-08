/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, memo } from 'react';

import { ItemInfo } from '../../interface';
import { List } from './List';
import { SubListHeader } from './SubListHeader';

type DirItemProps = {
    hasIndex: boolean;
    name: string;
    list: ItemInfo[];
    url: string;
    indexList: number[];
};

export const DirItem: FC<DirItemProps> = memo(({ name, list, url, indexList, hasIndex }) => {
    return (
        <SubListHeader hasIndex={hasIndex} url={url} name={name}>
            <List indexList={[...indexList]} id={url} items={list} />
        </SubListHeader>
    );
});
