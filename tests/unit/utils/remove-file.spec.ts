import { existsSync, mkdirSync, rmdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { removeFile } from '@/utils/remove-file'
import { afterAll, expect, test } from 'vitest'

afterAll(() => {
  const directory = resolve(__dirname, '../../../uploads/tests')

  if (existsSync(directory)) {
    rmdirSync(directory)
  }
})

test('should be able to remove a file', () => {
  const directory = resolve(__dirname, '../../../uploads/tests')

  if (!existsSync(directory)) {
    mkdirSync(directory)
  }

  const filename = 'test.txt'
  const filePath = join(directory, filename)
  writeFileSync(filePath, 'test')

  removeFile('tests', filename)

  expect(existsSync(filePath)).toBe(false)
})
