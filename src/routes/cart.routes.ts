import { errorHandler } from './../../error-handler';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import {
  addItemTocart,
  changeQuantity,
  deleteItemFromcart,
  getCart
} from '../controllers/cart.controller';

const cartRoutes: Router = Router();

cartRoutes.post('/', [authMiddleware], errorHandler(addItemTocart));
cartRoutes.get('/', [authMiddleware], errorHandler(getCart));
cartRoutes.delete('/:id', [authMiddleware], errorHandler(deleteItemFromcart));
cartRoutes.put('/:id', [authMiddleware], errorHandler(changeQuantity));

export default cartRoutes;
