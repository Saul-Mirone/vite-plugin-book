/* Copyright 2021, vite-plugin-book by Mirone. */
import './style.css';

import { FC, ReactNode, useState } from 'react';
import SplitPane from 'react-split-pane';

import { useUIConfig } from '../../hook/useUIConfig';

export const Layout: FC = ({ children }) => {
    const { menuFold, isMobile, setMenuFold } = useUIConfig();
    const [onDrag, setOnDrag] = useState(false);
    const [nav = null, main = null] = children as ReactNode[];

    if (isMobile) {
        return (
            <div className="h-screen w-screen overflow-hidden font-sans">
                <div className={`mobile-nav ${menuFold ? 'fold' : ''}`}>{nav}</div>
                {!menuFold && <div className="mobile-mask" onClick={() => setMenuFold(true)} />}
                {main}
            </div>
        );
    }

    return (
        <div className="h-screen w-screen overflow-hidden font-sans">
            <SplitPane
                onDragStarted={() => setOnDrag(true)}
                onDragFinished={() => setOnDrag(false)}
                className="bg-background"
                split="vertical"
                defaultSize={menuFold ? 0 : 280}
                minSize={menuFold ? 0 : 280}
                maxSize={menuFold ? 0 : 400}
                paneStyle={{
                    overflow: 'hidden',
                    transition: onDrag ? '' : 'all 0.2s',
                }}
                pane1Style={{
                    transform: menuFold ? 'translateX(-100%)' : '',
                    transition: onDrag ? '' : 'all 0.2s',
                }}
            >
                {children}
            </SplitPane>
        </div>
    );
};
