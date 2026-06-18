"use server";

import { GoogleGenAI } from "@google/genai";
import { extractJson } from "../utils";
import { TRAVEL_SYSTEM_PROMPT } from "@/constants";

const { AI_API_KEY, AI_MODEL } = process.env;

const ai = new GoogleGenAI({
    apiKey: AI_API_KEY,
});

export const generateTravelPlan = async (prompt: string): Promise<TravelPlanResult> => {
    try {
        if (!AI_API_KEY) {
            throw new Error("Missing AI API Key");
        }

        const response = await ai.models.generateContent({
            model: AI_MODEL!,
            contents: `${TRAVEL_SYSTEM_PROMPT}\n\nUser: ${prompt}`,
        });

        const content = response.text;

        if (!content) {
            throw new Error("AI response did not include content");
        }

        const jsonText = extractJson(content);
        const parsed = JSON.parse(jsonText);

        return parsed;
    } catch (error) {
        console.log("Error while generating travel plan: ", error);
        throw new Error("Failed to generate travel plan");
    }
};
