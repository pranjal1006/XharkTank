import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import Validators from '../validators/index'

const validationMiddleware = (validator: keyof typeof Validators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await Validators[validator].validateAsync(req.body);
      next()
    } catch (err: any) {
      if(err.isJoi) 
        return next(createHttpError(400, {message: err.message}))
      next(createHttpError(500))
    }
  }
}

export default validationMiddleware;