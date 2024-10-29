import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@prisma/client'
import type { Environment } from 'vitest/environments'

export const prismaTestEnvironment = new PrismaClient()

function createTestDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'The DATABASE_URL environment variable must not be set when running tests'
    )
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default {
  name: 'prisma',
  transformMode: 'ssr',
  setup: async () => {
    const schema = randomUUID()
    const databaseUrl = createTestDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy')

    return {
      teardown: async () => {
        await prismaTestEnvironment.$executeRawUnsafe(
          `DROP SCHEMA "${schema}" CASCADE`
        )
        await prismaTestEnvironment.$disconnect()
      },
    }
  },
} as Environment
