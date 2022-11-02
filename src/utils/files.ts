import type { NextApiRequest } from "next"
import path from "path"
import { mkdir, stat } from "fs/promises"
import { rename } from "fs"
import formidable, { Files, Fields } from "formidable"
import mime from "mime"
import sharp from "sharp"

interface FormFields extends Fields {
  title: string
  developers: string
  publisher: string
  description: string
  releaseDate: string
  ratingCritics: string
  ratingUsers: string
  key: string
  platforms: string
  genres: string
  bg: string
  cover: string
}
interface FormFiles extends Files {
  bg: formidable.File
  cover: formidable.File
}

type FormData = {
  fields: FormFields
  files: FormFiles
}

export const FormidableError = formidable.errors.FormidableError

export const parseForm = async (req: NextApiRequest): Promise<FormData> => {
  return await new Promise(async (resolve, reject) => {
    const uploadDir = path.join(process.env.ROOT_DIR || process.cwd(), `public/temp/`)

    try {
      await stat(uploadDir)
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true })
      } else {
        console.error("ERROR IN PARSE FORM", e)
        reject(e)
        return
      }
    }

    const form = formidable({
      maxFiles: 2,
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 100)}`
        return `${part.name || "unknown"}-${uniqueSuffix}.${mime.getExtension(part.mimetype || "")}`
      },
      filter: (part) => {
        return part.mimetype?.includes("image") || false
      },
    })

    form.parse(req, function (err, fields, files) {
      if (err) reject(err)
      else resolve({ fields, files } as FormData)
    })
  })
}

export const getDir = (folder: string) =>
  path.join(process.env.ROOT_DIR || process.cwd(), `${folder}`)

export const saveFile = (file: formidable.File, path: string) => {
  const inDir = getDir(`public/temp/${file.newFilename}`)
  const outDir = getDir(path + file.newFilename)
  return new Promise<string>((resolve, reject) => {
    return rename(inDir, outDir, (err) => {
      if (err) return reject(err)
      return resolve(outDir)
    })
  })
}

export const saveBlur = (filePath: string, destinationPath: string) => {
  console.log({ filePath, destinationPath })
  console.log("name", path.parse(filePath).name)
  return sharp(filePath)
    .blur(15)
    .toFormat("webp", { progressive: true, quality: 60 })
    .toFile(getDir(destinationPath))
}
