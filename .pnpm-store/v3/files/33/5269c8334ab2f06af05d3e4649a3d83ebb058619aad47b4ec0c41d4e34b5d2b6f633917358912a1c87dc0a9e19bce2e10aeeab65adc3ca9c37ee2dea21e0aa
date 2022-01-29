import { Preset } from '@unocss/core';

declare type WebFontsProviders = 'google' | 'none';
interface WebFontMeta {
    name: string;
    weights?: (string | number)[];
    italic?: boolean;
    /**
     * Override the provider
     * @default <matches root config>
     */
    provider?: WebFontsProviders;
}
interface WebFontsOptions {
    /**
     * Provider service of the web fonts
     * @default 'google'
     */
    provider?: WebFontsProviders;
    /**
     * The fonts
     */
    fonts?: Record<string, WebFontMeta | string | (WebFontMeta | string)[]>;
    /**
     * Extend the theme object
     * @default true
     */
    extendTheme?: boolean;
    /**
     * Key for the theme object
     *
     * @default 'fontFamily'
     */
    themeKey?: string;
    /**
     * Inline CSS @import()
     *
     * @default true
     */
    inlineImports?: boolean;
}
interface Provider {
    name: WebFontsProviders;
    getPreflight?(fonts: WebFontMeta[]): string;
    getImportUrl?(fonts: WebFontMeta[]): string | undefined;
    getFontName(font: WebFontMeta): string;
}

declare function normalizedFontMeta(meta: WebFontMeta | string, defaultProvider: WebFontsProviders): WebFontMeta;
declare const preset: (options?: WebFontsOptions) => Preset<any>;

export { Provider, WebFontMeta, WebFontsOptions, WebFontsProviders, preset as default, normalizedFontMeta };
