import { GameCard } from "./GameCard"
import { GameDataBrief } from "../utils/intefaces"
import { useGamesPage } from "../utils/customHooks"

interface GamesPageProps {
  serverGames: GameDataBrief[]
}

export const GamesLayout = ({ serverGames }: GamesPageProps) => {
  const { games } = useGamesPage(serverGames)

  if (!games.length)
    return (
      <div className="h-[100%] z-90 m-auto">
        <h2>No games found ;(</h2>
      </div>
    )

  return (
    <div className="p-20 h-[100%] flex flex-wrap justify-between gap-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          cover={game.cover}
          id={game.id}
          name={game.name}
          rating={game.rating}
          ratingAge={game.ratingAge}
        />
      ))}
    </div>
  )
}
