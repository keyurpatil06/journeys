"use client"

const NearbyPlacesSection = ({ title, items, selectedId, onSelect }: NearbyPlacesSectionProps) => {
    return (
        <div className="rounded-[28px] border border-[#e3d3c0] bg-[#fffaf1] p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-[#4a3a2a]">{title}</p>
                    <p className="mt-1 text-xs text-[#8a7660]">Tap a place to view it on the map.</p>
                </div>
            </div>

            <div className="space-y-3">
                {items.map((place) => (
                    <button
                        key={place.id}
                        type="button"
                        onClick={() => onSelect(place.id)}
                        className={`flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${place.id === selectedId ? "border-[#b89b75] bg-[#f3e5d0] shadow-sm" : "border-[#e3d3c0] bg-[#f7efe1] hover:border-[#d6c3a4] hover:bg-[#f1e5ce]"}`}
                    >
                        <div>
                            <p className="text-sm font-semibold text-[#4a3a2a]">{place.name}</p>
                            <p className="mt-1 text-sm leading-6 text-[#6d5a44]">{place.description}</p>
                        </div>

                        <span className="rounded-full border border-[#d6c3a4] bg-[#fffaf1] px-2.5 py-1 text-xs font-medium text-[#8a7660]">{place.category}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default NearbyPlacesSection
