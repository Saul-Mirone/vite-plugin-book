import { Ctx, MarkSchema } from '@milkdown/core';
import { MarkType, MarkViewFactory } from '@milkdown/prose';
import { Factory, UnknownRecord, WithExtend } from '../types';
declare type MarkRest = {
    id: string;
    schema: (ctx: Ctx) => MarkSchema;
    view?: (ctx: Ctx) => MarkViewFactory;
};
declare type MarkFactory<SupportedKeys extends string, Options extends UnknownRecord> = Factory<SupportedKeys, Options, MarkType, MarkRest>;
export declare const createMark: <SupportedKeys extends string = string, Options extends UnknownRecord = UnknownRecord>(factory: MarkFactory<SupportedKeys, Options>) => WithExtend<SupportedKeys, Options, MarkType<any>, MarkRest>;
export {};
//# sourceMappingURL=create-mark.d.ts.map