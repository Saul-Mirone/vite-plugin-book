import type { IconifyInfo } from '@iconify/types';
/**
 * Item provided by API or loaded from collections.json, slightly different from IconifyInfo
 */
export interface LegacyIconifyInfo {
    name: string;
    total?: number;
    version?: string;
    author?: string;
    url?: string;
    license?: string;
    licenseURL?: string;
    licenseSPDX?: string;
    samples?: string[];
    height?: number | number[];
    displayHeight?: number;
    samplesHeight?: number;
    category?: string;
    palette?: 'Colorless' | 'Colorful';
    hidden?: boolean;
}
/**
 * Convert data to valid CollectionInfo
 */
export declare function convertIconSetInfo(data: unknown, expectedPrefix?: string): IconifyInfo | null;
