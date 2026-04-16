import LeftSideBar from '@/components/LeftSidebar'
import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
    const user = 'user' as unknown as User;

    return (
        <main className='flex font-outfit h-screen w-full'>
            {/* TODO */}
            <aside className="bg-amber-400">
                <LeftSideBar user={user} />
            </aside>

            <div className='flex-1 overflow-y-auto'>
                {children}
            </div>
        </main>
    )
}

export default RootLayout
