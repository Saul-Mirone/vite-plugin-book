/* Copyright 2021, vite-plugin-book by Mirone. */

import '../dist/render/style.css';

import { renderBook } from '../dist/render';

renderBook(import.meta.env.PROD, '#root');
