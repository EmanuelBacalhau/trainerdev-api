import { HttpError } from '@/errors/HttpError'
import type { IModuleRepository } from '@/repositories/module-repository.interface'
import { removeFile } from '@/utils/remove-file'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
}

export class DeleteModuleService implements IService<IRequest, void> {
  constructor(private readonly moduleRepository: IModuleRepository) {}

  async execute({ id }: IRequest): Promise<void> {
    const isModuleExists = await this.moduleRepository.findById(id)

    if (!isModuleExists) {
      throw new HttpError('Module not found', 404)
    }

    removeFile('modules', isModuleExists.coverUrl)

    await this.moduleRepository.delete(id)
  }
}
