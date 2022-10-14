// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { filterGamesData, getGameDataBrief } from "src/server/AceDB"
import { GameDataBrief } from "src/utils/intefaces"

type DataResponse = {
  result: GameDataBrief[]
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
    const { ids, filters } = req.query
    if (ids) {
      const result = await getGameDataBrief(Array.isArray(ids) ? ids : [ids])
      res.status(200).json({ result: result })
    } else if (filters && typeof filters === "string") {
      const result = await filterGamesData(JSON.parse(filters))
      res.status(200).json({ result: result })
    } else {
      const result = await getGameDataBrief()
      res.status(200).json({ result: result })
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data", detail: JSON.stringify(err) })
  }
}
