/* Copyright 2021, vite-plugin-book by Mirone. */

import { renderBook } from '../dist/render';

const app = document.body.querySelector('#root');

renderBook(app as HTMLElement);
