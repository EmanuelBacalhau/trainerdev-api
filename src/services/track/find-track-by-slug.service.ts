import { HttpError } from '@/errors/HttpError'
import type {
  ITrackRepository,
  Track,
} from '@/repositories/track-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  slug: string
}

interface IResponse {
  track: Track
}

export class FindTrackBySlugService implements IService<IRequest, IResponse> {
  constructor(private readonly trackRepository: ITrackRepository) {}

  async execute(params: IRequest): Promise<IResponse> {
    const track = await this.trackRepository.findBySlug(params.slug)

    if (!track) {
      throw new HttpError('Track not found', 404)
    }

    return { track }
  }
}
