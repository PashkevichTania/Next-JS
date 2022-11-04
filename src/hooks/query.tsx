import { GameDataBrief } from "@/utils/intefaces"
import { useSelector } from "react-redux"
import { filtersSelector } from "@/store/selectors"
import { API } from "@/server/api"
import { useQuery } from "react-query"
import { QueryKeys } from "src/query"


export default function useGamesQuery(serverGames: GameDataBrief[] = []) {
  const filtersState = useSelector(filtersSelector)

  const query = useQuery({
    queryKey: [QueryKeys.games, filtersState],
    queryFn: () => API.fetchFilteredGames(filtersState),
    initialData: serverGames,
    cacheTime: 5 * 60 * 1000,
  });

  return query
}
