import { errorHandler } from './../../error-handler';
import { Router } from "express";
import { cancelOrder, createOrder, getOrderbyId, listOrders } from "../controllers/orders.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const orderRoutes: Router = Router();

orderRoutes.post('/' , [authMiddleware], errorHandler(createOrder))
orderRoutes.get('/' , [authMiddleware], errorHandler(listOrders))
orderRoutes.put('/:id/cancel' , [authMiddleware], errorHandler(cancelOrder))
orderRoutes.get('/:id' , [authMiddleware], errorHandler(getOrderbyId))

export default orderRoutes;