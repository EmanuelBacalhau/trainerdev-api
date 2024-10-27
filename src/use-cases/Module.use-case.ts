import { HttpError } from '../errors/HttpError'
import type {
  CreateModuleAttributes,
  IModuleRepository,
  Module,
  ModuleWhereInputs,
  UpdateModuleAttributes,
} from '../repositories/IModuleRepository.interface'
import { removeFile } from '../utils/remove-file'

interface GetModulesWithPaginated {
  page?: number
  perPage?: number
  name?: string
  sortBy?: 'name' | 'createdAt'
  order?: 'asc' | 'desc'
}

interface FindResponse {
  modules: Module[]
  meta: {
    total: number
    totalPages: number
    page: number
    perPage: number
  }
}

type CreateModuleUseCase = Omit<CreateModuleAttributes, 'slug'>
type UpdateModuleUseCase = Omit<UpdateModuleAttributes, 'slug'>

export class ModuleUseCase {
  constructor(private readonly moduleRepository: IModuleRepository) {}

  index = async (params: GetModulesWithPaginated): Promise<FindResponse> => {
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
        mode: 'insensitive',
      }
    }

    const modules = await this.moduleRepository.find({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      sortBy: sortBy,
      order: order,
    })

    const totalModules = await this.moduleRepository.count(where)
    const totalPages = Math.ceil(totalModules / perPage)

    return {
      modules,
      meta: {
        total: totalModules,
        totalPages,
        page,
        perPage,
      },
    }
  }

  findById = async (id: number): Promise<Module | null> => {
    const module = await this.moduleRepository.findById(id)

    if (!module) {
      throw new HttpError('Module not found', 404)
    }

    return module
  }

  findBySlug = async (slug: string): Promise<Module | null> => {
    const module = await this.moduleRepository.findBySlug(slug)

    if (!module) {
      throw new HttpError('Module not found', 404)
    }

    return module
  }

  create = async (attributes: CreateModuleUseCase): Promise<Module> => {
    const slug = attributes.name.replace(/\s/g, '-').toLowerCase()

    const isNameAlreadyUsed = await this.moduleRepository.findBySlug(slug)

    if (isNameAlreadyUsed) {
      throw new HttpError('Module name already used', 409)
    }

    return await this.moduleRepository.create({
      ...attributes,
      slug,
    })
  }

  update = async (id: number, attributes: UpdateModuleUseCase) => {
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

    return await this.moduleRepository.update(id, {
      ...attributes,
      slug,
    })
  }

  delete = async (id: number) => {
    const isModuleExists = await this.moduleRepository.findById(id)

    if (!isModuleExists) {
      throw new HttpError('Module not found', 404)
    }

    removeFile('modules', isModuleExists.coverUrl)

    await this.moduleRepository.delete(id)
  }
}
