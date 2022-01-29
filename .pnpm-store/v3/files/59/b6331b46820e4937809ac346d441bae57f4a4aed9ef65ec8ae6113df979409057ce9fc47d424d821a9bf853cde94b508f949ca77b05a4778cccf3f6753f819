import { Options, StandardBehaviorOptions, CustomBehaviorOptions } from 'scroll-into-view-if-needed';
export interface CustomEasing {
    (t: number): number;
}
export interface SmoothBehaviorOptions extends Options {
    behavior?: 'smooth';
    duration?: number;
    ease?: CustomEasing;
}
declare function scroll(target: Element, options?: SmoothBehaviorOptions): Promise<any>;
declare function scroll<T>(target: Element, options: CustomBehaviorOptions<T>): T;
declare function scroll(target: Element, options: StandardBehaviorOptions): void;
declare const smoothScrollIntoView: typeof scroll;
export default smoothScrollIntoView;
