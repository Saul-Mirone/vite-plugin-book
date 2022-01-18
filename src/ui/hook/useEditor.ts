/* Copyright 2021, vite-plugin-book by Mirone. */

import { Editor, editorCtx, editorViewCtx, parserCtx, rootCtx, serializerCtx } from '@milkdown/core';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { slash } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { gfm } from '@milkdown/preset-gfm';
import { Slice } from '@milkdown/prose';
import { nordLight } from '@milkdown/theme-nord';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export function useEditor(containerRef: RefObject<HTMLElement>) {
    const milkdown = useRef<Editor>();
    const [status, setStatus] = useState<'loading' | 'loaded'>('loading');
    useEffect(() => {
        const ref = containerRef.current;
        if (!ref) return;
        Editor.make()
            .config((ctx) => {
                ctx.set(rootCtx, ref);
                ctx.get(listenerCtx).mounted((ctx) => {
                    setStatus('loaded');
                    milkdown.current = ctx.get(editorCtx);
                });
            })
            .use(nordLight)
            .use(listener)
            .use(gfm)
            .use(slash)
            .use(tooltip)
            .create();

        return () => {
            if (!ref) return;
            ref.innerHTML = '';
        };
    }, [containerRef]);

    const set = useCallback(
        (markdown = '') => {
            const $ = milkdown.current;
            if (status !== 'loaded' || !$) return;

            $.action((ctx) => {
                const view = ctx.get(editorViewCtx);
                const parser = ctx.get(parserCtx);
                const doc = parser(markdown);

                if (!doc) return;
                const { state } = view;
                view.dispatch(
                    state.tr.replace(0, state.doc.content.size, new Slice(doc.content, 0, 0)).scrollIntoView(),
                );
            });
        },
        [status],
    );

    const get = useCallback(() => {
        const $ = milkdown.current;
        if (status !== 'loaded' || !$) return;

        return $.action((ctx) => {
            const view = ctx.get(editorViewCtx);
            const serializer = ctx.get(serializerCtx);
            return serializer(view.state.doc);
        });
    }, [status]);

    return {
        status,
        milkdown: milkdown.current,
        set,
        get,
    };
}
