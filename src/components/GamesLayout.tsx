import { GameCard } from "./GameCard"
import { GameDataBrief } from "@/utils/intefaces"
import useGamesQuery from "@/query/hooks"
import { observer } from "mobx-react-lite"

interface GamesPageProps {
  serverGames: GameDataBrief[]
}

const GamesLayout = ({ serverGames }: GamesPageProps) => {
  const query = useGamesQuery(serverGames)

  if (!query.data?.length)
    return (
      <div className="h-[100%] z-90 m-auto">
        <h2>No games found ;(</h2>
      </div>
    )

  return (
    <div className="p-20 h-[100%] flex flex-wrap justify-between gap-6">
      {query.data.map((game) => (
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

export default observer(GamesLayout)
