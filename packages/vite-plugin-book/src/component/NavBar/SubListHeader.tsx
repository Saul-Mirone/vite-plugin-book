/* Copyright 2021, vite-plugin-book by Mirone. */
import clsx from 'clsx';
import { Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useActive } from '../../hook/useActive';
import { useDelete } from '../../hook/useDelete';
import { useDialog } from '../../hook/useDialog';
import { useFile } from '../../hook/useFile';
import { useMode } from '../../hook/useMode';
import { transformName } from '../../utils/helper';
import { DraggingCtx } from '.';
import { IconButton } from './IconButton';

type SubListHeaderProps = {
    name: string;
    url: string;
    hasIndex: boolean;
    children: ReactNode;
};

const DeleteGroupDesc = () => (
    <div>
        <p>Are you sure you want to do this?</p>
        <div className="text-sm mt-2 text-neutral text-opacity-60">All contents in this folder will be deleted.</div>
    </div>
);

const ButtonGroup: FC<{ url: string; spread: boolean; setSpread: Dispatch<SetStateAction<boolean>> }> = ({
    url,
    spread,
    setSpread,
}) => {
    const { show, hide } = useDialog();
    const mode = useMode();
    const onDelete = useDelete(url);

    return (
        <div className="flex items-center gap-1 flex-shrink-0">
            {spread && mode === 'editable' && (
                <IconButton
                    type="delete_outline"
                    onClick={() => {
                        show({
                            icon: 'delete',
                            title: 'Delete the menu',
                            description: <DeleteGroupDesc />,
                            onConfirm: onDelete,
                            onCancel: hide,
                        });
                    }}
                />
            )}
            <IconButton
                type={!spread ? 'expand' : 'unfold_less'}
                onClick={() => {
                    setSpread(!spread);
                }}
            />
        </div>
    );
};

export const SubListHeader: FC<SubListHeaderProps> = ({ hasIndex, url, name, children }) => {
    const { isActive } = useActive(url);
    const { pathname } = useLocation();
    const [spread, setSpread] = useState(pathname.includes(url));
    const dragging = useContext(DraggingCtx);
    const { setUrl } = useFile();

    useEffect(() => {
        if (isActive) return;
        // setSpread(pathname.includes(url));
    }, [isActive, pathname, url]);

    const onClickHeader = () => {
        setUrl(url);
        setSpread(true);
    };

    return (
        <li>
            <div
                className={clsx(
                    'cursor-pointer rounded-lg py-4 pl-6 pr-2 flex justify-between items-center truncate w-full hover:text-nord10 hover:dark:text-nord9',
                    !dragging && 'hover:bg-slate-200 dark:hover:bg-slate-700',
                    isActive && 'bg-slate-300 dark:bg-slate-600',
                )}
                onClick={onClickHeader}
            >
                <div className={clsx('flex h-6 w-[calc(100%-28px)]', spread && 'w-[calc(100%-60px)]')}>
                    <span
                        className={clsx(
                            'leading-6 cursor-pointer no-undeline w-full truncate text-sm',
                            !dragging && 'hover:text-nord10 hover:dark:text-nord9',
                            isActive && 'text-nord10 dark:text-nord9',
                        )}
                        onClick={() => hasIndex && setUrl(url)}
                    >
                        {transformName(name)}
                    </span>
                </div>
                <ButtonGroup url={url} spread={spread} setSpread={setSpread} />
            </div>
            {spread && <>{children}</>}
        </li>
    );
};
