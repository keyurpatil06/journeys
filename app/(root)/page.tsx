import Cards from "@/components/Cards"
import Header from "@/components/Header"
import MapPreviewWrapper from "@/components/MapPreviewWrapper"
import SearchBar from "@/components/SearchBar"
import { travelCardsData } from "@/constants"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    const loggedIn = session?.user.name;

    return (
        <div className="w-full min-h-screen flex flex-col p-4 bg-slate-200">
            <Header user={loggedIn!} />
            <SearchBar />

            <div className="map-preview">
                <MapPreviewWrapper />
            </div>

            <div className="places-cards">
                <Cards cards={travelCardsData} />
            </div>
        </div>
    )
}

export default page