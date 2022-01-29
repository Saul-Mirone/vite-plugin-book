import { Awaitable, Arrayable } from '@antfu/utils';

declare const defaultExtensions: string[];
declare type BuiltinParsers = 'require' | 'json';
declare type CustomParser<T> = (filepath: string) => Awaitable<T | undefined>;
interface LoadConfigSource<T = any> {
    files: Arrayable<string>;
    /**
     * @default ['mts', 'cts', 'ts', 'mjs', 'cjs', 'js', 'json', '']
     */
    extensions?: string[];
    /**
     * Loader for loading config,
     *
     * @default 'auto'
     */
    parser?: BuiltinParsers | CustomParser<T> | 'auto';
    /**
     * Rewrite the config object,
     * return nullish value to bypassing loading the file
     */
    rewrite?: <F = any>(obj: F, filepath: string) => Promise<T | undefined> | T | undefined;
    /**
     * Transform the source code before loading,
     * return nullish value to skip transformation
     */
    transform?: (code: string, filepath: string) => Promise<string | undefined> | string | undefined;
    /**
     * Skip this source if error occurred on loading
     *
     * @default false
     */
    skipOnError?: boolean;
}
interface SearchOptions {
    /**
     * Root directory
     *
     * @default process.cwd()
     */
    cwd?: string;
    /**
     * @default path.parse(cwd).root
     */
    stopAt?: string;
    /**
     * Load from multiple sources and merge them
     *
     * @default false
     */
    merge?: boolean;
}
interface LoadConfigOptions<T = any> extends SearchOptions {
    sources: Arrayable<LoadConfigSource<T>>;
    defaults?: T;
}
interface LoadConfigResult<T> {
    config: T;
    sources: string[];
}

export { BuiltinParsers as B, CustomParser as C, LoadConfigOptions as L, SearchOptions as S, LoadConfigResult as a, LoadConfigSource as b, defaultExtensions as d };
