"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { followUser, unfollowUser } from "@/lib/actions/user.actions";

const FollowConnections = ({ profileId, followers, following, isOwnProfile, isFollowing }: FollowConnectionsProps) => {
    const [modalType, setModalType] = useState<ModalType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [localFollowing, setLocalFollowing] = useState(isFollowing);

    useEffect(() => {
        setLocalFollowing(isFollowing);
    }, [isFollowing]);

    const handleFollowToggle = async () => {
        setIsLoading(true);

        try {
            let response;

            if (localFollowing === false) {
                response = await followUser(profileId);
                if (response?.success) {
                    setLocalFollowing(true);
                }
            } else {
                response = await unfollowUser(profileId);
                if (response?.success) {
                    setLocalFollowing(false);
                }
            }
        } catch (error) {
            console.log('Error while performing action', error);
            alert('Error while performing action');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <section className="mt-6 p-4 rounded-[32px] border border-[#d6c3a4] bg-[#f7efe1] shadow-sm">
                <div className="flex flex-wrap gap-4">
                    <button
                        type="button"
                        onClick={() => setModalType("followers")}
                        className="group flex min-w-40 flex-1 items-center justify-between rounded-3xl border border-[#e3d3c0] bg-[#fffaf1] px-6 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a8267]">
                                Followers
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-[#4a3a2a]">
                                {followers.length}
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-[#f3e5d0] px-3 py-2 text-sm font-medium text-[#6b5845]">
                            View
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => setModalType("following")}
                        className="group flex min-w-40 flex-1 items-center justify-between rounded-3xl border border-[#e3d3c0] bg-[#fffaf1] px-6 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a8267]">
                                Following
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-[#4a3a2a]">
                                {following.length}
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-[#f3e5d0] px-3 py-2 text-sm font-medium text-[#6b5845]">
                            View
                        </div>
                    </button>
                </div>

                {isOwnProfile ? (
                    <p className="mt-4 text-center text-sm text-[#8a7660]">
                        Follow your fellow travelers and grow your journey together.
                    </p>
                ) : (
                    <div className="mt-6 flex justify-center">
                        {localFollowing ? (
                            <button
                                disabled={isLoading}
                                onClick={handleFollowToggle}
                                className="min-w-40 rounded-full border border-[#d6c3a4] bg-[#fffaf1] px-8 py-3 text-sm font-medium text-[#6d5a44] transition-all duration-200 hover:bg-[#f3e5d0] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? "Please wait..." : "Following"}
                            </button>
                        ) : (
                            <button
                                disabled={isLoading}
                                onClick={handleFollowToggle}
                                className="min-w-40 rounded-full bg-[#4a3a2a] px-8 py-3 text-sm font-medium text-[#fffaf1] transition-all duration-200 hover:bg-[#5d4a3f] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? "Please wait..." : "Follow"}
                            </button>
                        )}
                    </div>
                )}
            </section>

            {modalType && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm h-screen"
                    onClick={() => setModalType(null)}
                >
                    <div
                        className="w-full max-w-md rounded-3xl border border-[#e3d3c0] bg-[#fffaf1] p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-[#4a3a2a]">
                                {modalType === "followers"
                                    ? "Followers"
                                    : "Following"}
                            </h2>

                            <button
                                onClick={() => setModalType(null)}
                                className="rounded-full p-2 hover:bg-[#f3e5d0]"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="max-h-96 space-y-3 overflow-y-auto">
                            {(modalType === "followers" ? followers : following).length > 0 ? (
                                (modalType === "followers" ? followers : following).map((user) => {
                                    const initials = (user.name || user.id)
                                        .split(" ")
                                        .map((part: string) => part[0])
                                        .slice(0, 2)
                                        .join("")
                                        .toUpperCase() || user.id.slice(0, 2).toUpperCase();

                                    return (
                                        <Link
                                            key={user.id}
                                            href={`/profile/${user.id}`}
                                            className="flex items-center justify-between rounded-2xl border border-[#e3d3c0] bg-[#fffaf1] px-4 py-3 transition hover:bg-[#f8eee0]"
                                        >
                                            <div className="flex items-center gap-3">
                                                {user.image ? (
                                                    <Image
                                                        src={user.image}
                                                        alt={user.name}
                                                        width={40}
                                                        height={40}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e5d0] text-sm font-semibold text-[#5d4a3f]">
                                                        {initials}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-[#4a3a2a]">{user.name}</p>
                                                    <p className="text-xs text-[#8a7660]">
                                                        {modalType === "followers" ? "Follower" : "Following"}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="rounded-2xl border border-dashed border-[#d8c6ad] p-6 text-center text-[#8a7660]">
                                    No {modalType} yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FollowConnections;