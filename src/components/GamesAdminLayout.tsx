import { ListGroup, Button } from "flowbite-react"
import { GameDataBrief } from "@/utils/intefaces"
import { AiOutlineDelete, MdOutlineEdit } from "react-icons/all"
import { useAdminEdit } from "@/hooks/useAdminForm"
import useGamesQuery from "@/hooks/query"

interface GamesPageProps {
  serverGames: GameDataBrief[]
}

export const GamesAdminLayout = ({ serverGames }: GamesPageProps) => {
  const query = useGamesQuery(serverGames)
  const { deleteGame, editGame } = useAdminEdit()

  if (!query.data?.length)
    return (
      <div className="h-[100%] z-90 m-auto">
        <h2>No games found ;(</h2>
      </div>
    )

  return (
    <ListGroup style={{ maxHeight: "100%", overflowY: "auto" }}>
      {query.data.map((game, index) => (
        <ListGroup.Item key={game._id} href={`/games/${game._id}`}>
          <div className="flex flex-row justify-between w-[100%]">
            <p>
              <span>{index + 1}) </span>
              {game.title};
            </p>
            <div className="flex flex-row gap-2">
              <Button id={game._id} gradientDuoTone="cyanToBlue" pill={true} size="xs" onClick={editGame}>
                <MdOutlineEdit />
              </Button>
              <Button  id={game._id} color="failure" pill={true} size="xs" onClick={deleteGame}>
                <AiOutlineDelete />
              </Button>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
