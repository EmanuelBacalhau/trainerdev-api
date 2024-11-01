import { PrismaModuleRepository } from '@/repositories/prisma/prisma-module.repository'
import { PrismaTrackRepository } from '@/repositories/prisma/prisma-track.repository'
import { RemoveModuleFromTrackService } from '../remove-module-from-track.service'

export function makeRemoveModuleFromTrackService() {
  const trackRepository = new PrismaTrackRepository()
  const moduleRepository = new PrismaModuleRepository()
  const removeFromTrackService = new RemoveModuleFromTrackService(
    trackRepository,
    moduleRepository
  )

  return removeFromTrackService
}
