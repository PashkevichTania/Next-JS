import { NextApiRequest, NextApiResponse } from "next"
import {getGameDataById} from "@/server/databaseUtils"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id
  if (typeof id === "string") {
    switch (req.method) {
      case "GET": {
        const gameData = await getGameDataById(id as string)
        res.status(200).json({ result: gameData })
        break
      }
      default:
        res.setHeader("Allow", ["GET"])
        res.status(405).end(`Method ${req.method} is not supported`)
    }
  } else res.status(400).json({ message: "No id" })
}
