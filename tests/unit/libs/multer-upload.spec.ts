import { multerUpload } from '@/libs/multerUpload'
import type { Multer } from 'multer'
import { expect, test } from 'vitest'

test('should be able to instance of Multer', async () => {
  const testMulterConfig: Multer = multerUpload('test', [
    'image/jpeg',
    'image/png',
  ])

  expect(testMulterConfig).toBeInstanceOf(Object)
})
