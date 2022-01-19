/* Copyright 2021, vite-plugin-book by Mirone. */
import 'uno.css';
import '@unocss/reset/normalize.css';
import './style.css';

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { renderBook } from '../render';
import { App } from './App';
import { FileProvider } from './provider/FileProvider';
import { RpcProvider } from './provider/RpcProvider';

const Root = () => (
    <StrictMode>
        <HashRouter>
            <RpcProvider>
                <FileProvider>
                    <App />
                </FileProvider>
            </RpcProvider>
        </HashRouter>
    </StrictMode>
);

const params = new URLSearchParams(location.search);
if (params.get('preview')) {
    renderBook(import.meta.env.PROD, '#root');
} else {
    render(<Root />, document.getElementById('root'));
}
