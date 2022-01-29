import type { Mark as ProseMark, Node as ProseNode } from '@milkdown/prose';
import type { State } from './state';
export declare type NodeSerializerSpec = {
    match: (node: ProseNode) => boolean;
    runner: (state: State, node: ProseNode) => void;
};
export declare type MarkSerializerSpec = {
    match: (mark: ProseMark) => boolean;
    runner: (state: State, mark: ProseMark, node: ProseNode) => void | boolean;
};
export declare type SerializerSpec = NodeSerializerSpec | MarkSerializerSpec;
export declare type InnerSerializerSpecMap = Record<string, SerializerSpec>;
//# sourceMappingURL=types.d.ts.map