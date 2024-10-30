import { HttpError } from '@/errors/HttpError'
import type {
  FindUserByIdResponse,
  IUserRepository,
} from '@/repositories/IUserRepository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
}

interface IResponse {
  user: FindUserByIdResponse
}

export class FindUserByIdService implements IService<IRequest, IResponse> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new HttpError('User not found', 404)
    }

    return { user }
  }
}
