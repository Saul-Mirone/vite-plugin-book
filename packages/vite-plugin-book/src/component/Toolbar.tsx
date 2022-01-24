/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

import { SurfaceButton } from './Button';

export const Toolbar: FC = () => {
    return (
        <div className="shadow-lg rounded-28px fixed right-24px bottom-24px bg-surface p-12px flex gap-8px">
            <SurfaceButton icon="add" />
            <SurfaceButton icon="delete" />
            <SurfaceButton icon="visibility" />
            <SurfaceButton icon="check_circle" />
            <SurfaceButton icon="cancel" />
        </div>
    );
};
