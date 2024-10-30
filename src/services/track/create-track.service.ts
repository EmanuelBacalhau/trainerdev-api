import { HttpError } from '@/errors/HttpError'
import type { IModuleRepository } from '@/repositories/module-repository.interface'
import type {
  CreateTrackAttributes,
  ITrackRepository,
  Track,
} from '@/repositories/track-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  attributes: Omit<CreateTrackAttributes, 'slug'>
}

interface IResponse {
  track: Track
}

export class CreateTrackService implements IService<IRequest, IResponse> {
  constructor(
    private readonly trackRepository: ITrackRepository,
    private readonly moduleRepository: IModuleRepository
  ) {}

  async execute({ attributes }: IRequest): Promise<IResponse> {
    const slug = attributes.name.toLowerCase().replace(' ', '-')

    const isTrackExist = await this.trackRepository.findBySlug(slug)

    if (isTrackExist) {
      throw new HttpError('Track already exist', 409)
    }

    for (const moduleId of attributes.moduleIds) {
      const isModuleExist = await this.moduleRepository.findById(moduleId)

      if (!isModuleExist) {
        throw new HttpError('Module not found', 404)
      }
    }

    return {
      track: await this.trackRepository.create({
        ...attributes,
        slug,
      }),
    }
  }
}
