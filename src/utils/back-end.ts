import { GameData, GameDataBrief, GameDataClient } from "@/utils/intefaces"

export const idsArrayToQuery = (array: string[]) => {
  const query = new URLSearchParams()
  array.forEach((v) => query.append("ids", v))
  return query
}

type SerializeProp = GameData | GameDataBrief | GameData[] | GameDataBrief[]
type SerializeReturn = GameDataClient | GameDataBrief | GameDataClient[] | GameDataBrief[]

export const serializeModel = (data: SerializeProp): SerializeReturn => {
  if (Array.isArray(data)) {
    return data.map((game) => {
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
    releaseDate: "releaseDate" in data ? data.releaseDate.toLocaleDateString() : "",
  }
}
