import Cards from "@/components/Cards"
import MapPreviewWrapper from "@/components/MapPreviewWrapper"
import SearchBar from "@/components/SearchBar"
import AiPromptSearch from "@/components/AiPromptSearch"
import { getDisplayCards } from "@/lib/actions/journey.actions"
import ChatInput from "@/components/chat/ChatInput"

const page = async () => {
    const displayCards = await getDisplayCards();

    return (
        <div className="w-full min-h-screen flex flex-col px-4 pb-4">
            <SearchBar />

            <div className="map-preview">
                <MapPreviewWrapper />
            </div>

            <div className="mt-2">
                <AiPromptSearch />
            </div>

            <div className="places-cards mt-6">
                <Cards cards={displayCards} />
            </div>
        </div>
    )
}

export default page