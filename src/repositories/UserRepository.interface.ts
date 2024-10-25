export type Role = 'TRAINEE' | 'TRAINER' | 'ADMIN'

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: Role
  avatar: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UserWhereInputs {
  name?: {
    contains?: string
    equals?: string
    mode?: 'insensitive' | 'default'
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
  role: Role
}

export interface UpdateUserAttributes {
  name?: string
  email?: string
  password?: string
  role?: Role
  avatar?: string
}

export interface UserRepository {
  find(params: FindUsersParams): Promise<User[]>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(attributes: CreateUserAttributes): Promise<User>
  update(id: number, attributes: UpdateUserAttributes): Promise<User>
  delete(id: number): Promise<User | null>
}
