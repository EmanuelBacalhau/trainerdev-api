import { PrismaMatriculationRepository } from '@/repositories/prisma/prisma-matriculation.repository'
import { FindAllMatriculationService } from '../find-all-matriculation.service'

export function makeFindAllMatriculationService() {
  const matriculationRepository = new PrismaMatriculationRepository()
  const findAllMatriculationService = new FindAllMatriculationService(
    matriculationRepository
  )
  return findAllMatriculationService
}
