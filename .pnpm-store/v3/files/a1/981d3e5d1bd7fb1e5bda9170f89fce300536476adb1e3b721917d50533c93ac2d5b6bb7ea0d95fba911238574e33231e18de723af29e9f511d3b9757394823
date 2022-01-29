import { MilkdownPlugin, Slice, Timer } from '@milkdown/ctx';
import type { Command } from '@milkdown/prose';
export declare type Cmd<T = undefined> = (info?: T) => Command;
export declare type CmdKey<T = undefined> = Slice<Cmd<T>>;
declare type InferParams<T> = T extends CmdKey<infer U> ? U : never;
export declare type CommandManager = {
    create: <T>(meta: CmdKey<T>, value: Cmd<T>) => void;
    get: <T>(meta: CmdKey<T>) => Cmd<T>;
    call: <T>(meta: CmdKey<T>, info?: T) => boolean;
    getByName: <T extends CmdKey<any>>(name: string) => Cmd<InferParams<T>> | null;
    callByName: <T extends CmdKey<any>>(name: string, info?: InferParams<T>) => null | boolean;
};
export declare type CmdTuple<T = unknown> = [key: CmdKey<T>, value: Cmd<T>];
export declare const createCmd: <T>(key: CmdKey<T>, value: Cmd<T>) => CmdTuple<unknown>;
export declare const commandsCtx: Slice<CommandManager>;
export declare const createCmdKey: <T = undefined>(key?: string) => CmdKey<T>;
export declare const commandsTimerCtx: Slice<Timer[]>;
export declare const CommandsReady: Timer;
export declare const commands: MilkdownPlugin;
export {};
//# sourceMappingURL=commands.d.ts.map