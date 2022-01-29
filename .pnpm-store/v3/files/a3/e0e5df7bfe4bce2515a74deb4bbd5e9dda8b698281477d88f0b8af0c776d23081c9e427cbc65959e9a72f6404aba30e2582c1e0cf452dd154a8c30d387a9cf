import { MarkType, Node, NodeType, Schema } from '@milkdown/prose';
import type { Attrs } from './types';
export declare const createStack: (schema: Schema) => {
    build: () => Node<any>;
    openMark: (markType: MarkType, attrs?: Attrs | undefined) => void;
    closeMark: (markType: MarkType) => void;
    addText: (text: string) => void;
    openNode: (nodeType: NodeType, attrs?: Attrs | undefined) => void;
    addNode: (nodeType: NodeType, attrs?: Attrs | undefined, content?: Node<any>[] | undefined) => Node;
    closeNode: () => Node;
};
export declare type Stack = ReturnType<typeof createStack>;
//# sourceMappingURL=stack.d.ts.map