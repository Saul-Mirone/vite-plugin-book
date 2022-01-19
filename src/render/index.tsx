/* Copyright 2021, vite-plugin-book by Mirone. */

import 'uno.css';

import { render } from 'react-dom';

import { App } from './App';

// Pure render for vite plugin book
export function renderBook(container: HTMLElement = document.body) {
    render(<App />, container);
}
