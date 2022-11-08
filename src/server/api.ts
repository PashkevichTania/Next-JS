import { GameData, GameDataBrief } from "@/utils/intefaces"
import { FiltersState } from "@/store/filtersSlice"
import { queryClient, QueryKeys } from "src/query"

export const API = {
  fetchGameById: async (id: string): Promise<GameData> => {
    const response = await fetch(`api/games/${id}`)
    const { result } = await response.json()
    return result
  },
  fetchFilteredGames: async (filters: Partial<FiltersState>): Promise<GameDataBrief[]> => {
    const response = await fetch(`api/games/brief?filters=${JSON.stringify(filters)}`)
    const { result } = await response.json()
    return result
  },
  createGame: async (form: FormData) => {
    const response = await fetch(`/api/games`, {
      method: "POST",
      body: form,
    })

    queryClient.invalidateQueries({ queryKey: QueryKeys.games })

    const { result } = await response.json()
    return { result, code: response.status, ok: response.ok }
  },
  deleteGame: async (id: string) => {
    const response = await fetch(`/api/games/${id}`, {
      method: "DELETE",
    })
    queryClient.invalidateQueries({ queryKey: QueryKeys.games })

    const { result } = await response.json()
    return { result, code: response.status, ok: response.ok }
  },
  updateGame: async (id: string, form: FormData) => {
    const response = await fetch(`/api/games/${id}`, {
      method: "PUT",
      body: form,
    })

    queryClient.invalidateQueries({ queryKey: QueryKeys.games })

    const { result } = await response.json()
    return { result, code: response.status, ok: response.ok }
  },
}
