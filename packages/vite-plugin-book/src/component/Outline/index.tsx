/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useOutline } from '../../hook/useOutline';
import cx from './Outline.module.css';

type OutlineItem = {
    text: string;
    active?: boolean;
    level: number;
};
export type OutlineList = OutlineItem[];

const NestedDiv: FC<{ level: number }> = ({ level, children }) => {
    if (level === 0) {
        return <>{children}</>;
    }

    return (
        <div className="pl-10px">
            <NestedDiv level={level - 1}>{children}</NestedDiv>
        </div>
    );
};

export const Outline: FC = () => {
    const location = useLocation();
    const [data] = useOutline();
    return (
        <div>
            {data.map((item) => {
                const url = '#' + item.text.toLowerCase().split(' ').join('-');
                return (
                    <div className="pl-10px">
                        <div className={cx['container']}>
                            <NestedDiv level={item.level}>
                                <div className={cx['item']}>
                                    <a
                                        href={url}
                                        className={`no-underline truncate text-sm block pl-16px py-8px leading-20px hover:text-primary ${
                                            location.hash === url ? 'text-primary' : ''
                                        }`}
                                    >
                                        {item.text}
                                    </a>
                                </div>
                            </NestedDiv>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
