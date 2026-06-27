import Header from '@/components/Header';
import LeftSideBar from '@/components/LeftSidebar'
import BottomNavigation from '@/components/BottomNavigation'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { ReactNode } from 'react'
import { redirect } from 'next/navigation';

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if (!session) {
        redirect('/sign-in')
    }

    const user = session?.user;

    return (
        <main className='flex font-outfit h-screen w-full'>
            {/* Sidebar */}
            <aside className="hidden lg:block border-r-2 border-amber-400">
                <LeftSideBar user={user!} />
            </aside>

            {/* Right section: Header + Body */}
            <div className='flex-1 flex flex-col bg-[#f5efe6]'>
                {/* Header */}
                <nav className="p-3">
                    <Header user={user!} />
                </nav>

                {/* Body */}
                <div className='flex-1 overflow-y-auto no-scrollbar pb-24 lg:pb-0'>
                    {children}
                </div>
            </div>

            <BottomNavigation user={user!} />
        </main>
    )
}

export default RootLayout
