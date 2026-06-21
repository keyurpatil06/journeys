"use client"

import { getCategoryImage } from "@/lib/utils";
import Image from "next/image";

const PlaceCard = ({ place, selected, onSelect }: PlaceCardProps) => {
    // const imageSrc = getCategoryImage(place.category || "");
    const imageSrc = "/assets/images/cafe-1.jpg"
    
    return (
        <button
            type="button"
            onClick={() => onSelect(place.id)}
            className={`group w-full overflow-hidden rounded-[28px] border text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${selected ? "border-[#b89b75] bg-[#f7efe1]" : "border-[#e3d3c0] bg-[#fffaf1] hover:border-[#d6c3a4]"}`}
        >
            <div className="aspect-16/10 overflow-hidden bg-[#f3e5d0]">
                <Image
                    src={imageSrc}
                    alt={place.name}
                    width={400}
                    height={250}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-semibold text-[#4a3a2a]">{place.name}</h3>
                        <p className="mt-1 text-sm text-[#8a7660]">{place.category}</p>
                    </div>

                    <span className="rounded-full border border-[#d6c3a4] bg-[#f3e5d0] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#6d5a44]">
                        {place.category}
                    </span>
                </div>

                <p className="text-sm leading-6 text-[#6d5a44]">{place.description}</p>
            </div>
        </button>
    )
}

export default PlaceCard
