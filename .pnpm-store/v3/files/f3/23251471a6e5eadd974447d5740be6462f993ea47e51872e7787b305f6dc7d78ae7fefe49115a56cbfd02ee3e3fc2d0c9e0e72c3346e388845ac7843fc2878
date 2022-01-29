/** Mark some properties as required, leaving others unchanged */
declare type MarkRequired<T, RK extends keyof T> = Exclude<T, RK> & Required<Pick<T, RK>>;
interface CliOptions {
    patterns?: Array<string>;
    outFile?: string;
    watch?: boolean;
}
declare type ResolvedCliOptions = MarkRequired<CliOptions, 'patterns'>;

declare function generate(options: ResolvedCliOptions): Promise<void>;
declare function resolveOptions(options: CliOptions): Promise<ResolvedCliOptions>;
declare function build(_options: CliOptions): Promise<void>;

export { build, generate, resolveOptions };
