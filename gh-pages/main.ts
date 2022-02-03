/* Copyright 2021, vite-plugin-book by Mirone. */

// eslint-disable-next-line import/no-unresolved
import 'vite-plugin-book/style.css';

import { renderBook } from 'vite-plugin-book';

renderBook({
    isProd: import.meta.env.PROD,
    baseUrl: import.meta.env.BASE_URL,
    container: '#doc',
});
