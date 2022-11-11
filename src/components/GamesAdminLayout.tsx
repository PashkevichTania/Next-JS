import { ListGroup } from "flowbite-react"
import { GameDataBrief } from "@/utils/intefaces"
import useGamesQuery from "@/query/hooks"
import selectedGame from "@/store/selectedGame"
import { observer } from "mobx-react-lite"

interface GamesPageProps {
  serverGames: GameDataBrief[]
}

const GamesAdminLayout = ({ serverGames }: GamesPageProps) => {
  const query = useGamesQuery(serverGames)

  if (!query.data?.length)
    return (
      <div className="h-[100%] z-90 m-auto">
        <h2>No games found ;(</h2>
      </div>
    )

  return (
    <ListGroup style={{ maxHeight: "100%", overflowY: "auto" }}>
      {query.data.map((game, index) => (
        <ListGroup.Item key={game._id} onClick={() => selectedGame.fetchGame(game._id)}>
          <div className="flex flex-row justify-between w-[100%]">
            <p>
              <span>{index + 1}) </span>
              {game.title};
            </p>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default observer(GamesAdminLayout)
