/**
 * Icon name
 */
export interface IconifyIconName {
    readonly provider: string;
    readonly prefix: string;
    readonly name: string;
}
/**
 * Icon source: icon object without name
 */
export declare type IconifyIconSource = Omit<IconifyIconName, 'name'>;
/**
 * Convert string to Icon object.
 */
export declare const stringToIcon: (value: string, validate?: boolean | undefined, allowSimpleName?: boolean | undefined, provider?: string) => IconifyIconName | null;
/**
 * Check if icon is valid.
 *
 * This function is not part of stringToIcon because validation is not needed for most code.
 */
export declare const validateIcon: (icon: IconifyIconName | null, allowSimpleName?: boolean | undefined) => boolean;
