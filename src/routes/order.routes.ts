import { errorHandler } from './../../error-handler';
import { Router } from 'express';
import {
  cancelOrder,
  changeStatus,
  createOrder,
  getOrderbyId,
  listAllOrders,
  listOrders,
  listUserOrders
} from '../controllers/orders.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';

const orderRoutes: Router = Router();

orderRoutes.post('/', [authMiddleware], errorHandler(createOrder));
orderRoutes.get('/', [authMiddleware], errorHandler(listOrders));
orderRoutes.put('/:id/cancel', [authMiddleware], errorHandler(cancelOrder));
orderRoutes.get('/index', [authMiddleware, adminMiddleware], errorHandler(listAllOrders));
orderRoutes.put('/:id/status', [authMiddleware, adminMiddleware], errorHandler(changeStatus));
orderRoutes.get('/users/:id', [authMiddleware, adminMiddleware], errorHandler(listUserOrders));
orderRoutes.get('/:id', [authMiddleware], errorHandler(getOrderbyId));

export default orderRoutes;
