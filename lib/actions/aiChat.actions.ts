"use server";

import { GoogleGenAI } from "@google/genai";
import { extractJson } from "../utils";

const TRAVEL_SYSTEM_PROMPT = `You are a highly specialized travel planning assistant. You may only answer questions that are directly about travel plans, itineraries, destinations, hotels, restaurants, cafes, activities, budgets, timings, or travel logistics. If the user asks anything outside travel planning, answer exactly with a JSON object containing only {"error":"I can only help with travel planning. Please ask about trip itineraries, destinations, cafes, hotels, budgets, or schedules."}.

Return only valid JSON with this exact structure:
{
  "title": string,
  "location": string,
  "duration": string,
  "budget": string,
  "overview": string,
  "days": [
    {
      "day": string,
      "summary": string,
      "activities": [
        { "time": string, "title": string, "location": string }
      ],
      "travelTips": string
    }
  ],
  "recommendedPlaces": [
    {
      "id": string,
      "name": string,
      "description": string,
      "category": string,
      "image": string,
      "coords": [number, number]
    }
  ],
  "nearby": {
    "cafes": [],
    "restaurants": [],
    "hotels": []
  }
}

Do not include markdown fences, extra commentary, or any response outside the JSON payload. If the user prompt is missing destination or budget details, make reasonable travel planning assumptions.`;

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
