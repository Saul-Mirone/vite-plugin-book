import { Ctx, NodeSchema } from '@milkdown/core';
import { NodeType, NodeViewFactory } from '@milkdown/prose';
import { Factory, UnknownRecord, WithExtend } from '../types';
declare type NodeRest = {
    id: string;
    schema: (ctx: Ctx) => NodeSchema;
    view?: (ctx: Ctx) => NodeViewFactory;
};
declare type NodeFactory<SupportedKeys extends string, Options extends UnknownRecord> = Factory<SupportedKeys, Options, NodeType, NodeRest>;
export declare const createNode: <SupportedKeys extends string = string, Options extends UnknownRecord = UnknownRecord>(factory: NodeFactory<SupportedKeys, Options>) => WithExtend<SupportedKeys, Options, NodeType<any>, NodeRest>;
export {};
//# sourceMappingURL=create-node.d.ts.map