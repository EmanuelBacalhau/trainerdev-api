import { PrismaMatriculationRepository } from '@/repositories/prisma/prisma-matriculation.repository'
import { PrismaTrackRepository } from '@/repositories/prisma/prisma-track.repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { CreateMatriculationService } from '../create-matriculation.service'

export function makeCreateMatriculationService() {
  const matriculationRepository = new PrismaMatriculationRepository()
  const userRepository = new PrismaUserRepository()
  const trackRepository = new PrismaTrackRepository()

  const createMatriculationService = new CreateMatriculationService(
    matriculationRepository,
    trackRepository,
    userRepository
  )

  return createMatriculationService
}
