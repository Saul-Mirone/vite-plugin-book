import { PresetOptions, Extractor, VariantFunction, Preset } from '@unocss/core';

interface AttributifyOptions extends PresetOptions {
    /**
     * Only generate CSS for attributify or class
     *
     * @default false
     */
    strict?: boolean;
    /**
     * @default 'un-'
     */
    prefix?: string;
    /**
     * Only match for prefixed attributes
     *
     * @default false
     */
    prefixedOnly?: boolean;
    /**
     * Support matching non-valued attributes
     *
     * For example
     * ```html
     * <div mt-2 />
     * ```
     *
     * @default true
     */
    nonValuedAttribute?: boolean;
    /**
     * A list of attributes to be ignored from extracting.
     */
    ignoreAttributes?: string[];
}

declare const extractorAttributify: (options?: AttributifyOptions | undefined) => Extractor;

declare const variantAttributify: (options?: AttributifyOptions) => VariantFunction;

declare const preset: (options?: AttributifyOptions) => Preset;

export { AttributifyOptions, preset as default, extractorAttributify, variantAttributify };
