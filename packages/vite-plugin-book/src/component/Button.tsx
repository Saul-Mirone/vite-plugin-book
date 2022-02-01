/* Copyright 2021, vite-plugin-book by Mirone. */
import type { FC } from 'react';

export const Button: FC<{ icon: string; text: string; onClick: () => void }> = ({ icon, text, onClick }) => (
    <button
        onClick={onClick}
        className="cursor-pointer transition appearance-none flex items-center gap-4px py-8px pr-16px pl-8px border border-solid bg-transparent border-secondary rounded-100px text-sm text-secondary hover:border-primary hover:text-primary hover:bg-background"
    >
        <span className="material-icons-outlined text-sm">{icon}</span>
        <span className="text-xs">{text}</span>
    </button>
);
