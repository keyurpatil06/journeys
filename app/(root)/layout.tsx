import AppSideBar from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <SidebarProvider>
                <AppSideBar />
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}

export default Layout
