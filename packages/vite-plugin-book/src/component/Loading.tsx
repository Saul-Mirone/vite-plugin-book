/* Copyright 2021, vite-plugin-book by Mirone. */

import HashLoader from 'react-spinners/HashLoader';

import { useFile } from '../hook/useFile';
import cx from './Loading.module.css';

export const Loading = () => {
    const { loading } = useFile();

    if (!loading) {
        return null;
    }

    return (
        <div className={`${cx['container']}`}>
            <HashLoader color="#5e81ac" />
        </div>
    );
};
