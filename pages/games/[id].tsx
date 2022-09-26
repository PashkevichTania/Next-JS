import { NextPageContext } from "next"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { MainLayout } from "components/MainLayout"
import { GameData } from "utils/intefaces"

interface GamePageProps {
  game: GameData
}

const Game = ({ game: serverGame }: GamePageProps) => {
  const [game, setGame] = useState(serverGame)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.API_URL}games/${router.query.id}`)
      const { result } = await response.json()
      setGame(result)
    }

    if (!serverGame) {
      load()
    }
  }, [])

  if (!game) {
    return (
      <MainLayout>
        <p>Loading ...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={game.name}>
      <h1>{game.name}</h1>
      <div className="flex flex-col justify-center items-center">
        <Image
          alt={game.name}
          src={`/assets/games/${game.cover}`}
          height={600}
          width={1200}
          className="object-center object-contain"
        />
        {game.developers.map((dev) => (
          <div key={Math.random()}>{dev}</div>
        ))}
        <div>{game.publisher}</div>
        {game.platforms.map((platform) => (
          <div key={Math.random()}>{platform}</div>
        ))}
        {game.genres.map((value) => (
          <div key={Math.random()}>{value}</div>
        ))}
        <div>{game.releaseDate}</div>
        <div>{game.description}</div>
        <div>{game.ratingCritics}</div>
        <div>{game.ratingUsers}</div>
        <div>{game.ratingAge}</div>
      </div>
    </MainLayout>
  )
}

interface GameNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}

Game.getInitialProps = async ({ req, query }: GameNextPageContext) => {
  //if were called in front end req = undefined
  if (!req) {
    return { game: null }
  }

  const response = await fetch(`${process.env.API_URL}games/${query.id}`)
  const { result } = await response.json()

  return {
    game: result as GameData,
  }
}

export default Game
