import { User } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express';

declare module 'express' {
  export interface Request {
    user: User;
  }
}
