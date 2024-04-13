import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { errorHandler } from '../../error-handler';
import {
  addAddress,
  deleteAddress,
  listAddress
} from '../controllers/users.controller';

const userRoutes: Router = Router();

userRoutes.post('/address', [authMiddleware], errorHandler(addAddress));
userRoutes.delete(
  '/address/:id',
  [authMiddleware],
  errorHandler(deleteAddress)
);
userRoutes.get('/address', [authMiddleware], errorHandler(listAddress));

export default userRoutes;
