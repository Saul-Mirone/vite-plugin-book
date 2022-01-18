/* Copyright 2021, vite-plugin-book by Mirone. */
import 'uno.css';
import '@unocss/reset/normalize.css';
import './style.css';

import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { FileProvider } from './provider/FileProvider';
import { RpcProvider } from './provider/RpcProvider';

// console.log(window.__vite_plugin_doc__);

render(
    <StrictMode>
        <BrowserRouter>
            <RpcProvider>
                <FileProvider>
                    <App />
                </FileProvider>
            </RpcProvider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root'),
);
