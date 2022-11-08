import { GameDataBrief } from "@/utils/intefaces"
import { useAppSelector } from "@/store/hooks"
import { filtersSelector } from "@/store/selectors"
import { API } from "@/server/api"
import { useQuery } from "react-query"
import { QueryKeys } from "src/query"

export default function useGamesQuery(serverGames: GameDataBrief[] = []) {
  const filtersState = useAppSelector(filtersSelector)

  return useQuery({
    queryKey: [QueryKeys.games, filtersState],
    queryFn: () => API.fetchFilteredGames(filtersState),
    initialData: serverGames,
    cacheTime: 5 * 60 * 1000,
  })
}
