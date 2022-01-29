import { MilkdownPlugin, Timer } from '@milkdown/ctx';
import { EditorState, Node, Schema } from '@milkdown/prose';
import { JSONRecord } from '@milkdown/transformer';
declare type DefaultValue = string | {
    type: 'html';
    dom: HTMLElement;
} | {
    type: 'json';
    value: JSONRecord;
};
export declare const defaultValueCtx: import("@milkdown/ctx").Slice<DefaultValue>;
export declare const editorStateCtx: import("@milkdown/ctx").Slice<EditorState<any>>;
export declare const editorStateOptionsCtx: import("@milkdown/ctx").Slice<{
    schema?: Schema<any, any> | null | undefined;
    doc?: Node<Schema<any, any>> | null | undefined;
    selection?: import("prosemirror-state").Selection<Schema<any, any>> | null | undefined;
    storedMarks?: import("prosemirror-model").Mark<any>[] | null | undefined;
    plugins?: import("prosemirror-state").Plugin<any, Schema<any, any>>[] | null | undefined;
}>;
export declare const editorStateTimerCtx: import("@milkdown/ctx").Slice<Timer[]>;
export declare const EditorStateReady: Timer;
export declare const editorState: MilkdownPlugin;
export {};
//# sourceMappingURL=editor-state.d.ts.map