import { HttpError } from '@/errors/HttpError'
import type {
  CreateUserAttributes,
  IUserRepository,
  User,
} from '@/repositories/user-repository.interface'
import { hashSync } from 'bcryptjs'
import type { IService } from '../service.interface'

interface IRequest {
  attributes: CreateUserAttributes
}

interface IResponse {
  user: Omit<User, 'password'>
}

export class CreateUserService implements IService<IRequest, IResponse> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ attributes }: IRequest): Promise<IResponse> {
    const isEmailAlreadyUsed = await this.userRepository.findByEmail(
      attributes.email
    )

    if (isEmailAlreadyUsed) {
      throw new HttpError('Email already used', 409)
    }

    const user = await this.userRepository.create({
      ...attributes,
      password: hashSync(attributes.password, 8),
    })

    return { user }
  }
}
