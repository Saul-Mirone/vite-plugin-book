import { Plugin } from 'vite';
import { ts, Diagnostic } from 'ts-morph';

interface TransformWriteFile {
    filePath?: string;
    content?: string;
}
interface PluginOptions {
    include?: string | string[];
    exclude?: string | string[];
    root?: string;
    outputDir?: string;
    compilerOptions?: ts.CompilerOptions | null;
    tsConfigFilePath?: string;
    cleanVueFileName?: boolean;
    staticImport?: boolean;
    clearPureImport?: boolean;
    insertTypesEntry?: boolean;
    copyDtsFiles?: boolean;
    noEmitOnError?: boolean;
    skipDiagnostics?: boolean;
    logDiagnostics?: boolean;
    afterDiagnostic?: (diagnostics: Diagnostic[]) => void | Promise<void>;
    beforeWriteFile?: (filePath: string, content: string) => void | TransformWriteFile;
    afterBuild?: () => void | Promise<void>;
}
declare function dtsPlugin(options?: PluginOptions): Plugin;

export { dtsPlugin as default };
