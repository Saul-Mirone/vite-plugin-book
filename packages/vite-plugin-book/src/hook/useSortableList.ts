/* Copyright 2021, vite-plugin-book by Mirone. */
import { useEffect, useMemo, useReducer } from 'react';

import { listReducer, StateItem } from '../component/NavBar/listReducer';
import { ItemInfo } from '../interface';
import { isIndexPage } from '../utils/helper';

export const useSortableList = (items: ItemInfo[]) => {
    const [state, dispatch] = useReducer(listReducer, []);
    useEffect(() => {
        const handleList = (list: ItemInfo[], indexList: number[]) =>
            list
                .map((item, index): StateItem => {
                    const idxList = [...indexList, index];
                    if (item.type === 'dir') {
                        return {
                            ...item,
                            id: item.url,
                            hasIndex: !!item.list.find(isIndexPage),
                            list: handleList(item.list, idxList),
                        };
                    }
                    return {
                        ...item,
                        id: item.url,
                    };
                })
                .filter((x) => !isIndexPage(x));
        dispatch({ type: 'ReplaceAll', list: handleList(items, []) });
    }, [items]);

    return useMemo(() => [state, dispatch] as const, [state]);
};
