import { Ctx } from '@milkdown/core';
import { Command, EditorView } from '@milkdown/prose';
export declare type Item = {
    $: HTMLElement;
    command: (e: Event, view: EditorView) => Command;
    disable?: (view: EditorView) => boolean;
};
export declare enum Action {
    AddColLeft = 0,
    AddColRight = 1,
    AddRowTop = 2,
    AddRowBottom = 3,
    AlignLeft = 4,
    AlignCenter = 5,
    AlignRight = 6,
    Delete = 7
}
export declare const createActions: (ctx: Ctx) => Record<Action, Item>;
//# sourceMappingURL=actions.d.ts.map