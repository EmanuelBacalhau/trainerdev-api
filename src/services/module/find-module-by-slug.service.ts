import { HttpError } from '@/errors/HttpError'
import type {
  FindModuleByIdOrSlugResponse,
  IModuleRepository,
} from '@/repositories/module-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  slug: string
}

interface IResponse {
  module: FindModuleByIdOrSlugResponse
}

export class FindModuleBySlugService implements IService<IRequest, IResponse> {
  constructor(private readonly moduleRepository: IModuleRepository) {}

  async execute({ slug }: IRequest): Promise<IResponse> {
    const module = await this.moduleRepository.findBySlug(slug)

    if (!module) {
      throw new HttpError('Module not found', 404)
    }

    return {
      module,
    }
  }
}
