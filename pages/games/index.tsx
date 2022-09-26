import { MainLayout } from "components/MainLayout"
import { GameDataBrief } from "utils/apiUtils"
import { GameCard } from "components/GameCard"

interface GamesPageProps {
  games: GameDataBrief[]
}

const Games = ({ games }: GamesPageProps) => {
  return (
    <MainLayout title={"Games Page"}>
      <div className="bg-white dark:bg-gray-800/50 p-20 h-[100%]">
        <h1>Games List</h1>
        <div className="h-[100%] flex flex-wrap justify-between gap-6">
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
      </div>
    </MainLayout>
  )
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.API_URL}games/brief`)
  const { result } = await response.json()

  return {
    props: {
      games: result as GameDataBrief[],
    },
  }
}

export default Games
