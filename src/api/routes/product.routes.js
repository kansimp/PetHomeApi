import express from 'express';
import { checkUserAuth, checkPermissionUser } from '../middlewares/jwtMiddleWares';
import productController from '../controllers/productController';
import validateViewProducts from '../validations/validateViewProducts';
import validateViewProductsAndSort from '../validations/validateViewProductsAndSort';
import validateSearch from '../validations/validateSearch';
import upload from '../../config/multer';

const router = express.Router();
router.get('/products', validateViewProducts, productController.getProductsByCategory);
router.get('/products/sort', validateViewProductsAndSort, productController.getProductsAndSortByPrice);
router.get('/products/search', validateSearch, productController.getProductsByName);
router.post(
    '/products',
    checkUserAuth,
    checkPermissionUser(['STAFF']),
    upload.single('file'),
    productController.createProduct,
);
router.get('/products/:id', productController.getProductsById);

export default router;
