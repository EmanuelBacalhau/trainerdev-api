import { HttpError } from '@/errors/HttpError'
import type { IModuleRepository } from '@/repositories/module-repository.interface'
import type {
  ITrackRepository,
  Track,
  UpdateTrackAttributes,
} from '@/repositories/track-repository.interface'
import { removeFile } from '@/utils/remove-file'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
  attributes: UpdateTrackAttributes
}

interface IResponse {
  track: Track
}

export class UpdateTrackService implements IService<IRequest, IResponse> {
  constructor(
    private readonly trackRepository: ITrackRepository,
    private readonly moduleRepository: IModuleRepository
  ) {}

  async execute(params: IRequest): Promise<IResponse> {
    const track = await this.trackRepository.findById(params.id)
    console.log('attributes', params.attributes)

    if (!track) {
      throw new HttpError('Track not found', 404)
    }

    if (params.attributes.name) {
      const slug = params.attributes.name.toLowerCase().replace(' ', '-')
      const isTrackExist = await this.trackRepository.findBySlug(slug)

      if (isTrackExist) {
        throw new HttpError('Track already exist', 409)
      }
    }

    const slug = params.attributes.name?.toLowerCase().replace(' ', '-')

    if (params.attributes.coverUrl) {
      removeFile('tracks', track.coverUrl)
    }

    if (params.attributes.moduleIds) {
      for (const moduleId of params.attributes.moduleIds) {
        const isModuleExist = await this.moduleRepository.findById(moduleId)

        if (!isModuleExist) {
          throw new HttpError('Module not found', 404)
        }
      }
    }

    const updatedTrack = await this.trackRepository.update(params.id, {
      ...params.attributes,
      slug,
    })

    return { track: updatedTrack }
  }
}
