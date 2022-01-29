import type { MarkType, NodeType } from '@milkdown/prose';
import type { Node } from 'unist';
import type { State } from './state';
export declare type Attrs = Record<string, string | number | boolean | null>;
export declare type MarkdownNode = Node & {
    children?: MarkdownNode[];
    [x: string]: unknown;
};
export declare type ParserRunner<T extends NodeType | MarkType = NodeType | MarkType> = (state: State, Node: MarkdownNode, proseType: T) => void;
export declare type ParserSpec<T extends NodeType | MarkType = NodeType | MarkType> = {
    match: (node: MarkdownNode) => boolean;
    runner: ParserRunner<T>;
};
export declare type NodeParserSpec = ParserSpec<NodeType>;
export declare type MarkParserSpec = ParserSpec<MarkType>;
export declare type ParserSpecWithType = (NodeParserSpec & {
    is: 'node';
    key: string;
}) | (MarkParserSpec & {
    is: 'mark';
    key: string;
});
export declare type InnerParserSpecMap = Record<string, ParserSpecWithType>;
//# sourceMappingURL=types.d.ts.map