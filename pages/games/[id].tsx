import { NextPageContext } from "next"
import { useEffect, useState } from "react"
import Image from "next/future/image"
import { useRouter } from "next/router"
import { MainLayout } from "components/MainLayout"
import { GameData } from "utils/intefaces"
import stylesMain from "styles/main.module.scss"

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
      <div className="flex flex-col justify-center items-center h-[100%]">
        <div className="w-[100%] min-h-[calc(100vh_-_173px)] relative flex flex-col justify-center items-center pt-12 pb-12">
          <Image
            alt={game.name}
            src={`/assets/games/bg/${game.bg}`}
            className="absolute left-0 top-0 max-w-[100%] h-auto object-cover z-20"
            fill
            placeholder="blur"
            blurDataURL={`/assets/games/bg/blur/${game.bg.split('.')[0]}.jpg`}
          />
            <div className="w-[90%] z-30">
              <div className={stylesMain.glass2}>
                <div className="pt-12 pb-12 pr-10 pl-10 text-lg">
                  <h2>{game.name}</h2>
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
              </div>
            </div>
          </div>
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
