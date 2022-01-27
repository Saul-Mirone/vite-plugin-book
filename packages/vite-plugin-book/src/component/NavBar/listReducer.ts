/* Copyright 2021, vite-plugin-book by Mirone. */
// eslint-disable-next-line import/no-named-as-default
import produce from 'immer';

import { DirInfo, FileInfo } from '../../interface';

export type StateFile = FileInfo & {
    id: string;
};

export type StateDir = Omit<DirInfo, 'list'> & {
    list: StateItem[];
    id: string;
    hasIndex: boolean;
};

export type StateItem = StateFile | StateDir;

export type ListReducerState = StateItem[];

export type ListReducerAction =
    | {
          type: 'ReplaceAll';
          list: ListReducerState;
      }
    | {
          type: 'ModifyList';
          indexList: number[];
          newSlice: ListReducerState;
      };

const diffList = (origin: ListReducerState, indexList: number[], newSlice: ListReducerState) => {
    // TODO: validate first

    const value = produce(origin, (draft) => {
        if (indexList.length === 0) {
            return newSlice;
        }
        const _indexList = [...indexList];
        const last = _indexList.pop();
        const target = _indexList.reduce((acc, cur) => (acc[cur] as StateDir).list, draft) as StateDir[];
        if (last != null) {
            target[last].list = [...newSlice];
        }
    });
    return value;
};

export const listReducer = (state: ListReducerState, action: ListReducerAction) => {
    switch (action.type) {
        case 'ReplaceAll':
            return action.list;
        case 'ModifyList':
            return diffList(state, action.indexList, action.newSlice);
    }
};
