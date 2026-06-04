import Image from "next/image"
import { notFound } from "next/navigation"
import { Building2, Coffee, MapPin, Sparkles } from "lucide-react"
import MapViewWrapper from "@/components/MapViewWrapper"
import TravelJournalHero from "@/components/TravelJournalHero"
import { getJourneyListById } from "@/lib/actions/journey.actions"

const page = async ({ params }: { params: any }) => {
    const { id } = await params
    const list = await getJourneyListById(id)

    if (!list) {
        notFound()
    }

    const heroImages = list.places.flatMap((place) => place.images || [])
    const heroLocation = list.places[0]?.name ?? "Global Adventure"
    const authorName = list.userEmail ? list.userEmail.split("@")[0] : "Guest traveler"
    const placeCount = list.places.length
    const hotelSuggestions = list.places.flatMap((place) => place.hotels || []).slice(0, 3)
    const cafeSuggestions = list.places.flatMap((place) => place.cafesAndRestaurants || []).slice(0, 3)
    const mapPlaces = list.places.map((place) => ({
        id: place.id.toString(),
        name: place.name,
        description: place.description || "",
        category: "Saved",
        image: place.images?.[0] ?? "",
        coords: [Number(place.lat), Number(place.lon)] as [number, number],
    }))

    const fallbackHotels = list.places.slice(0, 2).map((place, index) => ({
        id: index,
        name: `${place.name} Retreat`,
        lat: Number(place.lat),
        lon: Number(place.lon),
    }))

    const fallbackCafes = list.places.slice(1, 3).map((place, index) => ({
        id: index + 10,
        name: `${place.name} Café`,
        lat: Number(place.lat),
        lon: Number(place.lon),
    }))

    return (
        <main className="min-h-screen bg-slate-100 text-slate-900">
            <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
                <TravelJournalHero
                    images={heroImages}
                    title={list.title}
                    location={heroLocation}
                    description={list.tripDescription}
                    author={authorName}
                    createdAt={new Date(list.createdAt).toLocaleDateString()}
                    placeCount={placeCount}
                    photoCount={heroImages.length}
                />

                <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
                    <div className="space-y-8">
                        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-950/5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.35em] text-orange-500">Story overview</p>
                                    <h2 className="mt-4 text-3xl font-semibold text-slate-950">A premium travel journal for your adventure</h2>
                                </div>
                                <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-500 shadow-sm">
                                    <MapPin className="h-4 w-4 text-orange-500" />
                                    {placeCount} destinations · {heroImages.length} photos
                                </div>
                            </div>

                            <div className="mt-8 grid gap-6 md:grid-cols-2">
                                <div className="rounded-[2rem] bg-slate-950/5 p-6 text-slate-700 shadow-sm">
                                    <p className="font-semibold text-slate-900">Travel narrative</p>
                                    <p className="mt-3 text-base leading-7 text-slate-600">{list.tripDescription}</p>
                                </div>
                                <div className="rounded-[2rem] bg-linear-to-br from-orange-50 via-white to-slate-50 p-6 text-slate-700 shadow-sm">
                                    <p className="font-semibold text-slate-900">Trip capsule</p>
                                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                                        <p>
                                            <span className="font-medium text-slate-900">Author:</span> {authorName}
                                        </p>
                                        <p>
                                            <span className="font-medium text-slate-900">First destination:</span> {heroLocation}
                                        </p>
                                        <p>
                                            <span className="font-medium text-slate-900">Published:</span> {new Date(list.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-8">
                            {list.places.map((place, index) => {
                                const sectionImages = place.images?.slice(0, 3) ?? []
                                const coords = [Number(place.lat), Number(place.lon)] as [number, number]
                                return (
                                    <article key={place.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/5">
                                        <div className="grid gap-6 lg:grid-cols-[1fr_360px] p-6">
                                            <div>
                                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 shadow-sm">
                                                        {index + 1}
                                                    </span>
                                                    <div>
                                                        <p className="text-xs uppercase tracking-[0.35em] text-orange-500">Travel stop</p>
                                                        <h3 className="mt-2 text-2xl font-semibold text-slate-950">{place.name}</h3>
                                                    </div>
                                                </div>
                                                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{place.description || "A unique travel experience you won’t forget."}</p>

                                                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                                    <div className="rounded-[1.75rem] bg-slate-50 p-5 shadow-sm">
                                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Coordinates</p>
                                                        <p className="mt-3 text-sm text-slate-800">Lat {coords[0].toFixed(5)}</p>
                                                        <p className="text-sm text-slate-800">Lon {coords[1].toFixed(5)}</p>
                                                    </div>
                                                    <div className="rounded-[1.75rem] bg-slate-50 p-5 shadow-sm">
                                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Mood</p>
                                                        <p className="mt-3 text-sm text-slate-800">Relaxed, exploratory, and full of local charm.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="rounded-[2rem] overflow-hidden border border-slate-200 bg-slate-950/5 shadow-sm">
                                                    <MapViewWrapper mode="preview" position={coords} height="260px" />
                                                </div>
                                                <div className="rounded-[2rem] bg-slate-50 p-4 text-sm text-slate-600 shadow-sm">
                                                    <p className="font-semibold text-slate-900">Traveler experience</p>
                                                    <p className="mt-3 leading-7">This stop brings the destination to life with immersive notes, local flavor, and the kind of scene-setting details that turn a list into a story.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 border-t border-slate-200/70 p-6 lg:grid-cols-3">
                                            {sectionImages.length > 0 ? (
                                                sectionImages.map((src, idx) => (
                                                    <div key={idx} className="overflow-hidden rounded-[1.75rem] bg-slate-900 transition hover:scale-[1.01] duration-300">
                                                        <Image src={src} alt={`${place.name} photo ${idx + 1}`} width={420} height={300} className="h-48 w-full object-cover" />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-3 rounded-[1.75rem] bg-slate-100 p-10 text-center text-slate-500">No place images available yet.</div>
                                            )}
                                        </div>
                                    </article>
                                )
                            })}
                        </section>
                    </div>

                    <aside className="space-y-6">
                        <div className="sticky top-6 space-y-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.35em] text-orange-500">Journey snapshot</p>
                                    <h2 className="mt-3 text-2xl font-semibold text-slate-950">Explore the route</h2>
                                </div>
                                <Sparkles className="h-6 w-6 text-orange-500" />
                            </div>
                            <div className="rounded-[2rem] overflow-hidden border border-slate-200 bg-slate-950/5 shadow-sm">
                                <MapViewWrapper mode="interactive" places={mapPlaces} selectedPlaceId={mapPlaces[0]?.id} height="320px" />
                            </div>
                            <div className="grid gap-3 rounded-[2rem] bg-slate-50 p-5 text-sm text-slate-600">
                                <p className="font-semibold text-slate-900">Designed for discovery</p>
                                <p>Swipe through the route map and use the curated cards below to find stay and dining inspiration near your journey stops.</p>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
                            <p className="text-sm uppercase tracking-[0.35em] text-orange-500">Nearby stays</p>
                            <div className="mt-5 space-y-4">
                                {(hotelSuggestions.length ? hotelSuggestions : fallbackHotels).map((hotel) => (
                                    <div key={hotel.id} className="flex items-start gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-orange-100 text-orange-600">
                                            <Building2 className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{hotel.name}</p>
                                            <p className="mt-1 text-sm text-slate-500">{hotel.lat.toFixed(2)}, {hotel.lon.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5">
                            <p className="text-sm uppercase tracking-[0.35em] text-orange-500">Cafes & restaurants</p>
                            <div className="mt-5 space-y-4">
                                {(cafeSuggestions.length ? cafeSuggestions : fallbackCafes).map((cafe) => (
                                    <div key={cafe.id} className="flex items-start gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-100 text-amber-600">
                                            <Coffee className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{cafe.name}</p>
                                            <p className="mt-1 text-sm text-slate-500">{cafe.lat.toFixed(2)}, {cafe.lon.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export default page
