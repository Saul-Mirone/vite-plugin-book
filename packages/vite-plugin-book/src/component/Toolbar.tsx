/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

const ToolbarButton: FC<{ icon: string }> = ({ icon }) => (
    <button className="transition rounded-16px p-8px w-40px h-40px hover:bg-primary hover:text-surface">
        <span className="material-icons-outlined">{icon}</span>
    </button>
);

export const Toolbar: FC = () => {
    return (
        <div className="shadow-lg rounded-28px fixed right-24px bottom-24px bg-surface p-12px flex gap-8px">
            <ToolbarButton icon="add" />
            <ToolbarButton icon="visibility" />
            <ToolbarButton icon="delete" />
            <ToolbarButton icon="cancel" />
            <ToolbarButton icon="check_circle" />
        </div>
    );
};
