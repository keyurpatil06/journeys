import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const KNOWN_LOCATIONS = ["goa", "bali", "mumbai"]

export const parsePromptLocation = (prompt: string) => {
    const lowercase = prompt.toLowerCase()
    const match = KNOWN_LOCATIONS.find((point) => lowercase.includes(point))
    return match ? match.charAt(0).toUpperCase() + match.slice(1) : "Goa"
}

export const extractJson = (text: string) => {
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first === -1 || last === -1) {
        throw new Error("Invalid AI response: no JSON object found");
    }
    return text.slice(first, last + 1);
};