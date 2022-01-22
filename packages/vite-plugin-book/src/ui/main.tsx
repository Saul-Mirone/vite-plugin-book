/* Copyright 2021, vite-plugin-book by Mirone. */
import '@unocss/reset/normalize.css';
import 'uno.css';
import './style.css';

import { render } from 'react-dom';

import { Root } from '../component/Root';

render(<Root />, document.getElementById('root'));
