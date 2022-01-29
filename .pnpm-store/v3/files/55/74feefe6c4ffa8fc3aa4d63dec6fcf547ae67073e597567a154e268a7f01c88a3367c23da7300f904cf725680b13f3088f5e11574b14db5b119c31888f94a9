import { StatusConfigBuilder, StatusConfigBuilderParams } from '..';
import { Action } from '../item';
export declare type StatusCtx = {
    placeholder: string | null;
    actions: Action[];
};
export declare type Status = ReturnType<typeof createStatus>;
export declare const createStatus: (builder: StatusConfigBuilder) => {
    get: () => StatusCtx;
    clear: () => void;
    update: (builderParams: StatusConfigBuilderParams) => StatusCtx;
    isEmpty: () => boolean;
};
//# sourceMappingURL=status.d.ts.map