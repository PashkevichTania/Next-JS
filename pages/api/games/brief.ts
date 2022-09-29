// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getGameDataBrief } from "utils/apiUtils"
import { GameDataBrief } from "utils/intefaces"

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
    const { ids } = req.query
    const result = await getGameDataBrief(ids)
    res.status(200).json({ result: result })
  } catch (err) {
    res.status(500).json({ error: "failed to load data", detail: JSON.stringify(err) })
  }
}
