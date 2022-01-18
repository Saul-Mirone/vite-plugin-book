/* Copyright 2021, vite-plugin-book by Mirone. */
import 'uno.css';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { FileProvider } from './provider/FileProvider';
import { RpcProvider } from './provider/RpcProvider';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <RpcProvider>
                <FileProvider>
                    <App />
                </FileProvider>
            </RpcProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
