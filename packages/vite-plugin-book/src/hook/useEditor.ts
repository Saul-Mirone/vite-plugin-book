/* Copyright 2021, vite-plugin-book by Mirone. */

import { defaultValueCtx, Editor, editorCtx, editorViewCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/core';
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
import { nord } from '@milkdown/theme-nord';
import { $prose, outline } from '@milkdown/utils';
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { nope } from '../utils/helper';
import { useFile } from './useFile';
import { useOutline } from './useOutline';

export function useEditor(containerRef: RefObject<HTMLElement>, defaultValue: string, readOnly = false) {
    const milkdown = useRef<Editor>();
    const [status, setStatus] = useState<'loading' | 'loaded'>('loading');
    const { setChanged } = useFile();
    const [_, setOutline] = useOutline();
    const [editorValue, setEditorValue] = useState(defaultValue);
    const from = useRef(0);
    const scrollTop = useRef(0);

    const [flag, setFlag] = useState(false);

    const flush = useCallback(() => {
        setFlag((x) => !x);
    }, []);

    useEffect(() => {
        const ref = containerRef.current;
        if (!ref) return;
        const editor = Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, ref);
                ctx.set(defaultValueCtx, defaultValue);
                ctx.update(editorViewOptionsCtx, (prev) => ({
                    ...prev,
                    editable: () => !readOnly,
                }));
                ctx.get(listenerCtx)
                    .mounted((ctx) => {
                        setChanged(false);
                        setStatus('loaded');
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
                        setEditorValue(markdown);
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
            )
            .create();

        return () => {
            editor
                .then(($) =>
                    $.action((ctx) => {
                        ctx.get(editorViewCtx).destroy();
                        if (!ref) return;
                        ref.innerHTML = '';
                    }),
                )
                .catch(nope);
        };
    }, [containerRef, defaultValue, readOnly, setOutline, flag, setChanged]);

    const get = useCallback(() => {
        const $ = milkdown.current;
        if (status !== 'loaded' || !$) return;

        return editorValue;
    }, [editorValue, status]);

    const recoverSelection = useCallback(() => {
        const $ = milkdown.current;
        if (status !== 'loaded' || !$) return;

        $.action((ctx) => {
            const view = ctx.get(editorViewCtx);
            const { state } = view;
            const selection = new TextSelection(state.doc.resolve(from.current));
            view.focus();
            view.dom.parentElement?.scrollTo(0, scrollTop.current);
            view.dispatch(state.tr.setSelection(selection));
        });
    }, [status]);

    return useMemo(
        () => ({
            status,
            milkdown: milkdown.current,
            get,
            flush,
            recoverSelection,
        }),
        [status, get, flush, recoverSelection],
    );
}
