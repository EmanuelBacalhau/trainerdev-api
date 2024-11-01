import { PrismaMatriculationRepository } from '@/repositories/prisma/prisma-matriculation.repository'
import { DeleteMatriculationService } from '../delete-matriculation.service'

export function makeDeleteMatriculationService() {
  const matriculationRepository = new PrismaMatriculationRepository()
  const deleteMatriculationService = new DeleteMatriculationService(
    matriculationRepository
  )
  return deleteMatriculationService
}
