/* Copyright 2021, vite-plugin-book by Mirone. */

import {
    defaultValueCtx,
    Editor,
    editorCtx,
    editorStateCtx,
    editorViewCtx,
    editorViewOptionsCtx,
    rootCtx,
} from '@milkdown/core';
import { cursor } from '@milkdown/plugin-cursor';
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { slash } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { gfm } from '@milkdown/preset-gfm';
import { TextSelection } from '@milkdown/prose';
import { nordDark, nordLight } from '@milkdown/theme-nord';
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { nope } from '../utils/helper';
import { useFile } from './useFile';
import { useOutline } from './useOutline';
import { useUIConfig } from './useUIConfig';

export function useEditor(containerRef: RefObject<HTMLElement>, defaultValue: string, readOnly = false) {
    const milkdown = useRef<Editor>();
    const [status, setStatus] = useState<'loading' | 'loaded'>('loading');
    const { setChanged } = useFile();
    const [_, setOutline] = useOutline();
    const [editorValue, setEditorValue] = useState(defaultValue);
    const { isDarkMode } = useUIConfig();
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
                ctx.set(editorViewOptionsCtx, {
                    editable: () => !readOnly,
                });
                ctx.get(listenerCtx)
                    .mounted((ctx) => {
                        setChanged(false);
                        setStatus('loaded');
                        milkdown.current = ctx.get(editorCtx);
                        const doc = ctx.get(editorStateCtx).doc;
                        const data: { text: string; level: number }[] = [];
                        doc.descendants((node) => {
                            if (node.type.name === 'heading' && node.attrs['level']) {
                                data.push({ text: node.textContent, level: node.attrs['level'] });
                            }
                        });
                        setOutline(data);
                    })
                    .updated((ctx, doc) => {
                        const view = ctx.get(editorViewCtx);
                        from.current = view.state.selection.from;
                        scrollTop.current = view.dom.parentElement?.scrollTop ?? 0;

                        const data: { text: string; level: number }[] = [];
                        doc.descendants((node) => {
                            if (node.type.name === 'heading' && node.attrs['level']) {
                                data.push({ text: node.textContent, level: node.attrs['level'] });
                            }
                        });
                        setOutline(data);
                    })
                    .markdownUpdated((_, markdown) => {
                        setChanged(defaultValue !== markdown);
                        setEditorValue(markdown);
                    });
            })
            .use(isDarkMode ? nordDark : nordLight)
            .use(listener)
            .use(prism)
            .use(history)
            .use(emoji)
            .use(gfm)
            .use(slash)
            .use(tooltip)
            .use(cursor)
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
    }, [containerRef, defaultValue, readOnly, setOutline, flag, isDarkMode, setChanged]);

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
