import { Ctx, MilkdownPlugin } from '@milkdown/core';
import { MarkViewFactory, NodeViewFactory, ViewFactory } from '@milkdown/prose';
import { $Mark, $Node } from '.';
export declare type $View<T extends $Node | $Mark, V extends NodeViewFactory | MarkViewFactory> = MilkdownPlugin & {
    view: V;
    type: T;
};
export declare const $view: <T extends $Mark | $Node, V extends NodeViewFactory | MarkViewFactory = T extends $Node ? NodeViewFactory : T extends $Mark ? MarkViewFactory : ViewFactory>(type: T, view: (ctx: Ctx) => V) => $View<T, V>;
//# sourceMappingURL=$view.d.ts.map