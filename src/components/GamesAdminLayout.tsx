import { ListGroup } from "flowbite-react"
import { GameDataBrief } from "@/utils/intefaces"
import useGamesQuery from "@/hooks/query"
import { fetchGame } from "@/store/gameEditSlice"
import { useAppDispatch } from "@/store/hooks"

interface GamesPageProps {
  serverGames: GameDataBrief[]
}

export const GamesAdminLayout = ({ serverGames }: GamesPageProps) => {
  const query = useGamesQuery(serverGames)
  const dispatch = useAppDispatch()

  if (!query.data?.length)
    return (
      <div className="h-[100%] z-90 m-auto">
        <h2>No games found ;(</h2>
      </div>
    )

  return (
    <ListGroup style={{ maxHeight: "100%", overflowY: "auto" }}>
      {query.data.map((game, index) => (
        <ListGroup.Item key={game._id} onClick={()=> dispatch(fetchGame(game._id))}>
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
