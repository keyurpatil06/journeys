"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, CalendarDays, Compass, Heart, MapPin, Star, User } from "lucide-react"

type TravelJournalHeroProps = {
    images: string[]
    title: string
    location: string
    description: string
    author: string
    createdAt: string
    placeCount: number
    photoCount: number
}

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
        <section className="group relative overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-2xl">
            <div className="relative min-h-105 sm:min-h-130">
                {currentImage ? (
                    <Image
                        src={currentImage}
                        alt={title}
                        fill
                        className="object-cover opacity-90 transition-opacity duration-700 ease-out group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 1200px"
                    />
                ) : null}
            </div>

            <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
                <div className="grid gap-6 lg:grid-cols-[1.6fr_auto] lg:items-end">
                    <div className="max-w-2xl">
                        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm tracking-[0.24em] text-slate-200 shadow-sm shadow-slate-950/30 backdrop-blur">
                            <MapPin className="h-4 w-4 text-orange-300" />
                            {location}
                        </p>
                        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            {title}
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200/90 sm:text-lg">
                            {description}
                        </p>
                    </div>

                    <div className="space-y-4 rounded-[2rem] border border-slate-200/10 bg-white/10 p-5 text-slate-100 shadow-2xl shadow-slate-950/20 backdrop-blur">
                        <div className="flex items-center gap-3 text-sm text-slate-200">
                            <User className="h-4 w-4 text-orange-300" />
                            <span>{author}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-200">
                            <CalendarDays className="h-4 w-4 text-orange-300" />
                            <span>{createdAt}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-200">
                            <Compass className="h-4 w-4 text-orange-300" />
                            <span>{placeCount} curated stops · {photoCount} travel photos</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 shadow-sm shadow-slate-950/20 backdrop-blur">
                        <Star className="h-4 w-4 text-orange-300" />
                        Immersive travel story
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100 shadow-sm shadow-slate-950/20 backdrop-blur">
                        <Heart className="h-4 w-4 text-pink-300" />
                        Modern travel journal design
                    </div>
                </div>
            </div>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-slate-950/75 px-3 py-2 shadow-xl shadow-slate-950/40 backdrop-blur transition-all duration-300">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? "bg-orange-300" : "bg-white/30 hover:bg-white/60"}`}
                        aria-label={`Show slide ${index + 1}`}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={() => setActiveIndex((activeIndex - 1 + slides.length) % slides.length)}
                className="absolute left-5 top-1/2 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white shadow-xl shadow-slate-950/30 transition hover:-translate-y-0.5 hover:bg-slate-900"
                aria-label="Previous slide"
            >
                <ArrowLeft className="h-5 w-5" />
            </button>

            <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % slides.length)}
                className="absolute right-5 top-1/2 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white shadow-xl shadow-slate-950/30 transition hover:-translate-y-0.5 hover:bg-slate-900"
                aria-label="Next slide"
            >
                <ArrowRight className="h-5 w-5" />
            </button>
        </section>
    )
}

export default TravelJournalHero
