'use client'

import { useRouter } from "next/navigation"
import { Input } from "./ui/input"
import { Search } from "lucide-react"

const SearchBar = () => {
    const router = useRouter();

    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                onFocus={() => { router.push('/search') }}
                type="text"
                placeholder="Search places, lists and profiles..."
                className="px-9 py-5 w-full rounded-2xl transition border-[#d6c3a4] bg-amber-50 focus-visible:border-[#c8a979] focus-visible:ring-0"
            />
        </div>
    )
}

export default SearchBar