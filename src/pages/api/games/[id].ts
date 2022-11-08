import { NextApiRequest, NextApiResponse } from "next"
import { deleteGame, getGameDataById, updateGame } from "@/server/databaseUtils"
import { deleteFile } from "@/utils/files"
import { parseGameFromForm } from "@/utils/back-end"

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
        const game = await parseGameFromForm(req)

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
