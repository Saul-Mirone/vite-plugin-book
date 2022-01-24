/* Copyright 2021, vite-plugin-book by Mirone. */
export const Header = () => {
    return (
        <div className="h-64px flex justify-between px-16px items-center">
            <div className="cursor-pointer">
                <span className="material-icons-outlined">menu</span>
            </div>
            <div className="flex gap-24px">
                <div className="cursor-pointer">
                    <span className="material-icons-outlined">dark_mode</span>
                </div>
                <div className="cursor-pointer">
                    <span className="material-icons-outlined">share</span>
                </div>
            </div>
        </div>
    );
};
