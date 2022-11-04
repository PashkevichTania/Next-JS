// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import {
  addGame, deleteGame,
  getFilteredGamesData,
  getGameData,
  getGameDataBrief,
  getGamesByKeys,
} from "@/server/databaseUtils"
import { gamesModel, connectDB } from "@/server/database"
import formidable from "formidable"
import { parseForm, saveBlur, saveFile } from "@/utils/files"
import { GameData } from "@/utils/intefaces"
import { CONST } from "@/utils/constants"
import { getJSON } from "@/utils/back-end"

const gamesToPreview = [
  "The Last of Us Part I",
  "The Last of Us Part II",
  "Disco Elysium: The Final Cut",
  "BioShock Infinite",
  "Fortnite",
  "Cyberpunk 2077",
]

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    let result = {}
    switch (req.method) {
      case "GET":
        connectDB().catch((error) => console.error(error))
        // const data = await getJSON()
        //
        // data.games.forEach(g => {
        //   // @ts-ignore
        //   delete g.key
        //   const f = {...g, releaseDate: new Date(g.releaseDate)}
        //   const c = new gamesModel(f)
        //   c.save()
        // })
        result = await getGameData()
        res.status(200).json(result)
        break
      default:
        res.setHeader("Allow", ["GET"])
        res.status(405).end(`Method ${req.method} is not supported`)
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to load data", detail: JSON.stringify(err) })
  }
}
