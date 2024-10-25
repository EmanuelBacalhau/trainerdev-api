import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express'
import { ZodError } from 'zod'
import { HttpError } from '../errors/HttpError'

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (error instanceof HttpError) {
    response.status(error.status).json({ message: error.message })
  } else if (error instanceof ZodError) {
    response.status(400).json({ message: error.flatten().fieldErrors })
  } else {
    response.status(500).json({ message: 'Internal server error' })
  }
}
