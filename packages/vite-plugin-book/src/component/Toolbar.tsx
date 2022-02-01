/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

import { useMode } from '../hook/useMode';
import cx from './Toolbar.module.css';

type ToolbarProps = {
    changed: boolean;
    onEdit: () => void;
    onPreview: () => void;
    onSave: () => void;
    onCancel: () => void;
};

const SurfaceButton: FC<{ icon: string; onClick: () => void }> = ({ icon, onClick }) => (
    <div onClick={onClick} className={cx['button']}>
        <span className="material-icons-outlined">{icon}</span>
    </div>
);

export const Toolbar: FC<ToolbarProps> = ({ changed, onSave, onCancel, onPreview, onEdit }) => {
    const mode = useMode();
    return (
        <div className={cx['container']}>
            {mode === 'editable' && <SurfaceButton onClick={onPreview} icon="visibility" />}
            {mode === 'preview' && <SurfaceButton onClick={onEdit} icon="edit" />}
            {changed && (
                <>
                    <SurfaceButton onClick={onSave} icon="check_circle" />
                    <SurfaceButton onClick={onCancel} icon="cancel" />
                </>
            )}
        </div>
    );
};
