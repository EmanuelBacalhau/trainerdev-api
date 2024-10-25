import { existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import multer from 'multer'
import { HttpError } from '../errors/HttpError'

export function upload(folder: string, mimeTypes: string[]) {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      const path = resolve(__dirname, '..', '..', 'uploads', folder)

      if (!existsSync(path)) {
        mkdirSync(path, { recursive: true })
      }

      callback(null, path)
    },

    filename: (req, file, callback) => {
      if (mimeTypes.includes(file.mimetype)) {
        const fileName = `${Date.now()}-${file.originalname}`
        return callback(null, fileName)
      }

      return callback(
        new HttpError('Only .png and .jpeg files are allowed', 400),
        ''
      )
    },
  })
}
