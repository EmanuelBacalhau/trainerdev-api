import type { NextFunction, Request, Response } from 'express'
export interface IController {
  execute(req: Request, res: Response, next: NextFunction): Promise<void>
}
