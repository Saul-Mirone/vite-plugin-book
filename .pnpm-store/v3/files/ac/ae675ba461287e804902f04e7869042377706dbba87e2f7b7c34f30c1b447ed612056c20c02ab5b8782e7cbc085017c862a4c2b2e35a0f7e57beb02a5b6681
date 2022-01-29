import * as vite from 'vite';
import { Plugin } from 'vite';
import { UserConfig, UnoGenerator, BetterMap, UserConfigDefaults } from '@unocss/core';
import { LoadConfigResult } from '@unocss/config';

interface VitePluginConfig<Theme extends {} = {}> extends UserConfig<Theme> {
    /**
     * Enable UnoCSS inspector
     *
     * @default true
     */
    inspector?: boolean;
    /**
     * CSS Generation mode
     *
     * - `global` - generate a single CSS sheet for entire App
     * - `dist-chunk` - generate a CSS sheet for each code chunk on build, great for MPA
     * - `per-module` - generate a CSS sheet for each module, can be scoped
     * - `vue-scoped` - inject generated CSS to Vue SFC's `<style scoped>` for isolation
     * - `svelte-scoped` - inject generated CSS to Svelte's `<style>` for isolation
     * - `shadow-dom` - inject generated CSS to `Shadow DOM` css style block for each web component
     *
     * @default 'global'
     */
    mode?: 'global' | 'per-module' | 'vue-scoped' | 'svelte-scoped' | 'dist-chunk' | 'shadow-dom';
}

interface UnocssPluginContext<Config extends UserConfig = UserConfig> {
    ready: Promise<LoadConfigResult<Config>>;
    uno: UnoGenerator;
    tokens: Set<string>;
    modules: BetterMap<string, string>;
    filter: (code: string, id: string) => boolean;
    extract: (code: string, id?: string) => Promise<void>;
    reloadConfig: () => Promise<LoadConfigResult<Config>>;
    getConfig: () => Promise<Config>;
    invalidate: () => void;
    onInvalidate: (fn: () => void) => void;
}

declare function ChunkModeBuildPlugin({ uno, filter }: UnocssPluginContext): Plugin;

declare function GlobalModeDevPlugin({ uno, tokens, onInvalidate, extract, filter }: UnocssPluginContext): Plugin[];

declare function GlobalModeBuildPlugin({ uno, ready, extract, tokens, modules, filter }: UnocssPluginContext): Plugin[];

declare function GlobalModePlugin(ctx: UnocssPluginContext): vite.Plugin[];

declare function PerModuleModePlugin({ uno, filter }: UnocssPluginContext): Plugin;

declare function VueScopedPlugin({ uno, ready }: UnocssPluginContext): Plugin;

declare function SvelteScopedPlugin({ uno, ready }: UnocssPluginContext): Plugin;

declare function defineConfig<Theme extends {}>(config: VitePluginConfig<Theme>): VitePluginConfig<Theme>;
declare function UnocssPlugin(configOrPath?: VitePluginConfig | string, defaults?: UserConfigDefaults): Plugin[];

export { ChunkModeBuildPlugin, GlobalModeBuildPlugin, GlobalModeDevPlugin, GlobalModePlugin, PerModuleModePlugin, SvelteScopedPlugin, UnocssPluginContext, VitePluginConfig, VueScopedPlugin, UnocssPlugin as default, defineConfig };
