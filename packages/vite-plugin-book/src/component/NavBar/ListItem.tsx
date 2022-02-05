/* Copyright 2021, vite-plugin-book by Mirone. */
import { FC, memo, useContext } from 'react';

import { useActive } from '../../hook/useActive';
import { useDelete } from '../../hook/useDelete';
import { useDialog } from '../../hook/useDialog';
import { useFile } from '../../hook/useFile';
import { useMode } from '../../hook/useMode';
import { transformName } from '../../utils/helper';
import { DraggingCtx } from '.';
import { IconButton } from './IconButton';
import cx from './ListItem.module.css';

type ListItemProps = {
    name: string;
    url: string;
};

const ButtonGroup: FC<{ isActive: boolean; url: string }> = ({ isActive, url }) => {
    const { show, hide } = useDialog();
    const mode = useMode();
    const onDelete = useDelete(url);

    return (
        <>
            {isActive && mode === 'editable' && (
                <IconButton
                    type="remove_circle_outline"
                    onClick={() => {
                        show({
                            icon: 'delete',
                            title: 'Delete the menu',
                            description: (
                                <div className="text-neutral">
                                    <p>Are you sure you want to do this?</p>
                                    <div className="text-sm mt-2 text-neutral text-opacity-60">
                                        You file will be deleted.
                                    </div>
                                </div>
                            ),
                            onConfirm: onDelete,
                            onCancel: hide,
                        });
                    }}
                />
            )}
        </>
    );
};

export const ListItem: FC<ListItemProps> = memo(({ url, name }) => {
    const dragging = useContext(DraggingCtx);
    const { isActive } = useActive(url);
    const { setUrl } = useFile();
    return (
        <li
            className={`${cx['list-item-container']} ${dragging ? '' : cx['not-dragging']} ${
                isActive ? cx['active'] : ''
            }`}
        >
            <span
                className={`${cx['list-item']} ${dragging ? '' : cx['not-dragging']} ${
                    isActive ? cx['active'] : cx['inactive']
                }`}
                onClick={() => setUrl(url)}
            >
                <span className={cx['list-item-text']}>{transformName(name)}</span>
                <ButtonGroup isActive={isActive} url={url} />
            </span>
        </li>
    );
});
