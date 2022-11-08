// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { GameData } from "@/utils/intefaces"
import { addGame, getGameData } from "@/server/databaseUtils"
import { parseGameFromForm } from "@/utils/back-end"

type Response = {
  result: GameData[] | GameData
  message: string
  error: string
  detail: string
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Response>>
) {
  try {
    switch (req.method) {
      case "GET": {
        const result = await getGameData()
        res.status(200).json({ result })
        break
      }
      case "POST": {
        const game = await parseGameFromForm(req)

        const newGame = await addGame(game)
        console.debug("saved game", newGame)

        res
          .status(200)
          .json({ result: newGame, message: `Successfully created game ${newGame._id}` })
        break
      }
      default: {
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).end(`Method ${req.method} is not supported`)
      }
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to load data", detail: JSON.stringify(err) })
  }
}
