import path from "path"
import fsPromises from "fs/promises"
import { GameData, GameDataBrief } from "./intefaces"

export type MOCK_BD_DATA = {
  games: GameData[]
}

export const getJSON: () => Promise<MOCK_BD_DATA> = async () => {
  const filePath = path.join(process.cwd(), "mock_db.json")
  const jsonData = await fsPromises.readFile(filePath, "utf-8")
  return JSON.parse(jsonData)
}

// eslint-disable-next-line no-unused-vars
export const getGameDataBrief: (ids?: string[] | string) => Promise<GameDataBrief[]> = async (ids) => {
  const gamesData = await getJSON()
  let result = gamesData.games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      cover: game.cover,
      rating: game.ratingCritics,
      ratingAge: game.ratingAge,
    }
  })
  if (ids) result = result.filter((game) => ids.includes(game.id))
  return result
}

// eslint-disable-next-line no-unused-vars
type GetGameById = (id: string) => Promise<GameData | undefined>

export const getGameById: GetGameById = async (id: string) => {
  const gamesData = await getJSON()
  return gamesData.games.find((game) => game.id === id)
}


export const idsArrayToQuery = (array: string[]) => {
  const query = new URLSearchParams()
  array.forEach((v) => query.append("ids", v))
  return query
}
