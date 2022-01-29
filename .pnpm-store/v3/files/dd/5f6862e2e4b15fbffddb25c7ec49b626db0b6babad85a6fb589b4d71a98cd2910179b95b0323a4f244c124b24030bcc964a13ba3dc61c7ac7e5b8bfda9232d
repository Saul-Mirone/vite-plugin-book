import { UserConfig } from '@unocss/core';
import { LoadConfigSource, LoadConfigResult } from 'unconfig';
export { LoadConfigResult, LoadConfigSource } from 'unconfig';

declare function createConfigLoader<U extends UserConfig>(configOrPath?: string | U, extraConfigSources?: LoadConfigSource[]): () => Promise<LoadConfigResult<U>>;
declare function loadConfig<U extends UserConfig>(dirOrPath: string | U): Promise<LoadConfigResult<U>>;

export { createConfigLoader, loadConfig };
