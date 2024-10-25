import { existsSync, unlinkSync } from 'node:fs'
import { resolve } from 'node:path'

export function removeFile(folder: string, file: string) {
  const path = resolve(__dirname, '..', '..', 'uploads', folder, file)

  if (existsSync(path)) {
    unlinkSync(path)
  }
}
