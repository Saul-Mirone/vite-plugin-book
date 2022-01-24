/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { ItemInfo } from '../../interface';
import { DirItem } from './DirItem';
import { ListItem } from './ListItem';

type ListProps = {
    id: string;
    items: ItemInfo[];
    onClick: (url: string) => void;
};

export const List: FC<ListProps> = ({ items, onClick, id }) => (
    <Droppable droppableId={id} type={id}>
        {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="list-none m-0 pl-12px">
                {items.map((item, index) =>
                    item.type === 'file' ? (
                        <ListItem index={index} key={item.url} url={item.url} name={item.name} onClick={onClick} />
                    ) : (
                        <DirItem
                            index={index}
                            key={item.name}
                            url={item.url}
                            name={item.name}
                            onClick={onClick}
                            list={item.list}
                        />
                    ),
                )}
                {provided.placeholder}
            </ul>
        )}
    </Droppable>
);
