/* Copyright 2021, vite-plugin-book by Mirone. */

import '../dist/render/style.css';

import { renderBook } from '../dist/render';

const app = document.body.querySelector('#root');

renderBook(app as HTMLElement);
