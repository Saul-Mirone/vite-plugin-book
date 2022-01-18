/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

import { useFile } from './useFile';

export const Editor: FC = () => {
    const [file] = useFile();

    return <div>{file}</div>;
};
