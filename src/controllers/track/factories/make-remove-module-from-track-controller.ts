import { makeRemoveFromTrackService } from '@/services/track/factories/make-remove-from-track-service'
import { RemoveModuleFromTrackController } from '../remove-module-from-track.controller'

export function makeRemoveModuleFromTrackController() {
  const removeModuleFromTrackService = makeRemoveFromTrackService()
  const removeModuleFromTrackController = new RemoveModuleFromTrackController(
    removeModuleFromTrackService
  )
  return removeModuleFromTrackController
}
