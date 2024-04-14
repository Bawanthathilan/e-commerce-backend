import { Request, Response } from 'express';
import { HttpException } from '../exceptions/root';

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response
) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.errors
  });
};
