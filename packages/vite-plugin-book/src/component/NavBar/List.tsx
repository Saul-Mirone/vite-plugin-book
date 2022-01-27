/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, memo, useContext } from 'react';
import { ReactSortable } from 'react-sortablejs';

import { DispatchCtx } from '.';
import { DirItem } from './DirItem';
import { ListItem } from './ListItem';
import { StateItem } from './listReducer';

type ListProps = {
    id: string;
    items: StateItem[];
    onClick: (url: string) => void;
    indexList: number[];
};

export const List: FC<ListProps> = memo(({ items, onClick, id, indexList }) => {
    const dispatch = useContext(DispatchCtx);
    return (
        <ul className="list-none m-0 pl-16px">
            <ReactSortable
                key={id}
                list={items}
                setList={(list) => {
                    dispatch({ type: 'ModifyList', indexList, newSlice: list });
                }}
                group="shared"
                swapThreshold={0.65}
                animation={150}
                ghostClass="ghost"
            >
                {items.map((item, index) => {
                    return item.type === 'file' ? (
                        <ListItem key={item.url} url={item.url} name={item.name} onClick={onClick} />
                    ) : (
                        <DirItem
                            hasIndex={item.hasIndex}
                            indexList={[...indexList, index]}
                            key={item.name}
                            url={item.url}
                            name={item.name}
                            onClick={onClick}
                            list={item.list}
                        />
                    );
                })}
            </ReactSortable>
        </ul>
    );
});
