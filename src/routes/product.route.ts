import { createProduct } from '../controllers/product.controller';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { errorHandler } from './../../error-handler';
import { Router } from "express";

const productRoutes:Router = Router();

productRoutes.post('/' , [authMiddleware , adminMiddleware], errorHandler(createProduct))

export default productRoutes;