/* Copyright 2021, vite-plugin-book by Mirone. */
import './style.css';

import { FC } from 'react';
import SplitPane from 'react-split-pane';

import { useUIConfig } from '../../hook/useUIConfig';

export const Layout: FC = ({ children }) => {
    const { menuFold } = useUIConfig();

    return (
        <div className="h-screen w-screen overflow-hidden font-sans">
            <SplitPane
                className="bg-background"
                split="vertical"
                defaultSize={menuFold ? 0 : 280}
                minSize={menuFold ? 0 : 280}
                maxSize={menuFold ? 0 : 400}
                paneStyle={{
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                }}
                pane1Style={{
                    transform: menuFold ? 'translateX(-100%)' : '',
                    transition: 'all 0.2s',
                }}
            >
                {children}
            </SplitPane>
        </div>
    );
};
