/* Copyright 2021, vite-plugin-book by Mirone. */
import { useCallback, useContext } from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';

import { RouteBaseCtx } from '../provider/RouteBaseProvider';

export const useNav = () => {
    const navigate = useNavigate();
    const base = useContext(RouteBaseCtx);

    const nav = useCallback(
        (url: string, options?: NavigateOptions) => {
            navigate(`${base}${url}`, options);
        },
        [base, navigate],
    );

    return nav;
};
