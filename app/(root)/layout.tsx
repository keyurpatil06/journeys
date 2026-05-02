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
            {/* TODO */}
            <aside className="bg-amber-400">
                <LeftSideBar user={user!} />
            </aside>

            <div className='flex-1 overflow-y-auto'>
                {children}
            </div>
        </main>
    )
}

export default RootLayout
