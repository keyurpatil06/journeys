"use server";

import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";

export const saveJourneyList = async (payload: JourneyListPayload) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const insertDoc = {
      title: payload.title,
      tripDescription: payload.tripDescription,
      places: payload.places,
      userId: session?.user?.id ?? null,
      userEmail: session?.user?.email ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("lists").insertOne(insertDoc);

    return {
      success: true,
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      id: null,
    };
  }
};
