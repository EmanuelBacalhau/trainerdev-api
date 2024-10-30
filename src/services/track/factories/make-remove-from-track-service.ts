import { PrismaModuleRepository } from '@/repositories/prisma/PrismaModule.repository'
import { PrismaTrackRepository } from '@/repositories/prisma/prisma-track.repository'
import { RemoveModuleFromTrackService } from '../remove-module-from-track.service'

export function makeRemoveFromTrackService() {
  const trackRepository = new PrismaTrackRepository()
  const moduleRepository = new PrismaModuleRepository()
  const removeFromTrackService = new RemoveModuleFromTrackService(
    trackRepository,
    moduleRepository
  )

  return removeFromTrackService
}
