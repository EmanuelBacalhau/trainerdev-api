import { makeRemoveModuleFromTrackService } from '@/services/track/factories/make-remove-module-from-track-service'
import { RemoveModuleFromTrackController } from '../remove-module-from-track.controller'

export function makeRemoveModuleFromTrackController() {
  const removeModuleFromTrackService = makeRemoveModuleFromTrackService()
  const removeModuleFromTrackController = new RemoveModuleFromTrackController(
    removeModuleFromTrackService
  )
  return removeModuleFromTrackController
}
