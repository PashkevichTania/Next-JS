import { MainLayout } from "@/components/MainLayout"
import { GameDataBrief } from "@/utils/intefaces"
import Sidebar from "@/components/Sidebar"
import { GamesLayout } from "@/components/GamesLayout"
import { getGameDataBrief } from "@/server/databaseUtils"
import { serializeModel } from "@/utils/back-end"

interface GamesPageProps {
  games: GameDataBrief[]
}

const Games = ({ games: serverGames }: GamesPageProps) => {
  return (
    <MainLayout title={"Games Page"}>
      <div className="bg-white dark:bg-gray-800/50 h-[100%] min-h-[calc(100vh_-_165px)] relative flex flex-row">
        <div className="sticky left-0 top-0 z-20 transition-all">
          <Sidebar />
        </div>
        <GamesLayout serverGames={serverGames} />
      </div>
    </MainLayout>
  )
}

// executed during build
export async function getStaticProps() {
  //"You should not fetch an API route from getStaticProps..."
  // const response = await fetch(`${process.env.API_URL}games/brief`)
  // const { result } = await response.json()

  const result = await getGameDataBrief()

  return {
    props: {
      games: serializeModel(result),
    },
  }
}

export default Games
