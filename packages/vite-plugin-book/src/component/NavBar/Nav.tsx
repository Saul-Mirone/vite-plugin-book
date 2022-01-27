/* Copyright 2021, vite-plugin-book by Mirone. */
import { Dispatch, FC, SetStateAction, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { RouteBaseCtx } from '../../provider/RouteBaseProvider';
import { isIndexPage, nope } from '../../utils/helper';
import { Button } from '../Button';
import { List } from './List';
import { ListReducerState } from './listReducer';

type NavProps = {
    title: string;
    state: ListReducerState;
    onClick: (url: string) => void;
    setDragging: Dispatch<SetStateAction<boolean>>;
};

export const Nav: FC<NavProps> = ({ title, state, onClick, setDragging }) => {
    const indexPage = state.find(isIndexPage);
    const base = useContext(RouteBaseCtx);
    return (
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
    );
};
