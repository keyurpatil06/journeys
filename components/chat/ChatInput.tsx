"use client"

import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
    value: string
    onChange: (value: string) => void
    onSend: () => void
    loading: boolean
}

const ChatInput = ({ value, onChange, onSend, loading }: ChatInputProps) => {
    return (
        <div className="rounded-3xl border border-border bg-card/80 p-5 shadow-sm backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold">Travel planner prompt</p>
                    <p className="text-xs text-muted-foreground">Ask for an itinerary, budget plan or highlights.</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">AI planner</span>
            </div>

            <textarea
                rows={4}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="e.g. Plan a 5-day Goa trip under ₹20k"
                className="w-full resize-none rounded-3xl border border-border bg-transparent px-4 py-4 text-sm text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">Example prompts: Goa, Bali, Mumbai travel plans with budget, nightlife, cafes and beaches.</p>
                <Button
                    onClick={onSend}
                    disabled={loading || !value.trim()}
                    className="rounded-full px-5 py-3 font-semibold"
                >
                    {loading ? "Planning…" : "Generate itinerary"}
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default ChatInput
