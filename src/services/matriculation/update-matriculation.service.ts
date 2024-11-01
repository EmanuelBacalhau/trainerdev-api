import { HttpError } from '@/errors/HttpError'
import type {
  IMatriculationRepository,
  Matriculation,
  UpdateMatriculationAttributes,
} from '@/repositories/IMatriculationRepository.interface'
import type { ITrackRepository } from '@/repositories/track-repository.interface'
import type { IUserRepository } from '@/repositories/user-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
  attributes: UpdateMatriculationAttributes
}

interface IResponse {
  matriculation: Matriculation
}

export class UpdateMatriculationService
  implements IService<IRequest, IResponse>
{
  constructor(
    private readonly matriculationRepository: IMatriculationRepository,
    private readonly trackRepository: ITrackRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(params: IRequest): Promise<IResponse> {
    const matriculation = await this.matriculationRepository.findById(params.id)

    if (!matriculation) {
      throw new HttpError('Matriculation not found', 404)
    }

    if (params.attributes.trackId) {
      const isTrackExists = await this.trackRepository.findById(
        params.attributes.trackId
      )

      if (!isTrackExists) {
        throw new HttpError('Track not found', 404)
      }
    }

    const matriculationUpdated = await this.matriculationRepository.update(
      params.id,
      {
        ...params.attributes,
      }
    )

    return {
      matriculation: matriculationUpdated,
    }
  }
}
