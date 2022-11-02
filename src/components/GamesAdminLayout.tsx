import { useRouter } from "next/router"
import { ListGroup } from "flowbite-react"
import { GameDataBrief } from "@/utils/intefaces"
import useGamesPage from "@/hooks/useGamesPage"

interface GamesPageProps {
  serverGames: GameDataBrief[]
}

export const GamesAdminLayout = ({ serverGames }: GamesPageProps) => {
  const router = useRouter()
  const { games } = useGamesPage(serverGames)

  if (!games.length)
    return (
      <div className="h-[100%] z-90 m-auto">
        <h2>No games found ;(</h2>
      </div>
    )

  return (
    <ListGroup style={{ maxHeight: "100%", overflowY: "auto" }}>
      {games.map((game, index) => (
        <ListGroup.Item key={game.key} onClick={() => router.push(`/games/${game._id}`)}>
          <p>
            <span>{index + 1}) </span>
            {game.title};
          </p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
