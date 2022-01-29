import type { Plugin } from '../plugin';
import type { TransformOptions, TransformResult } from 'esbuild';
import type { SourceMap } from 'rollup';
import type { ResolvedConfig } from '..';
export interface ESBuildOptions extends TransformOptions {
    include?: string | RegExp | string[] | RegExp[];
    exclude?: string | RegExp | string[] | RegExp[];
    jsxInject?: string;
}
export declare type ESBuildTransformResult = Omit<TransformResult, 'map'> & {
    map: SourceMap;
};
export declare function transformWithEsbuild(code: string, filename: string, options?: TransformOptions, inMap?: object): Promise<ESBuildTransformResult>;
export declare function esbuildPlugin(options?: ESBuildOptions): Plugin;
export declare const buildEsbuildPlugin: (config: ResolvedConfig) => Plugin;
