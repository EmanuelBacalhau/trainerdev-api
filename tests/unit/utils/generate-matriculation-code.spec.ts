import { generateMatriculationCode } from '@/utils/generate-matriculation-code'
import { expect, test } from 'vitest'

test('should be able to generate a matriculation code', () => {
  const matriculationCode = generateMatriculationCode()
  expect(matriculationCode).toEqual(expect.any(String))
})
