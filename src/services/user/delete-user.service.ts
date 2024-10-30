import { HttpError } from '@/errors/HttpError'
import type { IUserRepository } from '@/repositories/IUserRepository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
}

export class DeleteUserService implements IService<IRequest, void> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const isUserExists = await this.userRepository.findById(id)

    if (!isUserExists) {
      throw new HttpError('User not found', 404)
    }

    await this.userRepository.delete(id)
  }
}
