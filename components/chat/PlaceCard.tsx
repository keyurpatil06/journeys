"use client"

interface PlaceCardProps {
    place: ItineraryPlace
    selected?: boolean
    onSelect: (id: string) => void
}

const PlaceCard = ({ place, selected, onSelect }: PlaceCardProps) => {
    return (
        <button
            type="button"
            onClick={() => onSelect(place.id)}
            className={`group w-full overflow-hidden rounded-3xl border p-0 text-left shadow-sm transition-all ${selected ? "border-primary/80 bg-primary/10" : "border-border bg-white hover:border-primary/60"
                }`}
        >
            <div className="aspect-16/10 overflow-hidden bg-slate-100">
                <img src={place.image} alt={place.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h3 className="text-base font-semibold text-slate-900">{place.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{place.category}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">{place.category}</span>
                </div>
                <p className="text-sm leading-6 text-slate-600">{place.description}</p>
            </div>
        </button>
    )
}

export default PlaceCard
