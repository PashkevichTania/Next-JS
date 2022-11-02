// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import {
  addGame,
  getFilteredGamesData,
  getGameData,
  getGameDataBrief,
  getGamesByKeys,
} from "@/server/databaseUtils"
import { gamesModel, connectDB } from "@/server/database"
import formidable from "formidable"
import { parseForm, saveBlur, saveFile } from "@/utils/files"
import { GameData } from "@/utils/intefaces"

const gamesToPreview = [
  "i960g6", //"The Last of Us Part I"
  "a884nl", //"The Last of Us Part II"
  "r63vpd", //"Disco Elysium: The Final Cut"
  "8swucl", //"BioShock Infinite"
  "kn15c7", //"Fortnite"
  "45ec0g", //"Cyberpunk 2077"
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

        // data.games.forEach(g => {
        //   const f = {...g, releaseDate: new Date(g.releaseDate)}
        //   const c = new gamesModel(f)
        //   c.save()
        // })
        result = await getGameData()
        res.status(200).json(result)
        break
      case "POST": {
        try {
          const { fields, files } = await parseForm(req)
          const { bg, cover } = files

          // console.debug("AAAAAA", { bg, cover })

          const game = {
            ...fields,
            platforms: JSON.parse(fields.platforms),
            genres: JSON.parse(fields.genres),
            bg: bg.originalFilename,
            cover: cover.originalFilename,
          } as unknown as Pick<GameData, "_id">
          console.log("saved game", game)

          res.status(200).json({ result: game })

          const bgPath = await saveFile(bg, "public/test/")
          await saveFile(cover, "public/test/")
          await saveBlur(bgPath, "public/test/blur/")
          console.log("saved files")

          // await addGame(game)
          console.log("saved game", game)
        } catch (e) {
          console.error("ERROR POST", e)
          res.status(500)
        }
        break
      }
      case "PUT": {
        const data = req.body
        res.status(200).json(data)
        break
      }
      case "DELETE": {
        const data = req.body
        res.status(200).json(data)
        break
      }
      default:
        res.setHeader("Allow", ["GET"])
        res.status(405).end(`Method ${req.method} is not supported`)
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to load data", detail: JSON.stringify(err) })
  }
}
