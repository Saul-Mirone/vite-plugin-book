import { MilkdownPlugin, Slice, Timer } from '@milkdown/ctx';
import { InputRule, MarkViewFactory, NodeViewFactory, Plugin, ViewFactory } from '@milkdown/prose';
import { RemarkParser, RemarkPlugin } from '@milkdown/transformer';
import type { Editor } from '../editor';
export declare const InitReady: Timer;
export declare const initTimerCtx: Slice<Timer[]>;
export declare const editorCtx: Slice<Editor>;
export declare const inputRulesCtx: Slice<InputRule<any>[]>;
export declare const prosePluginsCtx: Slice<Plugin<any, any>[]>;
export declare const remarkPluginsCtx: Slice<RemarkPlugin[]>;
declare type View = [nodeId: string, view: ViewFactory | NodeViewFactory | MarkViewFactory];
export declare const viewCtx: Slice<View[]>;
export declare const remarkCtx: Slice<RemarkParser>;
export declare const init: (editor: Editor) => MilkdownPlugin;
export {};
//# sourceMappingURL=init.d.ts.map