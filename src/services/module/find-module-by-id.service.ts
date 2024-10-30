import { HttpError } from '@/errors/HttpError'
import type {
  FindModuleByIdOrSlugResponse,
  IModuleRepository,
  Module,
} from '@/repositories/module-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  id: number
}

interface IResponse {
  module: FindModuleByIdOrSlugResponse
}

export class FindModuleByIdService implements IService<IRequest, IResponse> {
  constructor(private readonly moduleRepository: IModuleRepository) {}

  async execute({ id }: IRequest): Promise<IResponse> {
    const module = await this.moduleRepository.findById(id)

    if (!module) {
      throw new HttpError('Module not found', 404)
    }

    return {
      module,
    }
  }
}
