import Image from "next/image";
import Notifications from "@/components/Notifications";

const Header = ({ user }: { user: User }) => {
    return (
        <header className="flex items-center justify-between rounded-3xl border border-[#d6c3a4] bg-[#fffaf1] px-5 py-3 shadow-sm">
            <div className="flex items-center gap-3">
                <Image
                    src='/assets/icons/logo.svg'
                    alt='logo'
                    width={35}
                    height={35}
                    className='rounded-xl'
                />

                <div className="">
                    <h1 className="text-lg font-semibold text-[#4a3a2a]">
                        {process.env.NEXT_PUBLIC_APP_NAME}
                    </h1>
                    <p className="text-xs text-[#8a7660]">
                        Discover • Plan • Share
                    </p>
                </div>
            </div>

            <Notifications />
        </header>
    );
};

export default Header;