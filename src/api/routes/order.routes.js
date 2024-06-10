import express from 'express';
import { checkUserAuth, checkPermissionUser } from '../middlewares/jwtMiddleWares';
import orderController from '../controllers/orderController';
const router = express.Router();

router.post('/orders', checkUserAuth, checkPermissionUser(['CUSTOMER']), orderController.createOrder);
router.post('/orders/cancel', checkUserAuth, checkPermissionUser(['CUSTOMER', 'STAFF']), orderController.cancelOrder);
router.post('/orders/confirm', checkUserAuth, checkPermissionUser(['STAFF']), orderController.confirmOrder);

export default router;
