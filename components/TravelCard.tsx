import Image from "next/image"
import Link from "next/link"

const TravelCard = ({ id, title, description, imgURL }: TravelCardProps) => {
    const imageSrc = `https://picsum.photos/seed/${id}/800/600` // TODO

    return (
        <Link
            href={`/post/${id}`}
            className="rounded-2xl p-4 bg-slate-400"
        >
            <div className="max-w-96 relative">

                <div className="">
                    <Image
                        width={810}
                        height={180}
                        src={imageSrc}
                        alt={title}
                        className="rounded-xl"
                    />
                </div>

                <div className="absolute inset-0" />

                <div className="absolute bottom-0 text-white p-4 bg-black/30 rounded-xl w-full">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-sm opacity-90 line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default TravelCard