/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useOutline } from '../../hook/useOutline';

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
                        <div className={`border-l`}>
                            <NestedDiv level={item.level}>
                                <div className={'bg-opacity-12 cursor-pointer hover:bg-secondary'}>
                                    <a
                                        href={url}
                                        className={`truncate text-sm block pl-16px py-8px leading-20px text-opacity-78 hover:text-primary ${
                                            location.hash === url ? 'text-primary' : 'text-neutral'
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
