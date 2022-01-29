declare type ElInstance<U> = {
    push: (node: U, ...rest: U[]) => void;
};
declare type StackCtx<T extends ElInstance<U>, U> = {
    readonly elements: T[];
};
export declare const getStackUtil: <Node_1, El extends ElInstance<Node_1>, Ctx extends StackCtx<El, Node_1>>() => {
    size: (ctx: Ctx) => number;
    top: (ctx: Ctx) => El | undefined;
    push: (ctx: Ctx) => (node: Node_1) => void;
    open: (ctx: Ctx) => (node: El) => void;
    close: (ctx: Ctx) => El;
};
export {};
//# sourceMappingURL=stack.d.ts.map