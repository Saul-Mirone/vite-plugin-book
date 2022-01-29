import execa from 'execa';

declare type PackageManager = 'pnpm' | 'yarn' | 'npm';
declare function detectPackageManager(cwd?: string): Promise<PackageManager | null>;

interface InstallPackageOptions {
    cwd?: string;
    dev?: boolean;
    silent?: boolean;
    packageManager?: string;
    preferOffline?: boolean;
    additionalArgs?: string[];
}
declare function installPackage(names: string | string[], options?: InstallPackageOptions): Promise<execa.ExecaReturnValue<string>>;

export { InstallPackageOptions, PackageManager, detectPackageManager, installPackage };
