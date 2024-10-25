import type { User } from "@prisma/client";

export interface CreateUserAttributes {
  email: string;
  password: string;
}

export interface UserRepository {
  create(attributes: CreateUserAttributes): Promise<User>;
}