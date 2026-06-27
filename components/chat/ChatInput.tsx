"use client";

import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatInput = ({ value, onChange, onSend, loading }: ChatInputProps) => {
    return (
        <div className="rounded-3xl border border-[#d6c3a4] bg-[#f7efe1] p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-[#4a3a2a]">Travel planner prompt</p>
                    <p className="text-xs text-[#8a7660]">Ask for an itinerary, budget plan, hotels, cafés or hidden gems.</p>
                </div>

                <span className="rounded-full border border-[#d6c3a4] bg-[#fffaf1] px-3 py-1 text-xs font-medium text-[#6d5a44] whitespace-nowrap">AI Planner</span>
            </div>

            <textarea
                rows={4}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="e.g. Plan a 5-day Goa trip under ₹20k with beaches and nightlife"
                className="w-full resize-none rounded-3xl border border-[#d6c3a4] bg-[#fffaf1] px-4 py-4 text-sm text-[#4a3a2a] outline-none transition-all placeholder:text-[#9a8267] focus:border-[#b89b75] focus:ring-2 focus:ring-[#d6c3a4]/50"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        onSend();
                    }
                }}
            />

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-xs leading-5 text-[#8a7660]">
                    Try prompts like: Goa under ₹15k, 3-day Mumbai itinerary, Kerala backwaters, food tour in Delhi, or a weekend getaway near Pune.
                </p>

                <Button
                    onClick={onSend}
                    disabled={loading || !value.trim()}
                    className="rounded-full bg-[#4a3a2a] px-6 py-6 font-semibold text-[#fffaf1] transition-all hover:bg-[#5d4a3f] hover:shadow-lg"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Planning...
                        </>
                    ) : (
                        <>
                            Generate Trip
                            <Send className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ChatInput;