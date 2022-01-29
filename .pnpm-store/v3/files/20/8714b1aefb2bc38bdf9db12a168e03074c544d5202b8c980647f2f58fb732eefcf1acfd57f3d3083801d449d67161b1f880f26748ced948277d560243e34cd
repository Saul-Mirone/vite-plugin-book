import { Mark } from '@milkdown/prose';
import { Root } from 'mdast';
import type { MarkdownNode } from '..';
import { JSONRecord } from '../utility';
export declare type Stack = {
    /**
     * Build the remark AST tree with current stack.
     *
     * @returns A remark AST tree.
     */
    build: () => Root;
    /**
     * Open a mark.
     *
     * @param mark - The mark need to be opened.
     * @param type - Type of this mark.
     * @param value - Value of this mark.
     * @param props - Additional props of this mark.
     *
     * @returns
     */
    openMark: (mark: Mark, type: string, value?: string, props?: JSONRecord) => void;
    /**
     * Close current mark.
     * @param mark - The prosemirror mark of target mark to be closed.
     *
     * @returns The mark closed, will be null if not exists.
     */
    closeMark: (mark: Mark) => MarkdownNode | null;
    /**
     * Open a node.
     *
     * @param type - Type of this node.
     * @param value - Value of this node.
     * @param props - Additional props of this node.
     *
     * @returns
     */
    openNode: (type: string, value?: string, props?: JSONRecord) => void;
    /**
     * Add a node in current position.
     *
     * @param type - Type of this node.
     * @param children - Children of this node.
     * @param value - Value of this node.
     * @param props - Additional props of this node.
     *
     * @returns The added node.
     */
    addNode: (type: string, children?: MarkdownNode[], value?: string, props?: JSONRecord) => MarkdownNode;
    /**
     * Close current node.
     *
     * @returns The node closed.
     */
    closeNode: () => MarkdownNode;
};
export declare const createStack: () => Stack;
//# sourceMappingURL=stack.d.ts.map