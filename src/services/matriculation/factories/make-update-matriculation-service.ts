import { PrismaMatriculationRepository } from '@/repositories/prisma/prisma-matriculation.repository'
import { PrismaTrackRepository } from '@/repositories/prisma/prisma-track.repository'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { UpdateMatriculationService } from '../update-matriculation.service'

export function makeUpdateMatriculationService() {
  const matriculationRepository = new PrismaMatriculationRepository()
  const userRepository = new PrismaUserRepository()
  const trackRepository = new PrismaTrackRepository()

  const updateMatriculationService = new UpdateMatriculationService(
    matriculationRepository,
    trackRepository,
    userRepository
  )

  return updateMatriculationService
}
