/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC } from 'react';

type OutlineItem = {
    text: string;
    active?: boolean;
    list?: OutlineItem[];
};
type OutlineList = OutlineItem[];

const mockData: OutlineList = [
    {
        text: 'More pages',
        list: [
            {
                text: 'Sidebar',
                active: true,
            },
            {
                text: 'Config',
            },
        ],
    },
    {
        text: 'Redesign',
    },
];

export const Outline: FC<{ data?: OutlineList }> = ({ data = mockData }) => {
    return (
        <div>
            {data.map((item) => {
                return (
                    <div className="pl-10px">
                        <div className="pl-10px border-l">
                            <div
                                className={`${
                                    item.active ? 'bg-secondary' : ''
                                } bg-opacity-12 cursor-pointer hover:bg-primary hover:bg-opacity-38`}
                            >
                                <span className="truncate text-sm block pl-16px py-8px leading-20px text-neutral text-opacity-78 hover:text-primary">
                                    {item.text}
                                </span>
                            </div>
                        </div>
                        {item.list && <Outline data={item.list} />}
                    </div>
                );
            })}
        </div>
    );
};
