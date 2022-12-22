// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { GameData } from "@/utils/intefaces"
import { getGameData } from "@/server/databaseUtils"

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
      default: {
        res.setHeader("Allow", ["GET"])
        res.status(405).end(`Method ${req.method} is not supported`)
      }
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to load data", detail: JSON.stringify(err) })
  }
}
