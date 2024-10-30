import { HttpError } from '@/errors/HttpError'
import type { ITrackRepository } from '@/repositories/track-repository.interface'
import { removeFile } from '@/utils/remove-file'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
}

export class DeleteTrackService implements IService<IRequest, void> {
  constructor(private readonly trackRepository: ITrackRepository) {}

  async execute(params: IRequest): Promise<void> {
    const isTrackExist = await this.trackRepository.findById(params.id)

    if (!isTrackExist) {
      throw new HttpError('Track not found', 404)
    }

    removeFile('tracks', isTrackExist.coverUrl)

    await this.trackRepository.delete(params.id)
  }
}
