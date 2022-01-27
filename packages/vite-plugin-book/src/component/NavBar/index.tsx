/* Copyright 2021, vite-plugin-book by Mirone. */

import { createContext, Dispatch, FC, useState } from 'react';

import { useFile } from '../../hook/useFile';
import { useFileFetcher } from '../../hook/useFileFetcher';
import { useSortableList } from '../../hook/useSortableList';
import { ItemInfo } from '../../interface';
import { nope } from '../../utils/helper';
import { ListReducerAction } from './listReducer';
import { Nav } from './Nav';

export const DraggingCtx = createContext(false);
export const DispatchCtx = createContext<Dispatch<ListReducerAction>>(nope);

export const NavBar: FC<{ items: ItemInfo[] }> = ({ items }) => {
    const [dragging, setDragging] = useState(false);
    const { setUrl } = useFile();
    const [state, dispatch] = useSortableList(items);
    useFileFetcher();

    return (
        <DispatchCtx.Provider value={dispatch}>
            <DraggingCtx.Provider value={dragging}>
                <Nav setDragging={setDragging} title={'Vite Book'} state={state} onClick={setUrl} />
            </DraggingCtx.Provider>
        </DispatchCtx.Provider>
    );
};
