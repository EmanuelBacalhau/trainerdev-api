export type Role = 'TRAINEE' | 'TRAINER' | 'ADMIN'

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: Role
  avatar: string | null
}

export interface UserWhereInputs {
  name?: {
    contains?: string
  }
  role?: Role
}

export interface FindUsersParams {
  where?: UserWhereInputs
  sortBy?: 'name' | 'role' | 'createdAt'
  order?: 'asc' | 'desc'
  skip?: number
  take?: number
}

export interface CreateUserAttributes {
  name: string
  email: string
  password: string
  role?: Role
}

export interface UpdateUserAttributes {
  name?: string
  email?: string
  password?: string
  role?: Role
  avatar?: string
}

export type FindUserByIdResponse = Omit<User, 'password'> & {
  matriculation: {
    serialCode: string
    track: {
      id: number
      coverUrl: string
      name: string
    }
  } | null
}

export interface IUserRepository {
  find(params: FindUsersParams): Promise<Omit<User, 'password'>[]>
  findById(id: number): Promise<FindUserByIdResponse | null>
  findByEmail(email: string): Promise<User | null>
  create(attributes: CreateUserAttributes): Promise<Omit<User, 'password'>>
  update(
    id: number,
    attributes: UpdateUserAttributes
  ): Promise<Omit<User, 'password'>>
  delete(id: number): Promise<void>
  count(where: UserWhereInputs): Promise<number>
}
