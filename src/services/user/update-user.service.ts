import { HttpError } from '@/errors/HttpError'
import type {
  IUserRepository,
  UpdateUserAttributes,
  User,
} from '@/repositories/user-repository.interface'
import { removeFile } from '@/utils/remove-file'
import { hashSync } from 'bcryptjs'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
  attributes: UpdateUserAttributes
}

interface IResponse {
  user: Omit<User, 'password'>
}

export class UpdateUserServices implements IService<IRequest, IResponse> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ id, attributes }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new HttpError('User not found', 404)
    }

    if (attributes.email) {
      const isEmailAlreadyUsed = await this.userRepository.findByEmail(
        attributes.email
      )

      if (isEmailAlreadyUsed) {
        throw new HttpError('Email already used', 409)
      }
    }

    let password: string | undefined

    if (attributes.password) {
      password = hashSync(attributes.password, 8)
    }

    if (attributes.avatar) {
      if (user.avatar) {
        removeFile('users', user.avatar)
      }
    }

    const userUpdated = await this.userRepository.update(id, {
      ...attributes,
      password,
    })

    return {
      user: userUpdated,
    }
  }
}
