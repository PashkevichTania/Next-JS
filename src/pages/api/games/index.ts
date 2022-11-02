// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { GameData } from "@/utils/intefaces"
import { getGameData } from "@/server/databaseUtils"

type DataResponse = {
  result: GameData[]
}

type Message = {
  message: string
}

type Error = {
  error: string
  detail: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse | Message | Error>
) {
  try {
    switch (req.method) {
      case "GET":
        const result = await getGameData()
        res.status(200).json({ result })
        break
      //todo
      // case "POST":
      //   res.status(200).json({ result: newResult })
      //   break
      default:
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).end(`Method ${req.method} is not supported`)
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to load data", detail: JSON.stringify(err) })
  }
}
