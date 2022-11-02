import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { filtersSelector } from "@/store/selectors"
import { API } from "@/server/api"
import { GameDataBrief } from "@/utils/intefaces"

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
