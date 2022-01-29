import { L as LoadConfigOptions, a as LoadConfigResult } from './types-6886c41e';
export { B as BuiltinParsers, C as CustomParser, L as LoadConfigOptions, a as LoadConfigResult, b as LoadConfigSource, S as SearchOptions, d as defaultExtensions } from './types-6886c41e';
import '@antfu/utils';

declare function createConfigLoader<T>(options: LoadConfigOptions): {
    load: (force?: boolean) => Promise<LoadConfigResult<T>>;
    findConfigs: () => Promise<string[]>;
};
declare function loadConfig<T>(options: LoadConfigOptions): Promise<LoadConfigResult<T>>;

export { createConfigLoader, loadConfig };
