import {NextPageContext} from "next";
import {useState, useEffect} from 'react'
import Link from 'next/link'
import {MainLayout} from '../../components/MainLayout'
import {GameDataBrief} from "../../utils/apiUtils";
import Image from "next/image";

interface GamesPageProps {
    games: GameDataBrief[]
}

const Games = ({ games: serverGames }: GamesPageProps) => {
    const [games, setGames] = useState(serverGames)

    useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}games`)
            const { result } = await response.json()
            setGames(result)
        }

        if (!serverGames) {
            load()
        }
    }, [])

    if (!games) {
        return <MainLayout>
            <p>Loading ...</p>
        </MainLayout>
    }

    return (
        <MainLayout title={"Games Page"}>
            <h1>Games List</h1>
            <div>
                <ul>
                    {games.map(game => (
                        <li key={game.id}>
                            <Link href={`/games/[id]`} as={`/games/${game.id}`}>
                                <a className="flex flex-col items-center">
                                        <Image
                                            alt={game.name}
                                            src={`/assets/games/${game.cover}`}
                                            width={250}
                                            height={350}
                                            className="object-center object-cover "
                                        />
                                        <p>{game.name}</p>
                                    </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}

Games.getInitialProps = async ({req}: NextPageContext) => {
    if (!req) {
        return {posts: null}
    }

    const response = await fetch(`${process.env.API_URL}games`)
    const { result } = await response.json()

    return {
        games: result as GameDataBrief[]
    }
}

export default Games
