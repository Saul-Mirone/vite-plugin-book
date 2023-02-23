/* Copyright 2021, vite-plugin-book by Mirone. */

import HashLoader from 'react-spinners/HashLoader';

import { useFile } from '../hook/useFile';

export const Loading = () => {
    const { loading } = useFile();

    if (!loading) {
        return null;
    }

    return (
        <div className="flex justify-center items-center absolute w-full h-full top-0 left-0 z-10 bg-gray-50">
            <HashLoader color="#5e81ac" size={80} />
        </div>
    );
};
