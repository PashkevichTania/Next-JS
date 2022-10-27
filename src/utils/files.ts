import type { NextApiRequest } from "next";
import { join } from "path";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import mime from "mime";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return await new Promise(async (resolve, reject) => {
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      `/public/temp/`
    );

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }


    const form = formidable({
      maxFiles: 2,
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random()*100)}`;
        return `${part.name || "unknown"}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || "")
        }`;
      },
      filter: (part) => {
        return (
          part.mimetype?.includes("image") || false
        );
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
