import Image from "next/image";
import Link from "next/link";

const TravelCard = ({ id, title, description, imgURL }: TravelCardProps) => {
    const imageSrc = imgURL || `https://picsum.photos/seed/${id}/800/600`;

    return (
        <Link
            href={`/post/${id}`}
            className="group block overflow-hidden rounded-3xl border-2 border-amber-800 bg-white shadow-sm hover:shadow-xl"
        >
            <div className="relative h-72 w-full">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0" />

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white bg-black/40">
                    <h2 className="text-xl font-semibold line-clamp-1">
                        {title}
                    </h2>

                    <p className="mt-2 text-sm text-white/90 line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default TravelCard;