import type { RollupError } from 'rollup';
import type { ViteDevServer } from '../..';
import type { Connect } from 'types/connect';
import type { ErrorPayload } from 'types/hmrPayload';
export declare function prepareError(err: Error | RollupError): ErrorPayload['err'];
export declare function buildErrorMessage(err: RollupError, args?: string[], includeStack?: boolean): string;
export declare function logError(server: ViteDevServer, err: RollupError): void;
export declare function errorMiddleware(server: ViteDevServer, allowNext?: boolean): Connect.ErrorHandleFunction;
