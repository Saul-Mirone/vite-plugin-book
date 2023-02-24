/* Copyright 2021, vite-plugin-book by Mirone. */
import clsx from 'clsx';
import { FC, memo } from 'react';

import { useActive } from '../../hook/useActive';
import { useDelete } from '../../hook/useDelete';
import { useDialog } from '../../hook/useDialog';
import { useFile } from '../../hook/useFile';
import { useMode } from '../../hook/useMode';
import { transformName } from '../../utils/helper';
import { IconButton } from './IconButton';

type ListItemProps = {
    name: string;
    url: string;
};

const ButtonGroup: FC<{ isActive: boolean; url: string }> = ({ isActive, url }) => {
    const { show, hide } = useDialog();
    const mode = useMode();
    const onDelete = useDelete(url);
    const onClick = () => {
        show({
            icon: 'delete',
            title: 'Delete the menu',
            description: (
                <div>
                    <p>Are you sure you want to do this?</p>
                    <div className="text-sm mt-2 text-neutral text-opacity-60">You file will be deleted.</div>
                </div>
            ),
            onConfirm: onDelete,
            onCancel: hide,
        });
    };

    return <>{isActive && mode === 'editable' && <IconButton type="remove_circle_outline" onClick={onClick} />}</>;
};

export const ListItem: FC<ListItemProps> = memo(({ url, name }) => {
    const { isActive } = useActive(url);
    const { setUrl } = useFile();

    return (
        <li
            className={clsx(
                'cursor-pointer rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700',
                isActive && 'bg-gray-100 dark:bg-gray-600',
            )}
        >
            <span
                className={clsx(
                    'pl-6 pr-2 h-14 py-4 no-underline text-sm flex justify-between items-center',
                    isActive && 'text-nord10 dark:text-nord9',
                )}
                onClick={() => setUrl(url)}
            >
                <span className="truncate w-[calc(100% - 28px)]">{transformName(name)}</span>
                <ButtonGroup isActive={isActive} url={url} />
            </span>
        </li>
    );
});
