/* Copyright 2021, vite-plugin-book by Mirone. */
import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { useOutline } from '../../hook/useOutline';

type OutlineItem = {
    text: string;
    active?: boolean;
    level: number;
};
export type OutlineList = OutlineItem[];

const NestedDiv: FC<{ level: number; children: ReactNode }> = ({ level, children }) => {
    if (level === 0) {
        return <>{children}</>;
    }

    return (
        <div className="pl-2">
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
                const url = '#' + item.id;
                return (
                    <div className="pl-2">
                        <div className="border-l-solid">
                            <NestedDiv level={item.level}>
                                <div className="cursor-pointer leading-5 pl-4 py-3 bg-transparent hover:text-nord10 hover:dark:text-nord9">
                                    <a
                                        href={url}
                                        className={clsx(
                                            'no-underline',
                                            location.hash === url && 'text-nord10 dark:text-nord9',
                                        )}
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
