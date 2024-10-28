import { prisma } from '../../databases/prisma'
import type {
  CreateUserAttributes,
  FindUserByIdResponse,
  FindUsersParams,
  IUserRepository,
  UpdateUserAttributes,
  User,
  UserWhereInputs,
} from '../IUserRepository.interface'

export class PrismaUserRepository implements IUserRepository {
  find = async (params: FindUsersParams): Promise<Omit<User, 'password'>[]> => {
    const { where, sortBy, order, skip, take } = params

    return await prisma.user.findMany({
      where: {
        name: {
          contains: where?.name?.contains,
          equals: where?.name?.equals,
          mode: where?.name?.mode,
        },
        role: where?.role,
      },
      skip: skip,
      take: take,
      orderBy: {
        [sortBy ?? 'name']: order,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
      },
    })
  }

  findById = async (id: number): Promise<FindUserByIdResponse | null> => {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        matriculation: {
          select: {
            serialCode: true,
            track: {
              select: {
                id: true,
                coverUrl: true,
                name: true,
              },
            },
          },
        },
      },
    })
  }

  findByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        password: true,
      },
    })
  }

  create = async (
    attributes: CreateUserAttributes
  ): Promise<Omit<User, 'password'>> => {
    return await prisma.user.create({
      data: {
        email: attributes.email,
        name: attributes.name,
        role: attributes.role,
        password: attributes.password,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
      },
    })
  }

  update = async (
    id: number,
    attributes: UpdateUserAttributes
  ): Promise<Omit<User, 'password'>> => {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: attributes.email,
        name: attributes.name,
        role: attributes.role,
        password: attributes.password,
        avatar: attributes.avatar,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
      },
    })
  }

  delete = async (id: number): Promise<void> => {
    await prisma.user.delete({
      where: {
        id: id,
      },
    })
  }

  count = async (where: UserWhereInputs): Promise<number> => {
    return await prisma.user.count({
      where: {
        name: {
          contains: where?.name?.contains,
          equals: where?.name?.equals,
          mode: where?.name?.mode,
        },
        role: where?.role,
      },
    })
  }
}
