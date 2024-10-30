import type {
  IModuleRepository,
  Module,
  ModuleWhereInputs,
} from '@/repositories/module-repository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  page?: number
  perPage?: number
  name?: string
  sortBy?: 'name' | 'createdAt'
  order?: 'asc' | 'desc'
}

interface IResponse {
  modules: Module[]
  meta: {
    total: number
    totalPages: number
    page: number
    perPage: number
  }
}

export class FindAllModuleService implements IService<IRequest, IResponse> {
  constructor(private readonly moduleRepository: IModuleRepository) {}

  async execute(params: IRequest): Promise<IResponse> {
    const {
      name,
      page = 1,
      perPage = 10,
      sortBy = 'name',
      order = 'asc',
    } = params

    const where: ModuleWhereInputs = {}

    if (name) {
      where.name = {
        contains: name,
      }
    }

    const modules = await this.moduleRepository.find({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      sortBy: sortBy,
      order: order,
    })

    const total = await this.moduleRepository.count(where)
    const totalPages = Math.ceil(total / perPage)

    return {
      modules,
      meta: {
        total,
        totalPages,
        page,
        perPage,
      },
    }
  }
}
