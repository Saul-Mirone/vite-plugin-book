/* Copyright 2021, vite-plugin-book by Mirone. */
import 'uno.css';
import '@unocss/reset/normalize.css';
import './style.css';

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { renderBook } from '../render';
import { App } from './App';
import { FileProvider } from './provider/FileProvider';
import { RpcProvider } from './provider/RpcProvider';

const Root = () => (
    <StrictMode>
        <BrowserRouter>
            <RpcProvider>
                <FileProvider>
                    <App />
                </FileProvider>
            </RpcProvider>
        </BrowserRouter>
    </StrictMode>
);

if (location.href.includes('preview')) {
    renderBook('#root');
} else {
    render(<Root />, document.getElementById('root'));
}
