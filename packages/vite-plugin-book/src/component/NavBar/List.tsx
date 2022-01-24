/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { ItemInfo } from '../../interface';
import { DirItem } from './DirItem';
import { ListItem } from './ListItem';

type ListProps = {
    items: ItemInfo[];
    onClick: (url: string) => void;
};

export const List: FC<ListProps> = ({ items, onClick }) => (
    <ul className="list-none m-0 px-12px">
        {items.map((item) =>
            item.type === 'file' ? (
                <ListItem key={item.url} url={item.url} name={item.name} onClick={onClick} />
            ) : (
                <DirItem key={item.name} url={item.url} name={item.name} onClick={onClick} list={item.list} />
            ),
        )}
    </ul>
);
