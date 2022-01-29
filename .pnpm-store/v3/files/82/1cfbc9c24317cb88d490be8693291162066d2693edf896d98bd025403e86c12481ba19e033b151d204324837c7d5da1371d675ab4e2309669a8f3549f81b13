/**
 * Icon alignment
 */
export declare type IconifyHorizontalIconAlignment = 'left' | 'center' | 'right';
export declare type IconifyVerticalIconAlignment = 'top' | 'middle' | 'bottom';
/**
 * Icon size
 */
export declare type IconifyIconSize = null | string | number;
/**
 * Icon customisations
 */
export interface IconifyIconCustomisations {
    inline?: boolean;
    width?: IconifyIconSize;
    height?: IconifyIconSize;
    hAlign?: IconifyHorizontalIconAlignment;
    vAlign?: IconifyVerticalIconAlignment;
    slice?: boolean;
    hFlip?: boolean;
    vFlip?: boolean;
    rotate?: number;
}
export declare type FullIconCustomisations = Required<IconifyIconCustomisations>;
/**
 * Default icon customisations values
 */
export declare const defaults: FullIconCustomisations;
/**
 * Convert IconifyIconCustomisations to FullIconCustomisations
 */
export declare function mergeCustomisations(defaults: FullIconCustomisations, item: IconifyIconCustomisations): FullIconCustomisations;
