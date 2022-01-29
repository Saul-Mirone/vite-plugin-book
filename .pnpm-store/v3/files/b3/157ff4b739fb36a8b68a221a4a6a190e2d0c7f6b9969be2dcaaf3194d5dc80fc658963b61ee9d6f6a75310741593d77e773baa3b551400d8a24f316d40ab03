import { b as LoadConfigSource, B as BuiltinParsers, C as CustomParser } from './types-6886c41e';
import { Arrayable } from '@antfu/utils';

interface SourceVitePluginConfigOptions {
    plugins: Arrayable<string>;
}
interface SourceObjectFieldOptions extends Omit<LoadConfigSource, 'rewrite'> {
    fields: Arrayable<string>;
}
interface SourcePluginFactoryOptions extends Omit<LoadConfigSource, 'transform'> {
    targetModule: string;
}
/**
 * Retwrite the config file and extract the options passed to plugin factory
 * (e.g. Vite and Rollup plugins)
 */
declare function sourcePluginFactory(options: SourcePluginFactoryOptions): {
    transform: (source: string) => string;
    targetModule: string;
    rewrite?: (<F = any>(obj: F, filepath: string) => any) | undefined;
    files: Arrayable<string>;
    extensions?: string[] | undefined;
    parser?: BuiltinParsers | "auto" | CustomParser<any> | undefined;
    skipOnError?: boolean | undefined;
};
declare function sourceVitePluginConfig(options: SourceVitePluginConfigOptions): LoadConfigSource;
/**
 * Get one field of the config object
 */
declare function sourceObjectFields(options: SourceObjectFieldOptions): LoadConfigSource;
/**
 * Get one field of `package.json`
 */
declare function sourcePackageJsonFields(options: Pick<SourceObjectFieldOptions, 'fields'>): LoadConfigSource;

export { SourceObjectFieldOptions, SourcePluginFactoryOptions, SourceVitePluginConfigOptions, sourceObjectFields, sourcePackageJsonFields, sourcePluginFactory, sourceVitePluginConfig };
