import { GameDataBrief } from "@/utils/intefaces"
import filters from "@/store/filters"
import { API } from "@/server/api"
import { useQuery } from "react-query"
import { QueryKeys } from "src/query"

export default function useGamesQuery(serverGames: GameDataBrief[] = []) {

  return useQuery({
    queryKey: [QueryKeys.games, filters.state],
    queryFn: () => API.fetchFilteredGames(filters.state),
    initialData: serverGames,
    cacheTime: 5 * 60 * 1000,
  })
}
