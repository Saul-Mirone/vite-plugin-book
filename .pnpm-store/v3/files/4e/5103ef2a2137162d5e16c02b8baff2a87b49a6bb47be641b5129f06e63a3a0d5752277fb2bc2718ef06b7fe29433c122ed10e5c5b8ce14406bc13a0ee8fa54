import { Ctx, CtxHandler, MilkdownPlugin } from '@milkdown/ctx';
/**
 * Get the milkdown editor constructor
 */
export declare class Editor {
    #private;
    /**
     * Create a new editor instance.
     *
     * @returns The new editor instance been created.
     */
    static make(): Editor;
    /**
     * Get the ctx of the editor.
     *
     * @returns The ctx of the editor.
     */
    get ctx(): Ctx;
    /**
     * Use one plugin or a list of plugins for current editor.
     *
     * @example
     * ```
     * Editor.make()
     *   .use(plugin)
     *   .use([pluginA, pluginB])
     * ```
     *
     * @param plugins - A list of plugins, or one plugin.
     * @returns Editor instance.
     */
    readonly use: (plugins: MilkdownPlugin | MilkdownPlugin[]) => this;
    /**
     * Config the context for current editor.
     *
     * @param configure - The function that configure current editor, can be async, with context as parameter.
     * @returns Editor instance.
     */
    readonly config: (configure: CtxHandler) => this;
    /**
     * Create the editor UI.
     *
     * @example
     * ```
     * Editor.make().use(nord).use(commonmark).create()
     * ```
     *
     * @returns A promise object, will be resolved as editor instance after create finish.
     */
    readonly create: () => Promise<this>;
    /**
     * Get the context value in a running editor on demand and return the action result.
     *
     * @example
     * ```
     * import { Editor, editorViewCtx, serializerCtx } from '@milkdown/core';
     * async function playWithEditor() {
     *     const editor = await Editor.make().use(commonmark).create();
     *
     *     const getMarkdown = () =>
     *         editor.action((ctx) => {
     *             const editorView = ctx.get(editorViewCtx);
     *             const serializer = ctx.get(serializerCtx);
     *             return serializer(editorView.state.doc);
     *         });
     *
     *     // get markdown string:
     *     getMarkdown();
     * }
     * ```
     *
     * @param action - The function that get editor context and return the action result.
     * @returns The action result.
     */
    readonly action: <T>(action: (ctx: Ctx) => T) => T;
}
//# sourceMappingURL=editor.d.ts.map