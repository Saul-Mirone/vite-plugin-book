/* Copyright 2021, vite-plugin-book by Mirone. */
import 'uno.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { RpcProvider } from './RpcProvider';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <RpcProvider>
                <App />
            </RpcProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
