import { GameCard } from "./GameCard"
import { GameDataBrief } from "src/utils/intefaces"
import useGamesPage from "src/hooks/useGamesPage"


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
          key={game._id}
          cover={game.cover}
          id={game._id}
          title={game.title}
          rating={game.ratingCritics}
          ratingAge={game.ratingAge}
        />
      ))}
    </div>
  )
}
