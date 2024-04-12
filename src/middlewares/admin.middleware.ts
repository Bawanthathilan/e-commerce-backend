import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../secrets";
import { prismaClient } from "..";

export const adminMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const user = req.user;
    if(user.role == "ADMIN"){
        next()
    }else{
        next(new UnAuthorizedException("Unauthorized" , ErrorCode.UNAUTHORIZED))
    }
   
}