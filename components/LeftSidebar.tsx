"use client"

import { sideBarLinks } from "@/constants"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const LeftSideBar = ({ user }: SidebarProps) => {
    const handleSignOut = async () => {
        return await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    redirect('/sign-in')
                }
            }
        })
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
                    <Link href={route} key={label}>
                        {/* <Image
                            src={imgURL}
                            alt={label}
                            width={40}
                            height={40}
                        /> */}
                        <span className="text-lg font-normal">{label}</span>
                    </Link>
                ))}
            </nav>

            <footer>
                <div>
                    <h1>USERNAME</h1>
                    <p>EMAIL</p>
                </div>

                <div>
                    <button onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            </footer>
        </section>
    )
}

export default LeftSideBar