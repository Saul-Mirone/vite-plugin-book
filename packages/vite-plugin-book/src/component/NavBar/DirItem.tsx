/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { ItemInfo } from '../../interface';
import { isIndexPage, nope } from '../../utils/helper';
import { List } from './List';
import { SubListHeader } from './SubListHeader';

type DirItemProps = {
    index: number;
    name: string;
    onClick: (url: string) => void;
    list: ItemInfo[];
    url: string;
};

export const DirItem: FC<DirItemProps> = ({ name, onClick, list, url, index }) => {
    const item = list.find(isIndexPage);
    return (
        <Draggable draggableId={url} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <SubListHeader hasIndex={item != null} url={url} name={name} onClick={item ? onClick : nope}>
                        <List id={url} onClick={onClick} items={list.filter((item) => !isIndexPage(item))} />
                    </SubListHeader>
                </div>
            )}
        </Draggable>
    );
};
