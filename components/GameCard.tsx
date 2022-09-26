import Link from 'next/link'
import Image from 'next/image'
import {Rating} from "./Rating";

interface CardProps {
    id: string;
    name: string;
    cover: string;
    rating: number;
    ratingAge: string;
}

const getRatingImg = (rating: string) => {
  if (rating.toLowerCase() === "m") return "/assets/icons/rating/m.png"
  if (rating.toLowerCase() === "t")  return "/assets/icons/rating/t.jpeg"
    return ""
}

export function GameCard({rating, ratingAge, cover, name, id}: CardProps) {
    return (
        <>
            <div
                className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <Link href={`/games/[id]`} as={`/games/${id}`}>
                    <a className="flex flex-col items-center">
                        <Image
                            alt={name}
                            src={`/assets/games/${cover}`}
                            width={250}
                            height={350}
                            className="object-center object-cover "
                        />
                    </a>
                </Link>
                <div className="p-5">
                    <Link href={`/games/[id]`} as={`/games/${id}`}>
                        <a className="flex flex-col items-center">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
                                {name}
                            </h5>
                        </a>
                    </Link>
                    <div className="flex justify-between">
                        <div>
                            <Rating rating={rating} />
                            <p>Critics rating: {rating} out of 100.</p>
                        </div>
                        <Image
                            alt="age esrb rating"
                            src={getRatingImg(ratingAge)}
                            width={40}
                            height={40}
                            className="object-center object-contain"
                        />
                    </div>
                    <Link href={`/games/[id]`} as={`/games/${id}`}>
                        <a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            More
                            <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}
