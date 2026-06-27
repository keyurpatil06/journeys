'use client'

import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const Page = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSignIn = async () => {
        setIsLoading(true)
        try {
            return await authClient.signIn.social({ provider: 'google' })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } finally {
            // setIsLoading(false)
        }
    }

    return (
        <main className="sign-in">
            <aside className="testimonial">
                <Link href='/'>
                    <Image
                        src='/assets/icons/logo.svg'
                        alt='logo'
                        width={32}
                        height={32}
                        className="size-14 rounded-full"
                    />
                    <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
                </Link>

                <div className="description">
                    <section>
                        <figure>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Image
                                    key={index}
                                    src='/assets/icons/star.svg'
                                    alt="star"
                                    width={20}
                                    height={20}
                                    className="size-6"
                                />
                            ))}
                        </figure>
                        <p>{process.env.NEXT_PUBLIC_APP_NAME} makes travel planning fast, smooth and sharable in seconds!</p>
                        <article>
                            <Image
                                src='/assets/images/jason.png'
                                alt='jason'
                                width={64}
                                height={64}
                                className="rounded-full size-14"
                            />
                            <div>
                                <h2>{process.env.NEXT_PUBLIC_TESTIMONIAL_NAME}</h2>
                                <p>{process.env.NEXT_PUBLIC_TESTIMONIAL_JOB}</p>
                            </div>
                        </article>
                    </section>
                </div>

                <p>&copy; {process.env.NEXT_PUBLIC_APP_NAME} {(new Date()).getFullYear()}</p>
            </aside>

            <aside className="google-sign-in">
                <section>
                    <Link href='/'>
                        <Image
                            src='/assets/icons/logo.svg'
                            alt='logo'
                            width={40}
                            height={40}
                            className="size-12 rounded-full"
                        />
                        <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
                    </Link>
                    <p>Create and share your very first <span>Journey</span> in no time!</p>
                    <button onClick={handleSignIn} disabled={isLoading}>
                        <Image
                            src='/assets/icons/google.svg'
                            alt='google'
                            width={22}
                            height={22}
                            className="w-8 h-8"
                        />
                        <span className="text-lg">{isLoading ? 'Signing you in...' : 'Sign in with Google'}</span>
                    </button>
                </section>
            </aside>

            <div className="overlay" />
        </main>
    )
}

export default Page