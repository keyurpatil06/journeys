"use client";

import { useRouter } from "next/navigation";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { SAMPLE_PROMPTS } from "@/constants";
import { Input } from "./ui/input";

const AiPromptSearch = () => {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (!query.trim()) return;

        router.push(`/chat?q=${encodeURIComponent(query.trim())}`);
    };

    const handleSuggestionClick = (prompt: string) => {
        router.push(`/chat?q=${encodeURIComponent(prompt)}`);
    };

    return (
        <section className="rounded-4xl border border-[#d6c3a4] bg-[#fff2dc] p-8 shadow-sm">
            <div className="mx-auto max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d6c3a4] bg-[#fffaf1] px-4 py-2 text-sm font-medium text-[#6d5a44]">
                    <Sparkles className="h-4 w-4" />
                    AI Travel Planner
                </div>

                <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#4a3a2a] sm:text-5xl">
                    Plan your next adventure
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6d5a44]">
                    Create personalized itineraries, discover cafés, restaurants, hotels and attractions with AI-powered trip planning.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Plan a 5-day Goa trip under ₹20k with beaches and nightlife..."
                        className="h-14 flex-1 rounded-full border border-[#d6c3a4] bg-[#fffaf1] px-6 text-[#4a3a2a] outline-none transition-all placeholder:text-[#9a8267] focus:border-[#b89b75] focus:ring-2 focus:ring-[#d6c3a4]/50"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />

                    <button
                        onClick={handleSearch}
                        className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#4a3a2a] px-8 font-medium text-[#fffaf1] transition-all hover:bg-[#5d4a3f] hover:shadow-lg"
                    >
                        Plan Trip
                        <Send className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {SAMPLE_PROMPTS.map((prompt) => (
                        <button
                            key={prompt}
                            onClick={() => handleSuggestionClick(prompt)}
                            className="rounded-full border border-[#d6c3a4] bg-[#fffaf1] px-4 py-2 text-sm text-[#6d5a44] transition-all hover:bg-[#f3e5d0]"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>

                <p className="mt-6 text-sm text-[#8a7660]">
                    Popular: Goa • Bali • Mumbai • Kerala • Norway
                </p>
            </div>
        </section>
    );
};

export default AiPromptSearch
