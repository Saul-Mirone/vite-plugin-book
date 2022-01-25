/* Copyright 2021, vite-plugin-book by Mirone. */
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useReducer, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ItemInfo } from '../../interface';
import { RouteBaseCtx } from '../../provider/RouteBaseProvider';
import { isIndexPage, nope } from '../../utils/helper';
import { Button } from '../Button';
import { List } from './List';
import { listReducer, ListReducerAction, StateItem } from './listReducer';

type NavProps = {
    title: string;
    items: ItemInfo[];
    onClick: (url: string) => void;
};

export const DraggingCtx = createContext(false);
export const SetItCtx = createContext<Dispatch<ListReducerAction>>(nope);

export const Nav: FC<NavProps> = ({ title, items, onClick }) => {
    const indexPage = items.find(isIndexPage);
    const base = useContext(RouteBaseCtx);
    const [dragging, setDragging] = useState(false);
    const [state, dispatch] = useReducer(listReducer, []);
    useEffect(() => {
        const handleList = (list: ItemInfo[], indexList: number[]) =>
            list.map((item, index): StateItem => {
                const idxList = [...indexList, index];
                if (item.type === 'dir') {
                    return {
                        ...item,
                        id: item.url,
                        list: handleList(item.list, idxList),
                    };
                }
                return {
                    ...item,
                    id: item.url,
                };
            });
        dispatch({ type: 'ReplaceAll', list: handleList(items, []).filter((item) => !isIndexPage(item)) });
    }, [items]);
    return (
        <SetItCtx.Provider value={dispatch}>
            <DraggingCtx.Provider value={dragging}>
                <nav className="h-full w-full flex flex-col bg-surface py-12px">
                    <div className="cursor-pointer mx-12px text-base flex justify-between items-center h-42px my-8px">
                        <NavLink
                            onClick={() => indexPage && onClick(indexPage.url)}
                            to={base}
                            className="pl-12px no-underline text-neutral"
                        >
                            {title}
                        </NavLink>
                        <Button icon="add" text="New" onClick={nope} />
                    </div>
                    <div
                        className="pr-12px"
                        onDrag={() => {
                            setDragging(true);
                        }}
                        onDragEnd={() => {
                            setDragging(false);
                        }}
                    >
                        <List indexList={[]} id="root" items={state} onClick={onClick} />
                    </div>
                </nav>
            </DraggingCtx.Provider>
        </SetItCtx.Provider>
    );
};
