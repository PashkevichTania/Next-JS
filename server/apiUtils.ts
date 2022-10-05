import path from "path"
import fsPromises from "fs/promises"
import { GameData } from "utils/intefaces"

export type MOCK_BD_DATA = {
  games: GameData[]
}

export const getJSON: () => Promise<MOCK_BD_DATA> = async () => {
  const filePath = path.join(process.cwd(), "server/mock_db.json")
  const jsonData = await fsPromises.readFile(filePath, "utf-8")
  return JSON.parse(jsonData)
}

export const idsArrayToQuery = (array: string[]) => {
  const query = new URLSearchParams()
  array.forEach((v) => query.append("ids", v))
  return query
}
