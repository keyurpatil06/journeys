import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

const Header = ({ user }: { user: User }) => {
    console.log(user);

    return (
        <div className="bg-orange-400 p-2 flex justify-between items-center">
            <div>
                <h1 className="text-3xl">
                    Welcome {user.name}
                </h1>
                <p className="text-xl">Browse and travel places!</p>
            </div>

            <Link
                href={`/profile/${user.id}`}
            >
                <Image
                    height={50}
                    width={50}
                    src={`${user.image}`}
                    alt="user profile"
                    className="rounded-full"
                />
            </Link>
        </div>
    )
}

export default Header