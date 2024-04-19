import { Router } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import userRoutes from './users.routes';
import cartRoutes from './cart.routes';
import orderRoutes from './order.routes';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productRoutes);
rootRouter.use('/users', userRoutes);
rootRouter.use('/cart', cartRoutes);
rootRouter.use('/order', orderRoutes);

export default rootRouter;
