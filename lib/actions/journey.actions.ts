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
            coverImage: payload.coverImage,
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
    }

    return {
        success: false,
        id: null,
    };
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
    }

    return null;
};

export const getUserProfileWithLists = async (userId: string) => {
    try {
        const objectId = new ObjectId(userId);

        const [userDoc, listDocs] = await Promise.all([
            db.collection("user").findOne(
                { _id: objectId },
                { projection: { name: 1, image: 1, email: 1, followers: 1, following: 1 } }
            ),
            db.collection("lists").find({ userId }).sort({ createdAt: -1 }).toArray(),
        ]);

        if (!userDoc && listDocs.length === 0) {
            return null;
        }

        const lists = listDocs.map((doc: any) => ({
            id: doc._id.toString(),
            title: doc.title,
            description: doc.tripDescription,
            coverImage: doc.coverImage,
            placeCount: Array.isArray(doc.places) ? doc.places.length : 0,
            createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
        }));

        const followers = Array.isArray(userDoc?.followers)
            ? await Promise.all(
                userDoc.followers.map(async (followerId: ObjectId) => {
                    const followerDoc = await db.collection("user").findOne(
                        { _id: followerId },
                        { projection: { _id: 1, name: 1, image: 1, email: 1 } }
                    );

                    return {
                        id: followerDoc?._id?.toString() ?? String(followerId),
                        name: followerDoc?.name ?? (followerDoc?.email ? followerDoc.email.split("@")[0] : "Traveler"),
                        image: followerDoc?.image ?? null,
                    };
                })
            )
            : [];

        const following = Array.isArray(userDoc?.following)
            ? await Promise.all(
                userDoc.following.map(async (followingId: ObjectId) => {
                    const followingDoc = await db.collection("user").findOne(
                        { _id: followingId },
                        { projection: { _id: 1, name: 1, image: 1, email: 1 } }
                    );

                    return {
                        id: followingDoc?._id?.toString() ?? String(followingId),
                        name: followingDoc?.name ?? (followingDoc?.email ? followingDoc.email.split("@")[0] : "Traveler"),
                        image: followingDoc?.image ?? null,
                    };
                })
            )
            : [];

        const name = userDoc?.name ?? (userDoc?.email ? userDoc.email.split("@")[0] : `Traveler`);

        const profile = {
            id: userId,
            name,
            image: userDoc?.image ?? null,
            email: userDoc?.email ?? null,
            followers,
            following,
        };

        return {
            profile,
            lists,
        };
    } catch (error) {
        console.log("Error fetching user profile and lists", error);
    }

    return null;
};

export const getDisplayCards = async () => {
    // Data to show posts on home page

    try {
        const docs = await db.collection("lists").aggregate([
            {
                $sample: {
                    size: 8
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    tripDescription: 1,
                    coverImage: 1
                }
            }
        ]).toArray() as CardItem[];

        return docs;
    } catch (error) {
        console.log(error);
    }

    return [];
}