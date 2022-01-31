/* Copyright 2021, vite-plugin-book by Mirone. */
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useActive } from '../../hook/useActive';
import { useConfig } from '../../hook/useConfig';
import { useDialog } from '../../hook/useDialog';
import { useFile } from '../../hook/useFile';
import { useMode } from '../../hook/useMode';
import { useRpc } from '../../hook/useRpc';
import { RouteBaseCtx } from '../../provider/RouteBaseProvider';
import { transformName } from '../../utils/helper';
import { DraggingCtx } from '.';
import { IconButton } from './IconButton';
import cx from './SubListHeader.module.css';

type SubListHeaderProps = {
    name: string;
    url: string;
    hasIndex: boolean;
};

const DeleteGroupDesc = () => (
    <div className="text-neutral">
        <p>Are you sure you want to do this?</p>
        <div className="text-sm mt-2 text-neutral text-opacity-60">All contents in this folder will be deleted.</div>
    </div>
);

const ButtonGroup: FC<{ spread: boolean; setSpread: Dispatch<SetStateAction<boolean>> }> = ({ spread, setSpread }) => {
    const { show, hide } = useDialog();
    const mode = useMode();
    const ctx = useRpc();
    const { getConfig } = useConfig();
    const navigate = useNavigate();
    const base = useContext(RouteBaseCtx);
    const { setUrl, url } = useFile();

    const onDelete = async () => {
        if (ctx.status !== 'connected') {
            hide();
            return;
        }

        const nextId = await ctx.rpc.deleteFile(url);
        await getConfig();
        navigate(base + nextId, { replace: true });
        setUrl(nextId);
        hide();
    };

    return (
        <div className={cx['button-group']}>
            {spread && mode === 'editable' && (
                <>
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
                </>
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
    const { to, isActive } = useActive(url);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [spread, setSpread] = useState(pathname.includes(url));
    const dragging = useContext(DraggingCtx);
    const { setUrl } = useFile();

    useEffect(() => {
        if (isActive) return;
        // setSpread(pathname.includes(url));
    }, [isActive, pathname, url]);

    return (
        <li>
            <div
                className={`${cx['list-container']} ${dragging ? '' : cx['not-dragging']} ${
                    isActive ? cx['active'] : ''
                }`}
                onClick={() => {
                    setUrl(url);
                    setSpread(true);
                    if (hasIndex) {
                        navigate(to);
                    }
                }}
            >
                <div className="flex h-24px">
                    <span
                        className={`${cx['header']} ${isActive ? cx['active'] : cx['inactive']}`}
                        onClick={() => hasIndex && setUrl(url)}
                    >
                        {transformName(name)}
                    </span>
                </div>
                <ButtonGroup spread={spread} setSpread={setSpread} />
            </div>
            {spread && <>{children}</>}
        </li>
    );
};
