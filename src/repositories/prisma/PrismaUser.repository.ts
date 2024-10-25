import { prisma } from '../../databases/prisma'
import type {
  CreateUserAttributes,
  FindUsersParams,
  UpdateUserAttributes,
  User,
  UserRepository,
  UserWhereInputs,
} from '../UserRepository.interface'

export class PrismaUserRepository implements UserRepository {
  find = async (params: FindUsersParams): Promise<User[]> => {
    const { where, sortBy, order, skip, take } = params

    return prisma.user.findMany({
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
    })
  }

  findById = async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
      where: {
        id: id,
      },
    })
  }

  findByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  }

  create = async (attributes: CreateUserAttributes): Promise<User> => {
    return prisma.user.create({
      data: {
        email: attributes.email,
        name: attributes.name,
        role: attributes.role,
        password: attributes.password,
      },
    })
  }

  update = async (
    id: number,
    attributes: UpdateUserAttributes
  ): Promise<User> => {
    return prisma.user.update({
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
    })
  }

  delete = async (id: number): Promise<void> => {
    prisma.user.delete({
      where: {
        id: id,
      },
    })
  }

  count = async (where: UserWhereInputs): Promise<number> => {
    return prisma.user.count({
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
