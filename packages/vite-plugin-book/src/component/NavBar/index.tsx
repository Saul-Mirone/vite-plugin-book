/* Copyright 2021, vite-plugin-book by Mirone. */

import { createContext, Dispatch, FC, useEffect, useReducer, useState } from 'react';

import { useFile } from '../../hook/useFile';
import { useFileFetcher } from '../../hook/useFileFetcher';
import { ItemInfo, ProjectInfo } from '../../interface';
import { nope } from '../../utils/helper';
import { listReducer, ListReducerAction } from './listReducer';
import { Nav } from './Nav';

export const DraggingCtx = createContext(false);
export const DispatchCtx = createContext<Dispatch<ListReducerAction>>(nope);

export const NavBar: FC<{ projectInfo: ProjectInfo }> = ({ projectInfo }) => {
    const [dragging, setDragging] = useState(false);
    const { setUrl } = useFile();
    const [state, dispatch] = useReducer(listReducer, { count: 0, curr: [] as ItemInfo[] });
    useEffect(() => {
        dispatch({ type: 'ReplaceAll', list: projectInfo.list });
    }, [projectInfo]);
    useFileFetcher(state);

    return (
        <DispatchCtx.Provider value={dispatch}>
            <DraggingCtx.Provider value={dragging}>
                <Nav setDragging={setDragging} title={projectInfo.name} state={state.curr} onClick={setUrl} />
            </DraggingCtx.Provider>
        </DispatchCtx.Provider>
    );
};
