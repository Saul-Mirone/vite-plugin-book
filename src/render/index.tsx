/* Copyright 2021, vite-plugin-book by Mirone. */

import React from 'react';
import { render } from 'react-dom';

import { FileProvider } from '../ui/provider/FileProvider';

// Pure render for vite plugin book
export function renderBook(container: HTMLElement = document.body) {
    render(
        <FileProvider>
            <div>Hello render</div>
        </FileProvider>,
        container,
    );
}
