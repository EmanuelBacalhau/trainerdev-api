import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { env } from '../env'
import { HttpError } from '../errors/HttpError'
import type { IUserRepository } from '../repositories/IUserRepository.interface'

interface ExecuteParams {
  email: string
  password: string
}

export class AuthUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute = async (params: ExecuteParams): Promise<string> => {
    const user = await this.userRepository.findByEmail(params.email)

    if (!user) {
      throw new HttpError('Email/Password invalid', 401)
    }

    const passwordMatch = await compare(params.password, user.password)

    if (!passwordMatch) {
      throw new HttpError('Email/Password invalid', 401)
    }

    const token = sign({}, env.JWT_SECRET, {
      expiresIn: '1d',
      subject: user.id.toString(),
    })

    return token
  }
}
