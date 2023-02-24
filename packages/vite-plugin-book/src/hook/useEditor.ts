/* Copyright 2021, vite-plugin-book by Mirone. */

import {
    defaultValueCtx,
    Editor,
    editorCtx,
    editorViewCtx,
    editorViewOptionsCtx,
    rootAttrsCtx,
    rootCtx,
} from '@milkdown/core';
import { clipboard } from '@milkdown/plugin-clipboard';
import { cursor } from '@milkdown/plugin-cursor';
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';
import { indent } from '@milkdown/plugin-indent';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
// eslint-disable-next-line import/no-unresolved
import { Plugin, PluginKey, TextSelection } from '@milkdown/prose/state';
import { useEditor as useMilkdownEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { $prose, outline } from '@milkdown/utils';
import { useCallback, useRef, useState } from 'react';

import { nope } from '../utils/helper';
import { useFile } from './useFile';
import { useOutline } from './useOutline';

export function useEditor(defaultValue: string, readOnly = false) {
    const milkdown = useRef<Editor>();
    const { setChanged } = useFile();
    const [_, setOutline] = useOutline();
    const from = useRef(0);
    const scrollTop = useRef(0);

    const [counter, setCounter] = useState(0);

    const flush = useCallback(() => {
        setCounter((x) => x + 1);
    }, []);

    const { loading, get } = useMilkdownEditor(
        (root) => {
            return Editor.make()
                .config((ctx) => {
                    ctx.set(rootCtx, root);
                    ctx.set(defaultValueCtx, defaultValue);
                    ctx.update(rootAttrsCtx, (prev) => ({
                        ...prev,
                        spellcheck: 'false',
                    }));
                    ctx.update(editorViewOptionsCtx, (prev) => ({
                        ...prev,
                        editable: () => !readOnly,
                    }));
                    ctx.get(listenerCtx)
                        .mounted((ctx) => {
                            setChanged(false);
                            milkdown.current = ctx.get(editorCtx);
                            const view = ctx.get(editorViewCtx);
                            if (view.state) {
                                const data = outline()(ctx);
                                setOutline(data);
                            }

                            const { hash } = location;
                            if (!hash) return;
                            const anchor = document.querySelector(hash);
                            if (anchor) {
                                anchor.scrollIntoView();
                            }
                        })
                        .updated((ctx) => {
                            const view = ctx.get(editorViewCtx);
                            if (view.state) {
                                const data = outline()(ctx);
                                setOutline(data);
                            }
                        })
                        .markdownUpdated((_, markdown) => {
                            setChanged(defaultValue !== markdown);
                        });
                })
                .config(nord)
                .use(listener)
                .use(prism)
                .use(history)
                .use(emoji)
                .use(commonmark)
                .use(gfm)
                .use(cursor)
                .use(clipboard)
                .use(indent)
                .use(
                    $prose(
                        (_) =>
                            new Plugin({
                                key: new PluginKey('position-tracker'),
                                state: {
                                    init: nope,
                                    apply: (tr) => {
                                        from.current = tr.selection.from;
                                    },
                                },
                                view: () => ({
                                    update: (view) => {
                                        scrollTop.current = view.dom.parentElement?.scrollTop ?? 0;
                                    },
                                }),
                            }),
                    ),
                );
        },
        [defaultValue, readOnly, setOutline, counter, setChanged],
    );

    const recoverSelection = useCallback(() => {
        if (loading) return;

        get()?.action((ctx) => {
            const view = ctx.get(editorViewCtx);
            const { state } = view;
            const selection = new TextSelection(state.doc.resolve(from.current));
            view.focus();
            view.dom.parentElement?.scrollTo(0, scrollTop.current);
            view.dispatch(state.tr.setSelection(selection));
        });
    }, [get, loading]);

    return {
        loading,
        get,
        flush,
        recoverSelection,
    };
}
