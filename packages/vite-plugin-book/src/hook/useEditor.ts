/* Copyright 2021, vite-plugin-book by Mirone. */

import {
    defaultValueCtx,
    Editor,
    editorCtx,
    editorStateCtx,
    editorViewCtx,
    editorViewOptionsCtx,
    parserCtx,
    rootCtx,
    serializerCtx,
} from '@milkdown/core';
import { history } from '@milkdown/plugin-history';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { slash } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { gfm } from '@milkdown/preset-gfm';
import { Slice } from '@milkdown/prose';
import { nordLight } from '@milkdown/theme-nord';
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useOutline } from './useOutline';

export function useEditor(containerRef: RefObject<HTMLElement>, defaultValue: string, readOnly = false) {
    const milkdown = useRef<Editor>();
    const [status, setStatus] = useState<'loading' | 'loaded'>('loading');
    const [changed, setChanged] = useState(false);
    const [_, setOutline] = useOutline();
    const [editorValue, setEditorValue] = useState(defaultValue);

    const [flag, setFlag] = useState(false);

    const flush = useCallback(() => {
        setFlag((x) => !x);
    }, []);

    useEffect(() => {
        const ref = containerRef.current;
        if (!ref) return;
        Editor.make()
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
                            if (node.type.name === 'heading' && node.attrs.level) {
                                data.push({ text: node.textContent, level: node.attrs.level });
                            }
                        });
                        setOutline(data);
                    })
                    .markdownUpdated((_, markdown) => {
                        setChanged(defaultValue !== markdown);
                        setEditorValue(markdown);
                    });
            })
            .use(nordLight)
            .use(listener)
            .use(prism)
            .use(history)
            .use(gfm)
            .use(slash)
            .use(tooltip)
            .create();

        return () => {
            if (!ref) return;
            ref.innerHTML = '';
        };
    }, [containerRef, defaultValue, readOnly, setOutline, flag]);

    const get = useCallback(() => {
        const $ = milkdown.current;
        if (status !== 'loaded' || !$) return;

        return editorValue;
    }, [editorValue, status]);

    return useMemo(
        () => ({
            status,
            changed,
            milkdown: milkdown.current,
            get,
            flush,
        }),
        [status, changed, get, flush],
    );
}
