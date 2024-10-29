import { HttpError } from '@/errors/HttpError'
import { expect, test } from 'vitest'

test('Should create a new HttpError', () => {
  const error = new HttpError('Not found', 404)

  expect(error).toBeInstanceOf(HttpError)
  expect(error.message).toBe('Not found')
  expect(error.status).toBe(404)
})
