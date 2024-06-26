import { Request, Response, NextFunction } from 'express';
import { ErrorCode, HttpException } from './src/exceptions/root';
import { InternalException } from './src/exceptions/internal-exception';
import { ZodError } from 'zod';
import { BadRequestException } from './src/exceptions/bad-request';

// eslint-disable-next-line @typescript-eslint/ban-types
export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestException('Unprocessable entity.', ErrorCode.UNPROCESSABLE_ENTITY, error);
        } else {
          exception = new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION);
        }
      }
      next(exception);
    }
  };
};
