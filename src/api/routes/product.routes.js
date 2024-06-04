import express from 'express';
import { checkUserAuth, checkPermissionUser } from '../middlewares/jwtMiddleWares';
import productController from '../controllers/productController';

const router = express.Router();
router.get('/products', productController.getProductsByCategory);
router.get('/products/:id', productController.getProductsById);

export default router;
