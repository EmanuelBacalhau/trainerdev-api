import { HttpError } from '@/errors/HttpError'
import type {
  CreateModuleAttributes,
  IModuleRepository,
  Module,
} from '@/repositories/module-repository.interface'
import type { IService } from '../service.interface'

interface IRequest extends Omit<CreateModuleAttributes, 'slug'> {}

interface IResponse {
  module: Module
}

export class CreateModuleService implements IService<IRequest, IResponse> {
  constructor(private readonly moduleRepository: IModuleRepository) {}

  async execute(attributes: IRequest): Promise<IResponse> {
    const slug = attributes.name.replace(' ', '-').toLowerCase()

    const isNameAlreadyUsed = await this.moduleRepository.findBySlug(slug)

    if (isNameAlreadyUsed) {
      throw new HttpError('Module name already used', 409)
    }

    return {
      module: await this.moduleRepository.create({
        ...attributes,
        slug,
      }),
    }
  }
}
