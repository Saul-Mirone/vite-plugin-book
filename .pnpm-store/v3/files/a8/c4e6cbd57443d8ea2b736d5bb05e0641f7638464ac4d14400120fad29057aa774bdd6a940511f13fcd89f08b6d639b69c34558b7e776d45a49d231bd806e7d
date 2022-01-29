import type { IconifyAlias, IconifyJSON } from '@iconify/types';
import { FullIconifyIcon } from '../icon';
import { IconSetValidationOptions } from './validate';
/**
 * Which aliases to parse:
 *
 * none - do not parse aliases
 * all - parse all aliases
 * variations - parse only aliases that have transformations (can be considered to be different icon)
 */
export declare type ParseIconSetAliases = 'none' | 'all' | 'variations';
/**
 * Callback to call for each icon.
 *
 * If data === null, icon is missing.
 */
export declare type SplitIconSetCallback = (name: string, data: FullIconifyIcon | null) => void;
/**
 * Check if alias is a variation
 */
export declare function isVariation(item: IconifyAlias): boolean;
export interface ParseIconSetOptions {
    validate?: boolean | IconSetValidationOptions;
    aliases?: ParseIconSetAliases;
}
/**
 * Extract icons from an icon set
 *
 * Returns list of icons that were found in icon set
 */
export declare function parseIconSet(data: IconifyJSON, callback: SplitIconSetCallback, options?: ParseIconSetOptions): string[];
