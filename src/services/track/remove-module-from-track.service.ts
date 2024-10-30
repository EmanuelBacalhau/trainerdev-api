import { HttpError } from '@/errors/HttpError'
import type { IModuleRepository } from '@/repositories/module-repository.interface'
import type { ITrackRepository } from '@/repositories/track-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  trackId: number
  moduleId: number
}

export class RemoveModuleFromTrackService implements IService<IRequest, void> {
  constructor(
    private readonly trackRepository: ITrackRepository,
    private readonly moduleRepository: IModuleRepository
  ) {}

  async execute(params: IRequest): Promise<void> {
    const isTrackExist = await this.trackRepository.findById(params.trackId)

    if (!isTrackExist) {
      throw new HttpError('Track not found', 404)
    }

    const isModuleExist = await this.moduleRepository.findById(params.moduleId)

    if (!isModuleExist) {
      throw new HttpError('Module not found', 404)
    }

    await this.trackRepository.removeModuleFromTrack(
      params.trackId,
      params.moduleId
    )
  }
}
