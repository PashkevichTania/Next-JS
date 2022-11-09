import type { NextApiRequest } from "next"
import path from "path"
import { mkdir, stat, unlink } from "fs/promises"
import { rename, readFileSync } from "fs"
import formidable, { Files, Fields } from "formidable"
import mime from "mime"
import sharp from "sharp"
import { CONST } from "@/utils/constants"

interface FormFields extends Fields {
  title: string
  developers: string
  publisher: string
  tags: string
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
  prev_bg: string
  prev_cover: string
}
interface FormFiles extends Files {
  bg: formidable.File
  cover: formidable.File
}

type FormData = {
  fields: FormFields
  files: FormFiles
}

export type ImgType = "cover" | "bg"

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

  return await new Promise((resolve, reject) => {
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

export const getNewFileName = ({
  type,
  oldName,
  gameName,
}: {
  type: ImgType
  oldName: string
  gameName: string
}) => {
  return `${type === "cover" ? "cover" : "bg"}-${gameName.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now()}${path.extname(
    oldName
  )}`
}

export const saveFile = async ({
  initialFilePath,
  fileName,
  destinationPath,
}: {
  initialFilePath: string
  destinationPath: string
  fileName: string
}) => {
  const inDir = getDir(CONST.TEMP_FOLDER + initialFilePath)
  const outDir = getDir(destinationPath + fileName)
  const dirError = await testDir(destinationPath)

  console.debug(`SAVING...: ${inDir} --> ${outDir}`)

  return new Promise<string>((resolve, reject) => {
    if (dirError) reject(dirError)
    return rename(inDir, outDir, (err) => {
      if (err) {
        console.error("RENAME ERROR", err)
        return reject(err)
      }
      console.debug(`Saved file ${outDir}`)
      return resolve(outDir)
    })
  })
}

export const saveBlur = async ({
  filePath,
  fileName,
  destinationPath,
}: {
  filePath: string
  destinationPath: string
  fileName: string
}) => {
  const newFileName = getDir(destinationPath + path.parse(fileName).name + ".webp")
  const dirError = await testDir(destinationPath)
  console.log(`Saving blur bg image ${newFileName}`)

  return new Promise((resolve, reject) => {
    if (dirError) reject(dirError)
    sharp(filePath)
      .blur(15)
      .toFormat("webp", { progressive: true, quality: 60 })
      .toFile(newFileName)
      .then(resolve)
  })
}

export const deleteFile = (fileName: string) => {
  console.debug(`Try to delete file ${fileName}`)
  if (fileName.includes("placeholder")) return
  if (fileName.includes("bg"))
    return Promise.all([
      unlink(getDir(CONST.BG_FOLDER + fileName)),
      unlink(getDir(CONST.BLUR_FOLDER + path.parse(fileName).name + ".webp")),
    ])

  if (fileName.includes("cover")) return unlink(getDir(CONST.COVERS_FOLDER + fileName))
}

export const getImageBuffer = (fileName: string, type: "cover" | "bg") => {
  const dir = type === "bg" ? CONST.BG_FOLDER : CONST.COVERS_FOLDER
  const filePath = getDir(dir + fileName)
  return readFileSync(filePath)
}
