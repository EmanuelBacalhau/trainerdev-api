import type {
  IUserRepository,
  Role,
  User,
  UserWhereInputs,
} from '@/repositories/IUserRepository.interface'
import type { IService } from '../service.interface'

interface IRequest {
  page?: number
  perPage?: number
  name?: string
  role?: Role
  sortBy?: 'name' | 'role' | 'createdAt'
  order?: 'asc' | 'desc'
}

interface IResponse {
  users: Omit<User, 'password'>[]
  meta: {
    total: number
    totalPages: number
    page: number
    perPage: number
  }
}

export class FindAllUserService implements IService<IRequest, IResponse> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: IRequest): Promise<IResponse> {
    const {
      name,
      role,
      page = 1,
      perPage = 10,
      order = 'asc',
      sortBy = 'name',
    } = params

    const skip = (page - 1) * perPage
    const take = perPage

    const where: UserWhereInputs = {}

    if (name) {
      where.name = {
        contains: name,
      }
    }

    if (role) {
      where.role = role
    }

    const users = await this.userRepository.find({
      where,
      sortBy,
      order,
      skip,
      take,
    })

    const total = await this.userRepository.count(where)
    const totalPages = Math.ceil(total / perPage)

    const response: IResponse = {
      users,
      meta: {
        total,
        totalPages,
        page,
        perPage,
      },
    }

    return response
  }
}
