import { NextApiRequest, NextApiResponse } from "next"
import { getGameById } from "../../../utils/apiUtils"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id
  if (typeof req.query.id === "string") {
    const gameData = await getGameById(id as string)
    res.status(200).json({ result: gameData })
  } else res.status(400).json({ message: "no id" })
}
