import type { Node as ProseNode, NodeType, ResolvedPos } from 'prosemirror-model';
import { Selection } from 'prosemirror-state';
import type { Predicate } from './types';
export declare type ContentNodeWithPos = {
    pos: number;
    start: number;
    depth: number;
    node: ProseNode;
};
export declare const findParentNodeClosestToPos: (predicate: Predicate) => ($pos: ResolvedPos) => ContentNodeWithPos | undefined;
export declare const findParentNode: (predicate: Predicate) => (selection: Selection) => ContentNodeWithPos | undefined;
export declare const findSelectedNodeOfType: (selection: Selection, nodeType: NodeType) => ContentNodeWithPos | undefined;
//# sourceMappingURL=selection.d.ts.map