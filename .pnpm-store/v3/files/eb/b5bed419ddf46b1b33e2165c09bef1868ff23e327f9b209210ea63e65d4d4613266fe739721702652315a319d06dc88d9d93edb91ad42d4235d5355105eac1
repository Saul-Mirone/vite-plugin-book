import { MilkdownPlugin } from '@milkdown/core';
import { AddMetadata, Metadata } from '../types';
declare type PluginWithMetadata = MilkdownPlugin & Metadata;
declare type Plugin = MilkdownPlugin | PluginWithMetadata;
declare type Factory = AddMetadata;
export declare class AtomList<T extends Plugin = Plugin> extends Array<T> {
    private findThenRun;
    configure<U extends Factory>(target: U, config: Parameters<U>[0]): this;
    replace<U extends Factory, Next extends Plugin>(target: U, next: Next): this;
    remove<U extends Factory>(target: U): this;
    headless(): this;
    static create<T extends Plugin = Plugin>(from: T[]): AtomList<T>;
}
export {};
//# sourceMappingURL=atom-list.d.ts.map