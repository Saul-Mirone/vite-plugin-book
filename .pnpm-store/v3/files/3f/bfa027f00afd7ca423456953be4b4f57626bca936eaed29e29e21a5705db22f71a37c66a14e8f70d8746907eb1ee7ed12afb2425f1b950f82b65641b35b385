import { Timing } from './timing';
export declare type ClockMap = Map<symbol, Timing>;
export declare type Timer = {
    (store: ClockMap): Timing;
    id: symbol;
};
export declare type Clock = {
    store: ClockMap;
    get: (timer: Timer) => Timing;
};
export declare const createClock: () => Clock;
//# sourceMappingURL=clock.d.ts.map