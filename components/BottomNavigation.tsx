"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sideBarLinks } from "@/constants"

const BottomNavigation = ({ user }: { user: User }) => {
    const pathname = usePathname()

    const navItems = [
        ...sideBarLinks,
        {
            imgURL: "/assets/icons/profile.svg",
            route: `/profile/${user.id}`,
            label: "Profile",
        },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-9999 block lg:hidden border-t border-slate-200 bg-[#fff8ee]/95 backdrop-blur-md">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                {navItems.map(({ imgURL, label, route }) => {
                    const isActive = pathname === route || pathname.startsWith(`${route}/`)

                    return (
                        <Link
                            key={label}
                            href={route}
                            className={`flex flex-col items-center justify-center gap-1 rounded-3xl px-2 py-1 text-xs font-medium transition ${isActive ? "text-amber-900" : "text-slate-500 hover:text-amber-700"}`}
                        >
                            {imgURL ? (
                                <Image src={imgURL} alt={label} width={20} height={20} />
                            ) : (
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm text-amber-700">
                                    P
                                </span>
                            )}
                            <span>{label}</span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default BottomNavigation
