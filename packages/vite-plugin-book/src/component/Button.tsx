/* Copyright 2021, vite-plugin-book by Mirone. */
import type { FC } from 'react';

export const Button: FC<{ icon: string; text: string; onClick: () => void }> = ({ icon, text, onClick }) => (
    <button
        onClick={onClick}
        className="transition flex items-center gap-8px py-10px pr-24px pl-16px border border-secondary rounded-100px text-sm text-secondary hover:border-primary hover:text-primary hover:bg-background"
    >
        <span className="material-icons-outlined text-sm">{icon}</span>
        <span className="text-sm">{text}</span>
    </button>
);

export const SurfaceButton: FC<{ icon: string; onClick: () => void }> = ({ icon, onClick }) => (
    <div
        onClick={onClick}
        className="cursor-pointer transition rounded-16px p-8px w-40px h-40px hover:bg-primary hover:text-surface box-border"
    >
        <span className="material-icons-outlined">{icon}</span>
    </div>
);
