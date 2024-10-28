import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { generateMatriculationCode } from '../../src/utils/generate-matriculation-code'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@admin.com',
      password: await hash('admin', 8),
      role: 'ADMIN',
    },
  })

  const trainer = await prisma.user.create({
    data: {
      name: 'Trainer',
      email: 'trainer@trainer.com',
      password: await hash('trainer', 8),
      role: 'TRAINER',
    },
  })

  const trainee = await prisma.user.create({
    data: {
      name: 'Trainee',
      email: 'trainee@trainee.com',
      password: await hash('trainee', 8),
      role: 'TRAINEE',
    },
  })

  await prisma.$disconnect()
}

main()
