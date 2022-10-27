import { MainLayout } from "components/MainLayout"
import { getGameDataBrief } from "src/server/databaseUtils"
import { serializeModel } from "src/utils/back-end"
import { GameDataBrief } from "src/utils/intefaces"
import Sidebar from "components/Sidebar"
import { GamesAdminLayout } from "components/GamesAdminLayout"
import { GameForm } from "components/GameForm"

interface GamesPageProps {
  games: GameDataBrief[]
}

const Admin = ({ games: serverGames }: GamesPageProps) => {
  return (
    <MainLayout title={"Admin Page"}>
      <div className="h-[calc(100vh_-_165px)] relative flex flex-row">
        <div className="sticky left-0 top-0 z-20 transition-all">
          <Sidebar />
        </div>
        <div className="h-[100%] w-[100%] flex flex-col items-center pt-24 px-6 box-border">
          <div>
            <h2 className="text-2xl font-bold pb-2">Admin page</h2>
            <span>(Games count: {serverGames.length})</span>
          </div>
          <div className="w-[100%] h-[calc(100%_-_56px)] flex flex-row justify-evenly">
            <div className="h-[100%] w-[40%] pb-4">
              <p className="text-xl font-semibold pb-2 text-center">Edit games</p>
              <div className="h-[calc(100%_-_36px)] rounded-lg overflow-hidden">
                <GamesAdminLayout serverGames={serverGames} />
              </div>
            </div>
            <div className="h-[100%] w-[50%] box-border pb-4">
              <p className="text-xl font-semibold pb-2 text-center">Add games</p>
              <div className="h-[calc(100%_-_36px)] rounded-lg overflow-hidden">
                <GameForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export async function getStaticProps() {
  const result = await getGameDataBrief()

  return {
    props: {
      games: serializeModel(result),
    },
  }
}

export default Admin
