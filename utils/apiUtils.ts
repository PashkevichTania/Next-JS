import path from "path"
import fsPromises from "fs/promises"
import { GameData } from "./intefaces"

export type MOCK_BD_DATA = {
  games: GameData[]
}

export type GameDataBrief = {
  id: string
  name: string
  cover: string
  rating: number
  ratingAge: string
}

export const getJSON: () => Promise<MOCK_BD_DATA> = async () => {
  const filePath = path.join(process.cwd(), "mock_db.json")
  const jsonData = await fsPromises.readFile(filePath, "utf-8")
  return JSON.parse(jsonData)
}

export const getGameDataBrief: () => Promise<GameDataBrief[]> = async () => {
  const gamesData = await getJSON()
  return gamesData.games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      cover: game.cover,
      rating: game.ratingCritics,
      ratingAge: game.ratingAge,
    }
  })
}

// eslint-disable-next-line no-unused-vars
type GetGameById = (id: string) => Promise<GameData | undefined>

export const getGameById: GetGameById = async (id: string) => {
  const gamesData = await getJSON()
  return gamesData.games.find((game) => game.id === id)
}
