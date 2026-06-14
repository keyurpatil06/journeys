import Link from "next/link"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUserProfileWithLists } from "@/lib/actions/journey.actions"
import FollowConnections from "@/components/FollowConnections";
import Image from "next/image";

const Profile = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const session = await auth.api.getSession({ headers: await headers() });
    const currentUserId = session?.user?.id;
    const data = await getUserProfileWithLists(id);

    if (!data || !currentUserId) {
        return (
            <div className="min-h-screen bg-[#f5efe6] text-[#5d4a3f] px-6 py-10">
                <div className="max-w-4xl mx-auto rounded-3xl border border-[#d6c3a4] bg-white p-10 shadow-sm">
                    <h1 className="text-2xl font-semibold">Profile not found</h1>
                    <p className="mt-4 text-sm text-[#7c6853]">We couldn't find a profile for this user.</p>
                </div>
            </div>
        )
    }

    const { profile, lists } = data;
    const initials = profile.name.split(" ").map((part: string) => part[0]).slice(0, 2).join("").toUpperCase();

    return (
        <div className="min-h-screen bg-[#f5efe6] text-[#5d4a3f] px-6 py-10">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="rounded-[32px] border border-[#d6c3a4] bg-[#f7efe1] p-8 shadow-sm">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-5">
                            <div className="flex">
                                {profile.image ? (
                                    <Image
                                        src={profile.image}
                                        alt={profile.name}
                                        width={130}
                                        height={130}
                                        className="rounded-full"
                                    />
                                ) : (
                                    initials
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-semibold tracking-tight">{profile.name}</h1>
                                <p className="mt-4 max-w-xl text-sm leading-7 text-[#6d5a44]">A travel creator sharing curated journey lists, favorite stays and memorable destinations. Browse the uploaded trips below.</p>
                            </div>
                        </div>

                        <div className="flex justify-center w-auto grid-cols-2 gap-4 rounded-4xl bg-white p-4 text-center text-[#6b5a44] shadow-sm">
                            <div className="rounded-3xl border border-[#e3d3c0] bg-[#fbf5ed] px-4 py-5">
                                <p className="text-2xl font-semibold">{lists.length}</p>
                                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#9a8267]">Uploads</p>
                            </div>
                        </div>
                    </div>
                </div>

                <FollowConnections
                    profileId={id}
                    currentUserId={currentUserId}
                    followers={profile.followers}
                    following={profile.following}
                    isFollowing={Boolean(profile.following?.includes(currentUserId ?? ""))}
                />

                <section className="space-y-6">
                    <div className="rounded-[32px] border border-[#d6c3a4] bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold">Uploaded Lists</h2>
                                <p className="mt-2 text-sm text-[#7c6853]">Browse all journeys created by {profile.name}.</p>
                            </div>
                        </div>
                    </div>

                    {lists.length === 0 ? (
                        <div className="rounded-[32px] border border-[#d6c3a4] bg-white p-10 text-center text-[#7c6853] shadow-sm">
                            <p className="text-xl font-medium">No uploaded lists yet.</p>
                            <p className="mt-3 text-sm">This traveler hasn't shared any journeys yet.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {lists.map((list) => (
                                <Link
                                    key={list.id}
                                    href={`/post/${list.id}`}
                                    className="group rounded-[28px] border border-[#e3d3c0] bg-[#fffaf1] p-6 shadow-sm hover:shadow-lg"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a8267]">List</p>
                                            <h3 className="mt-3 text-xl font-semibold text-[#4a3a2a]">{list.title}</h3>
                                        </div>
                                        <div className="rounded-2xl bg-[#e1d1b7] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5d4a3f]">{list.placeCount} places</div>
                                    </div>
                                    <div className="mt-4 overflow-hidden rounded-2xl">
                                        <Image
                                            src={list.coverImage}
                                            alt={`${list.title} cover`}
                                            width={800}
                                            height={550}
                                            className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <p className="mt-4 text-sm leading-6 text-[#6d5a44] line-clamp-3">{list.description || "No description provided."}</p>
                                    <div className="mt-6 flex items-center justify-between text-xs text-[#8a7660]">
                                        <span>{new Date(list.createdAt).toLocaleDateString('en-GB')}</span>
                                        <span className="rounded-full border border-[#d6c3a4] bg-[#f5e9d6] px-3 py-1">Journey</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Profile
