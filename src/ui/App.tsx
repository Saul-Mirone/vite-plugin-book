/* Copyright 2021, vite-plugin-book by Mirone. */

import { Layout } from '../component/Layout';
import { Editor } from './component/Editor';
import { NavBar } from './component/NavBar';

export const App = () => (
    <Layout>
        <NavBar />
        <Editor />
    </Layout>
);
