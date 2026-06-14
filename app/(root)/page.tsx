import Cards from "@/components/Cards"
import MapPreviewWrapper from "@/components/MapPreviewWrapper"
import SearchBar from "@/components/SearchBar"
import AiPromptSearch from "@/components/AiPromptSearch"
import { getDisplayCards } from "@/lib/actions/journey.actions"

const page = async () => {
    const displayCards = await getDisplayCards();

    return (
        <div className="w-full min-h-screen flex flex-col p-4 bg-slate-200">
            <SearchBar />

            <div className="map-preview">
                <MapPreviewWrapper />
            </div>

            <div className="mt-6">
                <AiPromptSearch />
            </div>

            <div className="places-cards mt-6">
                <Cards cards={displayCards} />
            </div>
        </div>
    )
}

export default page