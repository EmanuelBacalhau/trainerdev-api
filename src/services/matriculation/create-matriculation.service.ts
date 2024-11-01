import { HttpError } from '@/errors/HttpError'
import type {
  CreateMatriculationAttributes,
  IMatriculationRepository,
  Matriculation,
} from '@/repositories/IMatriculationRepository.interface'
import type { ITrackRepository } from '@/repositories/track-repository.interface'
import type { IUserRepository } from '@/repositories/user-repository.interface'
import { generateMatriculationCode } from '@/utils/generate-matriculation-code'
import type { IService } from '../service.interface'

interface IRequest {
  attributes: Omit<CreateMatriculationAttributes, 'serialCode'>
}

interface IResponse {
  matriculation: Matriculation
}

export class CreateMatriculationService
  implements IService<IRequest, IResponse>
{
  constructor(
    private readonly matriculationRepository: IMatriculationRepository,
    private readonly trackRepository: ITrackRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute({ attributes }: IRequest): Promise<IResponse> {
    const isUserExists = await this.userRepository.findById(attributes.userId)

    if (!isUserExists) {
      throw new HttpError('User not found', 404)
    }

    const isTrackExists = await this.trackRepository.findById(
      attributes.trackId
    )

    if (!isTrackExists) {
      throw new HttpError('Track not found', 404)
    }

    const isMatriculationExists =
      await this.matriculationRepository.findByUserId(attributes.userId)

    if (isMatriculationExists) {
      throw new HttpError('User already matriculated', 409)
    }

    const serialCode = generateMatriculationCode()
    const matriculation = await this.matriculationRepository.create({
      ...attributes,
      serialCode,
    })

    return { matriculation }
  }
}
