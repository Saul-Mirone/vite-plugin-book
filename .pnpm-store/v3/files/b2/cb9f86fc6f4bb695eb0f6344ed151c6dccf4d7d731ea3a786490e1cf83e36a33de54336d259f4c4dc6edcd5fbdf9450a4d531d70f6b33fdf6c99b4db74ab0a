import { Plugin } from 'rollup';
import { CommonOptions, BuildOptions, Loader } from 'esbuild';
import { MarkOptional } from 'ts-essentials';
import { FilterPattern } from '@rollup/pluginutils';

declare type Options$1 = {
    sourceMap?: boolean;
    minify?: boolean;
    minifyWhitespace?: boolean;
    minifyIdentifiers?: boolean;
    minifySyntax?: boolean;
    keepNames?: boolean;
    legalComments?: CommonOptions['legalComments'];
    target?: CommonOptions['target'];
};
declare const minify: (options?: Options$1) => Plugin;

declare type OptimizeDepsOptions = {
    include: string[];
    exclude?: string[];
    cwd: string;
    esbuildOptions?: BuildOptions;
    sourceMap: boolean;
};

declare type Options = {
    include?: FilterPattern;
    exclude?: FilterPattern;
    sourceMap?: boolean;
    minify?: boolean;
    minifyWhitespace?: boolean;
    minifyIdentifiers?: boolean;
    minifySyntax?: boolean;
    keepNames?: boolean;
    legalComments?: CommonOptions['legalComments'];
    target?: string | string[];
    /**
     * Requires esbuild >= 0.12.1
     */
    jsx?: 'transform' | 'preserve';
    jsxFactory?: string;
    jsxFragment?: string;
    define?: {
        [k: string]: string;
    };
    optimizeDeps?: MarkOptional<OptimizeDepsOptions, 'cwd' | 'sourceMap'>;
    /**
     * Use this tsconfig file instead
     * Disable it by setting to `false`
     */
    tsconfig?: string | false;
    /**
     * Map extension to esbuild loader
     * Note that each entry (the extension) needs to start with a dot
     */
    loaders?: {
        [ext: string]: Loader | false;
    };
    pure?: string[];
};
declare const _default: (options?: Options) => Plugin;

export { Options, _default as default, minify };
