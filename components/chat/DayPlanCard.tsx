"use client"

const DayPlanCard = ({ day, summary, activities, travelTips }: DayPlanCardProps) => {
    return (
        <div className="rounded-3xl border border-[#e3d3c0] bg-[#fffaf1] p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9a8267]">{day}</p>
                    <p className="mt-2 text-sm leading-6 text-[#6d5a44]">{summary}</p>
                </div>

                <div className="whitespace-nowrap rounded-full border border-[#d6c3a4] bg-[#f3e5d0] px-3 py-1 text-xs font-semibold text-[#6d5a44]">
                    Day Plan
                </div>
            </div>

            <div className="space-y-3">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="rounded-3xl border border-[#eadcc7] bg-[#f7efe1] p-4 transition-all hover:bg-[#f3e5d0]"
                    >
                        <div className="flex items-center justify-between gap-4 text-sm">
                            <span className="font-semibold text-[#4a3a2a]">{activity.title}</span>
                            <span className="rounded-full bg-[#fffaf1] px-3 py-1 text-xs font-medium text-[#8a7660]">{activity.time}</span>
                        </div>

                        <p className="mt-2 text-sm text-[#6d5a44]">{activity.location}</p>
                    </div>
                ))}
            </div>

            <div className="mt-5 rounded-3xl border border-[#d6c3a4] bg-[#f3e5d0] p-4">
                <p className="text-sm font-semibold text-[#4a3a2a]">Travel Tip</p>
                <p className="mt-2 text-sm leading-6 text-[#6d5a44]">{travelTips}</p>
            </div>
        </div>
    )
}

export default DayPlanCard
