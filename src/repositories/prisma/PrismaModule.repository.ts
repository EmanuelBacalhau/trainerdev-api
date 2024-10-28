import { prisma } from '../../databases/prisma'
import type {
  CreateModuleAttributes,
  FindModuleByIdOrSlugResponse,
  FindModulesParams,
  IModuleRepository,
  Module,
  ModuleWhereInputs,
  UpdateModuleAttributes,
} from '../IModuleRepository.interface'

export class PrismaModuleRepository implements IModuleRepository {
  find = async (params: FindModulesParams): Promise<Module[]> => {
    return await prisma.module.findMany({
      where: {
        name: {
          contains: params.where?.name?.contains,
          mode: params.where?.name?.mode,
        },
      },
      orderBy: {
        [params.sortBy ?? 'name']: params.order,
      },
      skip: params.skip,
      take: params.take,
    })
  }

  findById = async (
    id: number
  ): Promise<FindModuleByIdOrSlugResponse | null> => {
    return await prisma.module.findUnique({
      where: {
        id: id,
      },
      include: {
        lessons: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    })
  }

  findBySlug = async (
    slug: string
  ): Promise<FindModuleByIdOrSlugResponse | null> => {
    return await prisma.module.findUnique({
      where: {
        slug: slug,
      },
      include: {
        lessons: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    })
  }

  create = async (attributes: CreateModuleAttributes): Promise<Module> => {
    return await prisma.module.create({
      data: {
        name: attributes.name,
        slug: attributes.slug,
        order: attributes.order,
        description: attributes.description,
        coverUrl: attributes.coverUrl,
      },
    })
  }

  update = async (
    id: number,
    attributes: UpdateModuleAttributes
  ): Promise<Module> => {
    return await prisma.module.update({
      where: {
        id: id,
      },
      data: {
        name: attributes.name,
        slug: attributes.slug,
        order: attributes.order,
        description: attributes.description,
        coverUrl: attributes.coverUrl,
      },
    })
  }

  delete = async (id: number): Promise<void> => {
    await prisma.module.delete({
      where: {
        id: id,
      },
    })
  }

  count = async (where: ModuleWhereInputs): Promise<number> => {
    return await prisma.module.count({
      where,
    })
  }
}
