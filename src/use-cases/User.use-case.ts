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

interface GetUserWithPaginated {
	page: number
	perPage: number
	name: string
	role: Role
	sortBy: 'name' | 'role' | 'createdAt'
	order: 'asc' | 'desc'
}

export class UserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async index(params: GetUserWithPaginated): Promise<User[]> {
		const where: UserWhereInputs = {}

		if (params.name) {
			where.name = {
				contains: params.name,
				mode: 'insensitive',
			}
		}

		if (params.role) {
			where.role = params.role
		}

		const users = await this.userRepository.find({
			where,
			skip: (params.page - 1) * params.perPage,
			take: params.perPage,
			sortBy: params.sortBy,
			order: params.order,
		})

		return users
	}

	async create(attributes: CreateUserAttributes): Promise<User> {
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

	async update(id: number, attributes: UpdateUserAttributes): Promise<User> {
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

		const user = await this.userRepository.update(id, {
			...attributes,
			password,
		})

		if (!user) {
			throw new HttpError('User not found', 404)
		}

		return user
	}

	async delete(id: number): Promise<void> {
		const user = await this.userRepository.delete(id)

		if (!user) {
			throw new HttpError('User not found', 404)
		}
	}
}
