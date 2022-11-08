import type { NextApiRequest, NextApiResponse } from "next"
import { getImageBuffer } from "@/utils/files"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET":
        const name = req.query.name as string
        const type = req.query.type as "cover" | "bg"

        const imageBuffer = getImageBuffer(name, type)

        res.status(200)
        res.setHeader("Content-Type", "image/*")
        res.send(imageBuffer)
        break
      default:
        res.setHeader("Allow", ["GET"])
        res.status(405).end(`Method ${req.method} is not supported`)
    }
  } catch (err) {
    console.debug(err)
    res.status(500).json({ error: "Failed to load data", detail: JSON.stringify(err) })
  }
}
