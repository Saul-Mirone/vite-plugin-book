/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

import { nope } from '../utils/helper';
import { SurfaceButton } from './Button';

type ToolbarProps = {
    changed: boolean;
    onAdd: () => void;
    onSave: () => void;
    onCancel: () => void;
};

export const Toolbar: FC<ToolbarProps> = ({ changed, onSave, onCancel, onAdd }) => {
    return (
        <div className="shadow-lg rounded-28px fixed right-24px bottom-24px bg-surface p-12px flex gap-8px">
            <SurfaceButton onClick={onAdd} icon="add" />
            <SurfaceButton onClick={nope} icon="delete" />
            <SurfaceButton onClick={nope} icon="visibility" />
            {changed && (
                <>
                    <SurfaceButton onClick={onSave} icon="check_circle" />
                    <SurfaceButton onClick={onCancel} icon="cancel" />
                </>
            )}
        </div>
    );
};
