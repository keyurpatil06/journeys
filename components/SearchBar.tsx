import { Input } from "./ui/input"
import { Search } from "lucide-react"

const SearchBar = () => {
    return (
        <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search places..."
                className="px-8 py-4 w-full"
            />
        </div>
    )
}

export default SearchBar