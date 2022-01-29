import type { MarkType, Node as ProseNode } from 'prosemirror-model';
import type { Predicate } from './types';
export declare type NodeWithPos = {
    pos: number;
    node: ProseNode;
};
export declare const flatten: (node: ProseNode, descend?: boolean) => NodeWithPos[];
export declare const findChildren: (predicate: Predicate) => (node: ProseNode, descend?: boolean | undefined) => NodeWithPos[];
export declare const findChildrenByMark: (node: ProseNode, markType: MarkType, descend?: boolean | undefined) => NodeWithPos[];
//# sourceMappingURL=node.d.ts.map