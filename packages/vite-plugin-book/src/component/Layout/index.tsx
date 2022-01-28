/* Copyright 2021, vite-plugin-book by Mirone. */
import './style.css';

import { FC } from 'react';
import SplitPane from 'react-split-pane';

export const Layout: FC = ({ children }) => {
    return (
        <div className="h-screen w-screen overflow-hidden font-sans">
            <SplitPane
                className="bg-background"
                split="vertical"
                defaultSize={280}
                minSize={280}
                maxSize={400}
                paneStyle={{ overflow: 'hidden' }}
            >
                {children}
            </SplitPane>
        </div>
    );
};
