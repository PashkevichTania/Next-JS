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
      case "POST": {
        try {
          const { fields, files } = await parseForm(req)
          const { bg, cover } = files

          const game = {
            ...fields,
            tags: [],
            developers: fields.developers.split(","),
            releaseDate: new Date(fields.releaseDate),
            ratingCritics: +fields.ratingCritics,
            ratingUsers: +fields.ratingUsers,
            platforms: JSON.parse(fields.platforms),
            genres: JSON.parse(fields.genres),
            bg: bg?.newFilename || "bg-placeholder.jpg" ,
            cover: cover?.newFilename || "cover-placeholder.jpg",
          } as Omit<GameData, "_id">
          console.log("saved game", game)

          res.status(200).json({ result: game })

          if (bg && cover) {
            const bgPath = await saveFile(bg, CONST.BG_FOLDER)
            await saveFile(cover, CONST.COVERS_FOLDER)
            await saveBlur(bgPath, CONST.BLUR_FOLDER)
            console.log("saved files")
          }

          await addGame(game)
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
