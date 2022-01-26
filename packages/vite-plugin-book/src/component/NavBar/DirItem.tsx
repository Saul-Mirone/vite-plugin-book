/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, memo, useEffect, useState } from 'react';

import { useRpc } from '../../hook/useRpc';
import { FileInfo } from '../../interface';
import { isIndexPage, nope } from '../../utils/helper';
import { List } from './List';
import { StateItem } from './listReducer';
import { SubListHeader } from './SubListHeader';

type DirItemProps = {
    hasIndex: boolean;
    name: string;
    onClick: (url: string) => void;
    list: StateItem[];
    url: string;
    indexList: number[];
};

export const DirItem: FC<DirItemProps> = memo(({ name, onClick, list, url, indexList, hasIndex }) => {
    return (
        <SubListHeader hasIndex={hasIndex} url={url} name={name} onClick={hasIndex ? onClick : nope}>
            <List
                indexList={[...indexList]}
                id={url}
                onClick={onClick}
                items={list.filter((item) => !isIndexPage(item))}
            />
        </SubListHeader>
    );
});
