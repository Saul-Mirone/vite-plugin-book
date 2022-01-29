/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useActive } from '../../hook/useActive';
import { useDialog } from '../../hook/useDialog';
import { nope, transformName } from '../../utils/helper';
import { DraggingCtx } from '.';
import { IconButton } from './IconButton';

type SubListHeaderProps = {
    name: string;
    url: string;
    onClick: (url: string) => void;
    hasIndex: boolean;
};

export const SubListHeader: FC<SubListHeaderProps> = ({ hasIndex, url, name, children, onClick }) => {
    const { to, isActive } = useActive(url);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [spread, setSpread] = useState(pathname.includes(url));
    const dragging = useContext(DraggingCtx);
    const { show, hide } = useDialog();

    useEffect(() => {
        if (isActive) return;
        setSpread(pathname.includes(url));
    }, [isActive, pathname, url]);

    return (
        <li>
            <div
                className={`transition cursor-pointer rounded-8px ${
                    dragging ? '' : 'hover:bg-primary hover:bg-opacity-38'
                } transition py-18px pl-24px pr-8px text-neutral flex justify-between items-center ${
                    hasIndex ? 'hover:text-primary' : ''
                }`}
                onClick={() => {
                    onClick(url);
                    setSpread(!spread);
                    if (hasIndex) {
                        navigate(to);
                    }
                }}
            >
                <div className="flex h-24px">
                    <span
                        className={`leading-24px cursor-pointer no-underline text-sm hover:text-primary hover:text-opacity-100 ${
                            isActive ? 'text-primary text-opacity-100' : ' text-neutral text-opacity-60'
                        }`}
                        onClick={() => hasIndex && onClick(url)}
                    >
                        {transformName(name)}
                    </span>
                </div>
                <div className="flex items-center gap-4px">
                    {spread && (
                        <>
                            <IconButton
                                type="delete_outline"
                                onClick={() => {
                                    show({
                                        icon: 'delete',
                                        title: 'Delete the menu',
                                        description: (
                                            <div className="text-neutral">
                                                <p>Are you sure you want to do this?</p>
                                                <div className="text-sm mt-2 text-neutral text-opacity-60">
                                                    All contents in this folder will be deleted.
                                                </div>
                                            </div>
                                        ),
                                        onConfirm: () => {
                                            // TODO: delete folder
                                            hide();
                                        },
                                        onCancel: () => {
                                            hide();
                                        },
                                    });
                                }}
                            />
                        </>
                    )}
                    <IconButton type={!spread ? 'expand' : 'unfold_less'} onClick={nope} />
                </div>
            </div>
            {spread && <>{children}</>}
        </li>
    );
};
