import { Ctx, MarkSchema, NodeSchema } from '@milkdown/core';
import { MarkType, MarkViewFactory, NodeType, NodeViewFactory } from '@milkdown/prose';
import { Factory, UnknownRecord, WithExtend } from '../types';
declare type TypeMapping<NodeKeys extends string, MarkKeys extends string> = {
    [K in NodeKeys]: NodeType;
} & {
    [K in MarkKeys]: MarkType;
};
declare type ViewMapping<NodeKeys extends string, MarkKeys extends string> = {
    [K in NodeKeys]: NodeViewFactory;
} & {
    [K in MarkKeys]: MarkViewFactory;
};
declare type PluginRest<NodeKeys extends string, MarkKeys extends string> = {
    schema?: (ctx: Ctx) => {
        node?: Record<NodeKeys, NodeSchema>;
        mark?: Record<MarkKeys, MarkSchema>;
    };
    view?: (ctx: Ctx) => Partial<ViewMapping<NodeKeys, MarkKeys>>;
};
declare type PluginFactory<SupportedKeys extends string = string, Options extends UnknownRecord = UnknownRecord, NodeKeys extends string = string, MarkKeys extends string = string> = Factory<SupportedKeys, Options, TypeMapping<NodeKeys, MarkKeys>, PluginRest<NodeKeys, MarkKeys>>;
export declare const createPlugin: <SupportedKeys extends string = string, Options extends UnknownRecord = UnknownRecord, NodeKeys extends string = string, MarkKeys extends string = string>(factory: PluginFactory<SupportedKeys, Options, NodeKeys, MarkKeys>) => WithExtend<SupportedKeys, Options, TypeMapping<NodeKeys, MarkKeys>, PluginRest<NodeKeys, MarkKeys>>;
export {};
//# sourceMappingURL=create-plugin.d.ts.map