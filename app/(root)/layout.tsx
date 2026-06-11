import Header from '@/components/Header';
import LeftSideBar from '@/components/LeftSidebar'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    const user = session?.user;

    return (
        <main className='flex font-outfit h-screen w-full'>
            {/* Sidebar */}
            <aside className="bg-amber-400 border-r">
                <LeftSideBar user={user!} />
            </aside>

            {/* Right section: Header + Body */}
            <div className='flex-1 flex flex-col'>
                {/* Header */}
                <nav className="border-b bg-white">
                    <Header user={user!} />
                </nav>

                {/* Body */}
                <div className='flex-1 overflow-y-auto no-scrollbar'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default RootLayout
