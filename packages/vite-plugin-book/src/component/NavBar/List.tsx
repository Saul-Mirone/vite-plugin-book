/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { ItemInfo } from '../../interface';
import { nope } from '../../utils/helper';
import { DirItem } from './DirItem';
import { ListItem } from './ListItem';

type ListProps = {
    id: string;
    items: ItemInfo[];
    onClick: (url: string) => void;
};

export const List: FC<ListProps> = ({ items, onClick, id }) => (
    <ul className="list-none m-0 pl-16px">
        <ReactSortable
            list={items.map((item) => ({ ...item, id: item.url }))}
            setList={nope}
            group="shared"
            swapThreshold={0.65}
            animation={150}
            ghostClass="ghost"
        >
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
        </ReactSortable>
    </ul>
);
