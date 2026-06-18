"use client"

import { useState } from "react"
import { sideBarLinks } from "@/constants"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const LeftSideBar = ({ user }: SidebarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        // Optimistic UI: prevent further navigation immediately
        setIsSigningOut(true)
        router.push("/sign-in")

        try {
            // Fire-and-forget server sign-out; UI already updated
            await authClient.signOut()
        } catch (err) {
            console.error("Sign out failed:", err)
        } finally {
            setIsSigningOut(false)
        }
    }

    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link
                    href="/"
                    className="mx-4 mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 transition bg-amber-300"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-700 text-white font-bold">
                        J
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-slate-900">
                            Journeys
                        </h1>
                        <p className="text-xs text-slate-500">
                            Explore & Share
                        </p>
                    </div>
                </Link>

                <nav className="mt-8 flex flex-1 flex-col gap-2 px-4">
                    {sideBarLinks.map(({ imgURL, label, route }) => {
                        const isActive = pathname === route || pathname.startsWith(`${route}/`)

                        return (
                            <Link
                                key={label}
                                href={route}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition text-amber-950 ${isActive ? 'bg-amber-300' : ''} hover:bg-amber-200`}
                            >
                                <Image
                                    src={imgURL}
                                    alt={label}
                                    width={18}
                                    height={18}
                                />
                                <span className="font-medium">{label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </nav>

            <footer className="border-t border-slate-200 p-4">
                <div className="flex items-center justify-between rounded-2xl bg-amber-200 p-3">
                    <Link
                        href={`/profile/${user.id}`}
                        className="flex min-w-0 flex-1 items-center gap-3"
                    >
                        <Image
                            src={user.image!}
                            alt={user.name!}
                            width={48}
                            height={48}
                            className="rounded-full border border-slate-200"
                        />

                        <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-900">
                                {user.name}
                            </p>

                            <p className="truncate text-sm text-slate-500">
                                {user.email}
                            </p>
                        </div>
                    </Link>

                    <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="rounded-lg p-2 transition hover:bg-amber-700/40 disabled:opacity-50"
                    >
                        <Image
                            src="/assets/icons/logout.svg"
                            alt="logout"
                            width={18}
                            height={18}
                        />
                    </button>
                </div>
            </footer>
        </section>
    )
}

export default LeftSideBar