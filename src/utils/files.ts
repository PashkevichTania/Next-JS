import type { NextApiRequest } from "next"
import path from "path"
import { mkdir, stat } from "fs/promises"
import { rename } from "fs"
import formidable, { Files, Fields } from "formidable"
import mime from "mime"
import sharp from "sharp"
import { CONST } from "@/utils/constants"

interface FormFields extends Fields {
  title: string
  developers: string
  publisher: string
  description: string
  releaseDate: string
  ratingCritics: string
  ratingUsers: string
  ratingAge: string
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

export const getDir = (folder: string) =>
  path.join(process.env.ROOT_DIR || process.cwd(), `${folder}`)

const testDir = async (dir: string): Promise<undefined | Error> => {
  try {
    await stat(dir)
    // @ts-ignore
  } catch (e: Error) {
    if (e.code === "ENOENT") {
      await mkdir(dir, { recursive: true })
      return
    } else {
      return e
    }
  }
}

export const parseForm = async (req: NextApiRequest): Promise<FormData> => {
  const uploadDir = getDir(CONST.TEMP_FOLDER)
  const dirError = await testDir(uploadDir)

  return await new Promise( (resolve, reject) => {
    if (dirError) return reject(dirError)

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

export const saveFile = async (file: formidable.File, path: string) => {
  const inDir = getDir(CONST.TEMP_FOLDER + file.newFilename)
  const outDir = getDir(path + file.newFilename)
  const dirError = await testDir(path)

  console.debug(`SAVING...: ${CONST.TEMP_FOLDER + file.newFilename} --> ${path + file.newFilename}`)

  return new Promise<string>((resolve, reject) => {
    if (dirError) reject(dirError)
    return rename(inDir, outDir, (err) => {
      if (err) {
        console.error("RENAME ERROR", err)
        return reject(err)
      }
      console.debug(`Saved file ${path + file.newFilename}`)
      return resolve(outDir)
    })
  })
}

export const saveBlur = async (filePath: string, destinationPath: string) => {
  const fileName = getDir(destinationPath + path.parse(filePath).name + ".webp")
  const dirError = await testDir(destinationPath)

  return new Promise((resolve, reject)=>{
    if (dirError) reject(dirError)
    sharp(filePath)
      .blur(15)
      .toFormat("webp", { progressive: true, quality: 60 })
      .toFile(fileName)
      .then(resolve)
  })
}
