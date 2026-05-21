"use client"

interface DayPlanCardProps {
    day: string
    summary: string
    activities: { time: string; title: string; location: string }[]
    travelTips: string
}

const DayPlanCard = ({ day, summary, activities, travelTips }: DayPlanCardProps) => {
    return (
        <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-primary">{day}</p>
                    <p className="text-sm text-muted-foreground">{summary}</p>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Day plan</div>
            </div>

            <div className="space-y-3">
                {activities.map((activity, index) => (
                    <div key={index} className="rounded-3xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-4 text-sm font-semibold">
                            <span>{activity.title}</span>
                            <span className="text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{activity.location}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
                <p className="font-semibold">Travel tip</p>
                <p className="mt-2">{travelTips}</p>
            </div>
        </div>
    )
}

export default DayPlanCard
