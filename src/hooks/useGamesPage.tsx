import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { filtersSelector } from "src/store/selectors"
import { API } from "src/server/api"
import { GameDataBrief } from "src/utils/intefaces"

export default function useGamesPage(serverGames: GameDataBrief[]) {
  const [games, setGames] = useState(serverGames)
  const filtersState = useSelector(filtersSelector)

  useEffect(() => {
    API.fetchFilteredGames(filtersState).then((result) => {
      setGames(result)
    })
  }, [filtersState])

  return {
    games,
  }
}
