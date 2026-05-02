'use client'

import { useRouter } from "next/navigation"
import { Input } from "./ui/input"
import { Search } from "lucide-react"

const SearchBar = () => {
    const router = useRouter();

    return (
        <div className="relative w-full mt-4">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                onFocus={() => { router.push('/search') }}
                type="text"
                placeholder="Search places/lists/profiles..."
                className="px-8 py-4 w-full bg-white border-2 border-slate-400"
            />
        </div>
    )
}

export default SearchBar