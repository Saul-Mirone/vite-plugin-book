/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

import { nope } from '../utils/helper';
import cx from './Toolbar.module.css';

type ToolbarProps = {
    changed: boolean;
    onSave: () => void;
    onCancel: () => void;
};

const SurfaceButton: FC<{ icon: string; onClick: () => void }> = ({ icon, onClick }) => (
    <div onClick={onClick} className={cx['button']}>
        <span className="material-icons-outlined">{icon}</span>
    </div>
);

export const Toolbar: FC<ToolbarProps> = ({ changed, onSave, onCancel }) => {
    return (
        <div className={cx['container']}>
            {/* <SurfaceButton onClick={onAdd} icon="add" />
            <SurfaceButton onClick={nope} icon="delete" /> */}
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
