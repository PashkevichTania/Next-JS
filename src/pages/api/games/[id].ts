import { NextApiRequest, NextApiResponse } from "next"
import { deleteGame, getGameDataById } from "@/server/databaseUtils"

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
        await deleteGame(id)
        res.status(200).json({ result: `Successfully deleted game ${id}` })
        break
      }
      case "PUT": {
        const data = req.body
        res.status(200).json(data)
        break
      }
      default:
        res.setHeader("Allow", ["GET", "DELETE", "PUT"])
        res.status(405).end(`Method ${req.method} is not supported`)
    }
  } else res.status(400).json({ message: "No id" })
}
