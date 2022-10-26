import path from "path"
import fsPromises from "fs/promises"
import { GameData, GameDataBrief, GameDataClient } from "src/utils/intefaces"
import { FiltersState } from "src/store/filtersSlice"

export type MOCK_BD_DATA = {
  games: GameData[]
}

export const getJSON: () => Promise<MOCK_BD_DATA> = async () => {
  const filePath = path.join(process.cwd(), "src/server/mock_db.json")
  const jsonData = await fsPromises.readFile(filePath, "utf-8")
  return JSON.parse(jsonData)
}

export const idsArrayToQuery = (array: string[]) => {
  const query = new URLSearchParams()
  array.forEach((v) => query.append("ids", v))
  return query
}

export const serializeModel = (data: GameData | GameDataBrief | GameData[] | GameDataBrief[]): GameDataClient | GameDataBrief | GameDataClient[] | GameDataBrief[] => {
  if (Array.isArray(data)){
    return data.map(game => {
      return {
        ...game,
        _id: game._id.toString(),
        releaseDate: "releaseDate" in game ? game.releaseDate.toLocaleDateString() : "",
      }
    })
  }
  return {
    ...data,
    _id: data._id.toString(),
    releaseDate: "releaseDate" in data ? data.releaseDate.toLocaleDateString() : ''
  }
}

export const API = {
  fetchFilteredGames: async (filters: Partial<FiltersState>): Promise<GameDataBrief[]> => {
    const response = await fetch(`api/games/brief?filters=${JSON.stringify(filters)}`)
    const result = await response.json()
    return result.result
  },
}
