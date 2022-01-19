/* Copyright 2021, vite-plugin-book by Mirone. */

import 'uno.css';

import { render } from 'react-dom';

import { FileProvider } from '../ui/provider/FileProvider';
import { RpcProvider } from '../ui/provider/RpcProvider';
import { App } from './App';

function getRoot(container?: Element | string) {
    if (!container) {
        const root = document.createElement('div');
        document.body.appendChild(root);
        return root;
    }

    if (typeof container === 'string') {
        const target = document.querySelector(container);
        if (target) {
            return target;
        }
        console.error('Cannot get element using selector: ', container);
        const root = document.createElement('div');
        document.body.appendChild(root);
        return root;
    }

    return container;
}

// Pure render for vite plugin book
export function renderBook(prod: boolean, container?: Element | string) {
    render(
        <FileProvider>
            <RpcProvider>
                <App />
            </RpcProvider>
        </FileProvider>,
        getRoot(container),
    );
}