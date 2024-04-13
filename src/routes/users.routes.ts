import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { errorHandler } from '../../error-handler';
import {
  addAddress,
  deleteAddress,
  listAddress,
  updateUser
} from '../controllers/users.controller';

const userRoutes: Router = Router();

userRoutes.post('/address', [authMiddleware], errorHandler(addAddress));
userRoutes.delete(
  '/address/:id',
  [authMiddleware],
  errorHandler(deleteAddress)
);
userRoutes.get('/address', [authMiddleware], errorHandler(listAddress));
userRoutes.put('/', [authMiddleware], errorHandler(updateUser));

export default userRoutes;
