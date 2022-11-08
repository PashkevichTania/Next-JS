import { NextApiRequest, NextApiResponse } from "next"
import { addGame, deleteGame, getGameDataById, updateGame } from "@/server/databaseUtils"
import { deleteFile, parseForm, saveBlur, saveFile } from "@/utils/files"
import { GameData } from "@/utils/intefaces"
import { CONST } from "@/utils/constants"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id
  console.log(id)
  if (typeof id === "string") {
    switch (req.method) {
      case "GET": {
        const gameData = await getGameDataById(id as string)
        res.status(200).json({ result: gameData })
        break
      }
      case "DELETE": {
        const deletedGame = await deleteGame(id)
        res.status(200).json({ result: deletedGame, message: `Successfully deleted game ${id}` })
        deleteFile(deletedGame.bg)
        deleteFile(deletedGame.cover)
        break
      }
      case "PUT": {
        const { fields, files } = await parseForm(req)
        const { bg, cover } = files

        console.debug("bg, cover ", { bg, cover })

        const game = {
          ...fields,
          developers: fields.developers.split(","),
          releaseDate: new Date(fields.releaseDate),
          ratingCritics: +fields.ratingCritics,
          ratingUsers: +fields.ratingUsers,
          platforms: JSON.parse(fields.platforms),
          genres: JSON.parse(fields.genres),
          tags: JSON.parse(fields.tags),
          bg: bg?.newFilename || fields.prev_bg || "bg-placeholder.jpg",
          cover: cover?.newFilename || fields.prev_cover || "cover-placeholder.jpg",
        } as Omit<GameData, "_id">

        if (bg && cover) {
          const bgPath = await saveFile(bg, CONST.BG_FOLDER)
          await saveFile(cover, CONST.COVERS_FOLDER)
          await saveBlur(bgPath, CONST.BLUR_FOLDER)
          console.debug("saved files")
        }
        console.debug(game)

        const updatedGame = await updateGame(id, game)

        console.debug("updatedGame", updatedGame)

        res.status(200).json(updatedGame)
        break
      }
      default:
        res.setHeader("Allow", ["GET", "DELETE", "PUT"])
        res.status(405).end(`Method ${req.method} is not supported`)
    }
  } else res.status(400).json({ message: "No id" })
}
