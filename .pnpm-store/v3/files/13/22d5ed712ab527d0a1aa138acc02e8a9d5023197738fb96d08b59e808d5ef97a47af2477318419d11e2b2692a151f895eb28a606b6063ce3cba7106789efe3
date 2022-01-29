import type { MarkType, NodeType, Schema } from '@milkdown/prose';
import { RemarkParser } from '../utility';
import type { Stack } from './stack';
import type { Attrs, InnerParserSpecMap, MarkdownNode } from './types';
/**
 * State for parser.
 * Transform remark AST into prosemirror state.
 */
export declare class State {
    #private;
    private readonly stack;
    readonly schema: Schema;
    private readonly specMap;
    constructor(stack: Stack, schema: Schema, specMap: InnerParserSpecMap);
    /**
     * Transform a markdown string into prosemirror state.
     *
     * @param remark - The remark parser used.
     * @param markdown - The markdown string needs to be parsed.
     * @returns The state instance.
     */
    run: (remark: RemarkParser, markdown: string) => this;
    /**
     * Give the node or node list back to the state and the state will find a proper runner (by `match` method) to handle it.
     *
     * @param nodes - The node or node list needs to be handled.
     *
     * @returns The state instance.
     */
    next: (nodes?: MarkdownNode | MarkdownNode[]) => this;
    /**
     * Parse current remark AST into prosemirror state.
     *
     * @returns Result prosemirror doc.
     */
    toDoc: () => import("prosemirror-model").Node<any>;
    /**
     * Inject root node for prosemirror state.
     *
     * @param node - The target markdown node.
     * @param nodeType - The root prosemirror nodeType .
     * @param attrs - The attribute of root type.
     * @returns The state instance.
     */
    injectRoot: (node: MarkdownNode, nodeType: NodeType, attrs?: Attrs | undefined) => this;
    /**
     * Add a text type prosemirror node.
     *
     * @param text - Text string.
     * @returns The state instance.
     */
    addText: (text?: string) => this;
    /**
     * Add a node without open or close it.
     *
     * @remarks
     * It's useful for nodes which don't have content.
     *
     * @param nodeType - Node type of this node.
     * @param attrs - Attributes of this node.
     * @param content - Content of this node.
     *
     * @returns The added node.
     */
    addNode: (nodeType: NodeType<any>, attrs?: Attrs | undefined, content?: import("prosemirror-model").Node<any>[] | undefined) => this;
    /**
     * Open a node, and all nodes created after this method will be set as the children of the node until a `closeNode` been called.
     *
     * @remarks
     * You can imagine `openNode` as the left half of parenthesis and `closeNode` as the right half. For nodes have children, your runner should just take care of the node itself and let other runners to handle the children.
     *
     * @param nodeType - Node type of this node.
     * @param attrs - Attributes of this node.
     *
     * @returns
     */
    openNode: (nodeType: NodeType<any>, attrs?: Attrs | undefined) => this;
    /**
     * Close current node.
     *
     * @returns The node closed.
     */
    closeNode: () => this;
    /**
     * Open a mark, and all marks created after this method will be set as the children of the mark until a `closeMark` been called.
     *
     * @remarks
     * You can imagine `openMark` as the left half of parenthesis and `closeMark` as the right half. For nodes have children, your runner should just take care of the node itself and let other runners to handle the children.
     *
     * @param markType - Mark type of this mark.
     * @param attrs - Attributes of this mark.
     *
     * @returns
     */
    openMark: (markType: MarkType<any>, attrs?: Attrs | undefined) => this;
    /**
     * Close target mark.
     *
     * @param markType - Mark type of this mark.
     *
     * @returns The mark closed.
     */
    closeMark: (markType: MarkType<any>) => this;
}
//# sourceMappingURL=state.d.ts.map