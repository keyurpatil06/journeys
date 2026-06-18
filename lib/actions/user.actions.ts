'use server'

import { headers } from "next/headers"
import { auth, db } from "../auth"
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

type Props = {
    followers: ObjectId[];
    following: ObjectId[];
}

export const followUser = async (profileId: string) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        const currentUserId = session?.user.id;

        if (!currentUserId) {
            console.log('Unauthorized')
            return;
        }

        if (profileId === currentUserId) {
            console.log('Cannot follow the same user');
            return;
        }

        await Promise.all([
            db.collection('user').updateOne(
                { _id: new ObjectId(currentUserId) },
                { $addToSet: { following: new ObjectId(profileId) } }
            ),
            db.collection('user').updateOne(
                { _id: new ObjectId(profileId) },
                { $addToSet: { followers: new ObjectId(currentUserId) } }
            )
        ])

        revalidatePath(`/profile/${profileId}`)

        return { success: true }
    } catch (error) {
        console.log('Error while performing follow action', error)
        return { success: false }
    }
}

export const unfollowUser = async (profileId: string) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        const currentUserId = session?.user.id;

        if (!currentUserId) {
            console.log('Unauthorized')
            return;
        }

        if (profileId === currentUserId) {
            console.log('Cannot unfollow the same user');
            return;
        }

        await Promise.all([
            db.collection<Props>('user').updateOne(
                { _id: new ObjectId(currentUserId) },
                { $pull: { following: new ObjectId(profileId) } }
            ),
            db.collection<Props>('user').updateOne(
                { _id: new ObjectId(profileId) },
                { $pull: { followers: new ObjectId(currentUserId) } }
            )
        ])

        revalidatePath(`/profile/${profileId}`)

        return { success: true }
    } catch (error) {
        console.log('Error while performing follow action', error)
        return { success: false }
    }
}