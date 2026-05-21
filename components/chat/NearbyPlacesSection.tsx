"use client"

interface NearbyPlacesSectionProps {
    title: string
    items: ItineraryPlace[]
    selectedId?: string
    onSelect: (id: string) => void
}

const NearbyPlacesSection = ({ title, items, selectedId, onSelect }: NearbyPlacesSectionProps) => {
    return (
        <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-muted-foreground">Tap a place to view it on the map.</p>
                </div>
            </div>

            <div className="space-y-3">
                {items.map((place) => (
                    <button
                        key={place.id}
                        type="button"
                        onClick={() => onSelect(place.id)}
                        className={`flex w-full items-start justify-between gap-3 rounded-3xl border px-4 py-4 text-left transition ${place.id === selectedId
                                ? "border-primary/80 bg-primary/10"
                                : "border-border bg-slate-50 hover:border-primary/60"
                            }`}
                    >
                        <div>
                            <p className="text-sm font-semibold text-slate-900">{place.name}</p>
                            <p className="mt-1 text-sm text-slate-600">{place.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{place.category}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default NearbyPlacesSection
