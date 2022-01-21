/* Copyright 2021, vite-plugin-book by Mirone. */

import './Layout.css';

import { FC } from 'react';
import SplitPane from 'react-split-pane';

export const Layout: FC = ({ children }) => {
    return (
        <div className="h-screen w-screen overflow-hidden font-mono">
            <SplitPane className="bg-background" split="vertical" defaultSize="16rem" minSize={200} maxSize={400}>
                {children}
            </SplitPane>
        </div>
    );
};
