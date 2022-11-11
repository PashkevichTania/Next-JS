import { GameDataBrief } from "@/utils/intefaces"
import filtersStore from "@/store/filters"
import { API } from "@/server/api"
import { useQuery } from "react-query"
import { QueryKeys } from "src/query"
import { toJS } from "mobx"

export default function useGamesQuery(serverGames: GameDataBrief[] = []) {
  const filters = toJS(filtersStore.state)

  return useQuery({
    queryKey: [QueryKeys.games, filters],
    queryFn: () => API.fetchFilteredGames(filters),
    initialData: serverGames,
    cacheTime: 5 * 60 * 1000,
  })
}
