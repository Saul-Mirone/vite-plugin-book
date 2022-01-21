/* Copyright 2021, vite-plugin-book by Mirone. */

// eslint-disable-next-line import/no-unresolved
import 'vite-plugin-book/style.css';

import { renderBook } from 'vite-plugin-book';

renderBook(import.meta.env.PROD, '#root');
