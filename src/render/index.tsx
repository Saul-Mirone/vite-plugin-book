/* Copyright 2021, vite-plugin-book by Mirone. */

import React from 'react';
import { render } from 'react-dom';

// Pure render for vite plugin book
export function renderBook(container: HTMLElement = document.body) {
    render(<div>Hello render</div>, container);
}
