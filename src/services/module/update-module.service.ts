import { HttpError } from '@/errors/HttpError'
import type {
  IModuleRepository,
  Module,
  UpdateModuleAttributes,
} from '@/repositories/module-repository.interface'
import { removeFile } from '@/utils/remove-file'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
  attributes: UpdateModuleAttributes
}

interface IResponse {
  module: Module
}

export class UpdateModuleService implements IService<IRequest, IResponse> {
  constructor(private readonly moduleRepository: IModuleRepository) {}

  async execute({ id, attributes }: IRequest): Promise<IResponse> {
    const isModuleExists = await this.moduleRepository.findById(id)

    if (!isModuleExists) {
      throw new HttpError('Module not found', 404)
    }

    if (attributes.name) {
      const slug = attributes.name.replace(/\s/g, '-').toLowerCase()
      const isNameAlreadyUsed = await this.moduleRepository.findBySlug(slug)

      if (isNameAlreadyUsed) {
        throw new HttpError('Module name already used', 409)
      }
    }

    const slug = attributes.name?.replace(' ', '-').toLowerCase()

    if (attributes.coverUrl) {
      removeFile('modules', isModuleExists.coverUrl)
    }

    return {
      module: await this.moduleRepository.update(id, {
        ...attributes,
        slug,
      }),
    }
  }
}
