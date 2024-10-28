import type { Handler } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '../env'
import { HttpError } from '../errors/HttpError'

interface JwtPayload {
  id: number
  role: string
}

export const isAuthenticatedMiddleware: Handler = (request, response, next) => {
  try {
    const authorization = request.headers.authorization

    if (!authorization) {
      throw new HttpError('Unauthorized', 401)
    }

    const [, token] = authorization.split(' ')

    const decoded = verify(token, env.JWT_SECRET) as JwtPayload

    if (!decoded) {
      throw new HttpError('Unauthorized', 401)
    }

    request.user = {
      id: decoded.id,
      role: decoded.role,
    }

    next()
  } catch (error) {
    next(error)
  }
}
