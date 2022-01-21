/* Copyright 2021, vite-plugin-book by Mirone. */
import '@unocss/reset/normalize.css';
import 'uno.css';
import './style.css';

import { render } from 'react-dom';

import { Root } from '../component/Root';
import { renderBook } from '../render';

const params = new URLSearchParams(location.search);
if (params.get('preview')) {
    renderBook(location.href.includes('__vite_plugin_book__') ? false : import.meta.env.PROD, '#root');
} else {
    render(<Root />, document.getElementById('root'));
}
