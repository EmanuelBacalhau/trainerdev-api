import { prisma } from '../../databases/prisma'
import type {
	CreateUserAttributes,
	FindUsersParams,
	UpdateUserAttributes,
	User,
	UserRepository,
} from '../UserRepository.interface'

export class PrismaUserRepository implements UserRepository {
	async find(params: FindUsersParams): Promise<User[]> {
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

	async findById(id: number): Promise<User | null> {
		return prisma.user.findUnique({
			where: {
				id: id,
			},
		})
	}

	async findByEmail(email: string): Promise<User | null> {
		return prisma.user.findUnique({
			where: {
				email: email,
			},
		})
	}

	async create(attributes: CreateUserAttributes): Promise<User> {
		return prisma.user.create({
			data: {
				email: attributes.email,
				name: attributes.name,
				role: attributes.role,
				password: attributes.password,
			},
		})
	}

	async update(id: number, attributes: UpdateUserAttributes): Promise<User> {
		return prisma.user.update({
			where: {
				id: id,
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

	async delete(id: number): Promise<void> {
		prisma.user.delete({
			where: {
				id: id,
			},
		})
	}
}
