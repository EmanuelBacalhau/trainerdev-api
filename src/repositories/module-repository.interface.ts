export interface Module {
  id: number
  name: string
  slug: string
  order: number
  description: string
  coverUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface ModuleWhereInputs {
  name?: {
    contains?: string
  }
}

export interface CreateModuleAttributes {
  name: string
  slug: string
  order: number
  description: string
  coverUrl: string
}

export interface UpdateModuleAttributes {
  name?: string
  slug?: string
  order?: number
  description?: string
  coverUrl?: string
}

export interface FindModulesParams {
  where?: ModuleWhereInputs
  sortBy?: 'name' | 'createdAt'
  order?: 'asc' | 'desc'
  skip?: number
  take?: number
}

export type FindModuleByIdOrSlugResponse = Module & {
  lessons: {
    id: number
    name: string
    description: string
  }[]
}

export interface IModuleRepository {
  find(params: FindModulesParams): Promise<Module[]>
  findById(id: number): Promise<FindModuleByIdOrSlugResponse | null>
  findBySlug(slug: string): Promise<FindModuleByIdOrSlugResponse | null>
  create(attributes: CreateModuleAttributes): Promise<Module>
  update(id: number, attributes: UpdateModuleAttributes): Promise<Module>
  delete(id: number): Promise<void>
  count(where: ModuleWhereInputs): Promise<number>
}
