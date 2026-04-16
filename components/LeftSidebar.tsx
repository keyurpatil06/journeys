"use client"

import { sideBarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"

const LeftSideBar = ({ user }: SidebarProps) => {
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
                    LOGOUT
                </div>
            </footer>
        </section>
    )
}

export default LeftSideBar