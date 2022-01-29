import type { MarkdownNode } from '..';
import type { JSONRecord } from '../utility';
export declare type StackElement = {
    type: string;
    value?: string;
    props: JSONRecord;
    children?: MarkdownNode[];
    push: (node: MarkdownNode, ...rest: MarkdownNode[]) => void;
    pop: () => MarkdownNode | undefined;
};
export declare const createElement: (type: string, children?: MarkdownNode[] | undefined, value?: string | undefined, props?: JSONRecord) => StackElement;
//# sourceMappingURL=stack-element.d.ts.map