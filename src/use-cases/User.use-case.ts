import { existsSync, unlinkSync } from 'node:fs'
import { resolve } from 'node:path'
import { hash } from 'bcryptjs'
import { HttpError } from '../errors/HttpError'
import type {
  CreateUserAttributes,
  Role,
  UpdateUserAttributes,
  User,
  UserRepository,
  UserWhereInputs,
} from '../repositories/UserRepository.interface'
import { removeFile } from '../utils/remove-file'

interface GetUsersWithPaginated {
  page?: number
  perPage?: number
  name?: string
  role?: Role
  sortBy?: 'name' | 'role' | 'createdAt'
  order?: 'asc' | 'desc'
}

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  index = async (params: GetUsersWithPaginated): Promise<User[]> => {
    const {
      name,
      role,
      page = 1,
      perPage = 10,
      sortBy = 'name',
      order = 'asc',
    } = params

    const where: UserWhereInputs = {}

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    if (role) {
      where.role = role
    }

    const users = await this.userRepository.find({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      sortBy: sortBy,
      order: order,
    })

    return users
  }

  findById = async (id: number): Promise<User | null> => {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new HttpError('User not found', 404)
    }

    return user
  }

  create = async (attributes: CreateUserAttributes): Promise<User> => {
    const isEmailAlreadyUsed = await this.userRepository.findByEmail(
      attributes.email
    )

    if (isEmailAlreadyUsed) {
      throw new HttpError('Email already used', 409)
    }

    const user = await this.userRepository.create({
      ...attributes,
      password: await hash(attributes.password, 8),
    })

    return user
  }

  update = async (
    id: number,
    attributes: UpdateUserAttributes
  ): Promise<User> => {
    const isUserAlreadyExists = await this.userRepository.findById(id)

    if (!isUserAlreadyExists) {
      throw new HttpError('User not found', 404)
    }

    if (attributes.email) {
      const isEmailAlreadyUsed = await this.userRepository.findByEmail(
        attributes.email
      )

      if (isEmailAlreadyUsed) {
        throw new HttpError('Email already used', 409)
      }
    }

    let password: string | undefined

    if (attributes.password) {
      password = await hash(attributes.password, 8)
    }

    const userUpdated = await this.userRepository.update(id, {
      ...attributes,
      password,
    })

    if (!userUpdated) {
      throw new HttpError('User not found', 404)
    }

    if (attributes.avatar) {
      if (isUserAlreadyExists.avatar) {
        removeFile('users', isUserAlreadyExists.avatar)
      }
    }

    return userUpdated
  }

  delete = async (id: number): Promise<void> => {
    const user = await this.userRepository.delete(id)

    if (!user) {
      throw new HttpError('User not found', 404)
    }

    if (user.avatar) {
      removeFile('users', user.avatar)
    }
  }
}
