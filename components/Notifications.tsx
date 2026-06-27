"use client"

import Image from "next/image"
import { useState } from "react"

const Notifications = () => {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-full border border-transparent bg-[#f7efe1] p-2 text-slate-700 transition hover:border-[#d6c3a4] hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
                aria-expanded={open}
                aria-label="Notifications"
            >
                <Image
                    src="/assets/icons/bell.svg"
                    alt="Notifications"
                    width={24}
                    height={24}
                />
            </button>

            <div className={`absolute right-0 top-full z-10 mt-3 w-56 rounded-3xl border border-slate-200 bg-amber-100/90 p-4 text-sm text-slate-700 shadow-xl transition-all duration-150 ${open ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95"}`}>
                <p className="font-semibold text-slate-900">Notifications</p>
                <p className="mt-2 text-xs text-slate-500">No notifications yet.</p>
            </div>
        </div>
    )
}

export default Notifications
