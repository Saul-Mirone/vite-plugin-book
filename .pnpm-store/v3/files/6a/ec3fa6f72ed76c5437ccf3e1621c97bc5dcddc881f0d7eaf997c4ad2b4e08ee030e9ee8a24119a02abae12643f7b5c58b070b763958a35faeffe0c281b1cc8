import type { Fragment, Node as ProseNode, Schema } from '@milkdown/prose';
import { RemarkParser } from '../utility';
import type { Stack } from './stack';
import type { InnerSerializerSpecMap } from './types';
declare type StateMethod<T extends keyof Stack> = (...args: Parameters<Stack[T]>) => State;
/**
 * State for serializer.
 * Transform prosemirror state into remark AST.
 */
export declare class State {
    #private;
    private readonly stack;
    readonly schema: Schema;
    private readonly specMap;
    constructor(stack: Stack, schema: Schema, specMap: InnerSerializerSpecMap);
    /**
     * Transform a prosemirror node tree into remark AST.
     *
     * @param tree - The prosemirror node tree needs to be transformed.
     *
     * @returns The state instance.
     */
    run(tree: ProseNode): this;
    /**
     * Use a remark parser to serialize current AST stored.
     *
     * @param remark - The remark parser needs to used.
     * @returns Result markdown string.
     */
    toString: (remark: RemarkParser) => string;
    /**
     * Give the node or node list back to the state and the state will find a proper runner (by `match` method) to handle it.
     *
     * @param nodes - The node or node list needs to be handled.
     *
     * @returns The state instance.
     */
    next: (nodes: ProseNode | Fragment) => this;
    /**
     * Add a node without open or close it.
     *
     * @remarks
     * It's useful for nodes which don't have content.
     *
     * @param type - Type of this node.
     * @param children - Children of this node.
     * @param value - Value of this node.
     * @param props - Additional props of this node.
     *
     * @returns The added node.
     */
    addNode: StateMethod<'addNode'>;
    /**
     * Open a node, and all nodes created after this method will be set as the children of the node until a `closeNode` been called.
     *
     * @remarks
     * You can imagine `openNode` as the left half of parenthesis and `closeNode` as the right half. For nodes have children, your runner should just take care of the node itself and let other runners to handle the children.
     *
     * @param type - Type of this node.
     * @param value - Value of this node.
     * @param props - Additional props of this node.
     *
     * @returns The state instance.
     */
    openNode: StateMethod<'openNode'>;
    /**
     * Close current node.
     *
     * @returns The node closed.
     */
    closeNode: StateMethod<'closeNode'>;
    /**
     * Used when current node has marks, the serializer will auto combine marks nearby.
     *
     * @param mark - The mark need to be opened.
     * @param type - Type of this mark.
     * @param value - Value of this mark.
     * @param props - Additional props of this mark.
     *
     * @returns The state instance.
     */
    withMark: StateMethod<'openMark'>;
}
export {};
//# sourceMappingURL=state.d.ts.map