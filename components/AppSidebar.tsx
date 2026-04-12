"use client"

import Link from "next/link"
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
} from "@/components/ui/sidebar"
import { sideBarLinks } from "@/constants"
import Image from "next/image"

const AppSideBar = () => {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader about="Journeys" />

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>

                        {sideBarLinks.map(({ imgURL, route, label }) => (
                            <SidebarMenuItem key={route}>
                                <SidebarMenuButton asChild>
                                    <Link href={route}>
                                        {/* <Image
                                            src={imgURL}
                                            alt="Nav Image"
                                            width={50}
                                            height={50}
                                        /> */}
                                        {label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}

                    </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                {/* 👤 Footer */}
                <SidebarFooter>
                    <div className="p-4 text-sm text-muted-foreground">
                        Logged in user
                    </div>
                </SidebarFooter>

            </Sidebar>
        </SidebarProvider>
    )
}

export default AppSideBar