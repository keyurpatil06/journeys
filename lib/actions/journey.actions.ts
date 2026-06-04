"use server";

import { headers } from "next/headers";
import { auth, db } from "@/lib/auth";
import { ObjectId } from "mongodb";

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

export const getJourneyListById = async (id: string) => {
    try {
        const objectId = new ObjectId(id);
        const doc = await db.collection("lists").findOne({ _id: objectId });

        if (!doc) return null;

        return {
            id: doc._id.toString(),
            title: doc.title,
            tripDescription: doc.tripDescription,
            userId: doc.userId,
            userEmail: doc.userEmail,
            places: doc.places,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        } as JourneyList;
    } catch (error) {
        console.log("Error fetching journey list by id", error);
        return null;
    }
};
