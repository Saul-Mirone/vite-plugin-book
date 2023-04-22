/* Copyright 2021, vite-plugin-book by Mirone. */
import { produce } from 'immer';

import { DirInfo, ItemInfo } from '../../interface';
import { flatItems, walkThroughTree, withOutExt } from '../../utils/helper';

export type ListReducerState = {
    curr: ItemInfo[];
    count: number;
};

export type ListReducerAction =
    | {
          type: 'ReplaceAll';
          list: ItemInfo[];
      }
    | {
          type: 'ModifyList';
          indexList: number[];
          newSlice: ItemInfo[];
      };

const flushUrl = (state: ItemInfo[]) => {
    const value = produce(state, (draft) => {
        walkThroughTree(draft, (item, parent) => {
            const prefix = parent?.url ?? '';

            item.url = [prefix, withOutExt(item.name)].filter((x) => x.length > 0).join('/');
        });
    });

    return value;
};

const diffList = (origin: ItemInfo[], indexList: number[], newSlice: ItemInfo[]) => {
    const whiteList = ['type', 'name', 'url', 'id', 'list', 'hasIndex'];
    const slice = produce(newSlice, (draft) => {
        walkThroughTree(draft, (item) => {
            Object.keys(item).forEach((key) => {
                if (whiteList.includes(key)) {
                    return;
                }
                delete (item as Record<string, unknown>)[key];
            });
        });
    });

    // TODO: validate first
    const value = produce(origin, (draft) => {
        if (indexList.length === 0) {
            draft.splice(0, draft.length, ...slice);
            return;
        }
        const _indexList = [...indexList];
        const last = _indexList.pop();
        const target = _indexList.reduce((acc, cur) => (acc[cur] as DirInfo).list, draft) as DirInfo[];
        if (last != null) {
            const lastTarget = target[last];
            if (lastTarget) {
                lastTarget.list = [...slice];
            }
        }
    });

    return value;
};

export const listReducer = (state: ListReducerState, action: ListReducerAction): ListReducerState => {
    switch (action.type) {
        case 'ReplaceAll':
            return {
                curr: action.list,
                count: flatItems(action.list).length,
            };
        case 'ModifyList': {
            const newState = flushUrl(diffList(state.curr, action.indexList, action.newSlice));

            return {
                curr: newState,
                count: state.count,
            };
        }
    }
};
