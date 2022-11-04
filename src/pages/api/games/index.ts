// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { GameData } from "@/utils/intefaces"
import { addGame, getGameData } from "@/server/databaseUtils"
import { parseForm, saveBlur, saveFile } from "@/utils/files"
import { CONST } from "@/utils/constants"

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
        const { fields, files } = await parseForm(req)
        const { bg, cover } = files

        const game = {
          ...fields,
          developers: fields.developers.split(","),
          releaseDate: new Date(fields.releaseDate),
          ratingCritics: +fields.ratingCritics,
          ratingUsers: +fields.ratingUsers,
          platforms: JSON.parse(fields.platforms),
          genres: JSON.parse(fields.genres),
          tags: JSON.parse(fields.tags),
          bg: bg?.newFilename || "bg-placeholder.jpg" ,
          cover: cover?.newFilename || "cover-placeholder.jpg",
        } as Omit<GameData, "_id">

        if (bg && cover) {
          const bgPath = await saveFile(bg, CONST.BG_FOLDER)
          await saveFile(cover, CONST.COVERS_FOLDER)
          await saveBlur(bgPath, CONST.BLUR_FOLDER)
          console.debug("saved files")
        }

        const newGame = await addGame(game)
        console.debug("saved game", newGame)

        res.status(200).json({ result: newGame, message: `Successfully created game ${newGame._id}` })
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
