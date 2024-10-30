import { PrismaModuleRepository } from '@/repositories/prisma/PrismaModule.repository'
import { PrismaTrackRepository } from '@/repositories/prisma/prisma-track.repository'
import { CreateTrackService } from '../create-track.service'

export function makeCreateTrackService() {
  const trackRepository = new PrismaTrackRepository()
  const moduleRepository = new PrismaModuleRepository()
  const createTrackService = new CreateTrackService(
    trackRepository,
    moduleRepository
  )

  return createTrackService
}
