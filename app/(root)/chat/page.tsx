"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import ChatInput from "@/components/chat/ChatInput"
import ChatMessage from "@/components/chat/ChatMessage"
import ItineraryCard from "@/components/chat/ItineraryCard"
import InteractiveMap from "@/components/chat/InteractiveMap"
import { generateTravelPlan } from "@/lib/actions/aiChat.actions"
import { resolvePlaceCoordinates } from "@/lib/actions/search.actions"

const AiChat = () => {
    const [query, setQuery] = useState("")
    const [messages, setMessages] = useState<ChatMessageItem[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hi there! Type a travel prompt and I'll plan your itinerary with places, cafés, stays and map markers.",
        },
    ])
    const [itinerary, setItinerary] = useState<TravelItinerary | null>(null)
    const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const places = useMemo(() => itinerary?.recommendedPlaces ?? [], [itinerary])

    useEffect(() => {
        if (!containerRef.current) return
        containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" })
    }, [messages])

    const handleSend = async () => {
        const trimmed = query.trim()
        if (!trimmed || loading) return

        const userMessage: ChatMessageItem = {
            id: `${Date.now()}-user`,
            role: "user",
            content: trimmed,
        }

        setMessages((prev) => [...prev, userMessage])
        setQuery("")
        setLoading(true)

        try {
            const result = await generateTravelPlan(trimmed)

            if ("error" in result) {
                setItinerary(null)
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `${Date.now()}-assistant`,
                        role: "assistant",
                        content: result.error,
                    },
                ])
            } else {
                console.log(result);

                const recommendedPlaces = await Promise.all(
                    result.recommendedPlaces.map(async (place) => {
                        try {
                            const resolvedCoords = await resolvePlaceCoordinates(place.name, result.location);
                            return {
                                ...place,
                                coords: resolvedCoords ?? place.coords,
                            };
                        } catch (error) {
                            console.warn("Failed to resolve coords for", place.name, error);
                            return place;
                        }
                    })
                );

                const sanitizedResult = {
                    ...result,
                    recommendedPlaces,
                };

                setItinerary(sanitizedResult)
                setSelectedPlaceId(sanitizedResult.recommendedPlaces[0]?.id)
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `${Date.now()}-assistant`,
                        role: "assistant",
                        content: "Your itinerary is ready. Browse the day-wise plan and click any place to preview it on the map.",
                    },
                ])
            }
        } catch (error) {
            console.log("Google AI travel plan failed:", error)
            setItinerary(null)
            setMessages((prev) => [
                ...prev,
                {
                    id: `${Date.now()}-assistant`,
                    role: "assistant",
                    content: "Sorry, I couldn't generate the trip plan right now. Please try again with a slightly different prompt.",
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-6 lg:px-8">
            <div className="mx-auto grid max-w-400 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <section className="space-y-6">
                    <div className="rounded-[34px] border border-border bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">AI Travel Planner</p>
                                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Create an itinerary with map sync.</h1>
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Type your destination, budget or vibe and the planner builds a day-wise travel plan, recommended cafés, hotels and a live map.</p>
                            </div>
                            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Tip: Try “2-day itinerary for Mumbai with nightlife”.</div>
                        </div>
                    </div>

                    <div className="rounded-[34px] border border-border bg-white p-6 shadow-sm">
                        <div ref={containerRef} className="mb-6 flex max-h-130 flex-col gap-4 overflow-y-auto pr-2">
                            {messages.map((message) => (
                                <ChatMessage key={message.id} role={message.role} message={message.content} />
                            ))}
                        </div>

                        <ChatInput value={query} onChange={setQuery} onSend={handleSend} loading={loading} />
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="rounded-[34px] border border-border bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-900">Interactive map</h2>
                        <p className="mt-2 text-sm text-slate-600">Tap any recommended place to update the route and highlight its location.</p>
                    </div>

                    <InteractiveMap
                        places={places.length > 0 ? places : [
                            {
                                id: "default-1",
                                name: "Mumbai",
                                description: "Your trip markers appear here once you generate a plan.",
                                category: "Preview",
                                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                                coords: [19.0760, 72.8777],
                            },
                        ]}
                        selectedPlaceId={selectedPlaceId}
                        onSelectPlace={setSelectedPlaceId}
                    />
                </section>
            </div>

            {itinerary ? (
                <div className="mt-6">
                    <ItineraryCard itinerary={itinerary} selectedPlaceId={selectedPlaceId} onSelectPlace={setSelectedPlaceId} />
                </div>
            ) : (
                <div className="mt-6 rounded-[34px] border border-border bg-white p-8 shadow-sm">
                    <p className="text-base text-slate-600">Enter a travel prompt to see a structured day plan, recommended places and map markers.</p>
                </div>
            )}
        </main>
    )
}

export default AiChat