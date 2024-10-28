import type { Handler, NextFunction, Request, Response } from 'express'
import type { Role } from '../repositories/IUserRepository.interface'

export function verifyUserRole(roles: Role[]) {
  const middleware: Handler = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { role } = request.user

    if (!roles.includes(role as Role)) {
      response.sendStatus(403)
    } else {
      next()
    }
  }

  return middleware
}
