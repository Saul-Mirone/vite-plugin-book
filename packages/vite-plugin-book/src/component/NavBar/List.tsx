/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, lazy, memo, Suspense, useContext, useMemo } from 'react';
import type { ItemInterface, ReactSortableProps } from 'react-sortablejs';

// import { ReactSortable } from 'react-sortablejs';
import { useMode } from '../../hook/useMode';
import { ItemInfo } from '../../interface';
import { DispatchCtx } from '.';
import { DirItem } from './DirItem';
import { ListItem } from './ListItem';

type ListProps = {
    id: string;
    items: ItemInfo[];
    indexList: number[];
};

const Sortable = lazy(() => import('react-sortablejs').then((module) => ({ default: module.ReactSortable })));
const ReactSortable: FC<ReactSortableProps<ItemInterface>> = ({ children, ...rest }) => {
    return (
        <Suspense fallback={<div>{children}</div>}>
            <Sortable {...rest}>{children}</Sortable>
        </Suspense>
    );
};

export const List: FC<ListProps> = memo(({ items, id, indexList }) => {
    const dispatch = useContext(DispatchCtx);
    const mode = useMode();

    const listItems = useMemo(
        () =>
            items.map((item, index) =>
                item.type === 'file' ? (
                    <ListItem key={item.id} url={item.id} name={item.name} />
                ) : (
                    <DirItem
                        hasIndex={item.hasIndex}
                        indexList={[...indexList, index]}
                        key={item.name}
                        url={item.id}
                        name={item.name}
                        list={item.list}
                    />
                ),
            ),
        [indexList, items],
    );

    if (mode === 'preview') {
        return <ul className="list-none m-0 pl-16px">{listItems}</ul>;
    }

    return (
        <ul className="list-none m-0 pl-16px">
            <ReactSortable
                key={id}
                list={items.map((x) => ({ ...x }))}
                setList={(list) => {
                    dispatch({ type: 'ModifyList', indexList, newSlice: list as ItemInfo[] });
                }}
                group="shared"
                swapThreshold={0.65}
                animation={150}
                ghostClass="ghost"
            >
                {listItems}
            </ReactSortable>
        </ul>
    );
});
