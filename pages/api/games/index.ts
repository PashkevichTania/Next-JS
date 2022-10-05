// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getGameData } from "server/AceDB"
import { GameData } from "utils/intefaces"

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
    const result = await getGameData()
    switch (req.method) {
      case "GET":
        res.status(200).json({ result })
        break
      //todo
      case "POST":
        // eslint-disable-next-line no-case-declarations
        const { tags }: { tags: string[] } = req.body
        if (!tags?.length) res.status(400).json({ message: `wrong request body; ${req.body}` })
        // eslint-disable-next-line no-case-declarations
        const newResult = result.filter((game: { tags: string[] }) =>
          game.tags.some((value) => tags.includes(value))
        )
        res.status(200).json({ result:  newResult })
        break
      default:
        res.status(400).json({ message: `unsupported method ${req.method}` })
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data", detail: JSON.stringify(err) })
  }
}
