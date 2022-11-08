import { GameData, GameDataBrief, GameDataClient } from "@/utils/intefaces"
import path from "path"
import fsPromises from "fs/promises"
import { NextApiRequest } from "next"
import { getNewFileName, parseForm, saveBlur, saveFile } from "@/utils/files"
import { CONST } from "@/utils/constants"

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

export const parseGameFromForm = async (req: NextApiRequest) => {
  const { fields, files } = await parseForm(req)
  const { bg, cover } = files

  console.debug("bg, cover ", { bg, cover })
  let newBg: string | null = null
  let newCover: string | null = null
  if (bg) {
    newBg = getNewFileName({ type: "bg", oldName: bg.newFilename, gameName: fields.title })
    saveFile({
      initialFilePath: bg.newFilename,
      destinationPath: CONST.BG_FOLDER,
      fileName: newBg,
    }).then((path) =>
      saveBlur({ fileName: newBg!, filePath: path, destinationPath: CONST.BLUR_FOLDER })
    )
  }
  if (cover) {
    newCover = getNewFileName({ type: "cover", oldName: cover.newFilename, gameName: fields.title })
    saveFile({
      initialFilePath: cover.newFilename,
      destinationPath: CONST.COVERS_FOLDER,
      fileName: newCover,
    })
  }

  return {
    ...fields,
    developers: fields.developers.split(","),
    releaseDate: new Date(fields.releaseDate),
    ratingCritics: +fields.ratingCritics,
    ratingUsers: +fields.ratingUsers,
    platforms: JSON.parse(fields.platforms),
    genres: JSON.parse(fields.genres),
    tags: JSON.parse(fields.tags),
    bg: newBg || "bg-placeholder.jpg",
    cover: newCover || "cover-placeholder.jpg",
  } as Omit<GameData, "_id">
}
