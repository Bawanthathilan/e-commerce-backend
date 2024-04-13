import { NextFunction, Request, Response } from 'express';
import { UnAuthorizedException } from '../exceptions/unauthorized';
import { ErrorCode } from '../exceptions/root';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../secrets';
import { prismaClient } from '..';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //extract the token from header
  const token: any = req.headers.authorization;
  // if token is not present, throw ans error of unauthrozed
  if (!token) {
    next(new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
  }
  try {
    // if the token is presnet , verify that token and extract the payload
    const payload: { userId: number } = jwt.verify(
      token,
      JWT_SECRET_KEY
    ) as any;
    // to get the user from the payload
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId }
    });
    if (!user) {
      next(new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
    // to attach the user to the current request object
    req.user = user;
    next();
  } catch (error) {
    next(new UnAuthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
  }
};
