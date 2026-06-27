"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, CalendarDays, Compass, Heart, MapPin, Star, User } from "lucide-react"

const TravelJournalHero = ({
    images,
    title,
    location,
    description,
    author,
    createdAt,
    placeCount,
    photoCount,
}: TravelJournalHeroProps) => {
    const slides = useMemo(() => (images.length > 0 ? images : [""]), [images])
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % slides.length)
        }, 6000)

        return () => window.clearInterval(interval)
    }, [slides.length])

    const currentImage = slides[activeIndex]

    return (
        <section className="group relative overflow-hidden tracking-wider rounded-[1.5rem] border border-[#d6c3a4] bg-[#4a3a2a] shadow-2xl sm:rounded-[2.75rem]">
            <div className="relative h-150 overflow-hidden">
                {currentImage && (
                    <Image
                        src={currentImage}
                        alt={title}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="100vw"
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#2f241b]/95 via-[#4a3a2a]/40 to-transparent" />
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/20" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:px-10 md:py-8 lg:p-10 xl:px-20 xl:py-12">
                <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#e9dbc5]/40 bg-[#fffaf1]/15 px-3 py-1.5 text-xs font-medium text-[#fff8ef] backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
                            <MapPin className="size-3.5 text-[#f4c98b] sm:size-4" />
                            {location}
                        </span>

                        <h1 className="mt-4 text-2xl font-bold leading-tight text-white sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{title}</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#efe4d5] sm:mt-4 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">{description}</p>

                        <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                            <div className="rounded-full border border-[#d6c3a4]/30 bg-[#fffaf1]/15 px-3 py-1.5 backdrop-blur-md sm:px-4 sm:py-2">
                                <span className="flex items-center gap-2 text-xs text-white sm:text-sm">
                                    <Star className="size-3.5 text-[#f6d365] sm:size-4" />
                                    Curated Journey
                                </span>
                            </div>

                            <div className="rounded-full border border-[#d6c3a4]/30 bg-[#fffaf1]/15 px-3 py-1.5 backdrop-blur-md sm:px-4 sm:py-2">
                                <span className="flex items-center gap-2 text-xs text-white sm:text-sm">
                                    <Heart className="size-3.5 text-pink-300 sm:size-4" />
                                    Travel Memories
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="travel-hero-panel max-md:pb-10">
                        <div className="space-y-4 sm:space-y-5">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-[#f3e5d0] p-2">
                                    <User className="size-3.5 text-[#5d4a3f] sm:size-4" />
                                </div>

                                <div>
                                    <p className="travel-hero-caption">Creator</p>
                                    <p className="text-sm font-medium text-white sm:text-base">{author}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-[#f3e5d0] p-2">
                                    <CalendarDays className="size-3.5 text-[#5d4a3f] sm:size-4" />
                                </div>

                                <div>
                                    <p className="travel-hero-caption">Published</p>
                                    <p className="text-sm font-medium text-white sm:text-base">{createdAt}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-[#f3e5d0] p-2">
                                    <Compass className="size-3.5 text-[#5d4a3f] sm:size-4" />
                                </div>

                                <div>
                                    <p className="travel-hero-caption">Journey</p>
                                    <p className="text-sm font-medium text-white sm:text-base">
                                        {placeCount} Places · {photoCount} Photos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3 rounded-full border border-[#d6c3a4]/20 bg-[#fffaf1]/10 px-4 py-2 backdrop-blur-xl">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`transition-all duration-300 ${activeIndex === index ? "h-2.5 w-8 rounded-full bg-[#f6d365]" : "h-2.5 w-2.5 rounded-full bg-white/40 hover:bg-white"}`}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={() => setActiveIndex((activeIndex - 1 + slides.length) % slides.length)}
                className="hero-banner-btn left-6"
            >
                <ArrowLeft className="size-5" />
            </button>

            <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % slides.length)}
                className="hero-banner-btn right-6"
            >
                <ArrowRight className="size-5" />
            </button>
        </section>
    )
}

export default TravelJournalHero
