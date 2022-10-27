import { GameDataBrief } from "src/utils/intefaces"
import { FiltersState } from "src/store/filtersSlice"

export const API = {
  fetchFilteredGames: async (filters: Partial<FiltersState>): Promise<GameDataBrief[]> => {
    const response = await fetch(`api/games/brief?filters=${JSON.stringify(filters)}`)
    const result = await response.json()
    return result.result
  },
}
