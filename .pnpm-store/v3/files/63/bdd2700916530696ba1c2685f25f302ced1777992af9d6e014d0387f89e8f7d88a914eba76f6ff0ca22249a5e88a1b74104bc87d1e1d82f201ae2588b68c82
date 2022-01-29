import { Attrs, CmdKey, Ctx } from '@milkdown/core';
import { AddMetadata, CommandConfig, CommonOptions, Factory, GetPlugin, Methods, UnknownRecord, Utils, WithExtend } from '../types';
export declare const getClassName: (className: CommonOptions['className']) => (attrs: Attrs, ...defaultValue: (string | null | undefined)[]) => string;
export declare const createShortcut: <T>(commandKey: CmdKey<T>, defaultKey: string, args?: T | undefined) => CommandConfig<unknown>;
export declare const getUtils: <Options extends UnknownRecord>(ctx: Ctx, options?: Options | undefined) => Utils;
export declare const applyMethods: <Keys extends string, Type, Options extends UnknownRecord>(ctx: Ctx, plugin: Methods<Keys, Type>, getType: () => Promise<Type>, options?: Partial<CommonOptions<Keys, Options>> | undefined) => Promise<void>;
export declare const addMetadata: <SupportedKeys extends string = string, Options extends UnknownRecord = UnknownRecord>(x: GetPlugin<SupportedKeys, Options>) => AddMetadata<SupportedKeys, Options>;
export declare const withExtend: <SupportedKeys extends string, Options extends UnknownRecord, Type, Rest>(factory: Factory<SupportedKeys, Options, Type, Rest>, origin: AddMetadata<SupportedKeys, Options>, creator: (factory: Factory<SupportedKeys, Options, Type, Rest>) => WithExtend<SupportedKeys, Options, Type, Rest>) => WithExtend<SupportedKeys, Options, Type, Rest>;
//# sourceMappingURL=common.d.ts.map