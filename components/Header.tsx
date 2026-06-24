const Header = ({ user }: { user: User }) => {
    return (
        <div className="flex items-center justify-between rounded-3xl border border-[#d6c3a4] bg-[#fff2dc] px-6 py-4 shadow-sm">
            <div>
                <h1 className="text-2xl font-semibold text-[#4a3a2a]">
                    Welcome, {user.name}
                </h1>

                <p className="mt-1 text-sm text-[#6d5a44]">
                    Discover, save and share your favorite journeys.
                </p>
            </div>

            <div className="hidden md:flex items-center gap-2 rounded-full border border-[#d6c3a4] bg-[#fffaf1] px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-[#6d5a44]">
                    Ready to explore
                </span>
            </div>
        </div>
    );
};

export default Header;