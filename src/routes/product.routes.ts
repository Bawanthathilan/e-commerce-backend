import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  searchProducts,
  updateProduct
} from '../controllers/product.controller';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { errorHandler } from '../../error-handler';
import { Router } from 'express';
import {upload} from '../middlewares/multer.middleware'

const productRoutes: Router = Router();

productRoutes.post('/', [authMiddleware, adminMiddleware , upload.single('image')], errorHandler(createProduct));
productRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateProduct));
productRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteProduct));
productRoutes.get('/', errorHandler(listProducts));
productRoutes.get('/search', [authMiddleware], errorHandler(searchProducts));
productRoutes.get('/:id', [authMiddleware, adminMiddleware], errorHandler(getProductById));

export default productRoutes;
