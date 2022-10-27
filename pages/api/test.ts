// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import {
  getFilteredGamesData,
  getGameData,
  getGameDataBrief,
  getGamesByKeys,
} from "src/server/databaseUtils"
import { gamesModel, connectDB } from "src/server/database"
import * as fs from "fs"
import formidable from "formidable"
import sharp from "sharp"
import path from "path"
import { mkdir, stat } from "fs/promises"
import { parseForm } from "src/utils/files"

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

const getDir = (folder: string) => path.join(process.env.ROOT_DIR || process.cwd(), `${folder}`)

const saveFile = (file: formidable.File, path: string) => {
  const inDir = getDir(`/public/temp/${file.newFilename}`)
  const outDir = getDir(path + file.newFilename)
  return new Promise<string>((resolve, reject) => {
    return fs.rename(inDir, outDir, (err) => {
      if (err) return reject()
      return resolve(outDir)
    })
  })

  // const data = fs.readFileSync(file.filepath);
  // fs.writeFileSync(`${path}${file.originalFilename}`, data);
  // fs.unlinkSync(file.filepath)
}

const blur = (filePath: string, destinationPath: string) => {
  return sharp(filePath)
    .blur(15)
    .toFormat("webp", { progressive: true, quality: 60 })
    .toFile(getDir(destinationPath))
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
          const form = formidable({ multiples: true })

          const { fields, files } = await parseForm(req)
          // const [fields, files] = await ns.form_parse(req, form)
          const { bg, cover } = files as {
            bg: formidable.File
            cover: formidable.File
          }

          console.debug("AAAAAA", { bg, cover })
          const result = {
            ...fields,
            bg: bg.originalFilename,
            cover: cover.originalFilename,
          }
          res.status(200).json({ result })

          const newPath = await saveFile(bg, "/public/test/")
          await saveFile(cover, "/public/test/")
          await blur(newPath, "/public/test/blur/" + bg.newFilename + ".webp")
          console.log("saved files")
        } catch (e) {
          console.error(e)
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
