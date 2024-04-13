import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from '../controllers/product.controller';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { errorHandler } from './../../error-handler';
import { Router } from "express";

const productRoutes:Router = Router();

productRoutes.post('/' , [authMiddleware , adminMiddleware], errorHandler(createProduct))
productRoutes.put('/:id' , [authMiddleware , adminMiddleware] , errorHandler(updateProduct))
productRoutes.delete('/:id', [authMiddleware, adminMiddleware] , errorHandler(deleteProduct))
productRoutes.get('/', [authMiddleware , adminMiddleware], errorHandler(listProducts))
productRoutes.get('/:id', [authMiddleware, adminMiddleware] , errorHandler(getProductById))

export default productRoutes;