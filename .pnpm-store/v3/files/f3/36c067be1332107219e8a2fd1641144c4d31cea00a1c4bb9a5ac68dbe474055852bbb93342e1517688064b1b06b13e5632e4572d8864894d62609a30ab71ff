import type { Container, Slice } from '../context';
import type { Clock, Timer } from '../timing';
export declare class Pre {
    #private;
    constructor(container: Container, clock: Clock);
    /**
     * Inject a context into current editor.
     *
     * @param ctx - The context needs to be injected.
     * @param defaultValue - The default value of this context.
     * @returns Pre.
     */
    readonly inject: <T>(ctx: Slice<T>, defaultValue?: T | undefined) => this;
    /**
     * Start to record for a timer.
     *
     * @param timer - The timer needs to be recorded.
     * @returns Pre.
     */
    readonly record: (timer: Timer) => this;
}
//# sourceMappingURL=pre.d.ts.map