"use client";

import { useState } from "react";
import { X } from "lucide-react";

const FollowConnections = ({ profileId, currentUserId, followers, following }: FollowConnectionsProps) => {
    const isOwnProfile = profileId === currentUserId;
    const [modalType, setModalType] = useState<ModalType>(null);

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

                {isOwnProfile && (
                    <p className="mt-3 text-center text-sm text-[#8a7660]">
                        Follow your fellow travelers and grow your journey together.
                    </p>
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

                        <div className="max-h-96 overflow-y-auto">
                            {/* Replace with server action data later */}
                            <div className="rounded-2xl border border-dashed border-[#d8c6ad] p-6 text-center text-[#8a7660]">
                                User list will appear here.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FollowConnections;