import { env } from '@/env'
import { HttpError } from '@/errors/HttpError'
import type { IUserRepository } from '@/repositories/user-repository.interface'
import { compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import type { IService } from '../service.interface'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
}

export class AuthenticateService implements IService<IRequest, IResponse> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(params.email)

    if (!user) {
      throw new HttpError('Email/Password invalid', 401)
    }

    const passwordMatch = compareSync(params.password, user.password)

    if (!passwordMatch) {
      throw new HttpError('Email/Password invalid', 401)
    }

    const token = sign(
      {
        id: user.id,
        role: user.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    )

    return { token }
  }
}
