/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

import { useMode } from '../hook/useMode';

type ToolbarProps = {
    changed: boolean;
    onEdit: () => void;
    onPreview: () => void;
    onSave: () => void;
    onCancel: () => void;
};

const SurfaceButton: FC<{ icon: string; onClick: () => void }> = ({ icon, onClick }) => (
    <div onClick={onClick} className="cursor-pointer transition rounded-2xl p-2 w-10 h-10 box-border text-nord0">
        <span className="material-icons-outlined">{icon}</span>
    </div>
);

export const Toolbar: FC<ToolbarProps> = ({ changed, onSave, onCancel, onPreview, onEdit }) => {
    const mode = useMode();
    return (
        <div className="transition shadow-lg rounded-3xl fixed right-6 bottom-6 bg-white p-3 flex gap-2 hover:bg-gray-100">
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
