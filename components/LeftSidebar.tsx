"use client"

import { useState } from "react"
import { sideBarLinks } from "@/constants"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const LeftSideBar = ({ user }: SidebarProps) => {
    const router = useRouter()
    const [isSigningOut, setIsSigningOut] = useState(false)

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
                    href='/'
                    className="text-3xl border-black border p-2 m-2"
                >
                    Journeys
                </Link>

                {sideBarLinks.map(({ imgURL, label, route }) => (
                    isSigningOut ? (
                        <div key={label} className="text-lg font-normal opacity-50 cursor-not-allowed">{label}</div>
                    ) : (
                        <Link href={route} key={label}>
                            <span className="text-lg font-normal">{label}</span>
                        </Link>
                    )
                ))}
            </nav>

            <footer>
                <div>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>

                <div>
                    <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="cursor-pointer px-4 py-2 rounded-xl bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSigningOut ? "Signing out..." : "Sign Out"}
                    </button>
                </div>
            </footer>
        </section>
    )
}

export default LeftSideBar