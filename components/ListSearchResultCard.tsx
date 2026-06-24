import Link from "next/link"
import { CalendarDays, MapPin, User } from "lucide-react"

const ListSearchResultCard = ({
    result,
    onClick,
}: {
    result: ListSearchResult
    onClick?: () => void
}) => {
    return (
        <Link
            href={`/post/${result.id}`}
            onClick={onClick}
            className="block w-full text-left bg-[#fffefb] border border-slate-200 rounded-3xl p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="inline-flex rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                            List
                        </span>
                        <span className="text-sm text-slate-500">{result.placeCount} place{result.placeCount === 1 ? "" : "s"}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{result.title}</h3>
                    <p className="text-sm leading-6 text-slate-600 line-clamp-3">{result.description}</p>
                </div>

                <div className="flex flex-col gap-2 text-right sm:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        <User className="h-3.5 w-3.5" />
                        {result.userEmail ?? "Anonymous"}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {new Date(result.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {result.placesPreview.length > 0 ? (
                <div className="mt-4 grid gap-2 text-sm text-slate-500">
                    <div className="font-medium text-slate-700">Places in this list:</div>
                    <div className="flex flex-wrap gap-2">
                        {result.placesPreview.map((place) => (
                            <span key={place} className="rounded-full bg-slate-100 px-3 py-1">
                                {place}
                            </span>
                        ))}
                    </div>
                </div>
            ) : null}

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                Browse this saved journey list
            </div>
        </Link>
    )
}

export default ListSearchResultCard
